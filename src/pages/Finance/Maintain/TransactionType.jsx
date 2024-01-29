import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Row, Table, UncontrolledCollapse } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import {
  allowancesSetupMasterId,
  Delete,
  Insert,
  Search,
  Select,
  setupMasterId,
  Update,
  allowOnlyString,
  benefitsSetupId,
  degreeSetupId,
  citySetupId,
  countrySetupId,
  SessionStorage,
} from "../../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest, Setup_AccountNature, Setup_MasterDetails_Operation } from "../../../utils/Config";
import DatePicker from "react-datepicker";

import {
  SuccessAlert,
  DeleteAlert,
  AlreadyExistAlert,
  CustomErrorMessage,
  DeleteWithConfirmation,
  CustomSuccessAlert,
} from "../../../components/Alert";
import { dateFormat, dateFormatPlaceholder } from "../../../utils/CommonMethods";
import { useState } from "react";
import { formatDateFunction1 } from "../../../functions/DateFormatFunction";
import FinanceCrudComponent from "../../../components/FormComponents/FinanceCrudComponent";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import { decryptData } from "../../../EncryptData";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import { apiErrorChecker, getUserIPInfo } from "../../../functions/generalFunctions";
import { TRANSACTION_TYPE } from "../../../utils/UrlConstants";

const initialSearchFields = {
  OperationID: Select,
  TransTypeID:0,
  Flex:"",
  TransType:"",
  IsActive: true,
  userID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const initialFormFields = {
  OperationID: Insert,
  TransTypeID:0,
  Flex:"",
  TransType:"",
  IsActive: true,
  userID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const TransactionType = () => {
  const {
    SearchFields,
    FormFields,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
    getTransactionType();
  }, []);

  function getTransactionType() {
      PostRequest(TRANSACTION_TYPE, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table.map((x) =>({
              ...x,
              IsActive:(x.IsActive ? "Active" : "InActive"),
            })),
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
    { field: "Flex", name: "Code" },
    { field: "TransType", name: "Transaction Type" },
    { field: "IsActive", name: "Status" }
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
          label="Code"
          name="Flex"
          onChange={handleSearchChange}
          value={SearchFields?.Flex}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Transaction Type"
          name="TransType"
          onChange={handleSearchChange}
          value={SearchFields?.TransType}
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

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      OperationID: Search,
    };
    PostRequest(TRANSACTION_TYPE, payload)
    .then((res) => {
      dispatch({
        type: SET_INITIAL_CRUD_FORM_STATE,
        payload: {
          List: res?.data?.Table.map((x) =>({
            ...x,
            IsActive:(x.IsActive ? "Active" : "InActive"),
          })),
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
      OperationID: id,
    };
    PostRequest(TRANSACTION_TYPE, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data?.Table[0]?.HasError === 0) { 
          CustomSuccessAlert(res.data?.Table[0]?.MESSAGE);    
          getTransactionType();
        } else {
          CustomErrorMessage(res.data?.Table[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      Flex: obj?.Flex,
      TransType: obj?.TransType,
      TransTypeID:obj?.TransTypeID,
      IsActive: obj?.IsActive === "Active" ? true : false,
      UserIP:obj?.UserIP,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          OperationId: Delete,
          TransTypeID: obj?.TransTypeID,
          TransType: "",
          IsActive: true,
          UserId:0,
          UserIP: decryptData(UserNetworkInfo)?.IPv4,
        };
        PostRequest(TRANSACTION_TYPE, data)
          .then((res) => {
            const { err, msg } = apiErrorChecker(res);
            if (err) {
              CustomErrorMessage(msg);
              return;
            }
            CustomSuccessAlert(msg);
            getTransactionType();
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
    getTransactionType();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const formPanel = (
    <Fragment>
     <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Code"
          name="Flex"
          onChange={handleAddChange}
          value={FormFields?.Flex}
          required
        />
      </Col>
      <Col lg="5" md="5" xs="12">
        <FormGroupInput
          label="Transaction Type"
          name="TransType"
          onChange={handleAddChange}
          value={FormFields?.TransType}
          required
        />
      </Col>
      {FormFields?.TransTypeID > 0 ?
      <Col lg="4" md="4" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={FormFields?.IsActive}
          onChange={handleAddChange}
        />
      </Col>
      : null }
    </Fragment>
  );
  
  return (
    <CrudFormComponent
      formName="Transaction Type"
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
      // modalStyle={{ minWidth: "60vw", width: "20%" }}

    />
  );
};

export default TransactionType;
