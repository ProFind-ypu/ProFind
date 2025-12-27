import React, { useState } from "react";
import type { Projectdto } from "../class/Services/ProjectDto";
import { postNewProject } from "../class/Services/_potNewProject";
import { useNavigate } from "react-router-dom";

const NewProject: React.FC = () => {
  const [projectDto, setFormData] = useState<Projectdto>({
    title: "",
    shortDescription: "",
    description: "",
    requirements: [""],
    tags: [""],
    status: "DRAFT",
    proposalId: "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  });
  const nav = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    //TODO :add input varifecation
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

  const updateField = (
    field: "requirements" | "tags",
    index: number,
    value: string,
  ) => {
    const updated = [...projectDto[field]];
    updated[index] = value;
    setFormData((prev) => ({ ...prev, [field]: updated }));
  };

  return (
    <div className="sm:ml-[20%] min-h-screen p-6 ">
      <div className="max-w-4xl mx-auto">
        <div className="backdrop-blur-lg bg-black/20 border border-white/50 rounded-xl p-8 shadow-lg">
          <h1 className="text-2xl font-bold text-white mb-6">Project Form</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={projectDto.title}
                  onChange={(e) =>
                    setFormData({ ...projectDto, title: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/10 border border-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Status
                </label>
                <select
                  value={projectDto.status}
                  onChange={(e) =>
                    setFormData({ ...projectDto, status: e.target.value })
                  }
                  className="w-full px-4 py-2 bg-black/10 border border-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PENDING">Pending</option>
                  <option value="APPROVED">Approved</option>
                  <option value="REJECTED">Rejected</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-2">
                Short Description
              </label>
              <textarea
                value={projectDto.shortDescription}
                onChange={(e) =>
                  setFormData({
                    ...projectDto,
                    shortDescription: e.target.value,
                  })
                }
                rows={3}
                className="w-full px-4 py-2 bg-black/10 border border-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-indigo-200 mb-2">
                Description
              </label>
              <textarea
                value={projectDto.description}
                onChange={(e) =>
                  setFormData({ ...projectDto, description: e.target.value })
                }
                rows={6}
                className="w-full px-4 py-2 bg-black/10 border border-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
                    className="flex-1 px-4 py-2 bg-black/10 border border-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {index === projectDto.requirements.length - 1 && (
                    <button
                      type="button"
                      onClick={() => addField("requirements")}
                      className="px-3 py-2 bg-indigo-900/50 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                    >
                      +
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
                    className="flex-1 px-4 py-2 bg-black/10 border border-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {index === projectDto.tags.length - 1 && (
                    <button
                      type="button"
                      onClick={() => addField("tags")}
                      className="px-3 py-2 bg-indigo-900/50 text-white rounded-lg hover:bg-indigo-800 transition-colors"
                    >
                      +
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

            <div className="pt-4">
              <button
                type="submit"
                className="w-full px-6 py-3 bg-indigo-700 text-white font-medium rounded-lg hover:bg-indigo-600 transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                {/*Save Project*/}
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
