import { Card, Flex, Image, Stack, Text } from "@chakra-ui/react";
import Bank from "../../assets/icons/bank.svg";
import UserCircle from "../../assets/icons/user-circle.svg";

function AccountDetails() {
  return (
    <Card p={"5"} bg={"#EAECF0"} w={"100%"} maxW={"620px"}>
      <Flex my={"3"}>
        <Image src={Bank} />

        <Stack ml={"3"}>
          <Text>ACCOUNT NUMBER</Text>
          <Text mt={"-3"} fontWeight={"bold"}>
            Guaranty Trust Bank - 0122458754
          </Text>
        </Stack>
      </Flex>
      <hr />
      <Flex my={"3"}>
        <Image src={UserCircle} />

        <Stack ml={"3"}>
          <Text>ACCOUNT HOLDER</Text>
          <Text mt={"-3"} fontWeight={"bold"}>
            Adeola Obasanjo
          </Text>
        </Stack>
      </Flex>
    </Card>
  );
}

export default AccountDetails;
