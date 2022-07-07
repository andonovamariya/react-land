import HttpStatuses from "../enums/httpStatuses";

export const getErrorMessage = (error: unknown): string | undefined => {
  if (error instanceof Error) {
    return String(error);
  }
  return;
};

export const isDatabaseEmpty = (
  loadedData: string,
  status: HttpStatuses
): boolean => status === HttpStatuses.COMPLETED && (!loadedData || loadedData.length === 0);
