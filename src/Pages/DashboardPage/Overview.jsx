import { useEffect, useState } from "react";
import {
  Stack,
  Grid,
  GridItem,
  Text,
  Box,
  Button,
  HStack,
  Flex,
  Divider,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";
import styles from "./Overview.module.css";
import { getImageUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getAccountBalance,
  getDashboardSummary,
  getSetupStatus,
} from "../../store/auth/user.slice";
import { handleSuccess } from "../../utils/handleResponse";
import { getTransactionHistory } from "../../store/transactions.slice";
import NoTransaction from "../../elements/NoTransaction";
import {
  formatBeneficiaryName,
  formatTransactionDate,
} from "../../utils/formatter";
import SetupModal from "../../elements/Modals/SetupModal";
import TransactionSkeleton from "../../elements/Loader/TransactionSkeleton";

export const Overview = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalBalanceVisible, setTotalBalanceVisible] = useState(false);
  const [infoPopup, setInfoPopup] = useState(false);
  const navigate = useNavigate();
  const { fullname } = useSelector((state) => state.user);
  const { transactions, loading } = useSelector((state) => state.transactions);
  const accounts = useSelector((state) => state.user.accountBalance) || [];
  const { emailAddressVerification, secretQuestion, transactionPIN } =
    useSelector((state) => state.user.setupStatus) || {
      emailAddressVerification: false,
      secretQuestion: false,
      transactionPIN: false,
    };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAccountBalance());
    dispatch(getDashboardSummary());
    dispatch(getSetupStatus());
    dispatch(getTransactionHistory(5));
  }, [dispatch]);

  const currentItem = accounts ? accounts[currentIndex] : [];

  function infoPop() {
    setInfoPopup(false);
  }


  const hideBalanceShort = () => {
    return "****************"
  };

  const formatNumber = (number) => {
    return new Intl.NumberFormat("en-US").format(number);
  };
  const formatNumberDecimals = (number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const handleToggleVisibility = () => {
    setTotalBalanceVisible(!totalBalanceVisible);
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % accounts.length);
  };

  const handlePrevious = () => {
    setCurrentIndex(
      (prevIndex) => (prevIndex - 1 + accounts.length) % accounts.length
    );
  };

  function copyToClipboard() {
    navigator.clipboard.writeText(accounts[0]?.accountnumber);
    handleSuccess("Account number copied to clipboard");
  }

  return (
    <div className={styles.whole}>
      <Stack gap="20px" maxW="1500px">
        <Text fontSize={{base: "16px", sm: "20px", md: "24px"}} fontWeight={700} color="#101828" mb="4px">
          Good Morning, {fullname && fullname}
        </Text>

        <Flex
          flexDirection="column"
          alignItems="center"
          justifyItems="center"
          backgroundColor="#000000"
          backgroundImage={getImageUrl("backgroundGrey.png")}
          bgSize="100% 100%"
          borderRadius="12px"
          px="11px"
          py="40px"
        >
          <HStack w="100%" justifyContent="space-between">
            <Button
              onClick={handlePrevious}
              pointerEvents={currentIndex === 0 ? "none" : ""}
              p={0}
              borderRadius="75px"
              bg="#2C323A"
              _hover={{ bg: "#2C323A" }}
              display={{base: "none", md: "inline-flex"}}
            >
              <img
                className={styles.arrow}
                src={getImageUrl("icons/whiteLeftAngle.png")}
              />
            </Button>

            <Stack direction={{base: "column-reverse", md: "row"}} justifyContent="space-between" w="100%" px="8px">
              <Box>
                <Text fontSize={{base: "12px", md: "18px"}} fontWeight={400} color="#FFFFFF">
                  Total Available Balance
                </Text>
                <HStack ml="-5px" spacing={1} alignItems="center" mb="12px">
                  <Box fontSize={{base: "24px", md: "36px"}} fontWeight={500} color="#FFFFFF">
                    ₦
                  </Box>
                  <Text fontSize={{base: "26px", md: "32px"}} fontWeight={700} color="#FFFFFF">
                    {totalBalanceVisible
                      ? formatNumberDecimals(
                          currentItem && currentItem.bookBalance
                        )
                      : hideBalanceShort()}
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
                        fontSize="lg"
                        color="#667085"
                        onClick={handleToggleVisibility}
                      />
                    )}
                    {totalBalanceVisible && (
                      <BiHide
                        fontSize="lg"
                        color="#667085"
                        onClick={handleToggleVisibility}
                      />
                    )}
                  </Box>
                </HStack>

                <Text fontSize={{base: "14px", md: "14px"}} fontWeight={400} color="#FFFFFF">
                  Account Number
                </Text>
                <HStack spacing={0} alignItems="center" mb="12px">
                  <Text fontSize={{base: "16px", md: "20px"}} fontWeight={700} color="#FFFFFF">
                    {currentItem && currentItem.accountnumber}
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
                      className={styles.copy}
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
                  fontSize="12px"
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
                      <h3>{currentItem && currentItem.type}</h3>
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

            <Button
              onClick={handleNext}
              pointerEvents={currentIndex === accounts.length - 1 ? "none" : ""}
              p={0}
              borderRadius="75px"
              bg="#2C323A"
              _hover={{ bg: "#2C323A" }}
              display={{base: "none", md: "inline-flex"}}
            >
              <img
                className={styles.arrow}
                src={getImageUrl("icons/whiteRightAngle.png")}
              />
            </Button>
          </HStack>

          <Box
            w="fit-content"
            bg="#2C323A"
            borderRadius="12px"
            p="8px"
            mb="-12px"
            display="flex"
            gap="4px"
          >
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
          </Box>
        </Flex>

        <Grid gridTemplateColumns={{ lg: "1fr 1fr", md: "auto" }} gap="24px">
          <GridItem colSpan={1} gap="24px">
            <Box>
              <Text fontSize="18px" fontWeight={600} color="#101828" mb="12px">
                Quick Services
              </Text>
              {/* <Box */}
              <Grid
                borderRadius="12px"
                border="1px solid #EAECF0"
                // display="flex"
                // justifyContent="space-between"
                p="20px"
                gridTemplateColumns={{base: "1fr 1fr", md: "1fr 1fr 1fr 1fr 1fr" }}
                gap='12px'
              >
                <Box
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  textAlign="center"
                  fontSize="10px"
                  fontWeight={500}
                  color="#101828"
                >
                  <Button
                    w="48px"
                    h="48px"
                    p={0}
                    bg="#A41857"
                    borderRadius="1000px"
                    mb="8px"
                    _hover={{ bg: "#90164D" }}
                    onClick={() => navigate("/overview/transfers")}
                  >
                    <img src={getImageUrl("icons/whiteSend.png")} />
                  </Button>
                  Send Money
                </Box>
                <Box
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  textAlign="center"
                  fontSize="10px"
                  fontWeight={500}
                  color="#101828"
                >
                  <Button
                    w="48px"
                    h="48px"
                    p={0}
                    bg="#A41857"
                    borderRadius="1000px"
                    mb="8px"
                    _hover={{ bg: "#90164D" }}
                    onClick={() => navigate("/overview/airtime")}
                  >
                    <img src={getImageUrl("icons/whiteBuy.png")} />
                  </Button>
                  Buy Airtime
                </Box>
                <Box
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  textAlign="center"
                  fontSize="10px"
                  fontWeight={500}
                  color="#101828"
                >
                  <Button
                    w="48px"
                    h="48px"
                    p={0}
                    bg="#A41857"
                    borderRadius="1000px"
                    mb="8px"
                    _hover={{ bg: "#90164D" }}
                    onClick={() => navigate("/overview/airtime")}
                  >
                    <img src={getImageUrl("icons/whiteBuy.png")} />
                  </Button>
                  Buy Data
                </Box>
                <Box
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  textAlign="center"
                  fontSize="10px"
                  fontWeight={500}
                  color="#101828"
                >
                  <Button
                    w="48px"
                    h="48px"
                    p={0}
                    bg="#A41857"
                    borderRadius="1000px"
                    mb="8px"
                    _hover={{ bg: "#90164D" }}
                    onClick={() => navigate("/overview/airtime")}
                  >
                    <img src={getImageUrl("icons/whiteBills.png")} />
                  </Button>
                  Pay Bills
                </Box>
                <Box
                  display="flex"
                  flexDir="column"
                  alignItems="center"
                  textAlign="center"
                  fontSize="10px"
                  fontWeight={500}
                  color="#101828"
                >
                  <Button
                    w="48px"
                    h="48px"
                    p={0}
                    bg="#A41857"
                    borderRadius="1000px"
                    mb="8px"
                    _hover={{ bg: "#90164D" }}
                    onClick={() => navigate("/overview/loans")}
                  >
                    <img src={getImageUrl("icons/whiteLoans.png")} />
                  </Button>
                  Staff Loan
                </Box>
              </Grid>
            </Box>

            <Box
              p="30px"
              mt="24px"
              bgImage={getImageUrl("advertImage.png")}
              backgroundSize="100% 100%"
              borderRadius="16px"
            >
              <Box
                bg="#2C323A"
                fontSize="8px"
                fontWeight={600}
                color="#FFFFFF"
                w="fit-content"
                py="4px"
                px="6px"
                borderRadius="19px"
                mb="5px"
              >
                Investments
              </Box>
              <Text
                lineHeight={{base: "25px", md: "33px"}}
                w={{base: "100%", md: "60%"}}
                fontSize={{base: "22px", md: "32px"}}
                fontWeight={700}
                color="#FFFFFF"
                mb="5px"
              >
                Best in Market Investments!
              </Text>
              <Text
                w={{base: "100%", md: "60%"}}
                fontSize="12px"
                fontWeight={400}
                color="#FFFFFF"
                mb="24px"
              >
                We have the best investments for everyone
              </Text>
              <img className={styles.dotss} src={getImageUrl("dotss.png")} />
            </Box>
          </GridItem>

          <GridItem colSpan={1}>
            <Box>
              <HStack mb="12px" justifyContent="space-between">
                <Text fontSize="18px" fontWeight={600} color="#101828">
                  Recent Transfers
                </Text>
                <Text
                  onClick={() => navigate("/overview/dashboard/history")}
                  fontSize="16px"
                  fontWeight={600}
                  color="#A41857"
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                >
                  See all
                </Text>
              </HStack>
              <Stack
                borderRadius="12px"
                border="1px solid #EAECF0"
                display="flex"
                justifyContent="space-between"
                gap="4px"
              >
                <table className={styles.historyTable}>
                  <thead>
                    <th>Transfers</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th></th>
                  </thead>

                  <tbody>
                    {transactions &&
                      transactions.map((transaction, i) => (
                        <tr key={i}>
                          <td>
                            <HStack pl={3}>
                              {parseInt(transaction.amount) > 0 ? (
                                <img
                                  className={styles.credDeb}
                                  src={getImageUrl("icons/credit.png")}
                                />
                              ) : (
                                ""
                              )}
                              {parseInt(transaction.amount) < 0 ? (
                                <img
                                  className={styles.credDeb}
                                  src={getImageUrl("icons/debit.png")}
                                />
                              ) : (
                                ""
                              )}

                              <Stack gap={0}>
                                <Text
                                  fontSize="14px"
                                  color="#394455"
                                  fontWeight={450}
                                >
                                  {parseInt(transaction.amount) > 0 ||
                                  transaction.category
                                    ? formatBeneficiaryName(
                                        transaction.narration
                                      )
                                    : `To ${formatBeneficiaryName(
                                        transaction.beneficiaryName
                                      )}`}{" "}
                                </Text>

                                <Text fontSize={12}>
                                  {parseInt(transaction.amount) > 0
                                    ? "Credit"
                                    : "Debit"}
                                </Text>
                              </Stack>
                            </HStack>
                          </td>

                          <td>
                            <HStack textAlign={"start"}>
                              <Text
                                fontSize="14px"
                                color="#394455"
                                fontWeight={450}
                                textAlign={"start"}
                              >
                                ₦ {formatNumber(Math.abs(transaction.amount))}
                              </Text>
                            </HStack>
                          </td>
                          <td>
                            <Text
                              fontSize="14px"
                              color="#394455"
                              fontWeight={450}
                            >
                              {formatTransactionDate(
                                transaction.trandate.split(" ")[0]
                              )}
                            </Text>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>

                {transactions.length == 0 && loading && (
                  <TransactionSkeleton width={"300px"} length={3} />
                )}

                {transactions && !loading && transactions.length == 0 && (
                  <Stack>
                    <NoTransaction />
                  </Stack>
                )}
              </Stack>
            </Box>
          </GridItem>
        </Grid>

        <SetupModal
          isOpen={
            !(transactionPIN && emailAddressVerification && secretQuestion)
          }
        />
      </Stack>
    </div>
  );
};
