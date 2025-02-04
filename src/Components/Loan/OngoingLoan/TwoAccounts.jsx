/* eslint-disable react/prop-types */
import { Button, Text } from "@chakra-ui/react";
import CardContainer from "../../../elements/CardContainer";
import AccountDetails from "../../../elements/AccountDetails";

function TwoAccounts({ title, moveToOne, moveNext }) {
  return (
    <CardContainer moveToOne={moveToOne} title={title}>
      <Text textAlign={"center"}>
        We have included your salary account. Kindly add one more
      </Text>

      <AccountDetails />

      <Button
        mt={"16px"}
        w={"100%"}
        maxW={"630px"}
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
        Add a 2nd Bank Account
      </Button>
    </CardContainer>
  );
}

export default TwoAccounts;
