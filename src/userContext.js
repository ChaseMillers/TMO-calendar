import { useState, createContext, useContext } from 'react';

// Wrapper for everything Context.
// declare useState values inside wrapper.  
export const UserContextProvider = ({ children }) =>(
    <UserContext.Provider value={useState([])}>
      {children} 
    </UserContext.Provider>
  );

// useContext to declare stateValue
export const useUsers = () => useContext(UserContext);

// createContext to share state
export const UserContext = createContext(null);