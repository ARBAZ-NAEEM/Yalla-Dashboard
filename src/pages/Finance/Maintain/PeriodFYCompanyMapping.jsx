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
  PERIOD_FYCOMPANY_MAPPING,
} from "../../../utils/UrlConstants";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { object } from "prop-types";

const initialSearchFields = {
  OperationID: Search,
  PeriodFYCompanyMappingID: 0,
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  PeriodID: 0,
  FyID: 0,
  IsLock: true,
  LockBy: 0,
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const initialFormFields = {
  OperationID: Insert,
  PeriodFYCompanyMappingID: 0,
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  PeriodID: 0,
  FyID: 0,
  IsLock: true,
  LockBy: 0,
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const initialPeriod = {
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

const initialFiscalYear = {
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

const PeriodFYCompanyMapping = () => {
  const { SearchFields, FormFields, SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedFiscalYear, setSelectedFiscalYear] = useState(null);

  const [selectedOptionPeriod, setselectedOptionPeriod] = useState(null);
  const [selectedOptionFiscalYear, setselectedOptionFiscalYear] =
    useState(null);

  useEffect(() => {
    getPeriod_FYCompany_Mapping();
    getPeriod();
    getFiscalYear();
  }, []);

  const getPeriod = () => {
    PostRequest(PERIOD, initialPeriod)
      .then((res) => {
        let PeriodType = { name: "Period", value: res?.data?.Table };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: PeriodType,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getFiscalYear = () => {
    PostRequest(FISCAL_YEAR, initialFiscalYear)
      .then((res) => {
        let FiscalYear = { name: "FiscalYear", value: res?.data?.Table };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: FiscalYear,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function getPeriod_FYCompany_Mapping() {
    PostRequest(PERIOD_FYCOMPANY_MAPPING, initialSearchFields)
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
  }

  const { Period, FiscalYear } = SupportingTables;

  const columns = [
    { field: "FiscalYear", name: "Fiscal Year" },
    { field: "Period", name: "Period" },

    // { field: "FyTo", name: "Fiscal To" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleInputChangeSelect = (event) => {
    if (event.name === "Period") {
      setSelectedOption(event);
      let data = { name: "PeriodID", value: event.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    } else if (event.name === "FiscalYear") {
      setSelectedFiscalYear(event);
      let data = { name: "FyID", value: event.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
  };

  const handleInsertChangeSelect = (event) => {
    if (event.name === "Period") {
      setselectedOptionPeriod(event);
      let data = { name: "PeriodID", value: event.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    } else if (event.name === "FiscalYear") {
      setselectedOptionFiscalYear(event);
      let data = { name: "FyID", value: event.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <Label>Period</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelect}
          options={Period?.map((item) => ({
            ...item,
            value: item.PeriodID,
            label: item.Period,
            name: "Period",
          }))}
          value={selectedOption}
        />
      </Col>

      <Col lg="3" md="3" xs="12">
        <Label>Fiscal Year</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelect}
          options={FiscalYear?.map((item) => ({
            ...item,
            value: item.FyID,
            label: item.FiscalYear,
            name: "FiscalYear",
          }))}
          value={selectedFiscalYear}
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
      <Col lg="2" md="2" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = (id) => {
    const payload = {
      ...FormFields,
      OperationID: id,
      FyID: 0,
      CompanyID: decryptData("CompanyID", SessionStorage),
      UserID: decryptData("loginId", SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
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
      LockBy: 0,
      CompanyID: decryptData(COMPANY_ID, SessionStorage),
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };

    PostRequest(PERIOD_FYCOMPANY_MAPPING, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res?.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
          getPeriod_FYCompany_Mapping();
        } else {
          CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let period = { label: obj?.Period, value: obj?.PeriodID };
    setselectedOptionPeriod(period);
    let FasicalYear = { label: obj?.FiscalYear, value: obj?.FyID };
    setselectedOptionFiscalYear(FasicalYear);
    let data = {
      OperationID: obj.OperationID,
      PeriodFYCompanyMappingID: obj?.PeriodFYCompanyMappingID,
      PeriodID: obj?.PeriodID,
      FyID: obj?.FyID,
      IsLock: obj?.IsLock,
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
              getPeriod_FYCompany_Mapping();
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
    setSelectedOption(null);
    setSelectedFiscalYear(null);
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
    setselectedOptionFiscalYear(null);
    setselectedOptionPeriod(null);
  };

  const formPanel = (
    <Fragment>
      <Col lg="4" md="4" xs="12">
        <Label>Period</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInsertChangeSelect}
          options={Period?.map((item) => ({
            ...item,
            value: item.PeriodID,
            label: item.Period,
            name: "Period",
          }))}
          value={selectedOptionPeriod}
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <Label>Fasical Year</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInsertChangeSelect}
          options={FiscalYear?.map((item) => ({
            ...item,
            value: item.FyID,
            label: item.FiscalYear,
            name: "FiscalYear",
          }))}
          value={selectedOptionFiscalYear}
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupCheckbox
          label=" Is Lock"
          name="IsLock"
          value={FormFields?.IsLock}
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="2" md="2" xs="12">
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

export default PeriodFYCompanyMapping;
