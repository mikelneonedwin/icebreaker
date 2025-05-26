import pkg from "@prisma/generator-helper";
import { writeFile, mkdir } from "fs/promises";
import { join } from "path";

pkg.generatorHandler({
  onManifest() {
    return {
      prettyName: "Virtual DB Type Generator",
      defaultOutput: "./types",
    };
  },

  async onGenerate(options) {
    const models = options.dmmf.datamodel.models;

    const gameDataType = `type GameData = {
  id: string;
  content: string;
};
`;

    const modelNames = models.map(({ name }) =>
      name.replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase()
    );

    const exports = modelNames
      .map((exportName) => ` export const ${exportName}: GameData[];`)
      .join("\n");

    const moduleDecl = `declare module "virtual:db" {
${exports}
}
`;

    const fullOutput = gameDataType + moduleDecl;

    const outputDir = join(process.cwd(), "types");
    await mkdir(outputDir, { recursive: true });
    await writeFile(join(outputDir, "index.d.ts"), fullOutput);

    console.log("✅ virtual:db types generated at types/index.d.ts");
  },
});
