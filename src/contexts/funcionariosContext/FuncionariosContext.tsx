import React, { createContext, useContext, useState, ReactNode } from "react";
const FuncionariosContext = createContext(null);

export function useFuncionarios() {
  return useContext(FuncionariosContext);
}

interface FuncionariosContextProvider {
  children: ReactNode;
}
export function FuncionarioProvider({ children }: FuncionariosContextProvider) {
  const [funcionarios, setFuncionarios] = useState({});

  async function create(dados) {
    setFuncionarios(dados);
  }
  async function clear() {
    setFuncionarios({});
  }

  return (
    <FuncionariosContext.Provider value={{ funcionarios, create, clear }}>
      {children}
    </FuncionariosContext.Provider>
  );
}
