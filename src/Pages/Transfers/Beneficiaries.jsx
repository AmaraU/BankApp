/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  Flex,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay,
  useDisclosure,
  Divider,
  Select,
  FormControl,
  FormLabel,
  InputGroup,
  Input,
  InputRightElement,
  Spinner,
  ModalFooter,
} from "@chakra-ui/react";
import styles from "./Transfers.module.css";
import { getImageUrl } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getBeneficiaries } from "../../store/transfer.slice";
import transferService from "../../services/transferService";

export const Beneficiaries = ({ goToTransfer, transactions }) => {
  const [showBens, setShowBens] = useState(true);
  const [showBenInfo, setShowBenInfo] = useState(false);
  const [search, setSearch] = useState("");
  const [actionsOpen, setActionsOpen] = useState({});
  const [checkingAccount, setCheckingAccount] = useState(false);
  const [showName, setShowName] = useState(false);
  const [loading, setLoading] = useState(false);
  const [beneficiary, setBeneficiary] = useState(null);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();

  const { beneficiaries } = useSelector((state) => state.transfers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBeneficiaries());
  }, [dispatch]);

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };

  const filteredBeneficiaries = beneficiaries.filter((b) => {
    const searchLower = search.toLowerCase();
    return (
      b.beneficiaryFullName.toLowerCase().includes(searchLower) ||
      b.beneficiaryAccount.toLowerCase().includes(searchLower) ||
      b.beneficiaryBank.toLowerCase().includes(searchLower)
    );
  });

  const toggleAction = (index) => {
    setActionsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const popupRef = useRef(null);

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setActionsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const moveToBenList = () => {
    setShowBens(true);
    setShowBenInfo(false);
  };

  const moveToBenInfo = (beneficiary) => {
    setBeneficiary(beneficiary);
    setShowBens(false);
    setShowBenInfo(true);
  };

  const checkAccount = () => {
    setCheckingAccount(true);
    setTimeout(() => setCheckingAccount(false), 5000);
    setTimeout(() => setShowName(true), 5000);
  };

  const handleCloseAdd = () => {
    setShowName(false);
    onCloseAdd();
  };

  const deleteBeneficiary = async () => {
    try {
      setLoading(true);
      console.log(beneficiary.id);
      await transferService.deleteBeneficiary({
        beneficiaryId: beneficiary.id,
      });
      dispatch(getBeneficiaries());
      onCloseDelete();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const onDelete = (beneficiary) => {
    setBeneficiary(beneficiary);
    onOpenDelete();
  };

  const history = transactions.filter(
    (transaction) =>
      transaction.beneficiaryAccount == beneficiary?.beneficiaryAccount
  );

  return (
    <>
      {showBens && (
        <Box py={"10px"}>
          <HStack bg="#EAECF0" px={{base: "14px", md: "26px"}} py="24px" borderRadius="12px 12px 0 0">
            <Button h="24px" bg="#EAECF0" p={0} _hover={{ bg: "#EAECF0" }}>
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              width="100%"
              textAlign="center"
              fontSize="18px"
              fontWeight={600}
              color="#101828"
            >
              Beneficiary List
            </Text>
          </HStack>
          <Stack
            spacing="16px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            pt="16px"
            pb="114px"
            px="12px"
          >
            <Flex
              justifyContent="space-between"
              alignItems="center"
              border="1px solid #DCD6CF"
              py="10px"
              px={{base: "12px", md: "20px"}}
              w={{base: "100%", md: "75%"}}
              borderRadius="8px"
              mt="24px"
            >
              <input
                id="search"
                type="text"
                onChange={handleSearch}
                placeholder="Search beneficiaries"
                style={{
                  border: "none",
                  outline: "transparent",
                  width: "100%",
                }}
              ></input>
              <img
                style={{ width: "24px", height: "24px" }}
                src={getImageUrl("icons/search.png")}
              />
            </Flex>

            {filteredBeneficiaries.length === 0 ? (
              <Text textAlign="center" fontSize="16px" color="#6B7280">
                No beneficiaries found
              </Text>
            ) : (
              <>
                {filteredBeneficiaries.map((ben, index) => (
                  <HStack
                    key={index}
                    w={{base: "100%", md: "75%"}}
                    borderBottom="0.5px solid #E6E2DD"
                    py="16px"
                    alignItems="start"
                  >
                    <img
                      style={{ height: "20px", width: "20px" }}
                      src={getImageUrl("icons/nav/profileGrey.png")}
                    />
                    <Stack flex="90%">
                      <Flex justifyContent={"space-between"}>
                        <Text fontSize={{base: "16px", md: "18px"}} fontWeight={500} color="#101828">
                          {ben?.beneficiaryFullName}
                        </Text>
                        <Text fontSize={{base: "16px", md: "18px"}} fontWeight={500} color="#101828">
                          {ben?.beneficiaryBank}
                        </Text>
                      </Flex>
                      <Flex justifyContent="space-between">
                        <Text fontSize={{base: "16px", md: "18px"}} fontWeight={500} color="#101828">
                          {ben?.beneficiaryAccount}
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
                            <button
                              onClick={() => setActionsOpen(false)}
                              style={{ alignSelf: "end" }}
                            >
                              <img
                                style={{ width: "14px", height: "14px" }}
                                src={getImageUrl("icons/blackX.png")}
                              />
                            </button>
                            <HStack
                              cursor="pointer"
                              _hover={{ bg: "#EAECF0" }}
                              p="8px"
                              onClick={() => goToTransfer(ben)}
                            >
                              <img
                                src={getImageUrl("icons/nav/transfersGrey.png")}
                              />
                              <Text
                                fontSize={{base: "12px", md: "14px"}}
                                fontWeight={500}
                                color="#667085"
                              >
                                Transfer
                              </Text>
                            </HStack>
                            <HStack
                              cursor="pointer"
                              _hover={{ bg: "#EAECF0" }}
                              p="8px"
                              onClick={() => moveToBenInfo(ben)}
                            >
                              <img src={getImageUrl("icons/view.png")} />
                              <Text
                                fontSize={{base: "12px", md: "14px"}}
                                fontWeight={500}
                                color="#667085"
                              >
                                View Details
                              </Text>
                            </HStack>
                            <HStack
                              cursor="pointer"
                              _hover={{ bg: "#EAECF0" }}
                              p="8px"
                              onClick={() => onDelete(ben)}
                            >
                              <img src={getImageUrl("icons/redDelete.png")} />
                              <Text
                                fontSize={{base: "12px", md: "14px"}}
                                fontWeight={500}
                                color="#667085"
                              >
                                Delete
                              </Text>
                            </HStack>
                          </Box>
                        </div>
                      </Flex>
                    </Stack>
                  </HStack>
                ))}
              </>
            )}
          </Stack>
        </Box>
      )}

      {showBenInfo && (
        <Box>
          <HStack bg="#EAECF0" px="26px" py="14px" borderRadius="12px 12px 0 0">
            <Button
              onClick={moveToBenList}
              h="24px"
              bg="#EAECF0"
              p={0}
              _hover={{ bg: "#EAECF0" }}
            >
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              width="90%"
              textAlign="center"
              fontSize="18px"
              fontWeight={600}
              color="#101828"
            >
              Beneficiary Information
            </Text>
          </HStack>

          <Stack
            spacing="16px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            py="16px"
            pb="114px"
          >
            <HStack
              w="80%"
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
                <Text fontSize="12px" fontWeight={500} color="#667085">
                  BENEFICIARY NAME
                </Text>
                <Text fontSize="18px" fontWeight={500} color="#101828">
                  {beneficiary.beneficiaryFullName}
                </Text>
              </Stack>
            </HStack>

            <Box
              w="80%"
              py="28px"
              px="18"
              bg="#EFECE9"
              border="1px solid #EAECF0"
              borderRadius="8px"
            >
              <HStack justifyContent="space-between">
                <HStack>
                  <img
                    style={{ width: "20px", height: "20px" }}
                    src={getImageUrl("icons/greyBank.png")}
                  />
                  <Stack gap={0}>
                    <Text fontSize="12px" fontWeight={450} color="#667085">
                      BANK ACCOUNT
                    </Text>
                    <Text fontSize="18px" fontWeight={450} color="#101828">
                      {beneficiary?.beneficiaryBank}
                    </Text>
                    <Text fontSize="18px" fontWeight={450} color="#101828">
                      {beneficiary?.beneficiaryAccount}
                    </Text>
                  </Stack>
                </HStack>
                <Button
                  borderRadius="32px"
                  bg="#A41857"
                  _hover={{ bg: "#90164D" }}
                  fontSize="12px"
                  fontWeight={600}
                  color="#FFFFFF"
                  onClick={() => goToTransfer(beneficiary)}
                >
                  Make a bank transfer
                </Button>
              </HStack>

              <Divider h="0px" mt="12px" mb="12px" border="1px solid #DCD6CF" />

              <HStack justifyContent="space-between">
                <Text
                  onClick={onOpenAdd}
                  cursor="pointer"
                  _hover={{ textDecoration: "underline" }}
                  fontSize="18px"
                  fontWeight={450}
                  color="#A41857"
                >
                  Add another bank account
                </Text>
                <button onClick={onOpenAdd} className={styles.plus}>
                  <img
                    src={getImageUrl("icons/whitePlus.png")}
                    style={{ width: "16px", height: "16px" }}
                  />
                </button>
              </HStack>
            </Box>

            <Box borderRadius="12px" border="1px solid #EBEBEB" w="80%">
              {history.length === 0 ? (
                <Text
                  w="100%"
                  alignSelf="center"
                  textAlign="center"
                  fontSize="20px"
                  color="#394455"
                  fontWeight={450}
                  py="25px"
                >
                  NO ENTRIES FOUND
                </Text>
              ) : (
                <table className={styles.historyTable}>
                  <thead>
                    <th>Beneficiary Account</th>
                    <th>Amount</th>
                    <th>Date</th>
                    <th></th>
                  </thead>

                  <tbody>
                    {history.map((transaction, index) => (
                      <tr key={index}>
                        <td>
                          <HStack>
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
                                {transaction.narration}
                              </Text>
                              <Text
                                fontSize="12px"
                                color="#667085"
                                fontWeight={450}
                              >
                                {transaction.accountnumber}
                              </Text>
                            </Stack>
                          </HStack>
                        </td>
                        <td>₦ {transaction.amount}</td>
                        <td>{transaction.trandate}</td>
                        <td>
                          <div>
                            <button onClick={() => toggleAction(index)}>
                              <img src={getImageUrl("icons/three_dots.png")} />
                            </button>
                            <Box
                              className={`${styles.actionsClosed} ${
                                actionsOpen[index] && styles.theActions
                              }`}
                              ref={popupRef}
                            >
                              <button
                                onClick={() => setActionsOpen(false)}
                                style={{ alignSelf: "end" }}
                              >
                                <img
                                  style={{ width: "14px", height: "14px" }}
                                  src={getImageUrl("icons/blackX.png")}
                                />
                              </button>
                              <HStack
                                cursor="pointer"
                                _hover={{ bg: "#EAECF0" }}
                                p="8px"
                              >
                                <img
                                  src={getImageUrl("icons/greyReceipt.png")}
                                />
                                <Text
                                  fontSize="14px"
                                  fontWeight={500}
                                  color="#667085"
                                >
                                  Download Receipt
                                </Text>
                              </HStack>
                              <HStack
                                cursor="pointer"
                                _hover={{ bg: "#EAECF0" }}
                                p="8px"
                              >
                                <img src={getImageUrl("icons/greySend.png")} />
                                <Text
                                  fontSize="14px"
                                  fontWeight={500}
                                  color="#667085"
                                >
                                  Repeat Transaction
                                </Text>
                              </HStack>
                            </Box>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </Box>
          </Stack>
        </Box>
      )}

      <Modal
        isCentered
        size="lg"
        closeOnOverlayClick={false}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
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
              Delete Beneficiary
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody py={6}>
            <div style={{ overflow: "auto", maxHeight: "60vh" }}>
              <Stack spacing={2} alignItems="center" textAlign="center">
                <img
                  style={{ width: "70px", height: "auto" }}
                  src={getImageUrl("icons/caution.png")}
                />
                <Text fontSize="16px" fontWeight={700} color="#0C111D">
                  Are you sure you want to delete this beneficiary?
                </Text>

                <Button
                  mt="16px"
                  w="100%"
                  h="48px"
                  bg="#A41856"
                  _hover={{ bg: "#90164D" }}
                  color="#FFFFFF"
                  fontSize="14px"
                  fontWeight={600}
                  onClick={deleteBeneficiary}
                  isLoading={loading}
                >
                  Yes
                </Button>
                <Button
                  w="100%"
                  h="48px"
                  bg="#EFECE9"
                  _hover={{ bg: "#E3E1DE" }}
                  color="#667085"
                  fontSize="14px"
                  fontWeight={600}
                  onClick={onCloseDelete}
                >
                  Go to dashboard
                </Button>
              </Stack>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        size="lg"
        closeOnOverlayClick={false}
        isOpen={isOpenAdd}
        onClose={handleCloseAdd}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              textAlign="center"
              fontSize="18px"
              fontWeight={600}
              color="#394455"
            >
              Add Beneficiary Bank Account
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody px={6} py={10}>
            <div style={{ overflow: "auto", maxHeight: "60vh" }}>
              <Stack spacing={4} alignItems="center" textAlign="center">
                <FormControl w="100%" isRequired>
                  <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                    Account Number
                  </FormLabel>
                  <InputGroup>
                    <Input
                      onChange={checkAccount}
                      type="number"
                      h="48px"
                      bg="#F7F7F7"
                      border="1px solid #EAECF0"
                      placeholder="Input acount number"
                      _placeholder={{ fontSize: "16px", color: "#667085" }}
                      autoComplete="off"
                    />
                    {checkingAccount && (
                      <InputRightElement>
                        <Spinner color="#A41857" w="24px" thickness="4px" />
                      </InputRightElement>
                    )}
                  </InputGroup>
                </FormControl>

                <FormControl w="100%" isRequired>
                  <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                    Select Bank
                  </FormLabel>
                  <Select
                    h="48px"
                    bg="#F7F7F7"
                    border="1px solid #EAECF0"
                    fontSize="16px"
                    color="#667085"
                  >
                    <option>United Bank for Africa</option>
                  </Select>
                </FormControl>

                {showName && (
                  <HStack
                    w="100%"
                    p="12px"
                    bg="#EFECE9"
                    border="1px solid #EAECF0"
                    borderRadius="8px"
                  >
                    <img
                      style={{ width: "20px", height: "20px" }}
                      src={getImageUrl("icons/nav/profileGrey.png")}
                    />
                    <Stack gap={0} alignItems="start">
                      <Text fontSize="12px" fontWeight={500} color="#667085">
                        BENEFICIARY NAME
                      </Text>
                      <Text fontSize="18px" fontWeight={500} color="#101828">
                        {beneficiary.beneficiaryFullName}
                      </Text>
                    </Stack>
                  </HStack>
                )}
              </Stack>
            </div>
          </ModalBody>

          <ModalFooter pt={0}>
            <Button
              onClick={handleCloseAdd}
              mt="16px"
              w="100%"
              h="48px"
              bg="#A41856"
              _hover={{ bg: "#90164D" }}
              color="#FFFFFF"
              fontSize="14px"
              fontWeight={600}
            >
              Add Bank Account
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
