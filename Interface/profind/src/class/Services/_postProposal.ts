import axios from "axios";
import type { Proposal } from "../Proposal";
import type { User } from "../User";
type proposalSender = {
  professorId: number;
  projectId: number;
  message: string;
  formData: string;
};
export async function postProposal(proposal: Proposal, user: User) {
  const data: proposalSender = {
    professorId: proposal.professorId,
    projectId: proposal.projectId,
    message: proposal.message,
    formData: JSON.parse(proposal.formData),
  };
  const response = await axios.post("/api/proposals", data, {
    headers: {
      Authorization: "Bearer " + user.token,
    },
  });
  return response.data;
}
//{"headers":{"Content-Type":"application/json","Authorization":"Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxIiwiaWF0IjoxNzY2NzQ1MDUyLCJleHAiOjE3NjY3NDg2NTIsImVtYWlsIjoicHJvZmVzc29yQGV4YW1wbGUuY29tIiwicm9sZXMiOiJQUk9GRVNTT1IiLCJmdWxsbmFtZSI6IlNhd3Nhbk1oYWxsYSIsImF2YXRhclVybCI6IiIsImFjY291bnRTdGF0dXMiOiJPUEVOIiwidGFncyI6IiJ9.bmiZid4xgKGn5gPC9BwEs5xaomjCBpnm2-JD-O7igkc"},"proposal":{"id":1,"studentId":1,"professorId":1,"projectId":1,"status":"PENDING","message":"hallowWorld","formData":"{\"students\": [{\"name\": \"Alice\", \"uni_id\": \"202110076\"}, {\"name\": \"Charlie\", \"uni_id\": \"2152364\"}], \"arabicTitle\": \"عنوان المشروع بالعربية\", \"projectType\": 1, \"supervisors\": [\"Dr. Ahmed\", \"Prof. Sarah\"], \"englishTitle\": \"Project Title in English\", \"acquiredSkills\": \"Machine Learning, Web Development, Team Collaboration\", \"studentsnumber\": 5, \"targetEntities\": \"Universities and Research Centers\", \"scientificField\": [3, 7, 12], \"expectedOutcomes\": \"Published papers, prototype development, and trained students.\", \"projectDescription\": \"A detailed description of the project scope and objectives.\", \"requiredSkillsTools\": \"Python, React, TensorFlow, Git\"}","createdAt":"2025-12-26T10:20:07.989094Z","updatedAt":"2025-12-26T10:20:07.989094Z"}}
