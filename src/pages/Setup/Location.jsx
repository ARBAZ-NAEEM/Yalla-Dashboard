//Setup CLass Location
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import { Delete, Search, Select, Update } from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert, DeleteWithConfirmation } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import { getUserIPInfo } from "../../functions/generalFunctions";

import {
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_ALL_CRUD_FROM_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../utils/Config";
import { SETUP_LOCATION } from "../../utils/UrlConstants";

const initialSearchFields = {
  OperationId: Search,
  SetupLocationID: 0,
  LocCode: "",
  LocName: "",
  LocBuilding: "",
  IsActive: true,
  ...getUserIPInfo(),
};

const initialFormFields = {
  OperationId: Select,
  SetupLocationID: 0,
  LocCode: "",
  LocName: "",
  LocBuilding: "",
  IsActive: true,
  ...getUserIPInfo(),
};

const Location = () => {
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    PostRequest(SETUP_LOCATION, initialFormFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "LocCode", name: "Location Code" },
    { field: "LocName", name: "Location Name" },
    { field: "LocBuilding", name: "Location Building" },
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
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Location Code"
          name="LocCode"
          maxLength="150"
          isNumber="true"
          required
          onChange={handleSearchChange}
          value={SearchFields?.LocCode}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Location Name"
          name="LocName"
          maxLength="150"
          required
          onChange={handleSearchChange}
          value={SearchFields?.LocName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Location Building"
          name="LocBuilding"
          maxLength="150"
          required
          onChange={handleSearchChange}
          value={SearchFields?.LocBuilding}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          onChange={handleSearchChange}
          value={SearchFields?.IsActive}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    PostRequest(SETUP_LOCATION, SearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
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
      ...FormFields,
      OperationId: id,
    };
    PostRequest(SETUP_LOCATION, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Column1);
          getLocation();
        } else {
          CustomErrorMessage(res.data.Table[0].Column1);
        }
        getLocation();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      ...FormFields,
      SetupLocationID: obj.SetupLocationID,
      LocCode: obj.LocCode,
      LocName: obj.LocName,
      LocBuilding: obj.LocBuilding,
      OperationId: Update,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          ...FormFields,
          SetupLocationID: obj.SetupLocationID,
          LocCode: obj.LocCode,
          LocName: obj.LocName,
          LocBuilding: obj.LocBuilding,
          OperationId: Delete,
        };
        PostRequest(SETUP_LOCATION, data)
          .then((res) => {
            if (res.data.Table[0].HasError === 0) {
              CustomSuccessAlert(res.data.Table[0].Column1);
              getLocation();
            } else {
              CustomErrorMessage(res.data.Table[0].Column1);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    getLocation();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Location Code"
          name="LocCode"
          maxLength="150"
          required
          isNumber={"true"}
          onChange={handleAddChange}
          value={FormFields?.LocCode}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Location Name"
          name="LocName"
          maxLength="150"
          required
          isAlphabetic="true"
          onChange={handleAddChange}
          value={FormFields?.LocName}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Location Building"
          name="LocBuilding"
          maxLength="150"
          required
          onChange={handleAddChange}
          value={FormFields?.LocBuilding}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          onChange={handleAddChange}
          value={FormFields?.IsActive}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Location"
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
    />
  );
};

export default Location;
