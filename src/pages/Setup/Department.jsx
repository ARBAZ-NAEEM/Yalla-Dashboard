import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import {
  businessUnit,
  Delete,
  department,
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
  SET_INITIAL_DROPDOWN_FORM_STATE,
  RESET_SEARCH_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  Setup_MasterDetails_All_Dropdowns,
  Setup_MasterDetails_Operation,
} from "../../utils/Config";

import { CustomSuccessAlert, CustomErrorMessage, DeleteWithConfirmation } from "../../components/Alert";
import { decryptData } from "../../EncryptData";

const initialSearchFields = { DepartmentName: "" };
const initialFormFields = {
  BussinessUnit: "",
  DepartmentName: "",
  SetupDetailId: 0,
};

const Department = () => {
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

  useEffect(() => {
    getMasterDetailAllDropdown();
    getDepartments();
    // getCompany();
  }, []);

  function getMasterDetailAllDropdown() {
    const payload = {
      operationId: 1,
    };

    Setup_MasterDetails_All_Dropdowns(payload)
      .then((res) => {
        let data = {
          name: "Tables",
          value: res.data,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getDepartments() {
    const payload = {
      operationId: Select,
      setupMasterId: department,
    };

    Setup_MasterDetails_Operation(payload)
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
  }

  const columns = [{ field: "SetupDetailName", name: "Department" }];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.selectedValue };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Department"
          name="DepartmentName"
          onChange={handleSearchChange}
          value={SupportingTables?.DepartmentName}
          list={SupportingTables?.Tables?.filter(
            (x) => x.SetupMasterId == department
          )}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
        ></FormGroupSelect>
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      operationId: Search,
      setupMasterId: department,
      parentId: 0,
      setupDetailName: SearchFields?.DepartmentName,
      createdBy: 0,
      userIP: "192.168.1.104",
    };
    Setup_MasterDetails_Operation(payload)
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

  const submitForm = (id) => {
    const payload = {
      operationId: id,
      setupMasterId: department,
      parentId: FormFields?.BussinessUnit,
      setupDetailName: FormFields?.DepartmentName,
      setupDetailId: FormFields?.SetupDetailId,
      createdBy: decryptData("EmplId", SessionStorage),
      userIP: "192.168.1.104",
    };
    Setup_MasterDetails_Operation(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data[0].HasError === 0) {
          CustomSuccessAlert(res.data[0].Message);
          getDepartments();
        } else {
          CustomErrorMessage(res.data[0].Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      SetupDetailId: obj.SetupDetailId,
      DepartmentName: obj.SetupDetailName,
      BussinessUnit: obj.ParentId,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          operationId: Delete,
          setupMasterId: department,
          parentId: 0,
          setupDetailName: obj.SetupDetailName,
          setupDetailId: obj.SetupDetailId,
          createdBy: decryptData("EmplId", SessionStorage),
          userIP: "192.168.1.104",
        };
        Setup_MasterDetails_Operation(payload)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res.data[0].HasError === 0) {
              CustomSuccessAlert(res.data[0].Message);
              getDepartments();
            } else {
              CustomErrorMessage(res.data[0].Message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const handleCancel = () => {
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  };

  const cancelSearch = () => {
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialSearchFields });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Bussiness Unit"
          name="BussinessUnit"
          onChange={handleAddChange}
          value={FormFields?.BussinessUnit}
          list={SupportingTables?.Tables?.filter(
            (x) => x.SetupMasterId == businessUnit
          )}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
        ></FormGroupSelect>
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Department Name"
          name="DepartmentName"
          onChange={handleAddChange}
          value={FormFields?.DepartmentName}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Department"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      handleCancel={handleCancel}
      cancelSearch={cancelSearch}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default Department;
