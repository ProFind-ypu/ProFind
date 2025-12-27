export type ProjectInfo = {
  id: number;
  proposalId: number;
  title: string;
  description: string;
  shortDescription: string;
  status: string;
  tags: Set<string>;
  requirements: string[];
  suggestedStudentCount: number;
  professorId: string;
  createdAt: string;
};
