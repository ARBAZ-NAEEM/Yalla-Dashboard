import React, { forwardRef, Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { Select } from "../../../common/SetupMasterEnum";
import {
  formatDateFunc,
  formatDateFunction1,
  formatDateFunction2,
  formatDateFunctionByName,
} from "../../../functions/DateFormatFunction";
import { SET_INITIAL_DROPDOWN_FORM_STATE } from "../../../redux/actionType/CrudActionTypes";
import { Finance_GLReport } from "../../../utils/Config";

const GeneralLedgerReport = forwardRef((props, ref) => {
  const {
    SearchFields,
    FormFields,
    TableLoading,
    FormLoading,
    SupportingTables,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getGLReport();
  }, []);

  const getGLReport = () => {
    let data = {
      operationID: Select,
      costCenterId: 2118,
      accountCode: "200A03202",
      fromDate: "2022-09-01",
      toDate: "2022-09-01",
    };
    Finance_GLReport(data)
      .then((res) => {
        let data = {
          name: "GLReport",
          value: res.data,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="landscape-page" style={{ fontSize: 12 }} ref={ref}>
      <Container fluid>
        <div style={{ fontSize: 12, padding: "30px" }} className="card-div">
          <table
            style={{ width: "100%", lineHeight: "8px", marginTop: "10px" }}
          >
            <tbody>
              <tr>
                <td className="text-center" colspan={4}>
                  <p style={{ fontWeight: "bold", fontSize: 16 }}>
                    Shah Abdul Latif University , Khairpur
                  </p>
                </td>
              </tr>
              <tr>
                <td className="text-center" colspan={4}>
                  <p style={{ fontWeight: "bold", fontSize: 14 }}>
                    General Ledger
                  </p>
                </td>
              </tr>
              <tr>
                <td className="text-center" colspan={4}>
                  <p style={{ fontWeight: "bold", fontSize: 14 }}>
                    {SupportingTables?.GLReport?.Table1?.[0]?.AccName}
                  </p>
                </td>
              </tr>
              <tr>
                <td className="text-center" colspan={4}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <p
                      style={{
                        marginRight: "10px",
                        fontWeight: "bold",
                        fontSize: 14,
                      }}
                    >
                      Form Period:{" "}
                      {formatDateFunctionByName(
                        SupportingTables?.GLReport?.Table1?.[0]?.FromPeriod,
                        "-"
                      )}
                    </p>
                    <p style={{ fontWeight: "bold", fontSize: 14 }}>
                      To Period:{" "}
                      {formatDateFunctionByName(
                        SupportingTables?.GLReport?.Table1?.[0]?.ToPeriod,
                        "-"
                      )}
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-center" colspan={4}>
                  <div style={{ display: "flex", justifyContent: "flex-end" }}>
                    <p
                      style={{
                        marginRight: "10px",
                        fontWeight: "bold",
                        fontSize: 14,
                        marginTop: "20px",
                      }}
                    >
                      Opening Balance :{" "}
                      {SupportingTables?.GLReport?.Table1?.[0]?.OpeningBal}
                    </p>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="text-center" colspan={4}>
                  <hr style={{ margin: "0px" }} />
                </td>
              </tr>
              <td>
                <tr style={{ height: "10px" }}></tr>
              </td>
            </tbody>
          </table>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Date
                </th>

                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Vou.Type
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Vou. #
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  P. Mode
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  C. Center
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Acc. #
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Acc. Name
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Particular
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Dr.
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Cr.
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Balance
                </th>
              </tr>
            </thead>
            <td>
              <tr style={{ height: "10px" }}></tr>
            </td>
            <tbody>
              {SupportingTables?.GLReport?.Table?.map((x, index) => (
                <tr
                  key={index}
                  style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}
                >
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {formatDateFunctionByName(x.Date, "-")}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.VType}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.VouNo}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.PaymentMode}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.CostCenter}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.AccNo}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.AccName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.Particular}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.Debit}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.Credit}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.Balance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <table style={{ width: "100%" }}>
            <tbody>
              <tr
                className="text-center"
                style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}
              >
                <td colspan={2} style={{ width: "30%" }}></td>
                <td colspan={2} style={{ width: "50%" }}></td>
                <td colspan={2} style={{ width: "15%", fontWeight: "bold" }}>
                  Total
                </td>
                <td colspan={4}>
                  <p style={{ borderBottom: "1px solid black" }}>
                    <p
                      style={{
                        borderBottom: "1px solid black",
                        marginBottom: "3px",
                        fontWeight: "bold",
                      }}
                    >
                      1,737.00
                    </p>
                  </p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
});

export default GeneralLedgerReport;
