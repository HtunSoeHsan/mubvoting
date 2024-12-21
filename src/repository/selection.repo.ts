import { prisma } from "@/config/db";
import { SelectionPayload } from "@/interface/selection";
import { Gender, VoteType } from "@prisma/client";

  
export const addSelections = async (selections: SelectionPayload[]) => {
   await Promise.all(
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
          selection_no: selection.selection_no,
          selection_year: selection.selection_year,
        },
      });

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

  console.log("######### selection seed successfully #########")
};

export const getAllSelections = async (gender?: Gender) => {
  const where = gender ? { gender } : undefined;

  return await prisma.selection.findMany({
    select: {
      id: true, age: true, name: true, address: true, gender: true, profile: true,selected: true, section: true, selection_no: true, 
      gallery: true,
    },
    where
  });
};


export const getSelectionById = async (id: number) => {
  return await prisma.selection.findUnique({
    where: { id },
  });
};

export const updateSelectionVote = async (
  id: number,
  vote_type: VoteType,
  increment: boolean = true
) => {
  let operation: { increment?: number; decrement?: number } = {
    increment: 1, // Increment the `king` field by 1.
  };
  if (!increment) {
    operation = {
      decrement: 1,
    };
  }
  const vote = {
    KING: {
      king: operation,
    },
    QUEEN: {
      queen: operation,
    },
    POPULAR: {
      popular: operation,
    },
    INNOCENT: {
      innocent: operation,
    },
  };

  console.log(vote[vote_type]);

  return await prisma.selection.update({
    where: {
      id: id, // This specifies the record to update using the provided `id`.
    },
    data: vote[vote_type],
  });
};

export const saveVotingCount = async (data: { king?: number; queen?: number; popular?: number; innocent?: number }, selection_id: number) => {
   await prisma.selection.update({data, where:{id: selection_id}});
}
