import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";

import {
  RESET_FORM_FIELDS,
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import { Delete, Search, Select, designation } from "../../common/SetupMasterEnum";
import { Setup_MasterDetails_Operation } from "../../utils/Config";
import { AlreadyExistAlert, DeleteAlert, SuccessAlert } from "../../components/Alert";

const initialSearchFields = { SetupDetailName: "", Campus: "" };
const initialFormFields = { SetupDetailName: "", Campus: "" };

const Designation = () => {
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getDesignation();
  }, []);

  function getDesignation() {
    const payload = {
      operationId: Select,
      setupMasterId: designation,
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
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      {/* <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Campus"
          name="Campus"
          onChange={handleSearchChange}
          value={SupportingTables.SetupDetailName}
          list={SupportingTables}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
        ></FormGroupSelect>
      </Col> */}
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Designation"
          name="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.SetupDetailName}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      operationId: Search,
      setupMasterId: designation,
      parentId: 0,
      setupDetailName: SearchFields?.SetupDetailName,
      createdBy: 0,
      userIP: "192.168.1.104",
    };

    Setup_MasterDetails_Operation(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data,
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
      setupMasterId: designation,
      parentId: 0,
      setupDetailName: FormFields?.SetupDetailName,
      setupDetailId: FormFields?.SetupDetailId,
      createdBy: 0,
      userIP: "192.168.1.104",
    };

    Setup_MasterDetails_Operation(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data[0].HasError === 0) {
          SuccessAlert();
          getDesignation();
        } else {
          AlreadyExistAlert();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      SetupDetailName: obj?.SetupDetailName,
      SetupDetailId: obj?.SetupDetailId,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    let data = {
      SetupDetailName: obj?.SetupDetailName,
      SetupDetailId: obj?.SetupDetailId,
    };
    const payload = {
      operationId: Delete,
      setupMasterId: designation,
      parentId: 0,
      setupDetailName: data?.SetupDetailName,
      setupDetailId: data?.SetupDetailId,
      createdBy: 0,
      userIP: "192.168.1.104",
    };

    Setup_MasterDetails_Operation(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data[0].HasError === 0) {
          DeleteAlert();
          getDesignation();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const formPanel = (
    <Fragment>
      {/* <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Campus"
          name="Campus"
          onChange={handleAddChange}
          value={SupportingTables.SetupDetailName}
          list={SupportingTables}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
        ></FormGroupSelect>
      </Col> */}
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Designation"
          name="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.SetupDetailName}
        />
      </Col>
    </Fragment>
  );

  const cancelSearch = () => {
    dispatch({
      type: RESET_SEARCH_FIELDS,
      payload: initialSearchFields,
    });
    getDesignation();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };


  return (
    <CrudFormComponent
      formName="Designation"
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

export default Designation;
