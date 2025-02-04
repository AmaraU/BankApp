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
  HStack,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";



export const InviteFriendsModal = ({ isOpen, onClose, handleProceed }) => {

  const inviteLink = 'BANK>APP 637ARGH';

  function copyToClipboard() {
    navigator.clipboard.writeText(inviteLink);
  };

  return (
    <Modal isCentered size='lg' closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign='center'>
          <Text fontSize='18px' fontWeight={600} color='#394455'>Invite Friends</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text textAlign='center' fontSize='16px' fontWeight={400} color='#101828' mb='8px'>Use the link to invite your friends to join the group</Text>
          <HStack bg='#F7F7F7' border='1px solid #EAECF0' w='100%' px='16px' borderRadius='6px'>
            <Text textAlign='center' w='100%' fontSize='36px' fontWeight={500} color='#101828'>{inviteLink}</Text>
            <button onClick={copyToClipboard}><img src={getImageUrl('icons/blackCopy.png')} /></button>
          </HStack>

          <Button onClick={handleProceed} mt='24px' mb='12px' w='100%' h='48px' fontSize='14px' color='white' bg='#A41856' _hover={{ bg: '#90164D' }}>Proceed to Group</Button>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};
