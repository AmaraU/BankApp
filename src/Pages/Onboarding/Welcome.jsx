import { Button, Stack, Text, HStack } from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { handleSuccess } from "../../utils/handleResponse";

export const Welcome = () => {
  const navigate = useNavigate();
  const { firstname, accountNo } = useSelector((state) => state.auth);

  function copyToClipboard() {
    navigator.clipboard.writeText('123456789');
    handleSuccess("Account Number copied successfully");
  }

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
      <img
        style={{ marginTop: "", width: "100%", height: "auto" }}
        src={getImageUrl("welcome.png")}
        alt=""
      />
      <Text mt={{base: "-80px", sm: "-140px"}} fontSize={{base: "30px", md: "48px"}} fontWeight={700} color={"#14142A"}>
        Welcome {firstname}
      </Text>
      <Text fontSize={{base: "14px", md: "18px"}} fontWeight={400} color={"#667085"}>
        Your profile has been successfully created. You can now proceed
        to login and complete your setup
      </Text>

      <Stack
        w={"100%"}
        bg={"#F7F7F7"}
        border={"1px solid #EAECF0"}
        px={"20px"}
        py={"12px"}
        borderRadius={"6px"}
        spacing={0}
      >
        <Text
          textAlign={"left"}
          fontSize={{base: "14px", md: "16px"}}
          fontWeight={400}
          color={"#101828"}
        >
          Here is your account number
        </Text>
        <HStack justifyContent={"space-between"} alignItems={"center"}>
          <Text fontSize={{base: "18px", md: "24px"}} fontWeight={700} color={"#0C111D"}>
            A/NO: 123456789
          </Text>
          <button onClick={copyToClipboard}>
            <img src={getImageUrl("icons/blackCopy.png")} alt="" />
          </button>
        </HStack>
      </Stack>

      <Button
        onClick={()=>navigate("/signin")}
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
