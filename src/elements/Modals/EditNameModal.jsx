/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Button,
  ModalHeader,
  Input,
} from "@chakra-ui/react";


export const EditNameModal = ({ isOpen, onClose, handleProceed }) => {

  return (
    <Modal isCentered size='md' closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>
          <Text fontSize='18px' fontWeight={600} color='#394455'>Edit Plan Name</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text fontSize='16px' fontWeight={400} color='#101828' mb='8px'>Plan Name</Text>
          <Input bg='#F7F7F7' border='1px solid #EAECF0' type="text" />

          <Button onClick={handleProceed} mt='24px' mb='12px' w='100%' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Continue</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
