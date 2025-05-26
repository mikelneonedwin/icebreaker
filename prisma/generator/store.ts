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
      "store.ts"
    );

    // Extract all model definitions from the Prisma DMMF (Datamodel Meta Format).
    const models = options.dmmf.datamodel.models;

    // --- Start building the content of the store.ts file ---

    // Imports for Zustand.
    let imports = `import { create } from "zustand";\n`;
    imports += `import { createJSONStorage, persist } from "zustand/middleware";\n\n`;

    // Type definitions.
    // We assume 'virtual:db' will be available as it was in your previous setup.
    imports += `type GameKey = keyof typeof import("virtual:db");\n`;
    imports += `type StoreState = Record<GameKey, string[]>;\n`;
    imports += `type Action = (id: string, key: GameKey) => void;\n`;
    imports += `type StoreAction = Record<"addItem" | "removeItem", Action>;\n\n`;

    // Start of the useStore definition.
    let storeContent = `export const useStore = create<StoreState & StoreAction>()(\n`;
    storeContent += `  persist(\n`;
    storeContent += `    (set) => ({\n`;

    // Dynamically add initial state for each model.
    for (const model of models) {
      const modelName = model.name;
      storeContent += `      ${modelName}: [] as string[],\n`;
    }

    // Add addItem and removeItem actions.
    storeContent += `      addItem: (id, key) =>\n`;
    storeContent += `        set((state) => ({\n`;
    storeContent += `          [key]: [...state[key], id],\n`;
    storeContent += `        })),\n`;
    storeContent += `      removeItem: (id, key) =>\n`;
    storeContent += `        set((state) => ({\n`;
    storeContent += `          [key]: state[key].filter((value) => value !== id),\n`;
    storeContent += `        })),\n`;
    storeContent += `    }),\n`;
    storeContent += `    {\n`;
    storeContent += `      name: "icebreaker-store",\n`;
    storeContent += `      version: 1,\n`;
    storeContent += `      storage: createJSONStorage(() => localStorage),\n`;
    storeContent += `    }\n`;
    storeContent += `  )\n`;
    storeContent += `);\n`;

    // Combine all parts to form the complete content of the store.ts file.
    const fullContent = imports + storeContent;

    // Ensure the output directory exists before writing the file.
    await fs.mkdir(path.dirname(outputPath), { recursive: true });

    // Write the generated content to the store.ts file.
    await fs.writeFile(outputPath, fullContent);
  },
});
