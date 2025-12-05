import ProjectPreviewCard from "../components/Primary/ProjectCard";
import {
  MOCK_supervisor,
  SortOptions,
  MOCK_projectinfo,
  SortTags,
} from "../testing/constants";
import { useState } from "react";
import { filterItems } from "../helpers/_SearchHelpers";
import ProfessorProfilePreview from "../components/Primary/ProfessorProfilePreview";
import SearchBar from "../components/complex/SearchBar";
import TagFilter from "../components/complex/TagFilter";
import CallOutWarning from "../components/complex/CallOutWarning";
import { sortItems } from "../helpers/_SortHelper";
import DropdownMenu from "../components/complex/DropdownMenu";
import { Link } from "react-router-dom";
import type { ProjectInfo } from "../class/ProjectInfo";

export default function ProjectsListing() {
  // Sample user data for avatars
  const [SearchedProducts, setSearchedProducts] =
    useState<ProjectInfo[]>(MOCK_projectinfo);
  const [SortOption, setSortOption] = useState<string>("name");
  const [SearchTerm, setSearchTerm] = useState<string>("");
  const [SelectedTags, setSelectedTags] = useState<Set<string>>(
    new Set<string>(),
  );

  return (
    <main className=" px-6 py-6 flex flex-col items-center gap-5">
      {/* <h1 className="text-3xl">Explore Projects</h1> */}
      {/* Avatars Section */}
      <div className=" flex flex-col w-full justify-center gap-5">
        <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center">
          Plan With Supervisors
        </h3>
        {/* grid grid-cols-3 grid-rows-2 sm:gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 */}
        <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 gap-5 justify-evenly ">
          {MOCK_supervisor.slice(0, ItemsAmmount()).map((user) => (
            <ProfessorProfilePreview ProInfo={user} />
          ))}
        </div>
        <Link to="/test" className="flex justify-center ">
          <button
            className="px-3 py-1 border-2 flex flex-row gap-1 border-white bg-banner   text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-white/10"
            // onClick={() => console.log(user, loading)}
          >
            View All Supervisor
          </button>
        </Link>
      </div>
      {/* Project Content - Items Grid */}
      <div className="flex flex-col items-center pb-10 gap-7">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center">
          Discover Projects
        </h2>
        <div id="" className="  text-center ">
          {/* <h1 className="text-xl text-white pb-4 ">Filters</h1> */}
          <div className="flex flex-col items-center gap-4 sm:w-fit  ">
            <SearchBar
              placeholder="Search Project Titles ..."
              onSearch={handleSearch}
              delay={500}
            />
            <div className="flex flex-col  sm:flex-row sm:gap-3 items-center">
              <TagFilter
                availableTags={SortTags}
                tagFilterFunc={handleTagFilter}
              />

              <div className="w-full gap-3 flex justify-center sm:w-fit sm:gap-3">
                <DropdownMenu
                  options={SortOptions}
                  onSelect={handleSortSelect}
                  placeholder="Sort By"
                />
                {/*<FilterDropdown
                  options={filterOptions}
                  onSelect={handleSortSelect}
                  placeholder="Supervisor"
                />*/}
              </div>
            </div>
          </div>
        </div>
        {SearchedProducts.length == 0 ? (
          <CallOutWarning
            text="nothing mach the title name or the description "
            classname="bg-blue-900!"
          />
        ) : (
          ""
        )}
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SearchedProducts.length !== 0
            ? SearchedProducts.map((item) => {
                return <ProjectPreviewCard project_info={item} />;
              })
            : MOCK_projectinfo.map((item) => {
                return <ProjectPreviewCard project_info={item} />;
              })}
        </div>
      </div>
    </main>
  );
  function handleSortSelect(sortOption: string) {
    setSortOption(sortOption);
    handleSearch(SearchTerm, SelectedTags, sortOption);
  }

  function handleTagFilter(tags: Set<string>) {
    setSelectedTags(tags);
    handleSearch(SearchTerm, tags, SortOption);
  }
  // Search items then Fitler items then sorte items
  function handleSearch(term: string, tags?: Set<string>, sortoption?: string) {
    setSearchTerm(term);
    //merging searching and feltering
    const filteredItems = filterItems(
      MOCK_projectinfo,
      term,
      tags ? tags : SelectedTags,
      ["title", "description"] /*selectedTags*/,
    );
    const sortedItems = sortItems(
      filteredItems,
      sortoption ? sortoption : SortOption,
    );
    setSearchedProducts(sortedItems);
  }
}
//desciding how many (Professors) items based on the size of the screen (big-avrage-small-phone)
// the goal is to limite the ammount of SHOWING , the css determand the number of divesions (colm's) per row
function ItemsAmmount() {
  const width = window.innerWidth;

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
