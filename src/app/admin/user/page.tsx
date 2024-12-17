import { cookies } from "next/headers";



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
  const searchQuery = cookies().get('searchQuery')?.value || ''; // Read query from cookies
  const filteredUsers = Register.filter((Register) =>
  Register.username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  return (
    <>
    <div className="m-8 min-w-[300px] md:min-w-[600px] lg:min-w-[1000px] w-full ">
      {/* <h1>Search Users</h1> */}
      <form
        action="/api/save-search"
        method="POST"
        className="flex justify-end flex-wrap items-center space-x-2"
      >
        <input
          type="text"
          name="query"
          defaultValue={searchQuery}
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
    </>
  );
}