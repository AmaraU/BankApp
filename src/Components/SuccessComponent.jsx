/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  Center,
  Flex,
  HStack,
  Stack,
  Text,
} from "@chakra-ui/react";
import SuccessIcon from "../../assets/icons/success.png";

function SuccessComponent({ title, description, btnTitle, handleProceed, isNoHeading }) {
  return (
    <Box textAlign={"center"}>
      {!isNoHeading && <HStack bg="#EAECF0" px="26px" py="25px" borderRadius="12px 12px 0 0">
        <Text
          width="90%"
          textAlign="center"
          fontSize="18px"
          fontWeight={600}
          color="#101828"
        ></Text>
      </HStack>}
      <Flex
        spacing="24px"
        alignItems="center"
        border="1px solid #EFECE9"
        bg="#FFFFFF"
        borderRadius="0 0 12px 12px"
        px="16px"
        pb="114px"
        pt="24px"
        textAlign={"center"}
        justify={"center"}
      >
        <Stack>
          <Center>
            <img style={{ width: "200px", height: "auto" }} src={SuccessIcon} />
          </Center>

          <Text fontWeight={"bold"} fontSize={"26px"}>
            {title}
          </Text>
          <Text> {description}</Text>

          <Button
            mt="16px"
            w="100%"
            h="48px"
            bg="#A41856"
            _hover={{ bg: "#A41856" }}
            color="#FFFFFF"
            fontSize="14px"
            fontWeight={600}
            onClick={handleProceed}
          >
            {btnTitle}
          </Button>
        </Stack>
      </Flex>
    </Box>
  );
}

export default SuccessComponent;
