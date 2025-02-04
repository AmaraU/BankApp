/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Button,
  Stack,
  ModalHeader,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";


export const BreakWarningModal = ({ isOpen, onClose, handleProceed }) => {

  return (
    <Modal isCentered size='lg' closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader/>
        <ModalCloseButton />

        <ModalBody>
          <Stack w='100%' alignItems='center'>
            <img src={getImageUrl('icons/caution.png')} style={{width: '66px', height: '66px'}} />

            <Text fontSize='24px' fontWeight={600} color='#0C111D'>Attention!</Text>
            <Text textAlign='center' fontSize='16px' fontWeight={400} color='#667085'>If you break this target plan, you'd lose the interest accrued so far.</Text>

            <Button onClick={handleProceed} mt='24px' w='100%' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Okay</Button>
            <Button onClick={onClose} mt='8px' mb='12px' w='100%' fontSize='14px' color='black' bg='#EFECE9' _hover={{ bg: '#E3E1DE' }}>Cancel</Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
