import { api } from "../api";
import { useQuery } from "react-query";

type Funcionario = {
  id: string;
  nome: string;
  nome_filial: number;
};

type GetUsersResponse = {
  totalCount: number;
  funcionarios: Funcionario[];
};

export async function getFuncionarios(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("/funcionarios", {
    params: { page },
  });
  const totalCount = Number(headers["x-total-count"]);
  console.log("Teste", data);
  const funcionarios = data.funcionarios.map((funcionario) => {
    return {
      id: funcionario.id,
      nome: funcionario.nome,
      nome_filial: funcionario.nome_filial,
    };
  });
  console.log("Teste33", funcionarios);
  return {
    funcionarios,
    totalCount,
  };
}
export function useFuncionario(page: number) {
  return useQuery(["funcionarios", page], () => getFuncionarios(page));
}
