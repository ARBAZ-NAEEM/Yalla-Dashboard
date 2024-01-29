import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input } from "reactstrap";
import {
  Insert,
  roleByApplication,
  Search,
  Select,
  SessionStorage,
  Update,
} from "../../../common/SetupMasterEnum";
import {
  AlreadyExistAlert,
  CustomErrorMessage,
  CustomSuccessAlert,
  SuccessAlert,
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import {
  RESET_FORM_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import {
  SecuritySetup_GetApplications,
  SecuritySetup_RoleOperation,
} from "../../../utils/Config";
import { PostRequest } from "../../../utils/Config";
import {
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";
import { COMPANY, ROLES } from "../../../utils/UrlConstants";

const initialSearchFields = {
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
const initialFormFields = {
  operationId: Insert,
  companyID: decryptData(COMPANY_ID, SessionStorage),
  roleID: 0,
  roleName: "",
  isFixed: true,
  isActive: true,
  level: "",
  userID: decryptData(LOGINID, SessionStorage),
  userIP: decryptData(UserNetworkInfo)?.IPv4,
};
const initialSelectionList = {
  ApplicationList: [],
  RoleList: [],
};
const initialObj = { operationId: Select };

const initialCompanyList = {
  OperationID: Select,
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
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const Roles = () => {
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [selectionList, setSelectionList] = useState(initialSelectionList);
  const [loginId, setLoginId] = useState("");
  const [roleList, setRoleList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getCompanyName();
    getRoles();
    setLoginId(decryptData(LOGINID, SessionStorage));
    getRolesByCompany(decryptData(COMPANY_ID, SessionStorage));
  }, []);

  const getCompanyName = () => {
    PostRequest(COMPANY, initialCompanyList)
      .then((res) => {
        setSelectionList({
          ...selectionList,
          RoleList: res?.data?.Table,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRoles = () => {
    PostRequest(ROLES, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRolesByCompany = (e) => {
    const payload = {
      ...initialSearchFields,
      OperationId: Search,
      companyID: e,
    };
    PostRequest(ROLES, payload)
      .then((res) => {
        setRoleList(res?.data?.Table);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "Company", name: "Company Name" },
    { field: "Role", name: "Role" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    if (e.target.name === "companyID") {
      getRolesByCompany(e.target.value);
    }
  };
  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const onEditRow = (obj) => {
    console.log(obj);
    let data = {
      companyID: obj?.CompanyID,
      roleID: obj?.RoleId,
      roleName: obj?.Role,
      isFixed: true,
      isActive: obj?.Active,
      level: "",
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={selectionList?.RoleList}
          label="Comapny Name"
          name="companyID"
          fieldId="CompanyID"
          fieldName="Company"
          onChange={handleSearchChange}
          value={SearchFields?.companyID}
        />
      </Col>

      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={roleList}
          label="Role"
          name="roleID"
          fieldId="RoleId"
          fieldName="Role"
          onChange={handleSearchChange}
          value={SearchFields?.roleID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="isActive"
          value={SearchFields?.isActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...initialSearchFields,
      ...SearchFields,
    };
    PostRequest(ROLES, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: SearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const cancelSearch = () => {
    getCompanyName();
    getRoles();
  };

  const handleCancel = () => {
    getCompanyName();
    getRoles();
  };

  const submitForm = (id) => {
    const payload = {
      ...FormFields,
      operationId: id,
      roleID: id == Insert ? 0 : FormFields?.roleID,
      level: "",
      userID: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(ROLES, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res.data?.Table?.[0]?.Message);
          getRoles();
        } else {
          CustomErrorMessage(res.data?.Table?.[0]?.Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={selectionList?.RoleList}
          label="Company Name"
          name="companyID"
          fieldId="CompanyID"
          fieldName="Company"
          onChange={handleAddChange}
          value={FormFields?.companyID}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Role"
          name="roleName"
          onChange={handleAddChange}
          value={FormFields?.roleName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Fixed"
          name="isFixed"
          value={FormFields?.isFixed}
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="isActive"
          value={FormFields?.isActive}
          onChange={handleAddChange}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Roles"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      onEdit={onEditRow}
      searchSubmit={submitSearch}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default Roles;
