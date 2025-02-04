import { Card, Text, Flex } from "@chakra-ui/react";

function LoanCard() {
  return (
    <Card px={8} py={6} bg={"#EFECE9"}>
      <Flex justify={"space-between"}>
        <div>
          <Text>LOAN AMOUNT </Text>
          <Text fontWeight={700}>₦ 1,500,000</Text>
        </div>

        <div>
          <Text align={"end"}>TENURE</Text>
          <Text fontWeight={700}>1 MONTH</Text>
        </div>
      </Flex>

      <Flex justify={"space-between"} my={"5"}>
        <div>
          <Text>INTEREST RATE</Text>
          <Text fontWeight={700}>4% P.A</Text>
        </div>

        <div>
          <Text>MONTHLY REPAYMENT AMOUNT</Text>
          <Text align={"end"} fontWeight={700}>₦ 30,000</Text>
        </div>
      </Flex>
    </Card>
  );
}

export default LoanCard;
