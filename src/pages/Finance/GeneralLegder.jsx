import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Col,
  Container,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import FinanceCrudComponent from "../../components/FormComponents/FinanceCrudComponent";
import DatePicker from "react-datepicker";
import { dateFormat, dateFormatPlaceholder } from "../../utils/CommonMethods";
import {
  formatDateFunction1,
  formatDateFunction2,
  formatDateFunctionByName,
} from "../../functions/DateFormatFunction";
import FormGroupTable from "../../components/GeneralComponent/FormGroupTable";
import { countrySetupId, Select, SessionStorage } from "../../common/SetupMasterEnum";
import {
  Finance_FIN_HeadAccountsList,
  Finance_GLReport,
  Finance_PaymentModel,
  Setup_MasterDetails_All_Dropdowns,
} from "../../utils/Config";
// import {GetUserIP} from "../../utils/GetUserIP";
import { CustomSuccessAlert, CustomErrorMessage } from "../../components/Alert";
import SelectDropdown from "react-select";
import { decryptData } from "../../EncryptData";
import { LOGINID } from "../../utils/EncryptedConstants";

const GeneralLedger = () => {
  const {
    SearchFields,
    FormFields,
    TableLoading,
    FormLoading,
    SupportingTables,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [date, setDate] = useState("");
  const [pvMasterDate, setPVMasterDate] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const initialSearchFields = { PeriodFrom: "", PeriodTo: "" };

  const initialFormFields = {
    PaymentModeID: 0,
    PaymentModeName: "",
    ChequeDetails: "",
    Date: "",
    CostCenterId: 0,
    CostCenterName: "",
    PayeeAccountName: "",
    PayeeAccountCode: "",
    ReceiverAccountName: "",
    ReceiverAccountCode: "",
    InvoiceNo: "",
    InvoiceName: "",
    Particular: "",
    Amount: 0,
    IsActive: true,
    CreatedBy: decryptData(LOGINID, SessionStorage),
    ModifiedBy: 0,
    UserIP: "String",
  };

  useEffect(() => {}, []);

  const getGLReport = () => {
    let data = {
      operationID: Select,
      costCenterId: 2118,
      accountCode: "200A03202",
      fromDate: SearchFields?.PeriodFrom,
      toDate: SearchFields?.PeriodTo,
    };
    Finance_GLReport(data)
      .then((res) => {
        if (res?.data?.Table.length > 0) {
          let data = {
            name: "GLReport",
            value: res.data,
          };
          dispatch({
            type: SET_INITIAL_DROPDOWN_FORM_STATE,
            payload: data,
          });
          setToggle(true);
        } else {
          CustomErrorMessage("No Record Found");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //   const columns = [
  //     { field: "Date", name: "Date" },
  //     { field: "Vou_MasterId", name: "Vou. #" },
  //     { field: "Vou_TypeName", name: "Vou. Type" },
  //     { field: "Amount", name: "Amount" },
  //     { field: "Status", name: "Status" },
  //   ];

  const handleSearchableChangeSelect = (event, fieldName) => {
    if (fieldName === "AccountName") {
      let valueId = {
        name: "AccountId",
        value: event.value,
      };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: valueId });
      setSelectedOption(event);
    }
  };

  const searchPanel = (
    <Fragment>
      <Col lg="4" md="4" xs="12">
        <Label>Account Name</Label>
        <SelectDropdown
          closeMenuOnSelect={false}
          // components={animatedComponents}
          onChange={(e) => handleSearchableChangeSelect(e, "AccountName")}
          isMulti={false}
          options={SupportingTables?.Dropdowns?.Table3}
          value={selectedOption}
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <div className="form-group">
          <label className="form-label">From Date</label>
          <DatePicker
            selected={fromDate}
            dateFormat={dateFormat}
            onChange={(e) => AllDateSet(e, "PeriodFrom")}
            className="form-control"
            name="PeriodFrom"
            maxDate={toDate}
            placeholderText={dateFormatPlaceholder}
            // filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            time
            required
          />
        </div>
      </Col>
      <Col lg="4" md="4" xs="12">
        <div className="form-group">
          <label className="form-label">To Date</label>
          <DatePicker
            selected={toDate}
            dateFormat={dateFormat}
            minDate={fromDate}
            onChange={(e) => AllDateSet(e, "PeriodTo")}
            className="form-control"
            name="PeriodTo"
            placeholderText={dateFormatPlaceholder}
            filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            required
          />
        </div>
      </Col>
      <Col lg="12" md="12" xs="12"></Col>
    </Fragment>
  );

  const AllDateSet = (event, type) => {
    if (type === "PeriodFrom") {
      setFromDate(event);
      let date = formatDateFunction1(event, "-");
      SearchFields.PeriodFrom = date;
      let data1 = {
        name: "PeriodFrom",
        value: SearchFields.PeriodFrom,
      };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    } else if (type === "PeriodTo") {
      setToDate(event);
      let date = formatDateFunction1(event, "-");
      SearchFields.PeriodTo = date;
      let data1 = {
        name: "PeriodTo",
        value: SearchFields.PeriodTo,
      };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    } else if (type === "Date") {
      setDate(event);
      let pvMasterDate = {
        name: "PVMasterDate",
        value: event,
      };
      dispatch({
        type: SET_INITIAL_DROPDOWN_FORM_STATE,
        payload: pvMasterDate,
      });
      let date = formatDateFunction1(event, "-");
      FormFields.Date = date;
      let data1 = {
        name: "Date",
        value: FormFields?.Date,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
    }
  };

  const submitSearch = () => {
    getGLReport();
  };

  const submitForm = () => {};

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

  const handleCloseModal = () => {
    setToggle(false);
  };

  const onView = (index) => {
  }

  const customModal = (
    <Modal
      isOpen={toggle}
      centered
      //   size="xl"
      fullscreen={true}
      modalTransition={{ timeout: 10 }}
      backdrop="static"
    >
      <ModalHeader>REPORT - GENERAL LEDGER </ModalHeader>
      <ModalBody>
        <div className="landscape-page" style={{ fontSize: 12 }}>
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
                      <div
                        style={{ display: "flex", justifyContent: "center" }}
                      >
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
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
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
                      style={{
                        borderBottom: "0.5px solid",
                        lineHeight: "30px",
                      }}
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
                    <td
                      colspan={2}
                      style={{ width: "15%", fontWeight: "bold" }}
                    >
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
                          {
                            SupportingTables?.GLReport?.Table2?.[0]
                              ?.TotalBalance
                          }
                        </p>
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Container>
        </div>
        <Row className="mt-3">
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <Button color="default" onClick={handleCloseModal}>
              Close
            </Button>
          </div>
        </Row>
      </ModalBody>
    </Modal>
  );

  return (
    <FinanceCrudComponent
      formName="General Ledger"
      //   buttonName="Add"
      customModalHeader="modal-header-paymentvoucher"
      //   tableColumns={columns}
      //   tableRows={TableList}
      //   formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      //   onDelete={onDeleteRow}
      //   onEdit={onEditRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      //   modalView={modalView}
      customModal={customModal}
    />
  );
};

export default GeneralLedger;
