/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Select,
  Input,
  Grid,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { ForgotPIN } from "./ForgotPIN";
import OtpInput from "../../elements/PinInput";
import { handleErrors } from "../../utils/handleResponse";
import userService from "../../services/userService";

export const PINManagement = ({
  backHome,
  moveToQuestions,
  securityQuestions,
  accountnumber,
  phoneNumber,
  email,
}) => {
  const [managePIN, setManagePIN] = useState(true);
  const [showCreatePIN, setShowCreatePIN] = useState(false);
  const [showForgotPIN, setShowForgotPIN] = useState(false);
  const [showChangePIN, setShowChangePIN] = useState(false);
  const [showPIN1, setShowPIN1] = useState(false);
  const [showPIN2, setShowPIN2] = useState(false);
  const [otp, setOtp] = useState("");
  const [process, setProcess] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [pin, setPin] = useState("");
  const [newpin, setNewPin] = useState("");
  const [resetpin, setResetPin] = useState("");
  const [loading, setLoading] = useState(false);

  const moveToManagePIN = () => {
    setManagePIN(true);
    setShowCreatePIN(false);
    setShowForgotPIN(false);
    setShowChangePIN(false);
    setShowPIN1(false);
    setShowPIN2(false);
    setShowSuccess(false);
    window.scrollTo({ top: 0 });
  };

  const moveToCreatePIN = () => {
    setManagePIN(false);
    setShowCreatePIN(true);
    setShowForgotPIN(false);
    setShowChangePIN(false);
    setShowPIN1(false);
    setShowPIN2(false);
    setShowSuccess(false);
    window.scrollTo({ top: 0 });
  };

  const moveToForgotPIN = () => {
    setManagePIN(false);
    setShowCreatePIN(false);
    setShowForgotPIN(true);
    setShowChangePIN(false);
    setShowPIN1(false);
    setShowPIN2(false);
    setShowSuccess(false);
    window.scrollTo({ top: 0 });
  };

  const moveToChangePIN = () => {
    setManagePIN(false);
    setShowCreatePIN(false);
    setShowForgotPIN(false);
    setShowChangePIN(true);
    setShowPIN1(false);
    setShowPIN2(false);
    setShowSuccess(false);
    setProcess("CHANGE-PIN");
    window.scrollTo({ top: 0 });
  };

  const moveToPIN1 = async () => {
    //validate security answer before moving user
    try {
      setLoading(true);
      const response = await userService.validateSecurityAnswer({
        questionId: question,
        questionAnswer: answer,
      });

      setLoading(false);
      setManagePIN(false);
      setShowCreatePIN(false);
      setShowForgotPIN(false);
      setShowChangePIN(false);
      setShowPIN1(true);
      setShowPIN2(false);
      setShowSuccess(false);
      window.scrollTo({ top: 0 });
      console.log(response);
    } catch {
      setLoading(false);
    }
  };

  const moveToPIN2 = () => {
    setManagePIN(false);
    setShowCreatePIN(false);
    setShowForgotPIN(false);
    setShowChangePIN(false);
    setShowPIN1(false);
    setShowPIN2(true);
    setShowSuccess(false);
    window.scrollTo({ top: 0 });
  };

  const moveToSuccess = async () => {
    try {
      setLoading(true);
      const response = await userService.setTransactionPin({
        accountnumber: accountnumber,
        transactionpin: newpin,
        renter_Transactionpin: resetpin,
      });

      console.log(response);
      setLoading(false);
      setShowCreatePIN(false);
      setShowForgotPIN(false);
      setShowChangePIN(false);
      setShowPIN1(false);
      setShowPIN2(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0 });
    } catch (error) {
      setLoading(false);
      handleErrors(error);
    }
  };

  const goBackRepeatPin = () => {
    setShowPIN1(true);
    setShowPIN2(false);
  };

  const handleComplete = () => {
    moveToManagePIN();
    backHome();
  };

  const handleForgotPin = ({ otp, question, answer }) => {
    setOtp(otp);
    setQuestion(question);
    setAnswer(answer);
    setProcess("FORGOT-PIN");
    setManagePIN(false);
    setShowCreatePIN(false);
    setShowForgotPIN(false);
    setShowChangePIN(false);
    setShowPIN1(true);
    setShowPIN2(false);
    setShowSuccess(false);
  };

  const handleChangePin = () => {
    setProcess("CHANGE-PIN");
    setManagePIN(false);
    setShowCreatePIN(false);
    setShowForgotPIN(false);
    setShowChangePIN(false);
    setShowPIN1(true);
    setShowPIN2(false);
    setShowSuccess(false);
  };

  const moveToSuccessForgotPin = async () => {
    try {
      setLoading(true);
      const response = await userService.forgotPin({
        accountnumber: accountnumber,
        opTcode: otp,
        new_Trans_Pin: newpin,
        renter_Transactionpin: resetpin,
        questionId: question,
        answer_To_Question: answer,
      });

      console.log(response);
      setLoading(false);
      setShowCreatePIN(false);
      setShowForgotPIN(false);
      setShowChangePIN(false);
      setShowPIN1(false);
      setShowPIN2(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0 });
    } catch (error) {
      setLoading(false);
      handleErrors(error);
    }
  };

  const moveToSuccessChangePin = async () => {
    try {
      setLoading(true);
      await userService.changePin({
        currentpin: pin,
        transactionpin: newpin,
        renter_Transactionpin: resetpin,
      });

      setLoading(false);
      setShowCreatePIN(false);
      setShowForgotPIN(false);
      setShowChangePIN(false);
      setShowPIN1(false);
      setShowPIN2(false);
      setShowSuccess(true);
      window.scrollTo({ top: 0 });
    } catch {
      setLoading(false);
    }
  };

  const handleProceed = async () => {
    if (process === "FORGOT-PIN") {
      await moveToSuccessForgotPin();
    } else if (process === "CHANGE-PIN") {
      await moveToSuccessChangePin();
    } else {
      await moveToSuccess();
    }
  };

  return (
    <>
      {managePIN && (
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
              PIN Management
            </Text>
          </HStack>
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="48px"
          >
            <Text textAlign="center" color="#667085" fontSize={{base: "14px", md: "16px"}}>
              Make sure you keep PIN safe and secure
            </Text>

            <Grid
              gridTemplateColumns={{base: '1fr', md: '1fr 1fr 1fr'}}
              w="100%"
              gap="16px"
            >
              <Button
                onClick={moveToCreatePIN}
                bg="#FFFFFF"
                border="1px solid #EAECF0"
                borderRadius="8px"
                _hover={{ bg: "#FFFFFF" }}
                fontSize="18px"
                fontWeight={600}
                color="#A41857"
                alignItems="center"
                py="38px"                
              >
                Create PIN
              </Button>
              <Button
                onClick={moveToForgotPIN}
                bg="#FFFFFF"
                border="1px solid #EAECF0"
                borderRadius="8px"
                _hover={{ bg: "#FFFFFF" }}
                fontSize="18px"
                fontWeight={600}
                color="#A41857"
                alignItems="center"
                py="38px"
              >
                Forgot PIN
              </Button>
              <Button
                onClick={moveToChangePIN}
                bg="#FFFFFF"
                border="1px solid #EAECF0"
                borderRadius="8px"
                _hover={{ bg: "#FFFFFF" }}
                fontSize="18px"
                fontWeight={600}
                color="#A41857"
                alignItems="center"
                py="38px"
              >
                Change PIN
              </Button>
            </Grid>
          </Stack>
        </Box>
      )}

      {showCreatePIN && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{base: "14px", md: "26px"}}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button
              onClick={moveToManagePIN}
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
              Create PIN
            </Text>
          </HStack>
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="48px"
          >
            <Text textAlign="center" color="#667085" fontSize={{base: "14px", md: "16px"}}>
              Secure your account with 4 digits PIN
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
              onClick={moveToPIN1}
              mt="16px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{base: "100%", md: "80%"}}
              h="48px"
              isLoading={loading}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      )}

      {showForgotPIN && (
        <ForgotPIN
          toPin={handleForgotPin}
          backHome={moveToManagePIN}
          moveToQuestions={moveToQuestions}
          securityQuestions={securityQuestions}
          phoneNumber={phoneNumber}
          accountnumber={accountnumber}
          email={email}
        />
      )}

      {showChangePIN && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{base: "14px", md: "26px"}}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button h="24px" bg="#EAECF0" p={0} _hover={{ bg: "#EAECF0" }}>
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              width="100%"
              textAlign="center"
              fontSize={{base: "16px", md: "18px"}}
              fontWeight={600}
              color="#101828"
            >
              Current Transaction PIN
            </Text>
          </HStack>
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="48px"
          >
            <Text textAlign="center" color="#667085" fontSize={{base: "14px", md: "16px"}}>
              Make sure you keep PIN safe and secure
            </Text>

            <OtpInput
              size={"lg"}
              length={4}
              width={{base: "100%", md: 110}}
              height={"75px"}
              setOtp={(e) => setPin(e)}
            />

            <Button
              onClick={handleChangePin}
              mt="16px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{base: "100%", md: "80%"}}
              h="48px"
              isDisabled={pin.length != 4}
            >
              Change PIN
            </Button>
          </Stack>
        </Box>
      )}

      {showPIN1 && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{base: "14px", md: "26px"}}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button
              onClick={moveToManagePIN}
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
              Create Transaction PIN
            </Text>
          </HStack>
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="48px"
          >
            <Text color="#667085"  textAlign="center" fontSize={{base: "14px", md: "16px"}}>
              Secure your account with 4 digit PIN
            </Text>

            <OtpInput
              size={"lg"}
              length={4}
              width={{base: "100%", md: 110}}
              height={"75px"}
              setOtp={(e) => setNewPin(e)}
            />

            <Button
              onClick={moveToPIN2}
              mt="16px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{base: "100%", md: "80%"}}
              h="48px"
              isDisabled={newpin.length != 4}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      )}

      {showPIN2 && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{base: "14px", md: "26px"}}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button
              onClick={goBackRepeatPin}
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
              Repeat Transaction PIN
            </Text>
          </HStack>
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="48px"
          >
            <Text color="#667085" textAlign="center" fontSize={{base: "14px", md: "16px"}}>
              Enter 4 digit PIN again
            </Text>

            <OtpInput
              size={"lg"}
              length={4}
              width={{base: "100%", md: 110}}
              height={"75px"}
              setOtp={(e) => setResetPin(e)}
            />

            <Button
              onClick={handleProceed}
              mt="16px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{base: "100%", md: "80%"}}
              h="48px"
              isLoading={loading}
              isDisabled={resetpin.length != 4}
            >
              Proceed
            </Button>
          </Stack>
        </Box>
      )}

      {showSuccess && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={"26px"}
            py={"30px"}
            borderRadius={"12px 12px 0 0"}
          ></HStack>
          <Stack
            spacing="8px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="48px"
          >
            <img
              style={{ width: "200px", height: "auto" }}
              src={getImageUrl("icons/success.png")}
            />
            <Text
              mt={"12px"}
              fontSize={{base: "16px", md: "18px"}}
              fontWeight={700}
              color={"#000000"}
              textAlign={"center"}
            >
              Success!
            </Text>
            <Text
              fontSize={{base: "12px", md: "14px"}}
              fontWeight={500}
              color="#667085"
              textAlign="center"
            >
              Your PIN has been created successfully
            </Text>

            <Button
              onClick={handleComplete}
              mt="16px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{base: "100%", md: "80%"}}
              h="48px"
            >
              Okay, Thank You
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
};
