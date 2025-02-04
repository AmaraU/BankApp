/* eslint-disable react/prop-types */

import { useState } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  Input,
  Select,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { CompleteTransaction } from "../../Components/CompleteTrans";
import { useDispatch, useSelector } from "react-redux";
import transferService from "../../services/transferService";
import { encrypt } from "../../utils/encrypt";
import { getAccountBalance } from "../../store/auth/user.slice";

export const TransferToSelf = ({ accounts }) => {
  const [showOne, setShowOne] = useState(true);
  const [showTwo, setShowTwo] = useState(false);
  const [credit, setCredit] = useState("");
  const [debit, setDebit] = useState("");
  const [amount, setAmount] = useState(0);
  const [narration, setNarration] = useState("");
  const [loading, setLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailed, setIsFailed] = useState(false);
  const [enterPin, setEnterPin] = useState(true);
  const [otherAccounts, setOtherAccounts] = useState([]);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const moveToOne = () => {
    setShowOne(true);
    setShowTwo(false);
    window.scrollTo({ top: 0 });
  };
  const moveToTwo = () => {
    setShowOne(false);
    setShowTwo(true);
    window.scrollTo({ top: 0 });
  };

  const setAccountDebit = (e) => {
    setDebit(e);
    const otherAccount = accounts.filter(
      (account) => account.accountnumber != e
    );
    setOtherAccounts(otherAccount);
  };

  const completeTransaction = async (e) => {
    const { pin } = e;
    console.log("credit", credit);
    console.log("debit", debit);
    console.log("narration", narration);

    const payload = await encrypt({
      amount,
      acct_number: user.casaAccountBalances[0]?.accountnumber,
      recipient_account: user.casaAccountBalances[0]?.accountnumber,
      recipient_name: user.casaAccountBalances[0]?.accountname,
      bank_name: "The bank",
      pin,
      username: user.username,
      type: "2",
    });

    try {
      setLoading(true);
      const response = await transferService.transferFunds({
        encRequest: payload.encRequest,
        detailsRequest: payload.detailsRequest,
      });
      console.log(response);
      setIsSuccess(true);
      setEnterPin(false);
      setLoading(false);
    } catch {
      setEnterPin(false);
      setIsFailed(true);
      setLoading(false);
    }
  };

  const backToSaving = async () => {
    await dispatch(getAccountBalance());
    setIsSuccess(false);
    setEnterPin(true);
    setIsFailed(false);
    moveToOne();
  };

  return (
    <>
      {showOne && (
        <Box>
          <HStack
            bg={"#EAECF0"}
            justifyContent={"space-between"}
            px={{ base: "14px", md: "26px" }}
            py={"14px"}
            borderRadius={"12px 12px 0 0"}
          >
            <Button h={"24px"} bg={"#EAECF0"} p={0} _hover={{ bg: "#EAECF0" }}>
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              textAlign="center"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              Transfer to Self
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              1/2
            </Text>
          </HStack>
          <Stack
            spacing={"20px"}
            alignItems={"center"}
            border={"1px solid #EFECE9"}
            bg={"#FFFFFF"}
            borderRadius={"0 0 12px 12px"}
            pt={"16px"}
            pb={"114px"}
            px="12px"
          >
            <Text
              fontSize={{ base: "14px", md: "16px" }}
              color={"#667085"}
              textAlign={"center"}
            >
              Input the transaction details below
            </Text>

            <FormControl w={{ base: "100%", md: "75%" }} isRequired>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color={"#101828"}
              >
                Account to Debit
              </FormLabel>
              <Select
                h={"48px"}
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                fontSize={{ base: "14px", md: "16px" }}
                placeholder="Select account"
                _placeholder={{ color: "#667085" }}
                onChange={(e) => setAccountDebit(e.target.value)}
              >
                {accounts &&
                  accounts.map((account, i) => (
                    <option value={account.accountnumber} key={i}>
                      {" "}
                      {account.accountnumber} - {account.acctProduct}
                    </option>
                  ))}
              </Select>
            </FormControl>

            <FormControl w={{ base: "100%", md: "75%" }} isRequired>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color={"#101828"}
              >
                Account to Credit
              </FormLabel>
              <Select
                h={"48px"}
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                placeholder="Select account"
                fontSize={{ base: "14px", md: "16px" }}
                _placeholder={{ color: "#667085" }}
                onChange={(e) => setCredit(e.target.value)}
              >
                {otherAccounts &&
                  otherAccounts.map((account, i) => (
                    <option value={account.accountnumber} key={i}>
                      {" "}
                      {account.accountnumber} - {account.acctProduct}
                    </option>
                  ))}
              </Select>
            </FormControl>

            <FormControl w={{ base: "100%", md: "75%" }} isRequired>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color={"#101828"}
              >
                Amount
              </FormLabel>
              <Input
                h={"48px"}
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                fontSize={{ base: "14px", md: "16px" }}
                _placeholder={{ color: "#667085" }}
                placeholder="₦0.00"
                type={"number"}
                inputMode="numberic"
                onChange={(e) => setAmount(e.target.value)}
              ></Input>
            </FormControl>

            <HStack
              w={{ base: "100%", md: "75%" }}
              justifyContent={"space-between"}
            >
              <HStack>
                <img src={getImageUrl("icons/warning.png")} />
                <Text
                  fontSize={{ base: "12px", md: "14px" }}
                  fontWeight={500}
                  color={"#667085"}
                >
                  Your daily transfer limit is ₦200,000
                </Text>
              </HStack>
              <Text
                cursor={"pointer"}
                fontSize={{ base: "12px", md: "14px" }}
                fontWeight={500}
                color={"#A41857"}
              >
                Increase your transfer limit
              </Text>
            </HStack>

            <FormControl w={{ base: "100%", md: "75%" }}>
              <FormLabel
                fontSize={{ base: "14px", md: "16px" }}
                fontWeight={400}
                color={"#101828"}
              >
                Note (Optional)
              </FormLabel>
              <Input
                h={"48px"}
                bg={"#F7F7F7"}
                border={"1px solid #EAECF0"}
                fontSize={{ base: "14px", md: "16px" }}
                onChange={(e) => setNarration(e.target.value)}
              ></Input>
            </FormControl>

            <Button
              onClick={moveToTwo}
              mt={"16px"}
              w={{ base: "100%", md: "75%" }}
              h={"48px"}
              bg={"#A41856"}
              color={"#FFFFFF"}
              fontSize={"14px"}
              fontWeight={600}
              _hover={{ bg: "#90164D" }}
              isDisabled={!debit || !credit || !amount}
            >
              Continue
            </Button>
          </Stack>
        </Box>
      )}

      {showTwo && (
        <Box>
          <HStack
            bg={"#EAECF0"}
            justifyContent={"space-between"}
            px={{ base: "14px", md: "26px" }}
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
              <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
            </Button>
            <Text
              textAlign="center"
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              Complete Transaction
            </Text>
            <Text
              fontSize={{ base: "16px", md: "18px" }}
              fontWeight={600}
              color={"#101828"}
            >
              2/2
            </Text>
          </HStack>

          <CompleteTransaction
            type="transaction"
            handleSubmit={completeTransaction}
            loading={loading}
            isSuccess={isSuccess}
            isFailed={isFailed}
            enterPin={enterPin}
            backToSaving={backToSaving}
          />
        </Box>
      )}
    </>
  );
};
