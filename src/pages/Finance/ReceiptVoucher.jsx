import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  Row,
  Table,
  UncontrolledCollapse,
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
} from "../../functions/DateFormatFunction";
import {
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import {
  Finance_FIN_HeadAccountsList,
  Finance_PaymentModel,
} from "../../utils/Config";
import { CustomSuccessAlert, CustomErrorMessage } from "../../components/Alert";
import SelectDropdown from "react-select";
import { decryptData } from "../../EncryptData";
import { LOGINID } from "../../utils/EncryptedConstants";

const ReceiptVoucher = () => {
  const {
    SearchFields,
    FormFields,
    SupportingTables,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [date, setDate] = useState("");
  const [rowCount, setRowCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);

  const initialSearchFields = { PeriodFrom: "", PeriodTo: "" };

  const initialFormFields = {
    PaymentModeID: 0,
    PaymentModeName: "",
    ChequeDetails: "",
    Date: SupportingTables?.PVMasterDate,
    CostCenterId: 0,
    CostCenterName: "",
    ReceiverAccountName: "",
    ReceiverAccountCode: "",
    PayeeAccountName: "",
    PayeeAccountCode: "",
    InvoiceNo: "",
    InvoiceNoName: "",
    Particular: "",
    Amount: 0,
    IsActive: true,
    CreatedBy: decryptData(LOGINID, SessionStorage),
    ModifiedBy: 0,
    UserIP: "String",
  };

  const [inputList, setInputList] = useState([
    { Name: "", FatherName: "", Gender: 0, Number: "" },
  ]);

  const [inputListOne, setInputListOne] = useState([
    { Name: "", FatherName: "", Gender: 0, Number: "" },
  ]);

  useEffect(() => {
    getReceiptVouchers();
    getDropDown();
    setRowCount(0);
    setDate("");
    let data = {
      name: "ReceiptVoucherTable",
      value: new Array(0),
    };
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        // FormFields: initialFormFields,
        // SearchFields: initialSearchFields,
      },
    });
    dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
  }, []);

  const getReceiptVouchers = () => {
    const payload = {
      operationID: 1,
      vou_TypeID: 3858,
      vocuherMaster_: {
        vou_Type: 3858,
        date: "2022-09-14T11:43:52.465Z",
        isPost: true,
        isActive: true,
        createdBy: 1,
        modifiedBy: 1,
        userIP: "124.29.235.20",
      },
      voucherDetail_: [
        {
          date: "2022-09-14T11:43:52.465Z",
          paymentModeID: 0,
          chequeDetails: "string",
          costCenterID: 0,
          payeeAccountCode: "string",
          receiverAccountCode: "string",
          invoiceNo: "string",
          particular: "string",
          amount: 0,
          isActive: true,
          createdBy: 1,
          modifiedBy: 1,
          userIP: "string",
        },
      ],
    };

    Finance_PaymentModel(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        let data1 = {
          name: "ComparingTable",
          value: res.data.Table1,
        };
        dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data1 });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function getDropDown() {
    const payload = {
      operationId: Select,
    };

    Finance_FIN_HeadAccountsList(payload)
      .then((res) => {
        let data = {
          name: "Dropdowns",
          value: res.data,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: data,
        });
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: new Array(0),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "Date", name: "Date" },
    { field: "Vou_MasterId", name: "Vou. #" },
    { field: "Vou_TypeName", name: "Vou. Type" },
    { field: "Amount", name: "Amount" },
    { field: "Status", name: "Status" },
  ];

  const modalColumns = [
    { field: "CostCenterName", name: "Cost Center" },
    { field: "ReceiverAccountName", name: "Payer Account Name" },
    { field: "PayeeAccountName", name: "Beneficiary Account Name" },
    { field: "PaymentModeName", name: "Payment Mode Name" },
    { field: "ChequeDetails", name: "Cheque Details" },
    // { field: "InvoiceNoName", name: "Invoice No Name" },
    { field: "Amount", name: "Amount" },
    { field: "Particular", name: "Particular" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleInputChangeSelect = (e) => {
    if (e.target.name === "CostCenterId") {
      let valueCode = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: valueCode });
      let valueName = {
        name: e.target.selectedName,
        value: e.target.selectedValue,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: valueName });
    } else if (e.target.name === "PaymentModeID") {
      let valueCode = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: valueCode });
      let valueName = {
        name: e.target.selectedName,
        value: e.target.selectedValue,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: valueName });
    } else {
      let valueCode = { name: e.target.name, value: e.target.newfield };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: valueCode });
      let valueName = {
        name: e.target.selectedName,
        value: e.target.selectedValue,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: valueName });
    }
  };

  const handleAddPaymentVoucher = (e) => {
    e.preventDefault();

    if (SupportingTables?.ReceiptVoucherTable.length > 0) {
      let receiptVoucherTable = SupportingTables?.ReceiptVoucherTable;
      receiptVoucherTable.push({ ...FormFields });
      dispatch({
        type: SET_INITIAL_DROPDOWN_FORM_STATE,
        payload: receiptVoucherTable,
      });
      dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
      setSelectedOption(null);
    } else {
      let data = {
        name: "ReceiptVoucherTable",
        value: new Array(FormFields),
      };
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
      dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
      setRowCount(1);
      setSelectedOption(null);
    }
  };

  const onDeleteRow = (index) => {};

  const onEditRow = (obj) => {};

  const onDeleteModalRow = (index) => {
    if (index == 0) {
      let value = SupportingTables?.ReceiptVoucherTable;
      value.splice(index, 1);
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: value });
      setRowCount(0);
      setDate("");
    } else {
      let value = SupportingTables?.ReceiptVoucherTable;
      value.splice(index, 1);
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: value });
    }
  };

  const onEditModalRow = (index, obj) => {
    setSelectedOption({
      value: obj.CostCenterId,
      label: obj.CostCenterName,
    });
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: obj });
    let value = SupportingTables?.ReceiptVoucherTable;
    value.splice(index, 1);
    dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: value });
  };

  const handleSearchableChangeSelect = (event, fieldName) => {
    if (fieldName === "CostCenter") {
      let valueName = {
        name: "CostCenterName",
        value: event.label,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: valueName });
      let valueId = {
        name: "CostCenterId",
        value: event.value,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: valueId });
      setSelectedOption(event);
    }
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  // handle click event of the Add button
  const handleAddClick = () => {
    setInputList([
      ...inputList,
      { Name: "", FatherName: "", Gender: 0, Number: "" },
    ]);
  };

  const handleInputChangeOne = (e, index) => {
    const { name, value } = e.target;
    const list = [...inputListOne];
    list[index][name] = value;
    setInputListOne(list);
  };

  // handle click event of the Remove button
  const handleRemoveClickOne = (index) => {
    const list = [...inputListOne];
    list.splice(index, 1);
    setInputListOne(list);
  };

  // handle click event of the Add button
  const handleAddClickOne = () => {
    setInputListOne([
      ...inputListOne,
      { Name: "", FatherName: "", Gender: 0, Number: "" },
    ]);
  };

  const modalView = (
    <Fragment>
      <form onSubmit={handleAddPaymentVoucher}>
        <Row>
          <Col lg="4" md="4" xs="12">
            <FormGroupSelect label="Title" />
          </Col>
          <Col lg="4" md="4" xs="12">
            <FormGroupInput label="Date" />
          </Col>
        </Row>

        <Row>
          <Col lg="12" md="12" xs="12" className="text-right">
            <Button color="primary">Save</Button>
          </Col>
        </Row>

        <Row className="mt-3">
          <Col lg="12" md="12" xs="12">
            <Table bordered>
              <tbody>
                <tr>
                  <td>Dummmy</td>
                  <td style={{ width: "20%" }} className="text-right">
                    <button className="btnic btn btn-sm plus-btn" size="sm" id="toggler1" >
                      <i class="fa fa-angle-down"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>
        <UncontrolledCollapse toggler="#toggler1" >
          <Row className="mt-3">
            <Col lg="12" md="12" xs="12">
              <Table bordered striped>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#28a745" }}>S no</th>
                    <th style={{ backgroundColor: "#28a745" }}>column 1</th>
                    <th style={{ backgroundColor: "#28a745" }}>column 2</th>
                    <th style={{ backgroundColor: "#28a745" }}>column 3</th>
                    <th style={{ backgroundColor: "#28a745" }}>column 4</th>
                    <th
                      style={{ width: "15%", backgroundColor: "#28a745" }}
                      className="text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                {inputList.map((x, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <FormGroupInput
                          name="Name"
                          value={x.Name}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <FormGroupInput
                          className="ml10"
                          name="FatherName"
                          value={x.FatherName}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <FormGroupSelect
                          className="ml10"
                          name="Gender"
                          value={x.Gender}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </td>
                      <td>
                        <FormGroupInput
                          className="ml10"
                          name="Number"
                          value={x.Number}
                          onChange={(e) => handleInputChange(e, i)}
                        />
                      </td>
                      <td className="text-right">
                        {inputList.length - 1 === i && (
                          <button
                            className="btnic btn btn-sm plus-btn btn-default"
                            size="sm"
                            onClick={handleAddClick}
                          >
                            <i class="fa fa-plus"></i>
                          </button>
                        )}

                        {inputList.length !== 1 && (
                          <button
                            className="btn btn-remove btnic"
                            style={{ textAlign: "center" }}
                            onClick={() => handleRemoveClick(i)}
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </UncontrolledCollapse>


        <Row className="mt-3">
          <Col lg="12" md="12" xs="12">
            <Table bordered>
              <tbody>
                <tr>
                  <td>Tax</td>
                  <td style={{ width: "20%" }} className="text-right">
                    <button className="btnic btn btn-sm plus-btn" id="toggler2">
                      <i class="fa fa-angle-down"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </Table>
          </Col>
        </Row>

        <UncontrolledCollapse toggler="#toggler2">
          <Row className="mt-3">
            <Col lg="12" md="12" xs="12">
              <Table bordered striped>
                <thead>
                  <tr>
                    <th style={{ backgroundColor: "#28a745" }}>S no</th>
                    <th style={{ backgroundColor: "#28a745" }}>column 1</th>
                    <th style={{ backgroundColor: "#28a745" }}>column 2</th>
                    <th style={{ backgroundColor: "#28a745" }}>column 3</th>
                    <th style={{ backgroundColor: "#28a745" }}>column 4</th>
                    <th
                      style={{ width: "15%", backgroundColor: "#28a745" }}
                      className="text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                {inputListOne.map((x, i) => (
                    <tr key={i}>
                      <td>{i + 1}</td>
                      <td>
                        <FormGroupInput
                          name="Name"
                          value={x.Name}
                          onChange={(e) => handleInputChangeOne(e, i)}
                        />
                      </td>
                      <td>
                        <FormGroupInput
                          className="ml10"
                          name="FatherName"
                          value={x.FatherName}
                          onChange={(e) => handleInputChangeOne(e, i)}
                        />
                      </td>
                      <td>
                        <FormGroupSelect
                          className="ml10"
                          name="Gender"
                          value={x.Gender}
                          onChange={(e) => handleInputChangeOne(e, i)}
                        />
                      </td>
                      <td>
                        <FormGroupInput
                          className="ml10"
                          name="Number"
                          value={x.Number}
                          onChange={(e) => handleInputChangeOne(e, i)}
                        />
                      </td>
                      <td className="text-right">
                        {inputListOne.length - 1 === i && (
                          <button
                            className="btnic btn btn-sm plus-btn btn-default"
                            size="sm"
                            onClick={handleAddClickOne}
                          >
                            <i class="fa fa-plus"></i>
                          </button>
                        )}

                        {inputListOne.length !== 1 && (
                          <button
                            className="btn btn-remove btnic"
                            style={{ textAlign: "center" }}
                            onClick={() => handleRemoveClickOne(i)}
                          >
                            <i class="fa fa-trash"></i>
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </UncontrolledCollapse>

      </form>
      {/* <FormGroupTable
        columns={modalColumns}
        customizeColor="custom-table-receiptvoucher"
        // rows={academicData}
        rows={SupportingTables?.ReceiptVoucherTable}
        onDelete={onDeleteModalRow}
        onEdit={onEditModalRow}
      /> */}
    </Fragment>
  );

  const searchPanel = (
    <Fragment>
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

  const submitSearch = () => {};

  const submitForm = (isPost) => {
    const payload = {
      operationID: 2,
      vou_TypeID: 3858,
      vocuherMaster_: {
        vou_Type: 3858,
        date: SupportingTables?.PVMasterDate,
        isPost: isPost,
        isActive: true,
        createdBy: decryptData(LOGINID, SessionStorage),
        modifiedBy: 0,
        userIP: "124.29.235.20",
      },
      voucherDetail_: SupportingTables?.ReceiptVoucherTable,
    };

    Finance_PaymentModel(payload)
      .then((res) => {
        if (res?.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table[0]?.MESSAGE);
          let data = {
            name: "ReceiptVoucherTable",
            value: new Array(0),
          };
          dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
          setRowCount(0);
          setDate("");
          getReceiptVouchers();
        } else {
          CustomErrorMessage(res?.data?.Table[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
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

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Search Country"
          name="Country"
          onChange={handleAddChange}
          value={FormFields?.Country}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        ></FormGroupSelect>
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="City"
          name="City"
          onChange={handleAddChange}
          value={FormFields?.City}
          required
        />
      </Col>
    </Fragment>
  );
  return (
    <FinanceCrudComponent
      formName="Receipt Voucher"
      buttonName="Add"
      customModalHeader="modal-header-receiptvoucher green-modal"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onDelete={onDeleteRow}
      onEdit={onEditRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      modalView={modalView}
    />
  );
};

export default ReceiptVoucher;
