"use client";
import { db } from "@/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import React, { useState } from "react";
import { useCookies } from "react-cookie";
import selections from "@/app/data/selection.json";
import { Button } from "../ui/button";
import LoadingSpinner from "./LoadingSpinner";
const ResetAll = () => {
  const [loading, setLoading] = useState(false);
  const [, setCookies] = useCookies();

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
      const addPromises = selections.selections.map((selection) =>
        addDoc(selectionCollectionRef, selection)
      );
      await Promise.all(addPromises);
      console.log("New selections added.");
    } catch (e) {
      console.error("Error during delete/add process: ", e);
    } finally {
      setLoading(false);
    }
  };

  const clearCookies = () => {
    setCookies("King", "false", { path: "/" });
    setCookies("Queen", "false", { path: "/" });
    setCookies("Popular", "false", { path: "/" });
    setCookies("Innocent", "false", { path: "/" });
  };

  const reset = async () => {
    await deleteAndAddSelectionsToFirestore();
    clearCookies();
  };
  return (
    <div>
      <Button onClick={reset} disabled={loading} className="flex gap-1">
        <span>Reset All</span> {loading && <LoadingSpinner />}
      </Button>
    </div>
  );
};

export default ResetAll;
