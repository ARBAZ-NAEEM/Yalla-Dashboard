import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import {
  Delete,
  payrollType,
  Search,
  Select,
} from "../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import { Setup_MasterDetails_Operation } from "../../utils/Config";

import {
  SuccessAlert,
  DeleteAlert,
  AlreadyExistAlert,
  DeleteWithConfirmation,
} from "../../components/Alert";

const initialSearchFields = { SetupDetailName: "" };
const initialFormFields = { SetupDetailName: "" };

const PayrollType = () => {
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
    getRoles();
  }, []);

  function getRoles() {
    const payload = {
      operationId: Select,
      setupMasterId: payrollType,
    };

    Setup_MasterDetails_Operation(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [{ field: "SetupDetailName", name: "Payroll Type" }];

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
          label="Search Payroll Type"
          name="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields.SetupDetailName}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      operationId: Search,
      setupMasterId: payrollType,
      parentId: 0,
      setupDetailName: SearchFields.SetupDetailName,
      createdBy: 0,
      userIP: "192.168.1.104",
    };

    Setup_MasterDetails_Operation(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data,
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
      operationId: id,
      setupMasterId: payrollType,
      parentId: 0,
      setupDetailName: FormFields.SetupDetailName,
      setupDetailId: FormFields.SetupDetailId,
      createdBy: 0,
      userIP: "192.168.1.104",
    };

    Setup_MasterDetails_Operation(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data[0].HasError === 0) {
          SuccessAlert();
          getRoles();
        } else {
          AlreadyExistAlert();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      SetupDetailName: obj.SetupDetailName,
      SetupDetailId: obj.SetupDetailId,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          SetupDetailName: obj.SetupDetailName,
          SetupDetailId: obj.SetupDetailId,
        };

        const payload = {
          operationId: Delete,
          setupMasterId: payrollType,
          parentId: 0,
          setupDetailName: data.SetupDetailName,
          setupDetailId: data.SetupDetailId,
          createdBy: 0,
          userIP: "192.168.1.104",
        };

        Setup_MasterDetails_Operation(payload)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res.data[0].HasError === 0) {
              DeleteAlert();
              getRoles();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Payroll Type"
          name="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields.SetupDetailName}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Payroll Type"
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
    />
  );
};

export default PayrollType;
