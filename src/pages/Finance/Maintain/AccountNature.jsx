import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import {
  Delete,
  Insert,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
} from "../../../redux/actionType/CrudActionTypes";
import {
  PostRequest,
} from "../../../utils/Config";
import {
  CustomErrorMessage,
  DeleteWithConfirmation,
  CustomSuccessAlert,
} from "../../../components/Alert";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import { decryptData } from "../../../EncryptData";
import {
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";
import {
  apiErrorChecker,
} from "../../../functions/generalFunctions";
import { ACCOUNTNATURE } from "../../../utils/UrlConstants";

const initialSearchFields = {
  OperationID: Select,
  AccNatureID: 0,
  AccNature: "",
  IsActive: true,
  userID: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const initialFormFields = {
  OperationID: Insert,
  AccNatureID: 0,
  AccNature: "",
  IsActive: true,
  userID: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const AccountNature = () => {
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getAccountNature();
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
  }, []);

  function getAccountNature() {
    PostRequest(ACCOUNTNATURE, initialSearchFields)
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
    { field: "AccNature", name: "Account Name" },
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
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Account Name"
          name="AccNature"
          onChange={handleSearchChange}
          value={SearchFields?.AccNature}
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
    PostRequest(ACCOUNTNATURE, payload)
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
    };
    PostRequest(ACCOUNTNATURE, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res.data?.Table[0]?.MESSAGE);
          getAccountNature();
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
      AccNature: obj?.AccNature,
      AccNatureID: obj?.AccNatureID,
      IsActive: obj?.IsActive === "Active" ? true : false,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          OperationId: Delete,
          AccNatureID: obj?.AccNatureID,
          AccNature: obj?.AccNature,
          IsActive: false,
          UserID: decryptData(LOGINID, SessionStorage),
          UserIP: decryptData(UserNetworkInfo)?.IPv4,
        };
        PostRequest(ACCOUNTNATURE, data)
          .then((res) => {
            const { err, msg } = apiErrorChecker(res);
            if (err) {
              CustomErrorMessage(msg);
              return;
            }
            CustomSuccessAlert(msg);
            getAccountNature();
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
    getAccountNature();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Account Nature"
          name="AccNature"
          onChange={handleAddChange}
          value={FormFields?.AccNature}
          required
        />
      </Col>
      {FormFields?.AccNatureID > 0 ? (
        <Col lg="4" md="4" xs="12">
          <FormGroupCheckbox
            label="Is Active"
            name="IsActive"
            value={FormFields?.IsActive}
            onChange={handleAddChange}
          />
        </Col>
      ) : null}
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Account Nature"
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
      modalStyle={{ minWidth: "50vw", width: "50%" }}
    />
  );
};

export default AccountNature;
