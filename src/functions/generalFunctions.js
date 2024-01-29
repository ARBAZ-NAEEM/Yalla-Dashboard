import { SessionStorage } from "../common/SetupMasterEnum";
import { decryptData } from "../EncryptData";
import { ADM_EligibilityCriteriaDependency } from "../utils/Config";
import { LOGINID, UserNetworkInfo } from "../utils/EncryptedConstants";

export const apiErrorChecker = (res) => {
  let { data, Response, ResponseMessage } = res;
  if (Response === false) return { err: true, msg: ResponseMessage };
  if (data.hasOwnProperty("Table") && data?.Table?.length > 0)
    if (
      data?.Table[0].hasOwnProperty("HasError") &&
      data?.Table[0]?.HasError === 1
    )
      return {
        err: true,
        msg: data?.Table[0]?.Message || data?.Table[0]?.Column1,
      };
  return {
    err: false,
    msg:
      (data.length > 0
        ? "Success"
        : data?.Table[0]?.Message || data?.Table[0]?.Column1) || "Success",
  };
};

export const onChange_Select_Department_Program = (payload) => {
  return new Promise((resolve, reject) => {
    if (payload.paremeterID != undefined) {
      ADM_EligibilityCriteriaDependency(payload)
        .then((res) => {
          let data;
          if (payload.caseID === 1) {
            data = { name: "MajorIds", value: res.data };
          } else if (payload.caseID === 2) {
            data = { name: "Departments", value: res?.data?.Table };
          } else if (payload.caseID === 3) {
            data = { name: "Programs", value: res?.data?.Table };
          }
          resolve(data);
        })
        .catch((err) => {
          console.error(err);
          reject(err);
        });
    } else {
      reject(false);
    }
  });
};

export const getUserIPInfo = () => ({
  createdBy: decryptData(LOGINID, SessionStorage),
  modifiedBy: decryptData(LOGINID, SessionStorage),
  userIP: decryptData(UserNetworkInfo)?.IPv4,
});
