import { FIREBASE_DOMAIN } from "../config/api";
import Solution from "../models/solution.model";

export const getAllSolutionsForABug: (bugId: string) => Promise<Solution[]> = async (
  bugId
) => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/bugs/${bugId}/solution.json`
  );

  const responseSolutionData = await response.json();

  if (!response.ok) {
    throw new Error(responseSolutionData.message || "Could not fetch solutions for that exact bug.");
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
