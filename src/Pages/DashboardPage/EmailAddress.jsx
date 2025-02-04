/* eslint-disable react/prop-types */
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  Input,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { useState } from "react";
import OtpInput from "../../elements/PinInput";
import userService from "../../services/userService";
import SuccessScreen from "../../elements/SuccessScreen";

export const EmailAddress = ({ moveToSetup, email, phoneNumber }) => {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await userService.verifyEmailOtp({
        phoneOrAccountnumber: phoneNumber,
        email,
      });
      setStep(2);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleProceed = async () => {
    setLoading(true);
    try {
      await userService.validateEmail({
        otpNumber: otp,
        EmailAddress: email,
      });
      setStep(3);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      return setStep(1);
    }
    moveToSetup();
  };

  return (
    <>
      <Box>
        <HStack
          bg={"#EAECF0"}
          justifyContent={"space-between"}
          px={"26px"}
          py={"14px"}
          borderRadius={"12px 12px 0 0"}
        >
          <Button
            h={"24px"}
            bg={"#EAECF0"}
            p={0}
            _hover={{ bg: "#EAECF0" }}
            onClick={handlePrevious}
          >
            <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
          </Button>
          <Text
            textAlign="center"
            fontSize={{ base: "14px", md: "18px" }}
            fontWeight={600}
            color={"#101828"}
          >
            {step !== 3 ? "Email Address" : "Account Setup Complete"}
          </Text>
          <Text
            fontSize={{ base: "14px", md: "18px" }}
            fontWeight={600}
            color={"#101828"}
          >
            3/3
          </Text>
        </HStack>

        {step == 1 && (
          <Stack
            spacing={"24px"}
            alignItems={"center"}
            border={"1px solid #EFECE9"}
            bg={"#FFFFFF"}
            borderRadius={"0 0 12px 12px"}
            py={"16px"}
            pb={"114px"}
          >
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color={"#667085"}
              textAlign={"center"}
            >
              A 6-digit code will be sent to your email to validate it
            </Text>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Email Address
              </FormLabel>
              <Input
                type="email"
                h="48px"
                bg="#F7F7F7"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                color="#101828"
                value={email}
                disabled
                _disabled={{ bg: "#EAECF0", color: "#8D9DA8" }}
              />
            </FormControl>

            <Button
              mt="16px"
              w={{ base: "100%", md: "80%" }}
              h="48px"
              bg="#A41856"
              _hover={{ bg: "#90164D" }}
              color="#FFFFFF"
              fontSize="14px"
              fontWeight={600}
              onClick={handleConfirm}
              isLoading={loading}
            >
              Proceed
            </Button>
          </Stack>
        )}

        {step == 2 && (
          <Stack py={"5"} px={"5"} display={"flex"} justifyContent={"center"}>
            <Stack align={"center"}>
              <Text textAlign={"center"}>
                Enter the OTP sent to your email address: {email}{" "}
              </Text>
              <OtpInput
                length={6}
                width={{ base: "100%", md: 110 }}
                height={"75px"}
                setOtp={setOtp}
              />

              <Button
                mt="16px"
                h="48px"
                w={{ base: "100%", md: "80%" }}
                bg="#A41856"
                _hover={{ bg: "#90164D" }}
                color="#FFFFFF"
                fontSize="14px"
                fontWeight={600}
                onClick={handleProceed}
                isLoading={loading}
                alignContent={"center"}
                justifyContent={"center"}
                textAlign={"center"}
                isDisabled={otp.length !== 6}
              >
                Complete
              </Button>
            </Stack>
          </Stack>
        )}

        {step == 3 && (
          <Stack py={"5"} px={"5"} display={"flex"} justifyContent={"center"}>
            <SuccessScreen
              title={"Success"}
              description={"You have successfully completed your account setup"}
              buttonTitle={"Proceed"}
              handleClick={() => (window.location.href = "/overview/dashboard")}
            />
          </Stack>
        )}
      </Box>
    </>
  );
};
