import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  admissionFacultyTypeId,
  admissionTypeId,
  campusCity,
  campusType,
  company,
  Delete,
  departmentId,
  facultyDepartmentId,
  facultyDepartmentProgramId,
  facultyTypeId,
  majorsAdId,
  partYearID,
  part_year_ID,
  programs,
  programTypes,
  Search,
  Select,
  semester,
  semesterId,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert, DeleteWithConfirmation } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../EncryptData";

import {
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_ALL_CRUD_FROM_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  Acad_SetupCourse,
  Setup_ADM_CourseSMappinge,
  Setup_MasterDetails_All_Dropdowns,
} from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  CampusID: 0,
  CampusTypeID: 0,
  CampusCityID: 0,
  DepartmentID: 0,
  ProgramID: 0,
  ProgramTypeID: 0,
  FacultyTypeID: 0,
  DepartmentID: 0,
  AdmissionTypeID: 0,
  Part_Year: 0,
  SemesterID: 0,
  CourseID: 0,
  IsActive: false,
  FacultyDepartmentProgram: 0,
  MajorId: 0,
};
const initialFormFields = {
  SetupCourseMappingID: 0,
  CampusID: 0,
  CampusTypeID: 0,
  CampusCityID: 0,
  DepartmentID: 0,
  ProgramID: 0,
  ProgramTypeID: 0,
  FacultyTypeID: 0,
  DepartmentID: 0,
  AdmissionTypeID: 0,
  Part_Year: 0,
  SemesterID: 0,
  CourseID: 0,
  IsActive: false,
  FacultyDepartmentProgram: 0,
  MajorId: 0,
};

