import moment from "moment";
import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { SessionStorage } from "../../../../../common/SetupMasterEnum";
import { COMPANY_DETAILS } from "../../../../../utils/EncryptedConstants";
import { decryptData } from "../../../../../EncryptData";
// import logoimg from "../../../assets/img/logo.png";

const JournalTransactionsReport = forwardRef((props, ref) => {
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
        <div>
          <div>
            <h2 className="text-center" style={{ marginBottom: "0" }}>
              <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
            </h2>
          </div>
          <h5 style={{ marginBottom: "0", marginTop: "2px" }}>
            JOURNAL TRANSACTIONS
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
          <p className="text-left bolder mgbtm">GL-Jrnl_TRA</p>

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
                  <th className="text-left">DATE</th>
                  <th style={{ width: "7%" }}>No.</th>
                  <th>ACCOUNT CODE</th>
                  <th>ACCOUNT NAME</th>
                  <th>DESCRIPTION</th>
                  <th>CC CODE</th>
                  <th>DEBIT</th>
                  <th>CREDIT</th>
                </tr>
              </thead>
              <tbody className="tbl-row-border">
                <tr className="mt-2 mb-2">
                  <td className="text-left bolder">
                    {TableList?.Table?.[0]?.Journal}
                  </td>
                </tr>

                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td className="text-left">
                      {" "}
                      {moment(x?.Date).format("DD-MM-YYYY")}
                    </td>
                    <td className="bolder">{x?.VouMasterId}</td>
                    <td className="bolder">{x?.AccCode}</td>
                    <td className="text-center bolder">{x?.AccName}</td>
                    <td className="bolder text-center">{x?.Narrations}</td>
                    <td className="bolder">{x?.Name}</td>
                    <td className="text-center">
                      {x?.Debit === 0 ? "0.00" : x?.Debit}
                    </td>
                    <td className="text-center">
                      {x.Credit === 0 ? "0.00" : x.Credit}
                    </td>
                  </tr>
                ))}

                <tr  className="border-bottom2">
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
                </tr>
                {TableList?.Table?.length < 5 ? (
                  <tr className="fotterSpacing">
                    <td colSpan={8} className="text-left">
                      {" "}
                    </td>
                  </tr>
                ) : null}
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
export default JournalTransactionsReport;
