/* eslint-disable react/prop-types */
import { HStack, PinInput, PinInputField } from "@chakra-ui/react";

function OtpInput({ length, size, setOtp }) {
  return (
    <HStack>
      <PinInput onChange={(e) => setOtp(e)} placeholder={""} size={"lg"} mask>
        {Array.from({ length })
          .fill(null)
          .map((_, i) => (
            <PinInputField
              key={i}
              bg={"#F7F7F7"}
              height={"72px"}
              width={"108px"}
              size={size}
              fontWeight={"extrabold"}
            />
          ))}
      </PinInput>
    </HStack>
  );
}

export default OtpInput;
