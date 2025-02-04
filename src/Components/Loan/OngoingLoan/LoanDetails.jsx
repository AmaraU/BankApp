/* eslint-disable react/prop-types */
import CardContainer from "../../../elements/CardContainer";
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Stack, Text, useDisclosure } from "@chakra-ui/react";
import LoanCard from "../../../elements/LoanCard";
import RepaymentAmount from "../../../elements/RepaymentAmount";
import { getImageUrl } from "../../../../utils";

function LoanDetails({ moveToOne, title, moveNext }) {

  const { isOpen: isOpenMandate, onOpen: onOpenMandate, onClose: onCloseMandate } = useDisclosure();

  return (
    <>
    <CardContainer moveToOne={moveToOne} title={title}>
      <Text maxW={"630"} textAlign={"center"}>
        Congratulations your loan has been granted, see details below.
        See details below and accept the terms to continue
      </Text>
      <Stack maxW={632} w={"100%"}>
        <LoanCard />

        <RepaymentAmount amount={"₦230,000"} />

        <Stack mt={"10"}>
          <Button bg={"#A41856"} color={"white"} onClick={onOpenMandate} _hover={{ bg: "#90164D" }}>
            {" "}
            Accept{" "}
          </Button>
          <Button bg={"#EFECE9"} color={"#667085"} _hover={{ bg: "#E3E1DE" }}>
            {" "}
            Reject{" "}
          </Button>
        </Stack>
      </Stack>
    </CardContainer>


    <Modal isCentered size='xl' closeOnOverlayClick={true} isOpen={isOpenMandate} onClose={onCloseMandate}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader />
        <ModalCloseButton />
        <ModalBody px='40px' py='16px'>
          <div style={{ overflow: 'auto', maxHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <img src={getImageUrl('icons/caution.png')} style={{ width: '66px', height: '66px' }} />
            <Text fontSize='20px' fontWeight={700} color='#0C111D' mt="24px">Direct Debit Mandate</Text>

            <Text textAlign='center' fontSize='14px' fontWeight={450} color='#667085' mt='24px'>Before your loan is disbursed, please provide two active bank accounts as back up. These Bank accounts <b>WILL NOT</b> be debited as long as your loan repayment is successful.</Text>
            <Text textAlign='center' fontSize='14px' fontWeight={450} color='#667085' mt='16px'>These bank accounts serve as back-up repayment sources in cases your primary repayment fails. We have included your salary account. Kindly add one more.</Text>
          </div>
        </ModalBody>
        <ModalFooter pt={0}>
          <Button w='100%' h='48px' bg='#A41856' _hover={{bg: '#90164D'}} color='#FFFFFF' onClick={moveNext}>Proceed to add account</Button>
        </ModalFooter>
      </ModalContent>

    </Modal>
    </>
  );
}

export default LoanDetails;
