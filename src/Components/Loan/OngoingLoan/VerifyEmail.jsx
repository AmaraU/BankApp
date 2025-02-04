/* eslint-disable react/prop-types */
import { Button, Stack, Text } from "@chakra-ui/react";
import CardContainer from "../../../elements/CardContainer";
import OtpInput from "../../../elements/PinInput";

function VerifyEmail({ title, moveToOne, moveNext }) {
  return (
    <CardContainer title={title} moveToOne={moveToOne}>
      <Text>We have sent a 6-digit OTP to your email address</Text>

      <Stack maxWidth={"630px"}>
      <Text textAlign={"start"} fontWeight={"medium"}>
        OTP
      </Text>
      <OtpInput length={6} size={"lg"} width={99} />

      <Button
        mt={"16px"}
        maxW={"630px"}
        w={"100%"}
        h={"fit-content"}
        py={"15px"}
        px={"20px"}
        bg={"#A41856"}
        _hover={{ bg: "#90164D" }}
        color={"#FFFFFF"}
        fontSize={"14px"}
        fontWeight={600}
        onClick={moveNext}
      >
        Continue
      </Button>
      </Stack>
    </CardContainer>
  );
}

export default VerifyEmail;
