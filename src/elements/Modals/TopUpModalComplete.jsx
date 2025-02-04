/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Stack,
  Box,
  Flex,
  Image,
  Select,
  FormLabel,
  Button,
  ModalFooter,
  ModalHeader,
  InputGroup,
  InputLeftElement,
  Input,
  HStack,
} from "@chakra-ui/react";
import { useState } from "react";
import styles from "../../Pages/SavingsPage/Savings.module.css";



export const TopUpModalComplete = ({ isOpen, onClose, handleProceed }) => {

  const [ selected, setSelected ] = useState('');

  const proceedTopUp = () => {
    setSelected('');
    handleProceed();
  }

  return (
    <Modal isCentered size='xl' closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>
          <Text fontSize='18px' fontWeight={600} color='#394455'>Top Up Plan</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <div style={{ overflow: 'auto', maxHeight: '60vh' }}>

            <Stack width='100%' border='1px solid #EAECF0' borderRadius='8px' px='15px' py='10px' spacing={0}>
              <Text fontSize='12px' fontWeight={450} color='#667085'>TARGET AMOUNT</Text>
              <Text fontSize='20px' fontWeight={600} color='#101828'>₦13,000,000</Text>

              <HStack justifyContent='space-between' mt='12px' mb='5px'>
                <Text fontSize='12px' fontWeight={450} color='#667085'>TARGET PROGRESS</Text>
                <Text fontSize='12px' fontWeight={450} color='#667085'>100% complete</Text>
              </HStack>
              <progress className={styles.progress} max={100} value={100} />

              <HStack justifyContent='space-between' mt='12px' spacing='24px'>
                <Stack spacing={2}>
                  <Text fontSize='12px' fontWeight={450} color='#667085'>AMOUNT SAVED</Text>
                  <Text fontSize='18px' fontWeight={600} color='#A41857'>₦14,080,000</Text>
                </Stack>

                <Stack spacing={2}>
                  <Text fontSize='12px' fontWeight={450} color='#667085'>PLAN BALANCE</Text>
                  <Text fontSize='18px' fontWeight={600} color='#A41857'>₦15,080,000</Text>
                </Stack>

                <Stack spacing={2}>
                  <Text fontSize='12px' fontWeight={450} color='#667085'>INTEREST EARNED (8% PA)</Text>
                  <Text fontSize='18px' fontWeight={600} color='#A41857'>₦1,380,000</Text>
                </Stack>
              </HStack>
            </Stack>

            <Text fontSize='16px' fontWeight={600} color='#101828' mt='12px'>Congratulations!!! You have achieved your Target Goal</Text>

            <Text fontSize='16px' fontWeight={400} color='#667085' mt='40px'>Choose your preffed option</Text>
            
            <HStack spacing='16px' mt='16px'>
              <Button
                bg='#EFECE9' h='70px' w='100%'
                color='#101828' fontSize='18px' fontWeight={400}
                border={selected === 'continue' ? '1px solid #A41857' : '1px solid transparent'}
                _hover={{border: '1px solid #A41857', bg: '#E3E1DE'}}
                onClick={()=>setSelected('continue')}
              >
                Continue Saving
              </Button>
              <Button
                bg='#EFECE9' h='70px' w='100%'
                color='#101828' fontSize='18px' fontWeight={400}
                border={selected === 'stop' ? '1px solid #A41857' : '1px solid transparent'}
                _hover={{border: '1px solid #A41857', bg: '#E3E1DE'}}
                onClick={()=>setSelected('stop')}
              >
                Stop additional savings
              </Button>
            </HStack>

          <Button onClick={proceedTopUp} mt='24px' mb='12px' w='100%' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Proceed</Button>
          
          </div>

        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
