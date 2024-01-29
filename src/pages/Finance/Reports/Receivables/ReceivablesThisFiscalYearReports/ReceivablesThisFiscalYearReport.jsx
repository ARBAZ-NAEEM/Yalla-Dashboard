import moment from "moment";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { SessionStorage } from "../../../../../common/SetupMasterEnum";
import { COMPANY_DETAILS } from "../../../../../utils/EncryptedConstants";
import { decryptData } from "../../../../../EncryptData";
// import logoimg from "../../../assets/img/logo.png";

const ReceivablesThisFiscalYearReport = forwardRef((props, ref) => {
  const { TableList } = useSelector((state) => state.CrudFormReducer);
  return (
    <>
      <div
        className="text-center"
        ref={ref}
        style={{
          fontSize: 12,
          margin: "10px",
          padding: "10px 25px",
        }}
      >
        <div style={{ height: "100vh" }}>
          <div>
            <h2 className="text-center" style={{ marginBottom: "0" }}>
              <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
            </h2>
          </div>
          <h5 style={{ marginBottom: "0", marginTop: "2px" }}>
            Receivables This Fiscal Year Report
          </h5>
          <div className="d-flex justify-content-center">
            <table style={{ width: "35%" }}>
              <tbody>
                <tr>
                  <td className="bolder">FROM:</td>
                  <td className="bolder text-left">
                    {moment(TableList?.Table2?.[0]?.FromDate).format(
                      "DD-MM-YYYY"
                    )}{" "}
                  </td>
                  <td className="bolder">TO:</td>
                  <td className="bolder text-left">
                    {" "}
                    {moment(TableList?.Table2?.[0]?.ToDate).format(
                      "DD-MM-YYYY"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <p className="text-left bolder mgbtm mb-2">GL-Receivables</p>

          <div
            className="d-flex justify-content-center"
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
                  <th>Code</th>
                  <th>Name</th>
                  <th>0-30</th>
                  <th>31-60</th>
                  <th>61-90</th>
                  <th>Greater than 90</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mt-2 mb-2">
                  <td className="text-left bolder">
                    {TableList?.Table?.[0]?.ReceivablesThisFiscalYear}
                  </td>
                </tr>

                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td className="bolder">{x?.AccCode}</td>
                    <td className="bolder">{x?.AccName}</td>
                    <td className="bolder">{x?.["030"]}</td>
                    <td className="bolder">{x?.["3160"]}</td>
                    <td className="bolder text-center">{x?.["6190"]}</td>
                    <td className="bolder">{x?.[">90"]}</td>
                  </tr>
                ))}

                {/* <tr>
                  <td className="text-right bolder" colSpan={6}>
                    {" "}
                    {TableList?.Table1?.[0]?.Total}:
                  </td>
                  <td className="text-center bolder">
                    {" "}
                    {TableList?.Table1?.[0]?.Debit}
                  </td>
                  <td className="text-center bolder">
                    {" "}
                    {TableList?.Table1?.[0]?.Credit}
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>
        </div>
        <footer
          style={{
            backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
              ?.ColourCode,
            color: "white",
            fontWeight: "bold",
            fontSize: 14,
          }}
        >
          <div>{decryptData(COMPANY_DETAILS, SessionStorage)?.Footer}</div>

          <div>{decryptData(COMPANY_DETAILS, SessionStorage)?.Address}</div>
        </footer>
      </div>
    </>
  );
});
export default ReceivablesThisFiscalYearReport;
