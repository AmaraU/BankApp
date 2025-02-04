import {
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../../utils";
import { VerifyIdentity } from "./VerifyIdentity";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDetailsFromStorage,
  setDetails,
} from "../../store/auth/auth.slice";
import OtpInput from "../../elements/PinInput";
import { formatNumberStar } from "../../utils/formatter";
import authService from "../../services/authService";
import { handleErrors, handleSuccess } from "../../utils/handleResponse";

export const VerifyReset = () => {
  const { isOpen: isOpenConfirm, onClose: onCloseConfirm } = useDisclosure();
  const [timeLeft, setTimeLeft] = useState(30);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    dispatch(loadDetailsFromStorage());
  }, [dispatch]);

  useEffect(() => {
    if (timeLeft > 0) {
      const intervalId = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(intervalId);
    } else {
      console.log("Countdown finished");
    }
  }, [timeLeft]);

  const processOTP = () => {
    setLoading(true);
    window.location.href = "/reset-password";
    setLoading(true);
  };

  const resendOtp = () => {
    setTimeLeft(30);
    handleSuccess("Otp resent successfully");
  };

  return (
    <>
      <Stack
        alignItems="center"
        h="100%"
        minH="100vh"
        spacing={5}
        py={"38px"}
        px={{base: "24px", md: "25%"}}
        bgImage={getImageUrl("onboardingBackground.png")}
        bgSize="100% 100%"
      >
        <Flex justifyContent={"space-between"} w={"100%"}>
          <a href="/forgot-password">
            <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
          </a>
        </Flex>
        <Text fontSize={{base: "24px", md: "48px"}} fontWeight={700} color={"#14142A"}>
          Verify your Phone Number
        </Text>
        <Text fontSize={{base: "12px", md: "18px"}} fontWeight={400} color={"#667085"}>
          Kindly enter the 6-digit OTP we sent to{" "}
          <b>+234 123456789</b>
        </Text>

        <Stack>
          <Text fontSize={{base: "10px", md: "14px"}} fontWeight={400} color={"#394455"}>
            PIN
          </Text>
          <OtpInput
            length={6}
            height={{base: 12, sm: 20, md: 20}}
            size={"lg"}
            width={{base: 8, sm: 16, md: 99}}
            setOtp={setOtp}
          />
          <Text fontSize={{base: "10px", md: "14px"}} fontWeight={400} color={"#394455"}>
            Didn&apos;t receive OTP?
          </Text>
          <HStack spacing={3}>
            <Text fontSize={{base: "12px", md: "16px"}} fontWeight={500} color={"#DB9308"}>
              00:{timeLeft < 10 ? `0` : ``}
              {timeLeft}
            </Text>
            <Text
              cursor={timeLeft === 0 ? "pointer" : ""}
              onClick={timeLeft === 0 ? () => resendOtp() : ""}
              fontSize={{base: "12px", md: "16px"}}
              fontWeight={600}
              color={timeLeft === 0 ? "#667085" : "#EAECF0"}
            >
              Resend
            </Text>
          </HStack>
        </Stack>
        <Button
          onClick={processOTP}
          isDisabled={otp.length !== 6}
          id="continue"
          bg={"#A41857"}
          _hover={{ bg: "#90164D" }}
          fontSize={"18px"}
          fontWeight={600}
          color={"#FFFFFF"}
          py={"12px"}
          w={"100%"}
          h={"fit-content"}
          isLoading={loading}
        >
          Continue
        </Button>
      </Stack>

      <VerifyIdentity isOpen={isOpenConfirm} onClose={onCloseConfirm} />
    </>
  );
};
