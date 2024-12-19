"use client";

import LoadingSpinner from "@/components/cell/LoadingSpinner";
import { addSelection } from "@/service/selection.service";
import { useState } from "react";

export default function Users() {
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState("Add Selection");
  const AddSelections = async () => {
    setLoading(true);
    await addSelection()
      .then(() => setSuccess("Add Successfylly"))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };
  return (
    <div>
      <button
        onClick={AddSelections}
        className="bg-yellow-400 text-white p-4 rounded-lg flex"
        disabled={loading}
      >
        {success}
        <span className="mx-3">{loading && <LoadingSpinner />}</span>
      </button>
    </div>
  );
}
