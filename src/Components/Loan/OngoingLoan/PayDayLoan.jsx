/* eslint-disable react/prop-types */
import {
  Box,
  HStack,
  Button,
  Text,
  Stack,
  FormControl,
  FormLabel,
  Select,
  Input,
  Switch,
  Flex,
} from "@chakra-ui/react";
import BackIcon from "../../../../assets/icons/blackLeftArrow.png";

function PayDayLoan({ moveToOne, moveToThree }) {
  return (
    <Box>
      <HStack
        bg={"#EAECF0"}
        justifyContent={"space-between"}
        px={"26px"}
        py={"14px"}
        borderRadius={"12px 12px 0 0"}
      >
        <Button
          h={"24px"}
          bg={"#EAECF0"}
          p={0}
          _hover={{ bg: "#EAECF0" }}
          onClick={moveToOne}
        >
          <img src={BackIcon} alt="back" />
        </Button>
        <Text fontSize={"18px"} fontWeight={600} color={"#101828"}>
          Pay Day Loan
        </Text>
        <Text fontSize={"18px"} fontWeight={600} color={"#101828"}></Text>
      </HStack>
      <Stack
        gap={"16px"}
        alignItems={"center"}
        border={"1px solid #EFECE9"}
        bg={"#FFFFFF"}
        borderRadius={"0 0 12px 12px"}
        py={"16px"}
        pb={"114px"}
      >
        <Text fontSize={"16px"} color={"#667085"} textAlign={"center"}>
          Kindly provide your salary bank account
        </Text>

        <FormControl maxWidth={"600px"}>

          <FormLabel mt={5} fontSize='16px' fontWeight={400} color='#101828'>Bank Name</FormLabel>
          <Select
            bg={"#F7F7F7"}
            border={"1px solid #EAECF0"}
            placeholder="United Bank of Africa"
            _placeholder={{ fontSize: "16px", color: "#667085" }}
          />

          <FormLabel mt={5} fontSize='16px' fontWeight={400} color='#101828'>Account Number</FormLabel>
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
    </Box>
  );
}

export default PayDayLoan;
