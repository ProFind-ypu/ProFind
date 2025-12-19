import ProjectPreviewCard from "../components/Primary/ProjectPreviewCard";
import { MOCK_supervisor, SortOptions, SortTags } from "../testing/constants";
import { useEffect, useState } from "react";
import { filterItems } from "../helpers/_SearchHelpers";
import ProfessorProfilePreview from "../components/Primary/ProfessorProfilePreview";
import SearchBar from "../components/complex/SearchBar";
import TagFilter from "../components/complex/TagFilter";
import CallOutWarning from "../components/complex/CallOutWarning";
import { sortItems } from "../helpers/_SortHelper";
import DropdownMenu from "../components/complex/DropdownMenu";
import { Link } from "react-router-dom";
import type { ProjectInfo } from "../class/ProjectInfo";
import ProjectService from "../class/projectService";

export default function ProjectsListing() {
  const [SearchedProducts, setSearchedProducts] = useState<ProjectInfo[]>([]);
  const [SortOption, setSortOption] = useState<string>("name");
  const [SearchTerm, setSearchTerm] = useState<string>("");
  const [SelectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const service = ProjectService.getInstance();
        const projects = await service.fetchProjects();
        setSearchedProducts(projects);
      } catch (error) {
        console.error("Failed to fetch projects:", error);
        setSearchedProducts([]);
      }
    };

    loadProjects();
  }, []);

  return (
    <main className="px-6 py-6 flex flex-col items-center gap-5">
      {/* Avatars Section */}
      <div className="flex flex-col w-full justify-center gap-5">
        <h3 className="text-3xl md:text-4xl font-extrabold text-white text-center">
          Plan With Supervisors
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-evenly">
          {MOCK_supervisor.slice(0, ItemsAmmount()).map((user) => (
            <ProfessorProfilePreview ProInfo={user} />
          ))}
        </div>
        <Link to="/test" className="flex justify-center">
          <button className="px-3 py-1 border-2 flex flex-row gap-1 border-white bg-banner text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-white/10">
            View All Supervisor
          </button>
        </Link>
      </div>

      {/* Project Content - Items Grid */}
      <div className="flex flex-col items-center pb-10 gap-7">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white text-center">
          Discover Projects
        </h2>
        <div className="flex flex-col items-center gap-4 sm:w-fit">
          <SearchBar
            placeholder="Search Project Titles ..."
            onSearch={handleSearch}
            delay={500}
          />
          <div className="flex flex-col sm:flex-row sm:gap-3 items-center">
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
            </div>
          </div>
        </div>

        {SearchedProducts.length === 0 ? (
          <CallOutWarning
            text="nothing match the title name or the description"
            classname="bg-blue-900!"
          />
        ) : (
          ""
        )}

        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {SearchedProducts.map((item) => (
            <ProjectPreviewCard project_info={item} key={item.id} />
          ))}
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

  function handleSearch(term: string, tags?: Set<string>, sortoption?: string) {
    setSearchTerm(term);
    const filteredItems = filterItems(
      SearchedProducts, // Use fetched data, not MOCK_projectinfo
      term,
      tags || SelectedTags,
      ["title", "description"],
    );
    const sortedItems = sortItems(filteredItems, sortoption || SortOption);
    setSearchedProducts(sortedItems);
  }
}

function ItemsAmmount() {
  const width = window.innerWidth;

  switch (true) {
    case width > 768:
      return 3 * 2;
    case width > 640:
      return 2 * 2;
    default:
      return 2 * 2;
  }
}
