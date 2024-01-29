import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col } from "reactstrap";
import {
  Search,
  Select,
  SessionStorage
} from "../../../common/SetupMasterEnum";
import { AlreadyExistAlert, SuccessAlert } from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import { onChange_Select_Department_Program } from "../../../functions/generalFunctions";
import {
  RESET_FORM_FIELDS,
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../../utils/Config";
import { FACULTY_DEPARTMENT_PROGRAM_COURSE_MAPP } from "../../../utils/UrlConstants";

const initialFormFields = {
  operationId: Select,
  facultyDepartmentProgramCourseMappingID: 0,
  academicYearID: 0,
  setupCourseID: 0,
  campusID: 0,
  campusTypeID: 0,
  campusCityID: 0,
  programTypeID: 0,
  admTypeID: 0,
  programID: 0,
  facultyTypeID: 0,
  departmentID: 0,
  facultyDepartmentProgramID: 0,
  partID: 0,
  semesterID: 0,
  createdBy: 0,
  modifiedBy: 0,
  isActive: true,
  userIP: "string"
};

const initialSearchFields = {
  operationId: Search,
  facultyDepartmentProgramCourseMappingID: 0,
  academicYearID: 0,
  setupCourseID: 0,
  campusID: 0,
  campusTypeID: 0,
  campusCityID: 0,
  programTypeID: 0,
  admTypeID: 0,
  programID: 0,
  facultyTypeID: 0,
  departmentID: 0,
  facultyDepartmentProgramID: 0,
  partID: 0,
  semesterID: 0,
  createdBy: 0,
  modifiedBy: 0,
  isActive: true,
  userIP: "string"
};

const FacultyDepartmentProgramCourseMapping = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: initialFormFields });
    getFacultyDepartmentProgramCourse();
  }, []);

  function getFacultyDepartmentProgramCourse() {
    const payload = {
      ...FormFields,
      operationId: Select,
      createdBy: decryptData("EmplId", SessionStorage),
      modifiedBy: decryptData("EmplId", SessionStorage),
      userIP: "192.168.1.104"
    };

    PostRequest(FACULTY_DEPARTMENT_PROGRAM_COURSE_MAPP, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "Campus", name: "Campus" },
    { field: "CampusCity", name: "Campus City" },
    { field: "FacultyDepartyment", name: "Faculty Department" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "Degree", name: "Degree" },
    { field: "CreditHRS", name: "CreditHRS" },
    { field: "MinCGPA", name: "CGPA" }
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
          label="Exam"
          name="examID"
          onChange={handleSearchChange}
          value={SearchFields?.examID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          // disabled={SearchFields?.facultyDepartymentID == null}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Marks Criteria"
          name="marksCriteria"
          type={"number"}
          onChange={handleSearchChange}
          value={SearchFields?.marksCriteria}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="isActive"
          onChange={handleSearchChange}
          value={SearchFields?.isActive}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      operationId: Select
    };

    PostRequest(FACULTY_DEPARTMENT_PROGRAM_COURSE_MAPP, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: SearchFields
          }
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = (id) => {
    const payload = {
      ...FormFields,
      operationId: id,
      createdBy: decryptData("EmplId", SessionStorage),
      modifiedBy: decryptData("EmplId", SessionStorage),
      userIP: "192.168.1.104"
    };

    PostRequest(FACULTY_DEPARTMENT_PROGRAM_COURSE_MAPP, payload)
      .then((res) => {
        if (res?.data?.Table[0]?.HasError === 0) {
          SuccessAlert();
          getFacultyDepartmentProgramCourse();
        } else {
          AlreadyExistAlert();
          return;
        }
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    // let data = {
    //   ...FormFields,
    //   setupDegreeParamID: obj.SetupDegreeParamID,
    //   campusID: obj.CampusID,
    //   campusCityID: obj.CampusCityID,
    //   facultyDepartymentID: obj.FacultyDepartymentID,
    //   facultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
    //   degree: obj.Degree,
    //   creditHRS: obj.CreditHRS,
    //   isActive: true,
    //   minCGPA: obj.MinCGPA
    // };
    // onChange_Select_Department_Program({
    //   operationID: 6,
    //   caseID: 3,
    //   paremeterID: obj.FacultyDepartymentID
    // }).then((res) => {
    //   dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
    //   dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
    // });
  };

  const onDeleteRow = (obj) => {
    // let data = {
    //   ...FormFields,
    //   operationID: Delete,
    //   setupDegreeParamID: obj.SetupDegreeParamID,
    //   campusID: obj.CampusID,
    //   campusCityID: obj.CampusCityID,
    //   facultyDepartymentID: obj.FacultyDepartymentID,
    //   facultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
    //   degree: obj.Degree,
    //   creditHRS: obj.CreditHRS,
    //   isActive: true,
    //   minCGPA: obj.MinCGPA
    // };
    // PostRequest(FACULTY_DEPARTMENT_PROGRAM_COURSE_MAPP, data)
    //   .then((res) => {
    //     dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    //     if (res?.data?.Table[0].HasError === 0) {
    //       DeleteAlert();
    //       getFactoryDeptProgLectCourseScoreCriteria();
    //     }
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
  };

  const cancelSearch = () => {
    dispatch({
      type: RESET_SEARCH_FIELDS,
      payload: initialSearchFields
    });
    getFacultyDepartmentProgramCourse();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Academic Year"
          name="academicYearID"
          onChange={handleAddChange}
          value={FormFields?.academicYearID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          // disabled={FormFields?.facultyDepartymentID == null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Course"
          name="setupCourseID"
          onChange={handleAddChange}
          value={FormFields?.setupCourseID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          // disabled={FormFields?.facultyDepartymentID == null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Exam"
          name="examID"
          onChange={handleAddChange}
          value={FormFields?.examID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          // disabled={FormFields?.facultyDepartymentID == null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Marks Criteria"
          name="marksCriteria"
          type={"number"}
          onChange={handleAddChange}
          value={FormFields?.marksCriteria}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="isActive"
          onChange={handleAddChange}
          value={FormFields?.isActive}
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Factory Department Program Course Mapping"
      buttonName="Add"
      // hideAction={false}
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
      modalSize="lg"
    />
  );
};

export default FacultyDepartmentProgramCourseMapping;
