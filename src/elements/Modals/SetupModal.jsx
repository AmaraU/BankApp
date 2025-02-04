/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  Stack,
  Image,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SetupImg from "../../../assets/Card.svg";

function SetupModal({ isOpen, close }) {
  const navigate = useNavigate();
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
        <ModalBody rounded={"xl"}>
          <Stack px={"3"} py={"6"}>
            <Text fontWeight={"600"} fontSize={"28"} textAlign={"start"}>
              Complete your account setup
            </Text>

            <Text pb={"2"} color={"#667085"}>
              You need to complete your account setup to ensure the security and
              integrity of your transactions conducted on the bank.
            </Text>

            <Image src={SetupImg} style={{ width: "100%", height: "100%" }} />

            <Button
              onClick={() => navigate("/overview/account-setup")}
              bg={"#A41856"}
              py={"4"}
              color={"white"}
              mt={"12"}
              width={"100%"}
              _hover={{ bg: "#90164D" }}
            >
              Proceed
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default SetupModal;
