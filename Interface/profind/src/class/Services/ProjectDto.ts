export interface Projectdto {
  id: number;
  title: string;
  shortDescription: string;
  description: string;
  requirements: string[];
  tags: string[];
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  proposalId: string;
  createdAt: string;
  updatedAt: string;
}
