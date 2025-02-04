import { Flex, Text, Box, Image, Stack } from "@chakra-ui/react";
import styles from '../styles/Onboarding.module.css';
import { useEffect, useState } from "react";
import { getImageUrl } from '../../utils';
import { useNavigate } from 'react-router-dom';

function OnboardingScreens() {
    const [ visible, setVisible ] = useState(true);
    const [ currentIndex, setCurrentIndex ] = useState(0);
    const navigate = useNavigate()

    const changingText = [
      {
        image: "slides1.jpg",
        header: "Bank smarter, live better",
        subheading:
          "Managing your money is what we do and we are really good at it.",
      },
      {
        image: "slides2.jpeg",
        header: "Manage your money anywhere, anytime",
        subheading: "Gain access to your account with a tap",
      },
      {
        image: "slides3.jpeg",
        header: "Stay on top of your money",
        subheading:
          "BankApp provides you the ability to maintain control over your finances",
      },
      {
        image: "slides4.jpeg",
        header: "Manage your money anywhere, anytime",
        subheading: "Gain access to your account with a tap",
      },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setVisible(false);
            
            setTimeout(() => {
                setCurrentIndex((prevIndex) => (prevIndex + 1) % changingText.length);
                setVisible(true);
            }, 1000);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

  return (
    <Flex
      className={styles.image}
      bgImage={getImageUrl(`${changingText[currentIndex].image}`)}
    >
      <Flex
        className={styles.image}
        p={"50px"}
        display={{ base: "none", md: "flex" }}
        flex={"40%"}
        background={
          "linear-gradient(180deg, rgba(0, 0, 0, 0.1) 0%, #000000 100%)"
        }
        backgroundSize={"100% 100%"}
        borderRadius={"0 56px 56px 0"}
      >
        <Stack spacing={10}>
          <Box p={8} as="button" onClick={() => navigate("/")}>
            {/* <Image
              src={getImageUrl("logos/arm_logo.png")}
              w={"140px"}
              h={"auto"}
            /> */}
            BankApp
          </Box>

          <Flex
            flexDirection={"column"}
            gap={"12px"}
            h={"100%"}
            justifyContent={"end"}
            mb={"24px"}
          >
            <Text
              className={`${styles.changing} ${visible ? styles.visible : ""}`}
              fontSize={"40px"}
              fontWeight={700}
              color={"white"}
              w={"90%"}
            >
              {changingText[currentIndex].header}
            </Text>
            <Text
              className={`${styles.changing} ${visible ? styles.visible : ""}`}
              fontSize={"16px"}
              color={"white"}
              w={"90%"}
            >
              {changingText[currentIndex].subheading}
            </Text>

            <Flex gap={"4px"}>
              {changingText.map((_, idx) => (
                <Box
                  cursor={"pointer"}
                  onClick={() => setCurrentIndex(idx)}
                  key={idx}
                  bg={idx === currentIndex ? "#A41857" : "#FFFFFF"}
                  className="circle"
                  borderRadius={"500px"}
                  w={idx === currentIndex ? "28px" : "8px"}
                  h={"8px"}
                  transition={"width 1s ease-in-out"}
                />
              ))}
            </Flex>
          </Flex>
        </Stack>
      </Flex>
    </Flex>
  );
}

export default OnboardingScreens;
