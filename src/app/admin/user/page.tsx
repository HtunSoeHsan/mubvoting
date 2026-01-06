"use client";

import { db } from "@/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  limit,
  startAfter,
  orderBy,
  updateDoc,
  doc,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CustomAlert } from "@/components/cell/Alert";

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  profile: string;
}

export default function SearchBox() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [success, setSuccess] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const itemsPerPage = 8;

  const fetchUsers = async (page: number = 1, search: string = "") => {
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      let q;

      if (search) {
        q = query(
          usersRef,
          where("name", ">=", search),
          where("name", "<", search + "\uf8ff"),
          orderBy("name"),
          limit(itemsPerPage)
        );
      } else {
        q = query(usersRef, orderBy("name"), limit(itemsPerPage));
        if (page > 1 && lastVisible) {
          q = query(
            usersRef,
            orderBy("name"),
            startAfter(lastVisible),
            limit(itemsPerPage)
          );
        }
      }

      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      setUsers(userList);
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);

      if (page === 1) {
        const countSnapshot = await getDocs(usersRef);
        setTotalPages(Math.ceil(countSnapshot.size / itemsPerPage));
      }
    } catch (error) {
      setErr("Something went wrong!");
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage, searchQuery);
  }, [currentPage, searchQuery]);

  const handleSearch = (e: FormEvent) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchUsers(1, searchQuery);
  };

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const userDoc = doc(db, "users", userId);
      await updateDoc(userDoc, { role: newRole });
      setSuccess("User role updated successfully.");
      fetchUsers(currentPage, searchQuery);
    } catch (error) {
      setErr("Error updating role:");
      console.error("Error updating role:", error);
    }
  };

  return (
    <div className="m-8 min-w-[300px] md:min-w-[600px] lg:min-w-[1000px] w-full">
      {err && (
        <CustomAlert key={err} title="Error" message={err} variant="error" />
      )}
      {success && (
        <CustomAlert
          key={success}
          title="Error"
          message={success}
          variant="success"
        />
      )}
      <form onSubmit={handleSearch} className="flex justify-end space-x-2">
        <input
          type="text"
          placeholder="Search by name..."
          className="border p-2 rounded"
          value={searchQuery}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
        />
        <button type="submit" className="p-2 text-white rounded">
          Search
        </button>
        <button
          type="button"
          onClick={() => {
            setSearchQuery("");
            setCurrentPage(1);
            fetchUsers(1);
          }}
          className="p-2 text-white rounded"
        >
          Refresh
        </button>
      </form>

      <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="px-6 py-3">Profile</th>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Username</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4 text-gray-900 dark:text-white">
                    <Avatar>
                      <AvatarImage src={user.profile} alt="profile" />
                      <AvatarFallback>
                        {user.name
                          .split(" ")
                          .map((namePart) => namePart[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                  </td>
                  <td className="px-6 py-4">{user.email}</td>
                  <td className="px-6 py-4">{user.name}</td>
                  <td className="px-6 py-4">{user.role || "User"}</td>
                  <td className="px-6 py-4">
                    <select
                      className="border p-1 rounded"
                      value={user.role || "User"}
                      onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                        handleRoleChange(user.id, e.target.value)
                      }
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  No users found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <p className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </p>
        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <ChevronLeftIcon aria-hidden="true" className="h-5 w-5" />
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentPage(index + 1)}
                className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                  currentPage === index + 1
                    ? "bg-indigo-600 text-white"
                    : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                } focus:z-20 focus:outline-offset-0`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
            >
              <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
