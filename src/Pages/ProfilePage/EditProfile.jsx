/* eslint-disable react/prop-types */
import { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  Select,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import styles from "./ProfilePage.module.css";
import userService from "../../services/userService";
import PinComponent from "../../Components/PinComponent";
import SuccessComponent from "../../Components/SuccessComponent";

export const EditProfile = ({
  userDetails,
  fullname,
  email,
  contactDetails,
  nationalities,
  documentTypes,
  personalDetails,
  isContactDetails,
  documentUpload,
  toForgot,
}) => {
  const {
    firstName,
    lastName,
    otherName,
    dob,
    title,
    maritalStatus,
    stateOfOrigin,
    employmentStatus,
    employmentSector,
    employerName,
    employerAddress,
    employmentPhoneNumber,
    placeOfBirth,
    address: initialAddress,
  } = userDetails;

  const {
    phoneNumber,
    altEmailAddress,
    city,
    houseNo,
    lga,
    busStopLandMark,
    country,
    state,
    streetName,
    address,
  } = contactDetails;

  const {
    isOpen: isOpenSample,
    onOpen: onOpenSample,
    onClose: onCloseSample,
  } = useDisclosure();

  const [showEditProfile, setShowEditProfile] = useState(true);
  const [showPersonalDetails, setShowPersonalDetails] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [showDocumentUpload, setShowDocumentUpload] = useState(false);
  const [otherNameValue, setOtherName] = useState("");
  const [showPIN, setShowPIN] = useState(false);
  const [type, setType] = useState("");

  const [BVNLinked] = useState(true);
  const [employerNameValue, setEmployerName] = useState();
  const [employerAddressValue, setEmployerAddress] = useState("");
  const [employmentPhoneNumberValue, setEmploymentPhoneNumber] = useState("");
  const [employmentSectorValue, setEmploymentSector] = useState("");
  const [employmentStatusValue, setEmploymentStatus] = useState("");
  const [placeOfBirthValue, setPlaceOfBirth] = useState();
  const [addressValue, setAddress] = useState("");
  const [houseNoValue, setHouseNo] = useState("");
  const [streetNameValue, setStreetName] = useState("");
  const [busStopLandMarkValue, setBusStopLandmark] = useState("");
  const [countryValue, setCountry] = useState("");
  const [lgaValue, setLga] = useState("");
  const [stateValue, setStateValue] = useState("");
  const [cityValue, setCity] = useState("");
  const [pin, setPin] = useState("");
  const [ACTION, SETACTION] = useState("");
  const [step, setStep] = useState(1);
  const [maritalStatusValue, setMaritalStatus] = useState("");
  const [titleValue, setTitle] = useState("");

  const [loading, setLoading] = useState(false);

  const moveToEdit = async () => {
    try {
      setLoading(true);
      await userService.updateCustomerDetails({
        personalDetails: {
          title: titleValue ? titleValue : title,
          maritalStatus: maritalStatusValue
            ? maritalStatusValue
            : maritalStatus,
          otherNames: otherNameValue ? otherNameValue : otherName,
          stateOfOrigin: stateOfOrigin ? stateOfOrigin : "Lagos",
          lga: lga,
          placeOfBirth: placeOfBirth,
        },
        employment: {
          employmentStatus: employmentStatusValue
            ? employmentStatusValue
            : employmentStatus,
          employerName: employerNameValue ? employerNameValue : employerName,
          employerAddress: employerAddressValue
            ? employerAddressValue
            : employerAddress,
          employmentPhoneNumber: employmentPhoneNumberValue
            ? employmentPhoneNumberValue
            : employmentPhoneNumber,
          employmentSector: employmentSectorValue
            ? employmentSectorValue.trim()
            : employmentSector.trim(),
        },
      });
      setLoading(false);
      setShowPersonalDetails(false);
      setShowContactDetails(false);
      setShowDocumentUpload(false);
      setStep(3);
      window.scrollTo({ top: 0 });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const updateContactDetails = async () => {
    try {
      setLoading(true);
      await userService.updateContactDetails({
        houseNo: houseNoValue ? houseNoValue : houseNo,
        streetName: streetNameValue ? streetNameValue : streetName,
        busStopLandMark: busStopLandMarkValue
          ? busStopLandMarkValue
          : busStopLandMark,
        address: addressValue
          ? addressValue
          : address
          ? address
          : initialAddress,
        emailAddress: email,
        altEmailAddress: altEmailAddress ? altEmailAddress : email,
        phoneNumber: phoneNumber,
        country: countryValue
          ? String(countryValue)
          : country
          ? String(country)
          : String(153),
        stateOfOrigin: stateValue ? stateValue : state,
        lga: lgaValue ? lgaValue : lga,
        city: cityValue ? cityValue : city,
      });
      setLoading(false);
      setShowPersonalDetails(false);
      setShowContactDetails(false);
      setShowDocumentUpload(false);
      setStep(3);
      window.scrollTo({ top: 0 });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const goBack = () => {
    setShowEditProfile(true);
    setShowPersonalDetails(false);
    setShowContactDetails(false);
    setShowDocumentUpload(false);
    setShowPIN(false);
  };

  const moveToBVN = () => {
    setShowEditProfile(false);
    setShowPersonalDetails(false);
    setShowContactDetails(false);
    setShowDocumentUpload(false);
    setShowPIN(false);
    window.scrollTo({ top: 0 });
  };

  const moveToPersonalDetails = () => {
    setShowEditProfile(false);
    setShowPersonalDetails(true);
    setShowContactDetails(false);
    setShowDocumentUpload(false);
    setShowPIN(false);
    window.scrollTo({ top: 0 });
  };

  const moveToContactDetails = () => {
    setShowEditProfile(false);
    setShowPersonalDetails(false);
    setShowContactDetails(true);
    setShowDocumentUpload(false);
    setShowPIN(false);
    window.scrollTo({ top: 0 });
  };

  const moveToDocumentUpload = () => {
    setShowEditProfile(false);
    setShowPersonalDetails(false);
    setShowContactDetails(false);
    setShowDocumentUpload(true);
    setShowPIN(false);
    window.scrollTo({ top: 0 });
  };

  const handleContinue = async () => {
    //determine which action to take based on the previous step
    console.log(pin);
    try {
      setLoading(true);
      await userService.verifyPin(pin);

      if (ACTION === "EDIT-PROFILE") {
        moveToEdit();
      }

      if (ACTION === "CONTACT-DETAILS") {
        updateContactDetails();
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setPreviousStep = () => {
    //determine which screen to show on previous step
    setStep(1);
    if (ACTION === "EDIT-PROFILE") {
      setShowPersonalDetails(true);
    }

    if (ACTION === "CONTACT-DETAILS") {
      setShowContactDetails(true);
    }
  };

  const handleEditProceed = () => {
    SETACTION("EDIT-PROFILE");
    setShowPersonalDetails(false);
    setStep(2);
  };

  const handleEditContact = () => {
    SETACTION("CONTACT-DETAILS");
    setShowContactDetails(false);
    setStep(2);
  };

  const handleProceed = () => {
    setShowEditProfile(true);
    setShowPersonalDetails(false);
    setShowContactDetails(false);
    setShowDocumentUpload(false);
    setStep(1);
  };

  return (
    <>
      {showEditProfile && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{ base: "14px", md: "26px" }}
            py="14px"
            borderRadius="12px 12px 0 0"
          >
            <Button h="24px" bg="#EAECF0" p={0} _hover={{ bg: "#EAECF0" }}>
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              width="100%"
              textAlign="center"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color="#101828"
            >
              Edit Profile
            </Text>
          </HStack>

          <Stack
            spacing="24px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px={{ base: "14px", md: "20px", lg: "36px" }}
            pb="114px"
            pt="48px"
          >
            <Stack alignItems="center" spacing="4px">
              <Box
                bgImage={getImageUrl("avatar.png")}
                bgSize="100% 100%"
                width="82px"
                height="82px"
                borderRadius="50px"
                display="flex"
                alignItems="end"
                justifyContent="center"
                pb="4px"
              >
                <button>
                  <img src={getImageUrl("icons/whiteEdit.png")} />
                </button>
              </Box>
              <Text
                fontSize={{ base: "16px", md: "18px" }}
                fontWeight={600}
                color="#101828"
              >
                {fullname}
              </Text>
              <Text fontSize={{ base: "16px", md: "18px" }} color="#667085">
                {email}
              </Text>
            </Stack>

            <Stack
              justifyContent="space-between"
              alignItems="center"
              w="100%"
              gap="16px"
              flexDirection={{ base: "column-reverse", md: "row" }}
            >
              <button
                // onClick={moveToBVN}
                className={
                  BVNLinked ? styles.activeProfileButton : styles.profileButton
                }
              >
                BVN Linked
                <div className={styles.checkbox}>
                  <img src={getImageUrl("icons/whiteCheck.png")} />
                </div>
              </button>
              <button
                onClick={moveToPersonalDetails}
                className={
                  personalDetails
                    ? styles.activeProfileButton
                    : styles.profileButton
                }
              >
                Personal Details
                <div className={styles.checkbox}>
                  <img src={getImageUrl("icons/whiteCheck.png")} />
                </div>
              </button>
              <button
                onClick={moveToContactDetails}
                className={
                  isContactDetails
                    ? styles.activeProfileButton
                    : styles.profileButton
                }
              >
                Contact Details
                <div className={styles.checkbox}>
                  <img src={getImageUrl("icons/whiteCheck.png")} />
                </div>
              </button>
              {/* <button
                onClick={moveToDocumentUpload}
                className={
                  documentUpload
                    ? styles.activeProfileButton
                    : styles.profileButton
                }
              >
                Documents Upload
                <div className={styles.checkbox}>
                  <img src={getImageUrl("icons/whiteCheck.png")} />
                </div>
              </button> */}
            </Stack>
          </Stack>
        </Box>
      )}

      {showPersonalDetails && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{ base: "14px", md: "26px" }}
            py="14px"
            borderRadius="12px 12px 0 0"
          >
            <Button
              onClick={goBack}
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
              fontSize="18px"
              fontWeight={600}
              color="#101828"
            >
              Personal Details
            </Text>
          </HStack>

          <Stack
            spacing="16px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px={{ base: "14px", md: "36px" }}
            pb="114px"
            pt="48px"
          >
            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Title
                </FormLabel>
                <Select
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  onChange={(e) => setTitle(e.target.value)}
                  value={titleValue ? titleValue : title}
                >
                  <option value={""}>Mr</option>
                  <option value={"2"}>Miss</option>
                  <option value={"3"}>Mrs</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Marital Status
                </FormLabel>
                <Select
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  onChange={(e) => setMaritalStatus(e.target.value)}
                  value={
                    maritalStatusValue ? maritalStatusValue : maritalStatus
                  }
                >
                  <option value={"1"}>Single</option>
                  <option value={"2"}>Married</option>
                  <option value={"3"}>Divorced</option>
                </Select>
              </FormControl>
            </Stack>

            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  First Name
                </FormLabel>
                <Input
                  readOnly
                  value={firstName}
                  h="48px"
                  bg="#EAECF0"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Last Name
                </FormLabel>
                <Input
                  readOnly
                  h="48px"
                  bg="#EAECF0"
                  value={lastName}
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                />
              </FormControl>
            </Stack>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Other Names
              </FormLabel>
              <Input
                h="48px"
                bg="#EAECF0"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                color="#101828"
                _placeholder={{ color: "#667085" }}
                value={otherNameValue ? otherNameValue : otherName}
                onChange={(e) => setOtherName(e.target.value)}
                readOnly
              />
            </FormControl>

            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Gender
                </FormLabel>
                <Select
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Other</option>
                  <option>Rather not say</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Date of Birth
                </FormLabel>
                <Input
                  value={dob ? dob.split(" ")[0] : ""}
                  h="48px"
                  type="date-local"
                  bg="#EAECF0"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  onChange={(e) => console.log(e.target.value)}
                  readOnly
                />
              </FormControl>
            </Stack>

            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Nationality
                </FormLabel>
                <Select
                  h="48px"
                  bg="#EAECF0"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  readOnly
                  disabled
                >
                  <option value={153}>Nigerian</option>
                </Select>
              </FormControl>
            </Stack>

            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  LGA
                </FormLabel>
                <Input
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={lgaValue ? lgaValue : lga}
                  onChange={(e) => setLga(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Place of Birth
                </FormLabel>
                <Input
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  defaultValue={placeOfBirth}
                  value={placeOfBirthValue}
                  _placeholder={{ color: "#667085" }}
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                ></Input>
              </FormControl>
            </Stack>

            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Employment Status
                </FormLabel>
                <Select
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  onChange={(e) => setEmploymentStatus(e.target.value)}
                  value={
                    employmentStatusValue
                      ? employmentStatusValue
                      : employmentStatus
                  }
                >
                  <option value={"001"}>Employed</option>
                  <option value={"002"}>Unemployed</option>
                  <option value={"003"}>Self-employed</option>
                </Select>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Employer&apos;s Name
                </FormLabel>
                <Input
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  defaultValue={employerName}
                  value={employerNameValue}
                  onChange={(e) => setEmployerName(e.target.value)}
                />
              </FormControl>
            </Stack>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Employer&apos;s Address
              </FormLabel>
              <Input
                h="48px"
                bg="#F7F7F7"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                color="#101828"
                _placeholder={{ color: "#667085" }}
                defaultValue={
                  employerAddressValue ? employerAddressValue : employerAddress
                }
                onChange={(e) => setEmployerAddress(e.target.value)}
              />
            </FormControl>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Employment Phone Number
              </FormLabel>
              <HStack spacing={2}>
                <Select
                  h="48px"
                  flex={"35%"}
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                >
                  <option value="">+234 (NG)</option>
                </Select>
                <Input
                  h="48px"
                  maxLength={11}
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={
                    employmentPhoneNumberValue
                      ? employmentPhoneNumberValue
                      : employmentPhoneNumber
                  }
                  onChange={(e) => setEmploymentPhoneNumber(e.target.value)}
                />
              </HStack>
            </FormControl>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Sector
              </FormLabel>
              <Select
                h="48px"
                bg="#F7F7F7"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                color="#101828"
                _placeholder={{ color: "#667085" }}
                onChange={(e) => setEmploymentSector(e.target.value)}
                defaultValue={employmentSector}
              >
                <option>Finance</option>
              </Select>
            </FormControl>

            <Button
              onClick={handleEditProceed}
              mt="24px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="18px"
              fontWeight={600}
              color="#FFFFFF"
              w={{ base: "100%", md: "80%" }}
              h="48px"
              isLoading={loading}
            >
              Proceed
            </Button>
          </Stack>
        </Box>
      )}

      {showContactDetails && (
        <Box>
          <HStack
            bg="#EAECF0"
            px={{ base: "14px", md: "26px" }}
            py="14px"
            borderRadius="12px 12px 0 0"
          >
            <Button
              onClick={goBack}
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
              fontSize="18px"
              fontWeight={600}
              color="#101828"
            >
              Contact Details
            </Text>
          </HStack>

          <Stack
            spacing="16px"
            alignItems="center"
            border="1px solid #EFECE9"
            bg="#FFFFFF"
            borderRadius="0 0 12px 12px"
            px={{ base: "14px", md: "36px" }}
            pb="114px"
            pt="48px"
          >
            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  House Number
                </FormLabel>
                <Input
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={houseNoValue ? houseNoValue : houseNo}
                  onChange={(e) => setHouseNo(e.target.value)}
                />
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Street Name
                </FormLabel>
                <Input
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={streetNameValue ? streetNameValue : streetName}
                  onChange={(e) => setStreetName(e.target.value)}
                />
              </FormControl>
            </Stack>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Nearest Bus Stop (Landmark)
              </FormLabel>
              <Input
                h="48px"
                bg="#F7F7F7"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                color="#101828"
                _placeholder={{ color: "#667085" }}
                value={
                  busStopLandMarkValue ? busStopLandMarkValue : busStopLandMark
                }
                onChange={(e) => setBusStopLandmark(e.target.value)}
              />
            </FormControl>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Address
              </FormLabel>
              <Input
                h="48px"
                bg="#F7F7F7"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                color="#101828"
                _placeholder={{ color: "#667085" }}
                value={
                  addressValue
                    ? addressValue
                    : address
                    ? address
                    : initialAddress
                }
                onChange={(e) => setAddress(e.target.value)}
              />
            </FormControl>

            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  Country
                </FormLabel>
                <Select
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={countryValue ? countryValue : country}
                  onChange={(e) => setCountry(e.target.value)}
                >
                  <option value={153} defaultValue={"Nigerian"}>
                    Nigerian
                  </option>
                  {nationalities.map((country, i) => (
                    <option value={country.id} key={i}>
                      {" "}
                      {country.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  State of Origin
                </FormLabel>
                <Input
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={stateValue ? stateValue : state}
                  onChange={(e) => setStateValue(e.target.value)}
                ></Input>
              </FormControl>
            </Stack>

            <Stack
              w={{ base: "100%", md: "80%" }}
              direction={{ base: "column", md: "row" }}
            >
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  LGA
                </FormLabel>
                <Input
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={lgaValue ? lgaValue : lga}
                  onChange={(e) => setLga(e.target.value)}
                ></Input>
              </FormControl>
              <FormControl>
                <FormLabel
                  fontSize={{ base: "14px", md: "16px" }}
                  fontWeight={400}
                  color="#101828"
                >
                  City
                </FormLabel>
                <Input
                  h="48px"
                  bg="#F7F7F7"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={cityValue ? cityValue : city}
                  onChange={(e) => setCity(e.target.value)}
                ></Input>
              </FormControl>
            </Stack>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Email Address
              </FormLabel>
              <Input
                h="48px"
                bg="#EAECF0"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                color="#101828"
                _placeholder={{ color: "#667085" }}
                value={email}
                readOnly
              />
            </FormControl>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Alternate Email Address
              </FormLabel>
              <Input
                h="48px"
                bg="#EAECF0"
                border="1px solid #EAECF0"
                fontSize={{ base: "14px", md: "16px" }}
                color="#101828"
                _placeholder={{ color: "#667085" }}
                value={altEmailAddress}
                readOnly
              />
            </FormControl>

            <FormControl w={{ base: "100%", md: "80%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color="#101828"
              >
                Phone Number
              </FormLabel>
              <HStack spacing={2}>
                <Select
                  h="48px"
                  flex={"30%"}
                  bg="#EAECF0"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                >
                  <option value="">+234 (NG)</option>
                </Select>
                <Input
                  h="48px"
                  maxLength={10}
                  type="tel"
                  bg="#EAECF0"
                  border="1px solid #EAECF0"
                  fontSize={{ base: "14px", md: "16px" }}
                  color="#101828"
                  _placeholder={{ color: "#667085" }}
                  value={phoneNumber}
                  readOnly
                />
              </HStack>
            </FormControl>

            <Button
              onClick={handleEditContact}
              mt="24px"
              bg="#A41857"
              _hover={{ bg: "#90164D" }}
              fontSize="14px"
              fontWeight={600}
              color="#FFFFFF"
              w={{ base: "100%", md: "80%" }}
              h="48px"
              isLoading={loading}
            >
              Proceed
            </Button>
          </Stack>
        </Box>
      )}

      {step == 2 && (
        <PinComponent
          setPin={setPin}
          setStep={setPreviousStep}
          handleContinue={handleContinue}
          loading={loading}
          pin={pin}
        />
      )}

      {step == 3 && (
        <SuccessComponent
          title={"Success!"}
          description={"Your edit has been completed successfully"}
          btnTitle={"Okay, Thank You"}
          handleProceed={handleProceed}
        />
      )}

      <Modal
        isCentered
        size={"lg"}
        closeOnOverlayClick={false}
        isOpen={isOpenSample}
        onClose={onCloseSample}
      >
        <ModalOverlay />
        <ModalContent bg="transparent" boxShadow="none">
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
    </>
  );
};
