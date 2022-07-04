import { useReducer, useCallback } from "react";

import reducerActions from "../enums/useHttpActions";
import { SEND, SUCCESS, ERROR } from "../enums/useHttpActions";
import HttpStatuses from "../enums/httpStatuses";
import { COMPLETED, PENDING } from "../enums/httpStatuses";
import { getErrorMessage } from "../helpers";

interface State {
  status: HttpStatuses;
  responseData?: any[];
  errorMessage?: string;
}

interface Action {
  type: reducerActions;
  data?: any[];
  errorMessage?: string;
}

const httpReducer = (initialState: State, action: Action): State => {
  switch (action.type) {
    case SEND:
      return {
        ...initialState,
        status: PENDING,
      };
    case SUCCESS:
      return {
        ...initialState,
        status: COMPLETED,
        responseData: action.data,
      };
    case ERROR:
      return {
        ...initialState,
        status: COMPLETED,
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
    status: startWithPending ? PENDING : COMPLETED,
    responseData: [],
    errorMessage: "",
  });

  const sendRequest = useCallback(
    async (requestData: any) => {
      dispatch({ type: SEND });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: SUCCESS, data: responseData });
      } catch (error) {
        dispatch({
          type: ERROR,
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
