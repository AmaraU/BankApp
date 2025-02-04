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
  HStack,
} from "@chakra-ui/react";


export const WithdrawModal = ({ isOpen, onClose, handleProceed, cancel }) => {

  return (
    <Modal isCentered size='md' closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>
          <Text fontSize='18px' fontWeight={600} color='#394455'>Preview</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>

          <Text textAlign='center' fontSize='15px' fontWeight={450} color='#667085'>Withrawal Amount</Text>
          <Text textAlign='center' fontSize='24px' fontWeight={600} color='#0C111D'>₦15,000,000.00</Text>

          <HStack justifyContent='space-between' borderBottom='1px solid #EAECF0' mt='16px' pb='8px'>
            <Text fontSize='16px' fontWeight={450} color='#667085'>REASON</Text>
            <Text fontSize='16px' fontWeight={500} color='#101828'>Business</Text>
          </HStack>

          <HStack justifyContent='space-between' borderBottom='1px solid #EAECF0' mt='16px' pb='8px'>
            <Text fontSize='16px' fontWeight={450} color='#667085'>FEES</Text>
            <Text fontSize='16px' fontWeight={500} color='#101828'>₦00.00</Text>
          </HStack>

          <Button onClick={handleProceed} mt='24px' w='100%' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Continue</Button>
          <Button onClick={cancel} mt='8px' mb='12px' w='100%' fontSize='14px' color='black' bg='#EFECE9' _hover={{ bg: '#E3E1DE' }}>No, continue saving</Button>

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
