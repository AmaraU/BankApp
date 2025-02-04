/* eslint-disable react/prop-types */
import { useState } from "react";
import { Stack, Text, Button, HStack, Switch } from "@chakra-ui/react";
import { getImageUrl } from "../../utils";
import { useNavigate } from "react-router-dom";
import OtpInput from "../elements/PinInput";

export const CompleteTransaction = ({
  handleSubmit,
  loading,
  toForgot,
  phoneNumber,
  type,
  amount,
  enterPin,
  isSuccess,
  isFailed,
}) => {
  const [pin, setPin] = useState("");

  const navigate = useNavigate();

  const moveToSuccess = () => {
    handleSubmit({ pin });
  };

  const handleForget = () => {
    if (window.location.pathname.includes("/overview/profile")) {
      toForgot();
    } else {
      navigate("/overview/profile", { state: "forgot" });
      window.scrollTo({ top: 0 });
    }
  };

  return (
    <>
      {enterPin && (
        <Stack
          spacing={"24px"}
          alignItems={"center"}
          border={"1px solid #EFECE9"}
          bg={"#FFFFFF"}
          borderRadius={"0 0 12px 12px"}
          py={"16px"}
          pb={"114px"}
          px="12px"
        >
          <Text fontSize={{base: "14px", md: "16px"}} color={"#667085"} textAlign={"center"}>
            Enter your 4-digit PIN to complete your transaction
          </Text>

          <OtpInput
            length={4}
            setOtp={setPin}
            height={70}
            width={{base: "100%", md: 100}}
          />

          <Text
            color={"#A41857"}
            fontSize={{base: "12px", md: "14px"}}
            fontWeight={500}
            cursor={"pointer"}
            _hover={{ textDecoration: "underline" }}
            onClick={handleForget}
          >
            Forgotten you PIN?
          </Text>

          <Button
            mt={"16px"}
            w={{base: "100%", md: "75%"}}
            h={"fit-content"}
            py={"16px"}
            px={"20px"}
            bg={"#A41856"}
            _hover={{ bg: "#90164D" }}
            color={"#FFFFFF"}
            fontSize={"14px"}
            fontWeight={600}
            onClick={moveToSuccess}
            isDisabled={pin.length !== 4}
            isLoading={loading}
          >
            Continue
          </Button>
        </Stack>
      )}

      {isSuccess && (
        <Stack
          spacing={"20px"}
          alignItems={"center"}
          border={"1px solid #EFECE9"}
          bg={"#FFFFFF"}
          borderRadius={"0 0 12px 12px"}
          pt={"16px"}
          pb={"114px"}
          px="12px"
        >
          <img
            style={{ width: "200px", height: "auto" }}
            src={getImageUrl("icons/success.png")}
          />

          <Stack>
            <Text
              mt={"12px"}
              fontSize={{base: "16px", md: "18px"}}
              fontWeight={700}
              color={"#000000"}
              textAlign={"center"}
            >
              Success!
            </Text>
            {type === "transaction" ? (
              <Text
                fontSize={{base: "12px", md: "14px"}}
                fontWeight={500}
                color="#667085"
                textAlign="center"
              >
                Your transaction has been completed successfully
              </Text>
            ) : type === "bills" ? (
              <Text
                fontSize={{base: "12px", md: "14px"}}
                fontWeight={500}
                color="#667085"
                textAlign="center"
              >
                Your transaction has been completed successfully
              </Text>
            ) : type === "airtime" ? (
              <Text
                fontSize={{base: "12px", md: "14px"}}
                fontWeight={450}
                color="#667085"
                textAlign="center"
              >
                You just recharged{" "}
                <span style={{ fontWeight: 500 }}>{phoneNumber}</span> with{" "}
                <span style={{ fontWeight: 500 }}>₦{amount} Airtime</span>
              </Text>
            ) : type === "data" ? (
              <Text
                fontSize={{base: "12px", md: "14px"}}
                fontWeight={500}
                color="#667085"
                textAlign="center"
              >
                You just recharged {phoneNumber} with {amount}GB Data
              </Text>
            ) : type === "savings" ? (
              <Text
                fontSize={{base: "12px", md: "14px"}}
                fontWeight={450}
                color="#667085"
                textAlign="center"
              >
                Your transaction has been completed successfully
              </Text>
            ) : (
              <></>
            )}
          </Stack>

          {type === "bills" || type === "data" ? (
            <HStack w={{base: "100%", md: "75%"}} justifyContent="space-between" alignItems="center">
              <Text fontSize={{base: "12px", md: "14px"}} fontWeight={500} color="#667085">
                Set as Auto-Renew
              </Text>
              <Switch
                size="md"
                color="#A41856"
                colorScheme="#A41856"
                sx={{
                  ".chakra-switch__track[data-checked]:not([data-theme])": {
                    backgroundColor: "#A41856",
                  },
                }}
              />
            </HStack>
          ) : (
            ""
          )}

          {!type === "savings" && (
            <>
              <Button
                mt="16px"
                w={{base: "100%", md: "75%"}}
                h="48px"
                bg="#A41856"
                _hover={{ bg: "#90164D" }}
                color="#FFFFFF"
                fontSize="14px"
                fontWeight={600}
                onClick={() => navigate("/receipt")}
              >
                Download Receipt
              </Button>
              <Button
                w={{base: "100%", md: "75%"}}
                h={"48px"}
                bg={"#EFECE9"}
                _hover={{ bg: "#E3E1DE" }}
                color={"#667085"}
                fontSize={"14px"}
                fontWeight={600}
                onClick={() => navigate("/overview/dashboard")}
              >
                Go to dashboard
              </Button>
            </>
          )}

          <Button
            mt="16px"
            w={{base: "100%", md: "75%"}}
            h="48px"
            bg="#A41856"
            _hover={{ bg: "#90164D" }}
            color="#FFFFFF"
            fontSize="14px"
            fontWeight={600}
            onClick={() => location.reload()}
          >
            Okay, Thank You
          </Button>
        </Stack>
      )}

      {isFailed && (
        <Stack
          spacing={"24px"}
          alignItems={"center"}
          border={"1px solid #EFECE9"}
          bg={"#FFFFFF"}
          borderRadius={"0 0 12px 12px"}
          py="16px"
          pb="114px"
          px="12px"
        >
          <img
            style={{ width: "70px", height: "auto" }}
            src={getImageUrl("icons/failure.png")}
          />

          <Stack>
            <Text
              mt={"12px"}
              fontSize={{base: "16px", md: "18px"}}
              fontWeight={700}
              color={"#000000"}
              textAlign={"center"}
            >
              Failed!
            </Text>
            <Text
              fontSize={{base: "12px", md: "14px"}}
              fontWeight={500}
              color={"#667085"}
              textAlign={"center"}
            >
              Your transaction failed. Please try again
            </Text>
          </Stack>

          <Button
            mt={"16px"}
            w={{base: "100%", md: "75%"}}
            h={"48px"}
            bg={"#A41856"}
            _hover={{ bg: "#90164D" }}
            color={"#FFFFFF"}
            fontSize={"14px"}
            fontWeight={600}
            onClick={() => location.reload()}
          >
            Try again
          </Button>
          <Button
            w={{base: "100%", md: "75%"}}
            h={"48px"}
            bg={"#EFECE9"}
            _hover={{ bg: "#E3E1DE" }}
            color={"#667085"}
            fontSize={"14px"}
            fontWeight={600}
            onClick={() => navigate("/overview/dashboard")}
          >
            Go to dashboard
          </Button>
        </Stack>
      )}
    </>
  );
};
