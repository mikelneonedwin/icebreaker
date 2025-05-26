import pkg,{type GeneratorOptions} from '@prisma/generator-helper';
import { promises as fs } from 'fs';
import * as path from 'path';

// This is the main handler for the Prisma generator.
pkg.generatorHandler({
  // onManifest is called by Prisma to get information about the generator.
  onManifest() {
    return {
      prettyName: 'DB Plugin Generator',
      // We don't need a default output here as it will be specified in schema.prisma.
      // This manifest simply tells Prisma about our generator.
    };
  },
  // onGenerate is called when `prisma generate` is executed.
  async onGenerate(options: GeneratorOptions) {
    // Determine the output path for the generated db.ts file.
    // options.generator.output?.value will contain the 'output' path specified in schema.prisma.
    // path.join ensures correct path resolution across different operating systems.
    const outputPath = path.join(options.generator.output?.value || './', 'db.ts');

    // Extract all model definitions from the Prisma DMMF (Datamodel Meta Format).
    const models = options.dmmf.datamodel.models;

    // --- Start building the content of the db.ts file ---

    // Imports for PrismaClient and Vite Plugin type.
    const imports = `import { PrismaClient } from "@prisma/client";\nimport type { Plugin } from "vite";\n\n`;

    // Initialize PrismaClient.
    const prismaInit = `const prisma = new PrismaClient();\n\n`;

    // Start of the Vite plugin function.
    let pluginFunctionStart = `export default function dbPlugin(): Plugin {\n`;
    pluginFunctionStart += `  const virtualModuleId = \`virtual:db\`;\n`;
    pluginFunctionStart += `  const resolvedVirtualModuleId = "\\0" + virtualModuleId;\n`;
    pluginFunctionStart += `  return {\n`;
    pluginFunctionStart += `    name: "db",\n`;
    pluginFunctionStart += `    resolveId(id) {\n`;
    pluginFunctionStart += `      if (id === virtualModuleId) {\n`;
    pluginFunctionStart += `        return resolvedVirtualModuleId;\n`;
    pluginFunctionStart += `      }\n`;
    pluginFunctionStart += `    },\n`;
    pluginFunctionStart += `    async load(id) {\n`;
    pluginFunctionStart += `      if (id !== resolvedVirtualModuleId) return;\n`;

    // Variables to hold parts of the generated file that depend on model names.
    let promiseAllArrayVariables = `      const [\n`; // For the `const [model1, model2] = await Promise.all(...)` part
    let prismaFindManyCalls = '';               // For the `prisma.model.findMany()` calls
    let exportsContent = `      return \`\n`;     // For the `export const model = ...` part

    // Iterate over each model found in the Prisma schema.
    for (const model of models) {
      const modelName = model.name; // Get the exact model name (e.g., 'how_well_do_you_know_me')

      // Add the model name to the destructuring assignment in Promise.all.
      promiseAllArrayVariables += `        ${modelName},\n`;

      // Add the findMany call for the current model.
      prismaFindManyCalls += `        prisma.${modelName}.findMany(),\n`;

      // Add the export statement for the current model, stringifying its data.
      exportsContent += `        export const ${modelName} = \${JSON.stringify(\n`;
      exportsContent += `          ${modelName}\n`;
      exportsContent += `        )};\n`;
    }

    // Clean up trailing commas and add closing brackets/parentheses for the generated code sections.
    promiseAllArrayVariables = promiseAllArrayVariables.slice(0, -2) + `\n      ] = await prisma.$transaction([\n`;
    prismaFindManyCalls = prismaFindManyCalls.slice(0, -2) + `\n      ]);\n`;
    exportsContent += `      \`;\n`; // Close the template literal for the returned string.

    // End of the Vite plugin function.
    let pluginFunctionEnd = `    },\n`;
    pluginFunctionEnd += `  };\n`;
    pluginFunctionEnd += `}\n`;

    // Combine all parts to form the complete content of the db.ts file.
    const fullContent =
      imports +
      prismaInit +
      pluginFunctionStart +
      promiseAllArrayVariables +
      prismaFindManyCalls +
      exportsContent +
      pluginFunctionEnd;

    // Ensure the output directory exists before writing the file.
    // { recursive: true } creates parent directories if they don't exist.
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write the generated content to the db.ts file.
    await fs.writeFile(outputPath, fullContent);
  },
});
