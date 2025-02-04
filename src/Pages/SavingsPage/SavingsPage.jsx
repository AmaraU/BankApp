import { useState } from "react";
import SavingsPlan from "../../Components/Savings/SavingsPlan";
import styles from "./Savings.module.css";
import { Text } from "@chakra-ui/react";
import CardContainer from "../../elements/CardContainer";


function SavingsPage() {
  
  const [ step, setStep ] = useState(1);
  
  return (
    <div className={styles.whole}>
      
      <Text fontSize={"24px"} fontWeight={700} color={"#101828"} mb={"16px"}>
        Savings
      </Text>

      <CardContainer title={"Savings Plans"}>
        <SavingsPlan />
      </CardContainer>
    </div>
  );
}

export default SavingsPage;
