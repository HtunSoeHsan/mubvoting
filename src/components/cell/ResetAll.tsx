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
const ResetAll = () => {
  const [loading, setLoading] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies();

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
    }

    setLoading(false);
  };

  const clearCookies = () => {
    Object.keys(cookies).forEach((cookieName) => {
      removeCookie(cookieName, { path: "/" }); // Specify the path if required
    });
  };

  const reset = async () => {
    await deleteAndAddSelectionsToFirestore();
    clearCookies();
  };
  return (
    <div>
      <Button onClick={reset}>Reset All</Button>
    </div>
  );
};

export default ResetAll;
