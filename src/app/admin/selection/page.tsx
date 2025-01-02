"use client";

import AddSelectionData from "@/components/addSelectionData";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
export default function Page() {
  const items = [
    {
      id: 1,
      title: "Back End Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 2,
      title: "Front End Developer",
      department: "Engineering",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 4,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 5,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 6,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 7,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 8,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 9,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 10,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 11,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 12,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 13,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
    {
      id: 14,
      title: "User Interface Designer",
      department: "Design",
      type: "Full-time",
      location: "Remote",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(items.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = items.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="flex  overflow-y-hidden flex-col  m-8 min-w-[300px]  md:min-w-[600px] lg:min-w-[1000px] w-full">
      <AddSelectionData />
      <div className="flex-grow mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                User
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Vote
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((user, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0
                    ? "bg-white dark:bg-gray-800"
                    : "bg-gray-50 dark:bg-gray-700"
                }`}
              >
                <td className="px-6 py-4 text-gray-900 dark:text-white">
                  {user.title}
                </td>
                <td className="px-6 py-4">{user.department}</td>
                <td className="px-6 py-4">{user.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{" "}
            <span className="font-medium">
              {Math.min(startIndex + itemsPerPage, items.length)}
            </span>{" "}
            of <span className="font-medium">{items.length}</span> results
          </p>
          <div>
            <nav
              className="isolate inline-flex -space-x-px rounded-md shadow-sm"
              aria-label="Pagination"
            >
              <button
                onClick={handlePrevious}
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
                onClick={handleNext}
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
    </div>
  );
}
