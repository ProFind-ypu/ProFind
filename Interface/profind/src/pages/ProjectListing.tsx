import { Link } from "react-router-dom";
import FilterDropdown from "../components/FilterDropdown";

interface User {
   id: number;
   name: string;
   avatarUrl: string;
}

interface Item {
   id: number;
   title: string;
   description: string;
   imageUrl: string;
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
         imageUrl: "https://source.unsplash.com/random/800x600?landscape",
      },
      {
         id: 2,
         title: "Modern Architecture",
         description:
            "Innovative building design blending nature and technology.",
         imageUrl: "https://source.unsplash.com/random/800x600?architecture",
      },
      {
         id: 3,
         title: "Cozy Coffee Shop",
         description: "Warm ambiance with great coffee and books.",
         imageUrl: "https://source.unsplash.com/random/800x600?coffee",
      },
      {
         id: 4,
         title: "Adventure Hiking",
         description:
            "Trail through forest leading to a breathtaking waterfall.",
         imageUrl: "https://source.unsplash.com/random/800x600?hiking",
      },
   ];
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
   return (
      <main className="min-h-screen px-6 py-6 flex flex-col items-center gap-5">
         <h1 className="text-3xl">Explore Projects</h1>
         {/* Avatars Section */}
         <div id="Container" className=" flex flex-col justify-center gap-5">
            <h2 className="text-xl font-semibold mb-6">View Your Proviser</h2>
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
                  View All Professors
               </button>
            </Link>
         </div>
         {/* Project Content - Items Grid */}
         <div id="Container" className="flex flex-col pb-10 gap-7">
            <h2 className="text-2xl font-bold mb-2">Discover Projects</h2>
            <div id="Container" className="flex flex-col gap-4 sm:w-fit sm:flex-row items-center">
               <h1 className="text-xl text-white  ">Filters</h1>
               <div  className="w-full  flex justify-between sm:w-fit sm:gap-3">
                  <FilterDropdown
                     options={filterOptions}
                     onSelect={handleFilterSelect}
                     placeholder="type"
                  />
                  <FilterDropdown
                     options={filterOptions}
                     onSelect={handleFilterSelect}
                     placeholder=""
                  />
                  <FilterDropdown
                     options={filterOptions}
                     onSelect={handleFilterSelect}
                     placeholder="hallos"
                  />
               </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
               {items.map((item) => (
                  <div
                     key={item.id}
                     className="bg-banner rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                     <img
                        src={item.imageUrl}
                        alt={item.title}
                        className=" w-full h-25  bg-linear-to-t   from-black/20 to-transparent bg-blend-overlay  object-cover"
                     />
                     <div className="p-4">
                        <h3 className="text-md font-semibold text-indigo-500">
                           {item.title}
                        </h3>
                        <p id="OverflowText" className=" text-sm mt-1 w-full  ">
                           {item.description}
                        </p>
                     </div>
                  </div>
               ))}
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
