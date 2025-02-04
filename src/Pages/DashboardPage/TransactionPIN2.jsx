/* eslint-disable react/prop-types */
import { useState } from "react";
import { Stack, Text, Box, Button, HStack } from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import OtpInput from "../../elements/PinInput";

export const TransactionPIN2 = ({ moveToOne, moveToSecurity, loading }) => {
  const [pin, setPin] = useState("");

  return (
    <>
      <Box>
        <HStack
          bg={"#EAECF0"}
          justifyContent={"space-between"}
          px={{ base: "14px", md: "26px" }}
          py={"14px"}
          borderRadius={"12px 12px 0 0"}
          gap={0}
        >
          <Button
            h={"24px"}
            bg={"#EAECF0"}
            p={0}
            _hover={{ bg: "#EAECF0" }}
            onClick={moveToOne}
          >
            <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
          </Button>
          <Text
            textAlign="center"
            fontSize={{ base: "14px", md: "18px" }}
            fontWeight={600}
            color={"#101828"}
          >
            Repeat Transaction PIN
          </Text>
          <Text
            fontSize={{ base: "14px", md: "18px" }}
            fontWeight={600}
            color={"#101828"}
          >
            2/3
          </Text>
        </HStack>

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
            Enter 4 digits PIN again
          </Text>

          <Stack
            w={{ base: "90%", md: "50%" }}
            spacing="12px"
            alignItems="center"
          >
            <Text
              alignSelf="start"
              fontSize="14px"
              fontWeight={500}
              color="#394455"
            >
              Re-enter PIN
            </Text>

            <OtpInput
              size={"lg"}
              length={4}
              width={{ base: "100%", md: 110 }}
              height={"75px"}
              setOtp={(e) => setPin(e)}
            />
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
            onClick={() => moveToSecurity(pin)}
            isDisabled={pin.length != 4}
            isLoading={loading}
          >
            Proceed
          </Button>
        </Stack>
      </Box>
    </>
  );
};
