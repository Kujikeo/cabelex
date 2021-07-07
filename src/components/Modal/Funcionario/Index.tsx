import {
  Input as ChakraInput,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  ModalBody,
  ModalCloseButton,
  Flex,
  ModalFooter,
  Button,
  Text,
} from "@chakra-ui/react";
import { useModal } from "../../../contexts/funcionariosContext/ModalContext";
import { useRef, useEffect, useState } from "react";
import { queryClient } from "../../../services/queryClient";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../../components/Form/Input";
import { useFuncionarios } from "../../../contexts/funcionariosContext/FuncionariosContext";
import { useMutation } from "react-query";
import { api } from "../../../services/api";
import funcionarios from "../../../pages/funcionarios";

interface ModalProps {
  tipoModal: boolean;
  excluir?: boolean;
}
type SignInFormData = {
  nome: string;
  nome_filial: string;
  id?: string;
};

const signInFormSchema = yup.object().shape({
  nome: yup.string().required("Nome é obrigatório"),
});

export function ModalCreate({ tipoModal, excluir = false }: ModalProps) {
  const { funcionarios, clear } = useFuncionarios();

  const createFuncionario = useMutation(
    async (funcionario: SignInFormData) => {
      const response = await api.post("/funcionarios", {
        funcionario: {
          nome: funcionario.nome,
          nome_filial: funcionario.nome_filial,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("funcionarios");
      },
    }
  );

  const updateFuncionario = useMutation(
    async (formFuncionarios: SignInFormData) => {
      const response = await api.put(`/funcionarios/${funcionarios.id}`, {
        filial: {
          nome: formFuncionarios.nome,
          nome_filial: formFuncionarios.nome_filial,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("funcionarios");
      },
    }
  );

  const deleteFuncionario = useMutation(
    async () => {
      const response = await api.delete(`/funcionarios/${funcionarios.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("funcionarios");
      },
    }
  );

  async function deleteFunc() {
    await deleteFuncionario.mutateAsync();
  }

  const { isOpen, onClose } = useModal();

  const initialRef = useRef();

  const { register, handleSubmit, formState, reset, setValue } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const handleFuncionario: SubmitHandler<SignInFormData> = async (data) => {
    if (!tipoModal) {
      await createFuncionario.mutateAsync(data);
    } else {
      await updateFuncionario.mutateAsync(data);
    }

    onClose();
    reset();
  };
  useEffect(() => {
    setValue("nome", funcionarios.nome);
    setValue("nome_filial", funcionarios.nome_filial);
  }, [funcionarios]);

  if (excluir) {
    return (
      <>
        <Modal
          isOpen={isOpen}
          onClose={() => {
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent bg="gray.800">
            <ModalHeader color="whiteAlpha">Exlucir registro</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>
              <Text> Deseja deletar ?</Text>
            </ModalBody>
            <ModalFooter>
              <Button
                mr={3}
                type="submit"
                colorScheme="red"
                onClick={() => {
                  deleteFunc();
                  onClose();
                }}
              >
                Sim
              </Button>
              <Button
                onClick={() => {
                  onClose();
                }}
                colorScheme="gray.200"
              >
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  } else {
    return (
      <>
        <Modal
          initialFocusRef={initialRef}
          isOpen={isOpen}
          onClose={() => {
            onClose();
            reset();
          }}
        >
          <ModalOverlay />

          <Flex
            as="form"
            flexDir="column"
            onSubmit={handleSubmit(handleFuncionario)}
          >
            <ModalContent bg="gray.800">
              <ModalHeader color="whiteAlpha">Funcionario</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    ref={initialRef}
                    placeholder="Nome"
                    color="whiteAlpha"
                    name="nome"
                    id="nome"
                    type="text"
                    label="Nome"
                    error={errors.nome}
                    {...register("nome")}
                    mb="4"
                  />

                  <Input
                    id="nome_filial"
                    type="text"
                    placeholder="Nome Filial"
                    color="whiteAlpha"
                    disabled={tipoModal ? true : false}
                    name="nome_filial"
                    label="Nome Filial"
                    error={errors.nome_filial}
                    {...register("nome_filial")}
                  />
                </FormControl>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="green"
                  mr={3}
                  type="submit"
                  isLoading={formState.isSubmitting}
                >
                  Salvar
                </Button>
                <Button
                  onClick={() => {
                    onClose();
                    reset();
                  }}
                  colorScheme="red"
                >
                  Cancel
                </Button>
              </ModalFooter>
            </ModalContent>
          </Flex>
        </Modal>
      </>
    );
  }
}
