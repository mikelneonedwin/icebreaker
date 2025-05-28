import pkg, { type GeneratorOptions } from "@prisma/generator-helper";
import { promises as fs } from "fs";
import * as path from "path";

// This is the main handler for the Prisma generator.
pkg.generatorHandler({
  // onManifest is called by Prisma to get information about the generator.
  onManifest() {
    return {
      prettyName: "Zustand Store Generator",
      // We don't need a default output here as it will be specified in schema.prisma.
    };
  },
  // onGenerate is called when `prisma generate` is executed.
  async onGenerate(options: GeneratorOptions) {
    // Determine the output path for the generated store.ts file.
    // options.generator.output?.value will contain the 'output' path specified in schema.prisma.
    const outputPath = path.join(
      options.generator.output?.value || "./",
      "store-export.ts"
    );

    // Extract all model definitions from the Prisma DMMF (Datamodel Meta Format).
    const models = options.dmmf.datamodel.models;

    // --- Start building the content of the store-export.ts file ---
    let storeExport = "";

    // Dynamically add initial state for each model.
    for (const model of models) {
      const modelName = model.name;
      storeExport += `export const ${modelName}: string[] = [];\n`;
    }

    // Ensure the output directory exists before writing the file.
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write the generated content to the store.ts file.
    await fs.writeFile(outputPath, storeExport);
  },
});
