import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Table,
  Row,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import {
  RESET_FORM_FIELDS,
  RESET_SEARCH_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import {
  ADM_EligibilityCriteriaDependency,
  Setup_ADM_FacultyDerpartmentFeeStructure,
  Setup_MasterDetails_All_Dropdowns,
} from "../../utils/Config";
import {
  admissionProgramId,
  facultyDepartmentProgramId,
  feesTypeId,
  programTypes,
  Search,
  Select,
  SessionStorage,
  Update,
} from "../../common/SetupMasterEnum";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import { CustomErrorMessage, CustomSuccessAlert } from "../../components/Alert";
import { decryptData } from "../../EncryptData";
import useSetupDetailList from "../../Hooks/useSetupDetailList";
import { onChange_Select_Department_Program } from "../../functions/generalFunctions";
import { LOGINID } from "../../utils/EncryptedConstants";

const FeeStructure = (props) => {
  const initialSearchFields = {
    OperationID: 0,
    ADMFeeStructureProgramID: 0,
    AcademicYearID: 0,
    CampusTypeID: 0,
    CampusCityID: 0,
    ProgramID: 0,
    ProgramTypeID: 0,
    AdmTypeID: 0,
    MajorID: 4184,
    AdmParticularID: 0,
    FacultyDeptID: 0,
    FacultyDeptProgramID: 0,
    Merit: 0,
    SelfFinance: 0,
    FeeTypeId: 0,
    IsActive: true,
    UserId: decryptData(LOGINID, SessionStorage),
    CreatedBy: decryptData(LOGINID, SessionStorage),
    ModifiedBy: decryptData(LOGINID, SessionStorage),
    UserIP: "192.168.",
  };

  const initialFormFields = {
    OperationID: 2,
    ADMFeeStructureProgramID: 0,
    AcademicYearID: 0,
    CampusTypeID: 1284,
    CampusCityID: 1644,
    ProgramID: 0,
    ProgramTypeID: 0,
    AdmTypeID: 4012,
    MajorID: 4184,
    AdmParticularID: 0,
    FacultyDeptID: 0,
    FacultyDeptProgramID: 0,
    Merit: 0,
    SelfFinance: 0,
    IsActive: true,
    FeeTypeId: 0,
    CreatedBy: decryptData(LOGINID, SessionStorage),
    ModifiedBy: decryptData(LOGINID, SessionStorage),
    UserIP: "192.168",
  };
  const { SearchFields, FormFields, SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const [dropdownList, setDropDownList] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [toggle, setToggle] = useState(false);

  const dispatch = useDispatch();
  const [FeesTypeList] = useSetupDetailList(feesTypeId);

  useEffect(() => {
    getFacultyDepartment();
    getDropDown();
    onChangeFacultyDepartmentId_ADM_EligibilityCriteriaDependency(5, 2, 4184);
  }, []);

  function getFacultyDepartment() {
    const payload = {
      ...initialSearchFields,
      OperationID: Search,
    };
    Setup_ADM_FacultyDerpartmentFeeStructure(payload)
      .then((res) => {
        let departmentName = {
          name: "departmentName",
          value: res?.data?.Table2,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: departmentName,
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

  const submitSearch = () => {
    const payload = {
      OperationID: Search,
      AdmFeeStructureProgramID: 0,
      AcademicYearID: SearchFields?.AcademicYearID,
      CampusTypeID: 1284,
      CampusCityID: 1644,
      ProgramID: SearchFields?.ProgramID,
      ProgramTypeID: SearchFields?.ProgramTypeID,
      AdmTypeID: 4012,
      MajorID: 4184,
      AdmParticularID: SearchFields?.AdmParticularID,
      FacultyDeptID: SearchFields?.FacultyDeptID,
      FacultyDeptProgramID: SearchFields?.FacultyDeptProgramID,
      Merit: SearchFields?.Merit,
      SelfFinance: SearchFields?.SelfFinance,
      FeeTypeId: SearchFields?.FeeTypeId,
      IsActive: SearchFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: decryptData(LOGINID, SessionStorage),
      UserIP: "192.168",
    };
    Setup_ADM_FacultyDerpartmentFeeStructure(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data,
            FormFields: initialFormFields,
            SearchFields: SearchFields,
          },
        });
        setShowTable(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = (id) => {
    const payload = {
      OperationID: id,
      AdmFeeStructureProgramID: 0,
      AcademicYearID: FormFields?.AcademicYearID,
      CampusTypeID: 1284,
      CampusCityID: 1644,
      ProgramID: FormFields?.ProgramID,
      ProgramTypeID: FormFields?.ProgramTypeID,
      AdmTypeID: 4012,
      MajorID: 4184,
      AdmParticularID: FormFields?.AdmParticularID,
      FacultyDeptID: FormFields?.FacultyDeptID,
      FacultyDeptProgramID: FormFields?.FacultyDeptProgramID,
      Merit: FormFields?.Merit,
      SelfFinance: FormFields?.SelfFinance,
      IsActive: FormFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: decryptData(LOGINID, SessionStorage),
      FeeTypeId: FormFields?.FeeTypeId,
      UserIP: "192.168",
    };
    Setup_ADM_FacultyDerpartmentFeeStructure(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Column1);
        } else {
          CustomErrorMessage(res.data.Table[0].Column1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const cancelSearch = () => {
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialSearchFields });
    setShowTable(false);
  };

  const handleCancel = () => {
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
  };

  const columns = [{ field: "TimeIn", name: "No Data" }];

  const onEditInOutRow = (e, item, type) => {
    e.preventDefault();
    onChangeFacultyDepartmentId_ADM_EligibilityCriteriaDependency(5, 2, 4184);
    let ind = TableList?.Table?.findIndex(
      (x) => x.ADMFeeStructureProgramID === item.ADMFeeStructureProgramID
    );
    let obj;
    if (type === "AdmissionFee") {
      obj = TableList?.Table[ind];
      setToggle(true);
    } else if (type === "TuitionFee") {
      obj = TableList?.Table[ind];
      setToggle(true);
    } else if (type === "UniversityDevelopmentFund") {
      obj = TableList?.Table[ind];
      setToggle(true);
    } else if (type === "ExaminationFormFee") {
      obj = TableList?.Table[ind];
      setToggle(true);
    } else if (type === "SportsFee") {
      obj = TableList?.Table[ind];
      setToggle(true);
    } else if (type === "LibraryFee") {
      obj = TableList?.Table[ind];
      setToggle(true);
    } else if (type === "IDCardFee") {
      obj = TableList?.Table[ind];
      setToggle(true);
    }
    FormFields.ADMFeeStructureProgramID = obj?.ADMFeeStructureProgramID;
    FormFields.AcademicYearID = obj?.AcademicYearID;
    FormFields.ProgramID = obj?.ProgramID;
    FormFields.ProgramTypeID = obj?.ProgramTypeID;
    FormFields.AdmParticularID = obj?.AdmParticularID;
    FormFields.FacultyDeptID = obj?.FacultyDeptID;
    FormFields.FacultyDeptProgramID = obj?.FacultyDeptProgramID;
    FormFields.Merit = obj?.Merit;
    FormFields.SelfFinance = obj?.SelfFinance;
    FormFields.SemesterID = obj?.SemesterID;
    FormFields.IsActive = obj?.IsActive;
    FormFields.FeeTypeId = obj?.FeeTypeId;
  };

  const handleSearchChange = (e) => {
    // if (e.target.name === "MajorID") {
    //   let data = { name: e.target.name, value: e.target.value };
    //   dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    //   let data1 = { name: "FacultyDeptID", value: 0 };
    //   dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    //   let data2 = { name: "FacultyDeptProgramID", value: 0 };
    //   dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data2 });
    //   onChangeFacultyDepartmentId_ADM_EligibilityCriteriaDependency(
    //     5,
    //     2,
    //     e.target.value
    //   );
    // // }

    // if (e.target.name === "FacultyDeptID") {
    //   onChangeFacultyDepartmentId_ADM_EligibilityCriteriaDependency(
    //     5,
    //     3,
    //     e.target.value
    //   );
    //   let data = { name: e.target.name, value: e.target.value };
    //   dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    //   let data1 = { name: "FacultyDeptProgramID", value: 0 };
    //   dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
    // } else {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    // }
  };

  const onChangeFacultyDepartmentId_ADM_EligibilityCriteriaDependency = (
    operationID,
    CaseID,
    ParameterID
  ) => {
    let payload = {
      operationID: operationID,
      caseID: CaseID,
      paremeterID: ParameterID,
    };
    ADM_EligibilityCriteriaDependency(payload)
      .then((res) => {
        if (CaseID == 2) {
          let data = { name: "FacultyDepartment", value: res.data };
          dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
        } else if (CaseID == 3) {
          let data = { name: "FacultyDepartmentProgramId", value: res.data };
          dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == 1136)}
          label="Academic Year"
          name="AcademicYearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.AcademicYearID}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == admissionProgramId
          )}
          label="Program"
          name="ProgramID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.ProgramID}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == programTypes && x.parentid == 1644
          )}
          label="Program Type"
          name="ProgramTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.ProgramTypeID}
          required
        />
      </Col>
      {/* <Col md="3" lg="3">
        <FormGroupSelect
          label="Intermediate Majors"
          name="MajorID"
          list={SupportingTables?.MajorIds?.Table}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.MajorID}
          onChange={handleSearchChange}
          required
        />
      </Col> */}

      <Col md="3" lg="3">
        <FormGroupSelect
          label="Faculty Department"
          name="FacultyDeptID"
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
          onChange={async (e) => {
            onChange_Select_Department_Program({
              operationID: 6,
              caseID: 3,
              paremeterID: e.target.value,
            }).then((res) => {
              dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
            });
            handleSearchChange(e);
          }}
          // list={SupportingTables?.FacultyDepartment?.Table}
          // fieldId="SetupDetailId"
          // fieldName="SetupDetailName"
          value={SearchFields?.FacultyDeptID}
          // onChange={handleSearchChange}
          required
        />
      </Col>
      <Col md="3" lg="3">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDeptProgramID"
          list={SupportingTables?.Programs}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={SearchFields?.FacultyDeptProgramID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      {/* <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={FeesTypeList}
          label="Fees Type"
          name="FeeTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.FeeTypeId}
        />
      </Col> */}
    </Fragment>
  );

  const handleAddChange = (e) => {
    // if (e.target.name === "MajorID") {
    //   let data = { name: e.target.name, value: e.target.value };
    //   dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    //   let data1 = { name: "FacultyDeptID", value: 0 };
    //   dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
    //   let data2 = { name: "FacultyDeptProgramID", value: 0 };
    //   dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data2 });
    //   onChangeFacultyDepartmentId_ADM_EligibilityCriteriaDependency(
    //     5,
    //     2,
    //     e.target.value
    //   );
    // }
    // if (e.target.name === "FacultyDeptID") {
    //   onChangeFacultyDepartmentId_ADM_EligibilityCriteriaDependency(
    //     5,
    //     3,
    //     e.target.value
    //   );
    //   let data = { name: e.target.name, value: e.target.value };
    //   dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    //   let data1 = { name: "FacultyDeptProgramID", value: 0 };
    //   dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
    // } else {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    // }
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter((x) => x.SetupMasterId == 1136)}
          label="Academic Year"
          name="AcademicYearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.AcademicYearID}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == admissionProgramId
          )}
          label="Program"
          name="ProgramID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.ProgramID}
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={dropdownList?.filter(
            (x) => x.SetupMasterId == programTypes && x.parentid == 1644
          )}
          label="Program Type"
          name="ProgramTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.ProgramTypeID}
          required
        />
      </Col>
      <Col md="6" lg="6" xs="12">
        <FormGroupSelect
          label="Particular"
          name="AdmParticularID"
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == 1102
          )}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.AdmParticularID}
          onChange={handleAddChange}
          required
        />
      </Col>
      {/* <Col md="6" lg="6">
        <FormGroupSelect
          label="Intermediate Majors"
          name="MajorID"
          list={SupportingTables?.MajorIds?.Table}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.MajorID}
          onChange={handleAddChange}
          required
        />
      </Col> */}

      <Col md="6" lg="6">
        <FormGroupSelect
          label="Faculty Department"
          name="FacultyDeptID"
          list={SupportingTables?.departmentName}
          fieldName="Dept"
          fieldId="DeptID"
          onChange={async (e) => {
            onChange_Select_Department_Program({
              operationID: 6,
              caseID: 3,
              paremeterID: e.target.value,
            }).then((res) => {
              dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
            });
            handleAddChange(e);
          }}
          // list={SupportingTables?.FacultyDepartment?.Table}
          // fieldId="SetupDetailId"
          // fieldName="SetupDetailName"
          // value={FormFields?.FacultyDeptID}
          // onChange={handleAddChange}
          required
        />
      </Col>
      <Col md="6" lg="6">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDeptProgramID"
          list={SupportingTables?.Programs}
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          value={FormFields?.FacultyDeptProgramID}
          onChange={handleAddChange}
          required
        />
      </Col>
      {/* <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={FeesTypeList}
          label="Fees Type"
          name="FeeTypeId"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.FeeTypeId}
          required
        />
      </Col> */}
      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          value={FormFields?.IsActive}
          onChange={handleAddChange}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Merit Amount"
          name="Merit"
          onChange={handleAddChange}
          value={FormFields?.Merit}
          isNumber="true"
          required
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Self Finance Amount"
          name="SelfFinance"
          onChange={handleAddChange}
          value={FormFields?.SelfFinance}
          isNumber="true"
          required
        />
      </Col>
    </Fragment>
  );

  const customTable = (
    <Table className="table-bordered table-striped admission-table">
      <thead>
        <tr>
          <th rowSpan="3">S#</th>
          <th rowSpan="3">Fee Type</th>
          <th rowSpan="3">Particulars</th>
          {/* <th colSpan="8">{TableList?.Table6?.[0]?.Department}</th> */}
        </tr>

        <tr>
          <th
            style={{ backgroundColor: "#782849", color: "white" }}
            colSpan="2"
          >
            {TableList?.Table?.[0]?.FacultyDeptProgram}
          </th>
        </tr>

        <tr>
          <th>Merit</th>
          <th>Self</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>1</td>
          <td>{TableList?.Table?.[0]?.FeeType}</td>
          <td>
            {TableList?.Table?.[0]?.AdmParticular == undefined
              ? "N/A"
              : TableList?.Table?.[0]?.AdmParticular}
          </td>
          <td>
            {TableList?.Table?.[0]?.Merit}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[0], "AdmissionFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
          <td>
            {TableList?.Table?.[0]?.SelfFinance}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[0], "AdmissionFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
        </tr>

        <tr>
          <td>2</td>
          <td>{TableList?.Table?.[1]?.FeeType}</td>
          <td>
            {TableList?.Table?.[1]?.AdmParticular == undefined
              ? "N/A"
              : TableList?.Table?.[1]?.AdmParticular}
          </td>
          <td>
            {TableList?.Table?.[1]?.Merit}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[1], "TuitionFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
          <td>
            {TableList?.Table?.[1]?.SelfFinance}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[1], "TuitionFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
        </tr>
        <tr>
          <td>3</td>
          <td>{TableList?.Table?.[2]?.FeeType}</td>
          <td>
            {TableList?.Table?.[2]?.AdmParticular == undefined
              ? "N/A"
              : TableList?.Table?.[2]?.AdmParticular}
          </td>
          <td>
            {TableList?.Table?.[2]?.Merit}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(
                      e,
                      TableList?.Table?.[2],
                      "UniversityDevelopmentFund"
                    )
                  }
                ></i>
              </a>
            ) : null}
          </td>
          <td>
            {TableList?.Table?.[2]?.SelfFinance}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(
                      e,
                      TableList?.Table?.[2],
                      "UniversityDevelopmentFund"
                    )
                  }
                ></i>
              </a>
            ) : null}
          </td>
        </tr>
        <tr>
          <td>4</td>
          <td>{TableList?.Table?.[3]?.FeeType}</td>
          <td>
            {TableList?.Table?.[3]?.AdmParticular == undefined
              ? "N/A"
              : TableList?.Table?.[3]?.AdmParticular}
          </td>
          <td>
            {TableList?.Table?.[3]?.Merit}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(
                      e,
                      TableList?.Table?.[3],
                      "ExaminationFormFee"
                    )
                  }
                ></i>
              </a>
            ) : null}
          </td>
          <td>
            {TableList?.Table?.[3]?.SelfFinance}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(
                      e,
                      TableList?.Table?.[3],
                      "ExaminationFormFee"
                    )
                  }
                ></i>
              </a>
            ) : null}
          </td>
        </tr>
        <tr>
          <td>5</td>
          <td>{TableList?.Table?.[4]?.FeeType}</td>
          <td>
            {TableList?.Table?.[4]?.AdmParticular == undefined
              ? "N/A"
              : TableList?.Table?.[4]?.AdmParticular}
          </td>
          <td>
            {TableList?.Table?.[4]?.Merit}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[4], "SportsFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
          <td>
            {TableList?.Table?.[4]?.SelfFinance}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[4], "SportsFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
        </tr>
        <tr>
          <td>6</td>
          <td>{TableList?.Table?.[5]?.FeeType}</td>
          <td>
            {TableList?.Table?.[5]?.AdmParticular == undefined
              ? "N/A"
              : TableList?.Table?.[5]?.AdmParticular}
          </td>
          <td>
            {TableList?.Table?.[5]?.Merit}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[5], "LibraryFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
          <td>
            {TableList?.Table?.[5]?.SelfFinance}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[5], "LibraryFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
        </tr>
        <tr>
          <td>7</td>
          <td>{TableList?.Table?.[6]?.FeeType}</td>
          <td>
            {TableList?.Table?.[6]?.AdmParticular == undefined
              ? "N/A"
              : TableList?.Table?.[6]?.AdmParticular}
          </td>
          <td>
            {TableList?.Table?.[6]?.Merit}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[6], "IDCardFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
          <td>
            {TableList?.Table?.[6]?.SelfFinance}
            {menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu).some(
              (x) => x.FeatureId === 2
            ) ? (
              <a href="">
                {" "}
                <i
                  className="fa fa-pencil p-0"
                  onClick={(e) =>
                    onEditInOutRow(e, TableList?.Table?.[6], "IDCardFee")
                  }
                ></i>
              </a>
            ) : null}
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td>Total</td>
          <td>
            {" "}
            {TableList?.Table1?.[0]?.T_MERIT == undefined
              ? "N/A"
              : TableList?.Table1?.[0]?.T_MERIT}
          </td>
          <td>
            {" "}
            {TableList?.Table1?.[0]?.T_SELFFINANCE == undefined
              ? "N/A"
              : TableList?.Table1?.[0]?.T_SELFFINANCE}
          </td>
        </tr>
      </tbody>
    </Table>
  );

  const handleModalSave = (e) => {
    e.preventDefault();
    const payload = {
      OperationID: Update,
      ADMFeeStructureProgramID: FormFields?.ADMFeeStructureProgramID,
      AcademicYearID: FormFields?.AcademicYearID,
      CampusTypeID: 1284,
      CampusCityID: 1644,
      ProgramID: FormFields?.ProgramID,
      ProgramTypeID: FormFields?.ProgramTypeID,
      AdmTypeID: 4012,
      MajorID: 4184,
      AdmParticularID: FormFields?.AdmParticularID,
      FacultyDeptID: FormFields?.FacultyDeptID,
      FacultyDeptProgramID: FormFields?.FacultyDeptProgramID,
      Merit: FormFields?.Merit,
      SelfFinance: FormFields?.SelfFinance,
      IsActive: FormFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: decryptData(LOGINID, SessionStorage),
      UserIP: "192.168",
      FeeTypeId: FormFields?.FeeTypeId,
    };
    Setup_ADM_FacultyDerpartmentFeeStructure(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data.Table[0].HasError === 0) {
          CustomSuccessAlert(res.data.Table[0].Column1);
          handleAfterEditFee();
          setToggle(false);
        } else {
          CustomErrorMessage(res.data.Table[0].Column1);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAfterEditFee = () => {
    const payload = {
      OperationID: Search,
      AdmFeeStructureProgramID: 0,
      AcademicYearID: SearchFields?.AcademicYearID,
      CampusTypeID: 1284,
      CampusCityID: 1644,
      ProgramID: SearchFields?.ProgramID,
      ProgramTypeID: SearchFields?.ProgramTypeID,
      AdmTypeID: 4012,
      MajorID: 4184,
      AdmParticularID: SearchFields?.AdmParticularID,
      FacultyDeptID: SearchFields?.FacultyDeptID,
      FacultyDeptProgramID: SearchFields?.FacultyDeptProgramID,
      Merit: SearchFields?.Merit,
      SelfFinance: SearchFields?.SelfFinance,
      IsActive: SearchFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: decryptData(LOGINID, SessionStorage),
      userIP: "192.168",
    };
    Setup_ADM_FacultyDerpartmentFeeStructure(payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data,
            FormFields: initialFormFields,
            SearchFields: SearchFields,
          },
        });
        setShowTable(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCloseModal = () => {
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    setToggle(false);
  };

  const customModal = (
    <Modal
      isOpen={toggle}
      centered
      modalTransition={{ timeout: 10 }}
      backdrop="static"
    >
      <ModalHeader>Add/Edit Department Fee Structure</ModalHeader>
      <ModalBody>
        <form onSubmit={handleModalSave}>
          {formPanel && (
            <Row>
              <Col lg="6" md="6" xs="12">
                <FormGroupSelect
                  list={dropdownList?.filter((x) => x.SetupMasterId == 1136)}
                  label="Academic Year"
                  name="AcademicYearID"
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  onChange={handleAddChange}
                  value={FormFields?.AcademicYearID}
                  required
                  disabled
                />
              </Col>
              <Col lg="6" md="6" xs="12">
                <FormGroupSelect
                  list={dropdownList?.filter(
                    (x) => x.SetupMasterId == admissionProgramId
                  )}
                  label="Program"
                  name="ProgramID"
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  onChange={handleAddChange}
                  value={FormFields?.ProgramID}
                  required
                  disabled
                />
              </Col>
              <Col lg="6" md="6" xs="12">
                <FormGroupSelect
                  list={dropdownList?.filter(
                    (x) => x.SetupMasterId == programTypes && x.parentid == 1644
                  )}
                  label="Program Type"
                  name="ProgramTypeID"
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  onChange={handleAddChange}
                  value={FormFields?.ProgramTypeID}
                  required
                  disabled
                />
              </Col>
              <Col md="6" lg="6" xs="12">
                <FormGroupSelect
                  label="Particular"
                  name="AdmParticularID"
                  list={SupportingTables?.MasterDropdown?.filter(
                    (x) => x.SetupMasterId == 1102
                  )}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  value={FormFields?.AdmParticularID}
                  onChange={handleAddChange}
                  required
                  disabled
                />
              </Col>
              {/* <Col md="6" lg="6">
                <FormGroupSelect
                  label="Intermediate Majors"
                  name="MajorID"
                  list={SupportingTables?.MasterDropdown?.filter(
                    (x) => x.SetupMasterId == majorsAdId && x.parentid == 4012
                  )}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  value={FormFields?.MajorID}
                  onChange={handleAddChange}
                  required
                  disabled
                />
              </Col> */}

              <Col md="6" lg="6">
                <FormGroupSelect
                  label="Faculty Department"
                  name="FacultyDeptID"
                  list={SupportingTables?.FacultyDepartment?.Table}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  value={FormFields?.FacultyDeptID}
                  onChange={handleAddChange}
                  required
                  disabled
                />
              </Col>
              <Col md="6" lg="6">
                <FormGroupSelect
                  label="Faculty Department Program"
                  name="FacultyDeptProgramID"
                  list={SupportingTables?.MasterDropdown?.filter(
                    (x) =>
                      x.SetupMasterId == facultyDepartmentProgramId &&
                      x.parentid == FormFields?.FacultyDeptID
                  )}
                  fieldId="SetupDetailId"
                  fieldName="SetupDetailName"
                  value={FormFields?.FacultyDeptProgramID}
                  onChange={handleAddChange}
                  required
                  disabled
                />
              </Col>
              <Col lg="6" md="6" xs="12">
                <FormGroupCheckbox
                  label=" Is Active"
                  name="IsActive"
                  value={FormFields?.IsActive}
                  onChange={handleAddChange}
                  disabled
                />
              </Col>
              <Col lg="6" md="6" xs="12">
                <FormGroupInput
                  label="Merit Amount"
                  name="Merit"
                  onChange={handleAddChange}
                  value={FormFields?.Merit}
                  isNumber="true"
                  required
                />
              </Col>
              <Col lg="6" md="6" xs="12">
                <FormGroupInput
                  label="Self Finance Amount"
                  name="SelfFinance"
                  onChange={handleAddChange}
                  value={FormFields?.SelfFinance}
                  isNumber="true"
                  required
                />
              </Col>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button color="primary" type="submit">
                  Save
                </Button>
                <Button color="default" onClick={handleCloseModal}>
                  Cancel
                </Button>
              </div>
            </Row>
          )}
        </form>
      </ModalBody>
    </Modal>
  );

  const customMessage = (
    <div className="text-center">
      <h3>Please Search</h3>
    </div>
  );

  return (
    <Fragment>
      <CrudFormComponent
        formName="Department Fee Structure"
        buttonName="Add"
        hideAction={false}
        tableColumns={columns}
        tableRows={TableList}
        searchPanel={searchPanel}
        formPanel={formPanel}
        formSubmit={submitForm}
        searchSubmit={submitSearch}
        initialFormFields={initialFormFields}
        featureList={menuTable?.Table2?.filter(
          (x) => x.MenuId === selectedMenu
        )}
        cancelSearch={cancelSearch}
        handleCancel={handleCancel}
        customTable={showTable === true ? customTable : customMessage}
        customModal={customModal}
      />
    </Fragment>
  );
};

export default FeeStructure;
