import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import styles from "./ProfilePage.module.css";
import { EditProfile } from "./EditProfile";
import { ChangePassword } from "./ChangePassword";
import { PINManagement } from "./PINManagement";
import { SecurityQuestions } from "../DashboardPage/SecurityQuestions";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getContactDetails,
  getCustomerDetails,
  getSetupStatus,
} from "../../store/auth/user.slice";
import { getNationalities } from "../../store/utils.slice";
import { getDocumentTypes } from "../../store/auth/document.slice";
import { useLocation } from "react-router-dom/dist";
import { getSecurityQuestions } from "../../store/utils.slice";

export const ProfilePage = () => {
  const location = useLocation();
  const [tabIndex, setTabIndex] = useState(0);
  const { fullname, email, username, phoneNumber, casaAccountBalances } =
    useSelector((state) => state.user);
  const userDetails = useSelector((state) => state.user.customerDetails);
  const contactDetails = useSelector((state) => state.user.contactDetails);
  const { nationalities, securityQuestions } = useSelector(
    (state) => state.utils
  );
  const { documentTypes } = useSelector((state) => state.document);
  const {
    personalDetails,
    contactDetails: isContactDetails,
    documentUpload,
  } = useSelector((state) => state.user.setupStatus?.profile) || {
    personalDetails: false,
    contactDetails: false,
    documentUpload: false,
  };
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCustomerDetails());
    dispatch(getContactDetails());
    dispatch(getNationalities());
    dispatch(getSecurityQuestions());
    dispatch(getDocumentTypes());
    dispatch(getSetupStatus());
  }, [dispatch]);
  const [isForget, setIsForget] = useState(location.state);

  const toForgot = () => {
    handleTabsChange(2);
  };

  const handleTabsChange = (index) => {
    setTabIndex(index);
    window.scrollTo({ top: 0 });
  };

  useEffect(() => {
    if (isForget === "forgot") {
      handleTabsChange(2);
    }
    setIsForget("");
  });

  return (
    <div className={styles.whole}>
      <Text
        fontSize={{base: "22px", md: "24px"}}
        fontWeight={700}
        color="#101828"
        mb="16px"
      >
        Profile
      </Text>

      <Tabs index={tabIndex} onChange={handleTabsChange}>
        <TabList
          display="grid"
          gridTemplateColumns={{base: "1fr 1fr", md: "auto auto auto auto"}}
          borderBottom="none"
          gap="5px"
          mb="24px"
        >
          <Tab
            rounded="50px"
            fontSize={{base: "11px", md: "13px"}}
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
            Edit Profile
          </Tab>
          <Tab
            rounded="50px"
            fontSize={{base: "11px", md: "13px"}}
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
            Change Password
          </Tab>
          <Tab
            rounded="50px"
            fontSize={{base: "11px", md: "13px"}}
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
            PIN Management
          </Tab>
          <Tab
            rounded="50px"
            fontSize={{base: "11px", md: "13px"}}
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
            Security Questions
          </Tab>
        </TabList>

        <TabPanels maxWidth="1000px">
          <TabPanel mx={{base: -3, md: -4}}>
            <EditProfile
              fullname={fullname}
              email={email}
              userDetails={userDetails}
              contactDetails={contactDetails}
              nationalities={nationalities}
              documentTypes={documentTypes}
              personalDetails={personalDetails}
              isContactDetails={isContactDetails}
              documentUpload={documentUpload}
              toForgot={toForgot}
            />
          </TabPanel>

          <TabPanel mx={{base: -3, md: -4}}>
            <ChangePassword
              backHome={() => handleTabsChange(0)}
              username={username}
              email={email}
              phoneNumber={phoneNumber}
              toForgot={toForgot}
            />
          </TabPanel>

          <TabPanel mx={{base: -3, md: -4}}>
            <PINManagement
              backHome={() => handleTabsChange(0)}
              isForget={isForget}
              moveToQuestions={() => handleTabsChange(3)}
              securityQuestions={securityQuestions}
              accountnumber={casaAccountBalances && casaAccountBalances[0]?.accountnumber}
              phoneNumber={phoneNumber}
              email={email}
            />
          </TabPanel>

          <TabPanel mx={{base: -3, md: -4}}>
            <SecurityQuestions
              // proceed={moveToSetup}
              isNotShowNumber={true}
              moveToSetup={() => handleTabsChange(0)}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
