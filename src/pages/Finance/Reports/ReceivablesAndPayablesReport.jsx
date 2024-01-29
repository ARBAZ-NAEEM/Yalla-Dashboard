import React, { forwardRef, Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, CardBody, Col, Container, Row, Table } from "reactstrap";
import { Select } from "../../../common/SetupMasterEnum";
import {
  formatDateFunc,
  formatDateFunction1,
  formatDateFunction2,
  formatDateFunctionByName,
} from "../../../functions/DateFormatFunction";
import { SET_INITIAL_DROPDOWN_FORM_STATE } from "../../../redux/actionType/CrudActionTypes";
import { Finance_GLReport } from "../../../utils/Config";

const ReceivablesAndPayblesReport = forwardRef((props, ref) => {
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
          name: "RecAndPayReport",
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

  const onView = (item) => {
  };

  return (
    <div className="portrait-page" style={{ fontSize: 12 }} ref={ref}>
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
                    Receivables And Payables Report
                  </p>
                </td>
              </tr>
              <tr>
                <td className="text-center" colspan={4}>
                  <hr />
                </td>
              </tr>
              <tr className="text-center">
                <td style={{ fontWeight: "bold", fontSize: 16 }} colSpan={4}>
                  Receivables
                </td>
              </tr>
              <tr>
                <td className="text-center" colspan={4}>
                  <hr />
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
                  AccountCode
                </th>

                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  AccountName
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  CostName
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  View
                </th>
              </tr>
            </thead>
            <td>
              <tr style={{ height: "10px" }}></tr>
            </td>
            <tbody>
              {SupportingTables?.RecAndPayReport?.Table3?.filter(
                (x) => x.ReceiveablesPayables == 1
              )?.map((x, index) => (
                <tr
                  key={index}
                  style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}
                >
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.AccountCode}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.AccountName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.CostName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight:'bold'
                    }}
                  >
                    {x.Amount}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Button
                      color="success"
                      className="btnic"
                      size="sm"
                      onClick={() => onView(index)}
                    >
                      <i class="fa fa-eye"></i>
                    </Button>
                  </td>
                </tr>
              ))}
              <td>
                <tr style={{ height: "30px" }}></tr>
              </td>
              {/* <tr>
                <td  colspan={4}>
                  <hr style={{ margin: "5px" }} />
                </td>
              </tr>
              <tr className="text-center">
                <td style={{ fontWeight: "bold", fontSize: 16 }} colSpan={4}>
                  Payables
                </td>
              </tr>
              <tr>
                <td  colspan={4}>
                  <hr style={{ margin: "5px" }} />
                </td>
              </tr>
              <td>
                <tr style={{ height: "10px" }}></tr>
              </td> */}
            </tbody>
          </table>
          <table style={{ width: "100%" }}>
            <thead>
              <tr>
                <td colspan={5}>
                  <hr style={{ margin: "5px" }} />
                </td>
              </tr>
              <tr className="text-center">
                <td style={{ fontWeight: "bold", fontSize: 16 }} colSpan={5}>
                  Payables
                </td>
              </tr>
              <tr>
                <td colspan={5}>
                  <hr style={{ margin: "5px" }} />
                </td>
              </tr>
              <td>
                <tr style={{ height: "18px" }}></tr>
              </td>
              <tr>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  AccountCode
                </th>

                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  AccountName
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  CostName
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  Amount
                </th>
                <th
                  style={{
                    textAlign: "center",
                  }}
                >
                  View
                </th>
              </tr>
            </thead>
            <td>
              <tr style={{ height: "10px" }}></tr>
            </td>
            <tbody>
              {SupportingTables?.RecAndPayReport?.Table3?.filter(
                (x) => x.ReceiveablesPayables == 0
              )?.map((x, index) => (
                <tr
                  key={index}
                  style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}
                >
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.AccountCode}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.AccountName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    {x.CostName}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                      fontWeight:'bold'
                    }}
                  >
                    {x.Amount}
                  </td>
                  <td
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <Button
                      color="danger"
                      className="btnic"
                      size="sm"
                      onClick={() => onView(index)}
                    >
                      <i class="fa fa-eye"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
});

export default ReceivablesAndPayblesReport;
