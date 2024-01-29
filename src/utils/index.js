import { SessionStorage } from "../common/SetupMasterEnum";
import { decryptData } from "../EncryptData";
import { COMPANY_ID, KIND, LOGINID, TOKEN } from "./EncryptedConstants";

export const logout = () => {
  let LOGIN_ID = decryptData(LOGINID, SessionStorage);
  sessionStorage.removeItem(LOGIN_ID, SessionStorage);
  sessionStorage.removeItem(COMPANY_ID, SessionStorage);
  sessionStorage.removeItem(TOKEN, SessionStorage);
  sessionStorage.removeItem(KIND, SessionStorage);
  sessionStorage.clear();
};

export const isLogin = () => {
  let LOGIN_ID = decryptData(LOGINID, SessionStorage);
  let token = decryptData(TOKEN, SessionStorage);
  if (LOGIN_ID && token) {
    return true;
  }

  return false;
};
