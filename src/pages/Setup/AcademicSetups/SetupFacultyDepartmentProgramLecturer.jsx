import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  academicYearId,
  campusCity,
  campusType,
  Delete,
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
import { SETUPFACULTYDEPARTMENTPROGRAMLECTURER } from "../../../utils/UrlConstants";

const initialSearchFields = {
  OperationID: Search,
  SetupFacultyDepartmentProgramLecturerID: 0,
  CampusID: 0,
  CampusCityID: 0,
  FacultyDepartmentID: 0,
  FacultyDepartmentProgramID: 0,
  EmployeeID: 0,
  IsActive: true,
};

const initialFormFields = {
  OperationID: Select,
  SetupFacultyDepartmentProgramLecturerID: 0,
  CampusID: 0,
  CampusCityID: 0,
  FacultyDepartmentID: 0,
  FacultyDepartmentProgramID: 0,
  EmployeeID: 0,
  IsActive: true,
};

const SetupFacultyDepartmentProgramLecturer = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const [campusCityList] = useSetupDetailList(campusCity, FormFields?.campusID);
  const [campusList] = useSetupDetailList(campusType);

  const dispatch = useDispatch();

  useEffect(() => {
    getSetupFacultyDepartmentProgramLecturer();
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 2,
      paremeterID: 0,
    }).then((res) =>
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res })
    );
  }, []);

  function getSetupFacultyDepartmentProgramLecturer() {
    const payload = {
      ...initialSearchFields,
      ...getUserIPInfo(),
    };
    PostRequest(SETUPFACULTYDEPARTMENTPROGRAMLECTURER, payload)
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
    { field: "Campus", name: "Campus" },
    { field: "CampusCity", name: "Campus City" },
    { field: "FacultyDepartyment", name: "Faculty Departyment" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
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
          disabled={SearchFields?.FacultyDepartmentID == null}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Employee"
          name="EmployeeID"
          onChange={handleSearchChange}
          value={SearchFields?.EmployeeID}
          //   list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
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
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Campus"
          name="CampusID"
          onChange={handleAddChange}
          value={FormFields?.CampusID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Campus City"
          name="CampusCityID"
          onChange={handleAddChange}
          value={FormFields?.CampusCityID}
          list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>

      <Col lg="6" md="6" xs="12">
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
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramID"
          onChange={handleAddChange}
          value={FormFields?.FacultyDepartmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={FormFields?.FacultyDepartmentID == null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Employee"
          name="EmployeeID"
          onChange={handleAddChange}
          value={FormFields?.EmployeeID}
          //   list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
        />
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
      OperationID: Search,
    };

    PostRequest(SETUPFACULTYDEPARTMENTPROGRAMLECTURER, payload)
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
      OperationID: id,
    };

    PostRequest(SETUPFACULTYDEPARTMENTPROGRAMLECTURER, payload)
      .then((res) => {
        if (res?.data?.Table[0].HasError === 0) {
          SuccessAlert();
          getSetupFacultyDepartmentProgramLecturer();
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
      SetupFacultyDepartmentProgramLecturerID:
        obj.SetupFacultyDepartmentProgramLecturerID,
      CampusID: obj.CampusID,
      CampusCityID: obj.CampusCityID,
      FacultyDepartmentID: obj.FacultyDepartmentID,
      FacultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
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
          OperationID: Delete,
          SetupFacultyDepartmentProgramLecturerID:
            obj.SetupFacultyDepartmentProgramLecturerID,
          CampusID: obj.CampusID,
          CampusCityID: obj.CampusCityID,
          FacultyDepartmentID: obj.FacultyDepartmentID,
          FacultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
          IsActive: obj?.IsActive,
          ...getUserIPInfo(),
        };
        PostRequest(SETUPFACULTYDEPARTMENTPROGRAMLECTURER, data)
          .then((res) => {
            const { err, msg } = apiErrorChecker(res);
            if (err) {
              CustomErrorMessage(msg);
              return;
            }
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            getSetupFacultyDepartmentProgramLecturer();
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
    getSetupFacultyDepartmentProgramLecturer();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  return (
    <CrudFormComponent
      formName="Setup Faculty Department Program Lecturer"
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

export default SetupFacultyDepartmentProgramLecturer;
