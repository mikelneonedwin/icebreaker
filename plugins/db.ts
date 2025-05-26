import { PrismaClient } from "@prisma/client";
import type { Plugin } from "vite";

const prisma = new PrismaClient();

export default function dbPlugin(): Plugin {
  const virtualModuleId = `virtual:db`;
  const resolvedVirtualModuleId = "\0" + virtualModuleId;
  return {
    name: "db",
    resolveId(id) {
      if (id === virtualModuleId) {
        return resolvedVirtualModuleId;
      }
    },
    async load(id) {
      if (id !== resolvedVirtualModuleId) return;
      const [
        most_likely_to,
        two_truths_and_a_lie,
        never_have_i_ever,
        how_well_do_you_know_me,
        deep_cuts,
        would_you_rather,
        hot_takes,
        rapid_fire
      ] = await prisma.$transaction([
        prisma.most_likely_to.findMany(),
        prisma.two_truths_and_a_lie.findMany(),
        prisma.never_have_i_ever.findMany(),
        prisma.how_well_do_you_know_me.findMany(),
        prisma.deep_cuts.findMany(),
        prisma.would_you_rather.findMany(),
        prisma.hot_takes.findMany(),
        prisma.rapid_fire.findMany()
      ]);
      return `
        export const most_likely_to = ${JSON.stringify(
          most_likely_to
        )};
        export const two_truths_and_a_lie = ${JSON.stringify(
          two_truths_and_a_lie
        )};
        export const never_have_i_ever = ${JSON.stringify(
          never_have_i_ever
        )};
        export const how_well_do_you_know_me = ${JSON.stringify(
          how_well_do_you_know_me
        )};
        export const deep_cuts = ${JSON.stringify(
          deep_cuts
        )};
        export const would_you_rather = ${JSON.stringify(
          would_you_rather
        )};
        export const hot_takes = ${JSON.stringify(
          hot_takes
        )};
        export const rapid_fire = ${JSON.stringify(
          rapid_fire
        )};
      `;
    },
  };
}
