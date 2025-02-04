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
  InputGroup,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import styles from "./ProfilePage.module.css";
import userService from "../../services/userService";
import OtpInput from "../../elements/PinInput";
import SuccessComponent from "../../Components/SuccessComponent";


export const ChangePassword = ({ backHome }) => {

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmNewPassword] = useState("");
  const [strength, setStrength] = useState(0);
  const [strengthText, setstrengthText] = useState("");
  const [strengthColor, setStregnthColor] = useState("#EAECF0");
  const [hasEightChars, setHasEightChars] = useState(false);
  const [hasLowerCase, setHasLowerCase] = useState(false);
  const [hasUpperCase, setHasUpperCase] = useState(false);
  const [hasSpecialSymbol, setHasSpecialSymbol] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("")
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");

  const checkPasswordStrength = (password) => {
    let strengthScore = 0;

    if (password.length >= 8) {
      strengthScore += 1;
      setHasEightChars(true);
    } else if (password.length < 8) {
      setHasEightChars(false);
    }

    if (/[a-z]/.test(password)) {
      strengthScore += 1;
      setHasLowerCase(/[a-z]/.test(password));
    } else {
      setHasLowerCase(false);
    }

    if (/[A-Z]/.test(password)) {
      strengthScore += 1;
      setHasUpperCase(true);
    } else {
      setHasUpperCase(false);
    }

    if (/[\W_]/.test(password)) {
      strengthScore += 1;
      setHasSpecialSymbol(true);
    } else {
      setHasSpecialSymbol(false);
    }

    if (strengthScore <= 1) {
      setstrengthText("Weak");
      setStregnthColor("red");
    }
    if (strengthScore > 1) {
      setstrengthText("Average");
      setStregnthColor("#DB9308");
    }
    if (strengthScore > 3) {
      setstrengthText("Strong");
      setStregnthColor("#2AD062");
    }

    return strengthScore;
  };

  const handlePasswordChange = (e) => {
    const enteredPassword = e.target.value;
    setNewPassword(enteredPassword);
    setStrength(checkPasswordStrength(enteredPassword));
  };

  const sendOtp = async () => {
    setStep(2);
  };

  const changePassword = async () => {
    setLoading(true);
    try {
      await userService.verifyPin(pin);
      const response = await userService.changePassword({
        currentPassword: password,
        newPassword: newPassword,
        confirmPassword: confirmPassword,
      });

      console.log(response);
      setStep(3);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const handleBack = () => {
    if (step == 2) {
      setStep(1);
      return;
    }

    if (step == 3) {
      setStep(1);
      backHome();
      return;
    }

    backHome();
  };
  return (
    <>
      <Box>
        <HStack
          bg="#EAECF0"
          px={{base: "14px", md: "26px"}}
          py={"14px"}
          borderRadius={"12px 12px 0 0"}
        >
          <Button
            onClick={handleBack}
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
            Change Password
          </Text>
        </HStack>
        {step == 1 && (
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="24px"
          >
            <Text w={{base: "100%", md: "80%"}} color="#667085" fontSize={{base: "16px", md: "18px"}} textAlign="center">
              Make sure you use at least 8 characters. One lowercase, one
              uppercase and a special symbol
            </Text>

            <FormControl w={{base: "100%", md: "80%"}}>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
                Current Password
              </FormLabel>
              <InputGroup>
                <Input
                  h="48px"
                  fontSize={{base: "14px", md: "16px"}}
                  placeholder="Enter your password"
                  type={showCurrentPassword ? "text" : "password"}
                  border={"1px solid #EAECF0"}
                  bg={"#F7F7F7"}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    _hover={"transparent"}
                    onClick={() =>
                      setShowCurrentPassword(
                        (showCurrentPassword) => !showCurrentPassword
                      )
                    }
                  >
                    {showCurrentPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl w={{base: "100%", md: "80%"}}>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
                New Password
              </FormLabel>
              <InputGroup>
                <Input
                  h="48px"
                  placeholder="Enter your password"
                  fontSize={{base: "14px", md: "16px"}}
                  type={showNewPassword ? "text" : "password"}
                  border="1px solid #EAECF0"
                  bg="#F7F7F7"
                  value={newPassword}
                  onChange={handlePasswordChange}
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    _hover={"transparent"}
                    onClick={() =>
                      setShowNewPassword((showNewPassword) => !showNewPassword)
                    }
                  >
                    {showNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Stack w={{base: "100%", md: "80%"}}>
              <Box display="flex" gap="4px" alignItems="center">
                {[...Array(4)].map((_, index) => (
                  <Box
                    key={index}
                    className={styles.strengthBar}
                    bgColor={index < strength ? strengthColor : ""}
                  ></Box>
                ))}
                <Text fontSize={{base: "10px", md: "12px"}} color={strengthColor} ml="24px">
                  {strengthText}
                </Text>
              </Box>
              <Box
                display="flex"
                flexDirection={{base: "column", md: "row"}}
                gap="16px"
                alignItems="center"
                justifyContent="space-between"
              >
                <div
                  className={
                    hasEightChars
                      ? styles.passwordCheck
                      : styles.passwordUncheck
                  }
                >
                  <div className={styles.checkbox}>
                    <img src={getImageUrl("icons/whiteCheck.png")} />
                  </div>
                  At least 8 characters strong
                </div>
                <div
                  className={
                    hasLowerCase ? styles.passwordCheck : styles.passwordUncheck
                  }
                >
                  <div className={styles.checkbox}>
                    <img src={getImageUrl("icons/whiteCheck.png")} />
                  </div>
                  One lower case character
                </div>
                <div
                  className={
                    hasUpperCase ? styles.passwordCheck : styles.passwordUncheck
                  }
                >
                  <div className={styles.checkbox}>
                    <img src={getImageUrl("icons/whiteCheck.png")} />
                  </div>
                  One upper case character
                </div>
                <div
                  className={
                    hasSpecialSymbol
                      ? styles.passwordCheck
                      : styles.passwordUncheck
                  }
                >
                  <div className={styles.checkbox}>
                    <img src={getImageUrl("icons/whiteCheck.png")} />
                  </div>
                  One special symbol {"(@!><|.?*&%$)"}
                </div>
              </Box>
            </Stack>

            <FormControl w={{base: "100%", md: "80%"}}>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color={"#101828"}>
                Confirm Password
              </FormLabel>
              <InputGroup>
                <Input
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  h="48px"
                  placeholder="Enter your password"
                  fontSize={{base: "14px", md: "16px"}}
                  type={showConfirmNewPassword ? "text" : "password"}
                  border="1px solid #EAECF0"
                  bg="#F7F7F7"
                />
                <InputRightElement h="full">
                  <Button
                    variant="ghost"
                    _hover={"transparent"}
                    onClick={() =>
                      setShowConfirmNewPassword(
                        (showConfirmNewPassword) => !showConfirmNewPassword
                      )
                    }
                  >
                    {showConfirmNewPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              mt="24px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{base: "100%", md: "80%"}}
              h="48px"
              onClick={sendOtp}
              isLoading={loading}
              isDisabled={newPassword == "" || newPassword !== confirmPassword}
            >
              Proceed
            </Button>
          </Stack>
        )}

        {step == 2 && (
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="16px"
            pb="114px"
            pt="24px"
          >
            <Flex textAlign={"center"} justifyContent={"center"}>
              <Stack>
                <Text>Enter your 4-digit PIN to complete process</Text>
                <Text textAlign={"start"}>PIN</Text>
                <OtpInput length={4} height={20} width={100} setOtp={setPin} />

                <Button
                  mt="24px"
                  bg="#A41857"
                  _hover={{ bg: "#90164D" }}
                  fontSize="14px"
                  fontWeight={600}
                  color="#FFFFFF"
                  w="100%"
                  h="50px"
                  onClick={changePassword}
                  isLoading={loading}
                >
                  Continue
                </Button>
              </Stack>
            </Flex>
          </Stack>
        )}

        {step == 3 && (
          <SuccessComponent
            isNoHeading={true}
            title={"Success!"}
            description={"Your Password has been changed successfully"}
            handleProceed={() => handleBack()}
            btnTitle={"Okay, Thank you"}
          />
        )}
      </Box>
    </>
  );
};
