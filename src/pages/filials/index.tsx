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
  Tbody,
  Text,
  Td,
  Spinner,
} from "@chakra-ui/react";
import React, { useState } from "react";
import {
  RiAddLine,
  RiEditBoxLine,
  RiChatDeleteLine,
  RiListSettingsLine,
  RiRefreshLine,
} from "react-icons/ri";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";
import { ModalCreate } from "../../components/Modal/Index";
import { Pagination } from "../../components/Pagination";
import { useModal } from "../../contexts/ModalContext";
import { useFilial } from "../../contexts/FilialContext";
import { useFiliais } from "../../services/hooks/useFiliais";

export default function UserList() {
  const [page, setPage] = useState(1);
  const { create, clear } = useFilial();
  const { data, isLoading, isFetching, error, refetch } = useFiliais(page);

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
              FILIAIS
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
                    <Th>Nome Filial</Th>
                    <Th>Total de Funcionários</Th>
                    <Th></Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {data.filiais.map((filial) => {
                    return (
                      <>
                        <Tr key={filial.id}>
                          <Td>{filial.id}</Td>
                          <Td>
                            <Text>{filial.nome}</Text>
                          </Td>
                          <Td>
                            <Text>{filial.total_funcionarios}</Text>
                          </Td>
                          <Td>
                            <HStack spacing="2">
                              <Button
                                as="a"
                                size="sm"
                                fontSize="small"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiListSettingsLine} />}
                              >
                                ver funcionários
                              </Button>
                              <Button
                                as="a"
                                size="sm"
                                fontSize="small"
                                colorScheme="pink"
                                leftIcon={<Icon as={RiEditBoxLine} />}
                                onClick={() => {
                                  create({
                                    id: filial.id,
                                    name: filial.nome,
                                    numbeOfFuncionarios:
                                      filial.total_funcionarios,
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
                                    id: filial.id,
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
