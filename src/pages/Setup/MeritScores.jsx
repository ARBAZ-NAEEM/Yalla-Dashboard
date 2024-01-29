import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input } from "reactstrap";
import {
  academicYearId,
  Insert,
  Search,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupButton from "../../components/GeneralComponent/FormGroupButton";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../EncryptData";
import {
  RESET_FORM_FIELDS,
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import { ADM_SetupMeritScore } from "../../utils/Config";
import { LOGINID, UserNetworkInfo } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  OperationID: Select,
  AcademicyearID: 0,
  SetupMeritScoreID: 0,
  PurposeID: 0,
  Numbers: 0,
  InPercentage: false,
  IsActive: false,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};
const initialFormFields = {
  OperationID: 0,
  AcademicyearID: 0,
  SetupMeritScoreID: 0,
  PurposeID: 0,
  Numbers: 0,
  InPercentage: false,
  IsActive: false,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const MeritScores = () => {
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

  useEffect(() => {
    getMeritScore();
  }, []);

  const columns = [
    { field: "AcademicYear", name: "Academic Year" },
    { field: "Purpose", name: "Examination Name" },
    { field: "Numbers", name: "Numbers" },
    { field: "Sign", name: "Sign" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };
  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const onEditRow = (obj) => {
    let data = {
      AcademicyearID: obj?.AcademicyearID,
      SetupMeritScoreID: obj?.SetupMeritScoreID,
      PurposeID: obj?.PurposeID,
      Numbers: obj?.Numbers,
      InPercentage: obj?.InPercentage,
      IsActive: obj?.IsActive,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == academicYearId
          )}
          label="Academic Year"
          name="AcademicyearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.AcademicyearID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const getMeritScore = () => {
    ADM_SetupMeritScore(initialSearchFields)
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

  const submitSearch = () => {
    const payload = {
      OperationID: Search,
      AcademicyearID: SearchFields?.AcademicyearID,
      SetupMeritScoreID: SearchFields?.SetupMeritScoreID,
      PurposeID: SearchFields?.PurposeID,
      Numbers: SearchFields?.Numbers,
      InPercentage: SearchFields?.InPercentage,
      IsActive: SearchFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: 0,
      UserIP: decryptData(UserNetworkInfo).IPv4,
    };
    ADM_SetupMeritScore(payload)
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
  const cancelSearch = () => {
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialSearchFields });
    getMeritScore();
  };

  const handleCancel = () => {
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  };

  const submitForm = (id) => {
    const payload = {
      OperationID: id,
      AcademicyearID: FormFields?.AcademicyearID,
      SetupMeritScoreID: FormFields?.SetupMeritScoreID,
      PurposeID: FormFields?.PurposeID,
      Numbers: FormFields?.Numbers,
      InPercentage: FormFields?.InPercentage,
      IsActive: FormFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: id == 2 ? 0 : decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo).IPv4,
    };

    ADM_SetupMeritScore(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res?.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table[0]?.MESSAGE);
          getMeritScore();
        } else {
          CustomErrorMessage(res?.data?.Table[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == academicYearId
          )}
          label="Academic Year"
          name="AcademicyearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.AcademicyearID}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.parentid === 1150
          )}
          label="Examination Name"
          name="PurposeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.PurposeID}
        />
      </Col>

      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Marks"
          name="Numbers"
          onChange={handleAddChange}
          value={FormFields?.Numbers}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="In Percentage"
          name="InPercentage"
          value={FormFields?.InPercentage}
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={FormFields?.IsActive}
          onChange={handleAddChange}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Merit Scores"
      //   customButton={customButton}
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      onEdit={onEditRow}
      searchSubmit={submitSearch}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default MeritScores;
