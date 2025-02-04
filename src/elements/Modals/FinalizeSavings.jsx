/* eslint-disable react/prop-types */
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  Button,
  Stack,
  Card,
  Flex,
  List,
  ListItem,
  Checkbox,
  ModalHeader,
} from "@chakra-ui/react";
import style from "../../Pages/SavingsPage/Savings.module.css";

function FinalizeSavings({ isOpen, close, frequency, showSuccess }) {

  const OPTIONS = [
    { title: "INTEREST RATE", value: "8% per annum" },
    { title: "MATURITY DATE", value: "25/DEC/2024" },
    { title: "ESTIMATED INTEREST", value: "₦1,040,560" },
  ];

  return (
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
        <ModalHeader>
          <Text fontWeight={"600"} textAlign={"center"}>
            Preview
          </Text>
        </ModalHeader>
        <ModalCloseButton onClick={close}></ModalCloseButton>
        <ModalBody>
          <Stack>
            <Card className={style["savings-card"]}>
              <Flex justifyContent={"space-between"}>
                <div>
                  <Text>Total Target Amount</Text>
                  <Text fontWeight={"bold"} fontSize={"18px"}>
                    {" "}
                    ₦13,000,000.00
                  </Text>
                </div>

                <div>
                  <Text>Amount to save {frequency}</Text>
                  <Text fontWeight={"bold"} fontSize={"18px"}>
                    ₦200,000.00
                  </Text>
                </div>
              </Flex>
            </Card>

            <List>
              {OPTIONS.map((option, i) => (
                <ListItem
                  borderBottom={"1px solid #EAECF0"}
                  py={"10px"}
                  key={i}
                >
                  <Flex justifyContent={"space-between"}>
                    <Text fontSize='16px' fontWeight={450} color='#667085'>{option.title}</Text>
                    <Text fontSize='16px' fontWeight={600} color='#101828'>{option.value}</Text>
                  </Flex>
                </ListItem>
              ))}
            </List>

            <Card shadow={"none"} bg={"#F7F7F7"} p={"5"}>
              <Flex>
                <div>
                <Checkbox borderRadius='8px' size='lg' colorScheme="red" _checked={{ "& .chakra-checkbox__control": { background: "#A41857" }}} />
                </div>
                <Stack ml={"2"}>
                  <Text fontSize='14px' fontWeight={700} color='#344054'>
                    I accept the terms and conditions
                  </Text>
                  <Text fontSize='14px' fontWeight={400} color='#475467'>
                    You acknowledge that you have read this{" "}
                    <span style={{ color: "#A41856", fontWeight: "bold" }}>
                      Terms & Conditions 
                    </span> and agree to all its term.
                  </Text>
                </Stack>
              </Flex>
              <Flex></Flex>
            </Card>

            <Button
              mt={"16px"}
              w={"100%"}
              h={"fit-content"}
              py={"15px"}
              px={"20px"}
              bg={"#A41856"}
              _hover={{ bg: "#90164D" }}
              color={"#FFFFFF"}
              fontSize={"14px"}
              fontWeight={600}
              onClick={showSuccess}
            >
              Create Target Savings
            </Button>
          </Stack>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default FinalizeSavings;
