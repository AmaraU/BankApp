/* eslint-disable react/prop-types */
import {
  FormControl,
  FormLabel,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Input,
  Button,
  Stack,
} from "@chakra-ui/react";

function AddEmployer({ isOpen, close }) {
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
        <ModalCloseButton onClick={close}></ModalCloseButton>
        <ModalBody>
          <Stack py={"10"}>
            <Text fontWeight={"600"} textAlign={"center"}>
              {" "}
              Add Employer
            </Text>

            <FormControl>
              <FormLabel mt={5}>Employer Name</FormLabel>
              <Input
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                placeholder="United Bank of Africa"
                _placeholder={{ fontSize: "16px", color: "#667085" }}
              />

              <FormLabel mt={5}>HR Email</FormLabel>
              <Input
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                _placeholder={{ fontSize: "16px", color: "#667085" }}
              />

              <Button
                mt={"16px"}
                w={"100%"}
                h={"fit-content"}
                py={"15px"}
                px={"20px"}
                bg={"#A41856"}
                _hover={{ bg: "#90164D" }}
                color={"#FFFFFF"}
                fontSize={"14px"}
                fontWeight={600}
                onClick={""}
              >
                Proceed
              </Button>
            </FormControl>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default AddEmployer;
