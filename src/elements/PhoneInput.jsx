/* eslint-disable react/prop-types */
import { HStack, Select, Input } from "@chakra-ui/react";

function PhoneInput({ onChange }) {
  return (
    <HStack spacing={2}>
      <Select
        flex={"35%"}
        border={"1px solid #EAECF0"}
        bg={"#F7F7F7"}
        fontSize={"16px"}
      >
        <option value="">+234 (NG)</option>
      </Select>
      <Input
        type="tel"
        placeholder="Enter your phone number"
        _placeholder={{ fontSize: "sm" }}
        border={"1px solid #EAECF0"}
        bg={"#F7F7F7"}
        onChange={onChange}
      />
    </HStack>
  );
}

export default PhoneInput;
