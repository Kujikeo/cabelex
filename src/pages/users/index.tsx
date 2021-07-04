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
  Text,
  Td,
} from "@chakra-ui/react";
import React from "react";
import {
  RiAddLine,
  RiEditBoxLine,
  RiChatDeleteLine,
  RiListSettingsLine,
} from "react-icons/ri";
import { Header } from "../../components/Header";
import { SideBar } from "../../components/Sidebar";

export default function UserList() {
  // const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box>
      <Header />
      <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justify="space-between" align="center">
            <Heading size="lg" fontWeight="normal">
              Usuarios
            </Heading>

            <Button
              as="a"
              size="sm"
              fontSize="small"
              colorScheme="green"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
            >
              Criar novo
            </Button>
          </Flex>
          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr>
                <Th px="6" color="gray.300" w="8">
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>ID</Th>
                <Th>Nome Filial</Th>
                <Th>Total de Funcionários</Th>
                <Th></Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td px="6">
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>1</Td>
                <Td>
                  <Text>Tet</Text>
                </Td>
                <Td>
                  <Text>48</Text>
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
                    >
                      Editar
                    </Button>
                    <Button
                      as="a"
                      size="sm"
                      fontSize="small"
                      colorScheme="red"
                      leftIcon={<Icon as={RiChatDeleteLine} />}
                    >
                      Excluir
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </Box>
      </Flex>
    </Box>
  );
}
