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
  Select,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
  Spinner,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { getImageUrl } from "../../../utils";
import { CompleteTransaction } from "../../Components/CompleteTrans";
import Switch from "react-switch";
import { useDispatch, useSelector } from "react-redux";
import { getBanks } from "../../store/transactions.slice";
import transferService from "../../services/transferService";
import { getBeneficiaries } from "../../store/transfer.slice";
import { encrypt } from "../../utils/encrypt";
import { getAccountBalance } from "../../store/auth/user.slice";

export const TransferToOthers = ({
  accounts,
  selectedBeneficiary,
  selectBeneficiary,
}) => {
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
  const [showOne, setShowOne] = useState(true);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(false);
  const [checkingAccount, setCheckingAccount] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [recipient, setRecipient] = useState(null);
  const [bank, setBank] = useState("");
  const [showName, setShowName] = useState(false);
  const [savebeneficiary, setSaveBeneficiary] = useState(false);
  const [loading, setLoading] = useState(false);
  const noOfAccounts = 2;
  const dispatch = useDispatch();
  // const { banks } = useSelector((state) => state.transactions);
  const [accountToDebit, setAccountToDebit] = useState("");
  const [bankName, setBankName] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");
  const { username, casaAccountBalances } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [enterPin, setEnterPin] = useState(true);

  useEffect(() => {
    dispatch(getBanks());
  }, [dispatch]);

  const hideBalance = () => {
    return "****************";
  };
  const formatNumberDec = (number) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);
  };

  const handleToggleVisibility = () => {
    setTotalBalanceVisible(!totalBalanceVisible);
  };

  const moveToOne = () => {
    setShowOne(true);
    setShowTwo(false);
    setShowThree(false);
    window.scrollTo({ top: 0 });
  };
  const moveToTwo = () => {
    // setBankName(banks.filter((b) => b.bankCode == bank)[0].bankName);
    setShowOne(false);
    setShowTwo(true);
    setShowThree(false);
    window.scrollTo({ top: 0 });
  };
  const moveToThree = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(true);
    onCloseConfirm();
    window.scrollTo({ top: 0 });
  };

  const checkAccount = async (e) => {
    console.log(e.target.value);
    setAccountNumber(e.target.value);
    setSaveBeneficiary(false);
    if (e.target.value.length < 9) {
      return;
    }
    try {
      setCheckingAccount(true);
      const response = await transferService.accountInquiry({
        AccountNumber: e.target.value,
        BankCode: bank,
      });
      setShowName(true);
      setRecipient(response);
      setCheckingAccount(false);
    } catch (error) {
      console.log(error);
      setCheckingAccount(false);
    }
  };

  const saveBeneficiary = async (e) => {
    setSaveBeneficiary(e);
    if (!e) {
      return;
    }
    try {
      await transferService.saveBeneficiary({
        beneficiaryBankcode: String(bank),
        // beneficiaryBankname: banks?.filter((b) => b.bankCode == bank)[0]
          // .bankName,
        beneficiaryFullName: recipient.accountName,
        beneficiaryAccoutNumber: accountNumber,
        alias: recipient.accountName,
      });

      dispatch(getBeneficiaries());
    } catch {
      setLoading(false);
    }
  };

  const completeTransaction = async (e) => {
    const { pin } = e;
   
    const payload = await encrypt({
      amount,
      acct_number: casaAccountBalances[0]?.accountnumber,
      recipient_account: accountNumber
        ? accountNumber
        : selectedBeneficiary?.beneficiaryAccount,
      recipient_name: recipient?.accountName
        ? recipient?.accountName
        : selectedBeneficiary.beneficiaryFullName,
      bank_name: recipient?.bankName,
      pin,
      username,
      type:"1"
    });

    try {
      setLoading(true);
      const response = await transferService.transferFunds({
        encRequest: payload.encRequest,
        detailsRequest: payload.detailsRequest,
      });
      console.log(response);
      setIsSuccess(true);
      setEnterPin(false);
      setLoading(false);
    } catch {
      setEnterPin(false);
      setIsFailed(true);
      setLoading(false);
    }
  };

  const backToSaving = async () => {
    await dispatch(getAccountBalance());
    setIsSuccess(false);
    setEnterPin(true);
    setIsFailed(false);
    setRecipient({});
    setNote("");
    moveToOne();
  };

  return (
    <>
      {showOne && (
        <Box>
          <HStack
            bg={"#EAECF0"}
            justifyContent={"space-between"}
            px={{ base: "14px", md: "26px" }}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button h={"24px"} bg={"#EAECF0"} p={0} _hover={{ bg: "#EAECF0" }}>
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              textAlign="center"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              Transfer to Others
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              1/3
            </Text>
          </HStack>
          <Stack
            gap={"16px"}
            alignItems={"center"}
            border={"1px solid #EFECE9"}
            bg={"#FFFFFF"}
            borderRadius={"0 0 12px 12px"}
            py={"16px"}
            pb={"114px"}
            px="12px"
          >
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color={"#667085"}
              textAlign={"center"}
            >
              Input the transaction details below
            </Text>

            {noOfAccounts > 1 ? (
              <>
                <FormControl w={{ base: "100%", md: "75%" }} isRequired>
                  <FormLabel
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={400}
                    color="#101828"
                  >
                    Account to Debit
                  </FormLabel>
                  <Select
                    h={"48px"}
                    bg={"#F7F7F7"}
                    border={"1px solid #EAECF0"}
                    fontSize={{ base: "14px", md: "16px" }}
                    placeholder="Select account"
                    _placeholder={{ color: "#667085" }}
                    onChange={(e) => setAccountToDebit(e.target.value)}
                  >
                    {accounts &&
                      accounts.map((account, i) => (
                        <option key={i}>
                          {" "}
                          {account.accountnumber} - {account.acctProduct}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <FormControl w={{ base: "100%", md: "75%" }} isRequired>
                  <FormLabel
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={400}
                    color="#101828"
                  >
                    Bank Name
                  </FormLabel>
                  <Select
                    h={"48px"}
                    bg={"#F7F7F7"}
                    border={"1px solid #EAECF0"}
                    placeholder="Select bank"
                    _placeholder={{ fontSize: "16px", color: "#667085" }}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    {/* {banks &&
                      banks.map((bank, i) => (
                        <option key={i} value={bank.bankCode}>
                          {" "}
                          {bank.bankName}{" "}
                        </option>
                      ))} */}
                  </Select>
                </FormControl>

                <FormControl w={{ base: "100%", md: "75%" }} isRequired>
                  <FormLabel
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={400}
                    color="#101828"
                  >
                    Account Number
                  </FormLabel>
                  <InputGroup>
                    <Input
                      onKeyUp={checkAccount}
                      type="number"
                      h="48px"
                      bg="#F7F7F7"
                      border="1px solid #EAECF0"
                      fontSize={{ base: "14px", md: "16px" }}
                      placeholder="Input acount number"
                      _placeholder={{ color: "#667085" }}
                      autoComplete="off"
                    />
                    {checkingAccount && (
                      <InputRightElement>
                        <Spinner color="#A41857" w="24px" thickness="4px" />
                      </InputRightElement>
                    )}
                  </InputGroup>
                </FormControl>

                {!showName && (
                  <HStack
                    w={{ base: "100%", md: "75%" }}
                    onClick={selectBeneficiary}
                  >
                    <img src={getImageUrl("icons/nav/profileGrey.png")} />
                    <Text
                      cursor="pointer"
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={500}
                      color="#A41857"
                    >
                      Select from Beneficiary
                    </Text>
                  </HStack>
                )}

                {showName && (
                  <HStack
                    w={{ base: "100%", md: "75%" }}
                    p="12px"
                    bg="#EFECE9"
                    border="1px solid #EAECF0"
                    borderRadius="8px"
                  >
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={getImageUrl("icons/nav/profileGrey.png")}
                    />
                    <Stack gap={0}>
                      <Text
                        fontSize={{ base: "8px", md: "10px" }}
                        fontWeight={500}
                        color="#667085"
                      >
                        BENEFICIARY NAME
                      </Text>
                      <Text
                        fontSize={{ base: "12px", md: "14px" }}
                        fontWeight={500}
                        color="#101828"
                      >
                        {recipient?.accountName}
                      </Text>
                    </Stack>
                  </HStack>
                )}

                {showName && (
                  <HStack
                    w={{ base: "100%", md: "75%" }}
                    justifyContent="space-between"
                  >
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={500}
                      color="#667085"
                    >
                      Save as Beneficiary
                    </Text>

                    <Switch
                      checked={savebeneficiary}
                      onColor="#A41857"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      height={24}
                      width={40}
                      handleDiameter={16}
                      onChange={saveBeneficiary}
                    />
                  </HStack>
                )}
              </>
            ) : (
              <>
                <Stack
                  w={{ base: "100%", md: "75%" }}
                  backgroundColor="#000000"
                  backgroundImage={getImageUrl("backgroundGrey.png")}
                  bgSize="100% 100%"
                  borderRadius="12px"
                  p="14px"
                  pt="24px"
                  justifyContent="space-between"
                  flexDirection={{ base: "column-reverse", md: "row" }}
                >
                  <Box>
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={400}
                      color="#FFFFFF"
                    >
                      Total Available Balance
                    </Text>
                    <HStack ml="-1px" spacing={0}>
                      <Box
                        fontSize={{ base: "20px", md: "22px" }}
                        color="#FFFFFF"
                      >
                        <TbCurrencyNaira />
                      </Box>
                      <Text
                        fontSize={{ base: "14px", md: "18px" }}
                        fontWeight={600}
                        color="#FFFFFF"
                      >
                        {totalBalanceVisible ? `${1234568}` : hideBalance()}
                      </Text>
                      <Box pl={3} cursor="pointer">
                        {totalBalanceVisible && (
                          <BiShow
                            fontSize="lg"
                            color="#FFFFFF"
                            onClick={handleToggleVisibility}
                          />
                        )}
                        {!totalBalanceVisible && (
                          <BiHide
                            fontSize="lg"
                            color="#FFFFFF"
                            onClick={handleToggleVisibility}
                          />
                        )}
                      </Box>
                    </HStack>
                  </Box>

                  <Box
                    alignSelf="start"
                    borderRadius="36px"
                    px="12px"
                    py="8px"
                    bg="#2C323A"
                    color="#FFFFFF"
                    fontSize={{ base: "8px", md: "10px" }}
                    fontWeight={500}
                  >
                    Tier 1 Savings Account
                  </Box>
                </Stack>

                <FormControl w={{ base: "100%", md: "75%" }} isRequired>
                  <FormLabel
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={400}
                    color="#101828"
                  >
                    Bank Name
                  </FormLabel>
                  <Select
                    h={"48px"}
                    bg={"#F7F7F7"}
                    border={"1px solid #EAECF0"}
                    placeholder="Select bank"
                    _placeholder={{ fontSize: "16px", color: "#667085" }}
                    onChange={(e) => setBank(e.target.value)}
                  >
                    {/* {banks &&
                      banks.map((bank, i) => (
                        <option key={i} value={bank.bankCode}>
                          {" "}
                          {bank.bankName}{" "}
                        </option>
                      ))} */}
                  </Select>
                </FormControl>

                <FormControl w={{ base: "100%", md: "75%" }} isRequired>
                  <FormLabel
                    fontSize={{ base: "14px", md: "16px" }}
                    fontWeight={400}
                    color="#101828"
                  >
                    Account Number
                  </FormLabel>
                  <InputGroup>
                    <Input
                      onInput={checkAccount}
                      type="number"
                      h="48px"
                      bg="#F7F7F7"
                      border="1px solid #EAECF0"
                      fontSize={{ base: "14px", md: "16px" }}
                      placeholder="Input acount number"
                      _placeholder={{ color: "#667085" }}
                      autoComplete="off"
                    />
                    {checkingAccount && (
                      <InputRightElement>
                        <Spinner color="#A41857" w="24px" thickness="4px" />
                      </InputRightElement>
                    )}
                  </InputGroup>
                </FormControl>

                {showName && (
                  <HStack
                    w={{ base: "100%", md: "75%" }}
                    p="12px"
                    bg="#EFECE9"
                    border="1px solid #EAECF0"
                    borderRadius="8px"
                  >
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={getImageUrl("icons/nav/profileGrey.png")}
                    />
                    <Stack gap={0}>
                      <Text
                        fontSize={{ base: "8px", md: "10px" }}
                        fontWeight={500}
                        color="#667085"
                      >
                        BENEFICIARY NAME
                      </Text>
                      <Text
                        fontSize={{ base: "12px", md: "14px" }}
                        fontWeight={500}
                        color="#101828"
                      >
                        {recipient?.accountName}
                      </Text>
                    </Stack>
                  </HStack>
                )}

                {!showName && (
                  <HStack
                    w={{ base: "100%", md: "75%" }}
                    onClick={selectBeneficiary}
                  >
                    <img src={getImageUrl("icons/nav/profileGrey.png")} />
                    <Text
                      cursor="pointer"
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={500}
                      color="#A41857"
                    >
                      Select from Beneficiary
                    </Text>
                  </HStack>
                )}

                {showName && (
                  <HStack
                    w={{ base: "100%", md: "75%" }}
                    justifyContent="space-between"
                  >
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={500}
                      color="#667085"
                    >
                      Save as Beneficiary
                    </Text>
                    <Switch
                      onColor="#A41857"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      height={24}
                      width={40}
                      handleDiameter={16}
                    />
                  </HStack>
                )}
              </>
            )}

            <Button
              mt={"16px"}
              w={{ base: "100%", md: "75%" }}
              h={"48px"}
              bg={"#A41856"}
              _hover={{ bg: "#90164D" }}
              color={"#FFFFFF"}
              fontSize={"14px"}
              fontWeight={600}
              onClick={moveToTwo}
              isDisabled={!recipient || !bank || !accountToDebit}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      )}

      {showTwo && (
        <Box>
          <HStack
            bg={"#EAECF0"}
            justifyContent={"space-between"}
            px={{ base: "14px", md: "26px" }}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button
              h={"24px"}
              bg={"#EAECF0"}
              p={0}
              _hover={{ bg: "#EAECF0" }}
              onClick={moveToOne}
            >
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              textAlign="center"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              Transfer to Others
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              2/3
            </Text>
          </HStack>
          <Stack
            gap={"16px"}
            alignItems={"center"}
            border={"1px solid #EFECE9"}
            bg={"#FFFFFF"}
            borderRadius={"0 0 12px 12px"}
            py={"16px"}
            pb={"114px"}
            px="12px"
          >
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color={"#667085"}
              textAlign={"center"}
            >
              Input the transaction details below
            </Text>
            <HStack
              w={{ base: "100%", md: "75%" }}
              backgroundColor={"#000000"}
              backgroundImage={getImageUrl("backgroundGrey.png")}
              bgSize={"100% 100%"}
              borderRadius={"12px"}
              p={"14px"}
              pt={"24px"}
              justifyContent={"space-between"}
              flexDirection={{ base: "column-reverse", md: "row" }}
            >
              <Box>
                <Text
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight={400}
                  color={"#FFFFFF"}
                >
                  Total Available Balance
                </Text>
                <HStack ml={"-1px"} spacing={0}>
                  <Box fontSize={{ base: "18px", md: "20px" }} color="#FFFFFF">
                    <TbCurrencyNaira />
                  </Box>
                  <Text
                    fontSize={{ base: "14px", md: "18px" }}
                    fontWeight={600}
                    color="#FFFFFF"
                  >
                    {totalBalanceVisible
                      ? `${formatNumberDec(
                          accounts[0] && accounts[0].bookBalance
                        )}`
                      : hideBalance()}
                  </Text>
                  <Box pl={3} cursor="pointer">
                    {totalBalanceVisible && (
                      <BiShow
                        fontSize="lg"
                        color="#FFFFFF"
                        onClick={handleToggleVisibility}
                      />
                    )}
                    {!totalBalanceVisible && (
                      <BiHide
                        fontSize="lg"
                        color="#FFFFFF"
                        onClick={handleToggleVisibility}
                      />
                    )}
                  </Box>
                </HStack>
              </Box>

              <Box
                alignSelf="start"
                borderRadius="36px"
                px="12px"
                py="8px"
                bg="#2C323A"
                color="#FFFFFF"
                fontSize={{ base: "8px", md: "10px" }}
                fontWeight={500}
              >
                Tier 1 Savings Account
              </Box>
            </HStack>

            <Box
              w={{ base: "100%", md: "75%" }}
              p="12px"
              bg="#F7F7F7"
              border="1px solid #EAECF0"
              borderRadius="8px"
            >
              <HStack>
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={getImageUrl("icons/greyBank.png")}
                />
                <Stack gap={0}>
                  <Text
                    fontSize={{ base: "8px", md: "10px" }}
                    fontWeight={500}
                    color="#667085"
                  >
                    BENEFICIARY ACCOUNT NUMBER
                  </Text>
                  <Text
                    fontSize={{ base: "12px", md: "14px" }}
                    fontWeight={500}
                    color="#101828"
                  >
                    {bankName} - {recipient?.accountNumber}
                  </Text>
                </Stack>
              </HStack>

              <Divider h="2px" mt="12px" mb="12px" />

              <HStack>
                <img src={getImageUrl("icons/nav/profileGrey.png")} />
                <Stack gap={0}>
                  <Text
                    fontSize={{ base: "8px", md: "10px" }}
                    fontWeight={500}
                    color="#667085"
                  >
                    BENEFICIARY NAME
                  </Text>
                  <Text
                    fontSize={{ base: "12px", md: "14px" }}
                    fontWeight={500}
                    color="#101828"
                  >
                    {recipient?.accountName}
                  </Text>
                </Stack>
              </HStack>
            </Box>

            <FormControl w={{ base: "100%", md: "75%" }} isRequired>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Amount
              </FormLabel>
              <InputGroup>
                <InputLeftElement h="48px" color="#667085">
                  ₦
                </InputLeftElement>
                <Input
                  type="number"
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  placeholder="Enter amount"
                  _placeholder={{ color: "#667085" }}
                  autoComplete="off"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <Stack
              w={{ base: "100%", md: "75%" }}
              justifyContent="space-between"
              direction={{ base: "column", md: "row" }}
            >
              <HStack>
                <img src={getImageUrl("icons/warning.png")} alt="" />
                <Text
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight={500}
                  color="#667085"
                >
                  Your daily transfer limit is N200,000
                </Text>
              </HStack>
              <Text
                cursor="pointer"
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight={500}
                color="#A41857"
              >
                Increase your transfer limit
              </Text>
            </Stack>

            <FormControl w={{ base: "100%", md: "75%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Note (Optional)
              </FormLabel>
              <Input
                h="48px"
                bg="#F7F7F7"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                autoComplete="off"
                onChange={(e) => {
                  setNote(e.target.value);
                }}
              />
            </FormControl>

            <Button
              mt="16px"
              w={{ base: "100%", md: "75%" }}
              h="48px"
              bg="#A41856"
              _hover={{ bg: "#90164D" }}
              color="#FFFFFF"
              fontSize="14px"
              fontWeight={600}
              onClick={onOpenConfirm}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      )}

      {showThree && (
        <Box>
          <HStack
            bg={"#EAECF0"}
            justifyContent={"space-between"}
            px={{ base: "14px", md: "26px" }}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button
              h={"24px"}
              bg={"#EAECF0"}
              p={0}
              _hover={{ bg: "#EAECF0" }}
              onClick={moveToTwo}
            >
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              textAlign="center"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              Complete Transaction
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              3/3
            </Text>
          </HStack>

          <CompleteTransaction
            type="transaction"
            handleSubmit={completeTransaction}
            loading={loading}
            isSuccess={isSuccess}
            isFailed={isFailed}
            enterPin={enterPin}
            backToSaving={backToSaving}
          />
        </Box>
      )}

      <Modal
        isCentered
        size={{ base: "sm", md: "lg" }}
        closeOnOverlayClick={true}
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              textAlign="center"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color="#101828"
            >
              Confirm Transaction Details
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <div style={{ overflow: "auto", maxHeight: "60vh" }}>
              <Stack w="100%" spacing="16px">
                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyBank.png")} />
                  <Stack spacing={0}>
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={450}
                      color="#667085"
                    >
                      BENEFICIARY ACCOUNT NUMBER
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px" }}
                      fontWeight={500}
                      color="#A41856"
                    >
                      {bankName} - {recipient?.accountNumber}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/nav/profileGrey.png")} />
                  <Stack spacing={0}>
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={450}
                      color="#667085"
                    >
                      BENEFICIARY NAME
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px" }}
                      fontWeight={500}
                      color="#A41856"
                    >
                      {recipient?.accountName}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyCash.png")} />
                  <Stack spacing={0}>
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={450}
                      color="#667085"
                    >
                      AMOUNT
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px" }}
                      fontWeight={500}
                      color="#A41856"
                    >
                      ₦ {amount}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyFees.png")} />
                  <Stack spacing={0}>
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={450}
                      color="#667085"
                    >
                      FEES
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px" }}
                      fontWeight={500}
                      color="#A41856"
                    >
                      ₦10.25
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyNotes.png")} />
                  <Stack spacing={0}>
                    <Text
                      fontSize={{ base: "12px", md: "14px" }}
                      fontWeight={450}
                      color="#667085"
                    >
                      NOTES
                    </Text>
                    <Text
                      fontSize={{ base: "16px", md: "18px" }}
                      fontWeight={500}
                      color="#A41856"
                    >
                      {note}
                    </Text>
                  </Stack>
                </HStack>
              </Stack>
            </div>
          </ModalBody>

          <ModalFooter pt={0}>
            <Button
              mt="16px"
              w="100%"
              h="48px"
              bg="#A41856"
              _hover={{ bg: "#90164D" }}
              color="#FFFFFF"
              fontSize="14px"
              fontWeight={600}
              onClick={moveToThree}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
