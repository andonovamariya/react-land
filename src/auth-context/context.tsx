import React, { PropsWithChildren, useReducer } from "react";
import { Action } from "./actions";
import { initialState, AuthReducer } from "./reducer";

const AuthStateContext = React.createContext(initialState);
const AuthDispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {}
);

export const useAuthState = () => {
  const context = React.useContext(AuthStateContext);
  if (context === undefined) {
    throw new Error("useAuthState must be used within a AuthProvider");
  }

  return context;
};

export const useAuthDispatch = () => {
  const context = React.useContext(AuthDispatchContext);
  if (context === undefined) {
    throw new Error("useAuthDispatch must be used within a AuthProvider");
  }

  return context;
};

export const AuthProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [userData, dispatch] = useReducer(AuthReducer, initialState);

  return (
    <AuthStateContext.Provider value={userData}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  );
};
