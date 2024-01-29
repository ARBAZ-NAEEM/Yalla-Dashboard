import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import {
  allowancesSetupMasterId,
  campusCity,
  campusType,
  Delete,
  Insert,
  Search,
  Select,
  SessionStorage,
  Update,
} from "../../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
  RESET_SEARCH_FIELDS,
} from "../../../redux/actionType/CrudActionTypes";
import {
  Acad_SetupLecturer,
  ADM_EligibilityCriteriaDependency,
  Setup_MasterDetails_Operation,
} from "../../../utils/Config";
import { decryptData } from "../../../EncryptData";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
  DeleteWithConfirmation,
} from "../../../components/Alert";
import { onChange_Select_Department_Program } from "../../../functions/generalFunctions";

const initialSearchFields = {
  OperationID: Search,
  SetupFacultyDepartmentProgramLecturerID: 0,
  CampusID: 1284,
  CampusCityID: 1644,
  FacultyDepartmentID: 0,
  FacultyDepartmentProgramID: 0,
  EmployeeID: 0,
  IsActive: true,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};
const initialFormFields = {
  OperationID: Insert,
  SetupFacultyDepartmentProgramLecturerID: 0,
  CampusID: 1284,
  CampusCityID: 1644,
  FacultyDepartmentID: 0,
  FacultyDepartmentProgramID: 0,
  EmployeeID: 0,
  IsActive: true,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const Lecturers = () => {
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

  const [employeeList, setEmployeeList] = useState([]);

  useEffect(() => {
    getLecturers();
    onChange_ADM_EligibilityCriteriaDependency({
      operationID: 6,
      caseID: 2,
      paremeterID: 0,
    });
  }, []);

  function getLecturers() {
    const payload = {
      OperationID: Select,
      SetupFacultyDepartmentProgramLecturerID: 0,
      CampusID: 1284,
      CampusCityID: 1644,
      FacultyDepartmentID: 0,
      FacultyDepartmentProgramID: 0,
      EmployeeID: 0,
      IsActive: true,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    Acad_SetupLecturer(payload)
      .then((res) => {
        let departmentName = {
          name: "departmentName",
          value: res?.data?.Table2,
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
        setEmployeeList(res?.data?.Table1);
      })
      .catch((err) => {
        console.error(err);
      });
  }

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

  const columns = [
    { field: "Campus", name: "Campus" },
    { field: "CampusCity", name: "Campus City" },
    { field: "EmployeeName", name: "Employee Name" },
    { field: "FacultyDepartment", name: "Faculty Department" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
  ];

  const handleSearchChange = (e) => {
    if (e.target.name === "FacultyDepartmentID") {
      onChange_ADM_EligibilityCriteriaDependency({
        operationID: 6,
        caseID: 3,
        paremeterID: e.target.value,
      });
      let data = {
        name: "FacultyDepartmentID",
        value: e.target.value,
      };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
      let data1 = { name: "FacultyDepartmentProgramID", value: 0 };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    } else if (e.target.name === "FacultyDepartmentProgramID") {
      let selecteValue = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: selecteValue });
    } else {
      let data = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    }
  };

  const handleAddChange = (e) => {
    if (e.target.name === "FacultyDepartmentID") {
      onChange_ADM_EligibilityCriteriaDependency({
        operationID: 6,
        caseID: 3,
        paremeterID: e.target.value,
      });
      let data = {
        name: "FacultyDepartmentID",
        value: e.target.value,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
      let data1 = { name: "FacultyDepartmentProgramID", value: 0 };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
    } else if (e.target.name === "FacultyDepartmentProgramID") {
      let selecteValue = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: selecteValue });
    } else {
      let data = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
  };

  const searchPanel = (
    <Fragment>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Faculty Department"
          name="FacultyDepartmentID"
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
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
          required
        />
      </Col>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramID"
          list={SupportingTables?.Programs}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.FacultyDepartmentProgramID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Employee"
          name="EmployeeId"
          list={employeeList}
          fieldId="EmployeeId"
          fieldName="EmployeeName"
          value={SearchFields?.EmployeeId}
          onChange={handleSearchChange}
          //   required
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    Acad_SetupLecturer(SearchFields)
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
    FormFields.OperationID = id;

    Acad_SetupLecturer(FormFields)
      .then((res) => {
        if (res?.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table?.[0]?.Column1);
        } else {
          CustomErrorMessage(res?.data?.Table?.[0]?.Column1);
        }
        getLecturers();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    onChange_ADM_EligibilityCriteriaDependency({
      operationID: 6,
      caseID: 3,
      paremeterID: obj.FacultyDepartmentID,
    });
    console.log(obj);
    let data = {
      OperationID: Update,
      SetupFacultyDepartmentProgramLecturerID:
        obj.SetupFacultyDepartmentProgramLecturerID,
      CampusID: obj.CampusID,
      CampusCityID: obj.CampusCityID,
      FacultyDepartmentID: obj.FacultyDepartmentID,
      FacultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
      UserIP: obj.UserIP,
      CreatedBy: obj?.CreatedBy,
      ModifiedBy: decryptData(LOGINID, SessionStorage),
      EmployeeID: obj?.EmployeeID,
      IsActive: true,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          OperationID: Delete,
          SetupFacultyDepartmentProgramLecturerID:
            obj.SetupFacultyDepartmentProgramLecturerID,
          CampusID: obj.CampusID,
          CampusCityID: obj.CampusCityID,
          FacultyDepartmentID: obj.FacultyDepartmentID,
          FacultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
          UserIP: obj.UserIP,
          CreatedBy: obj?.CreatedBy,
          ModifiedBy: decryptData(LOGINID, SessionStorage),
          EmployeeID: 0,
          IsActive: true,
        };
        Acad_SetupLecturer(data)
          .then((res) => {
            if (res?.data?.Table?.[0]?.HasError === 0) {
              CustomSuccessAlert(res?.data?.Table?.[0]?.Column1);
              getLecturers();
            } else {
              CustomErrorMessage(res?.data?.Table?.[0]?.Column1);
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
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const formPanel = (
    <Fragment>
      <Col md="6" lg="6">
        <FormGroupSelect
          label="Faculty Department"
          name="FacultyDepartmentID"
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
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
          required
        />
      </Col>
      <Col md="6" lg="6">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramID"
          list={SupportingTables?.Programs}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.FacultyDepartmentProgramID}
          onChange={handleAddChange}
          // required
        />
      </Col>
      <Col md="6" lg="6">
        <FormGroupSelect
          label="Employee"
          name="EmployeeID"
          list={employeeList}
          fieldId="EmployeeId"
          fieldName="EmployeeName"
          value={FormFields?.EmployeeID}
          onChange={handleAddChange}
          //   required
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Lecturers"
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

export default Lecturers;
