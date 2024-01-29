import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  admissionFacultyTypeId,
  admissionProgramId,
  admissionTypeId,
  campusCity,
  campusType,
  examTypeID,
  facultyDepartmentId,
  majorsAdId,
  programTypes,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert, DeleteWithConfirmation } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../EncryptData";

import {
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_ALL_CRUD_FROM_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  Setup_MasterDetails_All_Dropdowns,
  Setup_SetupMarks,
} from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  SetupMarksId: 0,
  ProgramId: 0,
  AdmissionTypeId: 0,
  ExamTypeId: 0,
  CampusTypeId: 0,
  CampusCityId: 0,
  ProgramTypeId: 0,
  MajorId: 0,
  AdmissionFacultyTypeId: 0,
  FacultyDepartmentId: 0,
  TotalMarks: 0,
  PassingMarksinPercentage: 0,
  IsActive: 1,
  IsDeleted: 0,
  UserId: 0,
};
const initialFormFields = {
  ProgramId: 0,
  SetupMarksId: 0,
  AdmissionTypeId: 0,
  ExamTypeId: 0,
  CampusTypeId: 0,
  CampusCityId: 0,
  ProgramTypeId: 0,
  MajorId: 0,
  AdmissionFacultyTypeId: 0,
  FacultyDepartmentId: 0,
  TotalMarks: 0,
  PassingMarksinPercentage: 0,
};

