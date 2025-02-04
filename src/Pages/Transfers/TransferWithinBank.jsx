/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
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
  InputRightElement,
  InputLeftElement,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { BiShow, BiHide } from "react-icons/bi";
import { TbCurrencyNaira } from "react-icons/tb";
import { getImageUrl } from "../../../utils";
import { CompleteTransaction } from "../../Components/CompleteTrans";
import Switch from "react-switch";
import transferService from "../../services/transferService";
import { ARM_BANK_CODE } from "../../constants";
import { formatNumberDecimals, hideBalance } from "../../utils/utils";
import { useDispatch, useSelector } from "react-redux";
import { encrypt } from "../../utils/encrypt";
import { getAccountBalance } from "../../store/auth/user.slice";
import { getBeneficiaries } from "../../store/transfer.slice";

export const TransferWithinBank = ({
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
  const [showName, setShowName] = useState(false);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [amount, setAmount] = useState(0);
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(false);
  const { username, casaAccountBalances } = useSelector((state) => state.user);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [enterPin, setEnterPin] = useState(true);
  const [savebeneficiary, setSaveBeneficiary] = useState(false);
  const noOfAccounts = accounts.length;
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(selectedBeneficiary);
    setAccountName(selectedBeneficiary);
    if (selectedBeneficiary) {
      setShowName(true);
    }
  }, [selectedBeneficiary]);

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
    setAccountNumber(e.target.value);
    setSaveBeneficiary(false);
    if (e.target.value.length !== 10) {
      return;
    }
    setCheckingAccount(true);
    try {
      const response = await transferService.armAccountInquiry({
        AccountNumber: e.target.value,
        BankCode: ARM_BANK_CODE,
      });
      setAccountName(response.result.data);
      setCheckingAccount(false);
      setShowName(true);
    } catch (error) {
      setCheckingAccount(false);
      setShowName(false);
      console.log(error);
    }
  };

  const completeTransaction = async (e) => {
    const { pin } = e;
    console.log(accountNumber)

    const payload = await encrypt({
      amount,
      acct_number: casaAccountBalances[0]?.accountnumber,
      recipient_account: accountNumber
        ? accountNumber
        : selectedBeneficiary?.beneficiaryAccount,
      recipient_name: accountName?.acctName ? accountName?.acctName: selectedBeneficiary.beneficiaryFullName,
      bank_name: "ARM",
      pin,
      username,
      type: "1"
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
    setAccountName({});
    setNotes("");
    moveToOne();
  };

  const saveBeneficiary = async (e) => {
    setSaveBeneficiary(e);
    if (!e) {
      return;
    }
    try {
      await transferService.saveBeneficiary({
        beneficiaryBankcode: String(ARM_BANK_CODE),
        beneficiaryBankname: "ARM",
        beneficiaryFullName: accountName?.acctName,
        beneficiaryAccoutNumber: accountName?.accountNumber,
        alias: accountName?.acctName,
      });

      dispatch(getBeneficiaries());
    } catch {
      setLoading(false);
    }
  };

  return (
    <>
      {showOne && (
        <Box>
          <HStack
            bg="#EAECF0"
            justifyContent="space-between"
            px={{base: "14px", md: "26px"}}
            py="14px"
            borderRadius="12px 12px 0 0"
          >
            <Button h="24px" bg="#EAECF0" p={0} _hover={{ bg: "#EAECF0" }}>
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text textAlign="center" fontSize={{base: "16px", md: "18px"}} fontWeight={600} color="#101828">
              Transfer to ARM Account
            </Text>
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color="#101828">
              1/3
            </Text>
          </HStack>
          <Stack
            gap={"16px"}
            alignItems={"center"}
            border={"1px solid #EFECE9"}
            bg={"#FFFFFF"}
            borderRadius={"0 0 12px 12px"}
            pt={"16px"}
            pb={"114px"}
            px="12px"
          >
            <Text fontSize={{base: "14px", md: "16px"}} color={"#667085"} textAlign={"center"}>
              Input the transaction details below
            </Text>

            {noOfAccounts > 1 ? (
              <>
                <FormControl w={{base: "100%", md: "75%"}} isRequired>
                  <FormLabel
                    fontSize={{base: "14px", md: "16px"}}
                    fontWeight={400}
                    color={"#101828"}
                  >
                    Account to Debit
                  </FormLabel>
                  <Select
                    h={"48px"}
                    bg={"#F7F7F7"}
                    border={"1px solid #EAECF0"}
                    fontSize={{base: "14px", md: "16px"}}
                    placeholder="Select account"
                    _placeholder={{ color: "#667085" }}
                  >
                    {accounts &&
                      accounts.map((account, i) => (
                        <option value={account.accountnumber} key={i}>
                          {" "}
                          {account.accountnumber} - {account.acctProduct}
                        </option>
                      ))}
                  </Select>
                </FormControl>

                <FormControl w={{base: "100%", md: "75%"}} isRequired>
                  <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
                    Account Number
                  </FormLabel>
                  <InputGroup>
                    <Input
                      onChange={checkAccount}
                      type="number"
                      h="48px"
                      bg="#F7F7F7"
                      border="1px solid #EAECF0"
                      fontSize={{base: "14px", md: "16px"}}
                      placeholder="Input account number"
                      _placeholder={{ color: "#667085" }}
                      autoComplete="off"
                      onWheel={ event => event.currentTarget.blur() }
                    />

                    {checkingAccount && (
                      <InputRightElement>
                        <Spinner color="#A41857" w="24px" thickness="4px" />
                      </InputRightElement>
                    )}
                  </InputGroup>
                </FormControl>

                {!showName && (
                  <HStack w={{base: "100%", md: "75%"}} onClick={selectBeneficiary}>
                    <img src={getImageUrl("icons/nav/profileGrey.png")} />
                    <Text
                      cursor="pointer"
                      fontSize={{base: "12px", md: "14px"}}
                      fontWeight={500}
                      color="#A41857"
                    >
                      Select from Beneficiary
                    </Text>
                  </HStack>
                )}

                {showName && (
                  <HStack
                    w={{base: "100%", md: "75%"}}
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
                      <Text fontSize={{base: "8px", md: "10px"}} fontWeight={500} color="#667085">
                        BENEFICIARY NAME
                      </Text>
                      <Text fontSize={{base: "12px", md: "14px"}} fontWeight={500} color="#101828">
                        {accountName?.acctName}{" "}
                        {accountName?.beneficiaryFullName}
                      </Text>
                    </Stack>
                  </HStack>
                )}

                {showName && (
                  <HStack w={{base: "100%", md: "75%"}} justifyContent="space-between">
                    <Text fontSize={{base: "12px", md: "14px"}} fontWeight={500} color="#667085">
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
                  w={{base: "100%", md: "75%"}}
                  backgroundColor="#000000"
                  backgroundImage={getImageUrl("backgroundGrey.png")}
                  bgSize="100% 100%"
                  borderRadius="12px"
                  p="14px"
                  pt="24px"
                  justifyContent="space-between"
                  flexDirection={{base: "column-reverse", md: "row"}}
                >
                  <Box>
                    <Text fontSize={{base: "12px", md: "14px"}} fontWeight={400} color="#FFFFFF">
                      Total Available Balance
                    </Text>
                    <HStack ml="-1px" spacing={0}>
                      <Box fontSize={{base: "20px", md: "22px"}} color="#FFFFFF">
                        <TbCurrencyNaira />
                      </Box>
                      <Text fontSize={{base: "14px", md: "18px"}} fontWeight={600} color="#FFFFFF">
                        {totalBalanceVisible
                          ? `${formatNumberDecimals(
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
                    fontSize={{base: "8px", md: "10px"}}
                    fontWeight={500}
                  >
                    Tier 1 Savings Account
                  </Box>
                </Stack>

                <FormControl w={{base: "100%", md: "75%"}} isRequired>
                  <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
                    Account Number
                  </FormLabel>
                  <InputGroup>
                    <Input
                      onChange={checkAccount}
                      type="number"
                      h="48px"
                      bg="#F7F7F7"
                      border="1px solid #EAECF0"
                      fontSize={{base: "14px", md: "16px"}}
                      placeholder="Input acount number"
                      _placeholder={{ color: "#667085" }}
                      autoComplete="off"
                      defaultValue={accountName?.beneficiaryAccount}
                      onWheel={ event => event.currentTarget.blur() }
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
                    w={{base: "100%", md: "75%"}}
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
                      <Text fontSize={{base: "8px", md: "10px"}} fontWeight={500} color="#667085">
                        BENEFICIARY NAME
                      </Text>
                      <Text fontSize={{base: "12px", md: "14px"}} fontWeight={500} color="#101828">
                        {accountName?.acctName}{" "}
                        {accountName?.beneficiaryFullName}
                      </Text>
                    </Stack>
                  </HStack>
                )}

                {!showName && (
                  <HStack w={{base: "100%", md: "75%"}} onClick={selectBeneficiary}>
                    <img src={getImageUrl("icons/nav/profileGrey.png")} />
                    <Text
                      cursor="pointer"
                      fontSize={{base: "12px", md: "14px"}}
                      fontWeight={500}
                      color="#A41857"
                    >
                      Select from Beneficiary
                    </Text>
                  </HStack>
                )}

                {showName && (
                  <HStack w={{base: "100%", md: "75%"}} justifyContent="space-between">
                    <Text fontSize={{base: "12px", md: "14px"}} fontWeight={500} color="#667085">
                      Save as Beneficiary
                    </Text>
                    <Switch
                      onColor="#A41857"
                      checkedIcon={false}
                      uncheckedIcon={false}
                      checked={savebeneficiary}
                      height={24}
                      width={40}
                      handleDiameter={16}
                      onChange={saveBeneficiary}
                    />
                  </HStack>
                )}
              </>
            )}

            <Button
              mt="16px"
              w={{base: "100%", md: "75%"}}
              h="48px"
              bg="#A41856"
              _hover={{ bg: "#90164D" }}
              color="#FFFFFF"
              fontSize="14px"
              fontWeight={600}
              onClick={moveToTwo}
              isDisabled={
                !accountName || (!accountNumber && !selectedBeneficiary)
              }
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
            px={{base: "14px", md: "26px"}}
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
            <Text textAlign="center" fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              Transfer to ARM Account
            </Text>
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              2/3
            </Text>
          </HStack>

          <Stack
            gap={"16px"}
            alignItems={"center"}
            border={"1px solid #EFECE9"}
            bg={"#FFFFFF"}
            borderRadius={"0 0 12px 12px"}
            pt={"16px"}
            pb={"114px"}
            px="12px"
          >
            <Text fontSize={{base: "14px", md: "16px"}} color={"#667085"} textAlign={"center"}>
              Input the transaction details below
            </Text>

            <Stack
              w={{base: "100%", md: "75%"}}
              backgroundColor="#000000"
              backgroundImage={getImageUrl("backgroundGrey.png")}
              bgSize="100% 100%"
              borderRadius="12px"
              p="14px"
              pt="24px"
              justifyContent="space-between"
              flexDirection={{base: "column-reverse", md: "row"}}
            >
              <Box>
                <Text fontSize={{base: "12px", md: "14px"}} fontWeight={400} color="#FFFFFF">
                  Total Available Balance
                </Text>
                <HStack ml="-1px" spacing={0}>
                  <Box fontSize={{base: "20px", md: "22px"}} color="#FFFFFF">
                    <TbCurrencyNaira />
                  </Box>
                  <Text fontSize={{base: "14px", md: "18px"}} fontWeight={600} color="#FFFFFF">
                    {totalBalanceVisible
                      ? `${formatNumberDecimals(
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
                fontSize={{base: "8px", md: "10px"}}
                fontWeight={500}
              >
                Tier {accounts[0] && accounts[0].accountTier} -{" "}
                {accounts[0] && accounts[0].acctProduct}
              </Box>
            </Stack>

            <Box
              w={{base: "100%", md: "75%"}}
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
                  <Text fontSize={{base: "8px", md: "10px"}} fontWeight={500} color="#667085">
                    BENEFICIARY ACCOUNT NUMBER
                  </Text>
                  <Text fontSize={{base: "12px", md: "14px"}} fontWeight={500} color="#101828">
                    ARM Microfinance Bank - {accountNumber}
                  </Text>
                </Stack>
              </HStack>

              <Divider h="2px" mt="12px" mb="12px" />

              <HStack>
                <img src={getImageUrl("icons/nav/profileGrey.png")} />
                <Stack gap={0}>
                  <Text fontSize={{base: "8px", md: "10px"}} fontWeight={500} color="#667085">
                    BENEFICIARY NAME
                  </Text>
                  <Text fontSize={{base: "12px", md: "14px"}} fontWeight={500} color="#101828">
                    {accountName?.acctName}
                    {accountName?.beneficiaryFullName}
                  </Text>
                </Stack>
              </HStack>
            </Box>

            <FormControl w={{base: "100%", md: "75%"}} isRequired>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
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
                  fontSize={{base: "14px", md: "16px"}}
                  placeholder="Enter amount"
                  _placeholder={{ color: "#667085" }}
                  autoComplete="off"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </InputGroup>
            </FormControl>

            <Stack w={{base: "100%", md: "75%"}} justifyContent="space-between" direction={{base: "column", md: "row"}}>
              <HStack>
                <img
                  src={getImageUrl("icons/warning.png")}
                  style={{ width: "20px", height: "20px" }}
                />
                <Text fontSize={{base: "12px", md: "14px"}} fontWeight={500} color="#667085">
                  Your daily transfer limit is ₦200,000
                </Text>
              </HStack>
              <Text
                cursor="pointer"
                fontSize={{base: "12px", md: "14px"}}
                fontWeight={450}
                color="#A41857"
              >
                Increase your transfer limit
              </Text>
            </Stack>

            <FormControl w={{base: "100%", md: "75%"}}>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color={"#101828"}>
                Note (Optional)
              </FormLabel>
              <Input
                h={"48px"}
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                fontSize={{base: "14px", md: "16px"}}
                autoComplete="off"
                onChange={(e) => setNotes(e.target.value)}
              />
            </FormControl>

            <Button
              mt={"16px"}
              w={{base: "100%", md: "75%"}}
              h={"48px"}
              bg={"#A41856"}
              _hover={{ bg: "#90164D" }}
              color={"#FFFFFF"}
              fontSize={"14px"}
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
            px={{base: "14px", md: "26px"}}
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
            <Text textAlign="center" fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              Complete Transaction
            </Text>
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
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
        size={{base: "sm", md: "lg"}}
        closeOnOverlayClick={true}
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              textAlign="center"
              fontSize={{base: "16px", md: "18px"}}
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
                    <Text fontSize={{base: "12px", md: "14px"}} fontWeight={450} color="#667085">
                      BENEFICIARY ACCOUNT NUMBER
                    </Text>
                    <Text fontSize={{base: "16px", md: "18px"}} fontWeight={500} color="#A41856">
                      ARM Microfinance Bank - {accountNumber}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/nav/profileGrey.png")} />
                  <Stack spacing={0}>
                    <Text fontSize={{base: "12px", md: "14px"}} fontWeight={450} color="#667085">
                      BENEFICIARY NAME
                    </Text>
                    <Text fontSize={{base: "16px", md: "18px"}} fontWeight={500} color="#A41856">
                      {accountName?.acctName}
                      {accountName?.beneficiaryFullName}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyCash.png")} />
                  <Stack spacing={0}>
                    <Text fontSize={{base: "12px", md: "14px"}} fontWeight={450} color="#667085">
                      AMOUNT
                    </Text>
                    <Text fontSize={{base: "16px", md: "18px"}} fontWeight={500} color="#A41856">
                      ₦{amount}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyFees.png")} />
                  <Stack spacing={0}>
                    <Text fontSize={{base: "12px", md: "14px"}} fontWeight={450} color="#667085">
                      FEES
                    </Text>
                    <Text fontSize={{base: "16px", md: "18px"}} fontWeight={500} color="#A41856">
                      ₦10.25
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyNotes.png")} />
                  <Stack spacing={0}>
                    <Text fontSize={{base: "12px", md: "14px"}} fontWeight={450} color="#667085">
                      NOTES
                    </Text>
                    <Text fontSize={{base: "16px", md: "18px"}} fontWeight={500} color="#A41856">
                      {notes}
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
