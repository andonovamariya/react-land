import { FIREBASE_DOMAIN } from "../config/api";
import Solution from "../models/solution.model";

interface AddSolutionRequestData {
  bugId: string;
  solutionData: Solution;
}

interface AddSolutionResponseData {
  solutionId: string;
}

export const addSolution: (
  requestData: AddSolutionRequestData
) => Promise<AddSolutionResponseData> = async (requestData) => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/bugSolutions/${requestData.bugId}.json`,
    {
      method: "POST",
      body: JSON.stringify(requestData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responseSolutionData = await response.json();
  if (!response.ok) {
    throw new Error(
      responseSolutionData.message ||
        "Could not fetch solutions for that exact bug."
    );
  }
  return { solutionId: responseSolutionData.name };
};

export const getAllSolutions: (bugId: string) => Promise<Solution[]> = async (
  bugId
) => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/solutions/${bugId}.json`
  );

  const solutionData = await response.json();

  if (!response.ok) {
    throw new Error(solutionData.message || "Could not get comments.");
  }

  const transformedSolutions: Solution[] = [];

  for (const key in solutionData) {
    const solutionObject = {
      id: key,
      ...solutionData[key],
    };

    transformedSolutions.push(solutionObject);
  }

  return transformedSolutions;
};

export const addSolutionToPractice: (
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
  const responseEditedPractice = await response.json();
  if (!response.ok) {
    throw new Error(
      responseEditedPractice.message || "Could not add solution to practice."
    );
  }
};
