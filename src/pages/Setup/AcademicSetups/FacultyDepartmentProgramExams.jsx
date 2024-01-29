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
import { formatDateFunction1 } from "../../../functions/DateFormatFunction";
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
import { SETUP_FAC_DEPT_PROG_EX } from "../../../utils/UrlConstants";

const initialSearchFields = {
  OperationId: Search,
  AcademicYearID: 0,
  FacultyDepartmentProgramExamsID: 0,
  CampusID: 1284,
  CampusCityID: 1644,
  FacultyDepartmentID: 0,
  FacultyDepartmentProgramID: 0,
  ExamID: 0,
  Marks: 0,
  InPercentage: false,
  CommencementDate: "2023-03-06",
  IsActive: true,
};

const initialFormFields = {
  OperationId: Select,
  AcademicYearID: 0,
  FacultyDepartmentProgramExamsID: 0,
  CampusID: 1284,
  CampusCityID: 1644,
  FacultyDepartmentID: 0,
  FacultyDepartmentProgramID: 0,
  ExamID: 0,
  Marks: 0,
  InPercentage: false,
  CommencementDate: "2023-03-06",
  IsActive: true,
};

const FacultyDepartmentProgramExams = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const [campusCityList] = useSetupDetailList(campusCity, FormFields?.campusID);
  const [campusList] = useSetupDetailList(campusType);
  const [exampTypeList] = useSetupDetailList(examTypeId);
  const [academicYearList] = useSetupDetailList(academicYearId);

  const dispatch = useDispatch();

  useEffect(() => {
    getFacultyDepartmentProgramExams();
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 2,
      paremeterID: 0,
    }).then((res) =>
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res })
    );
  }, []);

  function getFacultyDepartmentProgramExams() {
    const payload = {
      ...initialFormFields,
      ...getUserIPInfo(),
    };
    PostRequest(SETUP_FAC_DEPT_PROG_EX, payload)
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
    { field: "Campus", name: "Campus" },
    { field: "CampusCity", name: "Campus City" },
    { field: "FacultyDepartyment", name: "Faculty Departyment" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "CommencementDate", name: "Commencement Date" },
    { field: "ExamName", name: "Exam Name" },
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
          disabled={!SearchFields?.FacultyDepartmentID}
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
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Exam"
          name="ExamID"
          onChange={handleSearchChange}
          value={SearchFields?.ExamID}
          list={exampTypeList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Marks"
          name="Marks"
          onChange={handleSearchChange}
          value={SearchFields?.Marks}
          required
        />
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
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramID"
          onChange={handleAddChange}
          value={FormFields?.FacultyDepartmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={!FormFields?.FacultyDepartmentID}
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
            placeholderText={dateFormatPlaceholder}
          />
        </div>
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Exam"
          name="ExamID"
          onChange={handleAddChange}
          value={FormFields?.ExamID}
          list={exampTypeList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
        />
      </Col>

      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Marks"
          name="Marks"
          onChange={handleAddChange}
          value={FormFields?.Marks}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
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
      OperationID: Search,
    };

    PostRequest(SETUP_FAC_DEPT_PROG_EX, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data,
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
      ...FormFields,
      ...getUserIPInfo(),
      OperationId: id,
    };

    PostRequest(SETUP_FAC_DEPT_PROG_EX, payload)
      .then((res) => {
        if (res?.data?.Table[0].HasError === 0) {
          SuccessAlert();
          getFacultyDepartmentProgramExams();
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
      AcademicYearID: obj?.AcademicYearID,
      FacultyDepartmentProgramExamsID: obj.FacultyDepartmentProgramExamsID,
      CampusID: obj.CampusID,
      CampusCityID: obj.CampusCityID,
      FacultyDepartmentID: obj.FacultyDepartmentID,
      FacultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
      ExamID: obj?.ExamID,
      Marks: obj?.Marks,
      IsActive: obj?.IsActive,
      CommencementDate: formatDateFunction1(obj?.CommencementDate, "-"),
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
          AcademicYearID: obj?.AcademicYearID,
          FacultyDepartmentProgramExamsID: obj.FacultyDepartmentProgramExamsID,
          CampusID: obj.CampusID,
          CampusCityID: obj.CampusCityID,
          FacultyDepartmentID: obj.FacultyDepartmentID,
          FacultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
          ExamID: obj?.ExamID,
          Marks: obj?.Marks,
          IsActive: obj?.IsActive,
          CommencementDate: formatDateFunction1(obj?.CommencementDate, "-"),
          ...getUserIPInfo(),
        };
        PostRequest(SETUP_FAC_DEPT_PROG_EX, data)
          .then((res) => {
            const { err, msg } = apiErrorChecker(res);
            if (err) {
              CustomErrorMessage(msg);
              return;
            }
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            getFacultyDepartmentProgramExams();
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
    getFacultyDepartmentProgramExams();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  return (
    <CrudFormComponent
      formName="Faculty Department Program Exams"
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

export default FacultyDepartmentProgramExams;
