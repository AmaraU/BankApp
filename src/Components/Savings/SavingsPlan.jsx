/* eslint-disable react/prop-types */

import { Box, Text, Card, Grid, GridItem } from "@chakra-ui/react";
import Target from "../../../assets/icons/target-02.svg";
import MultipleUser from "../../../assets/icons/user-multiple-02.svg";
import styles from "../../Pages/SavingsPage/Savings.module.css";
import { ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import FixedSavingsOption from "../../elements/Modals/FixedSavingsOption";
import { useNavigate } from "react-router-dom";


function SavingsPlan({ moveToOptions }) {

  const [fixedmodalopen, setFixedModalOpen] = useState(false);
  const [groupModalOpen, setGroupModalOpen] = useState(false);
  const [ totalBalanceVisible, setTotalBalanceVisible ] = useState(true);
  const navigate = useNavigate();

  const formatNumberDecimals = (number) => {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(number);
  };

  const handleToggleVisibility = () => {
    setTotalBalanceVisible(!totalBalanceVisible);
  }


  const showFixedModal = () => {
    setFixedModalOpen(true);
  };

  const showGroupModal = () => {
    setGroupModalOpen(true);
  };

  const OPTIONS = [
    {
      image: Target,
      title: "Target Savings",
      description:
        "Reach your savings goal either as an individual or as a group. Earn up to 8% per annum",
      action: ()=>navigate('target'),
    },
    {
      image: MultipleUser,
      title: "Fixed Savings",
      description:
        "Lock up savings to avoid temptations as an individual or as a group . Earn up to 8% per annum",
      action: ()=>navigate('fixed'),
    },
    {
      image: MultipleUser,
      title: "Join a Group Savings",
      description:
        "Reach your savings goal either as an individual or as a group. Earn up to 8% per annum",
      action: ()=>navigate('group'),
    },
  ];

  return (
    <Box>
      <Text fontSize={"18px"} fontWeight={600} color={"#101828"}></Text>
      <Card
        className={styles["savings-card"]}
        width={"100%"}
        maxWidth={"640px"}
        height={"92px"}
        my={"20px"}
      >
        <p>Total Savings</p>
        <h2>
          ₦{totalBalanceVisible ? formatNumberDecimals(13000000) : '*************'}
          <button onClick={handleToggleVisibility} style={{marginLeft: '8px'}}><ViewOffIcon /></button>{" "}
        </h2>
      </Card>
      <Text my={"10px"} align={"center"}>
        Select a savings plan
      </Text>

      <Grid
        templateColumns={"repeat(2, auto)"}
        gap={5}
        margin={"auto"}
        maxW={660}
      >
        {OPTIONS.map((card, i) => (
          <GridItem
            onClick={card.action}
            cursor={"pointer"}
            pt={5}
            px={9}
            pb={8}
            key={i}
            w='100%'
            border='1px solid #EAECF0'
            borderRadius='8px'
            colSpan={i === OPTIONS.length-1 ? 2 : 1}
          >
            <img src={card.image} style={{ marginTop: "30px" }} />
            <Text fontWeight={500} fontSize={"14px"}>
              {card.title}{" "}
            </Text>
            <Text fontWeight={400} fontSize={"12px"}>
              {card.description}
            </Text>
          </GridItem>
        ))}

      </Grid>
    </Box>
  );
}

export default SavingsPlan;
