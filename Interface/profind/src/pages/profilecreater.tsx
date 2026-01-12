import React, { useState } from "react";
import DropdownMenu from "../components/complex/DropdownMenu";
import { SkillList } from "../components/complex/SkillList";
import {
  postProfile,
  type ProfileSender,
} from "../class/Services/_postProfile";
import { UseAuth } from "../Auth/AuthContext";
import { Navigate } from "react-router-dom";
import CallOutWarning from "../components/complex/CallOutWarning";

// SkillList Component

const ProfileForm: React.FC = () => {
  const { user } = UseAuth();
  const [formData, setFormData] = useState<ProfileSender>({
    department_id: -1,
    bio: "",
    skills: [""] as string[],
    altEmail: user?.email ?? "",
    telephoneNumber: "",
  });
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const DropMenuOptions = [
    { label: "Software Engineering", value: "1" },
    { label: "Network Engineering", value: "2" },
  ];

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrorMessage(validateForm(formData));
  };

  const handleAddSkill = () => {
    setFormData((prev) => ({
      ...prev,
      skills: [...prev.skills, ""],
    }));
  };

  const handleRemoveSkill = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index),
    }));
  };

  const handleSkillChange = (index: number, value: string) => {
    setFormData((prev) => {
      const newSkills = [...prev.skills];
      newSkills[index] = value;
      return { ...prev, skills: newSkills };
    });
    setErrorMessage(validateForm(formData));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitting:", formData);
    if (varifyForm(formData) && user != null) {
      postProfile(formData, user);
    }
  };
  if (user == null) {
    Navigate({ to: "/login" });
  }

  return (
    <div className="min-h-screen bg-[#1f1f1f] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Glass Card */}
        <div className="backdrop-blur-lg bg-[#2a2a2a] rounded-2xl p-8 shadow-xl border border-[#333]">
          <h1 className="text-2xl font-bold mb-6 text-indigo-400">
            Profile Information
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className=" w-full flex flex-col items-end gap-3 sm:flex-row ">
              {/* Alternative Email */}
              <div className=" w-full ">
                <label className="block text-sm font-medium mb-2">
                  Alternative Email <br />
                  <p className="text-gray-500 text-wrap">
                    (this email will be showed to the Student Instade of your
                    actual email)
                  </p>
                </label>
                <input
                  type="email"
                  name="altEmail"
                  value={formData.altEmail}
                  onChange={handleChange}
                  className="w-full p-3 bg-[#252525] border border-[#333] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="alternative@example.com (You can leave it empty)"
                />
              </div>
              {/* Department ID */}
              <div className="w-full sm:w-fit">
                <label className="block text-sm font-medium mb-2 ">
                  Department
                </label>
                <DropdownMenu
                  backgroundClass=" w-full sm:w-fit bg-[#252525] border border-[#333] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent p-1"
                  textClass=" text-lg font-medium "
                  placeholder="Choose Your department "
                  options={DropMenuOptions}
                  onSelect={(e) => {
                    formData.department_id = Number.parseInt(e);
                  }}
                />
              </div>
            </div>
            {/* Phone Number */}
            <div>
              <label className="block text-sm font-medium mb-2">
                Phone Number
              </label>
              <input
                type="text"
                name="telephoneNumber"
                value={formData.telephoneNumber}
                onChange={handleChange}
                className="w-full p-3 bg-[#252525] border border-[#333] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="+1234567890"
              />
            </div>
            {/* Skills */}
            <div>
              <label className="block text-sm font-medium mb-2">Skills</label>
              <SkillList
                skills={formData.skills}
                onAddSkill={handleAddSkill}
                onRemoveSkill={handleRemoveSkill}
                onSkillChange={handleSkillChange}
              />
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-medium mb-2">Bio</label>
              <textarea
                name="bio"
                value={formData.bio}
                onChange={handleChange}
                className="w-full p-3 bg-[#252525] border border-[#333] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
                rows={4}
                placeholder="Tell us about yourself..."
              />
            </div>
            {errorMessage != null ? <CallOutWarning text={errorMessage} /> : ""}
            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors duration-200"
              >
                Save Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfileForm;
function validateForm(formData: ProfileSender): string | null {
  if (formData.department_id === -1) return "Department is required";

  if (!/^\+?\d{8,}$/.test(formData.telephoneNumber))
    return "Phone number must be 8+ digits";

  if (formData.skills.length < 2) return "At least two skill is required";
  if (formData.bio.trim().length < 10)
    return "Bio must be at least 10 characters";
  return null;
}
function varifyForm(formData: ProfileSender): boolean {
  if (formData.department_id == -1) {
    console.log("error -1 department id");
    return false;
  }
  if (formData.bio.length < 10) {
    console.log("error bio is too short");
    return false;
  }
  if (
    formData.telephoneNumber.length < 8 ||
    formData.telephoneNumber.match("[a-z]")
  ) {
    console.log("error telphone number is wrong");
    return false;
  }
  if (formData.skills.length < 1) {
    console.log("error no skills were added ");
    return false;
  }
  return true;
}
