import { isMobile, isTablet, isDesktop } from "react-device-detect";
import UAParser from "ua-parser-js";

export const getDeviceDetails = () => {
  const parser = new UAParser();
  const deviceInfo = parser.getResult();

  const deviceDetails = {
    deviceID: navigator.userAgent, // Could be a unique identifier or userAgent
    deviceModel: deviceInfo.device.model || "Unknown Model",
    deviceOS: `${deviceInfo.os.name} ${deviceInfo.os.version}`,
    deviceName: deviceInfo.browser.name || "Unknown Browser",
    deviceType: isMobile
      ? "Mobile"
      : isTablet
      ? "Tablet"
      : isDesktop
      ? "Desktop"
      : "Unknown",
  };

  return deviceDetails;
};
