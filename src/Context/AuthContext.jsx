import { createContext, useEffect, useReducer } from 'react';
import { db } from '../../firebase.config';
import { useAuthStatus } from '../Hooks/useAuthStatus';

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'AUTH_IS_READY':
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};
export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false
  });

  const { loggedIn, user } = useAuthStatus();

  useEffect(() => {
    // Verify that the user is logged in
    if (loggedIn) {
      dispatch({ type: 'AUTH_IS_READY', payload: user });
    }
  }, []);

  console.log(state);
  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
