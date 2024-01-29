import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import {
  Delete,
  departmentId,
  facultyTypeId,
  Search,
  SessionStorage,
} from "../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
  RESET_SEARCH_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  Setup_MasterDetails_All_Dropdowns,
  Setup_MasterDetails_Operation,
} from "../../utils/Config";

import { CustomSuccessAlert, CustomErrorMessage, DeleteWithConfirmation } from "../../components/Alert";
import { decryptData } from "../../EncryptData";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  SetupDetailId: 0,
  FacultyTypeID: 0,
  DepartmentName: "",
};
const initialFormFields = {
  SetupDetailId: 0,
  FacultyTypeID: 0,
  DepartmentName: "",
};

const DepartmentForFeeStructure = () => {
  const { SearchFields, FormFields, SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const [depId, setDepId] = useState(0);

  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
    getMasterDetailAllDropdown();
  }, []);

  function getMasterDetailAllDropdown() {
    const payload = {
      operationId: 1,
    };

    Setup_MasterDetails_All_Dropdowns(payload)
      .then((res) => {
        let data = {
          name: "Tables",
          value: res.data,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [{ field: "SetupDetailName", name: "Department" }];

  const handleSearchChange = (e) => {
    if (e.target.name === "DepartmentName") {
      let data = { name: e.target.name, value: e.target.selectedValue };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
      setDepId(e.target.value);
    } else {
      let data = { name: e.target.name, value: e.target.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    }
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.Tables?.filter(
            (x) => x.SetupMasterId == facultyTypeId
          )}
          label="Faculty Type"
          name="FacultyTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.FacultyTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.Tables?.filter(
            (x) =>
              x.SetupMasterId == departmentId &&
              x.parentid == SearchFields?.FacultyTypeID
          )}
          label="Department"
          name="DepartmentName"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={depId}
          disabled={!SearchFields?.FacultyTypeID}
          onChange={handleSearchChange}
          //   required
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      operationId: Search,
      setupMasterId: departmentId,
      setupDetailId: SearchFields?.SetupDetailId,
      parentId: SearchFields?.FacultyTypeID,
      setupDetailName: SearchFields?.DepartmentName,
      createdBy: decryptData(LOGINID, SessionStorage),
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
      setupDetailId: FormFields?.SetupDetailId,
      setupMasterId: departmentId,
      parentId: FormFields?.FacultyTypeID,
      setupDetailName: FormFields?.DepartmentName,
      createdBy: decryptData(LOGINID, SessionStorage),
      userIP: "192.168.1.104",
    };
    Setup_MasterDetails_Operation(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data[0].HasError === 0) {
          CustomSuccessAlert(res.data[0].Message);
          submitSearch();
        } else {
          CustomErrorMessage(res.data[0].Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      SetupDetailId: obj.SetupDetailId,
      DepartmentName: obj.SetupDetailName,
      FacultyTypeID: obj.ParentId,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          operationId: Delete,
          setupMasterId: departmentId,
          parentId: obj?.ParentId,
          setupDetailName: obj?.SetupDetailName,
          setupDetailId: obj?.SetupDetailId,
          createdBy: decryptData(LOGINID, SessionStorage),
          userIP: "192.168.1.104",
        };
        Setup_MasterDetails_Operation(payload)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res.data[0].HasError === 0) {
              CustomSuccessAlert(res.data[0].Message);
              submitSearch();
            } else {
              CustomErrorMessage(res.data[0].Message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const handleCancel = () => {
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  };

  const cancelSearch = () => {
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialSearchFields });
    setDepId(0);
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.Tables?.filter(
            (x) => x.SetupMasterId == facultyTypeId
          )}
          label="Faculty Type"
          name="FacultyTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.FacultyTypeID}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Department Name"
          name="DepartmentName"
          required
          onChange={handleAddChange}
          value={FormFields?.DepartmentName}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Department For Fee Structure"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      handleCancel={handleCancel}
      cancelSearch={cancelSearch}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default DepartmentForFeeStructure;
