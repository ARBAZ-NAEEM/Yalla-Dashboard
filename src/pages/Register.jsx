import React, { Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import "../assets/css/login.css";
import { Search, Select, SessionStorage } from "../common/SetupMasterEnum";
import { CustomErrorMessage } from "../components/Alert";
import LoginFormComponent from "../components/FormComponents/LoginFormComponent/loginIndex";
import FormGroupInput from "../components/GeneralComponent/FormGroupInput";
import { decryptData, encryptData } from "../EncryptData";
import {
  LOG_IN,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
} from "../redux/actionType/AuthType";
import { PostRequest } from "../utils/Config";

import {
  COMPANY_DETAILS,
  COMPANY_ID,
  EMPLOYEE_DESIGNATION,
  EMPLOYEE_NAME,
  LOGINID,
  LOGIN_TYPE,
  MENU_TABLE,
  RESETPASSWORD,
  TYPE,
  UserNetworkInfo,
} from "../utils/EncryptedConstants";
import { LOGIN, REGISTER } from "../utils/UrlConstants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import RegisterFormComponent from "../components/FormComponents/RegisterFormComponent/registerIndex";
import { number } from "prop-types";
import FormGroupSelect from "../components/GeneralComponent/FormGroupSelect";

// import packageJson from "../../package.json"; //'../package.json';

const initialFormFields = {
  first_name: "",
  last_name: "",
  email: "",
  phone: "",
  company: "2",
  password: "",
  employeeID: "",
  IPAddress: decryptData(UserNetworkInfo)?.IPv4,
  is_super_staff: true,
};

const Register = (props) => {
  const { FormFields } = useSelector((state) => state.CrudFormReducer);

  const history = useHistory();

  const dispatch = useDispatch();

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  // const getCompany = (loginResponse) => {
  //   const payload = {
  //     ...initialCompanyFields,
  //     CompanyID: loginResponse?.data?.Table[0]?.CompanyID,
  //     UserID: loginResponse?.data?.Table[0]?.UserId,
  //     UserIP: decryptData(UserNetworkInfo)?.IPv4,
  //   };
  //   PostRequest(COMPANY, payload)
  //     .then((response) => {
  //       // debugger
  //       if (response?.data?.Table?.length > 0) {
  //         const userId = loginResponse?.data?.Table[0]?.UserId;
  //         const CompanyID = loginResponse?.data?.Table[0]?.CompanyID;
  //         const CompanyDetails = response?.data?.Table[0];
  //         const menuTables = {
  //           Table1: loginResponse?.data?.Table1,
  //           Table2: loginResponse?.data?.Table2,
  //         };

  //         encryptData(CompanyDetails, COMPANY_DETAILS, SessionStorage);
  //         encryptData(menuTables, MENU_TABLE, SessionStorage);
  //         encryptData(CompanyID, COMPANY_ID, SessionStorage);
  //         encryptData(userId, LOGINID, SessionStorage);
  //         encryptData("1", LOGIN_TYPE, SessionStorage);

  //         let data = {
  //           loginId: userId,
  //           token: null,
  //           expiry: null,
  //           menuTable: {
  //             Table1: loginResponse?.data?.Table1,
  //             Table2: loginResponse?.data?.Table2,
  //           },
  //         };

  //         dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  //         dispatch({ type: LOG_IN, payload: data });

  //         props.history.push("/pages/dashboard");
  //       } else {
  //         CustomErrorMessage(response?.data?.Table?.[0]?.Message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // };

  const submitForm = (userType) => {
    const payload = {
      ...FormFields,

      IPAddress: decryptData(UserNetworkInfo)?.IPv4,
      is_super_staff: true,
    };

    PostRequest(REGISTER, payload)
      .then((res) => {
        if (res?.data?.status == true) {
          const employeeID = res?.data?.data.employeeID;
          encryptData(employeeID, LOGINID, SessionStorage);

          props.history.push("/pages/dashboard");
        } else {
          CustomErrorMessage("Registration failed. Please try again.");
        }
      })
      .catch((err) => {
        console.error(err);
        CustomErrorMessage("Login failed. Please try again.");
      });
  };

  const options = [
    { label: "hybnrg", value: 2 },
    { label: "Yalla Safety", value: 3 },
  ];

  const fieldEmployeePanel = (
    <Fragment>
      <FormGroupInput
        isIcon={true}
        iconClass="fa fa-user"
        label="First Name"
        name="first_name"
        placeholder="First Name"
        onChange={handleAddChange}
        value={FormFields?.first_name}
        required
      />
      <FormGroupInput
        isIcon={true}
        iconClass="fa fa-user"
        label="Last Name"
        name="last_name"
        placeholder="Last Name"
        onChange={handleAddChange}
        value={FormFields?.last_name}
        required
      />
      <FormGroupInput
        isIcon={true}
        iconClass="fa fa-phone"
        label="Phone Number"
        name="phone"
        type="number"
        placeholder="Phone Number"
        onChange={handleAddChange}
        value={FormFields?.phone}
        required
      />
      <FormGroupInput
        isIcon={true}
        iconClass="fa fa-user-circle"
        label="Employee ID"
        name="employeeID"
        type="text"
        placeholder="Employee ID"
        onChange={handleAddChange}
        value={FormFields?.employeeID}
        required
      />
      <FormGroupSelect
        isIcon={true}
        iconClass="fa fa-building"
        label="Company"
        name="company"
        placeholder="Select Company"
        onChange={handleAddChange}
        value={FormFields?.company}
        fieldId="value"
        fieldName="label"
        list={options}
      />

      <FormGroupInput
        isIcon={true}
        iconClass="fa fa-at"
        label="Email"
        name="email"
        placeholder="Email"
        onChange={handleAddChange}
        value={FormFields?.email}
        required
      />
      <FormGroupInput
        isIcon={true}
        iconClass="fa fa-lock"
        label="Password"
        name="password"
        placeholder="Enter Password"
        type="password"
        onChange={handleAddChange}
        value={FormFields?.password}
        required
      />
    </Fragment>
  );

  return (
    <RegisterFormComponent
      fieldEmployeePanel={fieldEmployeePanel}
      formSubmit={submitForm}
      initialFormFields={initialFormFields}
      loginType="Existing"
    />
  );
};

export default Register;
