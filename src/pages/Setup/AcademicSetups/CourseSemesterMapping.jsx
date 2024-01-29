import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Label } from "reactstrap";
import {
  academicYearId,
  campusCity,
  campusType,
  partYearID,
  Search,
  Select,
  semesterId,
  SessionStorage,
} from "../../../common/SetupMasterEnum";
import { AlreadyExistAlert, SuccessAlert } from "../../../components/Alert";
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
import { COURSE_SEMESTER_MAPPING } from "../../../utils/UrlConstants";
import MultiSelect from "react-select";
import { UserNetworkInfo } from "../../../utils/EncryptedConstants";

const CourseSemesterMapping = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const intialCourseSemesterMapping = {
    courseSemesteMappingID: 0,
    setupCourseID: 0,
    academicYearID: 0,
  };

  const [courseSemesterMapping, setCourseSemesterMapping] = useState([
    intialCourseSemesterMapping,
  ]);

  const [courseList, setCourseList] = useState([]);

  const [partList] = useSetupDetailList(partYearID);
  const [semesterList] = useSetupDetailList(semesterId);
  const [academicYearList] = useSetupDetailList(academicYearId);
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();

  const initialSearchFields = {
    operationId: Search,
    courseSemesteMappingID: 0,
    academicYearID: 0,
    campusID: 1284,
    campusCityID: 1644,
    facultyDepartmentID: 0,
    facultyDepartmentProgramID: 0,
    setupCourseID: 0,
    partID: 0,
    semesterID: 0,
    isActive: true,
    empoyeeID: decryptData("EmplId", SessionStorage),
    ...getUserIPInfo(),
    courseSemesterMapping_TBL_: courseSemesterMapping,
  };
  const initialFormFields = {
    operationId: Select,
    courseSemesteMappingID: 0,
    academicYearID: 0,
    campusID: 1284,
    campusCityID: 1644,
    facultyDepartmentID: 0,
    facultyDepartmentProgramID: 0,
    setupCourseID: 0,
    partID: 0,
    semesterID: 0,
    isActive: true,
    empoyeeID: decryptData("EmplId", SessionStorage),
    ...getUserIPInfo(),
    courseSemesterMapping_TBL_: courseSemesterMapping,
  };

  useEffect(() => {
    getCourseSemesterMap({ ...FormFields, operationId: 1 });
    // onChange_Select_Department_Program({
    //   operationID: 6,
    //   caseID: 2,
    //   paremeterID: 0,
    // }).then((res) =>
    //   dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res })
    // );
  }, []);

  function getCourseSemesterMap(data = initialFormFields) {
    const payload = {
      ...initialFormFields,
      operationId: Select,
    };
    PostRequest(COURSE_SEMESTER_MAPPING, payload)
      .then((res) => {
        setCourseList(
          res?.data?.Table1?.map((x, index) => ({
            ...x,
            label: x.Name,
            value: x.SetupCourseID,
          }))
        );
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
          value: res?.data?.Table4,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: departmentName,
        });
      })
      .catch((err) => {
        console.error(err);
      });

    // FETCHING COURSE
    // Acad_SetupCourse({
    //   operationID: "1",
    //   setupCourseID: 0,
    //   code: "",
    //   name: "",
    //   crHrs: 0,
    //   isActive: true,
    //   creadtedBy: 18025,
    //   modifiedBy: 18025,
    //   userIP: "",
    // })
    //   .then((res) => {
    //     setCourseList(
    //       res?.data?.Table?.map((x, index) => ({
    //         ...x,
    //         label: x.Name,
    //         value: x.SetupCourseID,
    //       }))
    //     );
    //   })
    //   .catch((err) => console.error(err));
  }

  const columns = [
    { field: "AcademicYear", name: "Academic Year" },
    { field: "Campus", name: "Campus" },
    { field: "CampusCity", name: "Campus City" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "CourseCode", name: "Course Code" },
    { field: "CourseName", name: "Course Name" },
    { field: "CrHrs", name: "Credit Hours" },
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
          name="academicYearID"
          onChange={handleSearchChange}
          value={SearchFields?.academicYearID}
          list={academicYearList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="facultyDepartymentID"
          onChange={async (e) => {
            onChange_Select_Department_Program({
              operationID: 5,
              caseID: 3,
              paremeterID: e.target.value,
            }).then((res) => {
              dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
            });
            handleSearchChange(e);
          }}
          value={SearchFields?.facultyDepartymentID}
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="facultyDepartmentProgramID"
          onChange={handleSearchChange}
          value={SearchFields?.facultyDepartmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={SearchFields?.facultyDepartymentID == null}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Course"
          name="setupCourseID"
          onChange={handleSearchChange}
          value={SearchFields?.setupCourseID}
          list={courseList}
          fieldName="Name"
          fieldId="SetupCourseID"
          required
          disabled={courseList.length === 0}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Part"
          name="partID"
          onChange={handleSearchChange}
          value={SearchFields?.partID}
          list={partList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Semester"
          name="semesterID"
          onChange={handleSearchChange}
          value={SearchFields?.semesterID}
          list={semesterList?.filter((x) => x.parentid == SearchFields?.partID)}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
    </Fragment>
  );

  console.log(semesterList)

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      operationId: Search,
    };

    PostRequest(COURSE_SEMESTER_MAPPING, payload)
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
      operationId: id,
      createdBy: decryptData("EmplId", SessionStorage),
      modifiedBy: decryptData("EmplId", SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
      courseSemesterMapping_TBL_: courseSemesterMapping,
      empoyeeID: decryptData("EmplId", SessionStorage),
    };
    PostRequest(COURSE_SEMESTER_MAPPING, payload)
      .then((res) => {
        if (res?.data?.Table[0]?.HasError === 0) {
          SuccessAlert();
          getCourseSemesterMap({ operationId: 1 });
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
    let data = {
      ...FormFields,
      courseSemesteMappingID: 0,
      campusID: obj.CampusID,
      campusCityID: obj.CampusCityID,
      academicYearID: obj.AcademicYearID,
      facultyDepartmentID: obj.FacultyDepartmentID,
      facultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
      partID: obj.PartID,
      semesterID: obj.SemesterID,
      isActive: true,
    };
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 3,
      paremeterID: obj.FacultyDepartmentID,
    }).then((res) => {
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
      dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
    });
    setCourseSemesterMapping([
      {
        courseSemesteMappingID: obj?.CourseSemesteMappingID,
        setupCourseID: obj.SetupCourseID,
        academicYearID: obj?.AcademicYearID,
      },
    ]);
    setSelectedOption({
      label: obj.CourseName,
      value: obj.SetupCourseID,
      SetupCourseID: obj.SetupCourseID,
    });
  };

  // const onDeleteRow = (obj) => {
  //   // DeleteWithConfirmation().then((result) => {
  //   //   if (result.isConfirmed) {
  //   //     let data = {
  //   //       ...FormFields,
  //   //       operationId: Delete,
  //   //       setupDegreeParamID: obj.SetupDegreeParamID,
  //   //       campusID: obj.CampusID,
  //   //       campusCityID: obj.CampusCityID,
  //   //       facultyDepartymentID: obj.FacultyDepartymentID,
  //   //       facultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
  //   //       degree: obj.Degree,
  //   //       creditHRS: obj.CreditHRS,
  //   //       isActive: true,
  //   //       minCGPA: obj.MinCGPA,
  //   //     };
  //   //     PostRequest(COURSE_SEMESTER_MAPPING, data)
  //   //       .then((res) => {
  //   //         dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  //   //         if (res?.data?.Table[0].HasError === 0) {
  //   //           DeleteAlert();
  //   //           getCourseSemesterMap({ operationId: 1 });
  //   //         }
  //   //       })
  //   //       .catch((err) => {
  //   //         console.error(err);
  //   //       });
  //   //   }
  //   // });
  // };

  const cancelSearch = () => {
    dispatch({
      type: RESET_SEARCH_FIELDS,
      payload: initialSearchFields,
    });
    getCourseSemesterMap({ operationId: 1 });
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
    setSelectedOption(null);
    setCourseSemesterMapping(intialCourseSemesterMapping);
  };

  const handleInputChangeSelect = (event) => {
    setSelectedOption(event);
    const mydata = event.map((item) => ({
      courseSemesteMappingID: 0,
      setupCourseID: item.SetupCourseID,
      academicYearID: FormFields?.academicYearID,
    }));
    setCourseSemesterMapping(mydata);
    // const result = event
    //   .map((obj) => JSON.stringify(obj.SetupCourseID))
    //   .join(",");
    // let data = { name: "setupCourseID", value: result };
    // dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const formPanel = (
    <Fragment>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Academic Year"
          name="academicYearID"
          onChange={async (e) => {
            let newArray = courseSemesterMapping?.map((x) => ({
              ...x,
              academicYearID: e.target.value,
            }));
            setCourseSemesterMapping(newArray);
            handleAddChange(e);
          }}
          value={FormFields?.academicYearID}
          list={academicYearList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="facultyDepartmentID"
          onChange={async (e) => {
            onChange_Select_Department_Program({
              operationID: 5,
              caseID: 3,
              paremeterID: e.target.value,
            }).then((res) => {
              dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
            });
            handleAddChange(e);
          }}
          value={FormFields?.facultyDepartmentID}
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
          // list={SupportingTables?.Departments}
          // fieldName="SetupDetailName"
          // fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="facultyDepartmentProgramID"
          onChange={handleAddChange}
          value={FormFields?.facultyDepartmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={FormFields?.facultyDepartmentID === 0}
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <Label>Course</Label>
        <MultiSelect
          closeMenuOnSelect={false}
          onChange={handleInputChangeSelect}
          isMulti={true}
          options={courseList}
          // options={courseList.filter((x) => {
          //   return (
          //     x.FacultyDepartmentProgramID ===
          //     FormFields?.facultyDepartmentProgramID
          //   );
          // })}
          value={selectedOption}
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Part"
          name="partID"
          onChange={handleAddChange}
          value={FormFields?.partID}
          list={partList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Semester"
          name="semesterID"
          onChange={handleAddChange}
          value={FormFields?.semesterID}
          list={semesterList?.filter((x) => x.parentid == FormFields?.partID)}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={FormFields?.partID === 0}
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Prospectus"
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
      modalSize="lg"
    />
  );
};

export default CourseSemesterMapping;
