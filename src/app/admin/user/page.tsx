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
  const itemsPerPage = 8;

  const fetchUsers = async (page: number = 1, search: string = "") => {
    setLoading(true);
    try {
      const usersRef = collection(db, "users");
      let q = query(usersRef, limit(itemsPerPage));

      if (search) {
        q = query(
          usersRef,
          where("name", ">=", search),
          where("name", "<", search + "\uf8ff"),
          limit(itemsPerPage)
        );
      }

      if (page > 1 && lastVisible) {
        q = query(
          usersRef,
          orderBy("username"),
          startAfter(lastVisible),
          limit(itemsPerPage)
        );
      }

      const querySnapshot = await getDocs(q);
      const userList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as User[];

      setUsers(userList);
      console.log({ userList });
      setLastVisible(querySnapshot.docs[querySnapshot.docs.length - 1] || null);

      // Dynamically calculate total pages if available from Firestore
      if (page === 1) {
        const countSnapshot = await getDocs(usersRef);
        const totalDocs = countSnapshot.size;
        setTotalPages(Math.ceil(totalDocs / itemsPerPage));
      }
    } catch (error) {
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
      alert("User role updated successfully.");
      fetchUsers(currentPage, searchQuery);
    } catch (error) {
      console.error("Error updating role:", error);
    }
  };

  return (
    <>
      hsh
      <div className="m-8 min-w-[300px] md:min-w-[600px] lg:min-w-[1000px] w-full ">
        <form
          onSubmit={handleSearch}
          className="flex justify-end flex-wrap items-center space-x-2"
        >
          <input
            type="text"
            placeholder="Search..."
            className="border p-2 rounded"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
          />
          <button type="submit" className="p-2 bg-[#0E8388] text-white rounded">
            Search
          </button>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setCurrentPage(1);
              fetchUsers(1);
            }}
            className="p-2 bg-[#0E8388] text-white rounded"
          >
            Refresh
          </button>
        </form>

        <div className="mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Profile
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Username
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
                <th scope="col" className="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Loading...
                  </td>
                </tr>
              ) : users.length > 0 ? (
                users.map((user) => (
                  <tr
                    key={user.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
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
                    <td className="px-6 py-4 text-gray-900 dark:text-white">
                      {user.email}
                    </td>
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
                  <td colSpan={4} className="text-center py-4">
                    No users found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
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
                <span className="sr-only">Previous</span>
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
                onClick={() => setCurrentPage((prev) => prev + 1)}
                disabled={currentPage === totalPages}
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 disabled:opacity-50"
              >
                <span className="sr-only">Next</span>
                <ChevronRightIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}
