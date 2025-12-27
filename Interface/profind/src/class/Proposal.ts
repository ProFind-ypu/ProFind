export type Proposal = {
  id: number;
  title: string;
  studentId: number;
  professorId: number;
  projectId: number;
  status: string;
  message: string;
  formData: string;
  createdAt: string;
  updatedAt: string;
};
// "professorId": 1,
//"projectId": 1,
// "message": "Proposal message",
// "formData": {"projectType": 1,"arabicTitle": "عنوان المشروع بالعربية","englishTitle": "Project Title in English","scientificField": [3, 7, 12],"targetEntities": "Universities and Research Centers","projectDescription": "A detailed description of the project scope and objectives.","expectedOutcomes": "Published papers, prototype development, and trained students.","requiredSkillsTools": "Python, React, TensorFlow, Git","acquiredSkills": "Machine Learning, Web Development, Team Collaboration","supervisors": ["Dr. Ahmed", "Prof. Sarah"],"studentsnumber": 5,"students": [  { "name": "Alice", "uni_id": "202110076" },  { "name": "Charlie", "uni_id": "2152364" }]}}'
