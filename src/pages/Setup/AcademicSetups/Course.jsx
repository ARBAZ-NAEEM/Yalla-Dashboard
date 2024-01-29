import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  Delete,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
  DeleteWithConfirmation,
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import { onChange_Select_Department_Program } from "../../../functions/generalFunctions";
import {
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
  SET_MULTI_CRUD_FORM_FIELD,
} from "../../../redux/actionType/CrudActionTypes";
import { Acad_SetupCourse } from "../../../utils/Config";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";

const Course = () => {
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

  const [dropdownList, setDropDownList] = useState([]);

  const initialSearchFields = {
    OperationId: Search,
    SetupCourseID: 0,
    Code: "",
    Name: "",
    CrHrs: 0,
    ParentCourseId: null,
    FacultyDepartmentProgramId: 0,
    FacultyDepartmentID: 0,
    IsActive: true,
    perUnitHr: 0,
    totalHrs: 0,
    createdBy: decryptData(LOGINID, SessionStorage),
    modifiedBy: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
  };
  const initialFormFields = {
    OperationId: Select,
    SetupCourseID: 0,
    Code: "",
    Name: "",
    CrHrs: 0,
    ParentCourseId: null,
    FacultyDepartmentProgramId: 0,
    FacultyDepartmentID: 0,
    IsActive: true,
    perUnitHr: 0,
    totalHrs: 0,
    createdBy: decryptData(LOGINID, SessionStorage),
    modifiedBy: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  useEffect(() => {
    getCourses();
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 2,
      paremeterID: 0,
    }).then((res) =>
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res })
    );
  }, []);

  const getCourses = () => {
    Acad_SetupCourse(initialFormFields)
      .then((res) => {
        let departmentName = {
          name: "departmentName",
          value: res?.data?.Table4,
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
        const ParentTable = { name: "ParentTable", value: res?.data?.Table3 };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: ParentTable,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "FacultyDepartmentProgram", name: "Faculty Department Program" },
    { field: "Code", name: "Course Code" },
    { field: "Name", name: "Course Name" },
    { field: "CrHrs", name: "Credit Hours" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    if (e.target.name === "FacultyDepartmentID")
      dispatch({
        type: SET_MULTI_CRUD_FORM_FIELD,
        payload: {
          ...initialFormFields,
        },
      });
    if (e.target.name === "FacultyDepartmentProgramId") {
      dispatch({
        type: SET_MULTI_CRUD_FORM_FIELD,
        payload: {
          ...FormFields,
          Code: "",
          ParentCourseId: null,
        },
      });
    }
    if (e.target.name === "ParentCourseId") {
      let CourseName = SupportingTables?.ParentTable?.find(
        (x) => x?.SetupCourseID == e.target.value
      );
      dispatch({
        type: SET_MULTI_CRUD_FORM_FIELD,
        payload: { ...FormFields, Code: CourseName?.Code },
      });
    }
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Course Code"
          name="Code"
          maxLength="150"
          // required
          isAlphabetic={true}
          onChange={handleSearchChange}
          value={SearchFields?.Code}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Course Name"
          name="Name"
          maxLength="150"
          required
          isAlphabetic={true}
          onChange={(e) => {
            handleSearchChange({
              target: {
                name: e.target.name,
                value: e.target.value.toUpperCase(),
              },
            });
          }}
          value={SearchFields?.Name}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    Acad_SetupCourse(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
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
    FormFields.OperationId = id;
    const payload = {
      ...FormFields,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
      totalHrs: FormFields?.perUnitHr * FormFields.CrHrs,
      ParentCourseId:
        FormFields?.ParentCourseId === 0 ? null : FormFields?.ParentCourseId,
    };
    Acad_SetupCourse(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res?.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table[0]?.Column1);
          getCourses();
        } else {
          CustomErrorMessage(res.data.Table[0].Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let ParentId = SupportingTables?.ParentTable?.filter(
      (x) => x?.SetupCourseID == obj?.SetupCourseID
    );
    let data = {
      SetupCourseID: obj?.SetupCourseID,
      Code: obj?.Code,
      Name: obj?.Name,
      CrHrs: obj?.CrHrs,
      IsActive: obj?.isActive,
      ParentCourseId: obj?.ParentCourseId,
      FacultyDepartmentProgramId: obj?.FacultyDepartmentProgramID,
      FacultyDepartmentID: obj?.FacultyDepartmentId,
      perUnitHr: obj?.perUnitHr,
      totalHrs: obj?.totalHrs,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    console.log(obj);
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 3,
      paremeterID: obj.FacultyDepartmentId,
    }).then((res) => {
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
    });
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          OperationID: Delete,
          SetupCourseID: obj?.SetupCourseID,
          Code: obj?.Code,
          Name: obj?.Name,
          CrHrs: obj?.CrHrs,
          IsActive: obj?.isActive,
          FacultyDepartmentProgramId: obj?.FacultyDepartmentProgramID,
          ParentCourseId: obj?.ParentCourseId,
          createdBy: decryptData(LOGINID, SessionStorage),
          modifiedBy: decryptData(LOGINID, SessionStorage),
          userIP: decryptData(UserNetworkInfo)?.IPv4,
        };
        Acad_SetupCourse(data)
          .then((res) => {
            if (res.data.Table[0].HasError === 0) {
              CustomSuccessAlert(res.data.Table[0].Column1);
              getCourses();
            } else {
              CustomErrorMessage(res.data.Table[0].Message);
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
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    getCourses();
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
          onChange={handleAddChange}
          value={FormFields?.FacultyDepartmentProgramId}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={!FormFields?.FacultyDepartmentID}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Parent Course"
          name="ParentCourseId"
          onChange={handleAddChange}
          value={FormFields?.ParentCourseId}
          list={SupportingTables?.ParentTable?.filter(
            (x) =>
              x?.FacultyDepartmentProgramID ==
              FormFields?.FacultyDepartmentProgramId
          )}
          fieldName="Name"
          fieldId="SetupCourseID"
          disabled={!FormFields?.FacultyDepartmentProgramId}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Course Code"
          name="Code"
          maxLength="150"
          required
          onChange={(e) => {
            handleAddChange({
              target: {
                name: e.target.name,
                value: e.target.value.toUpperCase(),
              },
            });
          }}
          value={FormFields?.Code}
          disabled={FormFields?.ParentCourseId}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Course Name"
          name="Name"
          maxLength="150"
          required
          onChange={handleAddChange}
          value={FormFields?.Name}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Credit Hrs"
          name="CrHrs"
          maxLength="150"
          required
          isNumber="true"
          onChange={handleAddChange}
          value={FormFields?.CrHrs}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Per Unit Hrs"
          name="perUnitHr"
          maxLength="150"
          required
          isNumber="true"
          onChange={handleAddChange}
          value={FormFields?.perUnitHr}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Total Hrs"
          name="totalHrs"
          maxLength="150"
          required
          isNumber="true"
          // onChange={handleAddChange}
          value={FormFields?.perUnitHr * FormFields?.CrHrs || 0}
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Course"
      buttonName="Add"
      modalSize="lg"
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

export default Course;
