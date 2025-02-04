/* eslint-disable react/prop-types */
import {
  Button,
  Stack,
  Text,
  FormLabel,
  Select,
  Input,
  Flex,
  Switch,
  FormControl,
  useDisclosure
} from "@chakra-ui/react";
import CardContainer from "../../../elements/CardContainer";
import { BRANDCOLOR } from "../../../constants";
import AddEmployer from "../../../elements/Modals/AddEmployer";

function StaffLoan({ title, moveToOne, moveToThree }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <CardContainer title={title} moveToOne={moveToOne}>
      <Stack
        gap={"16px"}
        alignItems={"center"}
        bg={"#FFFFFF"}
        borderRadius={"0 0 12px 12px"}
        py={"5px"}
        pb={"114px"}
      >
        <Text textAlign={"center"}>Complete the details below</Text>

        <FormControl maxWidth={"600px"}>
          <FormLabel>Name of Employer</FormLabel>
          <Select
            bg={"#F7F7F7"}
            border={"1px solid #EAECF0"}
            placeholder="Eze and Sons International LTD"
            _placeholder={{ fontSize: "16px", color: "#667085" }}
          />
          <Text>
            Can&apos;t find employer?{" "}
            <Button color={BRANDCOLOR} onClick={()=>onOpen()} variant={"unstyled"}>
              Add Employer
            </Button>
          </Text>
            <AddEmployer isOpen={isOpen} close={onClose} />
         

          <FormLabel mt={5}>Staff ID</FormLabel>
          <Select
            bg={"#F7F7F7"}
            border={"1px solid #EAECF0"}
            placeholder="United Bank of Africa"
            _placeholder={{ fontSize: "16px", color: "#667085" }}
          />

          <FormLabel mt={5}>Official Email address</FormLabel>
          <Input
            bg={"#F7F7F7"}
            border={"1px solid #EAECF0"}
            _placeholder={{ fontSize: "16px", color: "#667085" }}
          />

          <Flex gap={3} my={5}>
            <Switch
              size={"lg"}
              color={"#A41856"}
              colorScheme={"#A41856"}
              sx={{
                ".chakra-switch__track[data-checked]:not([data-theme])": {
                  backgroundColor: "#A41856",
                },
              }}
              label="I agree that my details can be shared with third party organizations for the purpose of the loan."
            />
            <Text>
              I agree that my details can be shared with third party
              organizations for the purpose of the loan.
            </Text>
          </Flex>

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
            onClick={moveToThree}
          >
            Continue
          </Button>
        </FormControl>
      </Stack>
    </CardContainer>
  );
}

export default StaffLoan;
