import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { decryptData } from "../../../../../EncryptData";
import { COMPANY_DETAILS } from "../../../../../utils/EncryptedConstants";
import { SessionStorage } from "../../../../../common/SetupMasterEnum";
import moment from "moment";

const TrialBalanceReport = forwardRef((props, ref) => {
  const { TableList } = useSelector((state) => state.CrudFormReducer);
  return (
    <>
      <div
        className="text-center"
        ref={ref}
        style={{
          fontSize: 13,
          margin: "10px",
          padding: "10px 25px",
        }}
      >
        <div>
          <h5 className="text-center" style={{ marginBottom: "0" }}>
            <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
          </h5>
        </div>
        <h6 style={{ marginBottom: "0", marginTop: "2px" }}>TRIAL BALANCE</h6>
        <div className="d-flex justify-content-center">
          <table style={{ width: "35%" }}>
            <tbody>
              <tr>
                <td style={{ width: "100%" }} className="bolder text-center">
                  TO:{" "}
                  {moment(TableList?.Table1?.[0]?.ToDate).format("DD-MM-YYYY")}
                  FROM:{" "}
                  {moment(TableList?.Table1?.[0]?.FromDate).format(
                    "DD-MM-YYYY"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div
          className="d-flex justify-content-center "
          style={{ width: "100%" }}
        >
          <table style={{ width: "100%" }}>
          <thead className="no-left-border">
                <tr
                  className="tbl-row-bgmr"
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                  }}
                >
                  <th className="tbl-row-border" rowSpan={4}>ACC CODE</th>
                  <th className="tbl-row-border" rowSpan={4} style={{ verticalAlign: "middle" }}>
                    ACCOUNT NAME
                  </th>
                  <th className="tbl-row-border" colSpan={2}>OPENING</th>
                  <th className="tbl-row-border" colSpan={2}>CURRENT</th>
                  <th className="tbl-row-border" colSpan={2}>CLOSING</th>
                </tr>
                <tr
                  className="tbl-row-bgmr"
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                  }}
                >
                  <th className="tbl-row-border"> DEBIT</th>
                  <th className="tbl-row-border"> CREDIT</th>
                  <th className="tbl-row-border"> DEBIT</th>
                  <th className="tbl-row-border"> CREDIT</th>
                  <th className="tbl-row-border"> DEBIT</th>
                  <th className="tbl-row-border"> CREDIT</th>
                </tr>
              </thead>
            <tbody>
              {TableList?.Table?.map((x) => (
                <tr className="tbl-row-border">
                  <td>{x.AccCode}</td>
                  <td>{x?.AccName}</td>
                  <td>{x?.OpeningDebit}</td>
                  <td>{x?.OpeningCredit}</td>
                  <td>{x?.CrAmount}</td>
                  <td>{x?.DrAmount}</td>
                  <td>{x?.ClosingDebit}</td>
                  <td>{x?.ClosingCredit}</td>
                </tr>
              ))}
              {TableList?.Table1.map((x) => (
                <tr className="tbl-row-border bolder border-bottom2">
                  <td colSpan={2} className="text-right bolder">
                    Grand Total:
                  </td>
                  <td>{x.OpeningDebit}</td>
                  <td>{x.OpeningCredit}</td>
                  <td>{x.DrAmount}</td>
                  <td>{x.CrAmount}</td>
                  <td>{x.ClosingDebit}</td>
                  <td>{x.ClosingCredit}</td>
                </tr>
              ))}
              {TableList?.Table?.length < 5 ? (
                <tr className="fotterSpacing">
                  <td colSpan={8} className="text-left">
                    {" "}
                  </td>
                </tr>
              ) : null}
            </tbody>
            <tfoot
              style={{
                backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                  ?.ColourCode,
                color: "white",
                fontWeight: "bold",
                fontSize: 10,
              }}
            >
              <tr style={{ width: "100%" }}>
                <td className="text-center" colSpan={10}>
                  <div>
                    {decryptData(COMPANY_DETAILS, SessionStorage)?.Footer}
                  </div>
                  <div>
                    {decryptData(COMPANY_DETAILS, SessionStorage)?.Address}
                  </div>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
});
export default TrialBalanceReport;
