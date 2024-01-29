import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input } from "reactstrap";
import { dateFormatPlaceholder } from "../../../common/dateFormatEnum";
import {
  academicYearId,
  campusCity,
  campusType,
  Delete,
  examTypeId,
  Insert,
  Search,
  Select,
  SessionStorage,
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
  apiErrorChecker,
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
import { PostRequest, Setup_Setup_ADM_Course } from "../../../utils/Config";
import { UserNetworkInfo } from "../../../utils/EncryptedConstants";
import {
  FACULTY_DEPARTMENT_PROGRAM_EXAMS_SCHEDULE_MAPPING,
  SETUP_FAC_DEPT_PROG_EX,
} from "../../../utils/UrlConstants";

const initialSearchFields = {
  OperationId: Search,
  FacultyDepartmentProgramExamsScheduleMappingID: 0,
  FacultyDepartmentProgramExamsID: 0,
  AcademicYearID: 0,
  CommencementDate: "string",
  IsActive: true,
};

const initialFormFields = {
  OperationId: Select,
  FacultyDepartmentProgramExamsScheduleMappingID: 0,
  FacultyDepartmentProgramExamsID: 0,
  AcademicYearID: 0,
  CommencementDate: "string",
  IsActive: true,
};

const initialFacultyDepartmentProgramExamsScheduleMapping = {
  OperationId: Select,
  FacultyDepartmentProgramExamsID: 0,
  CampusID: 0,
  CampusCityID: 0,
  FacultyDepartmentID: 0,
  FacultyDepartmentProgramID: 0,
  ExamID: 0,
  Marks: 0,
  InPercentage: false,
  IsActive: false,
};

const FacultyDepartmentProgramExamsScheduleMapping = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const [academicYearList] = useSetupDetailList(academicYearId);

  const dispatch = useDispatch();

  useEffect(() => {
    getFacultyDepartmentProgramExamsScheduleMapping();
    // getFacultyDepartmentProgramExams();
  }, []);

  function getFacultyDepartmentProgramExamsScheduleMapping() {
    const payload = {
      ...initialFormFields,
      ...getUserIPInfo(),
    };
    PostRequest(FACULTY_DEPARTMENT_PROGRAM_EXAMS_SCHEDULE_MAPPING, payload)
      .then((res) => {
        const data = {
          name: "FacultyDepartmentProgramExams",
          value: res.data?.Table,
        };
        dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table1,
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
    { field: "Campus", name: "Campus" },
    { field: "CampusCity", name: "Campus City" },
    { field: "FacultyDepartyment", name: "Faculty Departyment" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "CommencementDate", name: "Commencement Date" },
    { field: "Marks", name: "Marks" },
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
          label="Faculty Department Program Exam"
          name="FacultyDepartmentProgramExamsID"
          onChange={handleSearchChange}
          value={SearchFields?.FacultyDepartmentProgramExamsID}
          list={SupportingTables?.FacultyDepartmentProgramExams}
          fieldName="DepartProg"
          fieldId="FacultyDepartmentProgramID"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <div className="form-group">
          <label className="form-label">
            Commencement Date<span className="text-danger">*</span>
          </label>
          <Input
            type="date"
            className="form-control"
            name="CommencementDate"
            value={SearchFields?.CommencementDate}
            onChange={handleSearchChange}
            // onChange={(e) => AllDateSet(e, "DateOfBirth")}
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="1" md="1" xs="12">
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
      <Col lg="4" md="4" xs="12">
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
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Faculty Department Program Exam"
          name="FacultyDepartmentProgramExamsID"
          onChange={handleAddChange}
          value={FormFields?.FacultyDepartmentProgramExamsID}
          list={SupportingTables?.FacultyDepartmentProgramExams}
          fieldName="DepartProg"
          fieldId="FacultyDepartmentProgramID"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <div className="form-group">
          <label className="form-label">
            Commencement Date<span className="text-danger">*</span>
          </label>
          <Input
            type="date"
            className="form-control"
            name="CommencementDate"
            value={FormFields?.CommencementDate}
            onChange={handleAddChange}
            // onChange={(e) => AllDateSet(e, "DateOfBirth")}
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="1" md="1" xs="12">
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
      OperationId: Search,
    };

    PostRequest(FACULTY_DEPARTMENT_PROGRAM_EXAMS_SCHEDULE_MAPPING, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table1,
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
      ...getUserIPInfo(),
      OperationId: id,
    };

    PostRequest(FACULTY_DEPARTMENT_PROGRAM_EXAMS_SCHEDULE_MAPPING, payload)
      .then((res) => {
        if (res?.data?.Table[0].HasError === 0) {
          SuccessAlert();
          getFacultyDepartmentProgramExamsScheduleMapping();
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
      FacultyDepartmentProgramExamsScheduleMappingID: 0,
      FacultyDepartmentProgramExamsID: 0,
      AcademicYearID: obj?.AcademicYearID,
      CommencementDate: obj?.CommencementDate,
      IsActive: obj?.IsActive,
    };
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 3,
      paremeterID: obj.FacultyDepartmentID,
    }).then((res) => {
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
      dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
    });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          ...FormFields,
          OperationId: Delete,
          FacultyDepartmentProgramExamsID: obj.FacultyDepartmentProgramExamsID,
          CampusID: obj.CampusID,
          CampusCityID: obj.CampusCityID,
          FacultyDepartmentID: obj.FacultyDepartmentID,
          FacultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
          ExamID: obj?.ExamID,
          Marks: obj?.Marks,
          IsActive: obj?.IsActive,
          ...getUserIPInfo(),
        };
        PostRequest(FACULTY_DEPARTMENT_PROGRAM_EXAMS_SCHEDULE_MAPPING, data)
          .then((res) => {
            const { err, msg } = apiErrorChecker(res);
            if (err) {
              CustomErrorMessage(msg);
              return;
            }
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            getFacultyDepartmentProgramExamsScheduleMapping();
            CustomSuccessAlert(msg);
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
    getFacultyDepartmentProgramExamsScheduleMapping();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  return (
    <CrudFormComponent
      formName="Faculty Department Program Exams Schedule"
      buttonName="Add"
      modalSize="lg"
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

export default FacultyDepartmentProgramExamsScheduleMapping;
