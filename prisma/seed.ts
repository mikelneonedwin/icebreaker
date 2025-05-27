import { PrismaClient } from "@prisma/client";
import {
  HOT_TAKES,
  HOW_WELL_DO_YOU_KNOW_ME,
  MOST_LIKELY_TO,
  NEVER_HAVE_I_EVER,
  DEEP_CUTS,
  TWO_TRUTHS_AND_A_LIE,
  WOULD_YOU_RATHER,
  RAPID_FIRE,
} from "../constants";

const prisma = new PrismaClient();

async function main() {
  await prisma.most_likely_to.createMany({
    data: MOST_LIKELY_TO.map((content) => ({
      content,
    })),
  });
  await prisma.two_truths_and_a_lie.createMany({
    data: TWO_TRUTHS_AND_A_LIE.map((content) => ({
      content,
    })),
  });
  await prisma.how_well_do_you_know_me.createMany({
    data: HOW_WELL_DO_YOU_KNOW_ME.map((content) => ({
      content,
    })),
  });
  await prisma.deep_cuts.createMany({
    data: DEEP_CUTS.map((content) => ({
      content,
    })),
  });
  await prisma.never_have_i_ever.createMany({
    data: NEVER_HAVE_I_EVER.map((content) => ({
      content,
    })),
  });
  await prisma.hot_takes.createMany({
    data: HOT_TAKES.map((content) => ({
      content,
    })),
  });
  await prisma.would_you_rather.createMany({
    data: WOULD_YOU_RATHER.map((content) => ({
      content,
    })),
  });
  await prisma.rapid_fire.createMany({
    data: RAPID_FIRE.map((content) => ({
      content
    }))
  })
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
