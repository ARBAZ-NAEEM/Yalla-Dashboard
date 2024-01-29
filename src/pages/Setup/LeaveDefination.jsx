import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import Swal from "sweetalert2";
import {
  Select,
  employeeCategorySetupMasterId,
  gender,
  Delete,
  Search,
  SessionStorage,
} from "../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  Setup_LeaveDefinition_Operations,
  Setup_MasterDetails_All_Dropdowns,
} from "../../utils/Config";

import {
  SuccessAlert,
  AlreadyExistAlert,
  DeleteWithConfirmation,
} from "../../components/Alert";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import { decryptData } from "../../EncryptData";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  EmployeeCategory: "",
  GenderType: "",
  IsActive: false,
};
const initialFormFields = {
  EmployeeCategory: 0,
  GenderType: 0,
  IsActive: false,
  leaveDefId: 0,
  LeaveCount: new Array(0),
};

const Allowances = () => {
  const {
    SearchFields,
    FormFields,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const [dropDownList, setDropDownList] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    getRoles();
    getDropDown();
  }, []);

  function getRoles() {
    const payload = {
      operationId: Select,
      leaveDefId: 0,
      employeeCategoryId: 0,
      genderId: 0,
      casual: 0,
      earned: 0,
      medical: 0,
      maternity: 0,
      hajj: 0,
      umrah: 0,
      special: 0,
      official: 0,
      leaveWithoutPay: 0,
      casualCarryforward: true,
      earnedCarryforward: true,
      medicalCarryforward: true,
      maternityCarryforward: true,
      hajjCarryforward: true,
      umrahCarryforward: true,
      specialCarryforward: true,
      officialCarryforward: true,
      leaveWithoutPayCarryforward: true,
      createdBy: 0,
      modifiedBy: 0,
      isActive: true,
      userIp: "string",
    };
    Setup_LeaveDefinition_Operations(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        let leaveCountFalse = res.data.Table1;
        leaveCountFalse.map((x) => (x.Carryforward = false));
        FormFields.LeaveCount = leaveCountFalse;
        FormFields.EmployeeCategory = 0;
        FormFields.GenderType = 0;
        FormFields.leaveDefId = 0;
        FormFields.IsActive = false;
        dispatch({
          type: SET_ALL_CRUD_FROM_FIELDS,
          payload: FormFields,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

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
    { field: "Category", name: "Employee Category" },
    { field: "Gender", name: "Leaves" },
  ];

  const submitSearch = () => {
    const payload = {
      operationId: Search,
      leaveDefId: 0,
      employeeCategoryId: SearchFields?.EmployeeCategory,
      genderId: SearchFields?.GenderType,
      casual: 0,
      earned: 0,
      medical: 0,
      maternity: 0,
      hajj: 0,
      umrah: 0,
      special: 0,
      official: 0,
      leaveWithoutPay: 0,
      casualCarryforward: true,
      earnedCarryforward: true,
      medicalCarryforward: true,
      maternityCarryforward: true,
      hajjCarryforward: true,
      umrahCarryforward: true,
      specialCarryforward: true,
      officialCarryforward: true,
      leaveWithoutPayCarryforward: true,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      isActive: SearchFields?.IsActive,
      userIp: "string",
    };
    Setup_LeaveDefinition_Operations(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        FormFields.LeaveCount = res.data.Table1;
        FormFields.EmployeeCategory = 0;
        FormFields.GenderType = 0;
        FormFields.leaveDefId = 0;
        FormFields.IsActive = false;
        dispatch({
          type: SET_ALL_CRUD_FROM_FIELDS,
          payload: FormFields,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = (id) => {

    const payload = {
      operationId: id,
      leaveDefId: FormFields?.leaveDefId,
      employeeCategoryId: FormFields?.EmployeeCategory,
      genderId: FormFields?.GenderType,
      casual: FormFields?.LeaveCount[0].value,
      earned: FormFields?.LeaveCount[1].value,
      medical: FormFields?.LeaveCount[2].value,
      maternity: FormFields?.LeaveCount[3].value,
      hajj: FormFields?.LeaveCount[4].value,
      umrah: FormFields?.LeaveCount[5].value,
      special: FormFields?.LeaveCount[6].value,
      official: FormFields?.LeaveCount[7].value,
      leaveWithoutPay: FormFields?.LeaveCount[8].value,
      casualCarryforward: FormFields?.LeaveCount[0].Carryforward,
      earnedCarryforward: FormFields?.LeaveCount[1].Carryforward,
      medicalCarryforward: FormFields?.LeaveCount[2].Carryforward,
      maternityCarryforward: FormFields?.LeaveCount[3].Carryforward,
      hajjCarryforward: FormFields?.LeaveCount[4].Carryforward,
      umrahCarryforward: FormFields?.LeaveCount[5].Carryforward,
      specialCarryforward: FormFields?.LeaveCount[6].Carryforward,
      officialCarryforward: FormFields?.LeaveCount[7].Carryforward,
      leaveWithoutPayCarryforward: FormFields?.LeaveCount[8].Carryforward,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      isActive: FormFields?.IsActive,
      userIp: "string",
    };
    Setup_LeaveDefinition_Operations(payload)
      .then((res) => {
        if (res.data.Table[0].HasError == 0) {
          dispatch({type: RESET_FORM_FIELDS, payload:initialFormFields})
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
    let selectedLeave = FormFields?.LeaveCount;
    selectedLeave[0].value = obj.CasualLeaves;
    selectedLeave[1].value = obj.EarnedLeaves;
    selectedLeave[2].value = obj.MedicalLeaves;
    selectedLeave[3].value = obj.MaternityLeaves;
    selectedLeave[4].value = obj.HajjLeaves;
    selectedLeave[5].value = obj.UrmrahLeaves;
    selectedLeave[6].value = obj.SpecialLeaves;
    selectedLeave[7].value = obj.OfficialLeaves;
    selectedLeave[8].value = obj.LeaveWithOutPayLeaves;
    
    selectedLeave[0].Carryforward = obj.CasualCarryForward;
    selectedLeave[1].Carryforward = obj.EarnedCarryForward;
    selectedLeave[2].Carryforward = obj.MedicalCarryForward;
    selectedLeave[3].Carryforward = obj.MaternityCarryForward;
    selectedLeave[4].Carryforward = obj.HajjCarryForward;
    selectedLeave[5].Carryforward = obj.UrmrahCarryForward;
    selectedLeave[6].Carryforward = obj.SpecialCarryForward;
    selectedLeave[7].Carryforward = obj.OfficialCarryForward;
    selectedLeave[8].Carryforward = obj.LeaveWithOutPayCarryForward;
    let data1 = {
      leaveDefId: obj.leavedefid,
      GenderType: obj.GenderId,
      IsActive: obj.IsActive,
      EmployeeCategory: obj.EmployeeCategoryID,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data1 });
    let data = {
      name: "LeaveCount",
      value: selectedLeave,
    };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          leavedefid: obj.leavedefid,
          GenderId: obj.GenderId,
          EmployeeCategoryID: obj.EmployeeCategoryID,
          AnualLeaves: obj.AnualLeaves,
          CasualLeaves: obj.CasualLeaves,
          SickLeaves: obj.SickLeaves,
          PaternityLeaves: obj.PaternityLeaves,
          MaternityLeaves: obj.MaternityLeaves,
          DefaultLeaves1: obj.DefaultLeaves1,
          DefaultLeaves: obj.DefaultLeaves,
        };
        const payload = {
          operationId: Delete,
          leaveDefId: data.leavedefid,
          employeeCategoryId: data.EmployeeCategoryID,
          genderId: data.GenderId,
          annualLeaves: data.AnualLeaves,
          sickLeaves: data.SickLeaves,
          casualLeaves: data.CasualLeaves,
          // specialLeaves:  data.LeaveCount[3].value,
          maternityLeaves: data.MaternityLeaves,
          paternityLeaves: data.PaternityLeaves,
          defaultLeaves: data.DefaultLeaves,
          defaultLeaves1: data.DefaultLeaves,
          createdBy: decryptData(LOGINID, SessionStorage),
          modifiedBy: decryptData(LOGINID, SessionStorage),
          isActive: false,
          userIp: "string",
        };
        Setup_LeaveDefinition_Operations(payload)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res.data.Table[0].HasError === 0) {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
              getRoles();
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
    getRoles();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
    getRoles();
  };

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleTextChange = (e, item, index) => {
    let selectedLeave = FormFields.LeaveCount;
    let roleIndex = selectedLeave.findIndex(
      (x) => x.Name === item.SetupDetailName
    );
    selectedLeave[roleIndex].value = e.target.value;
    let data = {
      name: "LeaveCount",
      value: selectedLeave,
    };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    if (selectedLeave[roleIndex].value === "") {
      selectedLeave[roleIndex].value = 0;
      let data1 = {
        name: "LeaveCount",
        value: selectedLeave,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
      selectedLeave[roleIndex].Carryforward = false;
      let data = {
        name: "LeaveCount",
        value: selectedLeave,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
  };

  const handleCheckChange = (e, item, index) => {
    let selectedLeave = FormFields.LeaveCount;
    let roleIndex = selectedLeave?.findIndex(
      (x) => x.Name === item.SetupDetailName
    );
    if (selectedLeave[roleIndex].value > 0) {
      selectedLeave[roleIndex].Carryforward = e.target.value;
      let data = {
        name: "LeaveCount",
        value: selectedLeave,
      };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
  };

  const formPanel = (
    <Fragment>
      <Col lg="5" md="5" xs="12">
        <FormGroupSelect
          list={dropDownList.filter(
            (x) => x.SetupMasterId == employeeCategorySetupMasterId
          )}
          label="Employee Category"
          name="EmployeeCategory"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.EmployeeCategory}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          list={dropDownList?.filter((x) => x.SetupMasterId == gender)}
          label="Gender Type"
          name="GenderType"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.GenderType}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="is Active"
          name="IsActive"
          onChange={handleAddChange}
          value={FormFields?.IsActive}
        />
      </Col>
      {dropDownList
        .filter((x) => x.SetupMasterId == 1077)
        .map((item, index) => (
          <Fragment>
            <Col key={index} lg="6" md="6" xs="12">
              <FormGroupInput
                label={item.SetupDetailName}
                onChange={(e) => handleTextChange(e, item, index)}
                name="LeaveCount"
                value={
                  FormFields?.LeaveCount?.filter(
                    (x) => x.Name === item.SetupDetailName
                  )[0]?.value
                }
                isNumber="true"
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupCheckbox
                label="Carry Forward"
                name="LeaveCount"
                onChange={(e) => handleCheckChange(e, item, index)}
                value={
                  FormFields?.LeaveCount?.filter(
                    (x) => x.Name === item.SetupDetailName
                  )[0]?.Carryforward
                }
              />
            </Col>
          </Fragment>
        ))}
    </Fragment>
  );

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropDownList.filter(
            (x) => x.SetupMasterId == employeeCategorySetupMasterId
          )}
          label="Employee Category"
          name="EmployeeCategory"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.EmployeeCategory}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropDownList.filter((x) => x.SetupMasterId == gender)}
          label="Gender Type"
          name="GenderType"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.GenderType}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="is Active"
          name="IsActive"
          onChange={handleSearchChange}
          value={SearchFields?.IsActive}
        />
      </Col>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Leave Definition"
      buttonName="Add"
      // hideAction={false}
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

export default Allowances;
