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
  KIND,
  LOGINID,
  LOGIN_TYPE,
  MENU_TABLE,
  RESETPASSWORD,
  TOKEN,
  TYPE,
  UserNetworkInfo,
} from "../utils/EncryptedConstants";
import { LOGIN } from "../utils/UrlConstants";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

// import packageJson from "../../package.json"; //'../package.json';
const initialFormFields = { email: "", password: "", IPAddress: "" };

const initialCompanyFields = {
  OperationID: Search,
  ColourCode: "",
  CompanyID: 0,
  ParentCompanyID: 0,
  Company: "",
  IsParent: true,
  Address: "",
  Icon: "",
  Header: "",
  Footer: "",
  Phone1: "",
  Phone2: "",
  RepresentativePhone: "",
  Ntn: "",
  Stn: "",
  IsActive: true,
  UserID: 0,
  UserIP: "",
};

const Login = (props) => {
  const { FormFields } = useSelector((state) => state.AuthReducer);

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

  console.log(decryptData(LOGINID, sessionStorage));

  const submitForm = (userType) => {
    const payload = {
      email: FormFields?.email,
      password: FormFields?.password,
      IPAddress: decryptData(UserNetworkInfo)?.IPv4,
    };

    PostRequest(LOGIN, payload)
      .then((res) => {
        if (res?.data?.status == true) {
          const employeeID = res?.data?.data.employeeID;
          const token = res?.data?.data.token;
          const kind = res?.data?.data.kind;
          encryptData(employeeID, LOGINID, SessionStorage);
          encryptData(token, TOKEN, SessionStorage);
          encryptData(kind, KIND, SessionStorage);
          props.history.push("/pages/dashboard");
        }
      })
      .catch((err) => {
        console.error(err);
        CustomErrorMessage("Login failed. Please try again.");
      });
  };

  const fieldEmployeePanel = (
    <Fragment>
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
    <LoginFormComponent
      fieldEmployeePanel={fieldEmployeePanel}
      formSubmit={submitForm}
      initialFormFields={initialFormFields}
      loginType="Existing"
    />
  );
};

export default Login;
