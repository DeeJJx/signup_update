import { createContext, useReducer, useEffect } from "react";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    case "UPDATE_USER":
      return { user: action.payload };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    //ideally would set user:state.user but cannot use state before initialisation
    user: null,
  });

  useEffect(() => {
    // Check for user in local storage before rendering anything
    const user = JSON.parse(localStorage.getItem("user"));

    if (user && state.user === null) {
      console.log(state.user, 'state user')
      dispatch({ type: "LOGIN", payload: user });
    }
  },[]); // This effect runs only once when the component mounts, can ignore the warnings

  // this allows users to be null but also checks when a user is null - is there a user in local storage, if so then dispatch login
  //used to prevent user === null on page refresh
  if (state.user === null) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
