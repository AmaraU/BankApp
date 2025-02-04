/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  Divider,
  Input,
  Flex,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import styles from "./MyAccountPage.module.css";
import { BiShow, BiHide } from "react-icons/bi";
import { UpgradeAccount } from "./UpgradeAccount";
import { formatNumberDecimals, hideBalance } from "../../utils/utils";
import { handleSuccess } from "../../utils/handleResponse";
import { getBvnInfo } from "../../store/auth/user.slice";
import { useDispatch } from "react-redux";
import transactionService from "../../services/transactionService";
import { getFormattedDate } from "../../utils/formatter";

export const AccountStatement = ({ backHome, accounts, bvnStatus, ninStatus, governmentIDcard, signatureStatus, addressStatus }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
  const [showUpgrade, setShowUpgrade] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const [showAccStmnt, setShowAccStmnt] = useState(true);
  const [upgradeAcc, setUpgradeAcc] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const currentItem = accounts ? accounts[currentIndex] : [];

  useEffect(() => {
    dispatch(getBvnInfo());
  }, [dispatch]);

  const moveToAccStmnt = () => {
    setShowAccStmnt(true);
    setUpgradeAcc(false);
    window.scrollTo({ top: 0 });
  };

  const moveToUpgradeAcc = () => {
    setShowAccStmnt(false);
    setUpgradeAcc(true);
    window.scrollTo({ top: 0 });
  };

  function infoPop() {
    setInfoPopup(false);
  }

  const handleToggleVisibility = () => {
    setTotalBalanceVisible(!totalBalanceVisible);
  };

  function copyToClipboard() {
    navigator.clipboard.writeText(currentItem?.accountnumber);
    handleSuccess("Account number copied successfully");
  }

  async function sendStatementRequest() {
    try {
      setLoading(true);
      const response = await transactionService.statementRequest({
        accountNumber: currentItem?.accountnumber,
        startDate: getFormattedDate(startDate),
        endDate: getFormattedDate(endDate),
      });
      console.log(response);
      setLoading(false);
    } catch {
      setLoading(false);
    }
  }

  return (
    <>
      {showAccStmnt && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{base: "14px", md: "26px"}}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button
              onClick={backHome}
              h="24px"
              bg="#EAECF0"
              p={0}
              _hover={{ bg: "#EAECF0" }}
            >
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              width="100%"
              textAlign="center"
              fontSize={{base: "14px", md: "18px"}}
              fontWeight={600}
              color="#101828"
            >
              My Account Statement
            </Text>
          </HStack>
          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="14px"
            pb="114px"
            pt="48px"
          >
            {showUpgrade || (!bvnStatus || !ninStatus || !governmentIDcard || !signatureStatus || !addressStatus) && (
              <HStack
                id="complete"
                w={{base: "100%", md: "75%"}}
                backgroundColor="#EFDAE3"
                borderRadius="12px"
                display="flex"
                justifyContent="space-between"
                backgroundImage={getImageUrl("whiteRoof.png")}
                bgSize={{base: "0 auto", sm: "100px auto", md: "20% auto"}}
                bgRepeat="no-repeat"
                backgroundPosition={{base: "bottom", md: "bottom right 80px"}}
                px="23px"
                py="11px"
              >
                <Box>
                  <Text fontSize={{base: "16px", md: "18px"}} fontWeight={700} color="#A41857">
                    Upgrade Your Account
                  </Text>
                  <Text fontSize={{base: "10px", md: "12px"}} fontWeight={400} color="#A41857">
                    You need to upgrade your account setup to enjoy more
                    services
                  </Text>
                  <Button
                    onClick={moveToUpgradeAcc}
                    fontSize={{base: "10px", md: "12px"}}
                    fontWeight={700}
                    color="#A41857"
                    padding={0}
                    gap="4px"
                    bg="transparent"
                    _hover={{ bg: "transparent" }}
                  >
                    Upgrade Now{" "}
                    <img src={getImageUrl("icons/redRightArrow.png")} />
                  </Button>
                </Box>
                <Button
                  alignSelf="start"
                  bg="transparent"
                  _hover={{ bg: "transparent" }}
                  p={0}
                  onClick={() => setShowUpgrade(false)}
                >
                  <img src={getImageUrl("icons/redClose.png")} alt="X" />
                </Button>
              </HStack>
            )}

            <Stack
              justifyContent="space-between"
              w={{base: "100%", md: "75%"}}
              backgroundColor="#000000"
              backgroundImage={getImageUrl("backgroundGrey.png")}
              bgSize="100% 100%"
              borderRadius="8px"
              p="16px"
              flexDirection={{base: "column-reverse", md: "row"}}
            >
              <Box>
                <Text fontSize={{base: "10px", md: "12px"}} fontWeight={400} color="#FFFFFF">
                  Total Available Balance
                </Text>
                <HStack ml="0" spacing="4px" alignItems="center" mb="12px">
                  <Box fontSize={{base: "14px", md: "18px"}} fontWeight={500} color="#FFFFFF">
                    ₦
                  </Box>
                  <Text fontSize={{base: "14px", md: "18px"}} fontWeight={700} color="#FFFFFF">
                    {totalBalanceVisible
                      ? formatNumberDecimals(currentItem?.bookBalance)
                      : hideBalance()}
                  </Text>
                  <Box
                    borderRadius="500px"
                    bg="#2F2F30"
                    ml="8px"
                    p="4px"
                    cursor="pointer"
                  >
                    {!totalBalanceVisible && (
                      <BiShow
                        fontSize="md"
                        color="#667085"
                        onClick={handleToggleVisibility}
                      />
                    )}
                    {totalBalanceVisible && (
                      <BiHide
                        fontSize="md"
                        color="#667085"
                        onClick={handleToggleVisibility}
                      />
                    )}
                  </Box>
                </HStack>

                <Text fontSize="12px" fontWeight={400} color="#FFFFFF">
                  Account Number
                </Text>
                <HStack spacing={0} alignItems="center" mb="12px">
                  <Text fontSize="18px" fontWeight={700} color="#FFFFFF">
                    {currentItem?.accountnumber}
                  </Text>
                  <Box
                    borderRadius="500px"
                    bg="#2F2F30"
                    ml="8px"
                    p="5px"
                    cursor="pointer"
                    onClick={copyToClipboard}
                  >
                    <img
                      style={{ width: "13px", height: "13px" }}
                      src={getImageUrl("icons/copy.png")}
                    />
                  </Box>
                </HStack>
              </Box>

              <Box alignSelf="start">
                <Box
                  w="fit-content"
                  borderRadius="36px"
                  px="12px"
                  py="8px"
                  bg="#2C323A"
                  color="#FFFFFF"
                  fontSize={{base: "10px", md: "12px"}}
                  fontWeight={500}
                  cursor="pointer"
                  onClick={() => setInfoPopup(true)}
                >
                  Tier {currentItem && parseInt(currentItem.accountTier)} -{" "}
                  {currentItem && currentItem.acctProduct}
                </Box>
                {infoPopup && (
                  <Box className={styles.theBox}>
                    <div className={styles.header}>
                      <h3>
                        {" "}
                        Tier {currentItem &&
                          parseInt(currentItem.accountTier)}{" "}
                        - {currentItem && currentItem.acctProduct}
                      </h3>
                      <img
                        onClick={infoPop}
                        src={getImageUrl("icons/greyClose.png")}
                      />
                    </div>
                    <Divider />
                    <Box py="18px" px="24px">
                      <Box
                        className={styles.limitInfo}
                        bg="#F7F7F7"
                        borderRadius="4px"
                        border="1px solid #EAECF0"
                        p="9px"
                      >
                        <h4>TRANSACTION LIMIT</h4>
                        <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Maximum amount for to spend per transaction -{" "}
                          <span>N100,000</span>
                        </div>
                        <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Maximum amount for to receive per transaction -{" "}
                          <span>N50,000</span>
                        </div>
                        <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Total amount to spend per day - <span>N300,000</span>
                        </div>
                        <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Total amount to receive per day -{" "}
                          <span>N300,000</span>
                        </div>
                        <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Balance limit - <span>N300,000</span>
                        </div>
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Stack>

            <Flex justifyContent={"center"}>
              {accounts.map((_, idx) => (
                <Box
                  key={idx}
                  bg={idx === currentIndex ? "#A41857" : "#FFFFFF"}
                  cursor="pointer"
                  onClick={() => setCurrentIndex(idx)}
                  borderRadius="500px"
                  w="8px"
                  h="8px"
                ></Box>
              ))}
            </Flex>

            <Text
              w={{base: "100%", md: "75%"}}
              fontSize={{base: "15px", md: "18px"}}
              color="#667085"
            >
              Your account statement for the selected period of time will be
              sent to your email address
            </Text>

            <Stack
              w={{base: "100%", md: "75%"}}
              justifyContent="space-between"
              spacing="24px"
              flexDirection={{base: "column", md: "row"}}
            >
              <Stack w="100%">
                <Text fontSize="16px" color="#101828">
                  Start Date
                </Text>
                <Input
                  h="48px"
                  type="date"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  placeholder="Select Date"
                  _placeholder={{ fontSize: "16px", color: "#667085" }}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </Stack>
              <Stack w="100%">
                <Text fontSize="16px" color="#101828">
                  End Date
                </Text>
                <Input
                  h="48px"
                  type="date"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  placeholder="Select Date"
                  _placeholder={{ fontSize: "16px", color: "#667085" }}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </Stack>
            </Stack>

            <HStack
              justifyContent="space-between"
              w={{base: "100%", md: "75%"}}
              flexDirection={{base: "column", md: "row"}}
            >
              <HStack>
                <input
                  type="checkbox"
                  name="pdf"
                  style={{ accentColor: "#A41856" }}
                />
                <label htmlFor="pdf">
                  <Text fontSize="16px" color="#101828">
                    Download in PDF
                  </Text>
                </label>
              </HStack>
              <HStack>
                <input
                  type="checkbox"
                  name="csv"
                  style={{ accentColor: "#A41856" }}
                />
                <label htmlFor="csv">
                  <Text fontSize="16px" color="#101828">
                    Download in CSV
                  </Text>
                </label>
              </HStack>
              <HStack>
                <input
                  type="checkbox"
                  name="excel"
                  style={{ accentColor: "#A41856" }}
                />
                <label htmlFor="excel">
                  <Text fontSize="16px" color="#101828">
                    Download in Excel
                  </Text>
                </label>
              </HStack>
            </HStack>

            <Button
              w={{base: "100%", md: "75%"}}
              h="48px"
              mt="24px"
              bg="#A41856"
              color="#FFFFFF"
              fontSize="14px"
              fontWeight={600}
              _hover={{ bg: "#90164D" }}
              isLoading={loading}
              isDisabled={!startDate || !endDate}
              onClick={sendStatementRequest}
            >
              Request Statement
            </Button>
          </Stack>
        </Box>
      )}

      {upgradeAcc && <UpgradeAccount backHome={moveToAccStmnt} />}
    </>
  );
};
