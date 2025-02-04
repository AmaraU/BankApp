import { useEffect, useState } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  useDisclosure,
  FormControl,
  FormLabel,
  Select,
  Input,
  InputGroup,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalOverlay,
  ModalFooter,
  Image,
  InputRightElement,
  Flex,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import styles from "./MyAccountPage.module.css";
import { useNavigate } from "react-router-dom";
import CardContainer from "../../elements/CardContainer";
import userService from "../../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { getAccountBalance, getSetupStatus } from "../../store/auth/user.slice";

export const UpgradeAccount = () => {
  const {
    isOpen: isOpenSample,
    onOpen: onOpenSample,
    onClose: onCloseSample,
  } = useDisclosure();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentIndex] = useState(0);
  const [step, setStep] = useState(1);
  const [BVNAndNINFilled, setBVNAndNINFilled] = useState(false);
  const [IDCardFilled, setIDCardFilled] = useState(false);
  const [signatureFilled, setSignatureFilled] = useState(false);
  const [addressFilled, setAddressFilled] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nin, setNin] = useState("");
  const [bvn, setBVN] = useState("");
  const [idNumber, setIDNumber] = useState("");
  const accounts = useSelector((state) => state.user.accountBalance) || [];
  const {
    bvn: bvnStatus,
    nin: ninStatus,
    governmentIDCard,
    signature: signatureStatus,
    proofOfAddress: addressStatus,
  } = useSelector((state) => state.user?.setupStatus?.identity) || {
    bvn: false,
    nin: false,
    governmentIDCard: false,
    signature: false,
    proofOfAddress: false,
  };
  const [frontDocument, setFrontDocument] = useState("");
  const [backDocument, setBackDocument] = useState("");
  const [signature, setSignature] = useState("");
  const [utilitybill, setUtilityBill] = useState("");

  const currentItem = accounts ? accounts[currentIndex] : [];

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    onOpen();
    dispatch(getAccountBalance());
    dispatch(getSetupStatus());
  }, [dispatch]);

  const moveToUpgrade = () => {
    setStep(1);
    window.scrollTo({ top: 0 });
  };

  const moveToBVN = () => {
    setStep(2);
    window.scrollTo({ top: 0 });
  };
  const moveToDocumentUpload = async () => {
    try {
      setLoading(true);
      if (!bvnStatus) {
        await userService.updateBvn({
          accountNumber: currentItem?.accountnumber,
          bvn: bvn,
        });
      }

      if (!ninStatus) {
        await userService.updateNin({
          accountNumber: currentItem?.accountnumber,
          nin: nin,
        });
      }

      setStep(3);
      window.scrollTo({ top: 0 });
      setBVNAndNINFilled(true);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const showDocumentUpload = () => {
    setStep(3);
    window.scrollTo({ top: 0 });
  };

  const showSignature = () => {
    setStep(4);
    window.scrollTo({ top: 0 });
  };

  const showAddress = () => {
    setStep(5);
    window.scrollTo({ top: 0 });
  };

  const moveToSignature = async () => {
    try {
      setLoading(true);
      await userService.uploadDocument({
        documentType: 2,
        idNumber: idNumber,
        base64String: [frontDocument.split(",")[1], backDocument.split(",")[1]],
      });
      setStep(4);
      setIDCardFilled(true);
      window.scrollTo({ top: 0 });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const moveToAddressProof = async () => {
    try {
      setLoading(true);
      const response = await userService.uploadDocument({
        documentType: 15,
        idNumber: "123456789",
        base64String: [signature.split(",")[1]],
      });

      console.log(response);
      setStep(5);
      setSignatureFilled(true);
      setLoading(false);
      window.scrollTo({ top: 0 });
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const moveToSuccess = async () => {
    try {
      setLoading(true);
      const response = await userService.uploadDocument({
        documentType: 3,
        idNumber: "123456789",
        documentNumber: "1234567890",
        base64String: [utilitybill.split(",")[1]],
      });
      console.log(response);

      setStep(6);
      setAddressFilled(true);
      window.scrollTo({ top: 0 });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const moveToStep = () => {
    if (signatureStatus || signatureFilled) {
      showAddress();
    } else if (governmentIDCard || IDCardFilled) {
      showSignature();
    } else if ((bvnStatus && ninStatus) || BVNAndNINFilled) {
      showDocumentUpload();
    } else {
      moveToBVN();
    }
  };

  const selectFrontDocument = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        // The result is a Base64 string
        const base64String = reader.result; //const base64String = reader.result.split(",")[1];
        setFrontDocument(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectBackDocument = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const base64String = reader.result;
        setBackDocument(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectSignature = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const base64String = reader.result;
        setSignature(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const selectUtilityBill = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function () {
        const base64String = reader.result;
        setUtilityBill(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    // <>
    <div className={styles.whole}>
      <Box maxW="1000px">
        {step === 1 && (
          <HStack
            mb="40px"
            spacing="12px"
            cursor="pointer"
            onClick={() => navigate("/overview/accounts")}
          >
            <img src={getImageUrl("icons/blackLeftArrow.png")} />
            <Text fontSize="24px" fontWeight={700} color="#101828">
              Upgrade Your Account
            </Text>
          </HStack>
        )}

        {step != 1 && (
          <Text mb="40px" fontSize="24px" fontWeight={700} color="#101828">
            Upgrade Your Account
          </Text>
        )}

        {step == 1 && (
          <Box>
            <HStack
              bg="#EAECF0"
              px={"26px"}
              py={"14px"}
              borderRadius={"12px 12px 0 0"}
            >
              <Text
                w="100%"
                textAlign="center"
                fontSize="18px"
                fontWeight={600}
                color="#101828"
              >
                Account Upgrade Requirements
              </Text>
            </HStack>
            <Stack
              spacing="16px"
              alignItems="center"
              border="1px solid #EFECE9"
              bg="#FFFFFF"
              borderRadius="0 0 12px 12px"
              px="16px"
              pb="114px"
              pt="48px"
            >
              <Text w="50%" fontSize="16px" color="#667085" textAlign="center">
                You are required to upload these documents below for us to
                verify and upgrade your account
              </Text>

              <Stack
                w="75%"
                bg="#F2F4F7"
                py="18px"
                px="16px"
                borderRadius="8px"
              >
                <HStack spacing="12px" w="fit-content">
                  <Box
                    p="8px"
                    borderRadius="38px"
                    border={
                      (bvnStatus && ninStatus) || BVNAndNINFilled
                        ? "1px solid #2AD062"
                        : "1px solid #EAECF0"
                    }
                  >
                    <Box
                      p="2px"
                      borderRadius="38px"
                      bg={
                        (bvnStatus && ninStatus) || BVNAndNINFilled
                          ? "#2AD062"
                          : "#667085"
                      }
                    >
                      <img
                        src={getImageUrl("icons/whiteCheck.png")}
                        style={{ width: "12px", height: "12px" }}
                      />
                    </Box>
                  </Box>
                  <Text fontSize="16px" fontWeight={600} color="#0C111D">
                    BVN and NIN
                  </Text>
                </HStack>

                <Box
                  h="14px"
                  w="1px"
                  ml="16px"
                  border="1px dashed #A0A3BD"
                ></Box>

                <HStack spacing="12px" w="fit-content">
                  <Box
                    p="8px"
                    borderRadius="38px"
                    border={
                      governmentIDCard || IDCardFilled
                        ? "1px solid #2AD062"
                        : "1px solid #EAECF0"
                    }
                  >
                    <Box
                      p="2px"
                      borderRadius="38px"
                      bg={
                        governmentIDCard || IDCardFilled ? "#2AD062" : "#667085"
                      }
                    >
                      <img
                        src={getImageUrl("icons/whiteCheck.png")}
                        style={{ width: "12px", height: "12px" }}
                      />
                    </Box>
                  </Box>
                  <Text fontSize="16px" fontWeight={600} color="#0C111D">
                    Government Issued ID card
                  </Text>
                </HStack>

                <Box
                  h="14px"
                  w="1px"
                  ml="16px"
                  border="1px dashed #A0A3BD"
                ></Box>

                <HStack spacing="12px" w="fit-content">
                  <Box
                    p="8px"
                    borderRadius="38px"
                    border={
                      signatureStatus || signatureFilled
                        ? "1px solid #2AD062"
                        : "1px solid #EAECF0"
                    }
                  >
                    <Box
                      p="2px"
                      borderRadius="38px"
                      bg={signatureStatus ? "#2AD062" : "#667085"}
                    >
                      <img
                        src={getImageUrl("icons/whiteCheck.png")}
                        style={{ width: "12px", height: "12px" }}
                      />
                    </Box>
                  </Box>
                  <Text fontSize="16px" fontWeight={600} color="#0C111D">
                    Signature
                  </Text>
                </HStack>

                <Box
                  h="14px"
                  w="1px"
                  ml="16px"
                  border="1px dashed #A0A3BD"
                ></Box>

                <HStack spacing="12px" w="fit-content">
                  <Box
                    p="8px"
                    borderRadius="38px"
                    border={
                      addressStatus || addressFilled
                        ? "1px solid #2AD062"
                        : "1px solid #EAECF0"
                    }
                  >
                    <Box
                      p="2px"
                      borderRadius="38px"
                      bg={
                        addressStatus || addressFilled ? "#2AD062" : "#667085"
                      }
                    >
                      <img
                        src={getImageUrl("icons/whiteCheck.png")}
                        style={{ width: "12px", height: "12px" }}
                      />
                    </Box>
                  </Box>
                  <Text fontSize="16px" fontWeight={600} color="#0C111D">
                    Proof of Address
                  </Text>
                </HStack>
              </Stack>

              <Button
                mt="16px"
                w="75%"
                h="48px"
                bg="#A41856"
                _hover={{ bg: "#90164D" }}
                color="#FFFFFF"
                fontSize="14px"
                fontWeight={600}
                onClick={moveToStep}
              >
                Proceed
              </Button>
            </Stack>
          </Box>
        )}

        {step === 2 && (
          <Box>
            <HStack
              bg="#EAECF0"
              px="26px"
              py="14px"
              borderRadius="12px 12px 0 0"
            >
              <Button
                onClick={moveToUpgrade}
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
                BVN and NIN
              </Text>
            </HStack>
            <Stack
              spacing="16px"
              alignItems="center"
              border="1px solid #EFECE9"
              bg="#FFFFFF"
              borderRadius="0 0 12px 12px"
              px="36px"
              pb="114px"
              pt="48px"
            >
              <Text fontSize="16px" color="#667085" mb="12px">
                Please provide your BVN and NIN
              </Text>

              <FormControl w="80%">
                <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                  BVN
                </FormLabel>
                <InputGroup>
                  <Input
                    h={"48px"}
                    type="text"
                    border={"1px solid #EAECF0"}
                    bg={"#F7F7F7"}
                    onChange={(e) => setBVN(e.target.value)}
                    defaultValue={bvnStatus ? "***********" : ""}
                    disabled={bvnStatus}
                    _disabled={{ bg: "#EAECF0", color: "#8D9DA8" }}
                  />
                  {bvnStatus && (
                    <InputRightElement h="100%" mr="12px">
                      <img
                        src={getImageUrl("icons/greenCheck.png")}
                        style={{}}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              </FormControl>

              <FormControl w="80%">
                <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                  NIN
                </FormLabel>
                <InputGroup>
                  <Input
                    h="48px"
                    pattern="\d"
                    bg="#F7F7F7"
                    border="1px solid #EAECF0"
                    fontSize="16px"
                    color="#101828"
                    inputMode="numeric"
                    _placeholder={{ color: "#667085" }}
                    maxLength={11}
                    defaultValue={ninStatus ? "***********" : ""}
                    onInput={(e) =>
                      (e.target.value = e.target.value.slice(0, 11))
                    }
                    onChange={(e) => setNin(e.target.value)}
                    disabled={ninStatus}
                    _disabled={{ bg: "#EAECF0", color: "#8D9DA8" }}
                  />
                  {ninStatus && (
                    <InputRightElement h="100%" mr="12px">
                      <img
                        src={getImageUrl("icons/greenCheck.png")}
                        style={{}}
                      />
                    </InputRightElement>
                  )}
                </InputGroup>
              </FormControl>

              <Button
                onClick={moveToDocumentUpload}
                mt="24px"
                bg="#A41857"
                _hover={{ bg: "#90164D" }}
                fontSize="14px"
                fontWeight={600}
                color="#FFFFFF"
                w="80%"
                h="48px"
                isLoading={loading}
              >
                Save and Continue
              </Button>
            </Stack>
          </Box>
        )}

        {step === 3 && (
          <Box>
            <HStack
              bg="#EAECF0"
              px="26px"
              py="14px"
              borderRadius="12px 12px 0 0"
            >
              <Button
                onClick={moveToUpgrade}
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
                Government Issued ID Card
              </Text>
            </HStack>

            <Stack
              spacing="16px"
              alignItems="center"
              border="1px solid #EFECE9"
              bg="#FFFFFF"
              borderRadius="0 0 12px 12px"
              px="36px"
              pb="114px"
              pt="48px"
            >
              <Text
                w="75%"
                textAlign="center"
                fontSize="16px"
                color="#667085"
                mb="12px"
              >
                Upload a clear picture of your government issued ID card (
                driver’s license, International Passport, Voter’s ID, National
                ID)
              </Text>

              <FormControl w="80%">
                <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                  I.D. Type
                </FormLabel>
                <Select
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize="16px"
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                >
                  <option>Voter&apos;s ID Card</option>
                  <option>NIN</option>
                </Select>
              </FormControl>

              <Text
                w="80%"
                cursor="pointer"
                onClick={onOpenSample}
                fontSize="16px"
                fontWeight={500}
                color="#A41857"
                textAlign="left"
              >
                See sample of document
              </Text>

              <FormControl w="80%">
                <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                  I.D. Card Number
                </FormLabel>
                <Input
                  h="48px"
                  type="number"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize="16px"
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  autoComplete="false"
                  onChange={(e) => setIDNumber(e.target.value)}
                  maxLength={"11"}
                  max={"11"}
                />
              </FormControl>

              <HStack w="80%">
                <FormControl>
                  <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                    Upload Front
                  </FormLabel>
                  <Stack
                    p="30px"
                    h="150px"
                    justifyContent="center"
                    alignItems="center"
                    bg="#F7F7F7"
                    border="1px solid #EAECF0"
                    fontSize="16px"
                    color="#101828"
                    borderRadius="8px"
                    _placeholder={{ color: "#667085" }}
                  >
                    <label className={styles.uploadButton}>
                      <input
                        id="front-upload"
                        type="file"
                        accept="image/png, image/jpeg, application/pdf, image/x-eps"
                        onChange={selectFrontDocument}
                      />
                      <img
                        src={getImageUrl("icons/greyPic.png")}
                        style={{ width: "22px", height: "22px" }}
                      />
                      Tap to Upload
                    </label>
                    {!frontDocument ? (
                      <Stack>
                        <Text fontSize="14px" fontWeight={500} color="#101828">
                          Choose a file or drag & drop it here.
                        </Text>
                        <Text
                          fontSize="12px"
                          fontWeight={400}
                          color="#667085"
                          mt="-8px"
                        >
                          PDF, PNG and JPG formats, up to 5 MB.
                        </Text>
                      </Stack>
                    ) : (
                      <Image
                        src={frontDocument}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </Stack>
                </FormControl>
                <FormControl>
                  <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                    Upload Back
                  </FormLabel>
                  <Stack
                    p="30px"
                    h="150px"
                    justifyContent="center"
                    alignItems="center"
                    bg="#F7F7F7"
                    border="1px solid #EAECF0"
                    fontSize="16px"
                    color="#101828"
                    borderRadius="8px"
                    _placeholder={{ color: "#667085" }}
                  >
                    <label className={styles.uploadButton}>
                      <input
                        id="front-upload"
                        type="file"
                        accept="image/png, image/jpeg, application/pdf, image/x-eps"
                        onChange={selectBackDocument}
                      />
                      <img
                        src={getImageUrl("icons/greyPic.png")}
                        style={{ width: "22px", height: "22px" }}
                      />
                      Tap to Upload
                    </label>
                    {!backDocument ? (
                      <Stack>
                        <Text fontSize="14px" fontWeight={500} color="#101828">
                          Choose a file or drag & drop it here.
                        </Text>
                        <Text
                          fontSize="12px"
                          fontWeight={400}
                          color="#667085"
                          mt="-8px"
                        >
                          PDF, PNG and JPG formats, up to 5 MB.
                        </Text>
                      </Stack>
                    ) : (
                      <Image
                        src={backDocument}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  </Stack>
                </FormControl>
              </HStack>

              <Button
                onClick={moveToSignature}
                mt="24px"
                bg="#A41857"
                _hover={{ bg: "#90164D" }}
                fontSize="14px"
                fontWeight={500}
                color="#FFFFFF"
                w="80%"
                h="48px"
                isLoading={loading}
                isDisabled={
                  idNumber.length < 10 || !frontDocument || !backDocument
                }
              >
                Save and Continue
              </Button>
            </Stack>
          </Box>
        )}

        {step === 4 && (
          <Box>
            <HStack
              bg="#EAECF0"
              px="26px"
              py="14px"
              borderRadius="12px 12px 0 0"
            >
              <Button
                onClick={moveToUpgrade}
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
                Upload Signature
              </Text>
            </HStack>

            <Stack
              spacing="16px"
              alignItems="center"
              border="1px solid #EFECE9"
              bg="#FFFFFF"
              borderRadius="0 0 12px 12px"
              px="36px"
              pb="114px"
              pt="48px"
            >
              <Text fontSize="16px" color="#667085" mb="12px">
                Upload a clear picture of your signature on a plain piece of
                paper
              </Text>

              <FormControl w="80%">
                <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                  Upload Signature
                </FormLabel>
                <Stack
                  p="18px"
                  h="170px"
                  justifyContent="center"
                  alignItems="center"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize="16px"
                  color="#101828"
                  borderRadius="8px"
                  _placeholder={{ color: "#667085" }}
                >
                  <label className={styles.uploadButton}>
                    <input
                      id="front-upload"
                      type="file"
                      accept="image/png, image/jpeg, application/pdf, image/x-eps"
                      onChange={selectSignature}
                    />
                    <img
                      src={getImageUrl("icons/greyPic.png")}
                      style={{ width: "22px", height: "22px" }}
                    />
                    Tap to Upload
                  </label>
                  {!signature ? (
                    <Stack>
                      <Text fontSize="14px" fontWeight={500} color="#101828">
                        Choose a file or drag & drop it here.
                      </Text>
                      <Text
                        fontSize="12px"
                        fontWeight={400}
                        color="#667085"
                        mt="-8px"
                      >
                        PDF, PNG and JPG formats, up to 5 MB.
                      </Text>
                    </Stack>
                  ) : (
                    <Image
                      src={signature}
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                </Stack>
              </FormControl>

              <HStack
                border="1px solid #E0E0E0"
                px="22px"
                py="12px"
                borderRadius="6px"
                w="80%"
                justifyContent="start"
              >
                <Text fontSize="16px" fontWeight={900} color="#667085">
                  Tips:
                </Text>
                <Text fontSize="16px" color="#667085">
                  Take in good lighting and make sure your image takes up 75% of
                  the surface
                </Text>
              </HStack>

              <Button
                onClick={moveToAddressProof}
                mt="24px"
                bg="#A41857"
                _hover={{ bg: "#90164D" }}
                fontSize="14px"
                fontWeight={500}
                color="#FFFFFF"
                w="80%"
                h="48px"
                isLoading={loading}
              >
                Save and Continue
              </Button>
            </Stack>
          </Box>
        )}

        {step === 5 && (
          <Box>
            <HStack
              bg="#EAECF0"
              px="26px"
              py="14px"
              borderRadius="12px 12px 0 0"
            >
              <Button
                onClick={moveToUpgrade}
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
                Proof of Address
              </Text>
            </HStack>

            <Stack
              spacing="16px"
              alignItems="center"
              border="1px solid #EFECE9"
              bg="#FFFFFF"
              borderRadius="0 0 12px 12px"
              px="36px"
              pb="114px"
              pt="48px"
            >
              <Text
                fontSize="16px"
                color="#667085"
                mb="12px"
                w="70%"
                textAlign="center"
              >
                Upload a recent utility bill (electricity, telephone, waste),
                bank statement, tenancy agreement. Not more than 3 months old
              </Text>

              <FormControl w="80%">
                <FormLabel fontSize="16px" fontWeight={400} color="#101828">
                  Upload Utility Bill
                </FormLabel>
                <Stack
                  p="18px"
                  h="170px"
                  justifyContent="center"
                  alignItems="center"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize="16px"
                  color="#101828"
                  borderRadius="8px"
                  _placeholder={{ color: "#667085" }}
                >
                  <label className={styles.uploadButton}>
                    <input
                      id="front-upload"
                      type="file"
                      accept="image/png, image/jpeg, application/pdf, image/x-eps"
                      onChange={selectUtilityBill}
                    />
                    <img
                      src={getImageUrl("icons/greyPic.png")}
                      style={{ width: "22px", height: "22px" }}
                    />
                    Tap to Upload
                  </label>
                  {!utilitybill ? (
                    <Stack>
                      <Text fontSize="14px" fontWeight={500} color="#101828">
                        Choose a file or drag & drop it here.
                      </Text>
                      <Text
                        fontSize="12px"
                        fontWeight={400}
                        color="#667085"
                        mt="-8px"
                      >
                        PDF, PNG and JPG formats, up to 5 MB.
                      </Text>
                    </Stack>
                  ) : (
                    <Image
                      src={utilitybill}
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                </Stack>
              </FormControl>

              <HStack
                border="1px solid #E0E0E0"
                px="22px"
                py="12px"
                borderRadius="6px"
                w="80%"
                justifyContent="start"
              >
                <Text fontSize="16px" fontWeight={900} color="#667085">
                  Tips:
                </Text>
                <Text fontSize="16px" color="#667085">
                  Take in good lighting and make sure your image takes up 75% of
                  the surface
                </Text>
              </HStack>

              <Button
                onClick={moveToSuccess}
                mt="24px"
                bg="#A41857"
                _hover={{ bg: "#90164D" }}
                fontSize="14px"
                fontWeight={500}
                color="#FFFFFF"
                w="80%"
                h="48px"
                isLoading={loading}
              >
                Save and Continue
              </Button>
            </Stack>
          </Box>
        )}

        {step === 6 && (
          <CardContainer
            title={"Account Upgrade Complete"}
            moveToOne={moveToUpgrade}
          >
            <Stack spacing={1} w="75%" alignItems="center">
              <img
                src={getImageUrl("icons/success.png")}
                style={{ height: "84px", width: "auto" }}
              />
              <Text fontSize="18px" fontWeight={700} color="#000000">
                Success!
              </Text>
              <Text
                fontSize="14px"
                fontWeight={450}
                color="#667085"
                w="55%"
                textAlign="center"
              >
                Your documents are being reviewed, a notification will be sent
                once review is complete.
              </Text>

              <Button
                h="48px"
                my={8}
                w="80%"
                color={"white"}
                bg={"#A41856"}
                _hover={{ bg: "#90164D" }}
                onClick={() => navigate("/overview")}
              >
                Proceed to dashboard
              </Button>
            </Stack>
          </CardContainer>
        )}

        <Modal
          isCentered
          size={"3xl"}
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent rounded={"lg"} bg="white" boxShadow="none">
            <ModalHeader>
              <Text
                textAlign="center"
                fontSize="21px"
                fontWeight={500}
                color="#000000"
              >
                Upgrade Your Account
              </Text>
            </ModalHeader>
            <ModalCloseButton color="#00000" />

            <Text align={"center"}>
              Below are the documents needed for upgrade
            </Text>
            <ModalBody maxW={"550px"} margin={"auto"} my={2}>
              <Flex justifyContent={"center"} gap={"0px"}>
                <Image
                  src={getImageUrl("tier2_upgrade.png")}
                  style={{ width: "auto", height: "166px" }}
                />
                <Image
                  src={getImageUrl("tier3_upgrade.png")}
                  style={{ width: "auto", height: "194px" }}
                />
              </Flex>
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Text fontSize="14px" fontWeight={600} color="#FFFFFF">
                We won&apos;t share your information with anyone
              </Text>
            </ModalFooter>
          </ModalContent>
        </Modal>

        <Modal
          isCentered
          size={"lg"}
          closeOnOverlayClick={false}
          isOpen={isOpenSample}
          onClose={onCloseSample}
        >
          <ModalOverlay />
          <ModalContent bg="white" boxShadow="none">
            <ModalHeader>
              <Text
                textAlign="center"
                fontSize="14px"
                fontWeight={600}
                color="#FFFFFF"
              >
                Here&apos;s a sample document
              </Text>
            </ModalHeader>
            <ModalCloseButton color="#FFFFFF" />

            <ModalBody alignItems="center">
              <img
                src={getImageUrl("samplePassport.png")}
                style={{ width: "100%", height: "auto" }}
              />
            </ModalBody>
            <ModalFooter justifyContent="center">
              <Text fontSize="14px" fontWeight={600} color="#FFFFFF">
                We won&apos;t share your information with anyone
              </Text>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
    </div>
  );
};
