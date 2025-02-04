import { useEffect, useState } from "react";
import { LoanHistory } from "../../Components/Loan/OngoingLoan/LoanHistory";
import { OngoingLoan } from "../../Components/Loan/OngoingLoan/OngoingLoan";
import styles from "./Loan.module.css";
import { Tabs, TabList, Tab, TabPanels, TabPanel, Text, HStack, Button } from "@chakra-ui/react";


function LoanPage() {

  const [ tabIndex, setTabIndex ] = useState(0);
  const [ showNewLoanDiv, setShowNewLoanDiv ] = useState(false);

  const handleTabsChange = (index) => {
    setTabIndex(index);
    window.scrollTo({ top: 0});
  }

  const handleNewLoan = () => {
    setShowNewLoanDiv(true);
    setTabIndex(0);
  }

  const handleLoanHandled = () => {
    setShowNewLoanDiv(false);
  }

  console.log(showNewLoanDiv);

  return (
    <div className={styles.whole}>
      <Text fontSize="24px" fontWeight={700} color="#101828" mb="16px">
        Loans
      </Text>
      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <HStack justifyContent='space-between' alignItems='center' mb="24px">
          <TabList borderBottom="none" gap="5px">
            <Tab
              rounded="50px"
              fontSize="13px"
              color="#667085"
              fontWeight={500}
              border="1px solid #EAECF0"
              py="12px"
              px="14px"
              _selected={{
                color: "#FFFFFF",
                bg: "#667085",
                border: "1px solid transparent",
                boxShadow: "0px 0px 1px 0px #00000066",
              }}
            >
              Ongoing Loans
            </Tab>
            <Tab
              rounded="50px"
              fontSize="13px"
              color="#667085"
              fontWeight={500}
              border="1px solid #EAECF0"
              py="12px"
              px="14px"
              _selected={{
                color: "#FFFFFF",
                bg: "#667085",
                border: "1px solid transparent",
                boxShadow: "0px 0px 1px 0px #00000066",
              }}
            >
              Loan History
            </Tab>
          </TabList>

          <Button onClick={handleNewLoan} bg='#A41857' _hover={{bg: '#90164D'}} borderRadius='34px' fontSize='13px' fontWeight={600} color='#FFFFFF'>Apply for Loan</Button>
        </HStack>

        <TabPanels>
          <TabPanel ml={-4}>
            <OngoingLoan showNewLoan={showNewLoanDiv} onLoanHandled={handleLoanHandled} />
          </TabPanel>

          <TabPanel ml={-4}>
            <LoanHistory />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}

export default LoanPage;
