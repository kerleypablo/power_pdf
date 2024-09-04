"use client";
import { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  return (
    <UserContext.Provider value={{ email, setEmail, error, setError }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
