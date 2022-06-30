const FIREBASE_DOMAIN =
  "https://react-land-blog-default-rtdb.europe-west1.firebasedatabase.app";

export async function getAllPractices() {
  const response = await fetch(`${FIREBASE_DOMAIN}/goodPractices.json`);
  const responsePracticeData = await response.json();

  if (!response.ok) {
    throw new Error(
      responsePracticeData.message || "Could not fetch practices."
    );
  }

  const transformedPractices = [];

  for (const key in responsePracticeData) {
    const practiceObject = {
      id: key,
      ...responsePracticeData[key],
    };

    transformedPractices.push(practiceObject);
  }

  return transformedPractices;
}

export async function getOnePractice(practiceId) {
  const response = await fetch(
    `${FIREBASE_DOMAIN}/goodPractices/${practiceId}.json`
  );
  const responsePracticeData = await response.json();

  if (!response.ok) {
    throw new Error(responsePracticeData.message || "Could not fetch quote.");
  }

  const loadedPractice = {
    id: practiceId,
    ...responsePracticeData,
  };

  return loadedPractice;
}

export async function addPractice(practiceData) {
  const response = await fetch(`${FIREBASE_DOMAIN}/goodPractices.json`, {
    method: "POST",
    body: JSON.stringify(practiceData),
    headers: {
      "Content-Type": "application/json",
    },
  });
  const responsePracticeData = await response.json();

  if (!response.ok) {
    throw new Error(responsePracticeData.message || "Could not create quote.");
  }

  return null;
}
