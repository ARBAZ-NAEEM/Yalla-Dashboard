import CryptoJS from "crypto-js";

/**
 * Encrypt your data with .env Secret Key
 * @param {any} data any type
 * @param {String} storageName name of the local Storage
 */
export const encryptData = (data, storageName, type) => {
  if (type === "SessionStorage") {
    let objData = JSON.stringify(data);
    let encryptedString = CryptoJS.AES.encrypt(
      objData,
      "process.env.REACT_APP_MENU_NAME"
    ).toString();
    sessionStorage.setItem(storageName, encryptedString);
  } else {
    let objData = JSON.stringify(data);
    let encryptedString = CryptoJS.AES.encrypt(
      objData,
      "process.env.REACT_APP_MENU_NAME"
    ).toString();
    localStorage.setItem(storageName, encryptedString);
  }
};

/**
 * Decrypt your storage value and return
 * @param {String} storageName name of the local Storage
 * @returns JSON parsed value
 */
export const decryptData = (storageName, type) => {
  if (type === "SessionStorage") {
    let string = sessionStorage.getItem(storageName);
    if (string === null) return;
    const decryptedString = CryptoJS.AES.decrypt(
      string,
      "process.env.REACT_APP_MENU_NAME"
    );
    let result = JSON.parse(decryptedString.toString(CryptoJS.enc.Utf8));
    return result;
  } else {
    let string = localStorage.getItem(storageName);
    if (string === null) return;
    const decryptedString = CryptoJS.AES.decrypt(
      string,
      "process.env.REACT_APP_MENU_NAME"
    );
    let result = JSON.parse(decryptedString.toString(CryptoJS.enc.Utf8));
    return result;
  }
};
