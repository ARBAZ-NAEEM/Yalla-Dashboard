import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Label, Row } from "reactstrap";
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
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
} from "../../../components/Alert";
import { decryptData } from "../../../EncryptData";
import { COMPANY_ID, LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import { useState } from "react";
import { PostRequest } from "../../../utils/Config";
import {
  COMPANY,
  ROLES,
  SETUPUSERLOGIN,
  SETUP_USER_ROLE_COMPANY_MAPPING,
} from "../../../utils/UrlConstants";
import ReactSelect from "react-select";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";

const UserRoleAllocation = () => {
  const initialSearchTbL_TYPE_USERROLECOMANYMAPPING_ = {
    roleID: 0,
    userID: 0,
    companyID: 0,
    isChecked: true,
  };

  const [
    searchTbL_TYPE_USERROLECOMANYMAPPING_,
    setSearchTbL_TYPE_USERROLECOMANYMAPPING_,
  ] = useState(initialSearchTbL_TYPE_USERROLECOMANYMAPPING_);

  const initialSearchFields = {
    operationID: Select,
    userRoleComapnyMappingID: 0,
    roleID: 0,
    companyID: 0,
    isActive: false,
    userId: 0,
    adminUserId: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
    tbL_TYPE_USERROLECOMPANYMAPPING_: [searchTbL_TYPE_USERROLECOMANYMAPPING_],
  };

  const intiialFormTbL_TYPE_USERROLECOMANYMAPPING_ = {
    roleID: 0,
    userID: 0,
    companyID: 0,
    isChecked: true,
  };

  const [
    formTbL_TYPE_USERROLECOMANYMAPPING_,
    setFormTbL_TYPE_USERROLECOMANYMAPPING_,
  ] = useState(intiialFormTbL_TYPE_USERROLECOMANYMAPPING_);

  const initialFormFields = {
    operationID: Select,
    userRoleComapnyMappingID: 0,
    roleID: 0,
    companyID: 0,
    isActive: false,
    userId: 0,
    adminUserId: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
    tbL_TYPE_USERROLECOMPANYMAPPING_: [formTbL_TYPE_USERROLECOMANYMAPPING_],
  };

  const initalUserFields = {
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

  const intialCompanyFields = {
    OperationID: Select,
    CompanyID: decryptData(COMPANY_ID, SessionStorage),
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
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const initialRoleList = {
    operationId: Search,
    companyID: decryptData(COMPANY_ID, SessionStorage),
    roleID: 0,
    roleName: "",
    isFixed: true,
    isActive: true,
    level: "",
    userID: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const [formLoad, setFormLoad] = useState(true);

  const { UserList, CompanyList, RoleList } = SupportingTables;

  const [selectedRole, setSelectedRole] = useState([]);
  const [selectedSearchRole, setSelectedSearchRole] = useState([]);

  useEffect(() => {
    getUser();
    getCompany();
    getRoles();
    getUserRoleByCompany();
  }, []);

  console.log(selectedSearchRole);

  const getUserRoleByCompany = () => {
    PostRequest(SETUP_USER_ROLE_COMPANY_MAPPING, initialFormFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.SetupUserRoleCompanyMapping?.map((x) => ({
              ...x,
              IsActive: x.IsActive == true ? "true" : "false"
            })),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getUser = () => {
    PostRequest(SETUPUSERLOGIN, initalUserFields)
      .then((res) => {
        const UserList = { name: "UserList", value: res?.data?.Table };
        dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: UserList });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getCompany = () => {
    PostRequest(COMPANY, intialCompanyFields)
      .then((res) => {
        const CompanyList = { name: "CompanyList", value: res?.data?.Table };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: CompanyList,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRoles = () => {
    PostRequest(ROLES, initialRoleList)
      .then((res) => {
        const RoleList = {
          name: "RoleList",
          value: res?.data?.Table?.map((x) => ({
            ...x,
            label: x.Role,
            value: x.RoleId,
            dropdownName: "Role",
          })),
        };
        console.log(RoleList);
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: RoleList,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "UserName", name: "User Name" },
    { field: "RoleName", name: "Role Name" },
    { field: "Company", name: "Company" },
    { field: "IsActive", name: "Status" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Users"
          name="userId"
          fieldId="UserId"
          fieldName="Name"
          list={UserList}
          onChange={handleSearchChange}
          value={SearchFields?.userId}
        ></FormGroupSelect>
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Company"
          name="companyID"
          fieldId="CompanyID"
          fieldName="Company"
          list={CompanyList}
          onChange={handleSearchChange}
          value={SearchFields?.companyID}
        ></FormGroupSelect>
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>Role</Label>
        <ReactSelect
          defaultValue={selectedSearchRole}
          isClearable={true}
          isMulti={true}
          onChange={(e) => handleInputSearchChangeSelect(e)}
          options={RoleList}
          value={selectedSearchRole}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="isActive"
          value={SearchFields?.isActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    setFormLoad(true);
    const payload = {
      ...SearchFields,
      operationID: Search,
      roleID: 0,
      tbL_TYPE_USERROLECOMPANYMAPPING_: selectedSearchRole?.map((x) => ({
        roleID: x.RoleId,
        userID: SearchFields?.userId,
        companyID: SearchFields?.companyID,
        isChecked: SearchFields?.isActive,
      })),
    };
    console.log(selectedSearchRole)
    console.log(payload)
    debugger
    PostRequest(SETUP_USER_ROLE_COMPANY_MAPPING, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.SetupUserRoleCompanyMapping,
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
      tbL_TYPE_USERROLECOMPANYMAPPING_: selectedRole?.map((x) => ({
        roleID: x.RoleId,
        userID: FormFields?.userID,
        companyID: FormFields?.companyID,
        isChecked: FormFields?.isActive,
      })),
    };
    PostRequest(SETUP_USER_ROLE_COMPANY_MAPPING, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        setSelectedRole(null);
        if (res.data?.SetupUserRoleCompanyMapping?.[0]?.HasError === 0) {
          CustomSuccessAlert(
            res.data?.SetupUserRoleCompanyMapping?.[0]?.Message
          );
          getUserRoleByCompany();
        } else {
          CustomErrorMessage(
            res.data?.SetupUserRoleCompanyMapping?.[0]?.Message
          );
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    const value = {
      label: obj?.RoleName,
      value: obj?.RoleID,
      RoleId: obj?.RoleID,
    };
    setSelectedRole([value]);
    const data = {
      userRoleComapnyMappingID: obj?.UserRoleCompanyMappingID,
      roleID: obj?.RoleID,
      companyID: obj?.CompanyID,
      isActive: obj?.IsActive == "true" ? true : false,
      userId: obj?.UserId,
      adminUserId: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    console.log(obj);
    const payload = {
      operationID: Delete,
      userRoleComapnyMappingID: obj?.UserRoleCompanyMappingID,
      roleID: obj?.RoleID,
      companyID: obj?.CompanyID,
      isActive: false,
      userId: obj?.UserId,
      adminUserId: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
      tbL_TYPE_USERROLECOMPANYMAPPING_: [
        {
          roleID: obj?.RoleID,
          userID: obj?.UserId,
          companyID: obj?.CompanyID,
          isChecked: false,
        },
      ],
    };
    PostRequest(SETUP_USER_ROLE_COMPANY_MAPPING, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        setSelectedRole(null);
        if (res.data?.SetupUserRoleCompanyMapping?.[0]?.HasError === 0) {
          CustomSuccessAlert(
            res.data?.SetupUserRoleCompanyMapping?.[0]?.Message
          );
          getUserRoleByCompany();
        } else {
          CustomErrorMessage(
            res.data?.SetupUserRoleCompanyMapping?.[0]?.Message
          );
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
    getUserRoleByCompany();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
    setSelectedRole(null);
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleInputChangeSelect = (event, index) => {
    if (event?.[0]?.dropdownName === "Role") {
      setSelectedRole(event);
      let data = { name: "roleID", value: event.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
    else{
      setSelectedRole([])
    }
  };

  const handleInputSearchChangeSelect = (event, index) => {
    debugger
    if (event?.[0]?.dropdownName === "Role") {
      setSelectedSearchRole(event);
      let data = { name: "roleID", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    }
    else{
      setSelectedSearchRole([])
    }
  };

  const formPanel = (
    <Fragment>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Users"
          name="userId"
          fieldId="UserId"
          fieldName="Name"
          list={UserList}
          onChange={handleAddChange}
          value={FormFields?.userId}
        ></FormGroupSelect>
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Company"
          name="companyID"
          fieldId="CompanyID"
          fieldName="Company"
          list={CompanyList}
          onChange={handleAddChange}
          value={FormFields?.companyID}
        ></FormGroupSelect>
      </Col>
      <Col lg="4" md="4" xs="12">
        <Label>Role</Label>
        <ReactSelect
          //   closeMenuOnSelect={true}
          isMulti={true}
          onChange={(e) => handleInputChangeSelect(e)}
          options={RoleList}
          value={selectedRole}
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
      formName="User Role Allocation"
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
      //   formLoader={formLoad}
    />
  );
};

export default UserRoleAllocation;
