import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  blockDepartmentId,
  campusCity,
  campusType,
  Delete,
  departmentId,
  facultyDepartmentId,
  facultyTypeId,
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
  Setup_Admission_Blocks,
  Setup_MasterDetails_All_Dropdowns,
  Setup_Setup_ADM_SeatType,
} from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  OperationId: 1,
  BlockDetailId: 0,
  CampusId: 0,
  CampusCityId: 0,
  DepartmentId: 0,
  BlockNumber_Name: "",
  TotalNumberofSeats: 0,
  IsActive: 1,
  IsDeleted: 0,
  UserId: 0,
};
const initialFormFields = {
  SeatupSeatID: 0,
  AdmissionTypeID: 0,
  FacultyID: 0,
  DepartmentID: 0,
  ProgramID: 0,
  ProgramTypeID: 0,
  SeatTypeID: 0,
  QuotaID: 0,
  SeatNumber: "",
};

const Blocks = () => {
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
    getBlockData();
    getDropDown();
  }, []);

  const getBlockData = () => {
    Setup_Admission_Blocks(initialSearchFields)
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
    { field: "BlockNumber_Name", name: "Block Name" },
    { field: "CampusName", name: "Campus Name" },
    { field: "CampusCityName", name: "City Name" },

    // { field: "RemaningSeats", name: "Remaning Seats" },
    { field: "TotalSeats", name: "Total Seats" },
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
          list={dropdownList?.filter((x) => x.SetupMasterId == campusType)}
          label="Campus Type"
          name="CampusId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.CampusId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == campusCity &&
              x.parentid == SearchFields?.CampusId
          )}
          label="Campus City"
          name="CampusCityId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.CampusCityId}
          onChange={handleSearchChange}
          required
        />
      </Col>
      {/* <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == blockDepartmentId
          )}
          label="Department "
          name="DepartmentId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.DepartmentId}
          onChange={handleSearchChange}
          required
        />
      </Col> */}
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      OperationId: 1,
      BlockDetailId: 0,
      CampusId: SearchFields?.CampusId,
      CampusCityId: SearchFields?.CampusCityId,
      DepartmentId: 0,
      BlockNumber_Name: "",
      TotalNumberofSeats: 0,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };

    Setup_Admission_Blocks(payload)
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
      OperationId: id,
      BlockDetailId: FormFields?.BlockDetailId,
      CampusId: FormFields?.CampusId,
      CampusCityId: FormFields?.CampusCityId,
      DepartmentId: 0,
      BlockNumber_Name: FormFields?.BlockNumber_Name,
      TotalNumberofSeats: FormFields?.TotalNumberofSeats,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };

    Setup_Admission_Blocks(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].Haserror === 0) {
          CustomSuccessAlert(res.data.Table[0].Message);
          getBlockData();
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
      BlockDetailId: obj.BlockDetailId,
      CampusId: obj.CampusId,
      CampusCityId: obj.CampusCityId,
      DepartmentId: obj.DepartmentId,
      BlockNumber_Name: obj.BlockNumber_Name,
      TotalNumberofSeats: obj.TotalSeats,
      IsActive: 1,
      IsDeleted: 0,
      UserId: decryptData(LOGINID, SessionStorage),
    };

    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const data = {
          OperationId: Delete,
          BlockDetailId: obj.BlockDetailId,
          CampusId: obj.CampusId,
          CampusCityId: obj.CampusCityId,
          DepartmentId: obj.DepartmentId,
          BlockNumber_Name: obj.BlockNumber_Name,
          TotalNumberofSeats: obj.TotalSeats,
          IsActive: 0,
          IsDeleted: 0,
          UserId: decryptData(LOGINID, SessionStorage),
        };

        Setup_Admission_Blocks(data)
          .then((res) => {
            if (res.data.Table[0].Haserror === 0) {
              CustomSuccessAlert(res.data.Table[0].Message);
              getBlockData();
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
    getBlockData();
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
          list={dropdownList?.filter((x) => x.SetupMasterId == campusType)}
          label="Campus Type"
          name="CampusId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.CampusId}
          onChange={handleAddChange}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) =>
              x.SetupMasterId == campusCity &&
              x.parentid == FormFields?.CampusId
          )}
          label="Campus City"
          name="CampusCityId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.CampusCityId}
          onChange={handleAddChange}
          required
        />
      </Col>
      {/* <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == blockDepartmentId
          )}
          label="Department "
          name="DepartmentId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.DepartmentId}
          onChange={handleAddChange}
          required
        />
      </Col> */}
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Name of Block"
          name="BlockNumber_Name"
          required
          onChange={handleAddChange}
          value={FormFields?.BlockNumber_Name}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Total Number of Seats"
          name="TotalNumberofSeats"
          maxLength="150"
          required
          isNumber="true"
          onChange={handleAddChange}
          value={FormFields?.TotalNumberofSeats}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Blocks"
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

export default Blocks;
