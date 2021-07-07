import React, { createContext, useContext, useState, ReactNode } from "react";
const FilialContext = createContext(null);

export function useFilial() {
  return useContext(FilialContext);
}

interface FilialProviderProps {
  children: ReactNode;
}
export function FilialProvider({ children }: FilialProviderProps) {
  const [filial, setFilial] = useState({});

  async function create(dados) {
    setFilial(dados);
  }
  async function clear() {
    setFilial({});
  }

  return (
    <FilialContext.Provider value={{ filial, create, clear }}>
      {children}
    </FilialContext.Provider>
  );
}
