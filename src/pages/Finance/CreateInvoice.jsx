import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row, Table, UncontrolledCollapse } from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import {
  allowancesSetupMasterId,
  Delete,
  Insert,
  Search,
  Select,
  setupMasterId,
  Update,
  allowOnlyString,
  benefitsSetupId,
  degreeSetupId,
  citySetupId,
  countrySetupId,
} from "../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import { Setup_MasterDetails_Operation } from "../../utils/Config";
import DatePicker from "react-datepicker";

import {
  SuccessAlert,
  DeleteAlert,
  AlreadyExistAlert,
  CustomErrorMessage,
} from "../../components/Alert";
import { dateFormat, dateFormatPlaceholder } from "../../utils/CommonMethods";
import { useState } from "react";
import { formatDateFunction1 } from "../../functions/DateFormatFunction";
import FinanceCrudComponent from "../../components/FormComponents/FinanceCrudComponent";

const initialSearchFields = {
  InvoiceType: 0,
};

const initialFormFields = {
  Date: "",
  InvoiceType: 0,
  CustomerVendor: 0,
  Description: "",
  Ammount: "",
};

const CreateInvoice = () => {
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

  const [Date, setDate] = useState(null);

  const [inputList, setInputList] = useState([
    { Name: "", FatherName: "", Gender: 0, Number: "" },
  ]);

  const [inputListOne, setInputListOne] = useState([
    { Name: "", FatherName: "", Gender: 0, Number: "" },
  ]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [rowCount, setRowCount] = useState(0);


  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
    getRoles();
  }, []);

  function getRoles() {
    // const payload = {
    //   operationId: Select,
    //   setupMasterId: citySetupId,
    // };
    // Setup_MasterDetails_Operation(payload)
    //   .then((res) => {
    //     dispatch({
    //       type: SET_INITIAL_CRUD_FORM_STATE,
    //       payload: {
    //         List: res.data,
    //         FormFields: initialFormFields,
    //         SearchFields: initialSearchFields,
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  }

  const columns = [
    { field: "Date", name: "Date" },
    { field: "InvoiceType", name: "Invoice Type" },
    { field: "CustomerVendor", name: "Customer / Vendor" },
    { field: "Description", name: "Description" },
    { field: "Ammount", name: "Ammount" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    // }
  };

  const handleAddPaymentVoucher = (e) => {
    e.preventDefault();
    if (SupportingTables?.PaymentVoucherTable.length > 0) {
      let paymentVoucherTable = SupportingTables?.PaymentVoucherTable;
      paymentVoucherTable.push({ ...FormFields });
      dispatch({
        type: SET_INITIAL_DROPDOWN_FORM_STATE,
        payload: paymentVoucherTable,
      });
      dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
      setSelectedOption(null);
    } else {
      let data = {
        name: "PaymentVoucherTable",
        value: new Array(FormFields),
      };
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
      dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
      setRowCount(1);
      setSelectedOption(null);
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

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const AllDateSet = (event, type) => {
    if (type === "Date") {
      setDate(event);
      let date = formatDateFunction1(event, "-");
      FormFields.Date = date;
      let Date = {
        name: "Date",
        value: FormFields.Date,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: Date });
    }
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Invoice Type"
          name="InvoiceType"
          required
          onChange={handleAddChange}
          value={FormFields?.InvoiceType}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    // const payload = {
    //   operationId: Search,
    //   setupMasterId: citySetupId,
    //   parentId: 0,
    //   setupDetailName: SearchFields?.SetupDetailName,
    //   createdBy: 0,
    //   userIP: "192.168.1.104",
    // };
    // Setup_MasterDetails_Operation(payload)
    //   .then((res) => {
    //     dispatch({
    //       type: SET_INITIAL_CRUD_FORM_STATE,
    //       payload: {
    //         List: res.data,
    //         FormFields: initialFormFields,
    //         SearchFields: initialSearchFields,
    //       },
    //     });
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const submitForm = (id) => {
    // const payload = {
    //   operationId: id,
    //   setupMasterId: citySetupId,
    //   parentId: FormFields?.Country,
    //   setupDetailName: FormFields?.City,
    //   setupDetailId: FormFields?.SetupDetailId,
    //   createdBy: localStorage?.getItem("EmplId"),
    //   userIP: "192.168.1.104",
    // };
    // Setup_MasterDetails_Operation(payload)
    //   .then((res) => {
    //     dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    //     if (res.data[0].HasError === 0) {
    //       SuccessAlert();
    //       getRoles();
    //     } else {
    //       AlreadyExistAlert();
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const onEditRow = (obj) => {
    // let data = {
    //   SetupDetailName: obj.SetupDetailName,
    //   SetupDetailId: obj.SetupDetailId,
    // };
    // dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {};

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    getRoles();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const modalView = (
    <Fragment>
      {/* <Col lg="6" md="6" xs="12">
        <div className="form-group">
          <label className="form-label">Period From</label>
          <DatePicker
            selected={Date}
            dateFormat={dateFormat}
            onChange={(e) => AllDateSet(e, "Date")}
            className="form-control"
            name="Date"
            placeholderText={dateFormatPlaceholder}
            required
          />
        </div>
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Invoice Type"
          name="InvoiceType"
          maxLength="150"
          required
          onChange={handleAddChange}
          value={FormFields?.InvoiceType}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Customer/Vendor"
          name="CustomerVendor"
          maxLength="150"
          required
          onChange={handleAddChange}
          value={FormFields?.CustomerVendor}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Ammout"
          name="Ammout"
          required
          isNumber="true"
          onChange={handleAddChange}
          value={FormFields?.Ammout}
        />
      </Col>
      <Col lg="12" md="12" xs="12">
        <FormGroupInput
          label="Description"
          name="Description"
          type="textarea"
          onChange={handleAddChange}
          value={FormFields?.Description}
          required
        />
      </Col> */}
      <form onSubmit={handleAddPaymentVoucher}>
        <Row>
          <Col lg="4" md="4" xs="12">
            <FormGroupSelect label="Title" />
          </Col>
          <Col lg="4" md="4" xs="12">
            <FormGroupInput label="Date" />
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
                      <th>S no</th>
                      <th>column 1</th>
                      <th>column 2</th>
                      <th>column 3</th>
                      <th>column 4</th>
                      <th
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
                          <FormGroupSelect
                            className="ml10"
                            name="Gender"
                            value={x.Gender}
                            onChange={(e) => handleInputChange(e, i)}
                          />
                        </td>
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
      </form>
    </Fragment>
  );
  
  return (
    <FinanceCrudComponent
      formName="Invoice"
      buttonName="Add"
      customModalHeader="modal-header-paymentvoucher"
      // hideAction={false}
      tableColumns={columns}
      tableRows={TableList}
      // formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      // modalView={modalView}
      modalView={modalView}
    />
  );
};

export default CreateInvoice;
