import { getToken } from "../../Auth/localStorage";
import type { Proposal } from "../Proposal";
import { getMyProposals, getSingelProposal } from "./_getProposalsFromServer";

export default class ProposalService {
  private proposal: Proposal | null = null;

  private constructor() {}
  async fetchPropopsal(id: number): Promise<Proposal> {
    this.proposal = await getSingelProposal(id); // Replace with actual method
    console.log(this.proposal);
    return this.proposal;
  }
  async fetchMyProposals(usertoken: string): Promise<Proposal[]> {
    return await getMyProposals(usertoken);
  }

  getProjects(): Proposal | null {
    return this.proposal;
  }
}
