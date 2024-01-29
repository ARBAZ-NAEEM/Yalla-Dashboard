import React, { Fragment } from "react";
import moment from "moment/moment";
import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import {
  Delete,
  Insert,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../../utils/Config";

import {
  CustomErrorMessage,
  DeleteWithConfirmation,
  CustomSuccessAlert,
} from "../../../components/Alert";
import { decryptData } from "../../../EncryptData";
import {
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";
import {
  COST_CENTER,
  CUSTOMER_SETUP,
  FISCAL_YEAR,
  PERIOD,
} from "../../../utils/UrlConstants";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import { formatDateFunctionByName, getCurrentTime } from "../../../functions/DateFormatFunction";

const initialSearchFields = {
  OperationID: Search,
  FyID: 0,
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  FiscalYear: "",
  FyFrom: "2023-07-24T13:56:22.263Z",
  FyTo: "2023-07-24T13:56:22.263Z",
  IsLock: true,
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const initialFormFields = {
  OperationID: Insert,
  FyID: 0,
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  FiscalYear: "",
  FyFrom: "2023-07-24T13:56:22.263Z",
  FyTo: "2023-07-24T13:56:22.263Z",
  IsLock: true,
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const FiscalYear = () => {
  const { SearchFields, FormFields, SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getFiscalYear();
  }, []);

  function getFiscalYear() {
    PostRequest(FISCAL_YEAR, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              FyFrom: formatDateFunctionByName(x.FyFrom, "-"),
              FyTo: formatDateFunctionByName(x.FyTo, "-"),
            })),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "FiscalYear", name: "Fiscal Year" },
    { field: "FyFrom", name: "Fiscal From" },
    { field: "FyTo", name: "Fiscal To" },
  ];

  const handleSearchChange = (e) => {
    // const value = moment(e.target.value).format("YYYY-MM-DD").concat(getCurrentTime());
    // console.log(value);
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
          label="Fiscal Year"
          name="FiscalYear"
          maxLength="150"
          required
          onChange={handleSearchChange}
          value={SearchFields?.FiscalYear}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          Begining Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="FyFrom"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.FyFrom}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          Expected Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="FyTo"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.FyTo}
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupCheckbox
          label=" Is Lock"
          name="IsLock"
          value={SearchFields?.IsLock}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      OperationID: Search,
    };

    PostRequest(FISCAL_YEAR, payload)
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

  const submitForm = (id) => {
    const payload = {
      ...FormFields,
      OperationID: id,
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(FISCAL_YEAR, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res?.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
          getFiscalYear();
        } else {
          CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      OperationID: obj?.OperationID,
      FyID: obj?.FyID,
      FiscalYear: obj?.FiscalYear,
      FyFrom: moment(obj.FyFrom).format("YYYY-MM-DD"),
      FyTo: moment(obj.FyTo).format("YYYY-MM-DD"),
      IsActive: obj?.IsActive,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          operationId: Delete,
          costcenterID: obj?.CostcenterID,
          name: obj?.Name,
          ccNatureID: obj?.CCNatureID,
          ccTypeID: obj?.CCTypeID,
          partyInfoID: obj?.PartyInfoID,
          beginingDate: obj.BeginingDate,
          expectedDate: obj.ExpectedDate,
          actualDate: obj.ActualDate,
          isActive: false,
          userID: decryptData("loginId", SessionStorage),
          userIP: decryptData(UserNetworkInfo)?.IPv4,
        };

        PostRequest(COST_CENTER, payload)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res?.data?.Table?.[0]?.HasError === 0) {
              CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
              getFiscalYear();
            } else {
              CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
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
    getFiscalYear();
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
          label="Fiscal Year"
          name="FiscalYear"
          maxLength="150"
          required
          onChange={handleAddChange}
          value={FormFields?.FiscalYear}
        />
      </Col>

      <Col lg="4" md="4" xs="12">
        <Label>
          Begining Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="FyFrom"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.FyFrom}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <Label>
          Expected Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="FyTo"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.FyTo}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupCheckbox
          label=" Is Lock"
          name="IsLock"
          value={FormFields?.IsLock}
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="4" md="4" xs="12">
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
      formName="Fasical Year"
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
    />
  );
};

export default FiscalYear;
