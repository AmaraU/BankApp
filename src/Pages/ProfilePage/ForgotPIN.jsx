/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  Input,
  FormControl,
  FormLabel,
  Select,
  Center,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import OtpInput from "../../elements/PinInput";
import { formatNumberStar } from "../../utils/formatter";
import authService from "../../services/authService";

export const ForgotPIN = ({
  backHome,
  toPin,
  moveToQuestions,
  securityQuestions,
  phoneNumber,
  accountnumber,
  email,
}) => {
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const moveToStepOne = () => {
    setAnswer("")
    setStepOne(true);
    setStepTwo(false);
    window.scrollTo({ top: 0 });
    setLoading(false);
  };

  const moveToStepTwo = async () => {
    try {
      setLoading(true);
      const response = await authService.sendOtp({
        phoneOrAccountnumber: accountnumber,
        email: email,
      });
      console.log(response);
      setStepOne(false);
      setStepTwo(true);
      window.scrollTo({ top: 0 });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const verifyOtp = async () => {
    try {
      setLoading(true);
      await authService.verifyOtp({
        otp: otp,
        phoneNumber: phoneNumber,
      });
      toPin({ otp, question, answer });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  return (
    <>
      {stepOne && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{base: "14px", md: "26px"}}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button
              onClick={backHome}
              h="24px"
              bg="#EAECF0"
              p={0}
              _hover={{ bg: "#EAECF0" }}
            >
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              width="100%"
              textAlign="center"
              fontSize={{base: "16px", md: "18px"}}
              fontWeight={600}
              color="#101828"
            >
              Forgot PIN
            </Text>
          </HStack>
          <Stack
            spacing="16px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="48px"
          >
            <Text textAlign="center" color="#667085" fontSize={{base: "14px", md: "16px"}}>
              Provide answer to your security question
            </Text>

            <FormControl w={{base: "100%", md: "80%"}}>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
                Security Question 1
              </FormLabel>
              <Select
                h="48px"
                bg="#F7F7F7"
                border="1px solid #EAECF0"
                fontSize={{base: "14px", md: "16px"}}
                color="#101828"
                onChange={(e) => setQuestion(e.target.value)}
              >
                {securityQuestions.map((option, i) => (
                  <option key={i} value={option.id}>
                    {option.secret_Question}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl w={{base: "100%", md: "80%"}}>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
                Answer 1
              </FormLabel>
              <Input
                h="48px"
                bg="#F7F7F7"
                border="1px solid #EAECF0"
                fontSize={{base: "14px", md: "16px"}}
                color="#101828"
                onChange={(e) => setAnswer(e.target.value)}
              />
            </FormControl>

            <Stack
              spacing={2}
              textAlign="left"
              w={{base: "100%", md: "80%"}}
              direction={{base: 'column', md: "row"}}
            >
              <img src={getImageUrl("icons/warning.png")} alt="" />
              <Text fontSize={{base: "10px", md: "11.5px"}} fontWeight={450} color="#667085">
                Don&apos;t remember answer
              </Text>
              <Text
                fontSize={{base: "10px", md: "11.5px"}}
                fontWeight={700}
                color="#A41857"
                cursor="pointer"
                onClick={moveToQuestions}
              >
                Change security question
              </Text>
            </Stack>

            <Button
              onClick={moveToStepTwo}
              mt="16px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{base: "100%", md: "80%"}}
              h="48px"
              isLoading={loading}
              defaultValue={answer}
              isDisabled={answer == '' && answer.length == 0}
            >
              Continue
            </Button>

          </Stack>
        </Box>
      )}

      {stepTwo && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{base: "14px", md: "26px"}}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button
              onClick={moveToStepOne}
              h="24px"
              bg="#EAECF0"
              p={0}
              _hover={{ bg: "#EAECF0" }}
            >
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              width="100%"
              textAlign="center"
              fontSize={{base: "16px", md: "18px"}}
              fontWeight={600}
              color="#101828"
            >
              Forgot PIN
            </Text>
          </HStack>

          <Stack
            spacing="16px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="48px"
          >
            <Text textAlign="center" color="#667085" fontSize={{base: "14px", md: "16px"}}>
              Kindly enter the 6-digits OTP we sent to{" "}
              <b>{formatNumberStar(phoneNumber)}</b>
            </Text>

            <FormControl w={{base: "100%", md: "80%"}}>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
                OTP
              </FormLabel>
              <Center>
                <OtpInput length={6} height={70} width={{base: "100%", md: 100}} setOtp={setOtp} />
              </Center>
            </FormControl>

            <Button
              onClick={verifyOtp}
              mt="16px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{base: "100%", md: "80%"}}
              h="48px"
              isLoading={loading}
              isDisabled={otp == '' && otp.length != 6}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};
