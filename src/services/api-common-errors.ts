import { FIREBASE_DOMAIN } from "../config/apis";
import CommonError from "../models/commonError.model";

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

  // const transformedErrors: CommonError[] = responseCommonErrorsData.reduce(
  //   (currentValue: CommonError, key: string) => {
  //     currentValue.id += responseCommonErrorsData[key];
  //     return currentValue;
  //   },
  //   []
  // );

  return transformedErrors;
};

export const getOneCommonError = () => {};

export const addCommonError = () => {};
