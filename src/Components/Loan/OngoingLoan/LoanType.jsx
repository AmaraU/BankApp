/* eslint-disable react/prop-types */

import { Box, HStack, Button, Text, Stack, Card, Grid } from "@chakra-ui/react";
import BackIcon from "../../../../assets/icons/blackLeftArrow.png";
import Target from "../../../../assets/icons/target-02.svg";
import MultipleUser from "../../../../assets/icons/user-multiple-02.svg";
// import Investment from "../../../../assets/icons/investment-portfolio.svg";
import Investment from "../../../../assets/icons/save-money-dollar.svg";

function LoanType({
  moveToOptions,
  showPayLoan,
  showStaffLoan,
  showInvestmentLoan,
}) {
  const OPTIONS = [
    {
      image: Target,
      title: "Pay Day Loans",
      description: "Available for workers whose salaries are paid via Remita. Apply NOW",
      action: showPayLoan,
    },
    {
      image: MultipleUser,
      title: "Staff Loans",
      description: "Available for staff of select companies. Check if you company is listed and Apply NOW.",
      action: showStaffLoan,
    },

    {
      image: Investment,
      title: "Investment Backed Loans",
      description: "Available for customers with eligible investments. Meet your financial needs without liquidating your portfolio.",
      action: showInvestmentLoan,
    },
  ];

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
          onClick={moveToOptions}
        >
          <img src={BackIcon} alt="back" />
        </Button>
        <Text fontSize={"18px"} fontWeight={600} color={"#101828"}>
          Loan Type
        </Text>
        <Text fontSize={"18px"} fontWeight={600} color={"#101828"}></Text>
      </HStack>
      <Stack
        spacing={"20px"}
        alignItems={"center"}
        border={"1px solid #EFECE9"}
        bg={"#FFFFFF"}
        borderRadius={"0 0 12px 12px"}
        py={"16px"}
        pb={"114px"}
      >
        <Text align={"center"}>Select preferred loan type</Text>

        <Grid
          templateColumns={"repeat(3,auto)"}
          gap={5}
          margin={"auto"}
          // maxW={660}
        >
          {OPTIONS.map((card, i) => (
            <Card
              onClick={card.action}
              cursor={"pointer"}
              p={6}
              maxW={250}
              key={i}
            >
              <img src={card.image} style={{ marginTop: "30px" }} />
              <Text fontWeight={500} fontSize={"14px"}>
                {card.title}{" "}
              </Text>
              <Text fontWeight={400} fontSize={"12px"}>
                {card.description}
              </Text>
            </Card>
          ))}
        </Grid>
      </Stack>
    </Box>
  );
}

export default LoanType;
