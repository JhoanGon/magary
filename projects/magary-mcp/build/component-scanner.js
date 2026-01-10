import { glob } from 'glob';
import * as fs from 'fs';
import * as path from 'path';
export class ComponentScanner {
    libPath;
    constructor(libPath) {
        this.libPath = libPath;
    }
    async scan() {
        const components = [];
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
    parseComponent(content, filename) {
        // 1. Extract Selector
        const selectorMatch = content.match(/selector:\s*['"](.*)['"]/);
        if (!selectorMatch)
            return null;
        // 2. Extract Class Name
        const classNameMatch = content.match(/export class (\w+)/);
        if (!classNameMatch)
            return null;
        const selector = selectorMatch[1];
        const name = classNameMatch[1];
        const inputs = [];
        const outputs = [];
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
        // Decorator: @Input() name: type = default
        const decoratorInputRegex = /@Input\((?:['"](.*)['"])?\)\s*(\w+)(?:\s*:\s*(.+?))?(?:\s*=\s*(.+?))?;/g;
        while ((match = decoratorInputRegex.exec(content)) !== null) {
            inputs.push({
                name: match[1] || match[2],
                type: match[3] || 'any',
                required: false,
                defaultValue: match[4]?.trim(),
            });
        }
        // 4. Extract Outputs
        // name = output<type>() or @Output() name
        const outputRegex = /(?:@Output\(\)\s*)?(\w+)\s*=\s*(?:new EventEmitter|output)(?:<(.+?)>)?/g;
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
