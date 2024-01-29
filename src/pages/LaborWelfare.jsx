/* eslint-disable jsx-a11y/anchor-has-content */
import React, { Fragment, useRef } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  Row,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
} from "reactstrap";
import SignatureCanvas from "react-signature-canvas";
import ResetPasswordModal from "./ResetPasswordModal";
import {
  RESET_FORM_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../redux/actionType/CrudActionTypes";
import FormGroupInput from "../components/GeneralComponent/FormGroupInput";
import {
  GetRequest,
  PatchFormRequest,
  PostRequest,
  SecuritySetup_ForgetCredentials,
  SecuritySetup_ResetPassword,
  Setup_Admission_AcademicYear,
  Setup_Dashboard,
  Setup_Work_Permit,
} from "../utils/Config";
import Swal from "sweetalert2";
import { PasswordStrength } from "../utils/Constants";
import { Insert, Select, SessionStorage } from "../common/SetupMasterEnum";
import {
  COMPANY_DETAILS,
  COMPANY_ID,
  KIND,
  LOGINID,
  RESETPASSWORD,
  UserNetworkInfo,
} from "../utils/EncryptedConstants";
import { decryptData, encryptData } from "../EncryptData";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import paymentImage from "../../src/assets/img/icons8-payment-75.png";
import receiptImage from "../../src/assets/img/icons8-receipt-75.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faCreditCard,
  faFile,
  faFileInvoice,
  faFileLines,
  faReceipt,
} from "@fortawesome/free-solid-svg-icons";
import { SET_SELECTED_MENU } from "../redux/actionType/AuthType";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { DASHBOARD, PERMIT_SUPER } from "../utils/UrlConstants";
import CrudFormComponent from "../components/FormComponents/CrudFormComponent";
import { dateFormat } from "../common/dateFormatEnum";
import DatePicker from "react-datepicker";
import FormGroupSelect from "../components/GeneralComponent/FormGroupSelect";
import { formatDateFunction } from "../functions/DateFormatFunction";
import { dateFormatPlaceholder } from "../utils/CommonMethods";
import Workpermitpdf from "./Workpermitpdf";
import { useReactToPrint } from "react-to-print";
import axios from "axios";
import SaveWorkPermit from "./SaveWorkPermit";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { SaveFile } from "../utils/SaveFile";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
  DeleteWithConfirmation,
} from "../components/Alert";
import LaborComponent from "../components/GeneralComponent/LaborComponent";

// import {
//   CustomErrorMessage,
//   DeleteWithConfirmation,
//   CustomSuccessAlert,
// } from "../../../components/Alert";

const LaborWelfare = () => {
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

  const { FormFields, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );

  const SignatureCanvaRef = useRef(null);
  const [paginationList, setPaginationList] = useState(1);
  // const [pageNo, setPageNo] = useState("");
  const [pageNumber, setPageNumber] = useState("");
  const [pageNumberPrview, setPageNumberPrview] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    // dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: initialFormFields });
    getWorkPermitData();
    console.log(decryptData(KIND, SessionStorage));
  }, []);

  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const { SearchFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const timeoutRef = useRef(null);
  const workPermitRef = useRef(null);

  const reportTemplatePDF = useRef(null);
  const saveWorkPermitRef = useRef(null);

  const [workPermitData, setWorkPermitData] = useState();
  const [signature, setSignature] = useState();
  const [documentPath, setDocumentPath] = useState();
  const [rowId, setRowId] = useState();

  const [searchStartDate, setSearchStartDate] = useState("");
  const [searchEndDate, setSearchEndDate] = useState("");
  const [modalState, setModalState] = useState(false);

  useEffect(() => {
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const getWorkPermitData = () => {
    // GetRequest(PERMIT_SUPER, initialFormFields)
    //   .then((res) => {
    //     setPaginationList(res?.data);
    //     // setPageNumber(res?.data?.next?.split("/")?.pop());
    //     // setPageNumberPrview(res?.data?.next?.split("/")?.pop());
    //     dispatch({
    //       type: SET_INITIAL_CRUD_FORM_STATE,
    //       payload: {
    //         List: res?.data?.results,
    //         FormFields: initialFormFields,
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  // const handlePagination = (type) => {
  //   console.log(pageNo);
  //   if (type == "Previous") {
  //     setPageNo(pageNo - 1);
  //     initialFormFields.previous = pageNo - 1;
  //     getWorkPermitData();
  //   } else if (type == "Next") {
  //     setPageNo(pageNo + 1);
  //     initialFormFields.next = pageNo + 1;
  //     getWorkPermitData();
  //   }
  // };

  const AllDateSet = (event, type) => {
    if (type === "StartDateSearch") {
      setSearchStartDate(event);
      let date = formatDateFunction(event, "-");
      SearchFields.StartYearDate = date;
      let data1 = {
        name: "StartYearDate",
        value: SearchFields.StartYearDate,
      };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    } else if (type === "EndDateSearch") {
      setSearchEndDate(event);
      let date = formatDateFunction(event, "-");
      SearchFields.EndYearDate = date;
      let data1 = {
        name: "EndYearDate",
        value: SearchFields.EndYearDate,
      };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    } else if (type === "StartDate") {
      let date = formatDateFunction(event, "-");
      FormFields.StartYearDate = event;
      let data1 = {
        name: "StartYearDate",
        value: FormFields.StartYearDate,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
    } else if (type === "EndDate") {
      let date = formatDateFunction(event, "-");
      FormFields.EndYearDate = event;
      let data1 = {
        name: "EndYearDate",
        value: FormFields.EndYearDate,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
    }
  };

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  // const searchPanel = (
  //   <Fragment>
  //     <Col lg="2" md="2" xs="12">
  //       <FormGroupInput
  //         label="Ticket Number"
  //         name="TicketNumber"
  //         fieldId="TicketId"
  //         fieldName="TicketNumber"
  //         onChange={handleSearchChange}
  //         value={SearchFields?.TicketNumber}
  //         required
  //       />
  //     </Col>
  //     <Col lg="2" md="2" xs="12">
  //       <FormGroupSelect
  //         label="Complaint Type"
  //         name="ComplaintType"
  //         onChange={handleSearchChange}
  //       />
  //     </Col>
  //     <Col lg="2" md="2" xs="12">
  //       <FormGroupInput
  //         label="Partner Name"
  //         name="PartnerName"
  //         fieldId="TicketId"
  //         fieldName="TicketNumber"
  //         onChange={handleSearchChange}
  //         value={SearchFields?.PartnerName}
  //       />
  //     </Col>
  //     <Col lg="2" md="2" xs="12">
  //       <FormGroupInput
  //         label="Dealer Name"
  //         name="DealerName"
  //         fieldId="DealerNameId"
  //         fieldName="DealerName"
  //         onChange={handleSearchChange}
  //         value={SearchFields?.DealerName}
  //       />
  //     </Col>
  //     <Col lg="2" md="2" xs="12">
  //       <FormGroupInput
  //         label="Sub Dealer"
  //         name="SubDealer"
  //         fieldId="SubDealerId"
  //         fieldName="SubDealerName"
  //         onChange={handleSearchChange}
  //         value={SearchFields?.SubDealer}
  //       />
  //     </Col>
  //     <Col lg="2" md="2" xs="12">
  //       <FormGroupSelect
  //         label="Status"
  //         name="Status"
  //         onChange={handleSearchChange}
  //       />
  //     </Col>
  //     <Col lg="2" md="2" xs="12">
  //       <div className="form-group">
  //         <label className="form-label">
  //           Date<span className="text-danger">*</span>
  //         </label>
  //         <DatePicker
  //           selected={searchStartDate}
  //           onChange={(e) => AllDateSet(e, "StartDateSearch")}
  //           className="form-control"
  //           name="StartYearDate"
  //           showYearDropdown={true}
  //           dateFormat={dateFormat}
  //           placeholderText={dateFormatPlaceholder}
  //         />
  //       </div>
  //     </Col>
  //     <Col lg="2" md="2" xs="12">
  //       <FormGroupSelect
  //         label="City"
  //         name="City"
  //         onChange={handleSearchChange}
  //       />
  //     </Col>
  //     <Col lg="2" md="2" xs="12">
  //       <FormGroupSelect
  //         label="Department"
  //         name="Department"
  //         onChange={handleSearchChange}
  //       />
  //     </Col>
  //   </Fragment>
  // );

  // const submitSearch = () => {
  //   const payload = {
  //     OperationId: 0,
  //     StartYearDate: formatDateFunction(SearchFields?.StartYearDate, "-"),
  //     EndYearDate: formatDateFunction(SearchFields?.EndYearDate, "-"),
  //     Description: SearchFields?.Description,
  //     IsActive: 0,
  //     UserId: decryptData(LOGINID, SessionStorage),
  //   };

  //   Setup_Admission_AcademicYear(payload)
  //     .then((res) => {
  //       setSearchStartDate("");
  //       setSearchEndDate("");
  //       dispatch({
  //         type: SET_INITIAL_CRUD_FORM_STATE,
  //         payload: {
  //           List: res.data.Table,
  //           FormFields: initialFormFields,
  //           SearchFields: initialSearchFields,
  //         },
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  // const submitForm = (id) => {
  //   const payload = {
  //     OperationId: id,
  //     StartYearDate: FormFields?.StartYearDate,
  //     EndYearDate: FormFields?.EndYearDate,
  //     Description: FormFields?.Description,
  //     IsActive: 1,
  //     UserId: decryptData(LOGINID, SessionStorage),
  //   };

  //   Setup_Admission_AcademicYear(payload)
  //     .then((res) => {
  //       dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  //       if (res.data.Table[0].HasError === 0) {
  //         CustomSuccessAlert(res.data.Table[0].Message);
  //         getAcademicYearData();
  //       } else {
  //         CustomErrorMessage(res.data.Table[0].Message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const onDeleteRow = (obj) => {
    // let obj = TableList[index];
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          id: obj?.id,
          engineer_status: obj?.engineer_status,
        };

        PostRequest(PERMIT_SUPER, payload)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res?.data?.data.engineer_status === "new") {
              CustomSuccessAlert("");
              getWorkPermitData();
            } else {
              CustomErrorMessage("sadasd");
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
    // const data = {
    //   StartYearDate: new Date(obj?.FromDate),
    //   EndYearDate: new Date(obj?.ToDate),
    //   Description: obj?.Description,
    //   IsActive: 1,
    //   UserId: decryptData(LOGINID, SessionStorage),
    // };

    // dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };
  const handlePrintBulkAdmitSlip = useReactToPrint({
    content: () => bulkPrintAdmitSlip.current,
  });
  // const onDeleteRow = (obj) => {
  //   DeleteWithConfirmation().then((result) => {
  //     console.log(result);
  //     if (result.isConfirmed) {
  //       const payload = {
  //         operationId: Delete,
  //         costcenterID: obj?.CostcenterID,
  //         name: obj?.Name,
  //         ccNatureID: obj?.CCNatureID,
  //         ccTypeID: obj?.CCTypeID,
  //         companyID: decryptData(COMPANY_ID, SessionStorage),
  //         // partyInfoID: obj?.PartyInfoID,
  //         beginingDate: obj.BeginingDate,
  //         expectedDate: obj.ExpectedDate,
  //         actualDate: obj.ActualDate,
  //         isActive: false,
  //         userID: decryptData(LOGINID, SessionStorage),
  //         userIP: decryptData(UserNetworkInfo)?.IPv4,
  //       };

  //       PostRequest(COST_CENTER, payload)
  //         .then((res) => {
  //           dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  //           if (res?.data?.Table?.[0]?.HasError === 0) {
  //             CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
  //             getCostCenter();
  //           } else {
  //             CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
  //           }
  //         })
  //         .catch((err) => {
  //           console.error(err);
  //         });
  //     }
  //   });
  // };

  // const customPagination = (
  //   <Fragment>
  //     {TableList?.length > 0 ? (
  //       <Fragment>
  //         <Row>
  //           <Col md="12" lg="12" className="text-right">
  //             <Button
  //               color="default"
  //               disabled={paginationList?.[0]?.Min_ == 0 ? true : false}
  //               onClick={() => handlePagination("Previous")}
  //             >
  //               <i
  //                 className="fa fa-chevron-left"
  //                 style={{ paddingRight: "7px" }}
  //               ></i>
  //             </Button>
  //             <Button
  //               disabled={
  //                 paginationList?.Total < paginationList?.Max_ ? true : false
  //               }
  //               color="secondary"
  //               onClick={() => handlePagination("Next")}
  //             >
  //               <i
  //                 className="fa fa-chevron-right"
  //                 style={{ paddingLeft: "7px" }}
  //               ></i>
  //             </Button>
  //           </Col>
  //         </Row>
  //         <Row>
  //           <Col md="12" lg="12" className="text-right">
  //             <p style={{ fontWeight: "bold", margin: 10 }}>
  //               Showing {paginationList?.count} to {paginationList?.[0]?.Max_}{" "}
  //               of {paginationList?.[0]?.Total} Records
  //             </p>
  //           </Col>
  //         </Row>
  //       </Fragment>
  //     ) : null}
  //   </Fragment>
  // );

  const onChatOpen = (obj) => {
    console.log("Helo");
  };

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
    // let obj = TableList[index];
    debugger;
    setWorkPermitData(obj);
    // handlePrintBulkAdmitSlip();
    // SaveFile(obj?.pdf, "ViewReport");
    setTimeout(() => handlePrintBulkAdmitSlip(), 300);

    // window.open(obj?.pdf);
  };

  const onConfirmRow = (obj) => {
    debugger;
    // console.log("onConfirmRow", obj);
    // let obj = TableList[index];
    setRowId(obj?.id);
    setModalState(true);
  };

  const formPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Ticket Number"
          name="TicketNumber"
          fieldId="TicketId"
          fieldName="TicketNumber"
          onChange={handleAddChange}
          value={FormFields?.TicketNumber}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Complaint Type"
          name="ComplaintType"
          onChange={handleAddChange}
          value={FormFields?.ComplaintType}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Partner Name"
          name="PartnerName"
          fieldId="PartnerNameId"
          fieldName="PartnerName"
          onChange={handleAddChange}
          value={FormFields?.PartnerName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Dealer Name"
          name="DealerName"
          fieldId="DealerNameId"
          fieldName="DealerName"
          onChange={handleAddChange}
          value={FormFields?.DealerName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Sub Dealer"
          name="SubDealer"
          fieldId="SubDealerId"
          fieldName="SubDealer"
          onChange={handleAddChange}
          value={FormFields?.SubDealer}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Status"
          name="Status"
          fieldId="StatusId"
          fieldName="Status"
          onChange={handleAddChange}
          value={FormFields?.Status}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <div className="form-group">
          <label className="form-label">
            Date<span className="text-danger">*</span>
          </label>
          <DatePicker
            selected={searchStartDate}
            onChange={(e) => AllDateSet(e, "StartDateSearch")}
            className="form-control"
            name="StartYearDate"
            showYearDropdown={true}
            dateFormat={dateFormat}
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="City"
          name="City"
          fieldId="CityId"
          fieldName="City"
          onChange={handleAddChange}
          value={FormFields?.City}
        />
      </Col>
      <Col lg="12" md="12" xs="12">
        <FormGroupInput
          label="Description"
          type="textarea"
          name="Description"
          fieldId="DescriptionId"
          fieldName="Description"
          maxLength={255}
          onChange={handleAddChange}
          value={FormFields?.Description}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Department"
          name="Department"
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Support Engineer"
          name="SupportEngineer"
          onChange={handleAddChange}
        />
      </Col>
    </Fragment>
  );

  // const SaveWorkPermit = (
  //   <div id="htmltopdf">
  //     <table>
  //       <tr>
  //         <th>Team leader Signature </th>
  //         <th>Engineer signature </th>
  //         <th>Safety officer signature </th>
  //       </tr>
  //       <tr>
  //         <td></td>
  //         <td>
  //           <img src={signature} />
  //         </td>
  //         <td></td>
  //       </tr>
  //     </table>
  //   </div>
  // );

  const handleCLickSaveSignature = async (e) => {
    e.preventDefault();
    debugger;
    const signatureDataURL = SignatureCanvaRef.current
      .getCanvas()
      .toDataURL("image/png");
    const signatureDataURL2 = SignatureCanvaRef.current.getCanvas();
    setSignature(signatureDataURL2);
    var file = dataURLtoFile(signatureDataURL, "signature-aa.png");
    console.log(file);
    // var opt = {
    //   image: { type: "png", quality: 1 },
    //   jsPDF: { format: "A4", orientation: "portrait" },
    // };
    // html2pdf()
    //   .set(opt)
    //   .from(signatureDataURL2)
    //   .outputPdf("blob")
    //   .then((pdf) => {
    //     const pdfBlob = new Blob([pdf], { type: "application/pdf" });

    //     generatePdf(pdfBlob);
    //   });

    // setTimeout(() => {
    //   CustomSuccessAlert("");
    // }, 2000);
  };
  function dataURLtoFile(dataurl, filename) {
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
  const generatePdf = (signatureDataURL) => {
    debugger;
    const content = contentRef.current;
    var opt = {
      image: { type: "jpeg", quality: 1 },
      jsPDF: { format: "A4", orientation: "portrait" },
    };
    // Check if the content exists
    if (content) {
      // Generate PDF using html2pdf
      html2pdf()
        .set(opt)
        .from(content)
        .outputPdf("blob")
        .then((pdf) => {
          const pdfBlob = new Blob([pdf], { type: "application/pdf" });
          // console.log(new Blob([pdf], { type: "application/pdf" }));
          // Create FormData to send the Blob as a file
          // console.log(pdfBlob);
          const formData = new FormData();
          formData.append("pdf", pdfBlob, "generated.pdf");
          formData.append("pdf_safety", "");
          formData.append("pdf_engineer", signatureDataURL);
          formData.append("engineer_status", "accepted");
          formData.append("safety_status", "");

          PatchFormRequest(`forms/permit_super/${rowId}/`, formData)
            .then((res) => {
              setModalState(false);
              getWorkPermitData();
            })
            .catch((err) => {});
          // formData.append("pdfFile", pdfBlob, "generated.pdf");

          // Send the FormData to your API using axios or another HTTP library
          // axios
          //   .post("your-api-endpoint", formData, {
          //     headers: {
          //       "Content-Type": "multipart/form-data",
          //     },
          //   })
          //   .then((response) => {
          //     console.log("PDF sent successfully:", response.data);
          //   })
          //   .catch((error) => {
          //     console.error("Error sending PDF:", error);
          //   });
        });
    }
  };
  const handleGenerateURL = async () => {
    const content = contentRef.current;
    // const divElement = saveWorkPermitRef.current;

    // const canvas = await html2canvas(divElement);

    // const dataURL = canvas.toDataURL();

    // console.log(dataURL);
  };

  const handleClickAcceptWorkPermit = (action) => {
    console.log(action);
    const formData = new FormData();
    formData.append("pdf");
    formData.append("pdf_safety", "");
    formData.append("pdf_engineer", signature);
    formData.append("engineer_status", action);
    formData.append("safety_status", "");

    PatchFormRequest(`forms/permit_super/${rowId}`, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handelClickCancelSignature = () => {
    setModalState(false);
    setSignature(" ");
  };

  const handlePrintWorkPermit = useReactToPrint({
    content: () => contentRef.current,
  });

  const customModal = (
    <Modal
      isOpen={modalState}
      centered
      modalSize="md"
      modalTransition={{ timeout: 10 }}
      style={{ minWidth: "40vw", width: "50%" }}
    >
      <ModalHeader style={{ backgroundColor: "#076030" }}>
        {"Signature"}
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
                  {/* <th
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
                    Engineer Status
                  </th> */}
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

                            {item?.engineer_status == "new" ||
                              (decryptData(KIND, SessionStorage) && (
                                <Button
                                  color="success"
                                  className="btnic"
                                  size="sm"
                                  onClick={() => onConfirmRow(item)}
                                >
                                  <i className="fa fa-thumbs-o-up"> </i>
                                </Button>
                              ))}
                            {item?.engineer_status == "new" && (
                              <Button
                                color="danger"
                                className="btnic"
                                size="sm"
                                onClick={() => onDeleteRow(item)}
                              >
                                <i className="fa fa-remove"></i>
                              </Button>
                            )}
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
      <LaborComponent />
    </>
  );
};

export default LaborWelfare;
