import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import {
  academicYearId,
  campusCity,
  campusType,
  Delete,
  Insert,
  partYearID,
  Search,
  Select,
  semesterId,
  SessionStorage,
  undergraduateId,
  Update,
} from "../../../common/SetupMasterEnum";
import {
  AlreadyExistAlert,
  CustomErrorMessage,
  CustomSuccessAlert,
  DeleteAlert,
  DeleteWithConfirmation,
  SuccessAlert,
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import {
  apiErrorChecker,
  getUserIPInfo,
  onChange_Select_Department_Program,
} from "../../../functions/generalFunctions";
import useSetupDetailList from "../../../Hooks/useSetupDetailList";
import { RESET_FORM_FIELDS } from "../../../redux/actionType/AuthType";
import {
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest, Setup_Setup_ADM_Course } from "../../../utils/Config";
import {
  SETUPFACULTYDEPARTMENTPROGRAMLECTURER,
  SETUP_SUPPLY_IMPROVEMENT_FEE_STRUCTURE,
} from "../../../utils/UrlConstants";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";
import { dateFormatPlaceholder } from "../../../common/dateFormatEnum";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import { formatDateFunction1 } from "../../../functions/DateFormatFunction";
// import Select from "react-select";

const SupplyImprovementFeeStructure = () => {
  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );

  const [selectedOption, setSelectedOption] = useState(null);

  const intialFormSupplyImprovementFeeStructure = [
    {
      supplyImprovementFeeID: 0,
      academicYearID: 0,
      programID: 0,
      campusCityID: 0,
      partID: 0,
      semesterID: 0,
      departmentID: 0,
      departmentProgramID: 0,
      courseID: 0,
      effectiveFrom: "2023-05-10T14:22:05.650Z",
      effectiveTo: "2023-05-10T14:22:05.650Z",
      amount: 0,
    },
  ];

  const intialSearchSupplyImprovementFeeStructure = [
    {
      supplyImprovementFeeID: 0,
      academicYearID: 0,
      programID: 0,
      campusCityID: 0,
      partID: 0,
      semesterID: 0,
      departmentID: 0,
      departmentProgramID: 0,
      courseID: 0,
      effectiveFrom: "2023-05-10T14:22:05.650Z",
      effectiveTo: "2023-05-10T14:22:05.650Z",
      amount: 0,
    },
  ];

  const [
    formSupplyImprovementFeeStructure,
    setFormSupplyImprovementFeeStructure,
  ] = useState(intialFormSupplyImprovementFeeStructure);

  const [
    searchSupplyImprovementFeeStructure,
    setSearchSupplyImprovementFeeStructure,
  ] = useState(intialSearchSupplyImprovementFeeStructure);

  const intialFields = {
    supplyImprovementFeeID: 0,
    academicYearID: 0,
    AcademicYear: "",
    programID: undergraduateId,
    campusCityID: 1644,
    partID: 0,
    Part: "",
    semesterID: 0,
    Semester: "",
    departmentID: 0,
    Department: "",
    departmentProgramID: 0,
    DepartmentProgram: "",
    courseID: 0,
    effectiveFrom: "2023-05-10T14:22:05.650Z",
    effectiveTo: "2023-05-10T14:22:05.650Z",
    amount: 0,
  };

  const [modalArray, setModalArray] = useState(intialFields);
  const [modalData, setModalData] = useState([]);

  const initialSearchFields = {
    operationID: Search,
    pageNumber: 1,
    rowsOfPage: 10,
    supplyImprovementFeeID: 0,
    userID: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
    supplyImprovementFeeStructure: searchSupplyImprovementFeeStructure,
  };

  const initialFormFields = {
    operationID: Search,
    pageNumber: 1,
    rowsOfPage: 10,
    supplyImprovementFeeID: 0,
    userID: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
    supplyImprovementFeeStructure: formSupplyImprovementFeeStructure,
  };

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [academicYearList] = useSetupDetailList(academicYearId);
  const [campusCityList] = useSetupDetailList(campusCity, FormFields?.campusID);
  const [campusList] = useSetupDetailList(campusType);
  const [Semester] = useSetupDetailList(semesterId);
  const [PartYear] = useSetupDetailList(partYearID);

  const [toggleForm, setToggleForm] = useState(false);
  const [onClickEditToggle, setOnClickEditToggle] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    getSupplyImprovementFeeStructure();
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 2,
      paremeterID: 0,
    }).then((res) =>
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res })
    );
  }, []);

  function getSupplyImprovementFeeStructure() {
    PostRequest(SETUP_SUPPLY_IMPROVEMENT_FEE_STRUCTURE, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              EffectiveFrom: formatDateFunction1(x.EffectiveFrom, "-"),
              EffectiveTo: formatDateFunction1(x.EffectiveTo, "-"),
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
    { field: "CampusCity", name: "Campus City" },
    { field: "AcademicYear", name: "Academic Year" },
    { field: "Program", name: "Program" },
    { field: "Department", name: "Department" },
    { field: "DepartmentProgram", name: "Department Program" },
    { field: "Part", name: "Part" },
    { field: "Semester", name: "Semester" },
    { field: "EffectiveFrom", name: "Effective From" },
    { field: "EffectiveTo", name: "Effective To" },
    { field: "Amount", name: "Amount" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Campus"
          name="CampusID"
          onChange={handleSearchChange}
          value={SearchFields?.CampusID}
          list={campusList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Campus City"
          name="CampusCityID"
          onChange={handleSearchChange}
          value={SearchFields?.CampusCityID}
          list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>

      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="FacultyDepartmentID"
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
          value={SearchFields?.FacultyDepartmentID}
          list={SupportingTables?.Departments}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="FacultyDepartmentProgramID"
          onChange={handleSearchChange}
          value={SearchFields?.FacultyDepartmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          required
          disabled={SearchFields?.FacultyDepartmentID == null}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Employee"
          name="EmployeeID"
          onChange={handleSearchChange}
          value={SearchFields?.EmployeeID}
          //   list={campusCityList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
        />
      </Col>
      <Col lg="1" md="1" xs="12">
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
    console.log(SearchFields);
  };

  const onEditRow = (obj) => {
    setOnClickEditToggle(true);
    onChange_Select_Department_Program({
      operationID: 6,
      caseID: 3,
      paremeterID: obj.DepartmentID,
    }).then((res) => {
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
    });
    setModalArray({
      ...intialFields,
      supplyImprovementFeeID: obj?.SupplyImprovementFeeID,
      academicYearID: obj?.AcademicYearID,
      AcademicYear: obj?.AcademicYear,
      programID: undergraduateId,
      campusCityID: obj?.CampusCityID,
      partID: obj?.PartID,
      Part: obj?.Part,
      semesterID: obj?.SemesterID,
      Semester: obj?.Semester,
      departmentID: obj?.DepartmentID,
      Department: obj?.Department,
      departmentProgramID: obj?.DepartmentProgramID,
      DepartmentProgram: obj?.DepartmentProgram,
      courseID: obj?.CourseID,
      effectiveFrom: obj?.EffectiveFrom,
      effectiveTo: obj?.EffectiveTo,
      amount: obj?.Amount,
    });
    setToggleForm(true);
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          operationID: Delete,
          pageNumber: 1,
          rowsOfPage: 10,
          supplyImprovementFeeID: 0,
          userID: decryptData(LOGINID, SessionStorage),
          userIP: decryptData(UserNetworkInfo)?.IPv4,
          supplyImprovementFeeStructure: [
            {
              supplyImprovementFeeID: obj?.SupplyImprovementFeeID,
              academicYearID: obj?.AcademicYearID,
              programID: undergraduateId,
              campusCityID: obj?.CampusCityID,
              partID: obj?.PartID,
              semesterID: obj?.SemesterID,
              departmentID: obj?.DepartmentID,
              departmentProgramID: obj?.DepartmentProgramID,
              courseID: obj?.CourseID,
              effectiveFrom: obj?.EffectiveFrom,
              effectiveTo: obj?.EffectiveTo,
              amount: obj?.Amount,
            },
          ],
        };
        PostRequest(SETUP_SUPPLY_IMPROVEMENT_FEE_STRUCTURE, payload)
          .then((res) => {
            if (res?.data?.Table?.[0]?.HasError === 0) {
              CustomSuccessAlert(res?.data?.Table?.[0]?.Message);
              getSupplyImprovementFeeStructure();
            } else {
              CustomErrorMessage(res?.data?.Table?.[0]?.Message);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const handleModalArrayChange = (event) => {
    if (
      event.target.name === "effectiveTo" ||
      event.target.name === "effectiveFrom"
    ) {
      setModalArray({
        ...modalArray,
        [event.target.name]: event.target.value,
      });
    } else {
      setModalArray({
        ...modalArray,
        [event.target.name]: event.target.value,
        [event.target.selectedName]: event.target.selectedValue,
      });
    }
  };

  const cancelSearch = () => {
    dispatch({
      type: RESET_SEARCH_FIELDS,
      payload: initialSearchFields,
    });
    getSupplyImprovementFeeStructure();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (modalData?.length > 0 || onClickEditToggle === true) {
      const payload = {
        operationID: onClickEditToggle === true ? Update : Insert,
        pageNumber: 1,
        rowsOfPage: 10,
        supplyImprovementFeeID: 0,
        userID: decryptData(LOGINID, SessionStorage),
        userIP: decryptData(UserNetworkInfo)?.IPv4,
        supplyImprovementFeeStructure:
          onClickEditToggle === true ? modalArray : modalData,
      };
      PostRequest(SETUP_SUPPLY_IMPROVEMENT_FEE_STRUCTURE, payload)
        .then((res) => {
          if (res?.data?.Table?.[0]?.HasError === 0) {
            CustomSuccessAlert(res?.data?.Table?.[0]?.Message);
            setModalArray({
              ...intialFields,
            });
            setModalData([]);
            setOnClickEditToggle(false);
            getSupplyImprovementFeeStructure();
            setToggleForm(false);
          } else {
            CustomErrorMessage(res?.data?.Table?.[0]?.Message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      CustomErrorMessage("Please Add Some Record to save");
    }
  };

  const handleOnClickAdd = (e) => {
    e.preventDefault();
    if (modalArray.index > -1) {
      modalData[modalArray.index] = modalArray;
      setModalData([...modalData]);
      setModalArray({
        ...intialFields,
      });
    } else {
      modalData.push({
        ...modalArray,
        index: -1,
      });
      setModalData([...modalData]);
      setModalArray({
        ...intialFields,
      });
    }
  };

  // const handleInputChangeSelect = (event) => {
  //   setSelectedOption(event);
  //   // const result = event.Id;
  //   const result = event.map((obj) => JSON.stringify(obj.value)).join(",");
  //   modalArray.Candidate = result;
  // };

  const formPanel = (
    <Fragment>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Academic Year"
          name="academicYearID"
          onChange={handleModalArrayChange}
          value={modalArray?.academicYearID}
          list={academicYearList}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          nameValue="AcademicYear"
          form="Form1"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Faculty Department"
          name="departmentID"
          nameValue="Department"
          onChange={async (e) => {
            onChange_Select_Department_Program({
              operationID: 6,
              caseID: 3,
              paremeterID: e.target.value,
            }).then((res) => {
              dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: res });
            });
            handleModalArrayChange(e);
          }}
          value={modalArray?.departmentID}
          list={SupportingTables?.Departments}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          form="Form1"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Faculty Department Program"
          name="departmentProgramID"
          nameValue="DepartmentProgram"
          onChange={handleModalArrayChange}
          value={modalArray?.departmentProgramID}
          list={SupportingTables?.Programs}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          disabled={modalArray?.departmentID === null}
          form="Form1"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Part"
          name="partID"
          nameValue="Part"
          onChange={handleModalArrayChange}
          value={modalArray?.partID}
          list={PartYear}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          form="Form1"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupSelect
          label="Semester"
          name="semesterID"
          nameValue="Semester"
          onChange={handleModalArrayChange}
          value={modalArray?.semesterID}
          list={Semester?.filter((x) => x.parentid == modalArray?.partID)}
          fieldName="SetupDetailName"
          fieldId="SetupDetailId"
          disabled={modalArray?.partID === null}
          form="Form1"
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <div className="form-group">
          <label className="form-label">
            Effective From<span className="text-danger">*</span>
          </label>
          <Input
            type="date"
            className="form-control"
            name="effectiveFrom"
            value={modalArray?.effectiveFrom}
            onChange={handleModalArrayChange}
            form="Form1"
            required
          />
        </div>
      </Col>
      <Col lg="4" md="4" xs="12">
        <div className="form-group">
          <label className="form-label">
            Effective To<span className="text-danger">*</span>
          </label>
          <Input
            type="date"
            className="form-control"
            name="effectiveTo"
            value={modalArray?.effectiveTo}
            onChange={handleModalArrayChange}
            form="Form1"
            required
          />
        </div>
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Amount"
          name="amount"
          onChange={handleModalArrayChange}
          value={modalArray?.amount}
          form="Form1"
          required
        />
      </Col>
      {!onClickEditToggle && (
        <form id="Form1" onSubmit={handleOnClickAdd}>
          <Row style={{ textAlign: "end" }}>
            <Col lg="12" md="12" xs="12">
              <Button color="primary" id="Form1" type="submit">
                Add
              </Button>
            </Col>
          </Row>
        </form>
      )}
    </Fragment>
  );

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
    setToggleForm(false);
    setOnClickEditToggle(false);
    setModalArray({
      ...intialFields,
    });
  };

  const handleClickButton = () => {
    setToggleForm(true);
  };

  const onEdit = (index, item) => {
    setModalArray({
      ...item,
      index: index,
    });
  };

  const onDelete = (index) => {
    modalData.splice(index, 1);
    setModalData([...modalData]);
  };

  const customTable = (
    <div className="table-responsive mt-3 mb-3">
      <Row>
        <Col>
          <div>
            <table className="table table-striped mb-0 mt-2">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Academic Year</th>
                  <th className="text-center">Department</th>
                  <th className="text-center">Department Program</th>
                  <th className="text-center">Part</th>
                  <th className="text-center">Semester</th>
                  <th className="text-center">Effective To</th>
                  <th className="text-center">Effective From</th>
                  <th className="text-center">Amount</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {modalData?.length > 0
                  ? modalData?.map((item, index) => {
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{item?.AcademicYear}</td>
                          <td className="text-center">{item?.Department}</td>
                          <td className="text-center">
                            {item?.DepartmentProgram}
                          </td>
                          <td className="text-center">{item?.Part}</td>
                          <td className="text-center">{item?.Semester}</td>
                          <td className="text-center">{item?.effectiveFrom}</td>
                          <td className="text-center">{item?.effectiveTo}</td>
                          <td className="text-center">{item?.amount}</td>
                          <td className="text-center">
                            <Button
                              color="primary"
                              className="btnic"
                              size="sm"
                              onClick={() => onEdit(index, item)}
                            >
                              <i className="fa fa-pencil-square-o"></i>
                            </Button>
                            <Button
                              className="btn btnic"
                              color="danger"
                              type="button"
                              onClick={() => onDelete(index)}
                            >
                              <i className="fa fa-trash"></i>
                            </Button>
                          </td>
                        </tr>
                      );
                    })
                  : null}
              </tbody>
            </table>
            {modalData.length == 0 && (
              <div
                style={{
                  width: "100%",
                  textAlign: "center",
                  background: "#e9e9e9",
                  marginTop: -5,
                  padding: 20,
                  marginBottom: 10,
                  fontWeight: "bold",
                }}
              >
                No Data Available
              </div>
            )}
          </div>
        </Col>
      </Row>
    </div>
  );

  const customModal = (
    <Modal
      isOpen={toggleForm}
      centered
      size="lg"
      style={{ minWidth: "1700px", maxWidth: "1700px" }}
      modalTransition={{ timeout: 10 }}
      backdrop="static"
    >
      <ModalHeader>Add/Edit Supply Improvement Fee Structure</ModalHeader>
      <ModalBody>
        {formPanel && (
          <Row>
            {formPanel}
            {customTable && !onClickEditToggle && customTable}
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button color="primary" onClick={handleFormSubmit}>
                Save
              </Button>
              <Button color="default" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </Row>
        )}
      </ModalBody>
    </Modal>
  );

  const customButton = (
    <Fragment>
      <Button color="primary" onClick={handleClickButton}>
        Add Supply Improvement
      </Button>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Supply Improvement Fee Structure"
      customButton={customButton}
      tableColumns={columns}
      tableRows={TableList}
      searchPanel={searchPanel}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      customModal={customModal}
    />
  );
};

export default SupplyImprovementFeeStructure;
