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
import { useModal } from "../../contexts/ModalContext";
import { useRef, useEffect, useState } from "react";
import { queryClient } from "../../services/queryClient";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "../../components/Form/Input";
import { useFilial } from "../../contexts/FilialContext";
import { useMutation } from "react-query";
import { api } from "../../services/api";

interface ModalProps {
  tipoModal: boolean;
  excluir?: boolean;
}
type SignInFormData = {
  name: string;
  numbeOfFuncionarios: number;
  id?: string;
};

const signInFormSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
});

export function ModalCreate({ tipoModal, excluir = false }: ModalProps) {
  const { filial, clear } = useFilial();

  const createFilial = useMutation(
    async (filial: SignInFormData) => {
      const response = await api.post("/filials", {
        filial: {
          nome: filial.name,
          total_funcionarios: filial.numbeOfFuncionarios,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("filials");
      },
    }
  );

  const updateFilial = useMutation(
    async (formFilial: SignInFormData) => {
      const response = await api.put(`/filials/${filial.id}`, {
        filial: {
          nome: formFilial.name,
          total_funcionarios: formFilial.numbeOfFuncionarios,
        },
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("filials");
      },
    }
  );

  const deleteFilial = useMutation(
    async () => {
      const response = await api.delete(`/filials/${filial.id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("filials");
      },
    }
  );

  async function deleteFunc() {
    await deleteFilial.mutateAsync();
  }

  const { isOpen, onClose } = useModal();

  const initialRef = useRef();

  const { register, handleSubmit, formState, reset, setValue } = useForm({
    resolver: yupResolver(signInFormSchema),
  });
  const { errors } = formState;

  const handleFilia: SubmitHandler<SignInFormData> = async (data) => {
    if (!tipoModal) {
      await createFilial.mutateAsync(data);
    } else {
      await updateFilial.mutateAsync(data);
    }

    onClose();
    reset();
  };
  useEffect(() => {
    console.log("testa");
    setValue("name", filial.name);
    setValue("numbeOfFuncionarios", filial.numbeOfFuncionarios);
  }, [filial]);

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

          <Flex as="form" flexDir="column" onSubmit={handleSubmit(handleFilia)}>
            <ModalContent bg="gray.800">
              <ModalHeader color="whiteAlpha">Filial</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <Input
                    ref={initialRef}
                    placeholder="Nome Filial"
                    color="whiteAlpha"
                    name="name"
                    id="name"
                    type="text"
                    label="Nome"
                    error={errors.name}
                    {...register("name")}
                    mb="4"
                  />

                  <Input
                    id="numbeOfFuncionarios"
                    type="number"
                    placeholder="Total Funcionarios"
                    color="whiteAlpha"
                    disabled={tipoModal ? true : false}
                    name="numbeOfFuncionarios"
                    label="Quantidade Funcionários"
                    error={errors.numbeOfFuncionarios}
                    {...register("numbeOfFuncionarios")}
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
