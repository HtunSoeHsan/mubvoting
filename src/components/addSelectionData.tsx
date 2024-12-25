import { useState } from "react";
import { Button } from "./ui/button";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "@/firebase";
import { selections } from "@/app/data/selection.json";
import { SplineIcon } from "lucide-react";

export default function AddSelectionData() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("Add Selection");
  const deleteAndAddSelectionsToFirestore = async () => {
    setLoading(true);

    const selectionCollectionRef = collection(db, "selections");

    try {
      // Step 1: Delete all existing documents
      const snapshot = await getDocs(selectionCollectionRef);
      const deletePromises = snapshot.docs.map((docSnap) =>
        deleteDoc(doc(db, "selections", docSnap.id))
      );
      await Promise.all(deletePromises);
      console.log("All documents deleted.");

      // Step 2: Add new documents
      const addPromises = selections.map((selection) =>
        addDoc(selectionCollectionRef, selection)
      );
      await Promise.all(addPromises);
      console.log("New selections added.");

      setSuccess("Selections Deleted & Added");
    } catch (e) {
      console.error("Error during delete/add process: ", e);
      setSuccess("Error occurred. Try again.");
    }

    setLoading(false);
  };

  return (
    <Button onClick={deleteAndAddSelectionsToFirestore} disabled={loading}>
      {success} {loading && <SplineIcon size={14} />}
    </Button>
  );
}
