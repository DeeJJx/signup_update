import { createContext, useReducer, useEffect, useState } from "react";

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
    user: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      dispatch({ type: "LOGIN", payload: user });
    }
  }, []);

  //seems to be a very hacky way of getting around the user not being authenticated on page refresh //

  // Add a loading state to indicate when the authentication state is being fetched
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [state.user]);

  console.log("AuthContext state ", state);

  // Render a loading state while the authentication state is being fetched
  if (loading) {
    return <div>Loading...</div>;
  }

//seems to be a very hacky way of getting around the user not being authenticated on page refresh //

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
