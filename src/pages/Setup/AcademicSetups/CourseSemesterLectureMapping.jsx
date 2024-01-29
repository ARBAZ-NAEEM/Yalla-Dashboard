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
} from "../../../common/SetupMasterEnum";
import {
  AlreadyExistAlert,
  CustomErrorMessage,
  DeleteAlert,
  DeleteWithConfirmation,
  SuccessAlert,
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
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
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../../utils/Config";
import { COURSE_SEMESTER_LECTURE_MAPPING } from "../../../utils/UrlConstants";
import MultiSelect from "react-select";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";

const CourseSemesterLectureMapping = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const intialCourseSemesterMapping = {
    courseSemesterLecturerMappingId: 0,
    courseSemesterMappingID: 0,
    setupFacultyDepartmentProgramLecturerID: 0,
  };

  const [courseSemesterMapping, setCourseSemesterMapping] = useState([
    intialCourseSemesterMapping,
  ]);

  const initialSearchFields = {
    operationId: 1,
    employeeID: decryptData("EmplId", SessionStorage),
    academicYearId: 0,
    campusId: 1284,
    campusCityId: 1644,
    facultyDepartmentId: 0,
    facultyDepartmentProgramId: 0,
    partId: 0,
    semesterId: 0,
    courseId: 0,
    lecturerId: 0,
    courseSemesterLecturerMappingId: 0,
    userId: 0,
    ...getUserIPInfo(),
    courseSemesterLecturerMapping_TBL_: courseSemesterMapping,
  };
  const initialFormFields = {
    operationId: 1,
    employeeID: decryptData("EmplId", SessionStorage),
    academicYearId: 0,
    campusId: 1284,
    campusCityId: 1644,
    facultyDepartmentId: 0,
    facultyDepartmentProgramId: 0,
    partId: 0,
    semesterId: 0,
    courseId: 0,
    lecturerId: 0,
    courseSemesterLecturerMappingId: 0,
    userId: 0,
    ...getUserIPInfo(),
    courseSemesterLecturerMapping_TBL_: courseSemesterMapping,
  };

  const [courseList, setCourseList] = useState([]);
  const [lecturerList, setLecturerList] = useState([]);

  const [academicYearList] = useSetupDetailList(academicYearId);
  const [campusList] = useSetupDetailList(campusType);
  const [partList] = useSetupDetailList(partYearID);
  const [campusCityList] = useSetupDetailList(campusCity, FormFields?.campusId);
  const [semesterList] = useSetupDetailList(
    semesterId,
    FormFields?.partId || SearchFields?.partId
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getCourseSemesterLectureMapping(initialFormFields);
  }, []);

  function getCourseSemesterLectureMapping(payload) {
    PostRequest(COURSE_SEMESTER_LECTURE_MAPPING, payload)
      .then((res) => {
        debugger;
        if (payload?.operationId === 0) {
          setCourseList(
            res?.data?.Table?.map((x, index) => ({
              ...x,
              label: x.CourseName,
              value: x.SetupCourseId,
            }))
          );
        } else {
          dispatch({
            type: SET_INITIAL_CRUD_FORM_STATE,
            payload: {
              List: res?.data?.Table,
              FormFields: initialFormFields,
              SearchFields: initialSearchFields,
            },
          });
          let departmentName = {
            name: "departmentName",
            value: res?.data?.Table2,
          };
          dispatch({
            type: SET_INITIAL_DROPDOWN_FORM_STATE,
            payload: departmentName,
          });
          setLecturerList(res?.data?.Table1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "academicYear", name: "Academic Year" },
    { field: "facultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "semester", name: "Semester" },
    { field: "lecturerName", name: "LecturerName" },
    { field: "courseCode", name: "Course Code" },
    { field: "courseName", name: "Course Name" },
    { field: "crHrs", name: "Credit Hours" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    debugger
    if(e.target.name === "academicYearId"){
      setCourseList([])
      setSelectedOption(null)
    }
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    // if (e.target.name === "lecturerId") {
    //   const payload = {
    //     ...FormFields,
    //     operationId: 0,
    //     ...getUserIPInfo(),
    //     courseSemesterLecturerMapping_TBL_: courseSemesterMapping,
    //   };
    //   getCourseSemesterLectureMapping(payload);
    // }
  };

  const semesterChangeCall = (semester) => {
   
    const payload = {
      ...FormFields,
      operationId: 0,
      semesterId: semester,
      ...getUserIPInfo(),
      courseSemesterLecturerMapping_TBL_: courseSemesterMapping,
    };
    getCourseSemesterLectureMapping(payload);
  };

  const handleSemesterChange = (e) => {
    semesterChangeCall(e.target.value);
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleInputChangeSelect = (event) => {
    setSelectedOption(event);

    const mydata = event.map((item) => ({
      setupFacultyDepartmentProgramLecturerID: FormFields?.lecturerId,
      courseSemesterMappingID: item.SetupCourseId,
      courseSemesterLecturerMappingId: 0,
    }));
    setCourseSemesterMapping(mydata);
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Academic Year"
          name="academicYearId"
          onChange={handleSearchChange}
          value={SearchFields?.academicYearId}
          list={academicYearList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="facultyDepartmentId"
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
          value={SearchFields?.facultyDepartmentId}
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="facultyDepartmentProgramId"
          onChange={handleSearchChange}
          value={SearchFields?.facultyDepartmentProgramId}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={SearchFields?.facultyDepartmentId == null}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Part"
          name="partId"
          onChange={handleSearchChange}
          value={SearchFields?.partId}
          list={partList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Semester"
          name="semesterId"
          onChange={handleSearchChange}
          value={SearchFields?.semesterId}
          list={semesterList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          // disabled={
          //   SearchFields?.partId === 0 || SearchFields?.academicYearId === null
          // }
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      operationId: Select,
      employeeID: decryptData("EmplId", SessionStorage),
    };
    PostRequest(COURSE_SEMESTER_LECTURE_MAPPING, payload)
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
    const mydata = courseSemesterMapping.map((item) => ({
      ...item,
      setupFacultyDepartmentProgramLecturerID: FormFields?.lecturerId,
    }));
    setCourseSemesterMapping(mydata);
    const payload = {
      ...FormFields,
      operationId: Insert,
      employeeID: decryptData("EmplId", SessionStorage),
      userId: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
      courseSemesterLecturerMapping_TBL_: mydata,
    };
    PostRequest(COURSE_SEMESTER_LECTURE_MAPPING, payload)
      .then((res) => {
        if (res?.data?.Table[0]?.HasError === 0) {
          SuccessAlert();
          getCourseSemesterLectureMapping(SearchFields);
          setSelectedOption(null);
        } else {
          CustomErrorMessage(res?.data?.Table[0]?.Message);
          setSelectedOption(null);
          return;
        }
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          ...FormFields,
          campusId: obj.campusId,
          campusCityId: obj.campusCityId,
          facultyDepartmentId: obj.facultyDepartmentId,
          facultyDepartmentProgramId: obj.facultyDepartmentProgramId,
          isActive: true,
          operationId: Delete,
          academicYearId: obj.academicYearId,
          partId: obj.partId,
          semesterId: obj.semesterId,
          courseId: obj.setupCourseId,
          lecturerId: obj.setupFacultyDepartmentProgramLecturerId,
          courseSemesterLecturerMappingId: obj.courseSemesterLecturerMappingId,
          courseSemesterLecturerMapping_TBL_: courseSemesterMapping,
          employeeID: decryptData("EmplId", SessionStorage),
          userId: decryptData(LOGINID, SessionStorage),
          userIP: decryptData(UserNetworkInfo)?.IPv4,
        };
        PostRequest(COURSE_SEMESTER_LECTURE_MAPPING, data)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res?.data?.Table[0].HasError === 0) {
              DeleteAlert();
              getCourseSemesterLectureMapping(initialSearchFields);
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
      type: RESET_SEARCH_FIELDS,
      payload: initialSearchFields,
    });
    getCourseSemesterLectureMapping(initialSearchFields);
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const onEditRow = (obj) => {
    let data = {
      ...FormFields,
      campusId: obj.campusId,
      campusCityId: obj.campusCityId,
      facultyDepartmentId: obj.facultyDepartmentId,
      facultyDepartmentProgramId: obj.facultyDepartmentProgramId,
      isActive: true,
      operationId: 3,
      academicYearId: obj.academicYearId,
      partId: obj.partId,
      semesterId: obj.semesterId,
      courseId: obj.setupCourseId,
      lecturerId: obj.lecturerId,
      courseSemesterLecturerMappingId: obj.courseSemesterLecturerMappingId,
      lecturerId: obj?.setupFacultyDepartmentProgramLecturerId,
    };

    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 3,
      paremeterID: obj.facultyDepartmentId,
    }).then((res) => {
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
      dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
    });
    setCourseSemesterMapping([
      {
        ...intialCourseSemesterMapping,
        setupFacultyDepartmentProgramLecturerId:
          obj?.setupFacultyDepartmentProgramLecturerId,
        courseSemesterMappingID: 0,
        courseSemesterLecturerMappingId: obj.setupCourseId,
      },
    ]);
    setSelectedOption({
      label: obj.courseName,
      value: obj.setupCourseId,
      SetupCourseId: obj.setupCourseId,
    });
    const payload = {
      ...data,
      operationId: 0,
      ...getUserIPInfo(),
      employeeID: decryptData("EmplId", SessionStorage),
      courseSemesterLecturerMapping_TBL_: courseSemesterMapping,
    };
    getCourseSemesterLectureMapping(payload);
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Academic Year"
          name="academicYearId"
          onChange={handleAddChange}
          value={FormFields?.academicYearId}
          list={academicYearList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="facultyDepartmentId"
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
          value={FormFields?.facultyDepartmentId}
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="facultyDepartmentProgramId"
          onChange={handleAddChange}
          value={FormFields?.facultyDepartmentProgramId}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={FormFields?.facultyDepartmentId === null}
        />
      </Col>

      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Part"
          name="partId"
          onChange={handleAddChange}
          value={FormFields?.partId}
          list={partList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Semester"
          name="semesterId"
          onChange={handleSemesterChange}
          value={FormFields?.semesterId}
          list={semesterList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={
            FormFields?.partId === 0 || FormFields?.academicYearId === null
          }
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <Label>Course</Label>
        <MultiSelect
          closeMenuOnSelect={false}
          onChange={handleInputChangeSelect}
          isMulti={true}
          options={courseList}
          value={selectedOption}
          hideSelectedOptions={true}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Lecturer"
          name="lecturerId"
          onChange={handleAddChange}
          value={FormFields?.lecturerId}
          list={lecturerList}
          fieldName="LecturerName"
          fieldId="SetupFacultyDepartmentProgramLecturerID"
          required
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Course Distribution (Lecturer)"
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

export default CourseSemesterLectureMapping;
