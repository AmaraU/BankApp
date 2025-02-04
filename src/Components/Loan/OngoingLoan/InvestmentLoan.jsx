/* eslint-disable react/prop-types */
import { Card, Grid, Text } from "@chakra-ui/react";
import CardContainer from "../../../elements/CardContainer";
import LoanOfferCard from "../../../elements/LoanOfferCard";
import Target from "../../../../assets/icons/target-02.svg";
import MultipleUser from "../../../../assets/icons/user-multiple-02.svg";
import Investment from "../../../../assets/icons/investment-portfolio.svg";

function InvestmentLoan({ title, moveToOne, moveNext, showPayLoan, showStaffLoan, showInvestmentLoan,}) {

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
      title: "Investment Portfolio Backed Loans",
      description: "Available for customers with eligible investments. Meet your financial needs without liquidating your portfolio.",
      action: showInvestmentLoan,
    },
  ];


  return (
    <CardContainer title={title} moveToOne={moveToOne}>
      <LoanOfferCard
        title={"Pre-approved loan offer"}
        amount={"1,500,000"}
        buttonTitle={"Take Loan"}
        description={"You are currently qualified for this loan amount"}
        moveNext={moveNext}
      />

    <Text align={"center"} mt='30px'>Select preferred loan type</Text>

    <Grid
      templateColumns={"repeat(3,auto)"}
      gap={5}
      margin={"auto"}
      maxW={660}
    >
      {OPTIONS.map((card, i) => (
        <Card
          onClick={card.action}
          cursor={"pointer"}
          px={9}
          pb={6}
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
    </CardContainer>
  );
}

export default InvestmentLoan;
