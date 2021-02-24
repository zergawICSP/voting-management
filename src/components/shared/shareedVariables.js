import { securityEncryptionKey } from "../../security/config";
import CryptoJS from "crypto-js";

export const numberFormat = new Intl.NumberFormat(); // Number formatter

export const verifyingHashValue = (inputValue, compareTo) => {
  let hasedInputValue = CryptoJS.AES.encrypt(
    inputValue,
    securityEncryptionKey
  ).toString();

  console.log("Checking Encryption for :" + inputValue + "Encyprt: " + hasedInputValue);

  if (hasedInputValue === compareTo) return true;
  else return false;
};
