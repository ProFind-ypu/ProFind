import { Link } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";
import TagWrapper from "../components/TagWrapper";
import SearchBar from "../components/SearchBar";
import { filterItems } from "../helpers/_SearchHelpers";
import { useState } from "react";

interface User {
   id: number;
   name: string;
   avatarUrl: string;
}

interface Item {
   id: number;
   title: string;
   description: string;
   taken: boolean;
   tags: string[];
   supervisor:string;
}
export default function ProjectsListing() {
   // Sample user data for avatars
   const users: User[] = [
      { id: 1, name: "Alice", avatarUrl: "https://i.pravatar.cc/150?img=1" },
      { id: 2, name: "Bob", avatarUrl: "https://i.pravatar.cc/150?img=2" },
      { id: 3, name: "Charlie", avatarUrl: "https://i.pravatar.cc/150?img=3" },
      { id: 4, name: "Diana", avatarUrl: "https://i.pravatar.cc/150?img=4" },
      { id: 5, name: "Eve", avatarUrl: "https://i.pravatar.cc/150?img=5" },
      { id: 6, name: "Frank", avatarUrl: "https://i.pravatar.cc/150?img=6" },

      { id: 5, name: "Eve", avatarUrl: "https://i.pravatar.cc/150?img=5" },
      { id: 6, name: "Frank", avatarUrl: "https://i.pravatar.cc/150?img=6" },

      { id: 5, name: "Eve", avatarUrl: "https://i.pravatar.cc/150?img=5" },
      { id: 6, name: "Frank", avatarUrl: "https://i.pravatar.cc/150?img=6" },
      { id: 5, name: "Eve", avatarUrl: "https://i.pravatar.cc/150?img=5" },
      { id: 6, name: "Frank", avatarUrl: "https://i.pravatar.cc/150?img=6" },

      { id: 5, name: "Eve", avatarUrl: "https://i.pravatar.cc/150?img=5" },
      { id: 6, name: "Frank", avatarUrl: "https://i.pravatar.cc/150?img=6" },
   ];

   // Sample item data
   const items: Item[] = [
      {
         id: 1,
         title: "Beautiful Landscape",
         description:
            "A stunning view of mountains and lakes under the sunset.",
         tags: ["Programming", "AI", "Database"],
         taken: true,
         supervisor:"Dr,Mazen"
      },
      {
         id: 2,
         title: "Modern Architecture",
         description:
            "Innovative building design blending nature and technology.Innovative building design blending nature and technology",
         tags: ["Programming", "AI", "Database"],
         taken: false,
         supervisor:"Dr,Heam"
      
        },
      {
         id: 3,
         title: "Cozy Coffee Shop",
         description: "Warm ambiance with great coffee and books.",
         tags: ["Programming", "AI", "Database"],
         taken: false,
         supervisor:"Dr,Anas"

        },
      {
         id: 4,
         title: "Adventure Hiking",
         description:
            "Trail through forest leading to a breathtaking waterfall.",
         tags: ["Programming", "AI", "Database"],
         taken: true,
         supervisor:"Dr,Shrodinger"

        },
   ];
   // filters options
   const filterOptions = [
      { label: "All Categories", value: "all" },
      { label: "Electronics", value: "electronics" },
      { label: "Clothing", value: "clothing" },
      { label: "Books", value: "books" },
   ];
   const handleFilterSelect = (value: string) => {
      console.log("Selected filter:", value);
      // Apply filtering logic here
   };
   //search bar layout
   const [SearchedProducts, setSearchedProducts] = useState<Item[]>(items);
   //discard empty search input , set the SearchedProducts variable
   const handleSearch = (term: string) =>
      term != "" ? setSearchedProducts(filterItems(items, term, [])) : null;
   return (
      <main className="min-h-screen px-6 py-6 flex flex-col items-center gap-5">
         <h1 className="text-3xl">Explore Projects</h1>
         {/* Avatars Section */}
         <div id="Container" className=" flex flex-col justify-center gap-5">
            <h2 className="text-xl text-center font-semibold mb-6">
               Plan With Supervisors
            </h2>
            <div className="grid grid-cols-3 grid-rows-2 overflow-clip gap-2  justify-items-center sm:gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6   ">
               {users.slice(0, ItemsAmmount()).map((user) => (
                  <Link to="">
                     <div
                        key={user.id}
                        className="flex flex-col  items-center w-30 space-y-2  transition ">
                        <img
                           src={user.avatarUrl}
                           alt={user.name}
                           className="w-[67%] aspect-square   rounded-full  object-cover shadow-sm"
                        />
                        <h3 className="font-medium ">{user.name}</h3>
                     </div>
                  </Link>
               ))}
            </div>
            <Link to="/test" className="flex justify-center ">
               <button className="px-3 py-1 border-2 flex flex-row gap-1 border-white bg-banner   text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-white/10">
                  View All Supervisor
               </button>
            </Link>
         </div>
         {/* Project Content - Items Grid */}
         <div
            id="Container"
            className="flex  flex-col items-center pb-10 gap-7">
            <h2 className="text-2xl text-center font-bold mb-2">
               Discover Projects
            </h2>
            <div id="" className=" text-center ">
               {/* <h1 className="text-xl text-white pb-4 ">Filters</h1> */}
               <div className="flex flex-col gap-4 sm:w-fit sm:flex-row  items-center">
                  <SearchBar
                     placeholder="Search products or categories..."
                     onSearch={handleSearch}
                     delay={500}
                  />
                  <div className="w-full gap-3 flex justify-between sm:w-fit sm:gap-3">
                     <FilterDropdown
                        options={filterOptions}
                        onSelect={handleFilterSelect}
                        placeholder="Tag"
                     />
                     <FilterDropdown
                        options={filterOptions}
                        onSelect={handleFilterSelect}
                        placeholder="Name"
                     />
                     <FilterDropdown
                        options={filterOptions}
                        onSelect={handleFilterSelect}
                        placeholder="Supervisor"
                     />
                  </div>
               </div>
            </div>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
               {items.map((item) => {
                  return (
                     <div
                        className="flex flex-col gap-5 p-5 hover:shadow-black hover:ring bg-banner justify-between rounded-lg cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                        key={item.id}>
                        <div className="flex flex-col gap-5 ">
                           <div className="flex flex-row justify-between">
                              <h3 className="text-md font-semibold text-indigo-500 ">
                                 {item.title}
                              </h3>
                              <TagWrapper
                                 title={item.taken ? "Taken" : "Open"}
                                 classname={
                                    item.taken ? "error-bg " : "secsess-bg "
                                 }
                              />
                           </div>
                           <p
                              id="OverflowText"
                              className=" text-sm mt-1 w-full  ">
                              {item.description}
                           </p>
                        </div>
                        <div >
                            <p className="pb-2 pl-1 text-sm">{item.supervisor} <Link to="" className="text-blue-400 cursor-pointer hover:text-green-500">[View Profile]</Link></p>
                        <div className="w-full flex flex-row gap-2">
                           {item.tags.map((tag) => (
                               <TagWrapper title={tag} />
                            ))}
                        </div>
                            </div>
                     </div>
                  );
               })}
            </div>
         </div>
      </main>
   );
}
//desciding how many (Professors) items based on the size of the screen (big-avrage-small-phone)
// the goal is to limite the ammount of SHOWING , the css determand the number of divesions (colm's) per row
function ItemsAmmount() {
   var width = window.innerWidth;

   switch (true) {
      //bigger than mediam
      case width > 768:
         // 6 items per row (two rows)
         return 6 * 2;
      //small
      case width > 640:
         // 4 items per row (two rows)
         return 4 * 2;

      default:
         // 3 items per row (two rows)
         return 3 * 2;
   }
}