const SetupMarks = () => {
  initialSearchFields.UserId = decryptData(LOGINID, SessionStorage);
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const [dropdownList, setDropDownList] = useState([]);

  useEffect(() => {
    getMarksData();
    getDropDown();
  }, []);

  const getMarksData = () => {
    const payload = {
      OperationId: 1,
      SetupMarks_: initialSearchFields,
    };
    Setup_SetupMarks(payload)
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

  function getDropDown() {
    const payload = {
      operationId: Select,
    };

    Setup_MasterDetails_All_Dropdowns(payload)
      .then((res) => {
        setDropDownList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "ProgramName", name: "Program Name" },
    { field: "AdmissionTypeName", name: "Admission Type" },
    { field: "ExamTypeName", name: "Exam Type" },
    { field: "TotalMarks", name: "Total Marks" },
    { field: "PassingMarksinPercentage", name: "Passing Marks" },
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
          list={dropdownList?.filter((x) => x.SetupMasterId == examTypeID)}
          label="Marks Type"
          name="ExamTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ExamTypeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == admissionProgramId
          )}
          label="Program"
          name="ProgramId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ProgramId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Campus Type"
          name="CampusTypeId"
          list={dropdownList?.filter((x) => x.SetupMasterId == campusType)}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.CampusTypeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Campus City"
          name="CampusCityId"
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == campusCity &&
              x.parentid == SearchFields?.CampusTypeId
          )}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.CampusCityId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Program Types"
          name="ProgramTypeId"
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == programTypes &&
              x.parentid == SearchFields?.CampusCityId
          )}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ProgramTypeId}
          onChange={handleSearchChange}
          // required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionTypeId &&
              x.parentid == SearchFields?.ProgramTypeId
          )}
          label="Admission Type"
          name="AdmissionTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.AdmissionTypeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      {SearchFields?.ExamTypeId === 5557 ? (
        <Fragment>
          <Col md="3" lg="3">
            <FormGroupSelect
              label="Majors"
              name="MajorId"
              list={dropdownList?.filter(
                (x) =>
                  x.SetupMasterId == majorsAdId &&
                  x.parentid == SearchFields?.AdmissionTypeId
              )}
              fieldId="SetupDetailId"
              fieldName="SetupDetailName"
              value={
                SearchFields?.ExamTypeId !== 5557 ? 0 : SearchFields?.MajorId
              }
              onChange={handleSearchChange}
            />
          </Col>
          <Col md="3" lg="3">
            <FormGroupSelect
              label="Admission Faculty Type"
              name="AdmissionFacultyTypeId"
              list={dropdownList?.filter(
                (x) =>
                  x.SetupMasterId == admissionFacultyTypeId &&
                  x.parentid == SearchFields?.MajorId
              )}
              fieldId="SetupDetailId"
              fieldName="SetupDetailName"
              value={
                SearchFields?.ExamTypeId !== 5557
                  ? 0
                  : SearchFields?.AdmissionFacultyTypeId
              }
              onChange={handleSearchChange}
            />
          </Col>
          <Col md="3" lg="3">
            <FormGroupSelect
              label="Faculty Department"
              name="FacultyDepartmentId"
              list={dropdownList?.filter(
                (x) =>
                  x.SetupMasterId == facultyDepartmentId &&
                  x.parentid == SearchFields?.AdmissionFacultyTypeId
              )}
              fieldId="SetupDetailId"
              fieldName="SetupDetailName"
              value={
                SearchFields?.ExamTypeId !== 5557
                  ? 0
                  : SearchFields?.FacultyDepartmentId
              }
              onChange={handleSearchChange}
            />
          </Col>
        </Fragment>
      ) : null}
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Total Marks"
          name="TotalMarks"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.TotalMarks}
          onChange={handleSearchChange}
          isNumber="true"
          maxLength="4"
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Passing Marks"
          name="PassingMarksinPercentage"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.PassingMarksinPercentage}
          onChange={handleSearchChange}
          isNumber="true"
          maxLength="4"
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      SetupMarksId: SearchFields?.SetupMarksId,
      ExamTypeId: SearchFields?.ExamTypeId,
      ProgramId: SearchFields?.ProgramId,
      CampusTypeId: SearchFields?.CampusTypeId,
      CampusCityId: SearchFields?.CampusCityId,
      ProgramTypeId: SearchFields?.ProgramTypeId,
      AdmissionTypeId: SearchFields?.AdmissionTypeId,
      MajorId: SearchFields?.ExamTypeId != 5557 ? 0 : SearchFields?.MajorId,
      AdmissionFacultyTypeId:
        SearchFields?.ExamTypeId != 5557
          ? 0
          : SearchFields?.AdmissionFacultyTypeId,
      FacultyDepartmentId:
        SearchFields?.ExamTypeId != 5557
          ? 0
          : SearchFields?.FacultyDepartmentId,
      TotalMarks: SearchFields?.TotalMarks,
      PassingMarksinPercentage: SearchFields?.PassingMarksinPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };
    const newPayload = {
      OperationId: 1,
      SetupMarks_: payload,
    };

    Setup_SetupMarks(newPayload)
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
      SetupMarksId: FormFields?.SetupMarksId,
      ExamTypeId: FormFields?.ExamTypeId,
      ProgramId: FormFields?.ProgramId,
      CampusTypeId: FormFields?.CampusTypeId,
      CampusCityId: FormFields?.CampusCityId,
      ProgramTypeId: FormFields?.ProgramTypeId,
      AdmissionTypeId: FormFields?.AdmissionTypeId,
      MajorId: FormFields?.ExamTypeId != 5557 ? 0 : FormFields?.MajorId,
      AdmissionFacultyTypeId:
        FormFields?.ExamTypeId != 5557 ? 0 : FormFields?.AdmissionFacultyTypeId,
      FacultyDepartmentId:
        FormFields?.ExamTypeId != 5557 ? 0 : FormFields?.FacultyDepartmentId,
      TotalMarks: FormFields?.TotalMarks,
      PassingMarksinPercentage: FormFields?.PassingMarksinPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };
    const newPayload = {
      OperationId: 2,
      SetupMarks_: payload,
    };

    Setup_SetupMarks(newPayload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Column1);
          getMarksData();
        } else {
          CustomErrorMessage(res.data.Table[0].Column1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    const data = {
      SetupMarksId: obj.SetupMarksId,
      ExamTypeId: obj?.ExamTypeId,
      ProgramId: obj?.ProgramId,
      CampusTypeId: obj?.CampusTypeId,
      CampusCityId: obj?.CampusCityId,
      ProgramTypeId: obj?.ProgramTypeId,
      AdmissionTypeId: obj?.AdmissionTypeId,
      MajorId: obj?.ExamTypeId != 5557 ? 0 : obj?.MajorId,
      AdmissionFacultyTypeId:
        obj?.ExamTypeId != 5557 ? 0 : obj?.AdmissionFacultyTypeId,
      FacultyDepartmentId:
        obj?.ExamTypeId != 5557 ? 0 : obj?.FacultyDepartmentId,
      TotalMarks: obj?.TotalMarks,
      PassingMarksinPercentage: obj?.PassingMarksinPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };
    const newPayload = {
      OperationId: 2,
      SetupMarks_: data,
    };

    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const data = {
          SetupMarksId: obj.SetupMarksId,
          ProgramId: obj?.ProgramId,
          CampusTypeId: obj?.CampusTypeId,
          CampusCityId: obj?.CampusCityId,
          ProgramTypeId: obj?.ProgramTypeId,
          AdmissionTypeId: obj?.AdmissionTypeId,
          MajorId: obj?.MajorId,
          AdmissionFacultyTypeId: obj?.AdmissionFacultyTypeId,
          FacultyDepartmentId: obj?.FacultyDepartmentId,
          ExamTypeId: obj?.ExamTypeId,
          TotalMarks: obj?.TotalMarks,
          PassingMarksinPercentage: obj?.PassingMarksinPercentage,
          IsActive: 0,
          IsDeleted: 0,
          UserId: decryptData(LOGINID, SessionStorage),
        };
        const newPayload = {
          OperationId: 2,
          SetupMarks_: data,
        };

        Setup_SetupMarks(newPayload)
          .then((res) => {
            if (res.data.Table[0].HasError === 0) {
              CustomSuccessAlert(res.data.Table[0].Column1);
              getMarksData();
            } else {
              CustomErrorMessage(res.data.Table[0].Column1);
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
    getMarksData();
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
          list={dropdownList?.filter((x) => x.SetupMasterId == examTypeID)}
          label="Marks Type"
          name="ExamTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ExamTypeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == admissionProgramId
          )}
          label="Program"
          name="ProgramId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ProgramId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Campus Type"
          name="CampusTypeId"
          list={dropdownList?.filter((x) => x.SetupMasterId == campusType)}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.CampusTypeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Campus City"
          name="CampusCityId"
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == campusCity &&
              x.parentid == FormFields?.CampusTypeId
          )}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.CampusCityId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Program Types"
          name="ProgramTypeId"
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == programTypes &&
              x.parentid == FormFields?.CampusCityId
          )}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ProgramTypeId}
          onChange={handleAddChange}
          // required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionTypeId &&
              x.parentid == FormFields?.ProgramTypeId
          )}
          label="Admission Type"
          name="AdmissionTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.AdmissionTypeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      {FormFields?.ExamTypeId === 5557 ? (
        <Fragment>
          <Col lg="6" md="6" xs="12">
            <FormGroupSelect
              label="Majors"
              name="MajorId"
              list={dropdownList?.filter(
                (x) =>
                  x.SetupMasterId == majorsAdId &&
                  x.parentid == FormFields?.AdmissionTypeId
              )}
              fieldId="SetupDetailId"
              fieldName="SetupDetailName"
              value={FormFields?.ExamTypeId !== 5557 ? 0 : FormFields?.MajorId}
              onChange={handleAddChange}
            />
          </Col>
          <Col lg="6" md="6" xs="12">
            <FormGroupSelect
              label="Admission Faculty Type"
              name="AdmissionFacultyTypeId"
              list={dropdownList?.filter(
                (x) =>
                  x.SetupMasterId == admissionFacultyTypeId &&
                  x.parentid == FormFields?.MajorId
              )}
              fieldId="SetupDetailId"
              fieldName="SetupDetailName"
              value={
                FormFields?.ExamTypeId !== 5557
                  ? 0
                  : FormFields?.AdmissionFacultyTypeId
              }
              onChange={handleAddChange}
            />
          </Col>
          <Col lg="6" md="6" xs="12">
            <FormGroupSelect
              label="Faculty Department"
              name="FacultyDepartmentId"
              list={dropdownList?.filter(
                (x) =>
                  x.SetupMasterId == facultyDepartmentId &&
                  x.parentid == FormFields?.AdmissionFacultyTypeId
              )}
              fieldId="SetupDetailId"
              fieldName="SetupDetailName"
              value={
                FormFields?.ExamTypeId !== 5557
                  ? 0
                  : FormFields?.FacultyDepartmentId
              }
              onChange={handleAddChange}
            />
          </Col>
        </Fragment>
      ) : null}
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Total Marks"
          name="TotalMarks"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          isNumber="true"
          value={FormFields?.TotalMarks}
          onChange={handleAddChange}
          maxLength="4"
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Passing Marks"
          name="PassingMarksinPercentage"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          isNumber="true"
          value={FormFields?.PassingMarksinPercentage}
          onChange={handleAddChange}
          maxLength="4"
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Marks"
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

export default SetupMarks;
