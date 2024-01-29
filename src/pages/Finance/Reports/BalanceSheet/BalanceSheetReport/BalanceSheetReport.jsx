import React, { Fragment, forwardRef } from "react";
import moment from "moment";
import { decryptData } from "../../../../../EncryptData";
import { COMPANY_DETAILS } from "../../../../../utils/EncryptedConstants";
import { SessionStorage } from "../../../../../common/SetupMasterEnum";
import { useSelector } from "react-redux";

const BalanceSheetReport = forwardRef((props, ref) => {
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
            <h5 className="text-center" style={{ marginBottom: "0" }}>
              <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
            </h5>
            <h6 className="underLineText">BALANCE SHEET</h6>
          </div>
          <table className="d-flex justify-content-center">
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
        <h6 className="text-left">GL-BS</h6>
        <div
          className="d-flex justify-content-between"
          style={{ width: "100%" }}
        >
          <table
            style={{ width: "50%", borderRight: "0" }}
            className="tbl-row-border"
          >
            <thead
              style={{
                backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                  ?.ColourCode,
                borderRight: "0",
              }}
              className="tbl-hd-row"
            >
              <tr>
                <th style={{ paddingLeft: 8 }} className="text-left">
                  Assets
                </th>
                <th style={{ paddingRight: 8 }} className="text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody style={{ borderRight: 0 }}>
              {TableList?.Table?.map((x) => (
                <Fragment>
                  <tr className="tbl-row-border" style={{ width: "50%" }}>
                    <td
                      style={{
                        paddingLeft: 8,
                        fontWeight: "bold",
                        width: "85%",
                      }}
                      className="text-left"
                    >
                      <strong style={{ fontSize: 13, fontWeight: "bold" }}>
                        {x.ParentAccName === "Total" ? null : x.ParentAccName}
                      </strong>
                    </td>
                    <td
                      style={{
                        paddingRight: 8,
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                      colSpan={2}
                      className={
                        x.ParentAccName == "Total"
                          ? "text-right double-underline"
                          : "text-right"
                      }
                      // className="text-right"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            marginRight: x.ParentAccName === "Total" ? 0 : 10,
                          }}
                        >
                          {x.ParentAccName === "Total" ? x.ParentAccName : null}
                        </div>
                        <div>{x.Amount}</div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
          <table style={{ width: "50%" }} className="tbl-row-border">
            <thead
              style={{
                backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                  ?.ColourCode,
              }}
              className="tbl-hd-row"
            >
              <tr>
                <th style={{ paddingLeft: 8 }} className="text-left">
                  Liabilities
                </th>
                <th style={{ paddingRight: 8 }} className="text-right">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {TableList?.Table1?.map((x) => (
                <Fragment>
                  <tr className="tbl-row-border" style={{ width: "50%" }}>
                    <td
                      style={{
                        paddingLeft: 8,
                        fontWeight: "bold",
                        width: "85%",
                      }}
                      className="text-left"
                    >
                      <strong style={{ fontSize: 13, fontWeight: "bold" }}>
                        {x.ParentAccName === "Total" ? null : x.ParentAccName}
                      </strong>
                    </td>
                    <td
                      style={{
                        paddingRight: 8,
                        fontWeight: "bold",
                        fontSize: 12,
                      }}
                      colSpan={2}
                      className={
                        x.ParentAccName == "Total"
                          ? "text-right double-underline"
                          : "text-right"
                      }
                      // className="text-right"
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <div
                          style={{
                            marginRight: x.ParentAccName === "Total" ? 0 : 10,
                          }}
                        >
                          {x.ParentAccName === "Total" ? x.ParentAccName : null}
                        </div>
                        <div>{x.Amount}</div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div
          style={{
            backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
              ?.ColourCode,
            marginTop: "60px",
            width: "100%",
          }}
        >
          <p className="bolder mgbtm" style={{ color: "#fff" }}>
            Wild Venture Water Park and Resort
          </p>
          <p className="bolder mgbtm" style={{ color: "#fff" }}>
            Super Highway Karachi, Gadap Road 04 Away From Baqai Medical
            University Super Highway, Gadap Road Karachi
          </p>
        </div>
      </div>
    </>
  );
});
export default BalanceSheetReport;
