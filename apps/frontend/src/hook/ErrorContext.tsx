import React, { createContext, useContext, useState, ReactNode } from "react";

interface ErrorContextType {
  error: string | null;
  setError: (errorMessage: string) => void;
  clearError: () => void;
}

const ErrorContext = createContext<ErrorContextType | undefined>(undefined);

export const useError = (): ErrorContextType => {
  const context = useContext(ErrorContext);
  if (!context) {
    throw new Error("useError must be used within an ErrorProvider");
  }
  return context;
};

interface ErrorProviderProps {
  children: ReactNode;
}

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
  const [error, setError] = useState<string | null>(null);

  const setErrorState = (errorMessage: string) => {
    setError(errorMessage);
    // You can also log the error, send it to a server, etc.
  };

  const clearError = () => {
    setError(null);
  };

  return (
    <ErrorContext.Provider
      value={{ error, setError: setErrorState, clearError }}
    >
      {children}
    </ErrorContext.Provider>
  );
};
