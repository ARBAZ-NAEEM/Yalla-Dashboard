import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import { dateFormat, dateFormatPlaceholder } from "../../common/dateFormatEnum";
import {
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import {
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_ALL_CRUD_FROM_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  Setup_Admission_AcademicYear,
} from "../../utils/Config";
import DatePicker from "react-datepicker";
import { formatDateFunction } from "../../functions/DateFormatFunction";
import { decryptData } from "../../EncryptData";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  OperationId: 0,
  StartYearDate: null,
  EndYearDate: null,
  Description: "",
  IsActive: 1,
  UserId: 0,
};

const initialFormFields = {
  OperationId: 1,
  StartYearDate: new Date(),
  EndYearDate: new Date(),
  Description: "",
  IsActive: 1,
  UserId: 0,
};

const AcademicYear = () => {
  const {
    SearchFields,
    FormFields,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
const [searchStartDate, setSearchStartDate] =  useState('')
const [searchEndDate, setSearchEndDate] =  useState('')

  useEffect(() => {
    getAcademicYearData();
  }, []);

  const getAcademicYearData = () => {
    Setup_Admission_AcademicYear(initialSearchFields)
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
    { field: "AcademicYearDetail", name: "Academic Year" },
    { field: "FromDate", name: "From Date" },
    { field: "ToDate", name: "To Date" },
    { field: "Description", name: "Description" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const AllDateSet = (event, type) => {
    if (type === "StartDateSearch") {
      setSearchStartDate(event);
      let date = formatDateFunction(event, "-");
      SearchFields.StartYearDate = date;
      let data1 = {
        name: "StartYearDate",
        value: SearchFields.StartYearDate,
      };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    } else if (type === "EndDateSearch") {
      setSearchEndDate(event)
      let date = formatDateFunction(event, "-");
      SearchFields.EndYearDate = date;
      let data1 = {
        name: "EndYearDate",
        value: SearchFields.EndYearDate,
      };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    } else if (type === "StartDate") {
      let date = formatDateFunction(event, "-");
      FormFields.StartYearDate = event;
      let data1 = {
        name: "StartYearDate",
        value: FormFields.StartYearDate,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
    } else if (type === "EndDate") {
      let date = formatDateFunction(event, "-");
      FormFields.EndYearDate = event;
      let data1 = {
        name: "EndYearDate",
        value: FormFields.EndYearDate,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
    }
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <div className="form-group">
          <label className="form-label">
            Start Date<span className="text-danger">*</span>
          </label>
          <DatePicker
            selected={searchStartDate}
            onChange={(e) => AllDateSet(e, "StartDateSearch")}
            className="form-control"
            name="StartYearDate"
            required={true}
            showYearDropdown={true}
            dateFormat={dateFormat}
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="3" md="3" xs="12">
        <div className="form-group">
          <label className="form-label">
            End Date<span className="text-danger">*</span>
          </label>
          <DatePicker
            selected={searchEndDate}
            onChange={(e) => AllDateSet(e, "EndDateSearch")}
            className="form-control"
            name="EndYearDate"
            required={true}
            showYearDropdown={true}
            dateFormat={dateFormat}
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Description"
          name="Description"
          required
          onChange={handleSearchChange}
          value={SearchFields?.Description}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      OperationId: 0,
      StartYearDate: formatDateFunction(SearchFields?.StartYearDate,'-'),
      EndYearDate: formatDateFunction(SearchFields?.EndYearDate, '-'),
      Description: SearchFields?.Description,
      IsActive: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };

    Setup_Admission_AcademicYear(payload)
      .then((res) => {
        setSearchStartDate('')
        setSearchEndDate('')
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
      OperationId: id,
      StartYearDate: FormFields?.StartYearDate,
      EndYearDate: FormFields?.EndYearDate,
      Description: FormFields?.Description,
      IsActive: 1,
      UserId: decryptData(LOGINID, SessionStorage),
    };

    Setup_Admission_AcademicYear(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Message);
          getAcademicYearData();
        } else {
          CustomErrorMessage(res.data.Table[0].Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    
    const data = {
      StartYearDate: new Date(obj?.FromDate),
      EndYearDate: new Date(obj?.ToDate),
      Description: obj?.Description,
      IsActive: 1,
      UserId: decryptData(LOGINID, SessionStorage),
    };

    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    getAcademicYearData();
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
        <div className="form-group">
          <label className="form-label">
            Start Date<span className="text-danger">*</span>
          </label>
          <DatePicker
            selected={FormFields?.StartYearDate}
            onChange={(e) => AllDateSet(e, "StartDate")}
            className="form-control"
            name="StartYearDate"
            required={true}
            showYearDropdown={true}
            dateFormat={dateFormat}
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="6" md="6" xs="12">
        <div className="form-group">
          <label className="form-label">
            End Date<span className="text-danger">*</span>
          </label>
          <DatePicker
            selected={FormFields?.EndYearDate}
            onChange={(e) => AllDateSet(e, "EndDate")}
            className="form-control"
            name="EndYearDate"
            required={true}
            showYearDropdown={true}
            dateFormat={dateFormat}
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Description"
          name="Description"
          required
          onChange={handleAddChange}
          value={FormFields?.Description}
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Academic Year"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch} 
      handleCancel={handleCancel}
    />
  );
};

export default AcademicYear;
