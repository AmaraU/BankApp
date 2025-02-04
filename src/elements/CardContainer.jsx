/* eslint-disable react/prop-types */
import { Box, Button, HStack, Stack, Text } from "@chakra-ui/react";
import BackIcon from "../../assets/icons/blackLeftArrow.png";

function CardContainer({ moveToOne, title, children }) {
  return (
    <Box>
      <HStack
        bg={"#EAECF0"}
        justifyContent={"space-between"}
        px={"26px"}
        py={"14px"}
        borderRadius={"12px 12px 0 0"}
      >
        <Button
          h={"24px"}
          bg={"#EAECF0"}
          p={0}
          _hover={{ bg: "#EAECF0" }}
          onClick={moveToOne}
        >
          <img src={BackIcon} alt="back" />
        </Button>
        <Text fontSize={"18px"} fontWeight={600} color={"#101828"}>
          {title}
        </Text>
        <Text fontSize={"18px"} fontWeight={600} color={"#101828"}></Text>
      </HStack>

      <Stack
        gap={"16px"}
        alignItems={"center"}
        border={"1px solid #EFECE9"}
        bg={"#FFFFFF"}
        borderRadius={"0 0 12px 12px"}
        py={"16px"}
        pb={"114px"}
      >
        {children}
      </Stack>
    </Box>
  );
}

export default CardContainer;
