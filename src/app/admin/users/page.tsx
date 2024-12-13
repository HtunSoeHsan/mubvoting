import { cookies } from "next/headers";

const users = [
  { id: 1, name: 'Thaw Bhonte Htet',image: '/fresher.jpg', section:'A' },
  { id: 2, name: 'Okkar Thu',image:'/fresher.jpg', section:'B-3'  },
  { id: 3, name: 'Thein yati nwe' ,image:'/fresher.jpg', section:'B2' },
  { id: 4, name: 'Yoon Lae Lae Khaing' ,image:'/fresher.jpg', section:'B' },
  { id: 5, name: 'Hnin hnin hsan',image:'/fresher.jpg', section:'a'  },
];

export default function SearchBox() {
  const searchQuery = cookies().get('searchQuery')?.value || ''; // Read query from cookies
  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
    <div className="m-8">
      {/* <h1>Search Users</h1> */}
      <form
        action="/api/save-search"
        method="POST"
        className="flex items-center space-x-2"
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
      </form>

        <form action="#">
      <ul className="mt-4 flex  flex-col">
        {filteredUsers.map((user) => (
            <div key={user.id} className='border-2 flex shadow-xl rounded-sm m-4 p-4'>
                    <div>
                      <img  src={user.image} className=" rounded-sm w-[400px]"></img>
                      <div className="bg-[#0E8388] rounded-sm px-2 py-1 mt-2  text-white">
                      <li className=" font-bold text-lg text-left ">{user.name}</li>
                      <li className="-mt-1 text-sm color-gray-300">First Year Section - {user.section}</li>
                      </div>
                    </div>
                      

                <div className="grid gap-6 grid-rows-2  grid-cols-2  mx-12">
                  <div>
                    <p className="text-xl">Waling Mark</p>
                    <input type="number" placeholder="Enter mark" required className="border-2 rounded-sm min-h-[40px]"></input>
                  </div>
                  <div>
                    <p className="text-xl">Cat Walk</p>
                    <input type="number" placeholder="Enter mark" required className="border-2 rounded-sm min-h-[40px]"></input>
                  </div>
                  <div>
                    <p className="text-xl">L take</p>
                    <input type="number" placeholder="Enter mark" required className="border-2 rounded-sm min-h-[40px]"></input>
                  </div>
                  <div>
                    <p className="text-xl"> - Social Credit</p>
                    <input type="number" placeholder="Enter mark" required className="border-2 rounded-sm min-h-[40px]"></input>
                  </div>
                    <button type="submit" className="col-span-2 bg-[#0E8388] text-white  focus:ring-4  font-medium rounded-sm text-sm px-5 py-2.5  focus:outline-none font-bold text-xl text-bolder">Vote</button>
                </div>
                  
            </div>
        ))}
      </ul>
        </form>
    </div>
    </>
  );
}
