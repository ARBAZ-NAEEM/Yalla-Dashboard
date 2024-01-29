import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Label } from "reactstrap";
import {
  academicYearId,
  campusCity,
  campusType,
  Delete,
  Insert,
  partYearID,
  Search,
  Select,
  semesterId,
  SessionStorage,
  Update,
} from "../../../common/SetupMasterEnum";
import {
  AlreadyExistAlert,
  CustomErrorMessage,
  CustomSuccessAlert,
  DeleteAlert,
  DeleteWithConfirmation,
  SuccessAlert,
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import {
  getUserIPInfo,
  onChange_Select_Department_Program,
} from "../../../functions/generalFunctions";
import useSetupDetailList from "../../../Hooks/useSetupDetailList";
import { RESET_FORM_FIELDS } from "../../../redux/actionType/AuthType";
import {
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE,
  SET_MULTI_CRUD_FORM_FIELD,
} from "../../../redux/actionType/CrudActionTypes";
import { Acad_SetupCourse, PostRequest } from "../../../utils/Config";
import MultiSelect from "react-select";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import { VISITING_FACULTY_PER_RATE_LIST } from "../../../utils/UrlConstants";

const VisitingFacultyPerHourRate = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const initialSearchFields = {
    OperationID: Search,
    SetupVisitingFacultyRatesID: 0,
    AcademicYearID: 0,
    FacultyDepartmentID: 0,
    FacultyDepartmentProgramID: 0,
    Rates: 0,
    IsActive: true,
    UserID: 0,
    UserIP: "string",
  };

  const initialFormFields = {
    OperationID: Search,
    SetupVisitingFacultyRatesID: 0,
    AcademicYearID: 0,
    FacultyDepartmentID: 0,
    FacultyDepartmentProgramID: 0,
    Rates: 0,
    IsActive: true,
    UserID: 0,
    UserIP: "string",
  };

  const [academicYearList] = useSetupDetailList(academicYearId);
  const dispatch = useDispatch();

  useEffect(() => {
    getSetupViisitingFacultyRates(initialSearchFields);
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 2,
      paremeterID: 0,
    }).then((res) =>
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res })
    );
  }, []);

  function getSetupViisitingFacultyRates(payload) {
    PostRequest(VISITING_FACULTY_PER_RATE_LIST, payload)
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

  const columns = [
    { field: "AcademicYear", name: "Academic Year" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "Rates", name: "Per Hour Rate" },
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
        <FormGroupSelect
          label="Academic Year"
          name="AcademicYearID"
          onChange={handleSearchChange}
          value={SearchFields?.AcademicYearID}
          list={academicYearList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="FacultyDepartmentID"
          onChange={async (e) => {
            onChange_Select_Department_Program({
              operationID: 6,
              caseID: 3,
              paremeterID: e.target.value,
            }).then((res) => {
              dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
            });
            handleSearchChange(e);
          }}
          value={SearchFields?.FacultyDepartmentID}
          list={SupportingTables?.Departments}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramID"
          onChange={handleSearchChange}
          value={SearchFields?.FacultyDepartmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={SearchFields?.FacultyDepartmentID == null}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Per Hour Rate"
          name="Rates"
          onChange={handleSearchChange}
          isNumber="true"
          value={SearchFields?.Rates}
          required
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      OperationID: Search,
      SetupVisitingFacultyRatesID: 0,
      IsActive: true,
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(VISITING_FACULTY_PER_RATE_LIST, payload)
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
      OperationID: id,
      SetupVisitingFacultyRatesID:
        id == Update ? FormFields?.SetupVisitingFacultyRatesID : 0,
      AcademicYearID: FormFields?.AcademicYearID,
      FacultyDepartmentID: FormFields?.FacultyDepartmentID,
      FacultyDepartmentProgramID: FormFields?.FacultyDepartmentProgramID,
      Rates: FormFields?.Rates,
      IsActive: true,
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(VISITING_FACULTY_PER_RATE_LIST, payload)
      .then((res) => {
        if (res?.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table[0]?.Message);
          getSetupViisitingFacultyRates(initialSearchFields);
        } else {
          CustomErrorMessage(res?.data?.Table[0]?.Message);
        }
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDeleteRow = (obj) => {
    console.log(obj);
  };

  const cancelSearch = () => {
    dispatch({
      type: RESET_SEARCH_FIELDS,
      payload: initialSearchFields,
    });
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const onEditRow = (obj) => {
    let data = {
      OperationID: Update,
      SetupVisitingFacultyRatesID: obj?.SetupVisitingFacultyRatesID,
      AcademicYearID: obj?.AcademicYearID,
      FacultyDepartmentID: obj?.FacultyDepartmentID,
      FacultyDepartmentProgramID: obj?.FacultyDepartmentProgramID,
      Rates: obj?.Rates,
      IsActive: true,
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 3,
      paremeterID: obj.FacultyDepartmentID,
    }).then((res) => {
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Academic Year"
          name="AcademicYearID"
          onChange={handleAddChange}
          value={FormFields?.AcademicYearID}
          list={academicYearList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="FacultyDepartmentID"
          onChange={async (e) => {
            onChange_Select_Department_Program({
              operationID: 6,
              caseID: 3,
              paremeterID: e.target.value,
            }).then((res) => {
              dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
            });
            handleAddChange(e);
          }}
          value={FormFields?.FacultyDepartmentID}
          list={SupportingTables?.Departments}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramID"
          onChange={handleAddChange}
          value={FormFields?.FacultyDepartmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={FormFields?.FacultyDepartmentID === null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Per Hour Rate"
          name="Rates"
          onChange={handleAddChange}
          isNumber="true"
          value={FormFields?.Rates}
          required
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Visiting Faculty Per Hour Rate"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onDelete={onDeleteRow}
      onEdit={onEditRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      modalSize="lg"
    />
  );
};

export default VisitingFacultyPerHourRate;
