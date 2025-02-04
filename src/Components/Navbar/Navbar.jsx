import styles from "./Navbar.module.css";
import { getImageUrl } from "../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";

export const Navbar = () => {
  let currentPath = window.location.pathname;
  const dispatch = useDispatch();

  function handleLogout() {
    window.location.href = "/signin";
  }

  const [showNav, setShowNav] = useState(false);
  const navRef = useRef(null);

  const handleClickOutside = (event) => {
    if (navRef.current && !navRef.current.contains(event.target)) {
      setShowNav(false);
    }
  };
  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  return (
    <>
      <button className={styles.showNav} onClick={() => setShowNav(!showNav)}>
        BA
      </button>
      <div
        className={`${styles.theWhole} ${showNav ? styles.hiddenWhole : ""}`}
        ref={navRef}
      >
        <div className={styles.logo}>
          <a href="/overview">
            BankApp
          </a>
          <button
            className={styles.logoTwo}
            onClick={() => setShowNav(!showNav)}
          >
            BA
          </button>
        </div>

        <div className={styles.linkList}>
          <a
            href="/overview/dashboard"
            className={
              currentPath.includes("/overview/dashboard/") ||
              currentPath === "/overview"
                ? styles.active
                : ""
            }
          >
            <img
              className={styles.grey}
              src={getImageUrl("icons/nav/dashboardGrey.png")}
            />
            <img
              className={styles.red}
              src={getImageUrl("icons/nav/dashboardRed.png")}
            />
            Dashboard
          </a>
          <a
            href="/overview/transfers"
            className={
              currentPath.includes("/overview/transfers") ? styles.active : ""
            }
          >
            <img
              className={styles.grey}
              src={getImageUrl("icons/nav/transfersGrey.png")}
            />
            <img
              className={styles.red}
              src={getImageUrl("icons/nav/transfersRed.png")}
            />
            Transfers
          </a>
          <a
            href="/overview/airtime"
            className={
              currentPath.includes("/overview/airtime") ? styles.active : ""
            }
          >
            <img
              className={styles.grey}
              src={getImageUrl("icons/nav/billsGrey.png")}
            />
            <img
              className={styles.red}
              src={getImageUrl("icons/nav/billsRed.png")}
            />
            Airtime and Bills
          </a>
          <a
            href="/overview/loans"
            className={
              currentPath.includes("/overview/loans") ? styles.active : ""
            }
          >
            <img
              className={styles.grey}
              src={getImageUrl("icons/nav/loansGrey.png")}
            />
            <img
              className={styles.red}
              src={getImageUrl("icons/nav/loansRed.png")}
            />
            Loans
          </a>
          <a
            href="/overview/savings"
            className={
              currentPath.includes("/overview/savings") ? styles.active : ""
            }
          >
            <img
              className={styles.grey}
              src={getImageUrl("icons/nav/savingsGrey.png")}
            />
            <img
              className={styles.red}
              src={getImageUrl("icons/nav/savingsRed.png")}
            />
            Savings
          </a>
          <a
            href="/overview/accounts"
            className={
              currentPath.includes("/overview/accounts") ? styles.active : ""
            }
          >
            <img
              className={styles.grey}
              src={getImageUrl("icons/nav/accountsGrey.png")}
              alt=""
            />
            <img
              className={styles.red}
              src={getImageUrl("icons/nav/accountsRed.png")}
              alt=""
            />
            My Accounts
          </a>
          <a
            href="/overview/profile"
            className={
              currentPath.includes("/overview/profile") ? styles.active : ""
            }
          >
            <img
              className={styles.grey}
              src={getImageUrl("icons/nav/profileGrey.png")}
            />
            <img
              className={styles.red}
              src={getImageUrl("icons/nav/profileRed.png")}
            />
            Profile
          </a>
        </div>

        <a onClick={handleLogout} className={styles.logOut}>
          <img src={getImageUrl("icons/nav/logout.png")} />
          Log out
        </a>
      </div>
    </>
  );
};
