import { useState, useRef, useEffect } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Select,
  Divider,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Input,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import styles from "./AirtimeBills.module.css";
import { CompleteTransaction } from "../../Components/CompleteTrans";
import { TbCurrencyNaira } from "react-icons/tb";
import { BiShow, BiHide } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import {
  getBillerGroup,
  getBillerGroupPackage,
  getBillerGroupProvider,
} from "../../store/bills.slice";
import { encrypt } from "../../utils/coralBillsEncrypt";
import billsService from "../../services/billsService";

export const BillsPayment = () => {
  const [actionsOpen, setActionsOpen] = useState({});
  const [showOptions, setShowOptions] = useState(true);
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [showThree, setShowThree] = useState(false);
  const [totalBalanceVisible, setTotalBalanceVisible] = useState(true);
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const popupRef = useRef(null);
  const bills = useSelector((state) => state.bills.bills);
  const providers = useSelector((state) => state.bills.providers);
  const packages = useSelector((state) => state.bills.packages);
  const dispatch = useDispatch();
  const [billpackage, setPackage] = useState(null);
  const savedBills = [];
  const { fullname, casaAccountBalances, phoneNumber, email, username } =
    useSelector((state) => state.user);
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [enterPin, setEnterPin] = useState(true);
  const [amount, setAmount] = useState("");
  const [customerId, setCustomerId] = useState("");

  const toggleAction = (index) => {
    setActionsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  useEffect(() => {
    dispatch(getBillerGroup());
  }, [dispatch]);

  const hideBalance = () => {
    return "****************";
  };

  const handleToggleVisibility = () => {
    setTotalBalanceVisible(!totalBalanceVisible);
  };

  const moveToOptions = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowThree(false);
    setShowOptions(true);
    window.scrollTo({ top: 0 });
  };
  const moveToOne = () => {
    setPackage(null);
    setShowOne(true);
    setShowTwo(false);
    setShowThree(false);
    setShowOptions(false);
    window.scrollTo({ top: 0 });
  };
  const moveToTwo = () => {
    setShowOne(false);
    setShowTwo(true);
    setShowThree(false);
    setShowOptions(false);
    window.scrollTo({ top: 0 });
  };
  const moveToThree = () => {
    console.log(billpackage);
    setShowOne(false);
    setShowTwo(false);
    setShowThree(true);
    setShowOptions(false);
    onCloseConfirm();
    window.scrollTo({ top: 0 });
  };

  const selectBillType = async (e) => {
    try {
      console.log("bills", e.target.value);
      await dispatch(getBillerGroupProvider(e.target.value));
    } catch (error) {
      console.log(error);
    }
  };

  const selectProvider = async (e) => {
    try {
      await dispatch(getBillerGroupPackage(e.target.value));
    } catch (error) {
      console.log(error);
    }
  };

  const selectPackage = (e) => {
    setPackage(packages.filter((bill) => bill.slug === e)[0]);
  };

  const backToSaving = () => {
    setEnterPin(true);
    setIsFailed(false);
    setIsSuccess(false);
    moveToOptions();
  };
  const handleSubmit = async ({ pin }) => {
    console.log(pin);
    console.log(billpackage);
    console.log(username);
    const payload = await encrypt({
      p_S: billpackage.slug,
      a_P: billpackage.amount ? billpackage.amount : amount,
      a_N: casaAccountBalances[0]?.accountnumber,
      c_Id: customerId,
      c_N: fullname,
      e_L: email,
      p_N: phoneNumber,
      t_P: pin,
      username,
    });

    console.log(payload);
    try {
      setLoading(true);
      const response = await billsService.makePayment({
        encRequest: payload.encRequest,
        detailsRequest: payload.detailsRequest,
      });
      console.log("response", response);
      setLoading(false);
      if (response) {
        setEnterPin(false);
        setIsSuccess(true);
      } else {
        setIsFailed(true);
        setEnterPin(false);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
      setIsFailed(true);
      setEnterPin(false);
    }
  };

  return (
    <>
      {showOptions && (
        <Box>
          {savedBills.length === 0 ? (
            <Box>
              <HStack
                bg="#EAECF0"
                px={{base: "14px", md: "26px"}}
                py="14px"
                borderRadius="12px 12px 0 0"
              >
                <Button
                  h={"24px"}
                  bg={"#EAECF0"}
                  p={0}
                  _hover={{ bg: "#EAECF0" }}
                >
                  <img
                    src={getImageUrl("icons/blackLeftArrow.png")}
                    alt="back"
                  />
                </Button>
                <Text
                  width="100%"
                  textAlign="center"
                  fontSize={{base: "16px", md: "18px"}}
                  fontWeight={600}
                  color="#101828"
                >
                  Pay Bills
                </Text>
              </HStack>
              <Stack
                spacing="16px"
                alignItems="center"
                border="1px solid #EFECE9"
                bg="#FFFFFF"
                borderRadius="0 0 12px 12px"
                px="14px"
                pb="114px"
                pt="48px"
              >
                <img
                  style={{ width: "40px", height: "40px" }}
                  src={getImageUrl("icons/bills.png")}
                />
                <Text
                  w={{base: "100%", md: "50%"}}
                  textAlign="center"
                  fontSize="16px"
                  color="#667085"
                >
                  You do not have any saved bills purchase
                </Text>
                <Button
                  mt={"16px"}
                  w={{base: "100%", md: "50%"}}
                  h={"48px"}
                  bg={"#A41856"}
                  _hover={{ bg: "#90164D" }}
                  color={"#FFFFFF"}
                  fontSize={"14px"}
                  fontWeight={600}
                  onClick={moveToOne}
                >
                  Pay Bills
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box>
              <HStack
                bg="#EAECF0"
                px={{base: "14px", md: "26px"}}
                py="14px"
                borderRadius="12px 12px 0 0"
              >
                <Button
                  h="24px"
                  bg="#EAECF0"
                  p={0}
                  _hover={{ bg: "#EAECF0" }}
                >
                  <img
                    src={getImageUrl("icons/blackLeftArrow.png")}
                    alt="back"
                  />
                </Button>
                <Text
                  width="100%"
                  textAlign="center"
                  fontSize={{base: "16px", md: "18px"}}
                  fontWeight={600}
                  color="#101828"
                >
                  Pay Bills
                </Text>
              </HStack>
              <Stack
                spacing="16px"
                alignItems="center"
                border="1px solid #EFECE9"
                bg="#FFFFFF"
                borderRadius="0 0 12px 12px"
                px="14px"
                pb="114px"
                pt="48px"
              >
                <Stack
                  w={{base: "100%", md: "90%", lg: "60%"}}
                  display={"grid"}
                  gridTemplateColumns={{base: "1fr", md: "1fr 1fr"}}
                >
                  {savedBills.map((bil, index) => (
                    <Stack
                      key={index}
                      border={"1px solid #EAECF0"}
                      borderRadius={"8px"}
                      w={"100%"}
                      py={"20px"}
                      px={"10px"}
                      spacing={"16px"}
                      direction={{base: "column", lg: "row"}}
                      alignItems="center"
                    >
                      <Box>
                        <img
                          style={{ width: "32px", height: "32px" }}
                          src={getImageUrl("icons/bills.png")}
                        />
                      </Box>
                      <Box w={"90%"}>
                        <Stack
                          w={"100%"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          direction={{base: "column", md: "row", lg: "row"}}
                        >
                          <Text
                            fontSize={"15px"}
                            fontWeight={"450"}
                            color={"#101828"}
                          >
                            {bil?.name}
                          </Text>
                          <Text
                            fontSize={"15px"}
                            fontWeight={"450"}
                            color={"#101828"}
                          >
                            N{bil?.amount}
                          </Text>
                        </Stack>
                        <HStack
                          w={"100%"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text
                            fontSize={"15px"}
                            fontWeight={"450"}
                            color={"#101828"}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                          >
                            {bil?.number}
                          </Text>
                          <div>
                            <button onClick={() => toggleAction(index)}>
                              <img
                                style={{ height: "24px", width: "24px" }}
                                src={getImageUrl("icons/actions.png")}
                              />
                            </button>
                            <Box
                              className={`${styles.actionsClosed} ${
                                actionsOpen[index] && styles.theActions
                              }`}
                              ref={popupRef}
                            >
                              <button style={{ alignSelf: "end" }} onClick={() => toggleAction(index)}>
                                <img
                                  style={{ width: "14px", height: "14px" }}
                                  src={getImageUrl("icons/blackX.png")}
                                />
                              </button>
                              <HStack
                                cursor={"pointer"}
                                _hover={{ bg: "#EAECF0" }}
                                p={"8px"}
                              >
                                <img src={getImageUrl("icons/bills.png")} />
                                <Text
                                  fontSize={"14px"}
                                  fontWeight={500}
                                  color={"#667085"}
                                >
                                  Pay Bill
                                </Text>
                              </HStack>
                              <HStack
                                cursor={"pointer"}
                                _hover={{ bg: "#EAECF0" }}
                                p={"8px"}
                              >
                                <img src={getImageUrl("icons/redDelete.png")} />
                                <Text
                                  fontSize={"14px"}
                                  fontWeight={500}
                                  color={"#667085"}
                                >
                                  Delete
                                </Text>
                              </HStack>
                            </Box>
                          </div>
                        </HStack>
                      </Box>
                    </Stack>
                  ))}
                </Stack>
              </Stack>
            </Box>
          )}
        </Box>
      )}

      {showOne && (
        <Box>
          <HStack
            bg="#EAECF0"
            justifyContent="space-between"
            px={{base: "14px", md: "26px"}}
            py="14px"
            borderRadius="12px 12px 0 0"
          >
            <Button
              h={"24px"}
              bg={"#EAECF0"}
              p={0}
              _hover={{ bg: "#EAECF0" }}
              onClick={moveToOptions}
            >
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              Pay Bills
            </Text>
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              1/3
            </Text>
          </HStack>
          <Stack
            spacing="20px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            pt="16px"
            pb="114px"
            px="12px"
          >
            <FormControl w={{base: "100%", md: "75%"}} isRequired>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color={"#101828"}>
                Bill Type
              </FormLabel>
              <Select
                h={"48px"}
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                fontSize={{base: "14px", md: "16px"}}
                placeholder="Select bill type"
                _placeholder={{ color: "#667085" }}
                onChange={selectBillType}
              >
                {/* {bills.map((option, i) => (
                  <option value={option.id} key={i}>
                    {option.name}
                  </option>
                ))} */}
              </Select>
            </FormControl>

            <FormControl w={{base: "100%", md: "75%"}} isRequired>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color={"#101828"}>
                Bill Provider
              </FormLabel>
              <Select
                bg={"#F7F7F7"}
                h={"48px"}
                border={"1px solid #EAECF0"}
                fontSize={{base: "14px", md: "16px"}}
                placeholder="Select bill provider"
                _placeholder={{ color: "#667085" }}
                onChange={selectProvider}
              >
                {providers.map((option, i) => (
                  <option value={option.slug} key={i}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl w={{base: "100%", md: "75%"}}isRequired>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color={"#101828"}>
                Package
              </FormLabel>
              <Select
                bg={"#F7F7F7"}
                h={"48px"}
                border={"1px solid #EAECF0"}
                fontSize={{base: "14px", md: "16px"}}
                placeholder="Select package"
                _placeholder={{ color: "#667085" }}
                onChange={(e) => selectPackage(e.target.value)}
              >
                {packages.map((option, i) => (
                  <option value={option.slug} key={i}>
                    {option.name}
                  </option>
                ))}
              </Select>
            </FormControl>

            {billpackage?.amount}

            {!billpackage?.amount && (
              <FormControl w={{base: "100%", md: "75%"}}>
                <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color={"#101828"}>
                  Amount
                </FormLabel>
                <Input
                  bg={"#F7F7F7"}
                  h={"48px"}
                  border={"1px solid #EAECF0"}
                  fontSize={{base: "14px", md: "16px"}}
                  onChange={(e) => setAmount(e.target.value)}
                  type={"number"}
                  inputMode={"numeric"}
                ></Input>
              </FormControl>
            )}

            <FormControl w={{base: "100%", md: "75%"}}>
              <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color={"#101828"}>
                Customer Number
              </FormLabel>
              <Input
                bg={"#F7F7F7"}
                h={"48px"}
                border={"1px solid #EAECF0"}
                fontSize={{base: "14px", md: "16px"}}
                type="number"
                onChange={(e) => setCustomerId(e.target.value)}
              ></Input>
            </FormControl>

            <Button
              onClick={moveToTwo}
              mt={"16px"}
              w={{base: "100%", md: "75%"}}
              h={"48px"}
              bg={"#A41856"}
              color={"#FFFFFF"}
              fontSize={"14px"}
              fontWeight={600}
              _hover={{ bg: "#90164D" }}
              isDisabled={billpackage == null}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      )}

      {showTwo && (
        <Box>
          <HStack
            bg="#EAECF0"
            justifyContent="space-between"
            px={{base: "14px", md: "26px"}}
            py="14px"
            borderRadius="12px 12px 0 0"
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
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              Review Payment
            </Text>
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              2/3
            </Text>
          </HStack>
          <Stack
            spacing="16px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px="14px"
            pb="114px"
            pt="48px"
          >
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
                <Text fontSize={{base: "12px", md: "14px"}} fontWeight={400} color={"#FFFFFF"}>
                  Total Available Balance
                </Text>
                <HStack ml={"-1px"} spacing={0}>
                  <Box fontSize={{base: "20px", md: "22px"}} color={"#FFFFFF"}>
                    <TbCurrencyNaira />
                  </Box>
                  <Text fontSize={{base: "14px", md: "18px"}} fontWeight={600} color={"#FFFFFF"}>
                    {totalBalanceVisible
                      ? `${casaAccountBalances[0]?.bookBalance.toLocaleString(
                          "en"
                        )}`
                      : hideBalance()}
                  </Text>
                  <Box pl={3} cursor={"pointer"}>
                    {totalBalanceVisible && (
                      <BiShow
                        fontSize={"lg"}
                        color={"#FFFFFF"}
                        onClick={handleToggleVisibility}
                      />
                    )}
                    {!totalBalanceVisible && (
                      <BiHide
                        fontSize={"lg"}
                        color={"#FFFFFF"}
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

            <Box
              w={{base: "100%", md: "75%"}}
              p={"12px"}
              bg={"#F7F7F7"}
              border={"1px solid #EAECF0"}
              borderRadius={"8px"}
            >
              <HStack>
                <img
                  style={{ width: "20px", height: "20px" }}
                  src={getImageUrl("icons/bills.png")}
                />
                <Stack gap={0} w="100%">
                  <Text fontSize="10px" fontWeight={500} color="#667085">
                    Bill Package
                  </Text>
                  <HStack display="flex" justifyContent="space-between">
                    <Text fontSize="14px" fontWeight={450} color="#101828">
                      {billpackage?.name}
                    </Text>
                    <Text fontSize="14px" fontWeight={600} color="#101828">
                      ₦{" "}
                      {billpackage?.amount
                        ? parseFloat(billpackage?.amount).toLocaleString("en")
                        : parseFloat(amount).toLocaleString("en")}
                    </Text>
                  </HStack>
                </Stack>
              </HStack>

              <Divider h={"2px"} mt={"12px"} mb={"12px"} />

              <HStack>
                <img src={getImageUrl("icons/nav/profileGrey.png")} />
                <Stack gap={0}>
                  <Text fontSize={"10px"} fontWeight={500} color={"#667085"}>
                    CUSTOMER NAME
                  </Text>
                  <Text fontSize={"14px"} fontWeight={450} color={"#101828"}>
                    {fullname}
                  </Text>
                </Stack>
              </HStack>
            </Box>

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
            bg="#EAECF0"
            justifyContent="space-between"
            px={{base: "14px", md: "26px"}}
            py="14px"
            borderRadius="12px 12px 0 0"
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
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              Complete Purchase
            </Text>
            <Text fontSize={{base: "16px", md: "18px"}} fontWeight={600} color={"#101828"}>
              3/3
            </Text>
          </HStack>

          <CompleteTransaction
            type="bills"
            phoneNumber={phoneNumber}
            amount={billpackage?.amount ? billpackage?.amount : amount}
            handleSubmit={handleSubmit}
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
        size="lg"
        closeOnOverlayClick={true}
        isOpen={isOpenConfirm}
        onClose={onCloseConfirm}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              textAlign="center"
              fontSize="18px"
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
                    <Text fontSize="14px" fontWeight={450} color="#667085">
                      BILL PACKAGE
                    </Text>
                    <Text fontSize="18px" fontWeight={500} color="#A41856">
                      {billpackage?.name}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/nav/profileGrey.png")} />
                  <Stack spacing={0}>
                    <Text fontSize="14px" fontWeight={450} color="#667085">
                      CUSTOMER NAME
                    </Text>
                    <Text fontSize="18px" fontWeight={500} color="#A41856">
                      {fullname}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyCash.png")} />
                  <Stack spacing={0}>
                    <Text fontSize="14px" fontWeight={450} color="#667085">
                      AMOUNT
                    </Text>
                    <Text fontSize="18px" fontWeight={500} color="#A41856">
                      ₦{" "}
                      {billpackage?.amount
                        ? parseFloat(billpackage?.amount).toLocaleString("en")
                        : parseFloat(amount).toLocaleString("en")}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/greyFees.png")} />
                  <Stack spacing={0}>
                    <Text fontSize="14px" fontWeight={450} color="#667085">
                      FEES
                    </Text>
                    <Text fontSize="18px" fontWeight={500} color="#A41856">
                      ₦10.25
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
