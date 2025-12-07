export type ProjectInfo = {
  id: number;
  title: string;
  description: string;
  status: boolean;
  tags: Set<string>;
  requirements: string[];
  suggestedStudentCount: number;
  supervisor: string;
  creation_time: Date;
};
