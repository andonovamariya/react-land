import HttpStatuses from "../enums/httpStatuses";
import { AuthenticationError } from "../models/Auth";

export const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return String(error);
  }
  return;
};

export const isErrorObjectEmpty = (
  errorObject: AuthenticationError | undefined
): boolean =>
  errorObject?.authErrorMessage === "" &&
  errorObject?.serverErrorMessage === "";

export const isDatabaseEmpty = (
  loadedData: string,
  status: HttpStatuses
): boolean =>
  status === HttpStatuses.COMPLETED && (!loadedData || loadedData.length === 0);

export const scrollToTopHandler = () => {
  window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
};