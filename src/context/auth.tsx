"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import {
  User,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc } from "firebase/firestore";
import { useCookies } from "react-cookie";
import { auth, db } from "@/firebase";
import { useRouter } from "next/navigation"; // Import useRouter

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [cookie, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser?.uid) {
        setCookie("token", currentUser?.uid);
      }
      setLoading(false);
      console.log("cookie", cookie);
    });
    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const { signInWithEmailAndPassword } = await import("firebase/auth");
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUp = async (email: string, password: string) => {
    const { createUserWithEmailAndPassword } = await import("firebase/auth");
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      if (result.user) {
        const userRef = doc(db, "users", result.user.uid);
        const { getDoc } = await import("firebase/firestore");
        const userDoc = await getDoc(userRef);

        if (!userDoc.exists()) {
          const { setDoc } = await import("firebase/firestore");
          await setDoc(userRef, {
            uid: result.user.uid,
            email: result.user.email,
            name: result.user.displayName,
            profile: result.user.photoURL,
            role: "User",
            voted: false,
            createdAt: new Date(),
          });
        }
        router.push("/"); // Redirect to home page
      }
    } catch (error) {
      console.error("Google sign-in error:", error);
    }
  };

  const logout = async () => {
    await signOut(auth);
    removeCookie("token", { path: "/" });
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, signUp, signInWithGoogle, logout }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
