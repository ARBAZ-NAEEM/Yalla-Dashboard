import React, { Fragment, forwardRef, useRef } from "react";
import strabagimage from "../assets/img/strabad.png";
import yallasafety from "../assets/img/logo - Copy.jpg";
import engineerimage from "../assets/img/second-image.jpg";
import codebar from "../assets/img/code-bar.jpeg";

import { useSelector } from "react-redux";
import { decryptData } from "../EncryptData";
import { KIND } from "../utils/EncryptedConstants";
import { SessionStorage } from "../common/SetupMasterEnum";

const Workpermitpdf = forwardRef((props, ref) => {
  const { TableList } = useSelector((state) => state.CrudFormReducer);
  const { workPermitData, signature, teamLeaderSignature } = props;
  // console.log(workPermitData);
  // const dispatch = useDispatch();
  // console.log(TableList);

  console.log("signature", workPermitData?.signature);
  console.log("TEAMLEAD", workPermitData);
  console.log("asdasdasd", teamLeaderSignature);

  return (
    <div ref={ref} style={{ padding: "10px" }}>
      <table>
        <tr>
          <td
            style={{ width: "33%", verticalAlign: "middle", padding: "10px" }}
          >
            {" "}
            <img
              src={strabagimage}
              alt="Image 1"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                margin: "0 auto",
              }}
            />
          </td>
          <td
            style={{ width: "33%", verticalAlign: "middle", padding: "10px" }}
          >
            {" "}
            <img
              src={engineerimage}
              alt="Image 1"
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                display: "block",
                margin: "0 auto",
              }}
            />
          </td>
          <td
            style={{ width: "33%", verticalAlign: "middle", padding: "10px" }}
          >
            {" "}
            <img
              src={yallasafety}
              alt="Image 1"
              style={{
                maxWidth: "50%",
                maxHeight: "100%",
                display: "block",
                margin: "0 auto",
              }}
            />
          </td>
        </tr>
      </table>
      <div classNameName="table-data text-center" style={{ marginTop: "30px" }}>
        <p className="text-center" style={{ marginBottom: "0px" }}>
          <b>{workPermitData?.kind}</b>{" "}
          <span>{workPermitData?.work_start_date}</span>{" "}
        </p>
        <h4 className="text-center" style={{ marginBottom: "0px" }}>
          <b>{workPermitData?.kind}</b>
        </h4>
        <p className="text-center" style={{ marginBottom: "0px" }}>
          Project Name : {workPermitData?.project_name}
        </p>
        <p className="text-center" style={{ marginBottom: "0px" }}>
          Prepared for M/s: 10 - S T R A B A G Supervisor
        </p>
        <p className="text-center" style={{ marginBottom: "0px" }}>
          By Ava Al-Muhair
        </p>
        <p className="text-center">
          Company: S T R A B A G, {workPermitData?.id}
        </p>
      </div>

      <table
        id="MainContent_Table1"
        className="table tablePrintData __web-inspector-hide-shortcut__"
        style={{
          marginTop: "60px",
          padding: "0px",
          float: "none",
          margin: "0px",
          border: "1px solid #000 !important",
          fontSize: "8pt",
          fontFamily: "calibri",
          textAlign: "left",
          width: "100%",
        }}
      >
        <tbody style={{ border: "1px solid" }}>
          <tr>
            <td
              colspan="5"
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                textAlign: "left",
                fontWeight: "bold",
                padding: "14px 8px",
                background: "#80808047",
              }}
            >
              Section 1: Labor Details
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Name:</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.full_name}
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Employee ID:</strong>
            </td>
            <td
              style={{
                borderRight: "1px solid !important",
                borderTop: "1px solid !important",
                borderBottom: " 1px solid !important",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              --
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Phone Number:</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.phone_number}
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Email :</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.email}
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Designation:</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              --
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Type:</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              --
            </td>
          </tr>
          <tr>
            <td
              colspan="5"
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                textAlign: "left",
                fontWeight: "bold",
                padding: "14px 8px",
                background: "#80808047",
              }}
            >
              Section 2: Task Details
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Project Name :</strong>
            </td>
            <td
              colspan="5"
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.project_name}
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>MFSAN Ref. Num. :</strong>
            </td>
            <td
              colspan="5"
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.mfsan_num}
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Task :</strong>
            </td>
            <td
              colspan="5"
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.task_title}
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Task description :</strong>
            </td>
            <td
              colspan="5"
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.task_des}
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Location description :</strong>
            </td>
            <td
              colspan="5"
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.location_des}
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Task location :</strong>
            </td>
            <td
              colspan="5"
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              --
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Start date :</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.work_start_date}
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>Start time :</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.work_start_time}
            </td>
          </tr>
          <tr>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>End date :</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.work_end_date}
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "14pt",
                background: "#80808047",
                textAlign: "left",
                width: "25%",
              }}
            >
              <strong>End time :</strong>
            </td>
            <td
              style={{
                margin: "0px",
                borderStyle: "solid",
                borderWidth: "1px",
                fontFamily: "calibri",
                fontSize: "8pt",
                textAlign: "left",
                width: "25%",
              }}
            >
              {workPermitData?.work_end_time}
            </td>
          </tr>

          {/* <tr>
              <td
                style="border-right: 1px solid !important;
                                                              border-top: 1px solid !important;
                                                             border-bottom: 1px solid !important; font-family: calibri; font-size: 8pt; text-align: left; width: 25%;"
              >
                <strong>designation</strong>
              </td>
              <td
                style="border-right: 1px solid !important;
                                                              border-top: 1px solid !important;
                                                             border-bottom: 1px solid !important; font-family: calibri; font-size: 8pt; text-align: left; width: 25%;"
              >
                Type
              </td>
              <td
                style="border-right: 1px solid !important;
                                                          border-top: 1px solid !important;
                                                         border-bottom: 1px solid !important; font-family: calibri; font-size: 8pt; text-align: left; width: 25%;"
              >
                Subcontractor
              </td>
              <td
                style="border-right: 1px solid !important;
                                                              border-top: 1px solid !important;
                                                             border-bottom: 1px solid !important; font-family: calibri; font-size: 8pt; text-align: center; width: 25%;"
              >
                Construction Worker
              </td>
            </tr> */}
          {/* <tr>
              <td colspan="2">Section 2: Task Details </td>
            </tr> */}
        </tbody>
      </table>
      <div style={{ marginTop: "30px" }}>
        <p>GPS Location(Google Maps):</p>
        <div>
          <img src={codebar} alt="" />
        </div>
      </div>
      <div className="footer-text" style={{ pageBreakAfter: "always" }}>
        <p style={{ marginTop: "60px" }}>
          - Copyright© YALLA SAFETY 2023 version number: 2.3.0
        </p>
      </div>

      <div classNameName="table-data text-center" style={{ marginTop: "60px" }}>
        <table>
          <tr>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={strabagimage}
                alt="Image 1"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={engineerimage}
                alt="Image 1"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={yallasafety}
                alt="Image 1"
                style={{
                  maxWidth: "50%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
          </tr>
        </table>
        <div
          classNameName="table-data text-center"
          style={{ marginTop: "60px" }}
        >
          <table
            className="table tablePrintData __web-inspector-hide-shortcut__"
            style={{
              padding: "0px",
              float: "none",
              margin: "0px",
              fontSize: "8pt",
              fontFamily: "calibri",
              textAlign: "left",
              width: "100%",
            }}
          >
            <tbody style={{ border: "1px solid" }}>
              <tr>
                <td
                  colspan="5"
                  style={{
                    margin: "0px",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    fontFamily: "calibri",
                    fontSize: "14pt",
                    textAlign: "left",
                    fontWeight: "bold",
                    padding: "14px 8px",
                    background: "#80808047",
                  }}
                >
                  Section 3: Safety Precautions
                </td>
              </tr>
              <tr>
                <td
                  colspan="5"
                  style={{
                    margin: "0px",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    fontFamily: "calibri",
                    fontSize: "14pt",
                    textAlign: "left",
                  }}
                >
                  {workPermitData?.safety}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    margin: "0px",
                    borderStyle: "solid",
                    borderWidth: "1px",
                    fontFamily: "calibri",
                    fontSize: "14pt",
                    background: "#80808047",
                    textAlign: "left",
                    width: "25%",
                  }}
                >
                  <strong>More:</strong>
                </td>
                <td
                  style={{
                    borderRight: "1px solid !important",
                    borderTop: "1px solid !important",
                    borderBottom: "1px solid !important",
                    fontFamily: "calibri",
                    fontSize: "8pt",
                    textAlign: "left",
                    width: "25%",
                  }}
                >
                  {workPermitData?.more_safety}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div classNameName="table-data text-center" style={{ marginTop: "60px" }}>
        <table
          className="table tablePrintData __web-inspector-hide-shortcut__"
          style={{
            padding: "0px",
            float: "none",
            margin: "0px",
            fontSize: "8pt",
            fontFamily: "calibri",
            textAlign: "left",
            width: "100%",
          }}
        >
          <tbody style={{ border: "1px solid" }}>
            <tr>
              <td
                colspan="5"
                style={{
                  margin: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "calibri",
                  fontSize: "14pt",
                  textAlign: "left",
                  fontWeight: "bold",
                  padding: "14px 8px",
                  background: "#80808047",
                }}
              >
                Section 4: equipment/machinery involved:
              </td>
            </tr>
            <tr>
              <td
                colspan="5"
                style={{
                  margin: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "calibri",
                  fontSize: "14pt",
                  textAlign: "left",
                }}
              >
                {workPermitData?.equipment}
              </td>
            </tr>
            <tr>
              <td
                style={{
                  borderRight: "1px solid !important",
                  borderTop: "1px solid !important",
                  borderBottom: "1px solid !important",
                  fontFamily: "calibri",
                  fontSize: "14pt",
                  background: "#80808047",
                  textAlign: "left",
                  width: "25%",
                }}
              >
                <strong>More:</strong>
              </td>
              <td
                style={{
                  margin: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "calibri",
                  fontSize: "8pt",
                  textAlign: "left",
                  width: "25%",
                }}
              >
                {workPermitData?.more_equipment}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div classNameName="table-data text-center" style={{ marginTop: "60px" }}>
        <table
          className="table tablePrintData __web-inspector-hide-shortcut__"
          style={{
            padding: "0px",
            float: "none",
            margin: "0px",
            fontSize: "8pt",
            fontFamily: "calibri",
            textAlign: "left",
            width: "100%",
          }}
        >
          <tbody style={{ border: "1px solid" }}>
            <tr>
              <td
                colspan="5"
                style={{
                  margin: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "calibri",
                  fontSize: "14pt",
                  textAlign: "left",
                  fontWeight: "bold",
                  padding: "14px 8px",
                  background: "#80808047",
                }}
              >
                Section 7: Personal List :
              </td>
            </tr>

            <tr>
              <td
                style={{
                  margin: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "calibri",
                  fontSize: "8pt",
                  textAlign: "left",
                  width: "25%",
                }}
              >
                {workPermitData?.full_name}
              </td>
              <td
                style={{
                  margin: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "calibri",
                  fontSize: "8pt",
                  textAlign: "left",
                  width: "25%",
                }}
              >
                {workPermitData?.type_of_worker}
              </td>
              <td
                style={{
                  margin: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "calibri",
                  fontSize: "8pt",
                  textAlign: "left",
                  width: "25%",
                }}
              >
                {workPermitData?.email}
              </td>
              <td
                style={{
                  margin: "0px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  fontFamily: "calibri",
                  fontSize: "8pt",
                  textAlign: "left",
                  width: "25%",
                }}
              >
                {workPermitData?.phone_number}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div
        classNameName="table-data text-center"
        style={{ marginTop: "500px" }}
      >
        <table>
          <tr>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={strabagimage}
                alt="Image 1"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={engineerimage}
                alt="Image 1"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={yallasafety}
                alt="Image 1"
                style={{
                  maxWidth: "50%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
          </tr>
        </table>
        <div
          classNameName="table-data text-center"
          style={{ marginTop: "60px" }}
        >
          <h4>Isolation and Lockout Procedures</h4>
          <h5>Details of equipment or systems to be isolated:</h5>
          <p>
            Identify the specific equipment or systems that need to be isolated
            for the safe execution of [Type of Work].
          </p>
          <h5>Lockout/tag-out procedures:</h5>
          <p>
            [Provide detailed steps for the proper lockout/tag-out procedures to
            ensure the isolation of energy sources during [Type of Work].]
          </p>
          <h4>Communication Plan</h4>
          <h5>How communication will be maintained during the work:</h5>
          <p>
            [Explain the communication methods and channels to be used to
            maintain contact between team members and relevant stakeholders
            during the [Type of Work].]
          </p>
          <h5>Emergency communication procedures:</h5>
          <p>
            [Clearly outline the procedures for emergency communication during
            [Type of Work], including who to contact and how to convey critical
            information.]
          </p>
          <h4>Permit Conditions</h4>
          <h5>Compliance with all safety regulations and procedures:</h5>
          <p>
            [Emphasize the importance of all personnel adhering to [Your Company
            Name]'s safety regulations and procedures during [Type of Work].]
          </p>
          <h4>Adherence to the specified work hours:</h4>
          <p>
            [Specify the authorized work hours for [Type of Work] and stress the
            importance of adhering to the designated timeframe.]
          </p>
          <h5>Reporting any unexpected findings or incidents immediately:</h5>
          <p>
            [Clearly state the requirement for all personnel to report any
            unexpected findings or incidents promptly to the supervisor or
            relevant authority during [Type of Work].]
          </p>
          <h4>Permit Validity</h4>
          <h5>
            The permit is valid only for the specified date and time mentioned:
          </h5>
          <p>
            [Stress that the permit is time-sensitive and valid only for the
            specified date and time. Any work conducted outside this timeframe
            requires a new permit.]
          </p>
          <h4>Company Policy on Working at Heights Rescues</h4>
          <p>
            The implementation and maintenance of a safe work environment are
            the collective responsibility of all employees, subcontractors, and
            visitors to the jobsite. It is the policy of [Your Company Name] to
            provide prompt medical treatment when a worker is injured on the
            jobsite. This may involve performing a working at heights rescue to
            bring down a worker who has fallen and is suspended in a safety
            harness.
          </p>
        </div>
      </div>

      <div
        classNameName="table-data text-center"
        style={{ marginTop: "260px" }}
      >
        <table>
          <tr>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={strabagimage}
                alt="Image 1"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={engineerimage}
                alt="Image 1"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
            <td
              style={{
                width: "33%",
                verticalAlign: "middle",
                padding: "10px",
              }}
            >
              {" "}
              <img
                src={yallasafety}
                alt="Image 1"
                style={{
                  maxWidth: "50%",
                  maxHeight: "100%",
                  display: "block",
                  margin: "0 auto",
                }}
              />
            </td>
          </tr>
        </table>
        <div
          classNameName="table-data text-center"
          style={{ marginTop: "60px" }}
        >
          <h4>Purpose of Working at Heights Rescues</h4>
          <p>
            When a worker falls and is suspended in a harness, it is crucial to
            execute a rescue as quickly as possible due to the following
            reasons: The worker may have sustained injuries during the fall and
            may require immediate medical attention. Prolonged suspension in
            safety harnesses may lead to blood pooling in the lower body,
            resulting in suspension trauma. Suspended workers may experience
            panic if not rescued promptly. The event that led to the fall may
            introduce additional risks that need immediate attention.
          </p>
          <h4>Emergency Planning</h4>
          <h5>The three main components of emergency planning are:</h5>
          <p>Training:</p>
          <p>
            All site personnel must attend a site-specific safety training
            session covering emergency response procedures, alarms, and assembly
            areas
          </p>
          <p>
            Designate a crew for rescue and ensure they are trained in the use
            of available equipment, conducting bi-weekly reviews of rescue
            procedures with crane crews
          </p>
          <p>
            <b>Emergency Response Plan:</b>
          </p>
          <p>
            In the event of a worker suspended by a safety harness, implement
            the emergency response plan with the following steps: The site
            supervisor takes control of the situation.
          </p>
          <p>The site supervisor activates the emergency alarm.</p>
          <p>Notify HSE team, IT Dept, and Security immediately.</p>
          <p>
            Stop all work in the immediate vicinity, evaluate the situation, and
            identify further hazards.
          </p>
          <p>
            Call for help if needed, and contact emergency services (999 for
            police, 997 for fire, 991 for ambulance).
          </p>
          <p>
            Isolate the accident zone, move non-affected personnel to a safe
            zone, and assemble the emergency rescue team. Secure the accident
            zone perimeter.
          </p>
          <p>
            Assemble the emergency rescue team and determine the best rescue
            procedure.
          </p>
          <h4>Rescue Procedures</h4>
          <h5>
            Two rescue procedures are outlined, with (A) being the preferred
            method and (B) as an alternative when no other means are available.
          </h5>
          <p>A. Elevating Work Platform (EWP) Rescue:</p>
          <p>Use an EWP if available and reachable.</p>
          <p>
            Ensure proper coordination with concerned departments and the HSE
            team.
          </p>
          <p>
            Perform the rescue with a focus on safety, using a boom lift if
            necessary.
          </p>
          <p>
            Ensure rescue workers wear full-body harnesses attached to
            appropriate anchors.
          </p>
          <p>
            Disconnect the worker's lanyard when safe, lower the worker, and
            administer first aid.
          </p>
          <p>Call for an ambulance if necessary.</p>
          <p>B. Ladder Rescue:</p>
          <p>Use ladders if an EWP is unavailable.</p>
          <p>
            Rig lifelines for rescuers and securely attach a separate lowering
            line to the fallen worker's harness.
          </p>
          <p>Lower the worker while guiding from the ladder.</p>
          <p>Administer first aid and call for an ambulance if necessary.</p>
          <h4>Post-Rescue Procedure</h4>
          <p>
            Non-affected workers remain in the designated safe gathering zone
            until notified otherwise.
          </p>
          <p>
            Initiate an accident investigation, quarantine fall-arrest
            equipment, and secure the accident scene.
          </p>
          <p>
            Ensure compliance with jobsite-specific rescue and evacuation plans.
          </p>
          <p>Record all necessary information related to the incident.</p>
          <p>
            This procedure applies to all managers, supervisors, forepersons,
            employees, subcontractors, and visitors on the project site.
          </p>
        </div>
      </div>
      <div
        className="table-data last-signature-dev"
        style={{ marginTop: "120px" }}
      >
        <table
          style={{
            width: "100%",
            textAlign: "center",
            borderCollapse: "collapse",
          }}
        >
          <tr>
            <td
              style={{ width: "33%", verticalAlign: "middle", padding: "10px" }}
            >
              <img src={strabagimage} alt="Image 1" />
              <p>Team leader Signature</p>
              <img src={teamLeaderSignature} alt="Team leader" />
            </td>
            <td
              style={{ width: "33%", verticalAlign: "middle", padding: "10px" }}
            >
              <img src={engineerimage} alt="Image 2" />
              <p>Engineer signature</p>
              {decryptData(KIND, SessionStorage) == "E" ? (
                <img src={signature} alt="Engineer Signature" />
              ) : (
                <img
                  src={workPermitData?.pdf_engineer}
                  alt="Engineer Signature"
                />
              )}
            </td>
            <td
              style={{ width: "33%", verticalAlign: "middle", padding: "10px" }}
            >
              <img src={yallasafety} alt="Signature" />
              <p>Safety officer signature</p>
              {decryptData(KIND, SessionStorage) == "S" ? (
                <img src={signature} alt="Safety Signature" />
              ) : (
                <img src={workPermitData?.pdf_safety} alt="Safety Signature" />
              )}
            </td>
          </tr>
        </table>
      </div>
    </div>
  );
});

export default Workpermitpdf;
