import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  Search,
  seatTypeId,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";

import {
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import {
  ADM_EligibilityCriteriaDependency,
  Setup_MasterDetails_All_Dropdowns,
  Setup_Setup_ADM_SeatType,
} from "../../utils/Config";

import { decryptData } from "../../EncryptData";
import { LOGINID, UserNetworkInfo } from "../../utils/EncryptedConstants";

const SeatType = () => {
  const initialSearchFields = {
    OperationID: Select,
    SetupSeatID: 0,
    AcademicYearId: 0,
    CampusID: 1284,
    CampusCityId: 1644,
    ProgramID: 3479,
    ProgramTypeID: 3482,
    AdmissionTypeId: 3486,
    FacultyDepartmentProgramId: 0,
    SeatTypeID: 0,
    QoutaID: 0,
    Seats: 0,
    IsActive: true,
    CreatedBy: decryptData(LOGINID, SessionStorage),
    ModifiedBy: 0,
    UserIP: decryptData(UserNetworkInfo).IPv4,
  };
  const initialFormFields = {
    SetupSeatID: 0,
    AcademicYearId: 0,
    CampusID: 1284,
    CampusCityId: 1644,
    ProgramID: 3479,
    ProgramTypeID: 3482,
    AdmissionTypeId: 3486,
    FacultyDepartmentProgramId: 0,
    SeatTypeID: 0,
    QoutaID: 0,
    Seats: 0,
    IsActive: true,
  };
  const {
    SearchFields,
    FormFields,
    SupportingTables,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const [dropdownList, setDropDownList] = useState([]);

  useEffect(() => {
    getDropDown();
    getSeatType();
    onChange_ADM_EligibilityCriteriaDependency({
      operationID: 6,
      caseID: 2,
      paremeterID: 0,
    });
  }, []);

  const getSeatType = () => {
    Setup_Setup_ADM_SeatType(initialSearchFields)
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

  function getDropDown() {
    const payload = {
      operationId: Select,
    };

    Setup_MasterDetails_All_Dropdowns(payload)
      .then((res) => {
        setDropDownList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "ADMISSIONDEPARTMENT", name: "Admission Type" },
    { field: "PROGRAMS", name: "Program" },
    { field: "PROGRAMTYPE", name: "Program Type" },
    { field: "Faculty", name: "Faculty" },
    { field: "DEPARTMENT", name: "Department Program" },
    { field: "QOUTA", name: "Quota" },
    { field: "SEATTYPE", name: "Seat Type" },
    { field: "Seats", name: "No of Seats" },
  ];

  const handleSearchChange = (e) => {
    if (e.target.name === "SeatTypeID") {
      if (e.target.value === 3476) {
        let resetQuotaId = { name: "QuotaID", value: 0 };
        dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: resetQuotaId });
        let data = { name: e.target.name, value: e.target.value };
        dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
      } else {
        let data = { name: e.target.name, value: e.target.value };
        dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
      }
    } else if (e.target.name === "AdmissionFacultyDepartmentId") {
      onChange_ADM_EligibilityCriteriaDependency({
        operationID: 6,
        caseID: 3,
        paremeterID: e.target.value,
      });
      let data = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
      let data2 = { name: "FacultyDepartmentProgramId", value: 0 };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data2 });
    } else {
      let data = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    }
  };

  const onChange_ADM_EligibilityCriteriaDependency = (payload) => {
    if (payload.paremeterID != undefined) {
      ADM_EligibilityCriteriaDependency(payload)
        .then((res) => {
          if (payload.caseID === 2) {
            const data = { name: "Departments", value: res?.data?.Table };
            dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
          } else if (payload.caseID === 3) {
            const data = { name: "Programs", value: res?.data?.Table };
            dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == 1136)}
          label="Academic Year"
          name="AcademicYearId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.AcademicYearId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Faculty Department"
          name="AdmissionFacultyDepartmentId"
          list={SupportingTables?.Departments}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.AdmissionFacultyDepartmentId}
          onChange={handleSearchChange}
          required
          // disabled={SearchFields?.MajorId == 0 ? true : false}
        />
      </Col>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramId"
          list={SupportingTables?.Programs}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.FacultyDepartmentProgramId}
          onChange={handleSearchChange}
          required
          disabled={
            SearchFields?.AdmissionFacultyDepartmentId == 0 ? true : false
          }
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == seatTypeId)}
          label="Seat Type"
          name="SeatTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.SeatTypeID}
          onChange={handleSearchChange}
          required
          disabled={
            SearchFields?.FacultyDepartmentProgramId == 0 ? true : false
          }
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == 1101)}
          label="Quota"
          name="QuotaID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.QuotaID}
          onChange={handleSearchChange}
          disabled={
            SearchFields?.SeatTypeID === 3476
              ? true
              : SearchFields?.SeatTypeID == 0
              ? true
              : false
          }
          required
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      OperationID: Search,
      SetupSeatID: SearchFields?.SetupSeatID,
      AcademicYearId: SearchFields?.AcademicYearId,
      CampusID: SearchFields?.CampusID,
      CampusCityId: SearchFields?.CampusCityId,
      ProgramID: SearchFields?.ProgramID,
      ProgramTypeID: SearchFields?.ProgramTypeID,
      AdmissionTypeId: SearchFields?.AdmissionTypeId,
      FacultyDepartmentProgramId: SearchFields?.FacultyDepartmentProgramId,
      SeatTypeID: SearchFields?.SeatTypeID,
      QoutaID: SearchFields?.QoutaID,
      Seats: SearchFields?.Seats,
      IsActive: true,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: 0,
      UserIP: decryptData(UserNetworkInfo).IPv4,
    };

    Setup_Setup_ADM_SeatType(payload)
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
      OperationID: id,
      SetupSeatID: FormFields?.SetupSeatID,
      AcademicYearId: FormFields?.AcademicYearId,
      CampusID: FormFields?.CampusID,
      CampusCityId: FormFields?.CampusCityId,
      ProgramID: FormFields?.ProgramID,
      ProgramTypeID: FormFields?.ProgramTypeID,
      AdmissionTypeId: FormFields?.AdmissionTypeId,
      AdmissionFacultyDepartmentId: FormFields?.AdmissionFacultyDepartmentId,
      FacultyDepartmentProgramId: FormFields?.FacultyDepartmentProgramId,
      SeatTypeID: FormFields?.SeatTypeID,
      QoutaID: FormFields?.QoutaID,
      Seats: FormFields?.Seats,
      IsActive: true,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: 0,
      UserIP: decryptData(UserNetworkInfo).IPv4,
    };
    Setup_Setup_ADM_SeatType(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Message);
          getSeatType();
        } else {
          CustomErrorMessage(res.data.Table[0].Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    onChange_ADM_EligibilityCriteriaDependency({
      operationID: 6,
      caseID: 3,
      paremeterID: obj?.AdmissionFacultyDepartmentId,
    });
    let data = {
      SetupSeatID: obj?.SetupSeatID,
      AcademicYearId: obj?.AcademicYearId,
      CampusID: obj?.CampusID,
      CampusCityId: obj?.CampusCityID,
      ProgramID: obj?.ProgramID,
      ProgramTypeID: obj?.ProgramTypeID,
      AdmissionTypeId: obj?.AdmissionTypeId,
      AdmissionFacultyDepartmentId: obj?.AdmissionFacultyDepartmentId,
      FacultyDepartmentProgramId: obj?.FacultyDepartmentProgramID,
      SeatTypeID: obj?.SeatTypeID,
      QoutaID: obj?.QoutaID,
      Seats: obj?.Seats,
    };
    
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  // const onDeleteRow = (obj) => {

  // };

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    getSeatType();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const handleAddChange = (e) => {
    if (e.target.name === "SeatTypeID") {
      if (e.target.value === 3476) {
        let resetQuotaId = { name: "QuotaID", value: 0 };
        dispatch({ type: SET_CRUD_FROM_FIELDS, payload: resetQuotaId });
        let data = { name: e.target.name, value: e.target.value };
        dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
      } else {
        let data = { name: e.target.name, value: e.target.value };
        dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
      }
    } else if (e.target.name === "AdmissionFacultyDepartmentId") {
      onChange_ADM_EligibilityCriteriaDependency({
        operationID: 6,
        caseID: 3,
        paremeterID: e.target.value,
      });
      let data = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
      let data2 = { name: "FacultyDepartmentProgramId", value: 0 };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data2 });
    } else {
      let data = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == 1136)}
          label="Academic Year"
          name="AcademicYearId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.AcademicYearId}
          onChange={handleAddChange}
          required
        />
      </Col>

      <Col md="6" lg="6">
        <FormGroupSelect
          label="Faculty Department"
          name="AdmissionFacultyDepartmentId"
          list={SupportingTables?.Departments}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.AdmissionFacultyDepartmentId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col md="6" lg="6">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramId"
          list={SupportingTables?.Programs}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.FacultyDepartmentProgramId}
          onChange={handleAddChange}
          required
          disabled={
            FormFields?.AdmissionFacultyDepartmentId == 0 ? true : false
          }
        />
      </Col>

      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == 1088)}
          label="Seat Type"
          name="SeatTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.SeatTypeID}
          onChange={handleAddChange}
          required
          disabled={FormFields?.FacultyDepartmentProgramId == 0 ? true : false}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == 1101)}
          label="Quota"
          name="QoutaID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.QoutaID}
          onChange={handleAddChange}
          disabled={
            FormFields?.SeatTypeID === 3476
              ? true
              : FormFields?.SeatTypeID == 0
              ? true
              : false
          }
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Number of Seats"
          name="Seats"
          maxLength="150"
          required
          isNumber="true"
          onChange={handleAddChange}
          value={FormFields?.Seats}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Seat Type"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      // onDelete={onDeleteRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
    />
  );
};

export default SeatType;
