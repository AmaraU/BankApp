/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  Divider,
  Input,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import styles from "./MyAccountPage.module.css";
import { BiShow, BiHide } from "react-icons/bi";
import { formatNumberDecimals, hideBalance } from "../../utils/utils";
import { handleSuccess } from "../../utils/handleResponse";
import PinComponent from "../../Components/PinComponent";
import transactionService from "../../services/transactionService";
import SuccessComponent from "../../Components/SuccessComponent";
import { getTransactionLimit } from "../../store/transactions.slice";
import { useDispatch } from "react-redux";

export const AccountLimit = ({ backHome, accounts, defaultLimits }) => {
  const [currentIndex] = useState(0);
  const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
  const [infoPopup, setInfoPopup] = useState(false);
  const [step, setStep] = useState(1);
  const [pin, setPin] = useState("");
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();

  const currentItem = accounts ? accounts[currentIndex] : [];

  function infoPop() {
    setInfoPopup(false);
  }

  const handleToggleVisibility = () => {
    setTotalBalanceVisible(!totalBalanceVisible);
  };

  function copyToClipboard() {
    navigator.clipboard.writeText(currentItem?.accountnumber);
    handleSuccess("Account number copied to clipboard");
  }

  const maximumLimit = defaultLimits.filter(
    (limit) => limit.accountTier === currentItem?.accountTier
  )[0];


  const dailyMaxLimit = maximumLimit?.maxDailyTransactionLimit;

  const handleContinue = async () => {

    try {
      setLoading(true);
      const response = await transactionService.setTransactionLimit({
        accountnumber: accounts[0]?.accountnumber,
        transactionPin: pin,
        singleTransaction: amount,
        dailyTransaction: amount,
      });
      console.log(response);
      setStep(3);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  function handleProceed() {
    setStep(1);
    dispatch(getTransactionLimit());
  }

  return (
    <>
      {step == 1 && (
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
              fontSize={{base: "16px", md: "18px"}}
              fontWeight={600}
              color="#101828"
            >
              My Account Limit
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
                        Tier {currentItem && parseInt(currentItem.accountTier)}{" "}
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
                          Maximum amount to spend per transaction -{" "}
                          <span>
                            N {maximumLimit?.maxSingleTransactionLimit.toLocaleString("en")}
                          </span>
                        </div>
                        <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Maximum amount for to receive per transaction -{" "}
                          <span>N {maximumLimit?.maxDailyTransactionLimit.toLocaleString("en")}</span>
                        </div>
                        <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Total amount to spend per day - <span>N{maximumLimit?.maxDailyTransactionLimit.toLocaleString("en")}</span>
                        </div>
                        {/* <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Total amount to receive per day -{" "}
                          <span>N{maximumLimit?.maxDailyTransactionLimit.toLocaleString("en")}</span>
                        </div>
                        <div className={styles.info}>
                          <img src={getImageUrl("icons/orangeTick.png")} />
                          Balance limit - <span>N300,000</span>
                        </div> */}
                      </Box>
                    </Box>
                  </Box>
                )}
              </Box>
            </Stack>

            <Text w={{base: "100%", md: "75%"}} fontSize={{base: "14px", md: "16px"}} color="#101828">
              Set your transaction limit, maximum limit is{" "}
              <b>₦ {dailyMaxLimit?.toLocaleString("en")}</b>
            </Text>

            <Stack w={{base: "100%", md: "75%"}} justifyContent="space-between" spacing="24px">
              <Stack w="100%">
                <Text fontSize={{base: "14px", md: "16px"}} color="#101828">
                  Transaction Limit
                </Text>
                <Input
                  h="48px"
                  autoComplete="off"
                  type="number"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{base: "14px", md: "16px"}}
                  placeholder="₦200,000"
                  _placeholder={{ color: "#667085" }}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </Stack>
            </Stack>

            <Button
              w={{base: "100%", md: "75%"}}
              h="48px"
              mt="24px"
              bg="#A41856"
              color="#FFFFFF"
              fontSize="14px"
              fontWeight={600}
              _hover={{ bg: "#90164D" }}
              onClick={() => setStep(2)}
            >
              Increase Limit
            </Button>
          </Stack>
        </Box>
      )}

      {step == 2 && (
        <PinComponent
          pin={pin}
          setPin={setPin}
          setStep={() => setStep(1)}
          loading={loading}
          handleContinue={handleContinue}
        />
      )}

      {step == 3 && (
        <SuccessComponent
          title={"Success"}
          description={"You have succesfully increased your account limit"}
          btnTitle={"Ok, Thank you"}
          handleProceed={handleProceed}
          isNoHeading={true}
        />
      )}
    </>
  );
};
