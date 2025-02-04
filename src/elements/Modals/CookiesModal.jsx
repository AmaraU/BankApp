/* eslint-disable react/prop-types */
import {
    FormControl,
    FormLabel,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text,
    Input,
    Button,
    Stack,
    ModalHeader,
    useDisclosure,
    ModalFooter,
} from "@chakra-ui/react";
import PrivacyPolicyModal from "./PrivacyPolicyModal";
import { getImageUrl } from "../../../utils";

function CookiesModal({ isOpen, close }) {

    const {
        isOpen: isOpenPP,
        onOpen: onOpenPP,
        onClose: onClosePP,
    } = useDisclosure();


    const handlePrivayPolicy = () => {
        onOpenPP();
        close();

    }

    return (
        <>
        <Modal
            isCentered
            size={"xl"}
            closeOnOverlayClick={false}
            isOpen={isOpen}
            maxHeight={"70%"}
            onClose={close}
        >
            <ModalOverlay />

            <ModalContent>
                <ModalHeader></ModalHeader>
                <ModalCloseButton onClick={close}></ModalCloseButton>

                <ModalBody p={0}>
                    <Stack py='16px' px='40px' gap='8px' textAlign='center'>

                        <img src={getImageUrl('icons/cookie.svg')} style={{ height: '80px', width: '80px', alignSelf: 'center' }} alt="" />

                        <Text fontSize='18px' fontWeight={700}>Our website uses cookies</Text>

                        <Text fontSize='14px' fontWeight={400}>
                            This site uses cookies to improve your experience and values your privacy.
                            Deleting cookies will reset your preferences, treating you as a new visitor when you visit again.
                            We use cookies to provide a secure environment, offer requested products/services, enhance performance, and tailor offerings to your needs for a better online experience.
                            <a onClick={()=>handlePrivayPolicy()} style={{ color:"#A41857", fontWeight:600, cursor: 'pointer' }}> Check Privacy Policy</a>
                        </Text>

                    </Stack>
                </ModalBody>

                <ModalFooter w='100%' display='flex' flexDirection="column" >
                    <Button
                        w='100%'
                        h="48px"
                        rounded={"8px"}
                        py={"26px"}
                        px={"16px"}
                        size="md"
                        bg={"#A41857"}
                        color={"white"}
                        _hover={{
                            bg: "#90164D",
                        }}
                        onClick={close}
                    >
                        Accept Cookies
                    </Button>
                    <Button
                        mt={"5px"}
                        w={"100%"}
                        h="48px"
                        rounded={"8px"}
                        py={"26px"}
                        px={"16px"}
                        size="md"
                        bg={"#EFECE9"}
                        _hover={{ bg: "#E3E1DE" }}
                        onClick={close}
                    >
                        Decline
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>

        <PrivacyPolicyModal
            isOpen={isOpenPP}
            close={onClosePP}
        />

        </>
    );
}

export default CookiesModal;