import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';

export const contractRoots = [
  'projects/ng-magary/src/lib',
  'projects/demo-app/src/app',
];

export const fileExtensions = new Set(['.ts', '.scss']);

export const contractRules = [
  {
    id: 'legacy-decorators',
    regex:
      /@(?:Input|Output|ViewChild|ViewChildren|ContentChild|ContentChildren)\s*\(/,
    message:
      'Legacy decorators are not allowed. Use input()/output()/viewChild()/viewChildren()/contentChild()/contentChildren().',
  },
  {
    id: 'output-any',
    regex: /\boutput\s*<\s*any\s*>\s*\(/,
    message: 'output<any>() is not allowed. Use a concrete output type.',
  },
  {
    id: 'no-ng-deep',
    regex: /::ng-deep\b/,
    message:
      '::ng-deep is not allowed. Use component APIs, CSS variables, or explicit global styles.',
  },
];

export function fingerprintViolation(violation) {
  return `${violation.rule}|${violation.file}|${violation.code}`;
}

export function relativePath(filePath) {
  return path.relative(process.cwd(), filePath).split(path.sep).join('/');
}

export function collectContractFiles(dirPath, collected = []) {
  const entries = fs.readdirSync(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      collectContractFiles(fullPath, collected);
      continue;
    }

    if (!entry.isFile()) {
      continue;
    }

    if (!fileExtensions.has(path.extname(entry.name)) || entry.name.endsWith('.d.ts')) {
      continue;
    }

    collected.push(fullPath);
  }

  return collected;
}

export function collectContractViolations(roots = contractRoots, rules = contractRules) {
  const files = [];

  for (const root of roots) {
    if (fs.existsSync(root)) {
      collectContractFiles(root, files);
    }
  }

  const violations = [];

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, 'utf8');
    const lines = content.split(/\r?\n/);

    for (let index = 0; index < lines.length; index += 1) {
      const line = lines[index];

      for (const rule of rules) {
        if (rule.regex.test(line)) {
          violations.push({
            rule: rule.id,
            message: rule.message,
            file: relativePath(filePath),
            line: index + 1,
            code: line.trim(),
          });
        }
      }
    }
  }

  violations.sort((left, right) =>
    fingerprintViolation(left).localeCompare(fingerprintViolation(right)),
  );

  return { files, violations };
}

export function collectPublicApiExportNames(entrypointPath) {
  const resolvedEntrypoint = path.resolve(entrypointPath);
  const options = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    skipLibCheck: true,
  };

  const program = ts.createProgram([resolvedEntrypoint], options);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(resolvedEntrypoint);

  if (!sourceFile) {
    throw new Error(`Public API entrypoint not found: ${entrypointPath}`);
  }

  const moduleSymbol = sourceFile.symbol ?? checker.getSymbolAtLocation(sourceFile);

  if (!moduleSymbol) {
    throw new Error(`Unable to resolve exports for: ${entrypointPath}`);
  }

  return checker.getExportsOfModule(moduleSymbol).map((symbol) => symbol.getName()).sort();
}

export function diffPublicApiContract({ baselineExports, currentExports }) {
  const baselineSet = new Set(baselineExports);
  const currentSet = new Set(currentExports);

  return {
    addedExports: currentExports.filter((name) => !baselineSet.has(name)),
    removedExports: baselineExports.filter((name) => !currentSet.has(name)),
  };
}

// ---------------------------------------------------------------------------
// Manifest generation
// ---------------------------------------------------------------------------

const COMPONENT_DECORATOR = 'Component';
const DIRECTIVE_DECORATOR = 'Directive';
const INJECTABLE_DECORATOR = 'Injectable';
const INPUT_FN = 'input';
const OUTPUT_FN = 'output';
const MODEL_FN = 'model';

function createCompilerOptions() {
  return {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    skipLibCheck: true,
    experimentalDecorators: true,
  };
}

/**
 * Follows a symbol through alias chains to find the ultimate declaration.
 * Re-exports from barrels resolve to ExportSpecifier nodes; we need the
 * original class/interface/const declaration.
 * @param {ts.Symbol} symbol
 * @param {ts.TypeChecker} checker
 * @returns {ts.Node|undefined}
 */
function resolveDeclarationNode(symbol, checker) {
  // Follow alias chains
  let resolved = symbol;
  if (symbol.flags & ts.SymbolFlags.Alias) {
    resolved = checker.getAliasedSymbol(symbol) ?? symbol;
    // Recurse in case of double aliasing
    if (resolved && resolved !== symbol && (resolved.flags & ts.SymbolFlags.Alias)) {
      resolved = checker.getAliasedSymbol(resolved) ?? resolved;
    }
  }

  return resolved.valueDeclaration ?? resolved.declarations?.[0];
}

