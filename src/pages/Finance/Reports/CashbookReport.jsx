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

const CashbookReport = forwardRef((props, ref) => {
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

  };

  return (
    <div className="landscape-page" style={{ fontSize: 12 }} ref={ref}>
      <Container fluid>
        <div
          style={{
            fontSize: 12,
            padding: "30px",
          }}
          className="card-div"
        >
          <div
            style={{
              marginTop: 10,
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}
          >
            <div style={{ fontWeight: "bold", fontSize: 16 }}>
              <p>RECEIPTS</p>
            </div>
            <div style={{ fontWeight: "bold", fontSize: 16 }}>
              <p>PAYMENTS</p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <table style={{ width: "49%" }}>
              <thead style={{ lineHeight: "50px", backgroundColor: "#D3D3D3" }}>
                <tr>
                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    S.No
                  </th>

                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Cash
                  </th>
                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Bank
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    01-01-2021
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    To opening balance
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    10,000.00
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    15,000.00
                  </td>
                </tr>
                <tr style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    01-01-2021
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    To opening balance
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    10,000.00
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    15,000.00
                  </td>
                </tr>
                <tr style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    01-01-2021
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    To opening balance
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    10,000.00
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    15,000.00
                  </td>
                </tr>
                <tr style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    1
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    01-01-2021
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    To opening balance
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    10,000.00
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    15,000.00
                  </td>
                </tr>
              </tbody>
            </table>
            <table style={{ width: "49%" }}>
              <thead style={{ lineHeight: "50px", backgroundColor: "#D3D3D3" }}>
                <tr>
                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Date
                  </th>
                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Description
                  </th>
                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Cash
                  </th>
                  <th
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    Bank
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    01-01-2021
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    By Electricity bill
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    12,00.00
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    15,000.00
                  </td>
                </tr>
                <tr style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    01-01-2021
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    By Electricity bill
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    12,00.00
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    15,000.00
                  </td>
                </tr>
                <tr style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    01-01-2021
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    By Electricity bill
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    12,00.00
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    15,000.00
                  </td>
                </tr>
                <tr style={{ borderBottom: "0.5px solid", lineHeight: "30px" }}>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    01-01-2021
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    By Electricity bill
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    12,00.00
                  </td>
                  <td
                    style={{
                      border: "1px",
                      borderStyle: "solid",
                      textAlign: "center",
                      fontWeight: "bold",
                    }}
                  >
                    15,000.00
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </Container>
    </div>
  );
});

export default CashbookReport;
