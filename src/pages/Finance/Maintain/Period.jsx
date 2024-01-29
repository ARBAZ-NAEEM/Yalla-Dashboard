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
  PERIOD,
} from "../../../utils/UrlConstants";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import { formatDateFunction1, formatDateFunction2, formatDateFunctionByName } from "../../../functions/DateFormatFunction";

const initialSearchFields = {
  OperationID: Search,
  PeriodID: 0,
  Period: "",
  PeriodFrom: "2023-07-24T12:21:14.451Z",
  PeriodTo: "2023-07-24T12:21:14.451Z",
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const initialFormFields = {
  OperationID: Insert,
  PeriodID: 0,
  Period: "",
  PeriodFrom: "2023-07-24T12:21:14.451Z",
  PeriodTo: "2023-07-24T12:21:14.451Z",
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const Period = () => {
  const { SearchFields, FormFields, SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getPeriod();
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
  }, []);

  function getPeriod() {
    PostRequest(PERIOD, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              PeriodFrom: formatDateFunctionByName(x.PeriodFrom, "-"),
              PeriodTo: formatDateFunctionByName(x.PeriodTo, "-"),

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
    { field: "Period", name: "Period" },
    { field: "PeriodFrom", name: "Period From" },
    { field: "PeriodTo", name: "Period To" },
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
          label="Period"
          name="Period"
          maxLength="150"
          required
          isAlphabetic="true"
          onChange={handleSearchChange}
          value={SearchFields?.Period}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          Begining Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="PeriodFrom"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.PeriodFrom}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          Expected Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="PeriodTo"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.PeriodTo}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="isActive"
          value={SearchFields?.IsActive}
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

    PostRequest(PERIOD, payload)
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
    debugger
    const payload = {
      ...FormFields,
      OperationID: id,
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(PERIOD, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res?.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
          getPeriod();
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
      OperationID: obj.OperationID,
      PeriodID: obj?.PeriodID,
      Period: obj?.Period,
      PeriodFrom: moment(obj.PeriodFrom).format("YYYY-MM-DD"),
      PeriodTo: moment(obj.PeriodTo).format("YYYY-MM-DD"),
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
              getPeriod();
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
    getPeriod();
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
          label="Period"
          name="Period"
          maxLength="150"
          required
          isAlphabetic="true"
          onChange={handleAddChange}
          value={FormFields?.Period}
        />
      </Col>

      <Col lg="4" md="4" xs="12">
        <Label>
          From Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="PeriodFrom"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.PeriodFrom}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <Label>
          To Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="PeriodTo"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.PeriodTo}
          required
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
      formName="Period"
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

export default Period;