/**
 * Determines the export kind by inspecting the declaration AST.
 * @param {ts.Symbol} symbol
 * @param {ts.TypeChecker} checker
 * @returns {'component'|'directive'|'service'|'type'|'constant'|'function'|'unknown'}
 */
function classifyExportKind(symbol, checker) {
  const declarationNode = resolveDeclarationNode(symbol, checker);
  if (!declarationNode) {
    return 'unknown';
  }

  // Check if it's a class
  if (ts.isClassDeclaration(declarationNode)) {
    const decorators = ts.getDecorators(declarationNode);
    if (decorators) {
      for (const decorator of decorators) {
        const expr = decorator.expression;
        if (ts.isCallExpression(expr)) {
          const ident = expr.expression;
          if (ts.isIdentifier(ident)) {
            if (ident.text === COMPONENT_DECORATOR) {
              return 'component';
            }
            if (ident.text === DIRECTIVE_DECORATOR) {
              return 'directive';
            }
            if (ident.text === INJECTABLE_DECORATOR) {
              return 'service';
            }
          }
        }
      }
    }
    return 'unknown';
  }

  // Type alias or interface
  if (ts.isTypeAliasDeclaration(declarationNode) || ts.isInterfaceDeclaration(declarationNode)) {
    return 'type';
  }

  // Enum
  if (ts.isEnumDeclaration(declarationNode)) {
    return 'type';
  }

  // Variable declaration (const/let/var)
  if (ts.isVariableDeclaration(declarationNode)) {
    return 'constant';
  }

  // Function declaration
  if (ts.isFunctionDeclaration(declarationNode)) {
    return 'function';
  }

  return 'unknown';
}

/**
 * Resolves the source file path for a declaration node, relative to the
 * current working directory.
 * @param {ts.Node} node
 * @returns {string}
 */
function resolveSourceFile(node) {
  const sourceFile = node.getSourceFile();
  const fullPath = path.resolve(sourceFile.fileName);
  return relativePath(fullPath);
}

/**
 * Extracts the selector string from @Component or @Directive decorator.
 * @param {ts.ClassDeclaration} classDeclaration
 * @returns {string|undefined}
 */
function extractSelector(classDeclaration) {
  const decorators = ts.getDecorators(classDeclaration);
  if (!decorators) return undefined;

  for (const decorator of decorators) {
    const expr = decorator.expression;
    if (!ts.isCallExpression(expr)) continue;
    const ident = expr.expression;
    if (!ts.isIdentifier(ident)) continue;
    if (ident.text !== COMPONENT_DECORATOR && ident.text !== DIRECTIVE_DECORATOR) continue;

    const arg = expr.arguments[0];
    if (!arg || !ts.isObjectLiteralExpression(arg)) continue;

    const selectorProp = arg.properties.find(
      (p) => ts.isPropertyAssignment(p) && ts.isIdentifier(p.name) && p.name.text === 'selector',
    );
    if (selectorProp && ts.isPropertyAssignment(selectorProp)) {
      const initializer = selectorProp.initializer;
      if (ts.isStringLiteral(initializer)) {
        return initializer.text;
      }
    }
  }
  return undefined;
}

/**
 * Extracts input declarations from a class body.
 * Looks for class members initialized with calls to `input()` or `model()`.
 * @param {ts.ClassDeclaration} classDeclaration
 * @param {ts.TypeChecker} checker
 * @returns {Array<{name: string, type: string, required: boolean, isModel: boolean}>}
 */
function extractInputs(classDeclaration, checker) {
  const inputs = [];

  for (const member of classDeclaration.members) {
    if (!ts.isPropertyDeclaration(member)) continue;

    const initializer = member.initializer;
    if (!initializer || !ts.isCallExpression(initializer)) continue;

    const calleeName = ts.isIdentifier(initializer.expression)
      ? initializer.expression.text
      : undefined;

    if (calleeName !== INPUT_FN && calleeName !== MODEL_FN) continue;

    const name = ts.isIdentifier(member.name) ? member.name.text : undefined;
    if (!name) continue;

    // Resolve the type from the type annotation or the type argument
    let typeStr = 'unknown';
    if (member.type) {
      typeStr = member.type.getText();
    } else if (initializer.typeArguments?.length) {
      typeStr = initializer.typeArguments[0].getText();
    }

    // Check if there's a default argument (indicates optional)
    const hasDefault = initializer.arguments.length > 0;
    const required = !hasDefault;

    inputs.push({
      name,
      type: typeStr,
      required,
      isModel: calleeName === MODEL_FN,
    });
  }

  return inputs;
}

