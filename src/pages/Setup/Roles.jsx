import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input } from "reactstrap";
import { Insert, roleByApplication, Search, Select, SessionStorage, Update } from "../../common/SetupMasterEnum";
import { AlreadyExistAlert, SuccessAlert } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../EncryptData";
import {
  RESET_FORM_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import {
  SecuritySetup_GetApplications,
  SecuritySetup_RoleOperation,
} from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  OperationId: Search,
  roleApplicationMappingID: 0,
  ApplicationID: 0,
  RoleID: null ? 0 : 0,
  CreatedBy: 0,
  ModifiedFBy: 0,
  IsActive: false,
  UserIP: "192.168.152.2",
};
const initialFormFields = {
  OperationId: Insert,
  RoleApplicationMappingID: 0,
  ApplicationID: 0,
  RoleName: "",
  RoleID: null ? 0 : 0,
  IsFixed: false,
  IsActive: false,
  Level: 0,
  CreatedBy: 0,
  UserIP: "192.168.152.2",
};
const initialSelectionList = {
  ApplicationList: [],
  RoleList: [],
};
const initialObj = { operationId: Select };
const Roles = () => {
  const {
    SearchFields,
    FormFields,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [selectionList, setSelectionList] = useState(initialSelectionList);
  const [loginId, setLoginId] = useState('');
  const [roleList, setRoleList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getApplicationName();
    getRoles();
    setLoginId(decryptData(LOGINID, SessionStorage))
  }, []);

  const getApplicationName = () => {
    const data = {
      UserId : decryptData(LOGINID, SessionStorage)
    }
    SecuritySetup_GetApplications(data)
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
    SecuritySetup_RoleOperation(initialObj)
      .then((res) => {
       
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const searchRoles = (data) => {
    SecuritySetup_RoleOperation(data)
      .then((res) => {

        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data,
            FormFields: initialFormFields,
            SearchFields: SearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitRoles = (payload) => {

    SecuritySetup_RoleOperation(payload)
      .then((res) => {

        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data[0].HasError === 0) {
          SuccessAlert();
          getApplicationName();
          getRoles();
        } 
        else if (res.data[0].HasError === 1){
          SuccessAlert();
          getApplicationName();
          getRoles();
        }
        else {
          AlreadyExistAlert();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRolesByApplication = (e) => {

    const payload = {
      OperationId: roleByApplication,
      ApplicationID: e
    }
    SecuritySetup_RoleOperation(payload)
      .then((res) => {

        setRoleList(res.data)
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "Application", name: "Application Name" },
    { field: "Role", name: "Role" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    if(e.target.name === "ApplicationID"){
      getRolesByApplication(e.target.value)
    }
  };
  const handleAddChange = (e) => {
   
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  
  const onEditRow = (obj) => {

    let data = {
      OperationId: Update,
      ApplicationID: obj.ApplicationId,
      RoleName: obj.Role,
      IsActive: obj.Active,
      RoleApplicationMappingId: obj.RoleApplicationMappingId,
      ModifiedFBy: loginId
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={selectionList?.RoleList}
          label="Application Name"
          name="ApplicationID"
          fieldId="ApplicationId"
          fieldName="ApplicationName"
          onChange={handleSearchChange}
          value={SearchFields?.ApplicationID}
        />
      </Col>

      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={roleList}
          label="Role"
          name="RoleID"
          fieldId="RoleId"
          fieldName="Role"
          onChange={handleSearchChange}
          value={SearchFields?.RoleID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    searchRoles(SearchFields);
  };
  const cancelSearch = () => {
    getApplicationName();
    getRoles();
  };

  const handleCancel = () => {
    getApplicationName();
    getRoles();
  };

  const submitForm = () => {
    submitRoles(FormFields);
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={selectionList?.RoleList}
          label="Application Name"
          name="ApplicationID"
          fieldId="ApplicationId"
          fieldName="ApplicationName"
          onChange={handleAddChange}
          value={FormFields?.ApplicationID}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Role"
          name="RoleName"
          onChange={handleAddChange}
          value={FormFields?.RoleName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          value={FormFields?.IsActive}
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