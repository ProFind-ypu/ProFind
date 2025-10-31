import { Link } from "react-router-dom";
import FilterDropdown from "../components/complex/FilterDropdown";
import ProjectCard from "../components/Primary/ProjectCard";
import {
   MOCK_supervisor,
   type Item,
   allTags,
   filterOptions,
   MOCK_projectinfo,
} from "../testing/constants";
import { useState } from "react";
import { filterItems } from "../helpers/_SearchHelpers";
import ProfessorProfilePreview from "../components/Primary/ProfessorProfilePreview";
import SearchBar from "../components/complex/SearchBar";
import TagFilter from "../components/complex/TagFilter";

export default function ProjectsListing() {
   // Sample user data for avatars
   const [SearchedProducts, setSearchedProducts] =
      useState<Item[]>(MOCK_projectinfo);
   const [selectedTags, setSelectedTags] = useState<string[]>([]);
   const handleFilterSelect = (value: string) => {
      console.log("Selected filter:", value);
      // Apply filtering logic here
   };

   const handleSearch = (term: string) => {
      term.trim() !== ""
         ? setSearchedProducts(
              filterItems(MOCK_projectinfo, term, [] /*selectedTags*/)
           )
         : setSearchedProducts(MOCK_projectinfo); // Reset if empty
   };
   return (
      <main className="min-h-screen px-6 py-6 flex flex-col items-center gap-5">
         {/* <h1 className="text-3xl">Explore Projects</h1> */}
         {/* Avatars Section */}
         <div
            id="Container"
            className=" flex flex-col w-full justify-center gap-5">
            <h2 className="text-2xl text-center  mb-4">
               Plan With Supervisors
            </h2>
            {/* grid grid-cols-3 grid-rows-2 sm:gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 */}
            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 justify-evenly ">
               {MOCK_supervisor.slice(0, ItemsAmmount()).map((user) => (
                  <ProfessorProfilePreview ProInfo={user} />
               ))}
            </div>
            <Link to="/test" className="flex justify-center ">
               <button className="px-3 py-1 border-2 flex flex-row gap-1 border-white bg-banner   text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-white/10">
                  View All Supervisor
               </button>
            </Link>
         </div>
         {/* Project Content - Items Grid */}
         <div id="Container" className="flex flex-col items-center pb-10 gap-7">
            <h2 className="text-2xl text-center  mb-2">Discover Projects</h2>
            <div id="" className="  text-center ">
               {/* <h1 className="text-xl text-white pb-4 ">Filters</h1> */}
               <div className="flex flex-col items-center gap-4 sm:w-fit  ">
                  <SearchBar
                     placeholder="Search Project Titles ..."
                     onSearch={handleSearch}
                     delay={500}
                  />
                  <div className="flex flex-col sm:flex-row items-center">
                     <TagFilter
                        availableTags={allTags}
                        selectedTags={selectedTags}
                        onTagsChange={setSelectedTags}
                     />
                     <div className="w-full gap-3 flex justify-center sm:w-fit sm:gap-3">
                        <FilterDropdown
                           options={filterOptions}
                           onSelect={handleFilterSelect}
                           placeholder="Sort By"
                        />
                        <FilterDropdown
                           options={filterOptions}
                           onSelect={handleFilterSelect}
                           placeholder="Supervisor"
                        />
                     </div>
                  </div>
               </div>
            </div>
            {/*
             */}
            <div
               className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
">
               {MOCK_projectinfo.map((item) => {
                  return <ProjectCard project_info={item} />;
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
         return 3 * 2;
      //small
      case width > 640:
         // 4 items per row (two rows)
         return 2 * 2;

      default:
         // 2 items per row (two rows)
         return 2 * 2;
   }
}
