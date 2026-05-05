import ts from 'typescript';

export function collectPublicApiExportNames(entrypointPath: string): string[] {
  const options = {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.NodeNext,
    moduleResolution: ts.ModuleResolutionKind.NodeNext,
    skipLibCheck: true,
  };

  const program = ts.createProgram([entrypointPath], options);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(entrypointPath);

  if (!sourceFile) {
    throw new Error(`Public API entrypoint not found: ${entrypointPath}`);
  }

  const moduleSymbol =
    (sourceFile as ts.SourceFile & { symbol?: ts.Symbol }).symbol ??
    checker.getSymbolAtLocation(sourceFile);

  if (!moduleSymbol) {
    throw new Error(`Unable to resolve exports for: ${entrypointPath}`);
  }

  return checker
    .getExportsOfModule(moduleSymbol)
    .map((symbol) => symbol.getName())
    .sort();
}

export function diffPublicApiContract(args: {
  baselineExports: string[];
  currentExports: string[];
}): {
  addedExports: string[];
  removedExports: string[];
} {
  const baselineSet = new Set(args.baselineExports);
  const currentSet = new Set(args.currentExports);

  return {
    addedExports: args.currentExports.filter((name) => !baselineSet.has(name)),
    removedExports: args.baselineExports.filter((name) => !currentSet.has(name)),
  };
}
