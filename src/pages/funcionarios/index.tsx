import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  HStack,
  Table,
  Thead,
  Tr,
  Th,
  Checkbox,
  Tbody,
  Spinner,
  Text,
  Td,
} from "@chakra-ui/react";
import {
  RiAddLine,
  RiEditBoxLine,
  RiChatDeleteLine,
  RiListSettingsLine,
  RiRefreshLine,
} from "react-icons/ri";
import React, { useState } from "react";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { Pagination } from "../../components/Pagination";
import { ModalCreate } from "../../components/Modal/Funcionario/Index";
import { useModal } from "../../contexts/funcionariosContext/ModalContext";
import { useFuncionarios } from "../../contexts/funcionariosContext/FuncionariosContext";
import { useFuncionario } from "../../services/hooks/useFuncionarios";

export default function FuncionarioList() {
  const [page, setPage] = useState(1);
  const { create, clear } = useFuncionarios();
  const { data, isLoading, isFetching, error, refetch } = useFuncionario(page);

  const { onOpen } = useModal();
  const [editar, setEditar] = useState(false);
  const [deletar, setDeletar] = useState(false);

  return (
    <Box>
      <ModalCreate tipoModal={editar} excluir={deletar} />
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              FUNCIONÁRIOS
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>
            <HStack spacing="4">
              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="yellow"
                leftIcon={<Icon as={RiRefreshLine} fontSize="20" />}
                onClick={() => {
                  refetch();
                  clear();
                }}
              >
                Refresh
              </Button>

              <Button
                as="a"
                size="sm"
                fontSize="small"
                colorScheme="green"
                leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                onClick={() => {
                  clear();
                  setDeletar(false);
                  setEditar(false);
                  onOpen();
                }}
              >
                Criar novo
              </Button>
            </HStack>
          </Flex>
          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter dados.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th>ID</Th>
                    <Th>Nome</Th>
                    <Th>NomeFilial</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.funcionarios.map((Funcionario) => {
                    return (
                      <>
                        <Tr key={Funcionario.id}>
                          <Td>{Funcionario.id}</Td>
                          <Td>
                            <Text>{Funcionario.nome}</Text>
                          </Td>
                          <Td>
                            <Text>{Funcionario.nome_filial}</Text>
                          </Td>
                          <Td>
                            <HStack spacing="2">
                              <Button
                                as="a"
                                size="sm"
                                fontSize="small"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiEditBoxLine} />}
                                onClick={() => {
                                  create({
                                    id: Funcionario.id,
                                    nome: Funcionario.nome,
                                    nome_filial: Funcionario.nome_filial,
                                  });
                                  setDeletar(false);
                                  setEditar(true);
                                  onOpen();
                                }}
                              >
                                Editar
                              </Button>
                              <Button
                                as="a"
                                size="sm"
                                fontSize="small"
                                colorScheme="red"
                                leftIcon={<Icon as={RiChatDeleteLine} />}
                                onClick={() => {
                                  create({
                                    id: Funcionario.id,
                                  });
                                  setDeletar(true);
                                  onOpen();
                                }}
                              >
                                Excluir
                              </Button>
                            </HStack>
                          </Td>
                        </Tr>
                      </>
                    );
                  })}
                </Tbody>
              </Table>
              <Pagination
                totalCountOfRegisters={data.totalCount}
                currentPage={page}
                onPageChange={setPage}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}
