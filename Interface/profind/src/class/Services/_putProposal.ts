// api/proposals.ts

import axios, { AxiosError } from "axios";
import type { Proposal } from "../Proposal";
import type { User } from "../User";

const API_BASE_URL = "/api/proposals"; // Adjust if needed

interface ErrorResponse {
  error: string;
}

export const approveProposal = async (
  proposalId: number,
  user: User,
): Promise<any> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}`,
      {
        action: "approve",
        proposalId,
      },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.data?.error) {
        throw new Error(axiosError.response.data.error);
      }
      throw new Error(`Network error: ${axiosError.message}`);
    }
    throw new Error("Unknown error occurred");
  }
};

export const updateProposal = async (
  proposalId: number,
  user: User,
  proposal: Proposal,
): Promise<any> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}`,
      {
        action: "update",
        proposalId,
        proposal,
      },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.data?.error) {
        throw new Error(axiosError.response.data.error);
      }
      throw new Error(`Network error: ${axiosError.message}`);
    }
    throw new Error("Unknown error occurred");
  }
};

export const disapproveProposal = async (
  proposalId: number,
  user: User,
): Promise<any> => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}`,
      {
        action: "disapprove",
        proposalId,
      },
      { headers: { Authorization: `Bearer ${user.token}` } },
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ErrorResponse>;
      if (axiosError.response?.data?.error) {
        throw new Error(axiosError.response.data.error);
      }
      throw new Error(`Network error: ${axiosError.message}`);
    }
    throw new Error("Unknown error occurred");
  }
};
