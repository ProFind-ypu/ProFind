import axios from "axios";
import type { Proposal } from "../Proposal";

export const getSingelProposal = async (
  proposalId: number,
): Promise<Proposal> => {
  try {
    const response = await axios.get<Proposal>("/api/proposals/" + proposalId);
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
export const getMyProposals = async (
  userToken: string,
): Promise<Proposal[]> => {
  try {
    const response = await axios.get<Proposal[]>("/api/proposals/me", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + userToken,
      },
    });
    if (response.status != 200) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};
