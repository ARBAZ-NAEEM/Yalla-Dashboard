import React, { forwardRef, Fragment } from "react";
import { Card, CardBody, CardTitle, Col, Container, Row } from "reactstrap";
import logoimg from "../../../assets/img/logo.png";
import { useDispatch, useSelector } from "react-redux";
import QRCode from "react-qr-code";
import {
  formatDateFunction,
  formatDateFunc,
  formatTimeFromDate,
} from "../../../functions/DateFormatFunction";

const ReportPrintBulkAdmitSlip = forwardRef((props, ref) => {
  const {
    SearchFields,
    TableLoading,
    FormFields,
    FormLoading,
    SupportingTables,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);

  const dispatch = useDispatch();

  return (
    <div
      className="portrait-page page-break card-div"
      style={{ padding: 15 }}
      ref={ref}
    >
      {SupportingTables?.BulkTestSlipRecord?.map((x, ind) => {
        return (
          <Fragment key={ind}>
            <div>
              <Container fluid>
                <div className="test-slip">
                  <table style={{ width: "100%" }}>
                    <tbody>
                      <tr>
                        <td className="text-center">
                          <img src={logoimg} height="70" />
                        </td>
                        <td colSpan={2}>
                          <div className="text-center adm-sl">
                            <h4
                              style={{
                                backgroundColor: "blue",
                                color: "white",
                              }}
                            >
                              THE SHAIKH AYAZ UNIVERSITY SHIKARPUR
                            </h4>
                            <p
                              className="pre-admi"
                              style={{
                                paddingRight: "10px",
                                paddingLeft: "10px",
                                backgroundColor: "maroon",
                                color: "white",
                              }}
                            >
                              PRE-ADMISSION TEST FOR BECHELOR PROGRAM - (SESSION
                              - 2023)
                              <br />
                              ADMIT CARD (Candidate's Copy)
                            </p>
                          </div>
                        </td>
                        <td>
                          <div
                            className="text-center"
                            style={{ paddingLeft: "15px" }}
                          >
                            <QRCode value="asdasd" size="70" />
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <Row>
                    <Col lg="6" className="text-center offset-md-3">
                      <table style={{ width: "100%", fontSize: 12 }}>
                        <tbody>
                          <tr
                            style={{
                              border: "1px",
                              borderStyle: "solid",
                            }}
                          >
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "20%",
                              }}
                              colSpan="1"
                            >
                              TEST ID#
                            </td>
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "50%",
                              }}
                              colSpan="3"
                            >
                              {x?.ADMEntryTestId}
                            </td>
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "20%",
                              }}
                              colSpan="1"
                              rowSpan="5"
                            >
                              <img src={x?.Picture} height="90" />
                            </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px",
                              borderStyle: "solid",
                            }}
                          >
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "20%",
                              }}
                              colSpan="1"
                            >
                              FULL NAME
                            </td>
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "50%",
                              }}
                              colSpan="3"
                            >
                              {x?.Name}
                            </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px",
                              borderStyle: "solid",
                            }}
                          >
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "20%",
                              }}
                              colSpan="1"
                            >
                              FATHER NAME
                            </td>
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "50%",
                              }}
                              colSpan="3"
                            >
                              {x?.FatherName}
                            </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px",
                              borderStyle: "solid",
                            }}
                          >
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "20%",
                              }}
                              colSpan="1"
                            >
                              CNIC
                            </td>
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "50%",
                              }}
                              colSpan="3"
                            >
                              {x?.Cnic}
                            </td>
                          </tr>
                          <tr
                            style={{
                              border: "1px",
                              borderStyle: "solid",
                            }}
                          >
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "20%",
                              }}
                              colSpan="1"
                            >
                              Applied Program
                            </td>
                            <td
                              style={{
                                border: "1px",
                                borderStyle: "solid",
                                width: "50%",
                              }}
                              colSpan="3"
                            >
                              {x?.AppliedProgram}
                            </td>
                          </tr>
                          <tr style={{ height: "20px" }}></tr>
                          <tr style={{ height: "20px" }}></tr>
                          <tr className="text-center">
                            <td colSpan="2">_____________________</td>
                            <td colSpan="2">_____________________</td>
                          </tr>
                          <tr>
                            <td colSpan="2">Candidate's Signature</td>
                            <td colSpan="2">Authorized Person's Signature </td>
                          </tr>
                          <tr style={{ height: "10px" }}></tr>
                        </tbody>
                      </table>
                    </Col>
                  </Row>
                  <table style={{ width: "100%", fontSize: 12 }}>
                    <tbody>
                      <tr>
                        <td
                          colSpan="11"
                          style={{
                            fontWeight: "bold",
                            backgroundColor: "black",
                            color: "white",
                            textAlign: "center",
                            fontSize: 12,
                            backgroundColor: "maroon",
                          }}
                        >
                          TEST DATE & TIME: {formatDateFunc(x?.Time, "-")} ,{" "}
                          {formatTimeFromDate(x?.Time)} Venue: THE SHAIKH AYAZ
                          UNIVERSITY SHIKARPUR
                        </td>
                      </tr>
                      <tr style={{ height: "10px" }}></tr>
                      <tr>
                        <td
                          colSpan="4"
                          style={{
                            fontWeight: "bold",
                            textAlign: "center",
                          }}
                        >
                          Important Instructions for the test day
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          1. Please bring this slip on test day, otherwise you
                          will not be allowed.
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          2. Please bring the photocopy of this slip.
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          3. Please bring your original CNIC / B-Form.
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          4. You are required to be present in your respective
                          block 30 minuts before the start of time.
                        </td>
                      </tr>
                      <tr>
                        <td colSpan="2">
                          5. Mobilephones, Calculator, Handbook and Purses are
                          not allowed in the premises of test center.
                        </td>
                      </tr>
                      <tr style={{ height: "10px" }}></tr>
                      <tr>
                        <td style={{ fontWeight: "bold" }} colSpan="2">
                          Note: Clipboard, ball point pen will be provided at
                          the time of Test.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div
                    style={{ marginTop: "15px", marginBottom: "15px" }}
                    className="class-hr"
                  >
                    <hr></hr>
                  </div>
                </div>
              </Container>
            </div>
            <div className="test-slip">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <td className="text-center">
                      <img src={logoimg} height="70" />
                    </td>
                    <td colSpan={2}>
                      <div className="text-center adm-sl">
                        <h4
                          style={{
                            backgroundColor: "blue",
                            color: "white",
                          }}
                        >
                          THE SHAIKH AYAZ UNIVERSITY SHIKARPUR
                        </h4>
                        <p
                          className="pre-admi"
                          style={{
                            paddingRight: "10px",
                            paddingLeft: "10px",
                            backgroundColor: "maroon",
                            color: "white",
                          }}
                        >
                          PRE-ADMISSION TEST FOR BECHELOR PROGRAM - (SESSION -
                          2023)
                          <br />
                          ADMIT CARD (Office Copy)
                        </p>
                      </div>
                    </td>
                    <td>
                      <div
                        className="text-center"
                        style={{ paddingLeft: "15px" }}
                      >
                        <QRCode value="asdasd" size="70" />
                        {/* <QRCode  value={`${item.Code}`} size="90" /> */}
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
              <Row>
                <Col lg="6" className="text-center offset-md-3">
                  <table style={{ width: "100%", fontSize: 12 }}>
                    <tbody>
                      <tr
                        style={{
                          border: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "20%",
                          }}
                          colSpan="1"
                        >
                          TEST ID#
                        </td>
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "50%",
                          }}
                          colSpan="3"
                        >
                          {x?.ADMEntryTestId}
                          {/* {item.Code} */}
                        </td>
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "20%",
                          }}
                          colSpan="1"
                          rowSpan="5"
                        >
                          <img src={x?.Picture} height="90" />
                        </td>
                      </tr>
                      <tr
                        style={{
                          border: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "20%",
                          }}
                          colSpan="1"
                        >
                          FULL NAME
                        </td>
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "50%",
                          }}
                          colSpan="3"
                        >
                          {x?.Name}
                        </td>
                      </tr>
                      <tr
                        style={{
                          border: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "20%",
                          }}
                          colSpan="1"
                        >
                          FATHER NAME
                        </td>
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "50%",
                          }}
                          colSpan="3"
                        >
                          {x?.FatherName}
                        </td>
                      </tr>
                      <tr
                        style={{
                          border: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "20%",
                          }}
                          colSpan="1"
                        >
                          CNIC
                        </td>
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "50%",
                          }}
                          colSpan="3"
                        >
                          {x?.Cnic}
                        </td>
                      </tr>
                      <tr
                        style={{
                          border: "1px",
                          borderStyle: "solid",
                        }}
                      >
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "20%",
                          }}
                          colSpan="1"
                        >
                          Applied Program
                        </td>
                        <td
                          style={{
                            border: "1px",
                            borderStyle: "solid",
                            width: "50%",
                          }}
                          colSpan="3"
                        >
                          {x?.AppliedProgram}
                        </td>
                      </tr>
                      <tr style={{ height: "20px" }}></tr>
                      <tr style={{ height: "20px" }}></tr>
                      <tr className="text-center">
                        <td colSpan="2">_____________________</td>
                        <td colSpan="2">_____________________</td>
                      </tr>
                      <tr>
                        <td colSpan="2">Candidate's Signature</td>
                        <td colSpan="2">Authorized Person's Signature </td>
                      </tr>
                      <tr style={{ height: "10px" }}></tr>
                    </tbody>
                  </table>
                </Col>
              </Row>
              <table style={{ width: "100%", fontSize: 12 }}>
                <tbody>
                  <tr>
                    <td
                      colSpan="11"
                      style={{
                        fontWeight: "bold",
                        backgroundColor: "black",
                        color: "white",
                        textAlign: "center",
                        fontSize: 12,
                        backgroundColor: "maroon",
                      }}
                    >
                      TEST DATE & TIME: {formatDateFunc(x?.Time, "-")} ,{" "}
                      {formatTimeFromDate(x?.Time)} Venue: THE SHAIKH AYAZ
                      UNIVERSITY SHIKARPUR
                    </td>
                  </tr>
                  <tr style={{ height: "10px" }}></tr>
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      Important Instructions for the test day
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      1. Please bring this slip on test day, otherwise you will
                      not be allowed.
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      2. Please bring the photocopy of this slip.
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      3. Please bring your original CNIC / B-Form.
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      4. You are required to be present in your respective block
                      30 minuts before the start of time.
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="2">
                      5. Mobilephones, Calculator, Handbook and Purses are not
                      allowed in the premises of test center.
                    </td>
                  </tr>
                  <tr style={{ height: "10px" }}></tr>
                  <tr>
                    <td style={{ fontWeight: "bold" }} colSpan="2">
                      Note: Clipboard, ball point pen will be provided at the
                      time of Test.
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
});

export default ReportPrintBulkAdmitSlip;
