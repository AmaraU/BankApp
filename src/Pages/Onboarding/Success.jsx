import { Button, Stack, Text } from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";

export const Success = () => {
  const navigate = useNavigate();

  return (
    <Stack
      h="100%"
      minH="100vh"
      alignItems="center"
      textAlign="center"
      spacing={5}
      py="38px"
      px={{base: "24px", md: "15%", lg: "25%"}}
      bgImage={getImageUrl("onboardingBackground.png")}
      bgSize="100% 100%"
    >
      {/* <img
        style={{ width: "140px", height: "auto" }}
        src={getImageUrl("logos/arm_logo.png")}
        alt="ARM"
      /> */}
      <img
        style={{ marginTop: "", width: "100%", height: "auto" }}
        src={getImageUrl("welcome.png")}
        alt=""
      />
      <Text mt={{base: "-100px", sm: "-140px"}} fontSize={{base: "30px", md: "48px"}} fontWeight={700} color={"#14142A"}>
        Success!
      </Text>
      <Text fontSize={{base: "14px", md: "18px"}} fontWeight={400} color={"#667085"}>
        Your password has been successfully changed
      </Text>

      <Button
        onClick={() => navigate("/signin")}
        id="continue"
        bg={"#A41857"}
        _hover={{ bg: "#90164D" }}
        fontSize={"18px"}
        fontWeight={600}
        color={"#FFFFFF"}
        py={"12px"}
        w={"100%"}
        h={"fit-content"}
      >
        Login
      </Button>
    </Stack>
  );
};
