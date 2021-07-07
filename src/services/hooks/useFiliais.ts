import { api } from "../api";
import { useQuery } from "react-query";

type Filial = {
  id: string;
  nome: string;
  total_funcionarios: number;
  createdAt: string;
};

type GetUsersResponse = {
  totalCount: number;
  filiais: Filial[];
};

export async function getFilais(page: number): Promise<GetUsersResponse> {
  const { data, headers } = await api.get("/filials", { params: { page } });
  const totalCount = Number(headers["x-total-count"]);

  const filiais = data.filiais.map((filial) => {
    return {
      id: filial.id,
      nome: filial.nome,
      total_funcionarios: filial.total_funcionarios,
    };
  });

  return {
    filiais,
    totalCount,
  };
}
export function useFiliais(page: number) {
  return useQuery(["filiais", page], () => getFilais(page));
}
