import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import {
  Delete,
  Insert,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
} from "../../../components/Alert";
import { decryptData } from "../../../EncryptData";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import { useState } from "react";
import { PostRequest } from "../../../utils/Config";
import { SETUPUSERLOGIN } from "../../../utils/UrlConstants";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";

const AddUser = () => {
  const initialSearchFields = {
    operationID: Select,
    fName: "",
    mName: "",
    lName: "",
    loginId: "",
    employeeId: 0,
    password: "",
    isLocked: true,
    isActive: true,
    userIP: decryptData(UserNetworkInfo)?.IPv4,
    userId: 0,
    createdBy: decryptData(LOGINID, SessionStorage),
    modifiedBy: decryptData(LOGINID, SessionStorage),
  };

  const initialFormFields = {
    operationID: Insert,
    fName: "",
    mName: "",
    lName: "",
    loginId: "",
    employeeId: 0,
    password: "",
    isLocked: false,
    isActive: false,
    userIP: decryptData(UserNetworkInfo)?.IPv4,
    userId: 0,
    createdBy: decryptData(LOGINID, SessionStorage),
    modifiedBy: decryptData(LOGINID, SessionStorage),
  };

  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const [formLoad, setFormLoad] = useState(true);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    PostRequest(SETUPUSERLOGIN, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              IsActive: x.IsActive === true ? "true" : "false",
              IsLocked: x.IsLocked === true ? "true" : "false",
            })),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        setFormLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "EmployeeId", name: "Employee ID" },
    { field: "LoginId", name: "LoginId" },
    { field: "FName", name: "First Name" },
    { field: "MName", name: "Middle Name" },
    { field: "LName", name: "Last Name" },
    { field: "Password", name: "Password" },
    { field: "IsLocked", name: "Is Locked" },
    { field: "IsActive", name: "Is Active" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="2" md="2" xs="12">
        <FormGroupInput
          label="login ID"
          name="loginId"
          required
          onChange={handleSearchChange}
          value={SearchFields?.loginId}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    setFormLoad(true);
    const payload = {
      ...SearchFields,
      operationID: Select,
      loginId: SearchFields?.loginId,
    };
    PostRequest(SETUPUSERLOGIN, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
                ...x,
                IsActive: x.IsActive === true ? "true" : "false",
                IsLocked: x.IsLocked === true ? "true" : "false",
              })),
            FormFields: initialFormFields,
            SearchFields: SearchFields,
          },
        });
        setFormLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = (id) => {

    const payload = {
      ...FormFields,
      operationID: id,
    };
    PostRequest(SETUPUSERLOGIN, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res.data?.Table[0]?.MESSAGE);
          getUser();
        } else {
          CustomErrorMessage(res.data?.Table[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    debugger
    let data = {
      userId: obj?.UserId,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      fName: obj?.FName,
      mName: obj?.MName,
      lName: obj?.LName,
      loginId: obj?.LoginId,
      employeeId: obj?.EmployeeId,
      password: obj?.Password,
      isLocked: obj?.IsLocked === "true" ? true : false,
      isActive: obj?.IsActive === "true" ? true : false,
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    console.log(obj);
    debugger;
    const payload = {
      operationID: Delete,
      userId: obj?.UserId,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      fName: obj?.FName,
      mName: obj?.MName,
      lName: obj?.LName,
      loginId: obj?.LoginId,
      employeeId: obj?.EmployeeId,
      password: obj?.Password,
      isLocked: obj?.IsLocked,
      isActive: false,
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(SETUPUSERLOGIN, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res.data?.Table[0]?.MESSAGE);
          getUser();
        } else {
          CustomErrorMessage(res.data?.Table[0]?.MESSAGE);
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
    getUser();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="First Name"
          name="fName"
          value={FormFields?.fName}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Middle Name"
          name="mName"
          value={FormFields?.mName}
          onChange={handleAddChange}
      
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Last Name"
          name="lName"
          value={FormFields?.lName}
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Login ID"
          name="loginId"
          value={FormFields?.loginId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Employee ID"
          name="employeeId"
          value={FormFields?.employeeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Password"
          name="password"
          value={FormFields?.password}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupCheckbox
          label="Is Locked"
          name="isLocked"
          value={FormFields?.isLocked}
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="isActive"
          value={FormFields?.isActive}
          onChange={handleAddChange}
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="User"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      modalStyle={{ minWidth: "60vw", width: "60%" }}
      formLoader={formLoad}
    />
  );
};

export default AddUser;
