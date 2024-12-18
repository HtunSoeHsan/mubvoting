import { prisma } from "@/config/db";
import { seedSelection } from "./seed/selection.seed";


async function main() {
    await seedSelection();
}


main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });