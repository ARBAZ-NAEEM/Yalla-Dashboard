import React, { Fragment, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Modal, Button, ModalBody, ModalHeader, Row } from "reactstrap";
import SignatureCanvas from "react-signature-canvas";
import {
  RESET_FORM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../redux/actionType/CrudActionTypes";
import { GetRequest, PatchFormRequest, PostRequest } from "../utils/Config";
import { SessionStorage } from "../common/SetupMasterEnum";
import {
  COMPANY_DETAILS,
  KIND,
  UserNetworkInfo,
} from "../utils/EncryptedConstants";
import { decryptData } from "../EncryptData";
import { PERMIT_SUPER } from "../utils/UrlConstants";
import CrudFormComponent from "../components/FormComponents/CrudFormComponent";
import Workpermitpdf from "./Workpermitpdf";
import { useReactToPrint } from "react-to-print";
import SaveWorkPermit from "./SaveWorkPermit";
import html2pdf from "html2pdf.js";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
  DeleteWithConfirmation,
  SuccessAlert,
} from "../components/Alert";
import { generateRandomNumber } from "../utils/RandomFunction";

const WorkPermit = () => {
  const contentRef = useRef(null);
  const bulkPrintAdmitSlip = useRef(null);
  const initialFormFields = {
    id: "",
    full_name: "",
    type_of_worker: "",
    phone_number: "",
    work_start_date: "",
    work_end_date: "",
    engineer_status: "",
    IPAddress: decryptData(UserNetworkInfo)?.IPv4,
    next: 0,
    previous: 0,
  };

  const initialSearchFields = {};
  const SignatureCanvaRef = useRef(null);
  const [paginationList, setPaginationList] = useState(1);
  const [teamLeaderSignature, setTeamLeaderSignature] = useState();

  const dispatch = useDispatch();

  useEffect(() => {
    getWorkPermitData();
  }, []);

  const verifyKind = decryptData(KIND, SessionStorage);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { TableList } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const timeoutRef = useRef(null);
  const [workPermitData, setWorkPermitData] = useState();
  const [signature, setSignature] = useState();
  const [rowId, setRowId] = useState();
  const [modalState, setModalState] = useState(false);
  const [loading, setLoading] = useState(false);

  const [signatureNumber, setSignatureNumber] = useState("");
  const [pdfNumber, setPdfNumber] = useState("");

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const getWorkPermitData = () => {
    GetRequest(PERMIT_SUPER, initialFormFields)
      .then((res) => {
        setPaginationList(res?.data);
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.results,
            FormFields: initialFormFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handlePrintBulkAdmitSlip = useReactToPrint({
    content: () => bulkPrintAdmitSlip.current,
  });

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const onViewRow = (obj) => {
    setWorkPermitData(obj);
    setTimeout(() => handlePrintBulkAdmitSlip(), 300);
  };

  async function imageUrlToBase64(url) {
    debugger;
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const reader = new FileReader();
      return new Promise((resolve, reject) => {
        reader.onloadend = () => resolve(reader.result.split(",")[1]);
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error("Error fetching or converting the image:", error);
      return null;
    }
  }

  const onConfirmRow = (obj) => {
    setRowId(obj?.id);
    setWorkPermitData(obj);
    setTeamLeaderSignature(obj?.signature);
    setModalState(true);
  };

  const handleCLickSaveSignature = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const signatureDataURL = SignatureCanvaRef.current
        .getCanvas()
        .toDataURL("image/png");

      const signatureDataURL2 = SignatureCanvaRef.current.getCanvas();
      setSignature(signatureDataURL);
      var file = dataURLtoFile(signatureDataURL, `${signatureNumber}.png`);
      // setTimeout(() => {
      //   ; // Set loading to false when the operation is complete.
      // }, 3000);
    } catch (error) {
      console.error("Error:", error);
      setLoading(false); // Set loading to false in case of an error.
    }
  };

  function dataURLtoFile(dataurl, filename) {
    debugger;
    var arr = dataurl.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[arr.length - 1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return (
      // new File([u8arr], filename, { type: mime })
      generatePdf(new File([u8arr], filename, { type: mime }))
    );
  }

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      console.log("Confirmation Result:", result);
      if (result.isConfirmed) {
        const payload = {
          id: obj?.id,
          IPAddress: decryptData(UserNetworkInfo)?.IPv4,
          engineer_status: verifyKind === "E" ? obj?.engineer_status : "",
          safety_status: verifyKind === "S" ? obj?.safety_status : "",
        };

        const formData = new FormData();
        formData.append("safety_status", verifyKind === "S" ? "rejected" : "");
        formData.append(
          "engineer_status",
          verifyKind === "E" ? "rejected" : ""
        );

        PatchFormRequest(`forms/permit_super/${obj.id}/`, formData).then(
          (res) => {
            CustomSuccessAlert("Rejected !");
            getWorkPermitData();
          }
        );

        // PostRequest(PERMIT_SUPER, payload)
        //   .then((res) => {
        //     console.log(res);
        //     if (res?.data?.results === "new") {
        //       dispatch({
        //         type: RESET_FORM_FIELDS,
        //         payload: {
        //           List: res?.data?.results,
        //           FormFields: initialFormFields,
        //         },
        //       });
        //     }
        //     console.log(res);

        //     getWorkPermitData();
        //   })
        //   .catch((err) => {
        //     console.error(err);
        //   });
      }
    });
  };

  const generatePdf = (signatureDataURL) => {
    const content = contentRef.current;
    var opt = {
      image: { type: "jpeg", quality: 1 },
      jsPDF: { format: "A4", orientation: "portrait" },
    };
    debugger;
    if (content) {
      html2pdf()
        .set(opt)
        .from(content)
        .outputPdf("blob")
        .then((pdf) => {
          const pdfBlob = new Blob([pdf], { type: "application/pdf" });
          const formData = new FormData();
          formData.append("pdf", pdfBlob, `${pdfNumber}.pdf`);
          formData.append(
            "pdf_safety",
            verifyKind === "S" ? signatureDataURL : ""
          );
          formData.append(
            "pdf_engineer",
            verifyKind === "E" ? signatureDataURL : ""
          );
          // formData.append("pdf_safety", signatureDataURL);
          // formData.append("pdf_engineer", signatureDataURL);

          formData.append(
            "safety_status",
            verifyKind === "S" ? "accepted" : ""
          );
          formData.append(
            "engineer_status",
            verifyKind === "E" ? "accepted" : ""
          );

          PatchFormRequest(`forms/permit_super/${rowId}/`, formData)
            .then((res) => {
              setModalState(false);
              setLoading(false);
              SuccessAlert();
              setSignature("");
              getWorkPermitData();
            })
            .catch((err) => {});
        });
    }
  };

  const handelClickCancelSignature = () => {
    setModalState(false);
    setSignature(" ");
  };

  const clearSignature = () => {
    SignatureCanvaRef.current.clear();
  };

  const handelUndoSignature = () => {
    setSignature("");
    setModalState(true);
    clearSignature();
  };

  const customModal = (
    <Modal
      isOpen={modalState}
      centered
      modalSize="md"
      modalTransition={{ timeout: 10 }}
      style={{ minWidth: "40vw", width: "50%" }}
    >
      <ModalHeader style={{ backgroundColor: "rgb(115, 103, 240)" }}>
        {verifyKind === "S"
          ? "Saftery Engineer (HSE) Signature"
          : "Engineer Signature"}
      </ModalHeader>
      <ModalBody>
        <form onSubmit={handleCLickSaveSignature}>
          <Fragment>
            <SignatureCanvas
              ref={SignatureCanvaRef}
              canvasProps={{ width: 500, height: 200 }}
            />
          </Fragment>
          <Row>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                color="primary"
                type="submit"
                style={{
                  backgroundColor: "#076030",
                  borderColor: "#076030",
                }}
              >
                Save
              </Button>
              {loading && (
                <div className="loader-wrapper">
                  <div className="loader"></div>
                </div>
              )}

              <Button color="default" onClick={handelUndoSignature}>
                Undo
              </Button>

              <Button color="default" onClick={handelClickCancelSignature}>
                Cancel
              </Button>
            </div>
          </Row>
        </form>
      </ModalBody>
    </Modal>
  );

  const columns = [
    { field: "full_name", name: "Full Name" },
    { field: "type_of_worker", name: "Type of work" },
    // { field: "phone_number", name: "Phone Number" },
    { field: "work_start_date", name: "Start Date" },
    { field: "work_start_time", name: "Start Time" },
    { field: "work_end_date", name: "End Date" },
    { field: "work_end_time", name: "End Time" },
    { field: "engineer_status", name: "Engineer Status" },
    { field: "engineer_status", name: "Engineer Status" },
  ];

  const customTable = (
    <>
      <Row>
        <Col>
          <div>
            <table className="table mb-0 mt-2 scrollable-table">
              <thead>
                <tr>
                  <th
                    className="text-left"
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                  >
                    S.No
                  </th>
                  <th
                    className="text-left"
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                  >
                    Full Name
                  </th>
                  <th
                    className="text-left"
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                  >
                    Type of Work
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-left"
                  >
                    Start Date
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-left"
                  >
                    Start Time
                  </th>

                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-left"
                  >
                    End Date
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-left"
                  >
                    End Time
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-left"
                  >
                    Engineer Status
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-left"
                  >
                    HSC Status
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-center"
                  >
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {TableList?.length > 0 &&
                  TableList?.map((item, index) => {
                    return (
                      <tr style={{ verticalAlign: "middle" }} key={index}>
                        <td className="text-lrft">
                          <span className=" for-number">{index + 1}</span>
                        </td>
                        <td className="text-left">{item?.full_name}</td>
                        <td className="text-left">{item?.type_of_worker}</td>
                        {/* <td className="text-center">{item?.phone_number}</td> */}
                        <td className="text-left">{item?.work_start_date}</td>
                        <td className="text-left">{item?.work_start_time}</td>
                        <td className="text-left">{item?.work_end_date}</td>
                        <td className="text-left">{item?.work_end_time}</td>
                        <td className="text-left">
                          <span
                            className={
                              item?.engineer_status === "accepted"
                                ? "accepted-class"
                                : item?.engineer_status === "rejected"
                                ? "reject-class"
                                : item?.engineer_status === "new"
                                ? "new-class"
                                : "default-class"
                            }
                          >
                            {" "}
                            {item?.engineer_status}
                          </span>
                        </td>
                        <td className="text-left">
                          <span
                            className={
                              item?.safety_status === "accepted"
                                ? "accepted-class"
                                : item?.safety_status === "rejected"
                                ? "reject-class"
                                : item?.safety_status === "new"
                                ? "new-class"
                                : "default-class"
                            }
                          >
                            {" "}
                            {item?.safety_status}
                          </span>
                        </td>
                        <td
                          className="text-center"
                          style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                        >
                          <>
                            <Button
                              color="primary"
                              className="btnic"
                              size="sm"
                              onClick={() => onViewRow(item)}
                            >
                              <i className="fa fa-eye"></i>
                            </Button>

                            {verifyKind === "E" &&
                              item?.engineer_status === "new" && (
                                <Button
                                  color="success"
                                  className="btnic"
                                  size="sm"
                                  onClick={() => onConfirmRow(item)}
                                >
                                  <i className="fa fa-thumbs-o-up"> </i>
                                </Button>
                              )}

                            {verifyKind === "S" &&
                              item?.safety_status === "new" && (
                                <Button
                                  color="success"
                                  className="btnic"
                                  size="sm"
                                  onClick={() => onConfirmRow(item)}
                                >
                                  <i className="fa fa-thumbs-o-up"> </i>
                                </Button>
                              )}

                            {/* checking */}

                            {verifyKind === "E" &&
                              item?.engineer_status === "new" && (
                                <Button
                                  color="danger"
                                  className="btnic"
                                  size="sm"
                                  onClick={() => onDeleteRow(item)}
                                >
                                  <i className="fa fa-remove"></i>
                                </Button>
                              )}

                            {verifyKind === "S" &&
                              item?.safety_status === "new" && (
                                <Button
                                  color="danger"
                                  className="btnic"
                                  size="sm"
                                  onClick={() => onDeleteRow(item)}
                                >
                                  <i className="fa fa-remove"></i>
                                </Button>
                              )}

                            {/* {item?.engineer_status == "new" && (
                              <Button
                                color="danger"
                                className="btnic"
                                size="sm"
                                onClick={() => onDeleteRow(item)}
                              >
                                <i className="fa fa-remove"></i>
                              </Button>
                            )} */}
                          </>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {TableList?.length == 0 && (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  background: "#e9e9e9",
                  marginTop: -5,
                  padding: 20,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                No Data Available
              </div>
            )}
          </div>
        </Col>
      </Row>
    </>
  );

  return (
    <>
      <CrudFormComponent
        customButton={"Work Permit"}
        formName={"sadasd"}
        hideSearchPanel={true}
        tableColumns={columns}
        tableRows={TableList}
        customTable={customTable}
        customModal={customModal}
        initialFormFields={initialFormFields}
        featureList={menuTable?.Table2?.filter(
          (x) => x.MenuId === selectedMenu
        )}
        cancelSearch={cancelSearch}
        handleCancel={handleCancel}
        modalStyle={{ minWidth: "60vw", width: "60%" }}
      />
      <div style={{ display: "none" }}>
        <Workpermitpdf
          ref={contentRef}
          signature={signature}
          workPermitData={workPermitData}
          teamLeaderSignature={teamLeaderSignature}
        />
        <SaveWorkPermit
          ref={bulkPrintAdmitSlip}
          signature={signature}
          workPermitData={workPermitData}
        />
      </div>
    </>
  );
};

export default WorkPermit;
