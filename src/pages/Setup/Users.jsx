import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Label } from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import {
  Delete,
  Search,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import { SecuritySetup_UserRoleApplicationMapping } from "../../utils/Config";

import {
  SuccessAlert,
  AlreadyExistAlert,
  CustomSuccessAlert,
  CustomErrorMessage,
  DeleteWithConfirmation,
} from "../../components/Alert";
import { decryptData } from "../../EncryptData";
import MultiSelect from "react-select";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  UserName: "",
  ApplicationName: "",
  RoleName: "",
  UserList: new Array(0),
};
const initialFormFields = {
  UserName: "",
  Password: "",
  RoleApplicationMappingId: "",
  UserList: new Array(0),
  ApplicationList: new Array(0),
  RoleList: new Array(0),
  SelectedRoles: new Array(0),
};

const Users = () => {
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const [selectedSearchOption, setSelectedSearchOption] = useState(null);
  const [selectedFormOption, setSelectedFormOption] = useState(null);

  useEffect(() => {
    getUserAndApplication();
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
  }, []);

  const getUserAndApplication = () => {
    const payload = {
      OperationId: Select,
      ApplicationId: 0,
      userRoleApplicationMappingId: "0",
      RoleApplicationMappingID: "0",
      UserID: 0,
      LoginID: 0,
      IsActive: true,
      CreatedBy: 0,
      ModifiedBy: 0,
      UserIP: "",
    };
    SecuritySetup_UserRoleApplicationMapping(payload)
      .then((res) => {
        initialSearchFields.UserList = res.data.Table?.map((x) => ({
          ...x,
          label: x.LoginId,
          value: x.UserId,
        }));
        initialFormFields.ApplicationList = res.data.Table1;
        initialFormFields.UserList = res.data.Table?.map((x) => ({
          ...x,
          label: x.LoginId,
          value: x.UserId,
        }));
        initialFormFields.RoleList = res.data.Table2;
        initialFormFields.SelectedRoles = [];
        dispatch({
          type: SET_ALL_CRUD_FROM_FIELDS,
          payload: initialFormFields,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "ApplicationName", name: "Application Name" },
    { field: "RoleName", name: "Role Name" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const submitSearch = () => {
    const payload = {
      operationId: Search,
      ApplicationId: 0,
      userRoleApplicationMappingId: "0",
      RoleApplicationMappingID: "0",
      UserID: SearchFields.UserName !== "" ? SearchFields.UserName : 0,
      LoginID: 0,
      IsActive: true,
      CreatedBy: 1,
      ModifiedBy: 1,
      UserIP: "192.168.1.105",
    };
    SecuritySetup_UserRoleApplicationMapping(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
            FormFields: FormFields,
            SearchFields: SearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = (id) => {
    const payload = {
      operationId: 2,
      applicationId: 0,
      userRoleApplicationMappingId: "0",
      roleApplicationMappingID: FormFields.SelectedRoles.filter(
        (y) => y.RoleApplicationMappingId
      )
        .map((x) => x.RoleApplicationMappingId)
        .join(","),
      uSerID: FormFields.UserName,
      loginID: 0,
      isActive: true,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: "192.168.1.104",
    };

    SecuritySetup_UserRoleApplicationMapping(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: FormFields });
        getUserAndApplication();
        FormFields.UserName = "";
        if (res.data.Table[0].HasError == 0) {
          SuccessAlert();
          submitSearch();
        } else {
          AlreadyExistAlert();
        }
        setSelectedFormOption(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    getUserAndApplication();
    FormFields.UserName = "";
    setSelectedFormOption(null);
  };

  const handleSearchInputChangeSelect = (event) => {
    setSelectedSearchOption(event);
    let data = { name: "UserName", value: event.UserId };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleFormInputChangeSelect = (event) => {
    setSelectedFormOption(event);
    let data = { name: "UserName", value: event.UserId };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <Label>User</Label>
        <MultiSelect
          closeMenuOnSelect={true}
          onChange={handleSearchInputChangeSelect}
          isMulti={false}
          options={FormFields?.UserList}
          value={selectedSearchOption}
          hideSelectedOptions={true}
        />
      </Col>
      {/* <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SearchFields?.UserList}
          label="User Name"
          name="UserName"
          fieldId="UserId"
          fieldName="LoginId"
          onChange={handleSearchChange}
          value={SearchFields?.UserName}
        />
      </Col> */}
    </Fragment>
  );

  const handleCheckChange = (e, application) => {
    if (e.target.value === false) {
      let datas = { name: e.target.name, value: null };
      let appIndex = FormFields.SelectedRoles.findIndex(
        (x) => x.ApplicationId === application.ApplicationId
      );
      if (appIndex === -1) {
        FormFields.SelectedRoles.push(datas);
      } else {
        FormFields.SelectedRoles[appIndex].RoleApplicationMappingId = "";
      }
      let data1 = {
        name: "SelectedRoles",
        value: FormFields.SelectedRoles,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
      let appsIndex = FormFields.ApplicationList.findIndex(
        (x) => x.ApplicationId === application.ApplicationId
      );
      FormFields.ApplicationList[appsIndex].Checked = e.target.value;
      dispatch({
        type: SET_CRUD_FROM_FIELDS,
        payload: { name: "ApplicationList", value: FormFields.ApplicationList },
      });
    } else {
      let appIndex = FormFields.ApplicationList.findIndex(
        (x) => x.ApplicationId === application.ApplicationId
      );
      FormFields.ApplicationList[appIndex].Checked = e.target.value;
      dispatch({
        type: SET_CRUD_FROM_FIELDS,
        payload: { name: "ApplicationList", value: FormFields.ApplicationList },
      });
    }
  };

  const handleAddChange = (e, ind) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleSelectChange = (e, application) => {
    let selectedRoles = FormFields.SelectedRoles;
    let roleIndex = selectedRoles.findIndex(
      (x) => x.ApplicationId === application.ApplicationId
    );

    if (roleIndex >= 0) {
      selectedRoles[roleIndex].RoleApplicationMappingId = e.target.value;
    } else {
      selectedRoles.push({
        ApplicationId: application.ApplicationId,
        RoleApplicationMappingId: e.target.value,
      });
    }
    let data = {
      name: "SelectedRoles",
      value: selectedRoles,
    };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          operationId: Delete,
          applicationId: obj.ApplicationId,
          userRoleApplicationMappingId: obj.UserRoleApplicationMappingId,
          roleApplicationMappingID: "0",
          uSerID: obj.UserId,
          loginID: 0,
          isActive: true,
          createdBy: 1,
          modifiedBy: 1,
          userIP: "192.168.1.104",
        };

        SecuritySetup_UserRoleApplicationMapping(payload)
          .then((res) => {
            if (res?.data?.Table[0]?.HasError === 0) {
              CustomSuccessAlert(res?.data?.Table[0]?.Message);
              submitSearch();
            } else {
              CustomErrorMessage(res?.data?.Table[0]?.Message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const onEditRow = (obj) => {
    const payload = {
      operationId: 3,
      applicationId: 0,
      userRoleApplicationMappingId: "0",
      roleApplicationMappingID: "0",
      uSerID: obj.UserId,
      loginID: 0,
      isActive: true,
      createdBy: 1,
      modifiedBy: 1,
      userIP: "192.168.1.104",
    };
    SecuritySetup_UserRoleApplicationMapping(payload)
      .then((res) => {
        FormFields.ApplicationList = res.data.Table2.map((x) => ({
          ...x,
          Checked: res.data.Table1.some(
            (y) => y.ApplicationId === x.ApplicationId
          ),
        }));
        FormFields.RoleList = res.data.Table;
        FormFields.SelectedRoles = res.data.Table1;
        FormFields.UserList = res.data.Table3?.map((x) => ({
          ...x,
          label: x.LoginId,
          value: x.UserId,
        }));
        FormFields.UserName = res.data.Table3?.[0].UserId;
        setSelectedFormOption({
          label: FormFields.UserList?.[0]?.LoginId,
          value: FormFields.UserList?.[0]?.UserId,
        });
        dispatch({
          type: SET_ALL_CRUD_FROM_FIELDS,
          payload: FormFields,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const cancelSearch = () => {
    SearchFields.UserName = "";
    dispatch({
      type: SET_ALL_CRUD_FROM_FIELDS,
      payload: FormFields,
    });
    setSelectedSearchOption(null);
  };
  const formPanel = (
    <Fragment>
      <Col lg="12" md="12" xs="12">
        <Label>User</Label>
        <MultiSelect
          closeMenuOnSelect={true}
          onChange={handleFormInputChangeSelect}
          isMulti={false}
          options={FormFields?.UserList}
          value={selectedFormOption}
          hideSelectedOptions={true}
        />
      </Col>
      {/* <Col lg="12" md="12" xs="12">
        <FormGroupSelect
          list={FormFields?.UserList}
          label="User Name"
          name="UserName"
          fieldId="UserId"
          fieldName="LoginId"
          onChange={handleAddChange}
          value={FormFields?.UserName}
          // disabled={FormFields.UserName ? true : false}
        />
      </Col> */}
      {FormFields?.ApplicationList &&
        FormFields?.ApplicationList?.map((application, index) => (
          <Fragment key={index}>
            <Col lg="6" md="6" xs="12">
              <FormGroupSelect
                list={FormFields.RoleList.filter(
                  (role) => role.ApplicationId === application.ApplicationId
                )}
                label="Role"
                name="RoleApplicationMappingId"
                fieldId="RoleApplicationMappingId"
                fieldName="RoleName"
                onChange={(e) => handleSelectChange(e, application)}
                value={
                  FormFields?.SelectedRoles?.filter(
                    (x) => x.ApplicationId === application.ApplicationId
                  )[0]?.RoleApplicationMappingId
                }
                disabled={!application.Checked}
              />
            </Col>
            <Col lg="6" md="6" xs="12">
              <FormGroupCheckbox
                label={application.ApplicationName}
                name={application.ApplicationName}
                onChange={(e) => handleCheckChange(e, application)}
                value={application.Checked}
              />
            </Col>
          </Fragment>
        ))}
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Users"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      cancelSearch={cancelSearch}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      handleCancel={handleCancel}
    />
  );
};

export default Users;
