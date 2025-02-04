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
  Select,
} from "@chakra-ui/react";


export const ExtendModal = ({ isOpen, onClose, handleProceed }) => {

  const LENGTH = ["1 month", "2 months", "3 months", "4 months"];

  return (
    <Modal isCentered size='lg' closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>
          <Text fontSize='18px' fontWeight={600} color='#394455'>Extend Maturity Date</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text fontSize='14px' fontWeight={400} color='#667085' mb='16px'>You can extend your target maturity date by months</Text>

          <Text fontSize='16px' fontWeight={400} color='#101828' mb='8px'>How long do you want to save for?</Text>
          <Select bg='#F7F7F7' border='1px solid #EAECF0'>
            {LENGTH.map((option, i) => (
              <option key={i}>{option}</option>
            ))}
          </Select>

          <Text mt='16px' fontSize='12px' fontWeight={450} color='#667085'>Your original maturity date is 25/Sept/2025. If you increase by 3 months means your new maturity date is 25/Dec/2025</Text>

          <Button onClick={handleProceed} mt='24px' mb='12px' w='100%' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Continue</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
