import { useReducer, useCallback } from "react";

import ReducerActions from "../enums/useHttpActions";
import HttpStatuses from "../enums/httpStatuses";
import { getErrorMessage } from "../helpers";

interface State {
  status: HttpStatuses;
  responseData?: any[];
  errorMessage?: string;
}

interface Action {
  type: ReducerActions;
  data?: any[];
  errorMessage?: string;
}

const httpReducer = (initialState: State, action: Action): State => {
  switch (action.type) {
    case ReducerActions.SEND:
      return {
        ...initialState,
        status: HttpStatuses.PENDING,
      };
    case ReducerActions.SUCCESS:
      return {
        ...initialState,
        status: HttpStatuses.COMPLETED,
        responseData: action.data,
      };
    case ReducerActions.ERROR:
      return {
        ...initialState,
        status: HttpStatuses.COMPLETED,
        errorMessage: getErrorMessage(action.errorMessage),
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

type RequestFunction = (requestData: any) => any;

interface ReturnUseHttp {
  sendRequest: (arg?: any) => Promise<void>;
  status: HttpStatuses;
  responseData?: any;
  errorMessage?: string;
}

const useHttp = (
  requestFunction: RequestFunction,
  startWithPending: boolean = false
): ReturnUseHttp => {
  const [httpState, dispatch] = useReducer(httpReducer, {
    status: startWithPending ? HttpStatuses.PENDING : HttpStatuses.COMPLETED,
    responseData: [],
    errorMessage: "",
  });

  const sendRequest = useCallback(
    async (requestData: any) => {
      dispatch({ type: ReducerActions.SEND });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: ReducerActions.SUCCESS, data: responseData });
      } catch (error) {
        dispatch({
          type: ReducerActions.ERROR,
          errorMessage: getErrorMessage(error),
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
