import { useEffect, useState } from "react";
import type { Professor } from "../class/Professor";
import ProfessorsService from "../class/Services/ProfessorsService";
import ProfessorProfilePreview from "../components/Primary/ProfessorProfilePreview";
import { useNavigate } from "react-router-dom";
import SearchBar from "../components/complex/SearchBar";
import TagFilter from "../components/complex/TagFilter";
import DropdownMenu from "../components/complex/DropdownMenu";
import { SortTags } from "../testing/constants";
import { sortProfessors } from "../helpers/_SortHelper";
import { filterProfessors } from "../helpers/_SearchHelpers";
import CallOutWarning from "../components/complex/CallOutWarning";
const SortOptions = [
  { label: "Name", value: "name" },
  { label: "Department", value: "department" },
];
export default function ProfessorsList() {
  const [FullProfessorsList, setFullProfessorsList] = useState<Professor[]>([]);
  const [FilteredProfessorsList, setFilteredProfessors] = useState<Professor[]>(
    [],
  );
  const [SortOption, setSortOption] = useState<string>("name");
  const [SearchTerm, setSearchTerm] = useState<string>("");
  const [SelectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const navigate = useNavigate();
  useEffect(() => {
    const loadProfessors = async () => {
      try {
        const service = ProfessorsService.getInstance();
        const professors = await service.fetchProjects();
        setFullProfessorsList(professors);
        setFilteredProfessors(professors);
      } catch (error) {
        console.error("Failed to fetch professors:", error);
        setFullProfessorsList([]);
        setFilteredProfessors([]);
      }
    };
    loadProfessors();
  }, []);
  return (
    <main className="flex justify-center flex-col items-center pl-10 pr-10">
      <h1 className="text-4xl text-white p-10 ph-15">Find Your Suppervisor</h1>
      <div className="flex flex-col items-center gap-4 sm:w-fit">
        <SearchBar
          placeholder="Search Project Titles ..."
          onSearch={handleSearch}
          delay={500}
        />
        <div className="flex flex-col sm:flex-row sm:gap-3 items-center">
          <TagFilter availableTags={SortTags} tagFilterFunc={handleTagFilter} />
          <div className="w-full gap-3 flex justify-center sm:w-fit sm:gap-3">
            <DropdownMenu
              options={SortOptions}
              onSelect={handleSortSelect}
              placeholder="Sort By"
            />
          </div>
        </div>
      </div>
      <div className="p-9">
        {FilteredProfessorsList.length === 0 ? (
          <CallOutWarning
            text="nothing match the name or the description of the Professor"
            classname="bg-blue-900!"
          />
        ) : (
          ""
        )}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 justify-evenly">
        {FilteredProfessorsList.length === 0
          ? FullProfessorsList.map((user) => (
              <ProfessorProfilePreview ProInfo={user} nav={navigate} />
            ))
          : FilteredProfessorsList.map((user) => (
              <ProfessorProfilePreview ProInfo={user} nav={navigate} />
            ))}
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
    const filteredItems = filterProfessors(
      FullProfessorsList,
      term,
      tags || SelectedTags,
      ["fullName", "bio"],
    );
    const sortedItems = sortProfessors(filteredItems, sortoption || SortOption);
    setFilteredProfessors(sortedItems);
  }
}
