import {
  Box,
  Button,
  Flex,
  HStack,
  Stack,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalCloseButton,
  ModalFooter,
  useDisclosure,
  Spinner,
  CircularProgress,
  CircularProgressLabel,
} from "@chakra-ui/react";
import { useState } from "react";
import { getImageUrl } from "../../../utils";
import { useLocation, useNavigate } from "react-router-dom";

import styles from "./Onboarding.module.css";
import authService from "../../services/authService";
import { useSelector } from "react-redux";
// import { handleErrors } from "../../utils/handleResponse";

export const ConfirmSelfie = () => {
  const {
    isOpen: isOpenVerifying,
    onOpen: onOpenVerifying,
    onClose: onCloseVerifying,
  } = useDisclosure();
  const {
    isOpen: isOpenResult,
    onOpen: onOpenResult,
    onClose: onCloseResult,
  } = useDisclosure();
  const [header, setHeader] = useState("Successful");
  const [text, setText] = useState(
    "Your photo has been successfully submitted"
  );
  const [buttonText, setButtonText] = useState("Continue");
  const location = useLocation();
  const { croppedImage } = location.state || {};
  const navigate = useNavigate();
  const { bvn, nin, photo, firstname, othername, surname, email } = useSelector(
    (state) => state.auth
  );
  const [succeed] = useState(true);
  const [qoreIdData, setQoreIdData] = useState({
    clientId: "IJR69VDR8HX2ZWOF4EDP",
    flowId: "",
    productCode: "",
    customerReference: "",
    applicantData: "",
    identityData: "",
    addressData: "",
    ocrAcceptedDocuments: "",
  });

  const openVerifying = () => {
    onOpenVerifying();
      onOpenResult();
      onCloseVerifying();
      setHeader("Successful");
      setText("Your photo has been successfully submitted");
      setButtonText("Continue");
      console.log(response);
  };

  if (!croppedImage) {
    return (
      <div>
        <h1>No Image Captured</h1>
        <button onClick={() => navigate("/capture")}>Go Back</button>
      </div>
    );
  }

  return (
    <>
      <Stack
        alignItems="center"
        spacing={10}
        py={"38px"}
        px={{base: "24px", md: "15%", lg: "25%"}}
        bgImage={getImageUrl("onboardingBackground.png")}
        bgSize="100% 100%"
      >
        <Flex justifyContent={"space-between"} w={"100%"}>
          <a href="/capture">
            <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
          </a>
          <CircularProgress value={50} size={"32px"} color={"#A41857"}>
            <CircularProgressLabel fontWeight={700} fontSize={"9px"}>
              50%
            </CircularProgressLabel>
          </CircularProgress>
        </Flex>
        <Stack alignItems={"center"}>
          <Text fontSize={{base: "24px", md: "48px"}} fontWeight={700} color={"#14142A"}>
            Preview your photo
          </Text>
          <Text fontSize={{base: "12px", md: "18px"}} fontWeight={400} color={"#667085"}>
            Make sure your face is clearly shown
          </Text>
        </Stack>

        <Box maxW={"322px"} maxH={"322px"} bg={"#0E0E0E"} borderRadius={"500px"}>
          <img className={styles.captured} src={croppedImage} alt="Captured" />
        </Box>

        <HStack spacing={2} w={"100%"}>
          <Button
            onClick={() => navigate("/capture")}
            w={"100%"}
            borderRadius={"8px"}
            bg={"#EFECE9"}
            _hover={{ bg: "#E3E1DE" }}
            p={"20px"}
            color={"#667085"}
            fontSize={"14px"}
            fontWeight={600}
          >
            Retake
          </Button>
          <Button
            onClick={openVerifying}
            w={"100%"}
            borderRadius={"8px"}
            bg={"#A41856"}
            _hover={{ bg: "#90164D" }}
            p={"20px"}
            color={"#FFFFFF"}
            fontSize={"14px"}
            fontWeight={600}
          >
            Use this
          </Button>
        </HStack>

        <qoreid-button
          id="QoreIDButton"
          clientId={qoreIdData.clientId}
          flowId={qoreIdData.flowId}
          productCode={qoreIdData.productCode}
          customerReference={qoreIdData.customerReference}
          applicantData={qoreIdData.applicantData}
          identityData={qoreIdData.identityData}
          addressData={qoreIdData.addressData}
          ocrAcceptedDocuments={qoreIdData.ocrAcceptedDocuments}
          onQoreIDSdkSubmitted={() => console.log("QoreID Submitted")}
          onQoreIDSdkError={(error) => console.error("QoreID Error:", error)}
          onQoreIDSdkClosed={() => console.log("QoreID Closed")}
          hideButton="yes"
        ></qoreid-button>
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
          justifyContent={"center"}
          w={"fit-content"}
          height={"200px"}
        >
          <Stack p={3} alignItems={"center"} spacing={8}>
            <Spinner w={"30px"} h={"30px"} speed="1s" emptyColor="grey" />
            <Text fontSize={"14px"} fontWeight={500} color={"#0C111D"}>
              Verifying your identity
            </Text>
          </Stack>
        </ModalContent>
      </Modal>

      <Modal
        isCentered
        closeOnOverlayClick={false}
        isOpen={isOpenResult}
        onClose={onCloseResult}
      >
        <ModalOverlay />
        <ModalContent rounded={15} w={"700px"}>
          <ModalHeader>
            <Text textAlign={"center"} fontSize={"18px"}>
              Likeness Check
            </Text>
          </ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={2}>
            <div style={{ overflow: "auto", maxHeight: "60vh" }}>
              <Stack spacing={4} alignItems={"center"} textAlign={"center"}>
                {succeed ? (
                  <img
                    src={getImageUrl("icons/success.png")}
                    style={{ width: "220px", height: "86px" }}
                  />
                ) : (
                  <img
                    src={getImageUrl("icons/failure.png")}
                    style={{ width: "80px", height: "80px" }}
                  />
                )}
                <Text fontSize={"20px"} fontWeight={700} color={"#0C111D"}>
                  {header}
                </Text>
                <Text fontSize={"14px"} fontWeight={400} color={"#667085"}>
                  {text}
                </Text>
              </Stack>
            </div>
          </ModalBody>
          <ModalFooter>
            <Stack w={"100%"} pb={2}>
              <Button
                onClick={
                  succeed
                    ? () => navigate("/user-info")
                    : () => navigate("/capture")
                }
                bg={"#A41856"}
                py={"12px"}
                color={"#FFFFFF"}
                fontSize={"14px"}
                fontWeight={600}
                _hover={{ bg: "#90164D" }}
              >
                {buttonText}
              </Button>
            </Stack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
