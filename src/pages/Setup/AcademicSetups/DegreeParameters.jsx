import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  campusCity,
  campusType,
  citySetupId,
  Delete,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";
import {
  AlreadyExistAlert,
  DeleteAlert,
  DeleteWithConfirmation,
  SuccessAlert,
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import { onChange_Select_Department_Program } from "../../../functions/generalFunctions";
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
import {
  PostRequest,
  Setup_MasterDetails_Operation,
} from "../../../utils/Config";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import { SETUP_DEGREE_PARAMETER } from "../../../utils/UrlConstants";

const initialSearchFields = {
  operationId: 1,
  setupDegreeParamID: null,
  campusID: null,
  campusCityID: null,
  facultyDepartymentID: null,
  facultyDepartmentProgramID: null,
  degree: "",
  creditHRS: null,
  isActive: true,
  createdBy: decryptData(LOGINID, SessionStorage),
  modifiedBy: decryptData(LOGINID, SessionStorage),
  userIP: decryptData(UserNetworkInfo)?.IPv4,
  minCGPA: null,
};
const initialFormFields = {
  operationId: 2,
  setupDegreeParamID: null,
  campusID: null,
  campusCityID: null,
  facultyDepartymentID: null,
  facultyDepartmentProgramID: null,
  degree: "",
  creditHRS: null,
  isActive: true,
  minCGPA: null,
  createdBy: decryptData(LOGINID, SessionStorage),
  modifiedBy: decryptData(LOGINID, SessionStorage),
  userIP: decryptData(UserNetworkInfo)?.IPv4,
};

const DegreeParameters = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const [campusCityList] = useSetupDetailList(campusCity, FormFields?.campusID);
  const [campusList] = useSetupDetailList(campusType);

  const dispatch = useDispatch();

  useEffect(() => {
    getRoles();
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 2,
      paremeterID: 0,
    }).then((res) =>
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res })
    );
  }, []);

  function getRoles() {
    const payload = {
      ...FormFields,
      operationId: Select,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };

    PostRequest(SETUP_DEGREE_PARAMETER, payload)
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
    { field: "FacultyDepartyment", name: "Faculty Department" },
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "Degree", name: "Degree" },
    { field: "CreditHRS", name: "CreditHRS" },
    { field: "MinCGPA", name: "CGPA" },
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
          name="campusID"
          onChange={handleSearchChange}
          value={SearchFields?.campusID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Campus City"
          name="campusCityID"
          onChange={handleSearchChange}
          value={SearchFields?.campusCityID}
          list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={SearchFields?.campusID === null}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="facultyDepartymentID"
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
          value={SearchFields?.facultyDepartymentID}
          list={SupportingTables?.Departments}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
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
        <FormGroupInput
          label="Credit Hours"
          name="creditHRS"
          type={"number"}
          onChange={handleSearchChange}
          value={SearchFields?.creditHRS}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Degree"
          type={"text"}
          name="degree"
          onChange={handleSearchChange}
          value={SearchFields?.degree}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="CGPA"
          type={"number"}
          name="minCGPA"
          onChange={handleSearchChange}
          value={SearchFields?.minCGPA}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
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
      operationId: Select,
    };

    PostRequest(SETUP_DEGREE_PARAMETER, payload)
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
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };

    PostRequest(SETUP_DEGREE_PARAMETER, payload)
      .then((res) => {
        if (res?.data?.Table[0]?.HasError === 0) {
          SuccessAlert();
          getRoles();
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
      setupDegreeParamID: obj.SetupDegreeParamID,
      campusID: obj.CampusID,
      campusCityID: obj.CampusCityID,
      facultyDepartymentID: obj.FacultyDepartymentID,
      facultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
      degree: obj.Degree,
      creditHRS: obj.CreditHRS,
      isActive: true,
      minCGPA: obj.MinCGPA,
    };
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 3,
      paremeterID: obj.FacultyDepartymentID,
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
          operationID: Delete,
          setupDegreeParamID: obj.SetupDegreeParamID,
          campusID: obj.CampusID,
          campusCityID: obj.CampusCityID,
          facultyDepartymentID: obj.FacultyDepartymentID,
          facultyDepartmentProgramID: obj.FacultyDepartmentProgramID,
          degree: obj.Degree,
          creditHRS: obj.CreditHRS,
          isActive: true,
          minCGPA: obj.MinCGPA,
        };
        PostRequest(SETUP_DEGREE_PARAMETER, data)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res?.data?.Table[0].HasError === 0) {
              DeleteAlert();
              getRoles();
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
    getRoles();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Campus"
          name="campusID"
          onChange={handleAddChange}
          value={FormFields?.campusID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Campus City"
          name="campusCityID"
          onChange={handleAddChange}
          value={FormFields?.campusCityID}
          list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={FormFields?.campusID === null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="facultyDepartymentID"
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
          value={FormFields?.facultyDepartymentID}
          list={SupportingTables?.Departments}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="facultyDepartmentProgramID"
          onChange={handleAddChange}
          value={FormFields?.facultyDepartmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={FormFields?.facultyDepartymentID == null}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Credit Hours"
          name="creditHRS"
          type={"number"}
          onChange={handleAddChange}
          value={FormFields?.creditHRS}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Degree"
          type={"text"}
          name="degree"
          onChange={handleAddChange}
          value={FormFields?.degree}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="CGPA"
          type={"number"}
          name="minCGPA"
          onChange={handleAddChange}
          value={FormFields?.minCGPA}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="isActive"
          onChange={handleAddChange}
          value={FormFields?.isActive}
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Degree Parameters"
      buttonName="Add"
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

export default DegreeParameters;
