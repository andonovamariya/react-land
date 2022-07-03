import CommonError from "../models/commonError.model";

const FIREBASE_DOMAIN: string =
  "https://react-land-blog-default-rtdb.europe-west1.firebasedatabase.app";

export const getAllCommonErrors: () => Promise<CommonError[]> = async () => {
  const response: Response = await fetch(
    `${FIREBASE_DOMAIN}/commonErrors.json`
  );
  const responseCommonErrorsData = await response.json();
  if (!response.ok) {
    throw new Error(
      responseCommonErrorsData.message || "Could not fetch common errors."
    );
  }

  const transformedErrors: CommonError[] = [];

  for (const key in responseCommonErrorsData) {
    const commonErrorObject = {
      id: key,
      ...responseCommonErrorsData[key],
    };
    transformedErrors.push(commonErrorObject);
  }
  return transformedErrors;
};

export const getOneCommonError = () => {};

export const addCommonError = () => {};
