/* eslint-disable react/prop-types */
import { Card, Text, Button, Box, HStack, Stack } from "@chakra-ui/react";
import MoneyBag from "../../assets/icons/money-bag-red.svg";

function LoanOfferCard({ title, amount, description, buttonTitle, moveNext }) {
  return (
    <Box
      p={"6"}
      maxW={"650px"}
      w={"100%"}
      bg={"#EFECE9"}
      borderRadius={"10"}
      display='flex'
      justifyContent='space-between'
      alignItems='center'
    >
      {/* <Text
        py={"3"}
        px={"2"}
        fontWeight={"bold"}
        bg={"#DCD6CF"}
        borderRadius={"5"}
      >
        {title}
      </Text> */}
      <HStack>
        <img src={MoneyBag} style={{ width: "60px", height: "90px" }} />

        <Stack spacing={0}>
          <Text fontSize={"12"} fontWeight={450} color='#667085'>PRE-APPROVED LOAN OFFER</Text>
          <Text fontSize={"24"} fontWeight={"bold"}>₦{amount}</Text>

          <Text fontSize={"14"} fontWeight={450} color='#667085'>{description}</Text>
        </Stack>
      </HStack>
      <Button bg={"#A41856"} color={"white"} onClick={moveNext} px='30px'>
        {buttonTitle}
      </Button>
    </Box>
  );
}

export default LoanOfferCard;
