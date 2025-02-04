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
  InputGroup,
  InputLeftElement,
  Input,
} from "@chakra-ui/react";


export const TopUpModal = ({ isOpen, onClose, handleProceed }) => {

  return (
    <Modal isCentered size='md' closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>
          <Text fontSize='18px' fontWeight={600} color='#394455'>Top Up Target</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text fontSize='16px' fontWeight={400} color='#101828'>How much would you like to top up?</Text>
          <InputGroup mt='8px'>
            <InputLeftElement>₦</InputLeftElement>
            <Input bg='#F7F7F7' border='1px solid #EAECF0' type="number" />
          </InputGroup>

          <Button onClick={handleProceed} mt='24px' mb='12px' w='100%' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Continue</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
