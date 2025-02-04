import { Outlet } from "react-router-dom";
import { Navbar } from "../Components/Navbar/Navbar";
import { Header } from "../Components/Header/Header";
import { Footer } from "../Components/Footer";
import { Box, useDisclosure } from "@chakra-ui/react";
import styles from "../App.module.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Cookies } from "../Components/Cookies";

export const DashboardLayout = () => {
  const navigate = useNavigate();

  const {
    isOpen: isOpenCookies,
    onOpen: onOpenCookies,
    onClose: onCloseCookies,
  } = useDisclosure();

  useEffect(() => {
    // Check if authToken is present in session storage
    const authToken = sessionStorage.getItem("authToken");

    // If authToken is not present, redirect to sign-in page
    if (!authToken) {
      // navigate("/signin");
    }
    if (!localStorage.getItem("ACCEPT-COOKIES")) {
      onOpenCookies();
    }
  }, [navigate, onOpenCookies]);

  const hasAcceptCookies = () => {
    onCloseCookies();
    localStorage.setItem("ACCEPT-COOKIES", true);
  };

  return (
    <>
      <Header />

      <div className={styles.withNav}>
        <Navbar />
        <Box width={"100%"} bgColor={"#FCFCFC"}>
          <Outlet />
          {/* <Footer /> */}
        </Box>

        <Cookies
          isOpen={isOpenCookies}
          onClose={onCloseCookies}
          hasAcceptCookies={hasAcceptCookies}
        />
      </div>
    </>
  );
};
