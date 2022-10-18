import { createContext, useReducer, useContext, useEffect } from 'react'

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN': {
      return {
        user: action.payload
      }
    }
    case 'LOGOUT': {
      localStorage.removeItem('user')

      return {
        user: null
      }
    }
    default: return state
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    user && dispatch({ type: 'LOGIN', payload: user })
  }, []);

  return (
    <AuthContext.Provider value={{
      ...state,
      dispatch
    }}>
      {children}
    </AuthContext.Provider>
  )
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error('bruh!')
  }

  return context;
};