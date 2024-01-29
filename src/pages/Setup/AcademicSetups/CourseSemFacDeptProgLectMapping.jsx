import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  campusCity,
  campusType,
  Delete,
  Insert,
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
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import { getUserIPInfo } from "../../../functions/generalFunctions";
import useSetupDetailList from "../../../Hooks/useSetupDetailList";
import { RESET_FORM_FIELDS } from "../../../redux/actionType/AuthType";
import {
  RESET_SEARCH_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../../utils/Config";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import {
  COURSESEMESTERFACDEPTPROGLRECTMAPPING,
  COURSE_SEMESTER_MAPPING
} from "../../../utils/UrlConstants";

const initialSearchFields = {
  OperationId: Select,
  CourseSemesterFacDeptProgLectMappingID: null,
  SetupFacultyDepartmentProgramLecturerID: null,
  CourseSemesteMappingID: null,
  IsActive: false,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4
};
const initialFormFields = {
  OperationId: Insert,
  CourseSemesterFacDeptProgLectMappingID: null,
  SetupFacultyDepartmentProgramLecturerID: null,
  CourseSemesteMappingID: null,
  IsActive: true,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4
};

const intialCourseMappingFields = {
  operationId: Select
};

const CourseSemFacDeptProgLectMapping = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const [campusCityList] = useSetupDetailList(campusCity, FormFields?.campusID);
  const [campusList] = useSetupDetailList(campusType);

  const dispatch = useDispatch();

  useEffect(() => {
    getCourseMapping();
    getCourseSemFacDeptProgLectMapping();
  }, []);

  const getCourseMapping = () => {
    PostRequest(COURSE_SEMESTER_MAPPING, { ...FormFields, operationId: Select })
      .then((res) => {
        let courses = {
          name: "CourseMapping",
          value: res?.data?.Table
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: courses
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function getCourseSemFacDeptProgLectMapping() {
    PostRequest(COURSESEMESTERFACDEPTPROGLRECTMAPPING, initialSearchFields)
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
    { field: "FacultyDepartyment", name: "Faculty Departyment" },
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
          label="CourseSemesterFacDeptProgLectMappingID"
          name="CourseSemesterFacDeptProgLectMappingID"
          onChange={handleSearchChange}
          value={SearchFields?.CourseSemesterFacDeptProgLectMappingID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="CourseSemesteMappingID"
          name="CourseSemesteMappingID"
          onChange={handleSearchChange}
          value={SearchFields?.CourseSemesteMappingID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="CourseSemesterFacDeptProgLectMappingID"
          name="CourseSemesterFacDeptProgLectMappingID"
          onChange={handleAddChange}
          value={FormFields?.CourseSemesterFacDeptProgLectMappingID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="CourseSemesteMappingID"
          name="CourseSemesteMappingID"
          onChange={handleAddChange}
          value={FormFields?.CourseSemesteMappingID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={FormFields?.IsActive}
          onChange={handleAddChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      ...getUserIPInfo(),
      OperationID: Search
    };

    PostRequest(COURSESEMESTERFACDEPTPROGLRECTMAPPING, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields
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
      ...getUserIPInfo(),
      OperationId: id
    };

    PostRequest(COURSESEMESTERFACDEPTPROGLRECTMAPPING, payload)
      .then((res) => {
        if (res?.data?.Table[0].HasError === 0) {
          SuccessAlert();
          getCourseSemFacDeptProgLectMapping();
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

  const onEditRow = (obj) => {};

  const onDeleteRow = (obj) => {};

  const cancelSearch = () => {
    dispatch({
      type: RESET_SEARCH_FIELDS,
      payload: initialSearchFields
    });
    getCourseSemFacDeptProgLectMapping();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields
    });
  };

  return (
    <CrudFormComponent
      formName="Course Semester Faculty Department Program Lecture Mapping"
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

export default CourseSemFacDeptProgLectMapping;
