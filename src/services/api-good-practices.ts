import GoodPractice from "../models/goodPractice.model";

import { FIREBASE_DOMAIN } from "../config/api";

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

export const deletePractice: (practiceId: string) => Promise<void> = async (
  practiceId: string
) => {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/goodPractices/${practiceId}.json`,
    {
      method: "DELETE",
      body: JSON.stringify(practiceId),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  const responseData = await response.json();
  if (!response.ok) {
    throw new Error(responseData.message || "Could not delete practice.");
  }
};

export const addPractice: (
  practiceInputData: GoodPractice
) => Promise<void> = async (practiceInputData) => {
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
