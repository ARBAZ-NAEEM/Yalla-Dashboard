import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input } from "reactstrap";
import {
  Delete,
  Insert,
  roleByApplication,
  Search,
  Select,
  SessionStorage,
  Update,
} from "../../common/SetupMasterEnum";
import {
  AlreadyExistAlert,
  CustomErrorMessage,
  CustomSuccessAlert,
  DeleteWithConfirmation,
  SuccessAlert,
} from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
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
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import {
  SecuritySetup_GetApplications,
  SecuritySetup_RoleOperation,
  Setup_Setup_FIN_COA,
} from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";
// import { SecuritySetup_RoleOperation } from "../../utils/Config";

const initialSearchFields = {
  OperationID: Search,
  HeadId: 0,
  CoaId: 0,
  AccountCode: "",
  AccountName: "",
  FyId: 0,
  IsTaxAcc: false,
  IsActive: false,
  CreadtedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: decryptData(LOGINID, SessionStorage),
  UserIP: "192.168.152.2",
};
const initialFormFields = {
  OperationID: Insert,
  HeadId: 0,
  CoaId: 0,
  AccountCode: "",
  AccountName: "",
  FyId: 0,
  IsTaxAcc: false,
  IsActive: false,
  CreadtedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: decryptData(LOGINID, SessionStorage),
  UserIP: "192.168.152.2",
  // OperationId: Insert,
  // HeadOfAccount: 0,
  // AccountName: "",
  // IsTextAccount: false,
  // IsActive: false,
  // CreatedBy: 0,
  // ModifiedFBy: 0,
  // UserIP: "192.168.152.2",
};

const initialObj = {
  operationID: Select,
  headId: 0,
  coaId: 0,
  accountCode: "string",
  accountName: "string",
  fyId: 0,
  isTaxAcc: true,
  isActive: true,
  creadtedBy: 0,
  modifiedBy: 0,
  userIP: "string",
};

const ChartOfAccounts = () => {
  const {
    SearchFields,
    FormFields,
    TableLoading,
    FormLoading,
    SupportingTables,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [loginId, setLoginId] = useState("");
  const [roleList, setRoleList] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getChartOfAccounts();
  }, []);

  const getChartOfAccounts = () => {
    Setup_Setup_FIN_COA(initialObj)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table2,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        let data = {
          name: "COADropdown",
          value: { Table: res?.data?.Table, Table1: res?.data?.Table1 },
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "ACCOUNTS", name: "Head Of Account" },
    { field: "OpeningDate", name: "Opening Date" },
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
      OperationID: Update,
      HeadId: obj.HeadId,
      CoaId: obj.CoaID,
      AccountCode: obj.AccountCode,
      AccountName: obj.AccountName,
      FyId: 0,
      IsTaxAcc: obj.IsTaxAccount,
      IsActive: obj.IsActive,
      CreadtedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: decryptData(LOGINID, SessionStorage),
      UserIP: "192.168.152.2",
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.COADropdown?.Table}
          label="Head of Account"
          name="HeadId"
          fieldId="HeadId"
          fieldName="Head"
          onChange={handleSearchChange}
          value={SearchFields?.HeadId}
        />
      </Col>

      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.COADropdown?.Table1?.filter(
            (x) => x.HeadId == SearchFields?.HeadId
          )}
          label="Account"
          name="CoaId"
          fieldId="CoaID"
          fieldName="ACCOUNTS"
          onChange={handleSearchChange}
          value={SearchFields?.CoaId}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    Setup_Setup_FIN_COA(SearchFields)
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
  const cancelSearch = () => {
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialFormFields });
    getChartOfAccounts();
  };

  const handleCancel = () => {
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          OperationID: Delete,
          HeadId: obj.HeadId,
          CoaId: obj.CoaID,
          AccountCode: obj.AccountCode,
          AccountName: obj.AccountName,
          FyId: 0,
          IsTaxAcc: obj.IsTaxAccount,
          IsActive: obj.IsActive,
          CreadtedBy: decryptData(LOGINID, SessionStorage),
          ModifiedBy: decryptData(LOGINID, SessionStorage),
          UserIP: "192.168.152.2",
        };
        Setup_Setup_FIN_COA(data)
          .then((res) => {
            if (res?.data?.Table[0]?.HasError === 0) {
              dispatch({
                type: SET_INITIAL_CRUD_FORM_STATE,
                payload: {
                  List: res?.data?.Table1,
                  FormFields: initialFormFields,
                  SearchFields: initialSearchFields,
                },
              });
              CustomSuccessAlert(res?.data?.Table[0]?.Message);
            } else {
              CustomErrorMessage(res?.data?.Table[0].Message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const submitForm = () => {
    Setup_Setup_FIN_COA(FormFields)
      .then((res) => {
        if (res?.data?.Table[0]?.HasError === 0) {
          dispatch({
            type: SET_INITIAL_CRUD_FORM_STATE,
            payload: {
              List: res?.data?.Table1,
              FormFields: initialFormFields,
              SearchFields: initialSearchFields,
            },
          });
          CustomSuccessAlert(res?.data?.Table[0]?.Message);
        } else {
          CustomErrorMessage(res?.data?.Table[0]?.Message);
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
          list={SupportingTables?.COADropdown?.Table}
          label="Head of Account"
          name="HeadId"
          fieldId="HeadId"
          fieldName="Head"
          onChange={handleAddChange}
          value={FormFields?.HeadId}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.COADropdown?.Table1?.filter(
            (x) => x.HeadId == FormFields?.HeadId
          )}
          label="Account"
          name="CoaId"
          fieldId="CoaID"
          fieldName="ACCOUNTS"
          onChange={handleAddChange}
          value={FormFields?.CoaId}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Account Code"
          name="AccountCode"
          onChange={handleAddChange}
          value={FormFields?.AccountCode}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Account Name"
          name="AccountName"
          onChange={handleAddChange}
          value={FormFields?.AccountName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Text Account"
          name="IsTaxAcc"
          value={FormFields?.IsTaxAcc}
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          value={FormFields?.IsActive}
          onChange={handleAddChange}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Chart of Accounts"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      searchSubmit={submitSearch}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default ChartOfAccounts;
