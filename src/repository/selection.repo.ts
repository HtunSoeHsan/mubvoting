import { prisma } from "@/config/db";
import { Selection } from "@/interface/selection";
import { VoteType } from "@prisma/client";

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

export const getSelectionById = async (id: number) => {
  return await prisma.selection.findUnique({
    where: { id },
  });
};

export const updateSelectionVote = async (id: number, vote_type: VoteType) => {
  const vote = {
    KING: {
      king: {
        increment: 1, // Increment the `king` field by 1.
      },
    },
    QUEEN: {
      queen: {
        increment: 1, // Increment the `queen` field by 1.
      },
    },
    POPULAR: {
      popular: {
        increment: 1, // Increment the `popular` field by 1.
      },
    },
    INNOCENT: {
      innocent: {
        increment: 1, // Increment the `innocent` field by 1.
      },
    },
  };
  return await prisma.selection.update({
    where: {
      id: id, // This specifies the record to update using the provided `id`.
    },
    data: vote[vote_type],
  });
};
