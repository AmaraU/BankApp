/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
  Modal,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalContent,
  ModalOverlay,
  ModalFooter,
} from "@chakra-ui/react";
import Switch from "react-switch";
import { getImageUrl } from "../../../utils";
import styles from "./AirtimeBills.module.css";
import { CompleteTransaction } from "../../Components/CompleteTrans";
import { useSelector } from "react-redux";
import { encrypt } from "../../utils/billsEncrypt";
import billsService from "../../services/billsService";
export const BuyAirtime = ({ networks }) => {
  const [actionsOpen, setActionsOpen] = useState({});
  const [showOptions, setShowOptions] = useState(true);
  const [showOne, setShowOne] = useState(false);
  const [showTwo, setShowTwo] = useState(false);
  const [selected, setSelected] = useState("");
  const [addFavorite, setAddFavorite] = useState(false);
  const { fullname, phoneNumber, username, casaAccountBalances } = useSelector(
    (state) => state.user
  );
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState(phoneNumber);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm,
  } = useDisclosure();
  const [loading, setLoading] = useState(false);
  const popupRef = useRef(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [enterPin, setEnterPin] = useState(true);

  const toggleAction = (index) => {
    setActionsOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const savedAirtime = [
    // {
    //     name: "My Baby",
    //     number: "08101790957",
    //     amount: "6GB Weekly",
    //     network: "MTN"
    // },
    // {
    //     name: "My Baby",
    //     number: "08101790957",
    //     amount: "6GB Weekly",
    //     network: "Glo"
    // },
    // {
    //     name: "My Baby",
    //     number: "08101790957",
    //     amount: "6GB Weekly",
    //     network: "9Mobile"
    // },
    // {
    //     name: "My Baby",
    //     number: "08101790957",
    //     amount: "6GB Weekly",
    //     network: "Airtel"
    // }
  ];
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

  const moveToOptions = () => {
    setShowOne(false);
    setShowTwo(false);
    setShowOptions(true);
    window.scrollTo({ top: 0 });
  };
  const moveToOne = () => {
    setShowOne(true);
    setShowTwo(false);
    setShowOptions(false);
    setSelected("");
    window.scrollTo({ top: 0 });
  };
  const moveToTwo = () => {
    setShowOne(false);
    setShowTwo(true);
    setShowOptions(false);
    onCloseConfirm();
    window.scrollTo({ top: 0 });
  };

  const handleSubmit = async ({ pin }) => {
    console.log(networks);
    const { usesPreset, vendCode } = networks.filter(
      (network) => network.name === selected && !network.usesPreset
    )[0];
    const payload = await encrypt({
      amount,
      s_C: "Vending",
      a_N: casaAccountBalances[0]?.accountnumber,
      a_P: amount,
      n_P: selected,
      p_N: phone,
      u_P: usesPreset,
      v_C: vendCode,
      t_P: pin,
      username,
    });

    console.log(payload);
    try {
      setLoading(true);
      const response = await billsService.vend({
        encRequest: payload.encRequest,
        detailsRequest: payload.detailsRequest,
      });
      setLoading(false);
      if (response) {
        setEnterPin(false);
        setIsSuccess(true);
      } else {
        setIsFailed(true);
        setEnterPin(false);
      }
    } catch {
      setLoading(false);
      setIsFailed(true);
      setEnterPin(false);
    }
  };

  const backToSaving = () => {
    setEnterPin(true);
    setIsFailed(false);
    setIsSuccess(false);
    moveToOptions();
  };

  return (
    <>
      {showOptions && (
        <Box>
          {savedAirtime.length === 0 ? (
            <Box>
              <HStack
                bg="#EAECF0"
                px={{ base: "14px", md: "26px" }}
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
                  fontSize={{ base: "16px", md: "18px" }}
                  fontWeight={600}
                  color="#101828"
                >
                  Buy Airtime
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
                  src={getImageUrl("icons/blackPhone.png")}
                  alt=""
                />
                <Text
                  w={{ base: "100%", md: "50%" }}
                  textAlign="center"
                  fontSize="16px"
                  color="#667085"
                >
                  You do not have any saved airtime purchase
                </Text>
                <Button
                  mt={"16px"}
                  w={{ base: "100%", md: "50%" }}
                  h={"48px"}
                  bg={"#A41856"}
                  _hover={{ bg: "#90164D" }}
                  color={"#FFFFFF"}
                  fontSize={"14px"}
                  fontWeight={600}
                  onClick={moveToOne}
                >
                  Buy Airtime
                </Button>
              </Stack>
            </Box>
          ) : (
            <Box>
              <HStack
                bg="#EAECF0"
                px={{ base: "14px", md: "26px" }}
                py="14px"
                borderRadius="12px 12px 0 0"
              >
                <Button h="24px" bg="#EAECF0" p={0} _hover={{ bg: "#EAECF0" }}>
                  <img
                    src={getImageUrl("icons/blackLeftArrow.png")}
                    alt="back"
                  />
                </Button>
                <Text
                  width="100%"
                  textAlign="center"
                  fontSize={{ base: "16px", md: "18px" }}
                  fontWeight={600}
                  color="#101828"
                >
                  Buy Airtime
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
                  w={{ base: "100%", md: "90%", lg: "60%" }}
                  display={"grid"}
                  gridTemplateColumns={{ base: "1fr", md: "1fr 1fr" }}
                >
                  {savedAirtime.map((air, index) => (
                    <Stack
                      key={index}
                      border={"1px solid #EAECF0"}
                      borderRadius={"8px"}
                      w={"100%"}
                      py={"20px"}
                      px={"10px"}
                      spacing={"16px"}
                      direction={{ base: "column", lg: "row" }}
                      alignItems="center"
                    >
                      <Box>
                        {air.network.toLowerCase() === "mtn" ? (
                          <img
                            style={{ width: "32px", height: "32px" }}
                            src={getImageUrl("logos/mtn.png")}
                          />
                        ) : air.network.toLowerCase() === "glo" ? (
                          <img
                            style={{ width: "32px", height: "32px" }}
                            src={getImageUrl("logos/glo.png")}
                          />
                        ) : air.network.toLowerCase() === "9mobile" ? (
                          <img
                            style={{ width: "32px", height: "32px" }}
                            src={getImageUrl("logos/9mobile.png")}
                          />
                        ) : air.network.toLowerCase() === "airtel" ? (
                          <img
                            style={{ width: "32px", height: "32px" }}
                            src={getImageUrl("logos/airtel.png")}
                          />
                        ) : (
                          <Text>{air.network.slice(0, 2)}</Text>
                        )}
                      </Box>
                      <Box w={"90%"}>
                        <Stack
                          w={"100%"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                          direction={{ base: "column", md: "row", lg: "row" }}
                        >
                          <Text
                            fontSize={"15px"}
                            fontWeight={"450"}
                            color={"#101828"}
                          >
                            {air.name}
                          </Text>
                          <Text
                            fontSize={"15px"}
                            fontWeight={"450"}
                            color={"#101828"}
                          >
                            N{air.amount}
                          </Text>
                        </Stack>
                        <HStack
                          w={"100%"}
                          justifyContent={"space-between"}
                          alignItems={"center"}
                        >
                          <Text
                            fontSize="15px"
                            fontWeight={"450"}
                            color={"#101828"}
                            overflow={"hidden"}
                            textOverflow={"ellipsis"}
                          >
                            {air.number}
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
                                style={{ alignSelf: "end" }}
                                onClick={() => toggleAction(index)}
                              >
                                <img
                                  style={{ width: "14px", height: "14px" }}
                                  src={getImageUrl("icons/blackX.png")}
                                />
                              </button>
                              <HStack
                                cursor={"pointer"}
                                _hover={{ bg: "#EAECF0" }}
                                p={"8px"}
                                onClick={moveToOne}
                              >
                                <img
                                  src={getImageUrl("icons/blackPhone.png")}
                                />
                                <Text
                                  fontSize={"14px"}
                                  fontWeight={500}
                                  color={"#667085"}
                                >
                                  Buy Airtime
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
                                  onClick={onOpenDelete}
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
            px={{ base: "14px", md: "26px" }}
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
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              Buy Airtime
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              1/2
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
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color={"#667085"}
              textAlign={"center"}
            >
              Select Preferred Network
            </Text>

            <Stack
              w={{ base: "100%", md: "60%" }}
              flexDirection={{ base: "column", md: "row" }}
            >
              <Stack
                cursor="pointer"
                onClick={() => setSelected("MTN")}
                border={
                  selected === "MTN" ? "2px solid #A41857" : "1px solid #EAECF0"
                }
                alignItems={"center"}
                borderRadius={"8px"}
                p={"14px"}
                w={"100%"}
              >
                <img
                  src={getImageUrl("logos/mtn.png")}
                  style={{ width: "58px", height: "58px" }}
                  alt="MTN"
                />
                <Text fontSize={"14px"} fontWeight={500} color={"#101828"}>
                  MTN
                </Text>
              </Stack>
              <Stack
                cursor="pointer"
                onClick={() => setSelected("GLO")}
                border={
                  selected === "GLO" ? "2px solid #A41857" : "1px solid #EAECF0"
                }
                alignItems={"center"}
                borderRadius={"8px"}
                p={"14px"}
                w={"100%"}
              >
                <img
                  src={getImageUrl("logos/glo.png")}
                  style={{ width: "58px", height: "58px" }}
                  alt="glo"
                />
                <Text fontSize={"14px"} fontWeight={500} color={"#101828"}>
                  Glo
                </Text>
              </Stack>
              <Stack
                cursor="pointer"
                onClick={() => setSelected("airtel")}
                border={
                  selected === "airtel"
                    ? "2px solid #A41857"
                    : "1px solid #EAECF0"
                }
                alignItems={"center"}
                borderRadius={"8px"}
                p={"14px"}
                w={"100%"}
              >
                <img
                  src={getImageUrl("logos/airtel.png")}
                  style={{ width: "58px", height: "58px" }}
                  alt="airtel"
                />
                <Text fontSize={"14px"} fontWeight={500} color={"#101828"}>
                  Airtel
                </Text>
              </Stack>
              <Stack
                cursor="pointer"
                onClick={() => setSelected("9 Mobile")}
                border={
                  selected === "9 Mobile"
                    ? "2px solid #A41857"
                    : "1px solid #EAECF0"
                }
                alignItems={"center"}
                borderRadius={"8px"}
                p={"14px"}
                w={"100%"}
              >
                <img
                  src={getImageUrl("logos/9mobile.png")}
                  style={{ width: "58px", height: "58px" }}
                  alt="9mobile"
                />
                <Text fontSize={"14px"} fontWeight={500} color={"#101828"}>
                  9mobile
                </Text>
              </Stack>
            </Stack>

            <FormControl w={{ base: "100%", md: "75%" }} isRequired>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color={"#101828"}
              >
                Phone Number
              </FormLabel>
              <Input
                maxLength={11}
                onChange={(e) => setPhone(e.target.value)}
                h={"48px"}
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                fontSize={{ base: "14px", md: "16px" }}
                placeholder="Input Phone Number"
                _placeholder={{ color: "#667085" }}
                value={phone}
                inputMode={"numeric"}
                type={"number"}
              ></Input>
            </FormControl>

            <HStack w={{ base: "100%", md: "75%" }}>
              <img src={getImageUrl("icons/nav/profileGrey.png")} alt="" />
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight={500}
                color={"#A41857"}
              >
                Select from favorites
              </Text>
            </HStack>

            <FormControl w={{ base: "100%", md: "75%" }} isRequired>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color={"#101828"}
              >
                Amount
              </FormLabel>
              <InputGroup>
                <InputLeftElement
                  h="48px"
                  pointerEvents="none"
                  color="#667085"
                  fontSize={{ base: "14px", md: "16px" }}
                >
                  ₦
                </InputLeftElement>
                <Input
                  onChange={(e) => setAmount(e.target.value)}
                  h={"48px"}
                  bg={"#F7F7F7"}
                  border={"1px solid #EAECF0"}
                  inputMode={"numeric"}
                  type={"number"}
                />
              </InputGroup>
            </FormControl>

            <HStack
              w={{ base: "100%", md: "75%" }}
              justifyContent={"space-between"}
            >
              <Text
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight={500}
                color={"#667085"}
              >
                Save as Favorite
              </Text>
              <Switch
                onChange={() => setAddFavorite(!addFavorite)}
                checked={addFavorite}
                onColor="#A41857"
                checkedIcon={false}
                uncheckedIcon={false}
                height={24}
                width={40}
                handleDiameter={16}
              />
            </HStack>

            <Button
              onClick={onOpenConfirm}
              mt={"16px"}
              w={{ base: "100%", md: "75%" }}
              h={"48px"}
              bg={"#A41856"}
              color={"#FFFFFF"}
              fontSize={"14px"}
              fontWeight={600}
              _hover={{ bg: "#90164D" }}
              isDisabled={!selected || !amount}
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
            px={{ base: "14px", md: "26px" }}
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
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              Complete Purchase
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              2/2
            </Text>
          </HStack>

          <CompleteTransaction
            type="airtime"
            phoneNumber={phone}
            amount={amount}
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
        size={"lg"}
        closeOnOverlayClick={false}
        isOpen={isOpenDelete}
        onClose={onCloseDelete}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            <Text
              textAlign={"center"}
              fontSize={"18px"}
              fontWeight={600}
              color={"#101828"}
            >
              Delete Beneficiary
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <div style={{ overflow: "auto", maxHeight: "60vh" }}>
              <Stack spacing={2} alignItems={"center"} textAlign={"center"}>
                <img
                  style={{ width: "70px", height: "auto" }}
                  src={getImageUrl("icons/caution.png")}
                />
                <Text fontSize={"16px"} fontWeight={700} color={"#0C111D"}>
                  Are you sure you want to delete this beneficiary?
                </Text>

                <Button
                  mt={"16px"}
                  w={"100%"}
                  h={"48px"}
                  bg={"#A41856"}
                  _hover={{ bg: "#90164D" }}
                  color={"#FFFFFF"}
                  fontSize={"14px"}
                  fontWeight={600}
                >
                  Yes
                </Button>
                <Button
                  w={"100%"}
                  h={"48px"}
                  bg={"#EFECE9"}
                  _hover={{ bg: "#E3E1DE" }}
                  color={"#667085"}
                  fontSize={"14px"}
                  fontWeight={600}
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
              Confirm Airtime Payment Details
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
                      NETWORK PROVIDER
                    </Text>
                    <Text fontSize="18px" fontWeight={500} color="#A41856">
                      {selected}
                    </Text>
                  </Stack>
                </HStack>

                <HStack spacing="8px" alignItems="center">
                  <img src={getImageUrl("icons/nav/profileGrey.png")} />
                  <Stack spacing={0}>
                    <Text fontSize="14px" fontWeight={450} color="#667085">
                      BENEFICIARY NAME
                    </Text>
                    <Text fontSize="18px" fontWeight={500} color="#A41856">
                      {fullname} - {phone}
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
                      ₦ {amount}
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
              onClick={moveToTwo}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
