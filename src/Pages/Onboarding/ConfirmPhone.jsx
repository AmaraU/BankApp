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
  HStack,
  FormControl,
  FormLabel,
  Select,
  Input,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatNumberStar } from "../../utils/formatter";
import authService from "../../services/authService";
import { handleErrors } from "../../utils/handleResponse";
import { useDispatch } from "react-redux";
import { setDetails } from "../../store/auth/auth.slice";

export const ConfirmNumber = ({ isOpen, onClose, phoneNumber, email }) => {
  const [title] = useState("Confirm Phone Number");
  const [isAlternate, setIsAlternate] = useState(false);
  const [loading, setLoading] = useState(false);
  const [altPhoneNumber, setAltPhoneNumber] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const closeModal = () => {
    setIsAlternate(false);
    onClose();
  };

  const alternate = () => {
    setTitle("Provide Alternate Number");
    setIsAlternate(true);
  };

  const confirmNumber = async () => {
    setLoading(true);
    if (altPhoneNumber) {
      dispatch(
        setDetails({
          altPhoneNumber,
        })
      );
    }

    try {
      setLoading(true);
      await authService.sendOtp({
        phoneOrAccountnumber: altPhoneNumber ? altPhoneNumber : phoneNumber,
        email: email,
      });
      navigate("/verify-number");
      setLoading(false);
    } catch (error) {
      handleErrors(error.message);
      setLoading(false);
    }
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
              {title}
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={2}>
            <div style={{ overflow: "auto", maxHeight: "60vh" }}>
              {!isAlternate && (
                <Stack spacing={4} alignItems={"center"}>
                  <img
                    src={getImageUrl("icons/greyPhone.png")}
                    style={{ width: "80px", height: "80px" }}
                  />
                  <Text fontSize={"14px"} fontWeight={400} color={"#000000"}>
                    We will send a 6 digit OTP to the phone number below:
                  </Text>
                  <HStack spacing={1}>
                    <img
                      src={getImageUrl("icons/orangePhone.png")}
                      style={{ width: "24px", height: "24px" }}
                    />
                    <Text fontSize={"16px"} fontWeight={700} color={"#DB9308"}>
                      +234 123456789
                    </Text>
                  </HStack>
                  <Text fontSize={"14px"} fontWeight={400} color={"#000000"}>
                    Is this okay, or would you like to edit the number?
                  </Text>
                </Stack>
              )}

              {isAlternate && (
                <Stack spacing={4} alignItems={"center"}>
                  <Text fontSize={"14px"} fontWeight={400} color={"#000000"}>
                    Kindly note that an OTP would be sent to the number you provided
                  </Text>
                  <FormControl isRequired>
                    <FormLabel
                      fontSize={"16px"}
                      fontWeight={400}
                      color={"#101828"}
                      mb={"16px"}
                    >
                      Phone Number
                    </FormLabel>
                    <HStack spacing={2}>
                      <Select
                        flex={"35%"}
                        border={"1px solid #EAECF0"}
                        bg={"#F7F7F7"}
                        fontSize={"16px"}
                      >
                        <option value="">+234 (NG)</option>
                      </Select>
                      <Input
                        type="tel"
                        placeholder="Enter your phone number"
                        _placeholder={{ fontSize: "sm" }}
                        border={"1px solid #EAECF0"}
                        bg={"#F7F7F7"}
                        onChange={(e) => setAltPhoneNumber(e.target.value)}
                      />
                    </HStack>
                  </FormControl>
                </Stack>
              )}
            </div>
          </ModalBody>
          <ModalFooter>
            <Stack w={"100%"} pb={2}>
              <Button
                onClick={()=>navigate("/verify-number")}
                bg={"#A41856"}
                py={"12px"}
                color={"#FFFFFF"}
                fontSize={"14px"}
                fontWeight={600}
                _hover={{ bg: "#90164D" }}
                isLoading={loading}
              >
                Continue
              </Button>
              {/* {!isAlternate && (
                <Button
                  onClick={alternate}
                  bg={"#EFECE9"}
                  py={"12px"}
                  color={"#667085"}
                  fontSize={"16px"}
                  fontWeight={700}
                  _hover={{ bg: "#E3E1DE" }}
                >
                  Edit phone number
                </Button>
              )} */}
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
