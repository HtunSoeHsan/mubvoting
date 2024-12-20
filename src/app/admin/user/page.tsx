
"use client";
import { useState } from 'react';

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/20/solid';
export default function SearchBox() {

  const Register = [
    {
      email: "john.doe@example.com",
      username: "johndoe",
      vote: 15,
    },
    {
      email: "jane.smith@example.com",
      username: "janesmith",
      vote: 25,
    },
    {
      email: "mike.johnson@example.com",
      username: "mikejohnson",
      vote: 12,
    },
  ];



  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const totalPages = Math.ceil(Register.length / itemsPerPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = Register.slice(startIndex, startIndex + itemsPerPage);

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
    <div className="m-8 min-w-[300px] md:min-w-[600px] lg:min-w-[1000px] w-full ">
      {/* <h1>Search Users</h1> */}
      <form
        action="/api/save-search"
        method="POST"
        className="flex justify-end flex-wrap items-center space-x-2"
      >
        {/**need to bind search  */}
        <input
          type="text"
          name="query"
          placeholder="Search..."
          className="border p-2 rounded"
        />
        <button type="submit" className="p-2 bg-[#0E8388] text-white rounded">
          Search
        </button>
        <button type="submit" className="p-2 bg-[#0E8388] text-white rounded">
          Refresh
        </button>
      </form>

      <div>
        
      <div className=" mt-4 relative overflow-x-auto shadow-md sm:rounded-lg">
      {/* Table */}
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        {/* Table Header */}
        <thead className="text-xs text-gray-700 uppercase bg-blue-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Username</th>
            <th scope="col" className="px-6 py-3">Vote</th>
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {Register.map((user, index) => (
            <tr
              key={index}
              className={`${
                index % 2 === 0
                  ? "bg-white dark:bg-gray-800"
                  : "bg-gray-50 dark:bg-gray-700"
              }`}
            >
              <td className="px-6 py-4 text-gray-900 dark:text-white">
                {user.email}
              </td>
              <td className="px-6 py-4">{user.username}</td>
              <td className="px-6 py-4">{user.vote}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

      </div>

     
    </div>

    <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <p className="text-sm text-gray-700">
            Showing <span className="font-medium">{startIndex + 1}</span> to{' '}
            <span className="font-medium">{Math.min(startIndex + itemsPerPage, Register.length)}</span> of{' '}
            <span className="font-medium">{Register.length}</span> results
          </p>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
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
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
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
    </>
  );
}