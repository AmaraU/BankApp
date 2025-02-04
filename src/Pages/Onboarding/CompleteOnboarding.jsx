import {
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { getImageUrl } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import {
  loadDetailsFromStorage,
  setDetails,
} from "../../store/auth/auth.slice";
import OtpInput from "../../elements/PinInput";
import { formatNumberStar } from "../../utils/formatter";
import authService from "../../services/authService";
import { handleErrors, handleSuccess } from "../../utils/handleResponse";
import { useNavigate } from "react-router-dom";

export const CompleteOnboarding = () => {
  const [timeLeft, setTimeLeft] = useState(30);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleVerifyPopup = async () => {
    setIsLoading(true);
    try {
      const response = await authService.completeRegistration({
        username: auth?.username.toLowerCase(),
        otpCode: otp,
      });
      setIsLoading(false);

      if (response) {
        await dispatch(
          setDetails({
            accountNo: response.data.result.data.accountNumber,
          })
        );
        navigate("/welcome");
      }
    } catch (error) {
      handleErrors(error);
      setIsLoading(false);
    }
  };

  const resendOtp = async () => {
    try {
      setTimeLeft(30);
      const response = await authService.sendOtp({
        phoneOrAccountnumber: auth?.altPhoneNumber
          ? auth?.altPhoneNumber
          : auth?.phoneNumber,
        email: auth?.email,
      });

      console.log(response);

      handleSuccess("Otp resent successfully");
    } catch (error) {
      handleErrors(error);
    }
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
        {/* <img
          style={{ width: "140px", height: "auto" }}
          src={getImageUrl("logos/arm_logo.png")}
          alt="ARM"
        /> */}
        BankApp
        <Flex justifyContent={"space-between"} w={"100%"}>
          <a href="/signup">
            <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
          </a>
          <CircularProgress value={90} size={"32px"} color={"#A41857"}>
            <CircularProgressLabel fontWeight={700} fontSize={"9px"}>
              90%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Text fontSize={{base: "24px", md: "48px"}} fontWeight={700} color={"#14142A"}>
          Verify your phone number
        </Text>
        <Text fontSize={{base: "13px", md: "18px"}} fontWeight={400} color={"#667085"}>
          Kindly enter the 6-digit OTP we sent to{" "}
          <b>{formatNumberStar(auth?.phoneNumber)}</b>
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
          onClick={handleVerifyPopup}
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
          isLoading={isLoading}
        >
          Continue
        </Button>
      </Stack>
    </>
  );
};
