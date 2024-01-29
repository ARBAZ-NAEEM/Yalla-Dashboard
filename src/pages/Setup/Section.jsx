//Setup CLass Location
import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  Delete,
  Search,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert, DeleteWithConfirmation } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import { decryptData } from "../../EncryptData";

import {
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_ALL_CRUD_FROM_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import { Acad_SetupCourse } from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  CourseName: "",
};
const initialFormFields = {
  operationID: Select,
  SetupSectionID: 0,
  SectionCode: "",
  SecrtionName: "",
  FacultyDepartmentProgramID: 0,
  IsActive: false,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  CreatedDate: "",
  ModifiedBy: decryptData(LOGINID, SessionStorage),
  ModifiedDate: "",
  UserIP: "192:168:20:1",
};

const Location = () => {
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getCourses();
  }, []);

  const getCourses = () => {
    Acad_SetupCourse(initialFormFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "Code", name: "Course Code" },
    { field: "Name", name: "Course Name" },
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
        <FormGroupInput
          label="Section Code"
          name="SectionCode"
          maxLength="150"
          isNumber="true"
          required
          onChange={handleSearchChange}
          value={SearchFields?.SectionCode}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Section Name"
          name="SectionName"
          maxLength="150"
          required
          isAlphabetic="true"
          onChange={handleSearchChange}
          value={SearchFields?.SectionName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Faculty Department Program ID"
          name="FacultyDepartmentProgramID"
          maxLength="150"
          required
          isNumber="true"
          onChange={handleSearchChange}
          value={SearchFields?.FacultyDepartmentProgramID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          onChange={handleSearchChange}
          value={SearchFields?.IsActive}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      operationID: Search,
      setupCourseID: 0,
      code: "String",
      name: SearchFields?.CourseName,
      crHrs: 0,
      isActive: true,
      creadtedBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: "string",
    };
    Acad_SetupCourse(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
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
      operationID: id,
      setupCourseID: FormFields?.SetupCourseID,
      code: FormFields?.CourseCode,
      name: FormFields?.CourseName,
      crHrs: FormFields?.CreditHours,
      isActive: FormFields?.IsActive,
      creadtedBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: "string",
    };
    Acad_SetupCourse(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Message);
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
    let data = {
      SetupCourseID: obj?.SetupCourseID,
      CourseCode: obj?.Code,
      CourseName: obj?.Name,
      CreditHours: obj?.CrHrs,
      IsActive: obj?.isActive,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          operationID: Delete,
          setupCourseID: obj?.SetupCourseID,
          code: obj?.Code,
          name: obj?.Name,
          crHrs: obj?.CrHrs,
          isActive: obj?.isActive,
          creadtedBy: decryptData(LOGINID, SessionStorage),
          modifiedBy: decryptData(LOGINID, SessionStorage),
          userIP: "string",
        };
        Acad_SetupCourse(data)
          .then((res) => {
            if (res.data.Table[0].HasError === 0) {
              CustomSuccessAlert(res.data.Table[0].Message);
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
        <FormGroupInput
          label="Location Code"
          name="LocCode"
          maxLength="150"
          required
          onChange={handleAddChange}
          value={FormFields?.LocCode}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Location Name"
          name="LocName"
          maxLength="150"
          required
          isAlphabetic="true"
          onChange={handleAddChange}
          value={FormFields?.LocName}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Location Building"
          name="LocBuilding"
          maxLength="150"
          required
          isNumber="true"
          onChange={handleAddChange}
          value={FormFields?.CreditHours}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          onChange={handleAddChange}
          value={FormFields?.IsActive}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Section"
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
    />
  );
};

export default Location;
