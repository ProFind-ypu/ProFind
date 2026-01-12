import React, { useState } from "react";
import type { Projectdto } from "../class/Services/ProjectDto";
import { postNewProject } from "../class/Services/_potNewProject";
import { useNavigate } from "react-router-dom";
import DropdownMenu from "../components/complex/DropdownMenu";
import CallOutWarning from "../components/complex/CallOutWarning";

const NewProject: React.FC = () => {
  const [projectDto, setFormData] = useState<Projectdto>({
    id: -1,
    title: "",
    shortDescription: "",
    description: "",
    requirements: [""],
    tags: [""],
    status: "PENDING",
    proposalId: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const [errors, setErrors] = useState<string | null>(null);
  const nav = useNavigate();
  const FilterOption = [
    { label: "Pending", value: "PENDING" },
    { label: "Draft", value: "Draft" },
    // { label: "", value: "" },
  ];
  const validate = (): boolean => {
    let newErrors: string | null = null;

    if (projectDto.tags.length < 1 || projectDto.tags[0].length < 1)
      newErrors = "at least one tags must be filled";
    if (
      projectDto.requirements.length < 1 ||
      projectDto.requirements.length < 1
    )
      newErrors = "at least one requirements must be filled";
    if (!projectDto.description.trim()) newErrors = "Description is required";
    if (!projectDto.shortDescription.trim())
      newErrors = "Short description is required";
    if (!projectDto.title.trim()) newErrors = "Title is required";

    setErrors(newErrors);
    if (newErrors == null) return true;
    else return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const data = await postNewProject(projectDto);
    if (data != null) {
      nav(`/ApplicationForm?id=null&projectId=${data.id}`);
    }
    console.log("Form data:", projectDto);
  };

  const addField = (field: "requirements" | "tags") => {
    setFormData((prev) => ({
      ...prev,
      [field]: [...prev[field], ""],
    }));
  };
  const removeField = (field: "requirements" | "tags", index: number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: prev[field].filter((_, i) => i !== index),
    }));
  };
  const updateField = (
    field: "requirements" | "tags",
    index: number,
    value: string,
  ) => {
    const updated = [...projectDto[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
    validate();
  };

  return (
    <div className="sm:ml-[20%] min-h-screen p-6 ">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-black/20 border border-white/50 rounded-xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-6">Project Form</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="sm:col-span-2">
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={projectDto.title}
                  onChange={(e) =>
                    setFormData({ ...projectDto, title: e.target.value })
                  }
                  className={`w-full rounded-lg px-4 py-2 bg-black/10 border `}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Status
                </label>
                <DropdownMenu
                  options={FilterOption}
                  placeholder="Staus"
                  backgroundClass=" flex"
                  onSelect={() => {}}
                />
              </div>
              {/*<label className="block text-sm font-medium text-indigo-200 mb-2">
                  Status
                </label>
                <select
                  value={projectDto.status}
                  onChange={(e) =>
                    setFormData({ ...projectDto, status: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/10 border border-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option className="bg-black/50 blur-md" value="DRAFT">
                    Draft
                  </option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>*/}
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-2">
                Short Description
              </label>
              <textarea
                value={projectDto.shortDescription}
                onChange={(e) => {
                  setFormData({
                    ...projectDto,
                    shortDescription: e.target.value,
                  });
                  validate();
                }}
                rows={3}
                className={`w-full rounded-lg px-4 py-2 bg-black/10 border `}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-2">
                Description
              </label>
              <textarea
                value={projectDto.description}
                onChange={(e) => {
                  setFormData({ ...projectDto, description: e.target.value });
                  validate();
                }}
                rows={6}
                className={`w-full rounded-lg px-4 py-2 bg-black/10 border `}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-2">
                Requirements
              </label>
              {projectDto.requirements.map((req, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) =>
                      updateField("requirements", index, e.target.value)
                    }
                    className={`flex-1 rounded-lg px-4 py-2 bg-black/10 border `}
                  />

                  {index === projectDto.requirements.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => addField("requirements")}
                      className="px-3 py-2 bg-indigo-900/50 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeField("requirements", index)}
                      className="px-3 py-2 bg-red-700/90 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      &ndash;
                    </button>
                  )}
                </div>
              ))}
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-2">
                Tags
              </label>
              {projectDto.tags.map((tag, index) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input
                    type="text"
                    value={tag}
                    onChange={(e) => updateField("tags", index, e.target.value)}
                    className={`flex-1 px-4 rounded-lg py-2 bg-black/10 border `}
                  />
                  {index === projectDto.tags.length - 1 ? (
                    <button
                      type="button"
                      onClick={() => addField("tags")}
                      className="px-3 py-2 bg-indigo-900/50 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                    >
                      +
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => removeField("tags", index)}
                      className="px-3 py-2 bg-red-700/90 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                    >
                      &ndash;
                    </button>
                  )}
                </div>
              ))}
            </div>

            <input
              type="hidden"
              name="proposalId"
              required
              value={projectDto.proposalId}
            />
            <input
              type="hidden"
              required
              name="createdAt"
              value={projectDto.createdAt}
            />
            <input
              type="hidden"
              required
              name="updatedAt"
              value={projectDto.updatedAt}
            />
            {errors != null ? <CallOutWarning text={errors} /> : ""}
            <div className="pt-4">
              <button
                type="submit"
                disabled={errors != null}
                className="w-full px-6 py-3 bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Next
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewProject;
