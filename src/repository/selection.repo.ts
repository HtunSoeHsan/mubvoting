import { prisma } from "@/config/db";
import { Selection } from "@/interface/selection";

export const addSelections = async (selections: Selection[]) => {
  // Create selections
  const createdSelections = await Promise.all(
    selections.map(async (selection) => {
      const createdSelection = await prisma.selection.create({
        data: {
          name: selection.name,
          profile: selection.profile,
          age: selection.age,
          gender: selection.gender,
          section: selection.section,
          dob: selection.dob,
          address: selection.address,
          selection_year: selection.selection_year,
        },
      });

      // Create associated gallery images if provided
      if (selection.gallery && selection.gallery.length > 0) {
        await prisma.gallery.createMany({
          data: selection.gallery.map((image) => ({
            selection_id: createdSelection.id,
            image,
          })),
        });
      }

      return createdSelection;
    })
  );

  return createdSelections;
};
