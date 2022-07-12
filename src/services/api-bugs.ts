import { FIREBASE_DOMAIN } from "../config/api";
import Bug from "../models/bug.model";

export const getAllBugs: () => Promise<Bug[]> = async () => {
  const response: Response = await fetch(`${FIREBASE_DOMAIN}/bugs.json`);
  const responseBugsData = await response.json();
  if (!response.ok) {
    throw new Error(responseBugsData.message || "Could not fetch bugs.");
  }

  const transformedBugsData: Bug[] = [];

  for (const key in responseBugsData) {
    const bugObject = {
      id: key,
      ...responseBugsData[key],
    };
    transformedBugsData.push(bugObject);
  }

  return transformedBugsData;
};

export const getOneBug: (bugId: string) => Promise<Bug> = async (bugId) => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/bugs/${bugId}.json`
  );
  const responseBugData = await response.json();

  if (!response.ok) {
    throw new Error(
      responseBugData.message || "Could not fetch that exact bug."
    );
  }

  const loadedBug: Bug = {
    id: bugId,
    ...responseBugData,
  };

  return loadedBug;
};

export const addBug: (bugInputData: Bug) => Promise<void> = async (
  bugInputData
) => {
  const response: Response = await fetch(`${FIREBASE_DOMAIN}/bugs.json`, {
    method: "POST",
    body: JSON.stringify(bugInputData),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const responseBugsData = await response.json();
  if (!response.ok) {
    throw new Error(responseBugsData.message || "Could not add a new bug.");
  }
};
