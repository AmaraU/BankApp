/* eslint-disable react/prop-types */
import { InfoOutlineIcon } from "@chakra-ui/icons";
import CardContainer from "../../../elements/CardContainer";
import {
  Flex,
  Stack,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import LoanCard from "../../../elements/LoanCard";

function ConfirmScreen({ moveToOne, title, moveToFour }) {
  return (
    <CardContainer moveToOne={moveToOne} title={title}>
      <Text align={"center"} maxWidth={"630px"}>
        Based on your salary history and others details, you are eligible to a
        maximum loan offer provided below subject to other terms and conditions
      </Text>

      <Stack maxW={632} w={"100%"}>
        <LoanCard />

        <FormControl>
          <FormLabel mt={"5"}>How much do you want to borrow?</FormLabel>
          <Input
            bg={"#F7F7F7"}
            border={"1px solid #EAECF0"}
            _placeholder={{ fontSize: "16px", color: "#667085" }}
          />

          <FormLabel mt={"5"}>Loan Tenure</FormLabel>
          <Select bg={"#F7F7F7"} border={"1px solid #EAECF0"}>
            <option>7 Days</option>
            <option>14 Days</option>
            <option>21 Days</option>
            <option>30 Days (1month)</option>
          </Select>
        </FormControl>

        <Flex>
          {" "}
          <InfoOutlineIcon color={"#DB9308"} mr={"2"} />{" "}
          <Text fontSize={"12"}>
            Please note that we shall be conducting a credit check to confirm
            your eligibility for this loan{" "}
          </Text>
        </Flex>

        <Button
          mt={"16px"}
          w={"100%"}
          h={"fit-content"}
          py={"15px"}
          bg={"#A41856"}
          _hover={{ bg: "#90164D" }}
          color={"#FFFFFF"}
          fontSize={"14px"}
          fontWeight={600}
          onClick={moveToFour}
        >
          Confirm
        </Button>
      </Stack>
    </CardContainer>
  );
}

export default ConfirmScreen;
