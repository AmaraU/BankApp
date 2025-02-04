import { useState, useEffect } from "react";
import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import styles from "./Overview.module.css";
import { getImageUrl } from "../../../utils";
import { TransactionPIN } from "./TransactionPIN";
import { SecurityQuestions } from "./SecurityQuestions";
import { EmailAddress } from "./EmailAddress";
import { useDispatch, useSelector } from "react-redux";
import { getSetupStatus } from "../../store/auth/user.slice";

export const AccountSetup = () => {
  const [accountSetup, setAccountSetup] = useState(true);
  const [showTransPIN, setShowTransPIN] = useState(false);
  const [showSecurityQuestion, setShowSecurityQuestion] = useState(false);
  const [showEmailAddress, setShowEmailAddress] = useState(false);
  const { email, phoneNumber } = useSelector((state) => state.user);

  const [transPINFilled, setTransPINFilled] = useState(false);
  const [securityQuestionsFilled, setSecurityQuestionsFilled] = useState(false);
  const [emailAddressFilled] = useState(false);

  const { emailAddressVerification, secretQuestion, transactionPIN } =
    useSelector((state) => state.user.setupStatus) || {
      emailAddressVerification: false,
      secretQuestion: false,
      transactionPIN: false,
    };

  const moveToSetup = () => {
    setAccountSetup(true);
    setShowTransPIN(false);
    setShowSecurityQuestion(false);
    setShowEmailAddress(false);
  };

  const proceedTransactionPin = () => {
    setAccountSetup(true);
    setShowTransPIN(false);
    setShowSecurityQuestion(false);
    setShowEmailAddress(false);
    setTransPINFilled(true);
  };

  const proceedSecurityQuestion = () => {
    setAccountSetup(true);
    setShowTransPIN(false);
    setShowSecurityQuestion(false);
    setShowEmailAddress(false);
    setSecurityQuestionsFilled(true);
  };

  const moveToTransPIN = () => {
    if (!transactionPIN) {
      setAccountSetup(false);
      setShowTransPIN(true);
      setShowSecurityQuestion(false);
      setShowEmailAddress(false);
    }
  };
  const moveToSecurityQuestions = () => {
    if (!secretQuestion) {
      setAccountSetup(false);
      setShowTransPIN(false);
      setShowSecurityQuestion(true);
      setShowEmailAddress(false);
    }
  };
  const moveToEmailAddress = () => {
    // if (!emailAddressVerification) {
    setAccountSetup(false);
    setShowTransPIN(false);
    setShowSecurityQuestion(false);
    setShowEmailAddress(true);
    // }
  };

  const handleProceed = () => {
    if (
      (emailAddressVerification || emailAddressFilled) &&
      (secretQuestion || securityQuestionsFilled) &&
      (transactionPIN || transPINFilled)
    ) {
      window.location.href = "/overview/dashboard";
      return;
    }

    if (
      (transactionPIN || transPINFilled) &&
      (secretQuestion || securityQuestionsFilled)
    ) {
      moveToEmailAddress();
      return;
    }

    if (transactionPIN || transPINFilled) {
      moveToSecurityQuestions();
      return;
    }

    moveToTransPIN();
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getSetupStatus());
  }, [dispatch]);

  const goBack = () => {
    window.location.href = "/overview/dashboard";
  };

  return (
    <div className={styles.whole}>
      <HStack mb="40px" spacing="12px">
        {accountSetup && (
          <button onClick={goBack}>
            <img src={getImageUrl("icons/blackLeftArrow.png")} />
          </button>
        )}
        <Text
          fontSize={{ base: "18px", md: "24px" }}
          fontWeight={700}
          color="#101828"
        >
          Complete Account Setup
        </Text>
      </HStack>

      {accountSetup && (
        <Box>
          <HStack
            bg="#EAECF0"
            px="14px"
            py="14px"
            borderRadius="12px 12px 0 0"
            justifyContent="space-between"
          >
            <Text
              flex="95%"
              textAlign="center"
              fontSize={{ base: "14px", md: "18px" }}
              fontWeight={600}
              color="#101828"
            >
              Account Setup
            </Text>
          </HStack>
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            py="16px"
            pb="114px"
          >
            <Text
              w={{ base: "90%", md: "75%" }}
              fontSize={{ base: "12px", md: "16px" }}
              color="#667085"
              textAlign="center"
            >
              You&apos;re almost there! Please follow the steps below
            </Text>

            <Stack
              w={{ base: "90%", md: "75%" }}
              bg="#F2F4F7"
              py="18px"
              px="16px"
              borderRadius="8px"
            >
              <HStack
                spacing="10px"
                onClick={moveToTransPIN}
                cursor="pointer"
                w="fit-content"
                alignItems="start"
              >
                <Box
                  p={{ base: "6px", md: "8px" }}
                  borderRadius="38px"
                  border={
                    transactionPIN || transPINFilled
                      ? "1px solid #2AD062"
                      : "1px solid #EAECF0"
                  }
                >
                  <Box
                    p="2px"
                    borderRadius="38px"
                    bg={
                      transactionPIN || transPINFilled ? "#2AD062" : "#667085"
                    }
                  >
                    <img
                      src={getImageUrl("icons/whiteCheck.png")}
                      // style={{ width: "12px", height: "12px" }}
                      className={styles.check}
                    />
                  </Box>
                </Box>
                <Text
                  mt={1}
                  fontSize={{ base: "12px", md: "16px" }}
                  fontWeight={600}
                  color="#0C111D"
                >
                  Create transaction PIN
                </Text>
              </HStack>

              <Box h="14px" w="1px" ml="16px" border="1px dashed #A0A3BD"></Box>

              <HStack
                spacing="12px"
                onClick={moveToSecurityQuestions}
                cursor="pointer"
                w="fit-content"
              >
                <Box
                  p="8px"
                  borderRadius="38px"
                  border={
                    securityQuestionsFilled || secretQuestion
                      ? "1px solid #2AD062"
                      : "1px solid #EAECF0"
                  }
                >
                  <Box
                    p="2px"
                    borderRadius="38px"
                    bg={
                      securityQuestionsFilled || secretQuestion
                        ? "#2AD062"
                        : "#667085"
                    }
                  >
                    <img
                      src={getImageUrl("icons/whiteCheck.png")}
                      // style={{ width: "12px", height: "12px" }}
                      className={styles.check}
                    />
                  </Box>
                </Box>
                <Text
                  fontSize={{ base: "12px", md: "16px" }}
                  fontWeight={600}
                  color="#0C111D"
                >
                  Add security question
                </Text>
              </HStack>

              <Box h="14px" w="1px" ml="16px" border="1px dashed #A0A3BD"></Box>

              <HStack
                spacing="12px"
                onClick={moveToEmailAddress}
                cursor="pointer"
                w="fit-content"
              >
                <Box
                  p="8px"
                  borderRadius="38px"
                  border={
                    emailAddressFilled || emailAddressVerification
                      ? "1px solid #2AD062"
                      : "1px solid #EAECF0"
                  }
                >
                  <Box
                    p="2px"
                    borderRadius="38px"
                    bg={
                      emailAddressFilled || emailAddressVerification
                        ? "#2AD062"
                        : "#667085"
                    }
                  >
                    <img
                      src={getImageUrl("icons/whiteCheck.png")}
                      // style={{ width: "12px", height: "12px" }}
                      className={styles.check}
                    />
                  </Box>
                </Box>
                <Text
                  fontSize={{ base: "12px", md: "16px" }}
                  fontWeight={600}
                  color="#0C111D"
                >
                  Validate email address
                </Text>
              </HStack>
            </Stack>

            <Button
              mt="16px"
              w={{ base: "90%", md: "75%" }}
              h="48px"
              bg="#A41856"
              _hover={{ bg: "#90164D" }}
              color="#FFFFFF"
              fontSize="14px"
              fontWeight={600}
              onClick={handleProceed}
            >
              Proceed
            </Button>
          </Stack>
        </Box>
      )}

      {showTransPIN && (
        <TransactionPIN
          moveToSetup={moveToSetup}
          proceed={proceedTransactionPin}
          moveToSecurity={moveToSecurityQuestions}
        />
      )}
      {showSecurityQuestion && (
        <SecurityQuestions
          proceed={proceedSecurityQuestion}
          moveToSetup={moveToSetup}
          moveToEmailAddress={moveToEmailAddress}
        />
      )}
      {showEmailAddress && (
        <EmailAddress
          moveToSetup={moveToSetup}
          email={email}
          phoneNumber={phoneNumber}
        />
      )}
    </div>
  );
};
