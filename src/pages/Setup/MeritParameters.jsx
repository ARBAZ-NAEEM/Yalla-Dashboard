import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input } from "reactstrap";
import {
  academicYearId,
  Delete,
  Insert,
  meritlistId,
  purposeId,
  Search,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert, DeleteWithConfirmation } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupButton from "../../components/GeneralComponent/FormGroupButton";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../EncryptData";
import {
  formatDateFunction,
  formatDateFunction1,
  formatDateFunctionByName,
} from "../../functions/DateFormatFunction";
import DatePicker from "react-datepicker";
import {
  RESET_FORM_FIELDS,
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import { dateFormat, dateFormatPlaceholder } from "../../utils/CommonMethods";
import {
  ADM_SetupMeritParameter,
  ADM_SetupMeritScore,
} from "../../utils/Config";
import { LOGINID, UserNetworkInfo } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  OperationID: Select,
  SetupMeritListParameterID: 0,
  MeritListID: 0,
  AcademicyearID: 0,
  PurposeID: 0,
  FromDate: "2022-12-13T08:29:41.583Z",
  ToDate: "2022-12-13T08:29:41.583Z",
  Remarks: "",
  IsActive: false,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};
const initialFormFields = {
  OperationID: 0,
  SetupMeritListParameterID: 0,
  MeritListID: 0,
  AcademicyearID: 0,
  PurposeID: 0,
  FromDate: "",
  ToDate: "",
  Remarks: "",
  IsActive: false,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const MeritParameters = () => {
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

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [formFromDate, setFormFromDate] = useState("");
  const [formToDate, setFormToDate] = useState("");

  useEffect(() => {
    getMeritParameters();
  }, []);

  const getMeritParameters = () => {
    ADM_SetupMeritParameter(initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              FromDate: formatDateFunctionByName(x.FromDate),
              ToDate: formatDateFunctionByName(x.ToDate),
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

  const columns = [
    { field: "AcademicYear", name: "Academic Year" },
    { field: "Purpose", name: "Purpose" },
    { field: "FromDate", name: "From Date" },
    { field: "ToDate", name: "To Date" },
    { field: "MeritList", name: "Merit List" },
    { field: "Remarks", name: "Remarks" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };
  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const onEditRow = (obj) => {
    let data = {
      SetupMeritListParameterID: obj?.MeritListParametersId,
      AcademicyearID: obj?.AcademicyearID,
      SetupMeritScoreID: obj?.SetupMeritScoreID,
      PurposeID: obj?.PurposeID,
      MeritListID: obj?.MeritListId,
      FromDate: new Date(obj?.FromDate),
      ToDate: new Date(obj?.ToDate),
      Remarks: obj?.Remarks,
      IsActive: obj?.IsActive,
    };
    setFormFromDate(new Date(obj?.FromDate));
    setFormToDate(new Date(obj?.ToDate));
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          OperationID: Delete,
          SetupMeritListParameterID: obj?.MeritListParametersId,
          MeritListID: obj?.MeritListId,
          AcademicyearID: obj?.AcademicyearID,
          PurposeID: obj?.PurposeID,
          FromDate: new Date(obj?.FromDate),
          ToDate: new Date(obj?.ToDate),
          Remarks: obj?.Remarks,
          IsActive: obj?.IsActive,
          CreatedBy: decryptData(LOGINID, SessionStorage),
          ModifiedBy: 0,
          UserIP: decryptData(UserNetworkInfo)?.IPv4,
        };
        ADM_SetupMeritParameter(payload)
          .then((res) => {
            if (res?.data?.Table?.[0]?.HasError === 0) {
              CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
              getMeritParameters();
              setFormFromDate("");
              setFormToDate("");
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

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == academicYearId
          )}
          label="Academic Year"
          name="AcademicyearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.AcademicyearID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == purposeId
          )}
          label="Purpose"
          name="PurposeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.PurposeID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == meritlistId
          )}
          label="Merit"
          name="MeritListID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.MeritListID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <div className="form-group">
          <label className="form-label">From Data</label>
          <DatePicker
            selected={fromDate}
            dateFormat={dateFormat}
            onChange={(e) => AllDateSet(e, "FromDate", "SearchFields")}
            className="form-control"
            name="FromDate"
            // name="periodFrom"
            placeholderText={dateFormatPlaceholder}
            filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            maxDate={SearchFields?.FromDate}
            time
            required
          />
        </div>
      </Col>
      <Col lg="3" md="3" xs="12">
        <div className="form-group">
          <label className="form-label">To Date</label>
          <DatePicker
            selected={toDate}
            dateFormat={dateFormat}
            minDate={SearchFields?.FromDate}
            onChange={(e) => AllDateSet(e, "ToDate", "SearchFields")}
            className="form-control"
            name="ToDate"
            placeholderText={dateFormatPlaceholder}
            filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            required
          />
        </div>
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Remarks"
          name="Remarks"
          onChange={handleSearchChange}
          value={SearchFields?.Remarks}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      OperationID: Search,
      SetupMeritListParameterID: 0,
      MeritListID: SearchFields?.MeritListID,
      AcademicyearID: SearchFields?.AcademicyearID,
      PurposeID: SearchFields?.PurposeID,
      FromDate: new Date(SearchFields?.FromDate),
      ToDate: new Date(SearchFields?.ToDate),
      Remarks: SearchFields?.Remarks,
      IsActive: SearchFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: 0,
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    ADM_SetupMeritParameter(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              FromDate: formatDateFunctionByName(x.FromDate),
              ToDate: formatDateFunctionByName(x.ToDate),
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
  const cancelSearch = () => {
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialSearchFields });
    setFromDate("");
    setToDate("");
  };

  const handleCancel = () => {
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    setFormToDate("");
    setFormFromDate("");
  };

  const submitForm = (id) => {
    const payload = {
      OperationID: id,
      SetupMeritListParameterID: FormFields?.SetupMeritListParameterID,
      MeritListID: FormFields?.MeritListID,
      AcademicyearID: FormFields?.AcademicyearID,
      PurposeID: FormFields?.PurposeID,
      FromDate: FormFields?.FromDate,
      ToDate: FormFields?.ToDate,
      Remarks: FormFields?.Remarks,
      IsActive: FormFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: id == 2 ? 0 : decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    ADM_SetupMeritParameter(payload)
      .then((res) => {
        if (res?.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
          getMeritParameters();
          setFormFromDate("");
          setFormToDate("");
        } else {
          CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const AllDateSet = (event, type, fieldName) => {
    if (fieldName === "SearchFields") {
      if (type === "FromDate") {
        setFromDate(event);
        let date = formatDateFunction1(event, "-");
        SearchFields.FromDate = date;
        let data1 = {
          name: "FromDate",
          value: SearchFields.FromDate,
        };
        dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
      } else if (type === "ToDate") {
        setToDate(event);
        let date = formatDateFunction1(event, "-");
        SearchFields.ToData = date;
        let data1 = {
          name: "ToDate",
          value: SearchFields.ToData,
        };
        dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
      }
    } else {
      if (type === "FromDate") {
        setFormFromDate(event);
        let date = formatDateFunction1(event, "-");
        FormFields.FromDate = date;
        let data1 = {
          name: "FromDate",
          value: FormFields.FromDate,
        };
        dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
      } else if (type === "ToDate") {
        setFormToDate(event);
        let date = formatDateFunction1(event, "-");
        FormFields.ToData = date;
        let data1 = {
          name: "ToDate",
          value: FormFields.ToData,
        };
        dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
      }
    }
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == academicYearId
          )}
          label="Academic Year"
          name="AcademicyearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.AcademicyearID}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == purposeId
          )}
          label="Purpose"
          name="PurposeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.PurposeID}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == meritlistId
          )}
          label="Merit"
          name="MeritListID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          required
          value={FormFields?.MeritListID}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <div className="form-group">
          <label className="form-label">
            {FormFields?.PurposeID === 5642
              ? "Class Commencement Date"
              : "From Date"}
          </label>
          <DatePicker
            selected={formFromDate}
            dateFormat={dateFormat}
            onChange={(e) => AllDateSet(e, "FromDate", "FormFields")}
            className="form-control"
            name="FromDate"
            // name="periodFrom"
            placeholderText={dateFormatPlaceholder}
            filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
            maxDate={FormFields?.FromDate}
            time
            required
          />
        </div>
      </Col>
      {FormFields?.PurposeID != 5642 ? (
        <Col lg="6" md="6" xs="12">
          <div className="form-group">
            <label className="form-label">To Date</label>
            <DatePicker
              selected={formToDate}
              dateFormat={dateFormat}
              minDate={FormFields?.FromDate}
              onChange={(e) => AllDateSet(e, "ToDate", "FormFields")}
              className="form-control"
              name="ToDate"
              placeholderText={dateFormatPlaceholder}
              filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0}
              required
            />
          </div>
        </Col>
      ) : null}

      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Remarks"
          name="Remarks"
          onChange={handleAddChange}
          value={FormFields?.Remarks}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={FormFields?.IsActive}
          onChange={handleAddChange}
          required
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Merit Parameters"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      searchSubmit={submitSearch}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default MeritParameters;
