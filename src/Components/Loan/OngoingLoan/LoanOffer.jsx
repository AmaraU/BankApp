/* eslint-disable react/prop-types */
import { Button, Flex, Stack, Switch, Text } from "@chakra-ui/react";
import CardContainer from "../../../elements/CardContainer";
import "../Loan.module.css";
import "./ongoing.css"

function LoanOffer({ title, moveToOne, moveNext }) {
  return (
    <CardContainer moveToOne={moveToOne} title={title}>
      <Stack maxW={"630px"}>
        <Text textAlign={"center"}>
          Please see the terms and conditions attached to your loan. Kindly
          click on checkbox to consent to terms and continue.
        </Text>

        <div className="loan-offer">
          <p>
            We refer to your request letter and are pleased to inform you that
            the Management has considered and approved your request
            under the following terms and conditions.
          </p>

          <Text fontWeight={"bold"}>PRICING</Text>
          <ol>
            <li>
              Interest Rate: Interest will be charged on daily reducing balance
              and monthly compounding basis at 27.5% per annum plus 3% leading to an initial
              gross rate of 30.5% per annum. This rate is subject to upward or
              downward review in line with changes in money market conditions as
              may arise from time to time.
            </li>
            <li>
              Management Fee: 1% flat (₦50,000.00 payable upfront upon
              acceptance of the offer and non-refundable) on the facility
              amount.
            </li>

            <li>
              Advisory Fee: 1% flat (₦50,000.00 payable upfront upon acceptance
              of the offer and non-refundable) on the facility amount.
            </li>

            <li>Insurance Premium: 1% flat</li>
          </ol>

          <Text>
            <span style={{ fontWeight: "bold" }}>SOURCE OF REPAYMENT:</span>
            Repayment shall be from obligor’s operational cash flow.
          </Text>

          <Text>
            <span style={{ fontWeight: "bold" }}>MODE OF REPAYMENT:</span>
            Repayment of the facility shall be by equal and consecutive monthly
            installments comprising principal and interest in accordance with
            advised loan amortization schedule.
          </Text>

          <Text>
            <span style={{ fontWeight: "bold" }}>MODE OF REPAYMENT:</span>
            Repayment of the facility shall be by equal and consecutive monthly
            installments comprising principal and interest in accordance with
            advised loan amortization schedule.
          </Text>
        </div>

        <div>
          <Text mt={"2"} fontWeight={"bold"}>SECURITY</Text>
          <ol>
            <li>
              Irrevocable domiciliation of obligor’s operational cash flow to
              Wema Bank.
            </li>
            <li>
              Submission of multiple undated other bank cheque issued by the
              guarantor drawn on its active account for the facility amount and
              interest to equal the loan tenor
            </li>
            <li>
              Receipt of stock hypothecation certificate on goods/stock
              belonging to the obligor covering not
            </li>
          </ol>
        </div>

        <Flex gap={3} my={5}>
          <Switch
            size={"lg"}
            color={"#A41856"}
            colorScheme={"#A41856"}
            sx={{
              ".chakra-switch__track[data-checked]:not([data-theme])": {
                backgroundColor: "#A41856",
              },
            }}
          />
          <Text>I agree that with the Terms and Conditions</Text>
        </Flex>

        <Button
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
          Proceed
        </Button>

        <Button
          mt={"5px"}
          w={"100%"}
          h={"fit-content"}
          py={"15px"}
          px={"20px"}
          bg={"#EFECE9"}
          _hover={{ bg: "#E3E1DE" }}
          fontSize={"14px"}
          fontWeight={600}
        >
          Reject
        </Button>
      </Stack>
    </CardContainer>
  );
}

export default LoanOffer;
