import {
  Input,
  FormLabel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  FormControl,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  ModalFooter,
  Button,
} from "@chakra-ui/react";

import { useRef, useImperativeHandle, forwardRef } from "react";

interface ModalProps {
  title: string;
  content?: string;
}

type CountdownHandle = {
  start: () => void;
};

const Countdown = ({ title, content }: ModalProps, ref) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useImperativeHandle(ref, () => ({
    start: () => onOpen,
  }));

  const initialRef = useRef();
  return (
    <>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="gray.800">Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel color="gray.800">First name</FormLabel>
              <Input
                ref={initialRef}
                placeholder="First name"
                color="gray.800"
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel color="gray.800"> Last name</FormLabel>
              <Input placeholder="Last name" color="gray.800" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="green" mr={3}>
              Save
            </Button>
            <Button onClick={onClose} colorScheme="red">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default forwardRef(Countdown);
