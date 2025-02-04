import styles from "./Header.module.css";
import { getImageUrl } from "../../../utils";
import { useSelector } from "react-redux";
import { useState } from "react";

export const Header = () => {
  // const { fullname } = useSelector((state) => state.user);
  const [ showNotif, setShowNotif ] = useState(false);

  const notifications = [
    {
      title: 'Account Credited',
      details: "You've received a credit transfer of ₦100,500 from Jonah Jameson",
      time: '5h ago',
      read: false,
    },
    {
      title: 'Transfer Successful',
      details: "Your transfer of ₦100,500 to Angela Folarin was successful.",
      time: '5h ago',
      read: false,
    },
    {
      title: 'Airtime Purchase Successful',
      details: "You made MTN airtime purchase of ₦100,500 to 08101790957",
      time: '5h ago',
      read: false,
    },
    {
      title: 'Account Credited',
      details: "You've received a credit transfer of ₦100,500 from Jonah Jameson",
      time: 'Yesterday',
      read: true,
    },
    {
      title: 'Transfer Successful',
      details: "Your transfer of ₦100,500 to Adeola Obasanjo was successful",
      time: '04-Oct-2024',
      read: true,
    },
  ]

  const toNotifsPage = () => {
    window.location.href = "/overview/dashboard/notifications";
  }

  return (
    <div className={styles.header}>
      <div className={styles.whole}>
        <div className={styles.buttons}>
          <button>
            <img src={getImageUrl("icons/header/brightness.png")} alt="" />
          </button>
          <div>
            <button
              onClick={()=>setShowNotif(!showNotif)}
              onMouseEnter={()=>setShowNotif(true)}
            >
              <div className={styles.redCircle}>2</div>
              <img src={getImageUrl("icons/header/notif.png")} alt="" />
            </button>
            <div className={showNotif ? styles.notifPop : styles.close}>

              <div className={styles.notifHeader}>
                <h3>Recent Notifications</h3>
                <button onClick={()=>setShowNotif(false)}><img src={getImageUrl('icons/redX.svg')} /></button>
              </div>
              <div className={styles.today}>
                TODAY
              </div>
              <div className={styles.notifications}>
                {notifications.slice(0,3).map((notif, i) => (
                  <div className={styles.notifi} key={i}>
                    <div>
                      <h4>{notif.title}</h4>
                      <h6>{notif.details}</h6>
                      <p>{notif.time}</p>
                    </div>
                    {!notif.read && <div className={styles.dot}></div>}
                  </div>
                ))}
              </div>
              <div className={styles.notifFoot}>
                <p>Mark all as read</p>
                <button onClick={toNotifsPage}>View All</button>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.profile}>
          <img src={getImageUrl("icons/header/avatar.png")} alt="" />
          {/* <h4>{fullname}</h4> */}
        </div>
      </div>
    </div>
  );
};
