/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import {
  Stack,
  Text,
  Box,
  Button,
  HStack,
  FormControl,
  FormLabel,
  Input,
  Select,
} from "@chakra-ui/react";
import { getImageUrl } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { getSecurityQuestions } from "../../store/utils.slice";
import authService from "../../services/authService";

export const SecurityQuestions = ({ moveToSetup, proceed, isNotShowNumber }) => {
  const dispatch = useDispatch();
  const { securityQuestions } = useSelector((state) => state.utils);
  const [question1, setQuestion1] = useState("");
  const [question2, setQuestion2] = useState("");
  const [question3, setQuestion3] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [loading, setLoading] = useState(false);
  const [allSecurityQuestions, setSecurityQuestions] = useState([]);
  const [securityQuestions3, setSecurityQuestions3] = useState([]);

  useEffect(() => {
    dispatch(getSecurityQuestions());
  }, [dispatch]);

  const handleProceed = async () => {
    setLoading(true);
    try {
      const response = await authService.setSecurityQuestion({
        userQAChioce: [
          {
            questionID: parseInt(question1),
            answer: answer1,
          },
          {
            questionID: parseInt(question2),
            answer: answer2,
          },
          {
            questionID: parseInt(question3),
            answer: answer3,
          },
        ],
      });
      console.log(response);
      proceed();
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const setSecurityQuestion1 = (e) => {
    setQuestion1(e); 
    const securityQuestionsValue = securityQuestions.filter(
      (question) => question.id != e
    );
    setSecurityQuestions(securityQuestionsValue); 
  };

  const setSecurityQuestion2 = (e) => {
    setQuestion2(e);
    const securityQuestionsValue = allSecurityQuestions.filter(
      (question) => question.id != e
    );
    setSecurityQuestions3(securityQuestionsValue);
  };

  return (
    <>
      <Box>
        <HStack
          bg={"#EAECF0"}
          justifyContent={"space-between"}
          px={{base: "14px", md: "26px"}}
          py={"14px"}
          borderRadius={"12px 12px 0 0"}
          gap={0}
        >
          <Button
            h={"24px"}
            bg={"#EAECF0"}
            p={0}
            _hover={{ bg: "#EAECF0" }}
            onClick={moveToSetup}
          >
            <img src={getImageUrl("icons/blackLeftArrow.png")} alt="back" />
          </Button>
          <Text textAlign="center" fontSize={{base: "14px", md: "18px"}} fontWeight={600} color={"#101828"}>
            Security Questions
          </Text>
          <Text fontSize={{base: "14px", md: "18px"}} fontWeight={600} color={"#101828"}>
            {!isNotShowNumber ? '2/3':''}
          </Text>
        </HStack>
        <Stack
          spacing="16px"
          alignItems="center"
          border="1px solid #EFECE9"
          bg="#FFFFFF"
          borderRadius="0 0 12px 12px"
          px="16px"
          pb="54px"
          pt="24px"
        >
          <Text textAlign="center" fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#667085">
            Select security question and answer that you will remember
          </Text>

          <FormControl w={{base: "100%", md: "80%"}}>
            <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
              Security Question 1
            </FormLabel>
            <Select
              h="48px"
              bg="#F7F7F7"
              border="1px solid #EAECF0"
              fontSize={{base: "14px", md: "16px"}}
              color="#101828"
              value={question1}
              onChange={(e) => setSecurityQuestion1(e.target.value)}
            >
              <option selected hidden>
                Select a security question
              </option>
              {securityQuestions.map((option, i) => (
                <option key={i} value={option.id}>
                  {option.secret_Question}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl w={{base: "100%", md: "80%"}}>
            <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
              Answer 1
            </FormLabel>
            <Input
              h="48px"
              bg="#F7F7F7"
              border="1px solid #EAECF0"
              fontSize={{base: "14px", md: "16px"}}
              color="#101828"
              value={answer1}
              onChange={(e) => setAnswer1(e.target.value)}
            />
          </FormControl>

          <FormControl w={{base: "100%", md: "80%"}}>
            <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
              Security Question 2
            </FormLabel>
            <Select
              h="48px"
              bg="#F7F7F7"
              border="1px solid #EAECF0"
              fontSize={{base: "14px", md: "16px"}}
              color="#101828"
              onChange={(e) => setSecurityQuestion2(e.target.value)}
            >
              <option selected disabled>
                Select a security question
              </option>
              {allSecurityQuestions.map((option, i) => (
                <option key={i} value={option.id}>
                  {option.secret_Question}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl w={{base: "100%", md: "80%"}}>
            <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
              Answer 2
            </FormLabel>
            <Input
              h="48px"
              bg="#F7F7F7"
              border="1px solid #EAECF0"
              fontSize={{base: "14px", md: "16px"}}
              color="#101828"
              value={answer2}
              onChange={(e) => setAnswer2(e.target.value)}
            />
          </FormControl>

          <FormControl w={{base: "100%", md: "80%"}}>
            <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
              Security Question 3
            </FormLabel>
            <Select
              h="48px"
              bg="#F7F7F7"
              border="1px solid #EAECF0"
              fontSize={{base: "14px", md: "16px"}}
              color="#101828"
              onChange={(e) => setQuestion3(e.target.value)}
            >
              <option selected disabled hidden>
                Select a security question
              </option>
              {securityQuestions3.map((option, i) => (
                <option key={i} value={option.id}>
                  {option.secret_Question}
                </option>
              ))}
            </Select>
          </FormControl>

          <FormControl w={{base: "100%", md: "80%"}}>
            <FormLabel fontSize={{base: "14px", md: "16px"}} fontWeight={400} color="#101828">
              Answer 3
            </FormLabel>
            <Input
              h="48px"
              bg="#F7F7F7"
              border="1px solid #EAECF0"
              fontSize={{base: "14px", md: "16px"}}
              color="#101828"
              value={answer3}
              onChange={(e) => setAnswer3(e.target.value)}
            />
          </FormControl>

          <Button
            onClick={handleProceed}
            mt="16px"
            bg="#A41857"
            _hover={{ bg: "#90164D" }}
            fontSize="14px"
            fontWeight={600}
            color="#FFFFFF"
            w={{base: "100%", md: "80%"}}
            h="48px"
            isDisabled={!answer1 || !answer2 || !answer3}
            isLoading={loading}
          >
            Proceed
          </Button>
        </Stack>
      </Box>
    </>
  );
};
