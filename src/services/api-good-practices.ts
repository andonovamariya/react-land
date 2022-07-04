import GoodPractice from "../models/goodPractice.model";

import { FIREBASE_DOMAIN } from "../config/apis";

export const getAllPractices: () => Promise<GoodPractice[]> = async () => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/goodPractices.json`
  );
  const responsePracticeData = await response.json();
  if (!response.ok) {
    throw new Error(
      responsePracticeData.message || "Could not fetch practices."
    );
  }

  const transformedPractices: GoodPractice[] = [];

  for (const key in responsePracticeData) {
    const practiceObject = {
      id: key,
      ...responsePracticeData[key],
    };

    transformedPractices.push(practiceObject);
  }

  return transformedPractices;
};

export const getOnePractice: (
  practiceId: string
) => Promise<GoodPractice> = async (practiceId: string) => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/goodPractices/${practiceId}.json`
  );
  const responsePracticeData = await response.json();

  if (!response.ok) {
    throw new Error(
      responsePracticeData.message ||
        "Could not fetch that exact good practice."
    );
  }

  const loadedPractice: GoodPractice = {
    id: practiceId,
    ...responsePracticeData,
  };

  return loadedPractice;
};

export const addPractice: (
  practiceInputData: GoodPractice
) => Promise<void> = async (practiceInputData: GoodPractice) => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/goodPractices.json`,
    {
      method: "POST",
      body: JSON.stringify(practiceInputData),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  const responsePracticeData = await response.json();
  if (!response.ok) {
    throw new Error(responsePracticeData.message || "Could not create quote.");
  }
};
