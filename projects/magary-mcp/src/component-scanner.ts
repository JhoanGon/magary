import { glob } from 'glob';
import * as fs from 'fs';
import * as path from 'path';

export interface MagaryComponentDocs {
  name: string;
  selector: string;
  inputs: Array<{
    name: string;
    type: string;
    required: boolean;
    defaultValue?: string;
  }>;
  outputs: Array<{ name: string; description?: string }>;
  description: string;
  filePath: string;
}

export class ComponentScanner {
  constructor(private libPath: string) {}

  async scan(): Promise<MagaryComponentDocs[]> {
    const components: MagaryComponentDocs[] = [];
    // Find all .ts files that likely contain components
    const files = await glob('**/*.ts', {
      cwd: this.libPath,
      ignore: ['**/*.spec.ts', '**/*.module.ts'],
    });

    for (const file of files) {
      const fullPath = path.join(this.libPath, file);
      const content = fs.readFileSync(fullPath, 'utf-8');

      if (content.includes('@Component')) {
        const doc = this.parseComponent(content, file);
        if (doc) {
          doc.filePath = fullPath;
          components.push(doc);
        }
      }
    }

    return components;
  }

  private parseComponent(
    content: string,
    filename: string,
  ): MagaryComponentDocs | null {
    // 1. Extract Selector
    const selectorMatch = content.match(/selector:\s*['"](.*)['"]/);
    if (!selectorMatch) return null;

    // 2. Extract Class Name
    const classNameMatch = content.match(/export class (\w+)/);
    if (!classNameMatch) return null;

    const selector = selectorMatch[1];
    const name = classNameMatch[1];
    const inputs: MagaryComponentDocs['inputs'] = [];
    const outputs: MagaryComponentDocs['outputs'] = [];

    // 3. Extract Inputs (Signal & Decorator)
    // Signal: name = input<type>(default)
    const signalInputRegex = /(\w+)\s*=\s*input(?:<(.+?)>)?\((.*?)\)/g;
    let match;
    while ((match = signalInputRegex.exec(content)) !== null) {
      inputs.push({
        name: match[1],
        type: match[2] || 'inferred',
        required: false, // Signal inputs with default are not required
        defaultValue: match[3]?.trim(),
      });
    }

    // Required Signal: name = input.required<type>()
    const requiredSignalRegex = /(\w+)\s*=\s*input\.required(?:<(.+?)>)?\(/g;
    while ((match = requiredSignalRegex.exec(content)) !== null) {
      inputs.push({
        name: match[1],
        type: match[2] || 'inferred',
        required: true,
      });
    }

    // Decorator-based input (legacy): decorator(alias?) name: type = default
    const decoratorInputRegex =
      /@(?:Input|input)\((?:['"](.*)['"])?\)\s*(\w+)(?:\s*:\s*(.+?))?(?:\s*=\s*(.+?))?;/g;
    while ((match = decoratorInputRegex.exec(content)) !== null) {
      inputs.push({
        name: match[1] || match[2],
        type: match[3] || 'unknown',
        required: false,
        defaultValue: match[4]?.trim(),
      });
    }

    // 4. Extract Outputs
    // name = output<type>() or legacy EventEmitter assignment
    const outputRegex =
      /(?:@\w+\((?:['"][^'"]*['"])?\)\s*)?(\w+)\s*=\s*(?:new EventEmitter|output)(?:<(.+?)>)?/g;
    while ((match = outputRegex.exec(content)) !== null) {
      outputs.push({
        name: match[1],
        description: `Event emitter for ${match[1]}`,
      });
    }

    // Description (simple JSDoc check before class)
    // This is very basic, a real parser would be better but this suffices for context
    const description = `Magary UI Component: ${name} (${selector})`;

    return {
      name,
      selector,
      inputs,
      outputs,
      description,
      filePath: '', // filled later
    };
  }
}
