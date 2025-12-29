export const SkillList: React.FC<{
  skills: string[];
  onAddSkill: () => void;
  onRemoveSkill: (index: number) => void;
  onSkillChange: (index: number, value: string) => void;
}> = ({ skills, onAddSkill, onRemoveSkill, onSkillChange }) => {
  return (
    <div className="flex flex-col justify-center space-y-2">
      {skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <input
            type="text"
            value={skill}
            onChange={(e) => onSkillChange(index, e.target.value)}
            className="flex-1 p-2 bg-[#252525] border border-[#333] rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            placeholder="Enter skill"
          />
          <button
            onClick={() => onRemoveSkill(index)}
            className="p-2 hidden sm:block bg-red-700 hover:bg-red-800 rounded-lg text-white transition-colors"
          >
            Remove
          </button>
          <button
            onClick={() => onRemoveSkill(index)}
            className="p-2 py-1 sm:hidden  bg-red-700 hover:bg-red-800 rounded-lg text-white transition-colors"
          >
            &mdash;
          </button>
        </div>
      ))}
      <div className="w-full flex justify-center ">
        <button
          onClick={onAddSkill}
          className="w-[40%] py-2  bg-indigo-600 hover:bg-indigo-700 rounded-lg font-medium transition-colors"
        >
          + Add Skill
        </button>
      </div>
    </div>
  );
};
