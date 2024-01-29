import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  Delete,
  Search,
  Select,
  SessionStorage
} from "../../../common/SetupMasterEnum";
import {
  AlreadyExistAlert,
  DeleteAlert,
  SuccessAlert
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import {
  getUserIPInfo,
  onChange_Select_Department_Program
} from "../../../functions/generalFunctions";
import { RESET_FORM_FIELDS } from "../../../redux/actionType/AuthType";
import {
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../../utils/Config";
import { SETUP_FAC_DEP_PRO_LEC_COU_SCO_CRI } from "../../../utils/UrlConstants";

const initialSearchFields = {
  OperationId: Search,
  SetupFacDeptProgLectCourseScoreCriteriaID: 0,
  CourseSemesterFacDeptProgLectMappingID: 0,
  ExamID: 0,
  MarksCriteria: 0,
  IsActive: true,
  ...getUserIPInfo()
};
const initialFormFields = {
  OperationId: 0,
  SetupFacDeptProgLectCourseScoreCriteriaID: 0,
  CourseSemesterFacDeptProgLectMappingID: 0,
  ExamID: 0,
  MarksCriteria: 0,
  IsActive: true,
  ...getUserIPInfo()
};

const FactoryDeptProgLectCourseScoreCriteria = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    
  }, []);

  function getFactoryDeptProgLectCourseScoreCriteria() {
    const payload = {
      ...FormFields,
      operationId: Select,
      createdBy: decryptData("EmplId", SessionStorage),
      modifiedBy: decryptData("EmplId", SessionStorage),
      userIP: "192.168.1.104"
    };

    PostRequest(SETUP_FAC_DEP_PRO_LEC_COU_SCO_CRI, payload)
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

    PostRequest(SETUP_FAC_DEP_PRO_LEC_COU_SCO_CRI, payload)
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

    PostRequest(SETUP_FAC_DEP_PRO_LEC_COU_SCO_CRI, payload)
      .then((res) => {
        if (res?.data?.Table[0]?.HasError === 0) {
          SuccessAlert();
          getFactoryDeptProgLectCourseScoreCriteria();
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
    // PostRequest(SETUP_FAC_DEP_PRO_LEC_COU_SCO_CRI, data)
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
    getFactoryDeptProgLectCourseScoreCriteria();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="12" md="12" xs="12">
        <FormGroupSelect
          label="Course Semester Faculty Department Program Lecture"
          name="courseSemesterFacDeptProgLectMappingID"
          onChange={async (e) => {
            onChange_Select_Department_Program({
              operationID: 6,
              caseID: 3,
              paremeterID: e.target.value
            }).then((res) => {
              dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
            });
            handleAddChange(e);
          }}
          value={FormFields?.courseSemesterFacDeptProgLectMappingID}
          list={SupportingTables?.Departments}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
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
      formName="Factory Department Program Lecture Course Score Criteria"
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
    />
  );
};

export default FactoryDeptProgLectCourseScoreCriteria;
