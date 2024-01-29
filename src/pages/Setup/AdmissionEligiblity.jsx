import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  admissionFacultyTypeId,
  admissionProgramId,
  admissionTypeId,
  blockDepartmentId,
  campusCity,
  campusType,
  Delete,
  departmentId,
  examinationId,
  examTypeID,
  facultyDepartmentId,
  facultyDepartmentProgramId,
  facultyTypeId,
  majorsAdId,
  programTypes,
  Search,
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
  Setup_AdmissionEligibilty,
  Setup_Admission_Blocks,
  Setup_MasterDetails_All_Dropdowns,
  Setup_SetupMarks,
  Setup_Setup_ADM_SeatType,
} from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  AdmissionEligibilityId: 0,
  ApplyingCampusId: 0,
  ApplyingCampusTypeId: 0,
  ApplyingProgramId: 0,
  ApplyingProgramTypeId: 0,
  ApplyingAdmissionTypeId: 0,
  ApplyingMajorId: 0,
  ApplyingAdmissionFacultyTypeId: 0,
  ApplyingDepartmentId: 0,
  ApplyingFacultyDepartmentProgramId: 0,
  LastDegreeId: 0,
  EligibleMarksInPercentage: 0,
  IsActive: 1,
  IsDeleted: 0,
  UserId: 0,
};
const initialFormFields = {
  AdmissionEligibilityId: 0,
  ApplyingCampusId: 0,
  ApplyingCampusTypeId: 0,
  ApplyingProgramId: 0,
  ApplyingProgramTypeId: 0,
  ApplyingAdmissionTypeId: 0,
  ApplyingMajorId: 0,
  ApplyingAdmissionFacultyTypeId: 0,
  ApplyingDepartmentId: 0,
  ApplyingFacultyDepartmentProgramId: 0,
  LastDegreeId: 0,
  EligibleMarksInPercentage: 0,
};

