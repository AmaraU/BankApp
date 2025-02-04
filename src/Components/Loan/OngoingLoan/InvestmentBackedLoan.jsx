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
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import LoanCard from "../../../elements/LoanCard";
import { useState } from "react";

function InvestmentBackedLoan({ moveToOne, title, moveToFour }) {

  const [ amount, setAmount ] = useState('');
  const [ inputAmount, setInputAmount ] = useState('');

  const handleAmount = (value) => {
    setInputAmount(value);
    if (value === '' || (Number(value) >= 0 && Number(value) <= 200000)) {
      setAmount(value);
    }
  }
  return (
    <CardContainer moveToOne={moveToOne} title={title}>
      <Text align={"center"} maxWidth={"630px"}>
      You should be eligible for this loan based on your portfolio
      </Text>

      <Stack maxW={632} w={"100%"}>
        <LoanCard />

        <FormControl>
          <FormLabel mt={"5"}>How much do you want to borrow?</FormLabel>
          <InputGroup >
            <Input
              type="number"
              value={amount}
              onChange={(e)=>handleAmount(e.target.value)}
              bg={"#F7F7F7"}
              border={"1px solid #EAECF0"}
              _placeholder={{ fontSize: "16px", color: "#667085" }}
            />
            {inputAmount >= 200000 && <InputRightElement><Text fontSize='16px' fontWeight={600} color='#A41857'>MAX</Text></InputRightElement>}
          </InputGroup>

          <FormLabel mt={"5"}>Loan Tenure</FormLabel>
          <Select bg={"#F7F7F7"} border={"1px solid #EAECF0"} placeholder="Select loan tenure">
            <option>7 Days</option>
            <option>14 Days</option>
            <option>21 Days</option>
            <option>30 Days (1 month)</option>
          </Select>
        </FormControl>

        <Flex>
          {" "}
          <InfoOutlineIcon color={"#DB9308"} mr={"2"} />{" "}
          <Text fontSize={"12"}>
            In the event of a payment default,
            it is important to note that your investment portfolio may be liquidated to cover the outstanding loan balance.{" "}
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
          Continue
        </Button>
      </Stack>
    </CardContainer>
  );
}

export default InvestmentBackedLoan;