const CourseMapping = () => {
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

  const [dropdownList, setDropDownList] = useState([]);
  const [courseName, setCourseName] = useState([]);

  useEffect(() => {
    getDropDown();
    getCourseMapping();
    getCourses();
  }, []);

  const getCourseMapping = () => {
    const payload = {
      operationID: Select,
      setupCourseMappingID: 0,
      setupCourseID: 0,
      campusID: 0,
      campusTypeID: 0,
      campusCityID: 0,
      programTypeID: 0,
      programID: 0,
      facultyTypeID: 0,
      departmentID: 0,
      majorID: 0,
      facultyDepartmentProgramID: 0,
      admTypeID: 0,
      partID: 0,
      semesterID: 0,
      isActive: true,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: "string",
    };
    Setup_ADM_CourseSMappinge(payload)
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

  const getCourses = () => {
    const payload = {
      operationID: Select,
      setupCourseID: 0,
      code: "string",
      name: "string",
      crHrs: 0,
      isActive: true,
      creadtedBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: "string",
    };
    Acad_SetupCourse(payload)
      .then((res) => {
        setCourseName(res.data.Table1);
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
    { field: "Campus", name: "Campus" },
    // { field: "CampusType", name: "Campus Type" },
    { field: "CampusCity", name: "Campus City" },
    { field: "ProgramType", name: "Program Type" },
    { field: "Program", name: "Program" },
    { field: "FacultyType", name: "Faculty Type" },
    { field: "Department", name: "Department" },
    { field: "AdmType", name: "Admission Type" },
    { field: "Part", name: "Part" },
    { field: "Semester", name: "Semester" },
    { field: "Course", name: "Course Name" },
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
          list={dropdownList?.filter((x) => x.SetupMasterId == 1089)}
          label="Program"
          name="ProgramID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ProgramID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == company)}
          label="Campus"
          name="CampusID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.CampusID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == campusType)}
          label="Campus Type"
          name="CampusTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.CampusTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == campusCity &&
              x.parentid == SearchFields?.CampusTypeID
          )}
          label="Campus City"
          name="CampusCityID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.CampusCityID}
          disabled={!SearchFields?.CampusTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == programTypes &&
              x.parentid == SearchFields?.CampusCityID
          )}
          label="Program Type"
          name="ProgramTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ProgramTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>

      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionTypeId &&
              x.parentid == SearchFields?.ProgramTypeID
          )}
          label="Admission Type"
          name="AdmissionTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.AdmissionTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == majorsAdId &&
              x.parentid == SearchFields?.AdmissionTypeID
          )}
          label="Major"
          name="MajorId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.MajorId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionFacultyTypeId &&
              x.parentid == SearchFields?.MajorId
          )}
          label="Faculty Type"
          name="FacultyTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.FacultyTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == facultyDepartmentId &&
              x.parentid == SearchFields?.FacultyTypeID
          )}
          label="Department"
          name="DepartmentID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.DepartmentID}
          disabled={!SearchFields?.FacultyTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == facultyDepartmentProgramId &&
              x.parentid == SearchFields?.DepartmentID
          )}
          label="Faculty Department Program"
          name="FacultyDepartmentProgram"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.FacultyDepartmentProgram}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == partYearID)}
          label="Part/Year"
          name="Part_Year"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.Part_Year}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == semesterId)}
          label="SemesterId"
          name="SemesterID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.SemesterID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={courseName}
          label="Course Name"
          name="CourseID"
          fieldId="CourseID"
          fieldName="Course"
          value={SearchFields?.CourseID}
          onChange={handleSearchChange}
          required
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
    const payload = {
      operationID: Search,
      setupCourseMappingID: 0,
      setupCourseID: SearchFields?.CourseID,
      campusID: SearchFields?.CampusID,
      campusTypeID: SearchFields?.CampusTypeID,
      campusCityID: SearchFields?.CampusCityID,
      programTypeID: SearchFields?.ProgramTypeID,
      programID: SearchFields?.ProgramID,
      facultyTypeID: SearchFields?.FacultyTypeID,
      departmentID: SearchFields?.DepartmentID,
      admTypeID: SearchFields?.AdmissionTypeID,
      partID: SearchFields?.Part_Year,
      semesterID: SearchFields?.SemesterID,
      isActive: SearchFields?.IsActive,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: "string",
    };
    Setup_ADM_CourseSMappinge(payload)
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
      operationID: id,
      setupCourseMappingID: FormFields.SetupCourseMappingID,
      setupCourseID: FormFields?.CourseID,
      campusID: FormFields?.CampusID,
      campusTypeID: FormFields?.CampusTypeID,
      campusCityID: FormFields?.CampusCityID,
      programTypeID: FormFields?.ProgramTypeID,
      programID: FormFields?.ProgramID,
      facultyTypeID: FormFields?.FacultyTypeID,
      majorID: FormFields?.MajorId,
      facultyDepartmentProgramID: FormFields?.FacultyDepartmentProgram,
      departmentID: FormFields?.DepartmentID,
      admTypeID: FormFields?.AdmissionTypeID,
      partID: FormFields?.Part_Year,
      semesterID: FormFields?.SemesterID,
      isActive: FormFields?.IsActive,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: "string",
    };
    Setup_ADM_CourseSMappinge(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Message);
          getCourseMapping();
        } else {
          CustomErrorMessage(res.data.Table[0].Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      SetupCourseMappingID: obj.SetupCourseMappingID,
      AdmissionTypeID: obj.AdmTypeID,
      CampusCityID: obj.CampusCityID,
      CampusID: obj.CampusID,
      CampusTypeID: obj.CampusTypeID,
      DepartmentID: obj.DepartmentID,
      FacultyTypeID: obj.FacultyTypeID,
      Part_Year: obj.PartID,
      MajorId: obj.MajorID,
      FacultyDepartmentProgram: obj.FacultyDepartmentProgramID,
      ProgramID: obj.ProgramID,
      ProgramTypeID: obj.ProgramTypeID,
      SemesterID: obj.SemesterID,
      CourseID: obj.CourseID,
      IsActive: obj.IsActive,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          operationID: Delete,
          setupCourseMappingID: obj.SetupCourseMappingID,
          setupCourseID: obj.CourseID,
          campusID: obj.CampusID,
          campusTypeID: obj.CampusTypeID,
          campusCityID: obj.CampusCityID,
          programTypeID: obj.ProgramTypeID,
          programID: obj.ProgramID,
          facultyTypeID: obj.FacultyTypeID,
          majorID: obj.majorID,
          facultyDepartmentProgramID: obj.facultyDepartmentProgramID,
          departmentID: obj.DepartmentID,
          admTypeID: obj.AdmTypeID,
          partID: obj.PartID,
          semesterID: obj.SemesterID,
          isActive: obj.IsActive,
          createdBy: decryptData(LOGINID, SessionStorage),
          modifiedBy: decryptData(LOGINID, SessionStorage),
          userIP: "string",
        };
        Setup_ADM_CourseSMappinge(data)
          .then((res) => {
            if (res.data.Table[0].HasError === 0) {
              CustomSuccessAlert(res.data.Table[0].Message);
              getCourseMapping();
            } else {
              CustomErrorMessage(res.data.Table[0].Message);
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
    getCourseMapping();
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
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == 1089)}
          label="Program"
          name="ProgramID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ProgramID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == company)}
          label="Campus"
          name="CampusID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.CampusID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == campusType)}
          label="Campus Type"
          name="CampusTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.CampusTypeID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == campusCity &&
              x.parentid == FormFields?.CampusTypeID
          )}
          label="Campus City"
          name="CampusCityID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.CampusCityID}
          disabled={!FormFields?.CampusTypeID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == programTypes &&
              x.parentid == FormFields?.CampusCityID
          )}
          label="Program Type"
          name="ProgramTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ProgramTypeID}
          onChange={handleAddChange}
          required
        />
      </Col>

      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionTypeId &&
              x.parentid == FormFields?.ProgramTypeID
          )}
          label="Admission Type"
          name="AdmissionTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.AdmissionTypeID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == majorsAdId &&
              x.parentid == FormFields?.AdmissionTypeID
          )}
          label="Major"
          name="MajorId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.MajorId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionFacultyTypeId &&
              x.parentid == FormFields?.MajorId
          )}
          label="Faculty Type"
          name="FacultyTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.FacultyTypeID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == facultyDepartmentId &&
              x.parentid == FormFields?.FacultyTypeID
          )}
          label="Department"
          name="DepartmentID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.DepartmentID}
          disabled={!FormFields?.FacultyTypeID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == facultyDepartmentProgramId &&
              x.parentid == FormFields?.DepartmentID
          )}
          label="Faculty Department Program"
          name="FacultyDepartmentProgram"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.FacultyDepartmentProgram}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == partYearID)}
          label="Part/Year"
          name="Part_Year"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.Part_Year}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == semesterId)}
          label="SemesterId"
          name="SemesterID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.SemesterID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={courseName}
          label="Course Name"
          name="CourseID"
          fieldId="CourseID"
          fieldName="Course"
          value={FormFields?.CourseID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          onChange={handleAddChange}
          value={FormFields?.IsActive}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Course Mapping"
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

export default CourseMapping;
