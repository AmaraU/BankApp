// eslint-disable react/prop-types

import { Box, Button, Text, HStack, Stack } from "@chakra-ui/react";
import BackIcon from "../../../../assets/icons/blackLeftArrow.png";
import MoneybackIcon from "../../../../assets/icons/money-bag-02.svg";

function EmptyLoan({ moveToOne }) {
  return (
    <Box>
      <Box>
        <HStack
          bg={"#EAECF0"}
          px={"26px"}
          py={"14px"}
          borderRadius={"12px 12px 0 0"}
        >
          <Button h={"24px"} bg={"#EAECF0"} p={0} _hover={{ bg: "#EAECF0" }}>
            <img src={BackIcon} alt="back" />
          </Button>
          <Text
            width={"90%"}
            textAlign={"center"}
            fontSize={"18px"}
            fontWeight={600}
            color={"#101828"}
          >
            Ongoing Loans
          </Text>
        </HStack>
        <Stack
          spacing={"16px"}
          alignItems={"center"}
          border={"1px solid #EFECE9"}
          bg={"#FFFFFF"}
          borderRadius={"0 0 12px 12px"}
          py={"16px"}
          pb={"114px"}
          pt={"48px"}
        >
          <img
            style={{ width: "90px", height: "90px" }}
            alt=""
            src={MoneybackIcon}
          />
          <Text
            w={"50%"}
            textAlign={"center"}
            fontSize={"16px"}
            color={"#667085"}
          >
            You do not have any ongoing loans
          </Text>
          <Button
            mt={"16px"}
            w={"50%"}
            h={"fit-content"}
            py={"15px"}
            bg={"#A41856"}
            _hover={{ bg: "#90164D" }}
            color={"#FFFFFF"}
            fontSize={"14px"}
            fontWeight={600}
            onClick={moveToOne}
          >
            Apply for Loan
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}

export default EmptyLoan;
