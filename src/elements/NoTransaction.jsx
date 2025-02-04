import { Stack, Text } from "@chakra-ui/react";
import { getImageUrl } from "../../utils";

function NoTransaction() {
  return (
    <Stack align={"center"} py={9}>
      <img src={getImageUrl('noTrxns.svg')} style={{width: '33%', height: 'auto'}} />
      <Text fontSize={26} fontWeight={"bold"} textAlign="center">
        {" "}
        No Recent Transfers
      </Text>

      <Text fontSize='14px' color='#667085' textAlign="center">
        You do not have any recent transfers
      </Text>
    </Stack>
  );
}

export default NoTransaction;
