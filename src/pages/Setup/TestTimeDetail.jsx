import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input } from "reactstrap";
import {
  academicYearId,
  Delete,
  examTypeID,
  Insert,
  meritlistId,
  purposeId,
  Search,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { CustomErrorMessage, CustomSuccessAlert, DeleteWithConfirmation } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupButton from "../../components/GeneralComponent/FormGroupButton";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../EncryptData";
import {
  formatDateFunction,
  formatDateFunction1,
  formatDateFunctionByName,
  getOnlyTime,
} from "../../functions/DateFormatFunction";
import DatePicker from "react-datepicker";
import {
  RESET_FORM_FIELDS,
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import { dateFormat, dateFormatPlaceholder } from "../../utils/CommonMethods";
import {
  ADM_SetupMeritParameter,
  ADM_SetupMeritScore,
  ADM_SetupTestTimeDetail,
} from "../../utils/Config";
import { LOGINID, UserNetworkInfo } from "../../utils/EncryptedConstants";

const initialSearchFields = {
  OperationID: Select,
  SetupTestTimeID: 0,
  AcademicYearID: 0,
  ExamTypeID: 0,
  TimeVenuDetails: "",
  IsActive: true,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};
const initialFormFields = {
  OperationID: "0",
  SetupTestTimeID: 0,
  AcademicYearID: 0,
  ExamTypeID: 0,
  TimeVenuDetails: "",
  IsActive: false,
  CreatedBy: decryptData(LOGINID, SessionStorage),
  ModifiedBy: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const TestTimeDetail = () => {
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

  const [timeVenuDetails, setTimeVenuDetails] = useState("");
  const [time, setTime] = useState("");

  const [formTimeVenuDetails, setFormTimeVenuDetails] = useState("");
  const [formTime, setFormTime] = useState("");

  useEffect(() => {
    getTimeDetail();
  }, []);

  const getTimeDetail = () => {
    ADM_SetupTestTimeDetail(initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              TimeVenuDetails: formatDateFunctionByName(x.TimeVenuDetails),
              VenuTime: getOnlyTime(x.TimeVenuDetails, ":"),
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
    { field: "AcademicYear", name: "Academic Year" },
    { field: "ExamTypeID1", name: "Exam Type" },
    { field: "TimeVenuDetails", name: "Venu Date" },
    { field: "VenuTime", name: "Venu Time" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };
  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let orignailDateTime = obj?.TimeVenuDetails;
        let concatinatedDateTime = orignailDateTime.concat("T", obj?.VenuTime);
        const payload = {
          OperationID: Delete,
          SetupTestTimeID: obj?.SetupTestTimeID,
          AcademicYearID: obj?.AcademicYearID,
          ExamTypeID: obj?.ExamTypeID,
          TimeVenuDetails: concatinatedDateTime,
          IsActive: obj?.IsActive,
          CreatedBy: decryptData(LOGINID, SessionStorage),
          ModifiedBy: 0,
          UserIP: decryptData(UserNetworkInfo)?.IPv4,
        };
        ADM_SetupTestTimeDetail(payload)
          .then((res) => {
            if (res?.data?.Table?.[0]?.HasError === 0) {
              CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
              getTimeDetail();
              setFormTime("");
              setFormTimeVenuDetails("");
            } else {
              CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == academicYearId
          )}
          label="Academic Year"
          name="AcademicYearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.AcademicYearID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == examTypeID
          )}
          label="Exam Type"
          name="ExamTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleSearchChange}
          value={SearchFields?.ExamTypeID}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <div className="form-group">
          <label className="form-label">Venu Date</label>
          <DatePicker
            selected={timeVenuDetails}
            dateFormat={dateFormat}
            onChange={(e) => AllDateSet(e, "TimeVenuDetails", "SearchFields")}
            className="form-control"
            name="TimeVenuDetails"
            placeholderText={dateFormatPlaceholder}
            time
            required
          />
        </div>
      </Col>
      <Col lg="3" md="3" xs="12">
        <div className="form-group">
          <label className="form-label">Time</label>
          <DatePicker
            selected={time}
            onChange={(date) =>
              AllDateSet(date, "TimeRequested", "SearchFields")
            }
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={1}
            timeFormat="HH:mm"
            dateFormat="hh:mm:ss"
          />
        </div>
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
    let orignailDateTime = SearchFields?.TimeVenuDetails;
    let concatinatedDateTime = orignailDateTime.concat(
      "T",
      SearchFields?.TimeRequested
    );
    const payload = {
      OperationID: Search,
      SetupTestTimeID: 0,
      AcademicYearID: SearchFields?.AcademicYearID,
      ExamTypeID: SearchFields?.ExamTypeID,
      TimeVenuDetails: concatinatedDateTime,
      IsActive: SearchFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: 0,
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    ADM_SetupTestTimeDetail(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              TimeVenuDetails: formatDateFunctionByName(x.TimeVenuDetails),
              VenuTime: getOnlyTime(x.TimeVenuDetails, ":"),
            })),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        setTime("");
        setTimeVenuDetails("");
      })
      .catch((err) => {
        console.error(err);
      });
  };
  const cancelSearch = () => {
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialSearchFields });
    setTime("");
    setTimeVenuDetails("");
  };

  const handleCancel = () => {
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    setFormTime("");
    setFormTimeVenuDetails("");
  };

  const submitForm = (id) => {
    let orignailDateTime = FormFields?.TimeVenuDetails;
    let concatinatedDateTime = orignailDateTime.concat(
      "T",
      getOnlyTime(FormFields?.TimeRequested, ":")
    );
    const payload = {
      OperationID: id.toString(),
      SetupTestTimeID: 0,
      AcademicYearID: FormFields?.AcademicYearID,
      ExamTypeID: FormFields?.ExamTypeID,
      TimeVenuDetails: concatinatedDateTime,
      IsActive: FormFields?.IsActive,
      CreatedBy: decryptData(LOGINID, SessionStorage),
      ModifiedBy: 0,
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    ADM_SetupTestTimeDetail(payload)
      .then((res) => {
        if (res?.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
          getTimeDetail();
          setFormTime("");
          setFormTimeVenuDetails("");
        } else {
          CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const AllDateSet = (event, type, fieldName) => {
    if (fieldName === "SearchFields") {
      if (type === "TimeVenuDetails") {
        setTimeVenuDetails(event);
        let date = formatDateFunction1(event, "-");
        SearchFields.TimeVenuDetails = date;
        let data1 = {
          name: "TimeVenuDetails",
          value: SearchFields?.TimeVenuDetails,
        };
        dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
      } else if (type === "TimeRequested") {
        setTime(event);
        let date = getOnlyTime(event, ":");
        SearchFields.TimeRequested = date;
        let data1 = {
          name: "TimeRequested",
          value: SearchFields?.TimeRequested,
        };
        dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data1 });
      }
    } else {
      if (type === "TimeVenuDetails") {
        setFormTimeVenuDetails(event);
        let date = formatDateFunction1(event, "-");
        FormFields.TimeVenuDetails = date;
        let data1 = {
          name: "TimeVenuDetails",
          value: FormFields?.TimeVenuDetails,
        };
        dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
      } else if (type === "TimeRequested") {
        setFormTime(event);
        let data1 = {
          name: "TimeRequested",
          value: event,
        };
        dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data1 });
      }
    }
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == academicYearId
          )}
          label="Academic Year"
          name="AcademicYearID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.AcademicYearID}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          list={SupportingTables?.MasterDropdown?.filter(
            (x) => x.SetupMasterId == examTypeID
          )}
          label="Exam Type"
          name="ExamTypeID"
          fieldId="SetupDetailId"
          fieldName="SetupDetailName"
          onChange={handleAddChange}
          value={FormFields?.ExamTypeID}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <div className="form-group">
          <label className="form-label">Venu Date</label>
          <DatePicker
            selected={formTimeVenuDetails}
            dateFormat={dateFormat}
            onChange={(e) => AllDateSet(e, "TimeVenuDetails", "FormFields")}
            className="form-control"
            name="TimeVenuDetails"
            placeholderText={dateFormatPlaceholder}
            time
            required
          />
        </div>
      </Col>
      <Col lg="6" md="6" xs="12">
        <div className="form-group">
          <label className="form-label">Time</label>
          <DatePicker
            selected={formTime}
            onChange={(date) => AllDateSet(date, "TimeRequested", "FormFields")}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={1}
            timeFormat="HH:mm"
            dateFormat="hh:mm:ss"
          />
        </div>
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={FormFields?.IsActive}
          onChange={handleAddChange}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Test Time"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      onDelete={onDeleteRow}
      searchSubmit={submitSearch}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default TestTimeDetail;
