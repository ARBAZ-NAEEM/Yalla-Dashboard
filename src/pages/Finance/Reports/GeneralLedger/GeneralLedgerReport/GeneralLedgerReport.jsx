import React, { forwardRef } from "react";
import moment from "moment";
import { decryptData } from "../../../../../EncryptData";
import { COMPANY_DETAILS } from "../../../../../utils/EncryptedConstants";
import { SessionStorage } from "../../../../../common/SetupMasterEnum";
import { useSelector } from "react-redux";

const GeneralLedgerReport = forwardRef((props, ref) => {
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
        <h6 style={{ marginBottom: "0", marginTop: "2px" }}>
          GENRAL LEDGER REPORT
        </h6>
        {/* <h6>ACCOUNT 10.C000012</h6> */}
        <div className="d-flex justify-content-center">
          <table style={{ width: "35%" }}>
            <tbody>
              <tr>
                <td style={{ width: "100%" }} className="bolder text-center">
                  TO:{" "}
                  {moment(TableList?.Table2?.[0]?.ToDate).format("DD-MM-YYYY")}
                  FROM:{" "}
                  {moment(TableList?.Table2?.[0]?.FromDate).format(
                    "DD-MM-YYYY"
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />

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
                  <th>ACCOUNT NAME</th>
                  <th>DATE</th>
                  <th>VOUCHER TYPE</th>
                  <th>VOUCHER NO.</th>

                  <th>DESCRIPTION</th>

                  <th>DEBIT</th>
                  <th>CREDIT</th>
                  <th>BALANCE</th>
                </tr>
              </thead>
              <tbody className="tbl-row-border">
                <tr className="border-bottom2">
                  <td colSpan={4}></td>
                  <td className="bolder">Opening Balance:-</td>
                  <td></td>
                  <td style={{ fontWeight: 'bold'}}>{TableList?.Table1?.[0]?.OpeningBal}</td>
                </tr>
                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td style={{ fontWeight: "bold" }}>{x.AccName}</td>
                    <td> {moment(new Date(x.Date)).format("DD-MM-YYYY")}</td>
                    <td>{x?.VouType}</td>
                    <td>{x?.VouNo}</td>

                    <td>{x?.Narrations}</td>

                    <td>{x?.Debit}</td>
                    <td>{x?.Credit}</td>
                    <td>{x?.Balance}</td>
                  </tr>
                ))}
                {/* <tr>
                  <td colSpan={3}></td>
                  <td className="bolder text-right">Total:-</td>

                  <td className="border-bottom2 border-top2 bolder">
                    34,500.00
                  </td>
                  <td className="border-bottom2 border-top2 bolder">
                    34,500.00
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="bolder text-right">CF Balance:-</td>

                  <td className="border-bottom2 bolder">34,500.00</td>
                  <td className="border-bottom2 bolder">34,500.00</td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="bolder text-right">Opening Balance:-</td>

                  <td className="border-bottom2 bolder">34,500.00</td>
                  <td className="border-bottom2 bolder">34,500.00</td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="bolder text-right">Grand Total:-</td>
                  <td className="border-bottom2 bolder">34,500.00</td>
                  <td className="border-bottom2 bolder">34,500.00</td>
                </tr> */}
              </tbody>
            <tfoot
              style={{
                backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                  ?.ColourCode,
                color: "white",
                fontWeight: "bold",
                fontSize: 14,
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
export default GeneralLedgerReport;
