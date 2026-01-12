export interface Projectdto {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  requirements: string[];
  tags: string[];
  // status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  status: string;
  proposalId: string;
  createdAt: string;
  updatedAt: string;
}