const AdmissionEligibilty = () => {
  initialSearchFields.UserId = decryptData(LOGINID, SessionStorage);
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

  useEffect(() => {
    getAdmissionEligibiltyRecords();
    getDropDown();
  }, []);

  const getAdmissionEligibiltyRecords = () => {
    Setup_AdmissionEligibilty(initialSearchFields)
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
    { field: "ApplyingProgramName", name: "Program Name" },
    { field: "ApplyingProgramTypeName", name: "Program Type" },
    { field: "ApplyingAdmissionTypeName", name: "Admission Type" },
    { field: "ApplyingMajorName", name: "Major" },
    { field: "ApplyingAdmissionFacultyTypeName", name: "Faculty Type" },
    { field: "ApplyingDepartmentName", name: "Faculty Department" },
    {
      field: "ApplyingFacultyDepartmentProgramName",
      name: "Department Program",
    },
    { field: "LastDegreeName", name: "Last Degree" },
    { field: "EligibleMarksInPercentage", name: "Eligibilty Marks" },
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
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == admissionProgramId
          )}
          label="Program"
          name="ApplyingProgramId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingProgramId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == campusType)}
          label="Campus Type"
          name="ApplyingCampusId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingCampusId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == campusCity &&
              x.parentid == SearchFields?.ApplyingCampusId
          )}
          label="Campus City"
          name="ApplyingCampusTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingCampusTypeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == programTypes &&
              x.parentid == SearchFields?.ApplyingCampusTypeId
          )}
          label="Program Type"
          name="ApplyingProgramTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingProgramTypeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionTypeId &&
              x.parentid == SearchFields?.ApplyingProgramTypeId
          )}
          label="Admission Type"
          name="ApplyingAdmissionTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingAdmissionTypeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == majorsAdId &&
              x.parentid == SearchFields?.ApplyingAdmissionTypeId
          )}
          label="Major"
          name="ApplyingMajorId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingMajorId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionFacultyTypeId &&
              x.parentid == SearchFields?.ApplyingMajorId
          )}
          label="Faculty Type"
          name="ApplyingAdmissionFacultyTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingAdmissionFacultyTypeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == facultyDepartmentId &&
              x.parentid == SearchFields?.ApplyingAdmissionFacultyTypeId
          )}
          label="Faculty Department"
          name="ApplyingDepartmentId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingDepartmentId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == facultyDepartmentProgramId &&
              x.parentid == SearchFields?.ApplyingDepartmentId
          )}
          label="Faculty Department Program"
          name="ApplyingFacultyDepartmentProgramId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ApplyingFacultyDepartmentProgramId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList
            ?.filter(
              (x) =>
                x.SetupMasterId == examinationId &&
                x.SetupDetailId != 3856 &&
                x.SetupDetailId != 3852 &&
                x.SetupDetailId != 3853 &&
                x.SetupDetailId != 3854 &&
                x.SetupDetailId != 3855
            )
            .sort((a, b) => a.Flex1 - b.Flex1)}
          label="Last Degree"
          name="LastDegreeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.LastDegreeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Eligibilty Marks%"
          name="EligibleMarksInPercentage"
          value={SearchFields?.EligibleMarksInPercentage}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      OperationId: 0,
      AdmissionEligibilityId: SearchFields?.AdmissionEligibilityId,
      ApplyingCampusId: SearchFields?.ApplyingCampusId,
      ApplyingCampusTypeId: SearchFields?.ApplyingCampusTypeId,
      ApplyingProgramId: SearchFields?.ApplyingProgramId,
      ApplyingProgramTypeId: SearchFields?.ApplyingProgramTypeId,
      ApplyingAdmissionTypeId: SearchFields?.ApplyingAdmissionTypeId,
      ApplyingMajorId: SearchFields?.ApplyingMajorId,
      ApplyingAdmissionFacultyTypeId:
        SearchFields?.ApplyingAdmissionFacultyTypeId,
      ApplyingDepartmentId: SearchFields?.ApplyingDepartmentId,
      ApplyingFacultyDepartmentProgramId:
        SearchFields?.ApplyingFacultyDepartmentProgramId,
      LastDegreeId: SearchFields?.LastDegreeId,
      EligibleMarksInPercentage: SearchFields?.EligibleMarksInPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };

    Setup_AdmissionEligibilty(payload)
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
      OperationId: 1,
      AdmissionEligibilityId: FormFields?.AdmissionEligibilityId,
      ApplyingCampusId: FormFields?.ApplyingCampusId,
      ApplyingCampusTypeId: FormFields?.ApplyingCampusTypeId,
      ApplyingProgramId: FormFields?.ApplyingProgramId,
      ApplyingProgramTypeId: FormFields?.ApplyingProgramTypeId,
      ApplyingAdmissionTypeId: FormFields?.ApplyingAdmissionTypeId,
      ApplyingMajorId: FormFields?.ApplyingMajorId,
      ApplyingAdmissionFacultyTypeId:
        FormFields?.ApplyingAdmissionFacultyTypeId,
      ApplyingDepartmentId: FormFields?.ApplyingDepartmentId,
      ApplyingFacultyDepartmentProgramId:
        FormFields?.ApplyingFacultyDepartmentProgramId,
      LastDegreeId: FormFields?.LastDegreeId,
      EligibleMarksInPercentage: FormFields?.EligibleMarksInPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };
    // const newPayload = {
    //   OperationId: 2,
    //   SetupMarks_: payload,
    // };

    Setup_AdmissionEligibilty(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Message);
          getAdmissionEligibiltyRecords();
        } else {
          CustomErrorMessage(res.data.Table[0].Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    const data = {
      OperationId: 1,
      AdmissionEligibilityId: obj?.AdmissionEligibilityId,
      ApplyingCampusId: obj?.ApplyingCampusId,
      ApplyingCampusTypeId: obj?.ApplyingCampusTypeId,
      ApplyingProgramId: obj?.ApplyingProgramId,
      ApplyingProgramTypeId: obj?.ApplyingProgramTypeId,
      ApplyingAdmissionTypeId: obj?.ApplyingAdmissionTypeId,
      ApplyingMajorId: obj?.ApplyingMajorId,
      ApplyingAdmissionFacultyTypeId: obj?.ApplyingAdmissionFacultyTypeId,
      ApplyingDepartmentId: obj?.ApplyingDepartmentId,
      ApplyingFacultyDepartmentProgramId:
        obj?.ApplyingFacultyDepartmentProgramId,
      LastDegreeId: obj?.LastDegreeId,
      EligibleMarksInPercentage: obj?.EligibleMarksInPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };
    // const newPayload = {
    //   OperationId: 2,
    //   SetupMarks_: data,
    // };

    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const data = {
          OperationId: 1,
          AdmissionEligibilityId: obj?.AdmissionEligibilityId,
          ApplyingCampusId: obj?.ApplyingCampusId,
          ApplyingCampusTypeId: obj?.ApplyingCampusTypeId,
          ApplyingProgramId: obj?.ApplyingProgramId,
          ApplyingProgramTypeId: obj?.ApplyingProgramTypeId,
          ApplyingAdmissionTypeId: obj?.ApplyingAdmissionTypeId,
          ApplyingMajorId: obj?.ApplyingMajorId,
          ApplyingAdmissionFacultyTypeId: obj?.ApplyingAdmissionFacultyTypeId,
          ApplyingDepartmentId: obj?.ApplyingDepartmentId,
          ApplyingFacultyDepartmentProgramId:
            obj?.ApplyingFacultyDepartmentProgramId,
          LastDegreeId: obj?.LastDegreeId,
          EligibleMarksInPercentage: obj?.EligibleMarksInPercentage,
          IsActive: 0,
          IsDeleted: 0,
          UserId: decryptData(LOGINID, SessionStorage),
        };
        // const newPayload = {
        //   OperationId: 2,
        //   SetupMarks_: data,
        // };

        Setup_AdmissionEligibilty(data)
          .then((res) => {
            if (res.data.Table[0].HasError === 0) {
              CustomSuccessAlert(res.data.Table[0].Message);
              getAdmissionEligibiltyRecords();
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
    getAdmissionEligibiltyRecords();
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
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == admissionProgramId
          )}
          label="Program"
          name="ApplyingProgramId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingProgramId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == campusType)}
          label="Campus Type"
          name="ApplyingCampusId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingCampusId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == campusCity &&
              x.parentid == FormFields?.ApplyingCampusId
          )}
          label="Campus City"
          name="ApplyingCampusTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingCampusTypeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == programTypes &&
              x.parentid == FormFields?.ApplyingCampusTypeId
          )}
          label="Program Type"
          name="ApplyingProgramTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingProgramTypeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionTypeId &&
              x.parentid == FormFields?.ApplyingProgramTypeId
          )}
          label="Admission Type"
          name="ApplyingAdmissionTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingAdmissionTypeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == majorsAdId &&
              x.parentid == FormFields?.ApplyingAdmissionTypeId
          )}
          label="Major"
          name="ApplyingMajorId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingMajorId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == admissionFacultyTypeId &&
              x.parentid == FormFields?.ApplyingMajorId
          )}
          label="Faculty Type"
          name="ApplyingAdmissionFacultyTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingAdmissionFacultyTypeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == facultyDepartmentId &&
              x.parentid == FormFields?.ApplyingAdmissionFacultyTypeId
          )}
          label="Faculty Department"
          name="ApplyingDepartmentId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingDepartmentId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == facultyDepartmentProgramId &&
              x.parentid == FormFields?.ApplyingDepartmentId
          )}
          label="Faculty Department Program"
          name="ApplyingFacultyDepartmentProgramId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.ApplyingFacultyDepartmentProgramId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList
            ?.filter(
              (x) =>
                x.SetupMasterId == examinationId &&
                x.SetupDetailId != 3856 &&
                x.SetupDetailId != 3852 &&
                x.SetupDetailId != 3853 &&
                x.SetupDetailId != 3854 &&
                x.SetupDetailId != 3855
            )
            .sort((a, b) => a.Flex1 - b.Flex1)}
          label="Last Degree"
          name="LastDegreeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.LastDegreeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Eligibilty Marks%"
          name="EligibleMarksInPercentage"
          value={FormFields?.EligibleMarksInPercentage}
          onChange={handleAddChange}
          isNumber="true"
          maxLength="3"
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Admission Eligibilty"
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

export default AdmissionEligibilty;
