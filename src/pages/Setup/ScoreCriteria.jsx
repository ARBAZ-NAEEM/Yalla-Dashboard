import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  admissionProgramId,
  admissionTypeId,
  examinationId,
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
  RESET_SEARCH_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  Setup_Admission_Score_Criteria,
  Setup_MasterDetails_All_Dropdowns,
} from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  OperationId: 1,
  ScoreScaleCalculationId: 0,
  ProgramId: 0,
  AdmissionTypeId: 0,
  DegreeId: 0,
  GetMarksInPercentage: 0,
  IsActive: 0,
  IsDeleted: 0,
  UserId: 0,
  UserIp: "",
};
const initialFormFields = {
  OperationId: 2,
  ScoreScaleCalculationId: 0,
  ProgramId: 0,
  AdmissionTypeId: 0,
  DegreeId: 0,
  GetMarksInPercentage: 0,
  IsActive: 0,
  IsDeleted: 0,
  UserId: 0,
  UserIp: "",
};

const ScoreCriteria = () => {
  initialSearchFields.UserId = decryptData(LOGINID, SessionStorage);
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const [dropdownList, setDropDownList] = useState([]);

  useEffect(() => {
    getScoreCriteria();
    getDropDown();
  }, []);

  const getScoreCriteria = () => {
    Setup_Admission_Score_Criteria(initialSearchFields)
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
    { field: "AdmissionTypeName", name: "Admission Type Name" },
    { field: "DegreeName", name: "Degree Name" },
    { field: "GetMarksInPercentage", name: "Get Marks" },
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
          label="Programs"
          name="ProgramId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.ProgramId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == admissionTypeId && x.parentid == 4009
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
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == examinationId)}
          label="Degree"
          name="DegreeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.DegreeId}
          onChange={handleSearchChange}
          required
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      OperationId: 1,
      ScoreScaleCalculationId: 0,
      ProgramId: SearchFields?.ProgramId,
      AdmissionTypeId: SearchFields?.AdmissionTypeId,
      DegreeId: SearchFields?.DegreeId,
      GetMarksInPercentage: SearchFields?.GetMarksInPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
      UserIp: "",
    };

    Setup_Admission_Score_Criteria(payload)
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
      OperationId: 2,
      ScoreScaleCalculationId: FormFields?.ScoreScaleCalculationId,
      ProgramId: FormFields?.ProgramId,
      AdmissionTypeId: FormFields?.AdmissionTypeId,
      DegreeId: FormFields?.DegreeId,
      GetMarksInPercentage: FormFields?.GetMarksInPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
      UserIp: "",
    };

    Setup_Admission_Score_Criteria(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Message);
          getScoreCriteria();
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
      OperationId: 2,
      ScoreScaleCalculationId: obj.ScoreScaleCalculationId,
      ProgramId: obj.ProgramId,
      AdmissionTypeId: obj.AdmissionTypeId,
      DegreeId: obj.DegreeId,
      GetMarksInPercentage: obj.GetMarksInPercentage,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
      UserIp: "",
    };

    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const data = {
          OperationId: 2,
          ScoreScaleCalculationId: obj.ScoreScaleCalculationId,
          ProgramId: obj.ProgramId,
          AdmissionTypeId: obj.AdmissionTypeId,
          DegreeId: obj.DegreeId,
          GetMarksInPercentage: obj.GetMarksInPercentage,
          IsActive: 0,
          IsDeleted: 0,
          UserId: decryptData(LOGINID, SessionStorage),
          UserIp: "",
        };

        Setup_Admission_Score_Criteria(data)
          .then((res) => {
            if (res.data.Table[0].HasError === 0) {
              CustomSuccessAlert(res.data.Table[0].Message);
              getScoreCriteria();
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
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialSearchFields });
    getScoreCriteria();
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
          label="Programs"
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
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == admissionTypeId && x.parentid == 4009
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
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == examinationId)}
          label="Degree"
          name="DegreeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.DegreeId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Get Marks"
          name="GetMarksInPercentage"
          //   isNumber="true"
          type="number"
          onChange={handleAddChange}
          value={FormFields?.GetMarksInPercentage}
          required
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Score Criteria"
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

export default ScoreCriteria;
