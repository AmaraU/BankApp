/* eslint-disable react/prop-types */

import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerCloseButton,
  Button,
  DrawerHeader,
  DrawerFooter,
} from "@chakra-ui/react";
// import styles from "./Cookies.module.css";

export const Cookies = ({ isOpen, onClose, hasAcceptCookies }) => {
  const handleClose = () => {
    onClose();
  };

  return (
    <>
      <Drawer
        isOpen={isOpen}
        placement="bottom"
        onClose={handleClose}
        size={"md"}
      >
        {/* <DrawerOverlay /> */}
        <DrawerContent bg="#7047D9" color="#FFFFFF" py="14px" px="36px">
          <DrawerHeader p={0} fontSize="24px">
            How We Use Your Cookies
          </DrawerHeader>
          <DrawerCloseButton />

          <DrawerBody fontSize="14px" p={0} mt="14px">
            This site uses cookies to improve your experience and values your
            privacy. Deleting cookies will reset your preferences, treating you
            as a new visitor when you visit again. We use cookies to provide a
            secure environment, offer requested product/services, enhance
            performance, and tailor offerings to your needs for a better online
            experience.
          </DrawerBody>

          <DrawerFooter alignSelf="flex-start" gap="36px" p={0} mt="24px">
            <Button
              onClick={hasAcceptCookies}
              bg="#FFFFFF"
              border="none"
              py="18px"
              w="180px"
              borderRadius="10px"
              fontSize="16px"
              color="#7047D9"
              _hover={{ bg: "#f2eeff" }}
            >
              Yes, I accept
            </Button>

            <Button
              onClick={onClose}
              bg="#7047D9"
              border="1px solid #FFFFFF"
              py="18px"
              w="180px"
              borderRadius="10px"
              fontSize="16px"
              color="#FFFFFF"
              _hover={{ bg: "#7c55de" }}
            >
              No, reject all
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
