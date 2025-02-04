import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import styles from "./AirtimeBills.module.css";
import { BuyAirtime } from "./BuyAirtime";
import { BuyData } from "./BuyData";
import { BillsPayment } from "./BillsPayment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNetworkPlans } from "../../store/bills.slice";

export const AirtimeBills = () => {
  const dispatch = useDispatch();
  const { networks } = useSelector((state) => state.bills);

  useEffect(() => {
    dispatch(getNetworkPlans());
  }, [dispatch]);
  
  return (
    <div className={styles.whole}>
      <Text fontSize={{base: "22px", md: "24px"}} fontWeight={700} color={"#101828"} mb={"16px"}>
        Airtime and Bills
      </Text>
      <Tabs>
        <TabList
          display="grid"
          gridTemplateColumns={{base: "1fr", md: "auto auto auto"}}
          borderBottom="none"
          gap={{base: "10px", md: "5px"}}
          mb="24px"
        >
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
            Buy Airtime
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
            Buy Data
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
            Bills Payment
          </Tab>
        </TabList>

        <TabPanels maxWidth={"1000px"}>
          <TabPanel mx={{base: -2, md: -4}}>
            <BuyAirtime networks={networks}/>
          </TabPanel>

          <TabPanel mx={{base: -2, md: -4}}>
            <BuyData networks={networks} />
          </TabPanel>

          <TabPanel mx={{base: -2, md: -4}}>
            <BillsPayment />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

// box-shadow: 0px 6px 6px -6px #00000029;