/**
 * Extracts output declarations from a class body.
 * Looks for class members initialized with calls to `output()`.
 * @param {ts.ClassDeclaration} classDeclaration
 * @param {ts.TypeChecker} checker
 * @returns {Array<{name: string, type: string}>}
 */
function extractOutputs(classDeclaration, checker) {
  const outputs = [];

  for (const member of classDeclaration.members) {
    if (!ts.isPropertyDeclaration(member)) continue;

    const initializer = member.initializer;
    if (!initializer || !ts.isCallExpression(initializer)) continue;

    const calleeName = ts.isIdentifier(initializer.expression)
      ? initializer.expression.text
      : undefined;

    if (calleeName !== OUTPUT_FN) continue;

    const name = ts.isIdentifier(member.name) ? member.name.text : undefined;
    if (!name) continue;

    let typeStr = 'EventEmitter';
    if (member.type) {
      typeStr = member.type.getText();
    } else if (initializer.typeArguments?.length) {
      typeStr = `EventEmitter<${initializer.typeArguments[0].getText()}>`;
    }

    outputs.push({ name, type: typeStr });
  }

  return outputs;
}

/**
 * Resolves rich metadata for a component: selector, inputs, outputs.
 * Returns null if the declaration is not a class with @Component.
 * @param {ts.Symbol} symbol
 * @param {ts.TypeChecker} checker
 * @returns {null|{selector?: string, inputs?: Array<{name:string,type:string,required:boolean}>, outputs?: Array<{name:string,type:string}>}}
 */
export function resolveComponentMetadata(symbol, checker) {
  const decl = resolveDeclarationNode(symbol, checker);
  if (!decl || !ts.isClassDeclaration(decl)) return null;

  const decorators = ts.getDecorators(decl);
  if (!decorators) return null;

  const hasAngularDecorator = decorators.some((d) => {
    const expr = d.expression;
    return (
      ts.isCallExpression(expr) &&
      ts.isIdentifier(expr.expression) &&
      (expr.expression.text === COMPONENT_DECORATOR ||
        expr.expression.text === DIRECTIVE_DECORATOR)
    );
  });

  if (!hasAngularDecorator) return null;

  return {
    selector: extractSelector(decl),
    inputs: extractInputs(decl, checker),
    outputs: extractOutputs(decl, checker),
  };
}

/**
 * Generates a manifest by scanning the public API entrypoint using the
 * TypeScript compiler API. Resolves each export to its kind, source file,
 * and (for components) selector/inputs/outputs.
 *
 * @param {string} entrypointPath — path to public-api.ts
 * @returns {{ version: number, generatedAt: string, exports: Array<object> }}
 */
export function generateManifest(entrypointPath) {
  const resolvedEntrypoint = path.resolve(entrypointPath);
  const options = createCompilerOptions();
  const program = ts.createProgram([resolvedEntrypoint], options);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(resolvedEntrypoint);

  if (!sourceFile) {
    throw new Error(`Public API entrypoint not found: ${entrypointPath}`);
  }

  const moduleSymbol = sourceFile.symbol ?? checker.getSymbolAtLocation(sourceFile);
  if (!moduleSymbol) {
    throw new Error(`Unable to resolve exports for: ${entrypointPath}`);
  }

  const exportSymbols = checker.getExportsOfModule(moduleSymbol);

  const manifestExports = exportSymbols.map((symbol) => {
    const name = symbol.getName();
    const declarationNode = resolveDeclarationNode(symbol, checker);
    const sourceFile = declarationNode ? resolveSourceFile(declarationNode) : undefined;
    const kind = classifyExportKind(symbol, checker);

    const entry = { name, kind, sourceFile };

    // If it's a component or directive, resolve rich metadata
    if (kind === 'component' || kind === 'directive') {
      const metadata = resolveComponentMetadata(symbol, checker);
      if (metadata) {
        entry.selector = metadata.selector;
        entry.inputs = metadata.inputs;
        entry.outputs = metadata.outputs;
      }
    }

    return entry;
  });

  // Sort alphabetically for deterministic output
  manifestExports.sort((a, b) => a.name.localeCompare(b.name));

  return {
    version: 1,
    generatedAt: new Date().toISOString(),
    exports: manifestExports,
  };
}
