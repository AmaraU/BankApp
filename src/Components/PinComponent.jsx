/* eslint-disable react/prop-types */
import { Stack, Flex, Button, Text, Box, HStack } from "@chakra-ui/react";
import OtpInput from "../elements/PinInput";
import { getImageUrl } from "../../utils";

function PinComponent({ setStep, handleContinue, loading, setPin, pin }) {
  return (
    <Box>
      <HStack bg="#EAECF0" px={{base: "14px", md: "26px"}} py="14px" borderRadius="12px 12px 0 0">
        <Button
          onClick={setStep}
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
          Complete Process
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
        pt="24px"
      >
        <Flex textAlign={"center"} justifyContent={"center"}>
          <Stack>
            <Text
              fontSize={{base: "14px", md: "16px"}}
              color={"#667085"}
            >
              Enter your 4-digit PIN to complete process
            </Text>
            <Text textAlign={"start"}>Pin</Text>
            <OtpInput
              length={4}
              height={{base: 50, md: 20}}
              width={{base: "100%", md: 100}}
              setOtp={setPin}
            />

            <Button
              mt="24px"
              bg="#A41857"
              _hover={{ bg: "#A41857" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w="100%"
              h="50px"
              onClick={handleContinue}
              isLoading={loading}
              isDisabled={pin === "" || pin.length !== 4}
            >
              Continue
            </Button>
          </Stack>
        </Flex>
      </Stack>
    </Box>
  );
}

export default PinComponent;
