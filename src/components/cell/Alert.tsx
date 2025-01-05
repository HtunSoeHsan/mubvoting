"use client";
import { useState } from "react";
import { AlertCircle, CheckCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface CustomAlertProps {
  variant: "success" | "error";
  title: string;
  message: string;
}

export function CustomAlert({ variant, title, message }: CustomAlertProps) {
  const [visible, setVisible] = useState(true);

  const icon =
    variant === "success" ? (
      <CheckCircle className="h-4 w-4 text-green-500" />
    ) : (
      <AlertCircle className="h-4 w-4 text-red-500" />
    );

  return (
    visible && (
      <Alert
        variant={variant === "success" ? "default" : "destructive"}
        className="relative mt-3"
      >
        {icon}
        <div>
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{message}</AlertDescription>
        </div>
        <button
          onClick={() => setVisible(false)}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
        >
          <X className="h-4 w-4" />
        </button>
      </Alert>
    )
  );
}
