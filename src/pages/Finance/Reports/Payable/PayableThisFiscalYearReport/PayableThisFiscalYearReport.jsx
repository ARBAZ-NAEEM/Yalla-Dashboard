import React, { forwardRef } from "react";
import { useSelector } from "react-redux";
import { decryptData } from "../../../../../EncryptData";
import { COMPANY_DETAILS } from "../../../../../utils/EncryptedConstants";
import { SessionStorage } from "../../../../../common/SetupMasterEnum";
import moment from "moment";

const PayableThisFiscalYearReport = forwardRef((props, ref) => {
  const { TableList } = useSelector((state) => state.CrudFormReducer);

  return (
    <>
      <div
        className="text-center"
        ref={ref}
        style={{
          fontSize: 12,
          margin: "10px",
          padding: "10px 15px",
        }}
      >
        <div style={{ height: "100vh" }}>
          <div>
            <h2 className="text-center" style={{ marginBottom: "0" }}>
              <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
            </h2>
          </div>
          <h5 style={{ marginBottom: "0", marginTop: "2px" }}>
            Payable (This Fiscal Year)
          </h5>
          <br />

          <div className="d-flex  justify-content-between">
            <table style={{ width: "100%" }}>
              <tbody>
                <td className="bolder text-left">GL-PAYABLE</td>
                <td
                  className="bolder text-center"
                  // style={{ paddingLeft: "100px" }}
                >
                  FROM:{" "}
                  {moment(TableList?.Table1?.[0]?.FromDate).format(
                    "DD-MM-YYYY"
                  )}
                  {"   "}
                  TO:{" "}

                  {moment(TableList?.Table1?.[0]?.ToDate).format("DD-MM-YYYY")}
                </td>
                <td style={{ width: "22%" }} className="bolder text-left"></td>
              </tbody>
            </table>
          </div>
          <br />
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <table style={{ width: "100%" }}>
              <thead className="no-left-border tbl-row-border">
                <tr
                  className="tbl-row-bgmr"
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                  }}
                >
                  <th>CODE</th>
                  <th>NAME</th>
                  <th> 0 - 30</th>
                  <th>31 - 60</th>
                  <th>61 - 90</th>
                  <th>Greter than 90</th>
                </tr>
              </thead>
              <tbody className="tbl-row-border">
                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td className="bolder">{x.AccCode}</td>
                    <td className="bolder">{x?.AccName}</td>
                    <td className="bolder">{x?.["030"]}</td>
                    <td className="bolder">{x?.["3160"]}</td>
                    <td className="bolder">{x?.["6190"]}</td>
                    <td className="bolder">{x?.[">90"]}</td>
                  </tr>
                ))}
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
      </div>
    </>
  );
});

export default PayableThisFiscalYearReport;
