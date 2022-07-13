import { FIREBASE_DOMAIN } from "../config/api";
import Solution from "../models/solution.model";

export const getAllSolutionsForABug: (
  bugId: string
) => Promise<Solution[]> = async (bugId) => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/bugs/${bugId}/solution.json`
  );

  const responseSolutionData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseSolutionData.message ||
        "Could not fetch solutions for that exact bug."
    );
  }

  const transformedSolutions: Solution[] = [];

  for (const key in responseSolutionData) {
    const solutionObject = {
      id: key,
      ...responseSolutionData[key],
    };

    transformedSolutions.push(solutionObject);
  }

  return transformedSolutions;
};

export const addSolutionToBug: (
  solutionInputData: Solution
) => Promise<void> = async (solutionInputData) => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/bugs/${solutionInputData.bugId}/solution.json`,
    {
      method: "POST",
      body: JSON.stringify(solutionInputData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(
      responseData.message || "Could not add solution to the bug."
    );
  }
};

interface ApprovedSolutionData {
  id: string;
  bugId: string;
  fixerEmail: string;
  solutionId: string;
}

export const approveSolution: (
  approvedSolutionData: ApprovedSolutionData
) => Promise<void> = async ({ bugId, fixerEmail, id }) => {
  const approvedSolutionExtraData = { isSolved: true, fixerEmail: fixerEmail };
  const responseUpdateisSolved: Response = await fetch(
    `${FIREBASE_DOMAIN}/bugs/${bugId}/isSolved/.json`,
    {
      method: "PATCH",
      body: JSON.stringify(approvedSolutionExtraData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await responseUpdateisSolved.json();
  if (!responseUpdateisSolved.ok) {
    throw new Error(
      responseData.message ||
        "Could not change the status of the bug to solved."
    );
  }
  const isSuccessfullyApproved = { isApproved: true };
  const responseApproveSolution: Response = await fetch(
    `${FIREBASE_DOMAIN}/bugs/${bugId}/solution/${id}/.json`,
    {
      method: "PATCH",
      body: JSON.stringify(isSuccessfullyApproved),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseDataApproveSolution = await responseApproveSolution.json();
  if (!responseDataApproveSolution.ok) {
    throw new Error(
      responseDataApproveSolution.message ||
        "Could not change the status of the solution to be approved."
    );
  }
};
