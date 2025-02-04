/* eslint-disable react/prop-types */
import { Button, Card, Text, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import styles from "./styling.module.css";

function RepaymentAmount({ amount }) {

  const { isOpen: isOpenSchedule, onOpen: onOpenSchedule, onClose: onCloseSchedule } = useDisclosure();

  const schedule = [
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    },
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    },
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    },
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    },
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    },
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    },
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    },
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    },
    {
      date: '16/08/2024',
      starting_balance: 1100500,
      principal: 1100500,
      interest: 1100500,
      total_repayment: 1100500,
      final_balance: 1100500
    }
  ]

  const formatNumber = (number) => {
    return new Intl.NumberFormat('en-US').format(number);
  };


  return (
    <>
    <Card py={"5"} bg={"#667085"} alignItems='center' gap='8px'>
      <Text textAlign={"center"} color={"white"}>
        TOTAL REPAYMENT AMOUNT
      </Text>
      <Text
        textAlign={"center"}
        color={"white"}
        fontWeight={"600"}
        fontSize={"large"}
      >
        {" "}
        {amount}{" "}
      </Text>
      <Button onClick={onOpenSchedule} bg='#EFECE9' color='#667085' _hover={{bg: '#E3E1DE'}} w='fit-content' fontSize='16px' fontWeight={500}>See Loan Repayment Schedule</Button>
    </Card>


    <Modal isCentered size='xl' closeOnOverlayClick={false} isOpen={isOpenSchedule} onClose={onCloseSchedule} >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <Text textAlign='center' fontSize='18px' fontWeight={600} color='#101828'>Loan Repayment Schedule</Text>
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <div style={{ overflow: 'auto', maxHeight: '60vh' }}>

          <div style={{ border: '1px solid #EBEBEB', borderRadius: '12px' }}>
            <table className={styles.schTable}>
              <thead>
                <th>Date</th>
                <th>Starting Balance</th>
                <th>Principal</th>
                <th>Interest</th>
                <th>Total Repayment</th>
                <th>Final Balance</th>
              </thead>

              <tbody>
                {schedule.map((sch, i) => (
                  <tr>
                    <td>{sch.date}</td>
                    <td>₦{formatNumber(sch.starting_balance)}</td>
                    <td>₦{formatNumber(sch.principal)}</td>
                    <td>₦{formatNumber(sch.interest)}</td>
                    <td>₦{formatNumber(sch.total_repayment)}</td>
                    <td>₦{formatNumber(sch.final_balance)}</td>
                  </tr>
                ))}
                <tr>

                </tr>
              </tbody>
            </table>
          </div>
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>

    </>
  );
}

export default RepaymentAmount;
