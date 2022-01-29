import React from "react";
import {
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
} from "@chakra-ui/react";
type ModalProps = {
  children: React.ReactNode;
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  t: Function
};
export const Modal: React.FC<ModalProps>= ({ children, isOpen, onClose, title, t }) => {
  return (
    <ChakraModal
      isOpen={isOpen}
      onClose={onClose}
      size='3xl'
      motionPreset='scale'
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title ?? "Modal"}</ModalHeader>
        <ModalBody>{children}</ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={onClose}>
            {t('close')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </ChakraModal>
  );
};
