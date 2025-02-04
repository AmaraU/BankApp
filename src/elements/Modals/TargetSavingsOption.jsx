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
  Button,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";
import User from "../../../assets/icons/user.png";
import UserMultiple from "../../../assets/icons/user-multiple-savings.png";
import TargetUnlock from "../../../assets/icons/target-savings-unlock.png";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useState } from "react";


function TargetSavingsOption({ isOpen, close, setType, moveNext }) {

  const [ selected, setSelected ] = useState('');

  const personal = () => {
    setSelected('personal')
    setType('personal')
  }
  
  const group = () => {
    setSelected('group')
    setType('group')
  }

  const OPTIONS = [
    {
      image: User,
      title: "Personal Target Savings ",
      description: "Start a personal target savings goal",
      type: 'personal',
      action: personal,
    },
    {
      image: UserMultiple,
      title: "Group Target Savings",
      description: "Create a private or public target savings group",
      type: 'group',
      action: group,
    }
  ];

  return (
    <Modal
      isCentered
      size={"xl"}
      closeOnOverlayClick={false}
      isOpen={isOpen}
      maxHeight={"70%"}
      onClose={close}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text fontWeight={"600"} textAlign={"center"}>
            {" "}
            Choose Preferred Option
          </Text>
        </ModalHeader>
        <ModalCloseButton onClick={close} />
        <ModalBody>
          <div style={{overflow: 'auto', maxHeight: '80vh'}}>
            <Stack>
              
              {OPTIONS.map((option, i) => (
                <Box
                  cursor={"pointer"}
                  my={"1"}
                  border={selected === option.type ? '1px solid #A41857' : '1px solid transparent'}
                  _hover={{ border: "1px solid #A41857" }}
                  p={4}
                  rounded={"xl"}
                  bg={"#F7F7F7"}
                  display={"flex"}
                  key={i}
                  onClick={option.action}
                >
                  <Image width={"40px"} height={"40px"} src={option.image} />

                  <Flex ml={3} w={"100%"} justifyContent={"space-between"}>
                    <div>
                      <Text fontFamily={"20px"} fontWeight={"bold"}>
                        {option.title}{" "}
                      </Text>
                      <Text>{option.description}</Text>
                    </div>
                    <ChevronRightIcon mt={"8px"} />
                  </Flex>
                </Box>
              ))}
            </Stack>
          </div>
        </ModalBody>

        <ModalFooter py={0}>
          <Button w='100%' h='48px' my={4} color='#FFF' bg='#A41856' _hover={{bg: '#90164D'}} onClick={moveNext}>Let's Go</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default TargetSavingsOption;
