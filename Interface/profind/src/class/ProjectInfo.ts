export type ProjectInfo = {
  id: number;
  title: string;
  description: string;
  shortDescription: string;
  status: string;
  tags: Set<string>;
  requirments: string[];
  suggestedStudentCount: number;
  professorId: string;
  createdAt: string;
};
