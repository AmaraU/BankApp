/* eslint-disable react/prop-types */

import {
  Button,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Image,
} from "@chakra-ui/react";
import bank from "../../../assets/bank.png";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { setDetails } from "../../store/auth/auth.slice";

export const ExistingUser = ({ isOpen, onClose, handleProceed }) => {
  //   const navigate = useNavigate();
  //   const dispatch = useDispatch();

  const closeModal = () => {
    onClose();
  };

  return (
    <>
      <Modal
        isCentered
        size={"lg"}
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={closeModal}
        maxHeight={"75%"}
      >
        <ModalOverlay />
        <ModalContent rounded={15} width={"700px"}>
          <ModalHeader>
            <Text textAlign={"center"} fontSize={"18px"}>
              Bank Account
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={2}>
            <div style={{ overflow: "auto", maxHeight: "60vh" }}>
              {
                <Stack spacing={4} alignItems={"center"}>
                  <Image src={bank} width={"80px"} height={"80px"} />
                  <Text fontWeight={"bold"}>Get an account</Text>
                  <Text
                    textAlign={"center"}
                    fontSize={"14px"}
                    fontWeight={400}
                    color={"#000000"}
                  >
                    To enable us serve you better, we would like to provide you
                    with our Bank account
                  </Text>
                </Stack>
              }
            </div>
          </ModalBody>
          <ModalFooter>
            <Stack w={"100%"} pb={2}>
              <Button
                onClick={handleProceed}
                bg={"#A41856"}
                py={"12px"}
                color={"#FFFFFF"}
                fontSize={"14px"}
                fontWeight={600}
                _hover={{ bg: "#90164D" }}
              >
                Proceed
              </Button>

              <Button
                mt={2}
                onClick={onClose}
                bg={"#EFECE9"}
                py={"12px"}
                color={"#667085"}
                fontSize={"16px"}
                fontWeight={700}
                _hover={{ bg: "#E3E1DE" }}
              >
                Cancel
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
