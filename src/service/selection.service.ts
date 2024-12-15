import { Selection } from "@/interface/selection";
import { addSelections } from "@/repository/selection.repo"

const selections : Selection[] = [
    {
      name: "John Doe",
      profile: "john-profile.jpg",
      age: 25,
      gender: "MALE",
      section: "A",
      address: "123 Main St",
      selection_year: "2024",
      gallery: ["image1.jpg", "image2.jpg"], // Gallery images for this selection
    },
    {
      name: "Jane Smith",
      profile: "jane-profile.jpg",
      age: 22,
      gender: "FEMALE",
      section: "B",
      address: "456 Oak Ave",
      selection_year: "2024",
      gallery: ["jane-image1.jpg"],
    },
  ];

export const addSelection = async () => {
return  await addSelections(selections)
}
