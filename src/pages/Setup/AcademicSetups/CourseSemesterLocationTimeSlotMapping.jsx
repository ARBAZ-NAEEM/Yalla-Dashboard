import React, { Fragment } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label, Row } from "reactstrap";
import {
  academicYearId,
  campusCity,
  campusType,
  Delete,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";
import {
  AlreadyExistAlert,
  DeleteWithConfirmation,
  SuccessAlert,
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
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
import { PostRequest } from "../../../utils/Config";
import { COURSESEMESTERLOCATIONTIMESLOTMAPPING } from "../../../utils/UrlConstants";
import MultiSelect from "react-select";
import { decryptData } from "../../../EncryptData";
import { LOGINID } from "../../../utils/EncryptedConstants";

const initialSearchFields = {
  OperationId: Search,
  CourseSemesterLocationTimeSlotMappingID: null,
  AcademicYearID: null,
  CampusID: 1284,
  CampusCityID: 1644,
  CourseSemesteMappingID: null,
  SetupLocationID: null,
  SetupTimeSlotID: null,
  SetupClassTypeID: null,
  ClassDate: null,
  IsTaken: false,
  IsCompensate: false,
  IsActive: false,
  CreatedBy: 0,
  ModifiedBy: 0,
  UserIP: null,
  LecturerId: null,
  FacultyDepartmentId: null,
  FacultyDepartmentProgramId: null,
  SectionId: null,
  DayIds: null,
  DateFrom: null,
  DateTo: null,
  CourseSemesterLecturerMappingId: null,
  UserID: decryptData(LOGINID, SessionStorage),
};

const initialFormFields = {
  OperationId: Select,
  CourseSemesterLocationTimeSlotMappingID: null,
  AcademicYearID: null,
  CampusID: 1284,
  CampusCityID: 1644,
  CourseSemesteMappingID: null,
  SetupLocationID: null,
  SetupTimeSlotID: null,
  SetupClassTypeID: null,
  ClassDate: null,
  IsTaken: false,
  IsCompensate: false,
  IsActive: false,
  CreatedBy: 0,
  ModifiedBy: 0,
  UserIP: null,
  LecturerId: null,
  FacultyDepartmentId: null,
  FacultyDepartmentProgramId: null,
  SectionId: null,
  DayIds: null,
  DateFrom: null,
  DateTo: null,
  CourseSemesterLecturerMappingId: null,
  UserID: decryptData(LOGINID, SessionStorage),
};

const CourseSemesterLocationTimeSlotMapping = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const [campusCityList] = useSetupDetailList(campusCity, FormFields?.campusID);
  const [campusList] = useSetupDetailList(campusType);
  const [academicYearList] = useSetupDetailList(academicYearId);

  const [dayList, setDayList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [sectionList, setSectionList] = useState([]);
  const [lecturerList, setLecturerList] = useState([]);
  const [classTypeList, setClassTypeList] = useState([]);
  const [timeSlotList, setTimeSlotList] = useState([]);
  const [courseSemesterList, setCourseSemesterList] = useState([]);
  const [facultyDeptList, setFacultyDeptList] = useState([]);
  const [facultyDeptProgList, setFacultyDeptProgList] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const dispatch = useDispatch();

  useEffect(() => {
    // getTimeSlot();
    getCourseSemesterLocationTimeSlotMapping(1);
  }, []);

  function getCourseSemesterLocationTimeSlotMapping(opId) {
    const payload = {
      ...initialSearchFields,
      ...getUserIPInfo(),
      OperationId: opId,
      UserID: decryptData(LOGINID, SessionStorage),
    };
    PostRequest(COURSESEMESTERLOCATIONTIMESLOTMAPPING, payload)
      .then((res) => {
        let departmentName = {
          name: "departmentName",
          value: res?.data?.Table8,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: departmentName,
        });
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        setLecturerList(res?.data?.Table1);
        setClassTypeList(res?.data?.Table2);
        setTimeSlotList(res?.data?.Table3);

        setCourseSemesterList(
          res?.data?.Table4?.map((x, index) => ({
            ...x,
            label: x.CourseSemesterMappingName,
            value: x.CourseSemesteMappingID,
            CourseSemesterLecturerMappingId: x.CourseSemesterLecturerMappingId,
          }))
        );
        setSectionList(res?.data?.Table5);
        setLocationList(res?.data?.Table6);
        setDayList(
          res?.data?.Table7?.map((x) => ({ ...x, checked: x.checked || false }))
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    // { field: "campus", name: "Campus" },
    // { field: "campusCity", name: "Campus City" },
    { field: "classDate", name: "Class Date" },
    { field: "locationName", name: "Location" },
    { field: "facultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "semesterName", name: "Semester" },
    { field: "courseName", name: "Course" },
    { field: "sectionName", name: "Section" },
    { field: "employeeName", name: "Lecturer" },
    { field: "timeSlot", name: "Time Slot" },
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
          list={academicYearList}
          label="Academic Year"
          name="AcademicYearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.AcademicYearID}
          required
        />
      </Col>
      {/* <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Campus"
          name="CampusID"
          onChange={handleSearchChange}
          value={SearchFields?.CampusID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Campus City"
          name="CampusCityID"
          onChange={handleSearchChange}
          value={SearchFields?.CampusCityID}
          list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col> */}
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Course Semester Mapping"
          name="CourseSemesteMappingID"
          onChange={handleSearchChange}
          value={SearchFields?.CourseSemesteMappingID}
          list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Setup Location"
          name="SetupLocationID"
          onChange={handleSearchChange}
          value={SearchFields?.SetupLocationID}
          list={locationList}
          fieldName="SectionName"
          fieldId="SectionId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Setup Time Slot"
          name="SetupTimeSlotID"
          onChange={handleSearchChange}
          value={SearchFields?.SetupTimeSlotID}
          list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Setup Class Type"
          name="SetupClassTypeID"
          onChange={handleSearchChange}
          value={SearchFields?.SetupClassTypeID}
          list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      {/* <Col lg="1" md="1" xs="12">
        <FormGroupCheckbox
          label="Is Taken"
          name="IsTaken"
          value={SearchFields?.IsTaken}
          onChange={handleSearchChange}
        />
      </Col>
      <Col lg="1" md="1" xs="12">
        <FormGroupCheckbox
          label="Is Compensate"
          name="IsCompensate"
          value={SearchFields?.IsCompensate}
          onChange={handleSearchChange}
        />
      </Col>
      <Col lg="1" md="1" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col> */}
    </Fragment>
  );

  const handleInputChangeSelect = (event) => {
    setSelectedOption(event);
    dispatch({
      type: SET_MULTI_CRUD_FORM_FIELD,
      payload: {
        CourseSemesteMappingID: event.value,
        CourseSemesterLecturerMappingId: event.CourseSemesterLecturerMappingId,
      },
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={academicYearList}
          label="Academic Year"
          name="AcademicYearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.AcademicYearID}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="FacultyDepartmentId"
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
          value={FormFields?.FacultyDepartmentId}
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramId"
          onChange={(e) => handleAddChange(e)}
          value={FormFields?.FacultyDepartmentProgramId}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={FormFields?.FacultyDepartmentId === null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Section"
          name="SectionId"
          onChange={handleAddChange}
          value={FormFields?.SectionId}
          list={sectionList}
          // list={sectionList?.filter(
          //   (x) =>
          //     x.FacultyDepartmentProgramID ===
          //     FormFields?.FacultyDepartmentProgramId
          // )}
          fieldName="SectionName"
          fieldId="SectionId"
          required
          // disabled={FormFields?.FacultyDepartmentProgramId === null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <Label>
          Allocated Courses
          <span className="text-danger">*</span>
        </Label>
        <MultiSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelect}
          options={courseSemesterList}
          value={selectedOption}
        />
      </Col>

      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Location"
          name="SetupLocationID"
          onChange={handleAddChange}
          value={FormFields?.SetupLocationID}
          list={locationList}
          fieldName="LocationName"
          fieldId="SetupLocationID"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Opening Slots"
          name="SetupTimeSlotID"
          onChange={handleAddChange}
          value={FormFields?.SetupTimeSlotID}
          list={timeSlotList}
          fieldName="Slot"
          fieldId="SetupTimeSlotID"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Class Description"
          name="SetupClassTypeID"
          onChange={handleAddChange}
          value={FormFields?.SetupClassTypeID}
          list={classTypeList}
          fieldName="ClassType"
          fieldId="SetupClassTypeID"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          Date From
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="DateFrom"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.DateFrom}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          Date To
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="DateTo"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.DateTo}
          required
        />
      </Col>
      <Col lg="12" md="12" xs="12">
        <div>
          <Label>
            Week Days
            <span className="text-danger">*</span>
          </Label>
          <Row noGutters>
            {dayList?.map((x, i) => (
              <Col md="2">
                <Input
                  type="checkbox"
                  style={{ padding: 0 }}
                  checked={x.checked}
                  onChange={(e) => {
                    dayList[i].checked = e.target.checked;
                    setDayList([...dayList]);
                  }}
                />
                <Label>{"  " + x.DayName}</Label>
              </Col>
            ))}
          </Row>
        </div>
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      ...getUserIPInfo(),
      OperationID: Search,
      UserID: decryptData(LOGINID, SessionStorage),
    };
    getCourseSemesterLocationTimeSlotMapping(0);
  };

  const submitForm = (id) => {
    let list = [];
    dayList?.forEach((x) => {
      if (x.checked === true) {
        list.push(x.DayId);
      }
    });
    const payload = {
      ...FormFields,
      ...getUserIPInfo(),
      OperationId: id,
      DayIds: list.join(","),
      UserID: decryptData(LOGINID, SessionStorage),
    };

    PostRequest(COURSESEMESTERLOCATIONTIMESLOTMAPPING, payload)
      .then((res) => {
        if (res?.data?.Table[0].HasError === 0) {
          SuccessAlert();

          getCourseSemesterLocationTimeSlotMapping(1);
        } else {
          AlreadyExistAlert();
          return;
        }
        getCourseSemesterLocationTimeSlotMapping();
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        setSelectedOption(null);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const dataBinding = (obj) => {
    const model = {
      OperationId: 3,
      CourseSemesterLocationTimeSlotMappingID:
        obj.courseSemesterLocationTimeSlotMappingId,
      AcademicYearID: obj.academicYearId,
      CampusID: obj.campusId,
      CampusCityID: obj.campusCityID,
      CourseSemesteMappingID: obj.courseSemesteMappingId,
      SetupLocationID: obj.setupLocationId,
      SetupTimeSlotID: obj.setupTimeSlotId,
      SetupClassTypeID: obj.SetupClassTypeId,
      ClassDate: obj.classDate,
      IsTaken: obj.isTaken,
      lecturerId: obj.lecturerId,
      IsCompensate: obj.isCompensate,
      IsActive: obj.isActive,
      facultyDepartmentId: obj.facultyDepartmentID,
      SectionId: obj.SectionId,
      FacultyDepartmentProgramId: obj.FacultyDepartmentProgramId,
    };
    return model;
  };

  const onEditRow = (obj) => {
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: dataBinding(obj) });
    // dispatch({ type: SET_CRUD_FROM_FIELDS, payload: });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          ...FormFields,
          ...getUserIPInfo(),
          OperationId: Delete,
          UserID: decryptData(LOGINID, SessionStorage),
          CourseSemesterLocationTimeSlotMappingID:
            obj.courseSemesterLocationTimeSlotMappingId,
        };

        PostRequest(COURSESEMESTERLOCATIONTIMESLOTMAPPING, payload)
          .then((res) => {
            if (res?.data?.Table[0].HasError === 0) {
              SuccessAlert();
              getCourseSemesterLocationTimeSlotMapping(1);
            } else {
              AlreadyExistAlert();
              return;
            }
            getCourseSemesterLocationTimeSlotMapping();
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
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
    getCourseSemesterLocationTimeSlotMapping();
    setSelectedOption(null);
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
    setSelectedOption(null);
  };

  return (
    <CrudFormComponent
      formName="Course Semester Location Time Slot"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      // onEdit={onEditRow}
      onDelete={onDeleteRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      modalSize="lg"
    />
  );
};

export default CourseSemesterLocationTimeSlotMapping;
