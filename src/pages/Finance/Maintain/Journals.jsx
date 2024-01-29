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
import {
  PostRequest,
  Setup_Journal,
  Setup_MasterDetails_Operation,
} from "../../../utils/Config";

import {
  SuccessAlert,
  DeleteAlert,
  AlreadyExistAlert,
  CustomErrorMessage,
  CustomSuccessAlert,
} from "../../../components/Alert";

import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import { decryptData } from "../../../EncryptData";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import { JOURNALS, TRANSACTION_TYPE } from "../../../utils/UrlConstants";

const Journals = () => {
  const initialSearchFields = {
    OperationID: Select,
    JournalID: 1,
    JournalCode: "",
    JournalName: "",
    TransTypeID: 0,
    flex: "",
    AssociatedJournalID: 0,
    IsActive: true,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const initialFormFields = {
    OperationID: Insert,
    JournalID: 1,
    JournalCode: "",
    JournalName: "",
    flex: "",
    TransTypeID: 0,
    AssociatedJournalID: 0,
    IsActive: true,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const intialTransType = {
    OperationID: Select,
    TransTypeID: 0,
    TransType: "",
    Flex: "",
    IsActive: true,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const { TransType } = SupportingTables;

  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
    getJournal();
    getTransType();
  }, []);

  const getTransType = () => {
    PostRequest(TRANSACTION_TYPE, intialTransType)
      .then((res) => {
        let TransType = { name: "TransType", value: res?.data?.Table };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: TransType,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function getJournal() {
    PostRequest(JOURNALS, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table.map((x) => ({
              ...x,
              IsActive: x.IsActive ? "Active" : "InActive",
            })),
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
    { field: "JournalCode", name: "Journal Code" },
    { field: "JournalName", name: "Journal Name" },
    { field: "TransType", name: "Transaction Type" },
    // { field: "AssociatedJournalID", name: "Associated Journal" },
    { field: "IsActive", name: "Status" },
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
      <Col lg="3" md="4" xs="12">
        <FormGroupSelect
          label="Trans Type"
          name="TransTypeID"
          list={TransType}
          fieldId="TransTypeID"
          fieldName="TransType"
          value={SearchFields?.TransTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupInput
          label="Journal Code"
          name="JournalCode"
          required
          onChange={handleSearchChange}
          value={SearchFields?.JournalCode}
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupInput
          label="Journal Name"
          name="JournalName"
          required
          onChange={handleSearchChange}
          value={SearchFields?.JournalName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Associated Journal"
          name="AssociatedJournalID"
          onChange={handleSearchChange}
          value={SearchFields?.AssociatedJournalID}
        />
      </Col>
      <Col lg="2" md="2" xs="12">
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
    PostRequest(JOURNALS, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table.map((x) => ({
              ...x,
              IsActive: x.IsActive ? "Active" : "InActive",
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
      OperationId: id,
      JournalID: FormFields.JournalID,
      UserID: decryptData(LOGINID, SessionStorage),
    };

    PostRequest(JOURNALS, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res.data?.Table[0]?.MESSAGE);
          getJournal();
          getTransType();
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
      TransTypeID: obj?.TransTypeID,
      JournalCode: obj?.JournalCode,
      JournalID: obj?.JournalID,
      JournalName: obj?.JournalName,
      AssociatedJournalID: obj?.AssociatedJournalID,
      IsActive: obj?.IsActive === "Active" ? true : false,
      UserIP: obj?.UserIP,
    };
    console.log(obj.JournalID);
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {};

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    getJournal();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const formPanel = (
    <Fragment>
      <Row>
        <Col lg="6" md="6" xs="6">
          <FormGroupSelect
            label="Trans Type"
            name="TransTypeID"
            list={TransType}
            fieldId="TransTypeID"
            fieldName="TransType"
            value={FormFields?.TransTypeID}
            onChange={handleAddChange}
            required
          />
        </Col>
        <Col lg="6" md="6" xs="6">
          <FormGroupInput
            label="Journal Code"
            name="JournalCode"
            required
            onChange={handleAddChange}
            value={FormFields?.JournalCode}
          />
        </Col>
        <Col lg="6" md="6" xs="6">
          <FormGroupInput
            label="Journal Name"
            name="JournalName"
            required
            onChange={handleAddChange}
            value={FormFields?.JournalName}
          />
        </Col>
        <Col lg="6" md="6" xs="6">
          <FormGroupSelect
            label="Associated Journal"
            name="associatedJournalID"
            onChange={handleAddChange}
            value={FormFields?.AssociatedJournalID}
          />
        </Col>
        <Col lg="6" md="6" xs="12">
          <FormGroupCheckbox
            label="Is Active"
            name="IsActive"
            value={FormFields?.IsActive}
            onChange={handleAddChange}
          />
        </Col>
      </Row>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Journals"
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
      modalStyle={{ minWidth: "60vw", width: "60%" }}
    />
  );
};

export default Journals;
