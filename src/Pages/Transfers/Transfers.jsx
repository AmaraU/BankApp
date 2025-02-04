import { useState, useEffect } from "react";
import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import styles from "./Transfers.module.css";
import { TransferToOthers } from "./TransferToOthers";
import { TransferToSelf } from "./TransferToSelf";
import { Beneficiaries } from "./Beneficiaries";
import { TransferWithinBank } from "./TransferWithinBank";
import { useDispatch, useSelector } from "react-redux";
import { getAccountBalance } from "../../store/auth/user.slice";
import { getTransactionHistory } from "../../store/transactions.slice";

export const Transfers = () => {
  const dispatch = useDispatch();
  const accounts = useSelector((state) => state.user.accountBalance) || [];
  const { fullname, casaAccountBalances } = useSelector((state) => state.user);
  const [selectedBeneficiary, setSelectedBeneficiary] = useState(null)
  const transactions = useSelector((state) => state.transactions.transactions)

  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const setTab = (beneficiary) => {
    setSelectedBeneficiary(beneficiary)
    setActiveTabIndex(1);
  };

  const selectBeneficiary = () => {
    setActiveTabIndex(3);
  };

  useEffect(() => {
    dispatch(getAccountBalance());
    dispatch(getTransactionHistory(10));
  }, [dispatch]);


  return (
    <div className={styles.whole}>
      <Text fontSize={"24px"} fontWeight={700} color={"#101828"} mb={"16px"}>
        Transfers
      </Text>
      <Tabs index={activeTabIndex} onChange={setActiveTabIndex}>
        <TabList display="grid" gridTemplateColumns={{base: "1fr 1fr", md: "auto auto auto auto"}} borderBottom={"none"} gap={{base: '10px', md: "5px"}} mb={"24px"}>
          <Tab
            rounded={"50px"}
            fontSize={{base: "11px", md: "13px"}}
            color={"#667085"}
            fontWeight={500}
            border={"1px solid #EAECF0"}
            py={"12px"}
            px={"14px"}
            _selected={{
              color: "#FFFFFF",
              bg: "#667085",
              border: "1px solid transparent",
              boxShadow: "0px 0px 1px 0px #00000066",
            }}
          >
            Transfer To Self
          </Tab>
          <Tab
            rounded={"50px"}
            fontSize={{base: "11px", md: "13px"}}
            color={"#667085"}
            fontWeight={500}
            border={"1px solid #EAECF0"}
            py={"12px"}
            px={"14px"}
            _selected={{
              color: "#FFFFFF",
              bg: "#667085",
              border: "1px solid transparent",
              boxShadow: "0px 0px 1px 0px #00000066",
            }}
          >
            Transfer Within Bank
          </Tab>
          <Tab
            rounded={"50px"}
            fontSize={{base: "11px", md: "13px"}}
            color={"#667085"}
            fontWeight={500}
            border={"1px solid #EAECF0"}
            py={"12px"}
            px={"14px"}
            _selected={{
              color: "#FFFFFF",
              bg: "#667085",
              border: "1px solid transparent",
              boxShadow: "0px 0px 1px 0px #00000066",
            }}
          >
            Transfer To Others
          </Tab>
          <Tab
            rounded={"50px"}
            fontSize={{base: "11px", md: "13px"}}
            color={"#667085"}
            fontWeight={500}
            border={"1px solid #EAECF0"}
            py={"12px"}
            px={"14px"}
            _selected={{
              color: "#FFFFFF",
              bg: "#667085",
              border: "1px solid transparent",
              boxShadow: "0px 0px 1px 0px #00000066",
            }}
          >
            Beneficiaries
          </Tab>
        </TabList>

        <TabPanels maxWidth={"1000px"}>
          <TabPanel mx={{base: -3, md: -4}}>
            <TransferToSelf
              accounts={accounts}
              fullname={fullname}
              casaAccountBalances={casaAccountBalances}
            />
          </TabPanel>

          <TabPanel mx={{base: -3, md: -4}}>
            <TransferWithinBank
              accounts={accounts}
              fullname={fullname}
              selectedBeneficiary={selectedBeneficiary}
              casaAccountBalances={casaAccountBalances}
              selectBeneficiary={selectBeneficiary}
            />
          </TabPanel>

          <TabPanel mx={{base: -3, md: -4}}>
            <TransferToOthers
              accounts={accounts}
              fullname={fullname}
              casaAccountBalances={casaAccountBalances}
              selectedBeneficiary={selectedBeneficiary}
              selectBeneficiary={selectBeneficiary}
            />
          </TabPanel>

          <TabPanel mx={{base: -3, md: -4}}>
            <Beneficiaries goToTransfer={setTab} transactions={transactions}/>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
