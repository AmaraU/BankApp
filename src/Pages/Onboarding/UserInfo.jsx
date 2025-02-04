import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  HStack,
  Text,
  Select,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  Spinner,
  CircularProgress,
  CircularProgressLabel,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNationalities, getSourceOfFunds } from "../../store/utils.slice";

export const UserInfo = () => {
  const {
    isOpen: isOpenVerifying,
    onOpen: onOpenVerifying,
    onClose: onCloseVerifying,
  } = useDisclosure();
  const {
    isOpen: isOpenAlternate,
    onOpen: onOpenAlternate,
    onClose: onCloseAlternate,
  } = useDisclosure();
  const navigate = useNavigate();
  const {altEmail: altEmailValue} = ('')
  const [altEmail, setAltEmail] = useState("");
  const [title, setTitle] = useState("Mr");
  const [occupation, setOccupation] = useState("");
  const [sourceOfFund, setSourceOfFund] = useState(0);
  const [countryOfBirth, setCountryOfBirth] = useState(0);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNationalities());
    dispatch(getSourceOfFunds());
  }, [dispatch]);

  const openVerifying = () => {
    
    onOpenVerifying();
    setTimeout(() => onCloseVerifying(), 5000);
    onOpenVerifying();
    setLoading(true);
    navigate("/welcome");
    setLoading(false);
    onCloseVerifying();
    setTimeout(() => navigate("/create-profile"), 1000);

  };

  return (
    <>
      <Stack
        alignItems="center"
        spacing={5}
        py={"38px"}
        px={{ base: "24px", md: "15%", lg: "25%" }}
        bgImage={getImageUrl("onboardingBackground.png")}
        bgSize="100% 100%"
      >
        <Flex justifyContent={"space-between"} w={"100%"}>
          <a href="/confirm-picture">
            <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
          </a>

          <CircularProgress value={60} size={"32px"} color={"#A41857"}>
            <CircularProgressLabel fontWeight={700} fontSize={"9px"}>
              60%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Text
          fontSize={{ base: "30px", md: "48px" }}
          fontWeight={700}
          color={"#14142A"}
        >
          Your basic information
        </Text>
        <Text
          fontSize={{ base: "14px", md: "18px" }}
          fontWeight={400}
          color={"#667085"}
        >
          Review and confirm your details
        </Text>

        <Stack spacing={"16px"} w={"100%"}>
          <FormControl isRequired>
            <FormLabel
              fontSize={"16px"}
              fontWeight={400}
              color={"#101828"}
              mb={"16px"}
            >
              Title
            </FormLabel>
            <Select
              onChange={(e) => setTitle(e.target.value)}
              h={"48px"}
              flex={"35%"}
              border={"1px solid #EAECF0"}
              bg={"#F7F7F7"}
              fontSize={"16px"}
            >
              <option value="">Mr</option>
              <option value="">Dr</option>
              <option value="">Miss</option>
              <option value="">Mrs</option>
            </Select>
          </FormControl>

          <Stack direction={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel
                fontSize={"16px"}
                fontWeight={400}
                color={"#101828"}
                mb={"8px"}
              >
                First Name
              </FormLabel>
              <Input
                h={"48px"}
                type="text"
                border={"1px solid #EAECF0"}
                bg={"#F7F7F7"}
                />
            </FormControl>

            <FormControl>
              <FormLabel
                fontSize={"16px"}
                fontWeight={400}
                color={"#101828"}
                mb={"8px"}
              >
                Last Name
              </FormLabel>
              <Input
                h={"48px"}
                type="text"
                border={"1px solid #EAECF0"}
                bg={"#F7F7F7"}
              />
            </FormControl>
          </Stack>

          <Stack direction={{ base: "column", md: "row" }}>
            <FormControl>
              <FormLabel
                fontSize={"16px"}
                fontWeight={400}
                color={"#101828"}
                mb={"8px"}
              >
                Email Address
              </FormLabel>
              <Input
                h={"48px"}
                type="text"
                border={"1px solid #EAECF0"}
                bg={"#F7F7F7"}
              />
            </FormControl>

            <FormControl>
              <FormLabel
                fontSize={"16px"}
                fontWeight={400}
                color={"#101828"}
                mb={"8px"}
              >
                Phone Number
              </FormLabel>
              <HStack spacing={2}>
                <Select
                  h={"48px"}
                  flex={"35%"}
                  border={"1px solid #EAECF0"}
                  bg={"#F7F7F7"}
                  fontSize={"16px"}
                >
                  <option value="">+234 (NG)</option>
                </Select>
                <Input
                  readOnly
                  h={"48px"}
                  type="tel"
                  border={"1px solid #EAECF0"}
                  bg={"#F7F7F7"}
                />
              </HStack>
            </FormControl>
          </Stack>

          <Stack direction={{ base: "column", md: "row" }} spacing={1}>
            <HStack>
              <img
                src={getImageUrl("icons/warning.png")}
                style={{ width: "20px", height: "20px" }}
              />
              <Text fontSize="11.5px" fontWeight={450} color="#667085">
                Don&apos;t have access to email?
              </Text>
            </HStack>
            <Text
              fontSize="11.5px"
              fontWeight={700}
              color="#A41857"
              cursor="pointer"
              onClick={onOpenAlternate}
            >
              Provide Alternate Email
            </Text>
          </Stack>

          {(altEmail || altEmailValue) && (
            <FormControl>
              <FormLabel
                fontSize={"16px"}
                fontWeight={400}
                color={"#101828"}
                mb={"8px"}
              >
                Alternate Email Address
              </FormLabel>
              <Input
                h={"48px"}
                type="text"
                border={"1px solid #EAECF0"}
                bg={"#F7F7F7"}
                onChange={(e) => setAltEmail(e.target.value)}
              />
            </FormControl>
          )}

          <HStack spacing="13px">
            <Text
              w="fit-content"
              fontSize="12px"
              fontWeight={400}
              color="#667085"
              whiteSpace="nowrap"
            >
              PROVIDE ADDITIONAL DETAILS
            </Text>
            <div style={{ width: "100%", border: "0.5px solid #E6E2DD" }}></div>
          </HStack>

          <Stack direction={{ base: "column", md: "row" }}>
            <FormControl isRequired>
              <FormLabel
                fontSize={"16px"}
                fontWeight={400}
                color={"#101828"}
                mb={"8px"}
              >
                Occupation
              </FormLabel>
              <Select
                h={"48px"}
                flex={"35%"}
                border={"1px solid #EAECF0"}
                bg={"#F7F7F7"}
                fontSize={"16px"}
                onChange={(e) => setOccupation(e.target.value)}
              >
                <option selected value="" disabled></option>
                <option value="Banking">Art</option>
                <option value="Banking">Banking</option>
                <option value="Banking">Business</option>
                <option value="Consultant">Consultant</option>
                <option value="Engineering">Engineering</option>
                <option value="Consultant">Entrepreneurship</option>
                <option value="Media & Entertainment">
                  Media & Entertainment
                </option>
                <option value="Tech.">Tech.</option>
                <option value="Engineering">Politics</option>
              </Select>
            </FormControl>
            <FormControl isRequired>
              <FormLabel
                fontSize={"16px"}
                fontWeight={400}
                color={"#101828"}
                mb={"8px"}
              >
                Source of fund
              </FormLabel>
              <Select
                h={"48px"}
                flex={"35%"}
                border={"1px solid #EAECF0"}
                bg={"#F7F7F7"}
                fontSize={"16px"}
                onChange={(e) => setSourceOfFund(parseFloat(e.target.value))}
              >
                <option selected disabled defaultValue={""}></option>
                <option value="">Job</option>
              </Select>
            </FormControl>
          </Stack>

          <FormControl isRequired>
            <FormLabel
              fontSize={"16px"}
              fontWeight={400}
              color={"#101828"}
              mb={"8px"}
            >
              Nationality
            </FormLabel>
            <Select
              h={"48px"}
              flex={"35%"}
              border={"1px solid #EAECF0"}
              bg={"#F7F7F7"}
              fontSize={"16px"}
              onChange={(e) => setCountryOfBirth(parseFloat(e.target.value))}
            >
              <option disabled value={0} selected></option>
              <option value={153} defaultValue={"Nigerian"}>
                Nigerian
              </option>
            </Select>
          </FormControl>
        </Stack>

        <Button
          onClick={openVerifying}
          mt={"56px"}
          bg={"#A41857"}
          _hover={{ bg: "#90164D" }}
          fontSize={"18px"}
          fontWeight={600}
          color={"#FFFFFF"}
          w={"100%"}
          h={"48px"}
          isLoading={loading}
        >
          Continue
        </Button>
      </Stack>

      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenVerifying}
        onClose={onCloseVerifying}
      >
        <ModalOverlay />
        <ModalContent
          rounded={15}
          p={"20px"}
          justifyContent={"center"}
          w={"fit-content"}
        >
          <Spinner w={"30px"} h={"30px"} speed="1s" emptyColor="grey" />
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        size="lg"
        closeOnOverlayClick={false}
        isOpen={isOpenAlternate}
        onClose={onCloseAlternate}
      >
        <ModalOverlay />

        <ModalContent py={4}>
          <ModalHeader>
            <Text
              textAlign="center"
              fontSize="18px"
              fontWeight={600}
              color="#394455"
            >
              Provide Alternate Email
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody py="12px">
            <FormControl>
              <FormLabel
                fontSize={"16px"}
                fontWeight={400}
                color={"#101828"}
                mb={"8px"}
              >
                Email Address
              </FormLabel>
              <Input
                h={"48px"}
                border={"1px solid #EAECF0"}
                bg={"#F7F7F7"}
                fontSize={"16px"}
                onChange={(e) => setAltEmail(e.target.value)}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter pt={0}>
            <Button
              bg={"#A41857"}
              _hover={{ bg: "#90164D" }}
              fontSize={"18px"}
              fontWeight={600}
              color={"#FFFFFF"}
              w={"100%"}
              h={"48px"}
              onClick={onCloseAlternate}
            >
              Continue
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
