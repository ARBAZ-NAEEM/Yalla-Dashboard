import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label } from "reactstrap";
import CrudFormComponent from "../../../../components/FormComponents/CrudFormComponent";
import {
  Insert,
  Search,
  Select,
  SessionStorage,
  citySetupId,
} from "../../../../common/SetupMasterEnum";
import {
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_SEARCH_FIELDS,
  RESET_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../../../utils/Config";

import { decryptData } from "../../../../EncryptData";
import {
  CHARTOFACCOUNT,
  JOURNALS,
  PERIOD,
  REPORTS_JOURNALS_TRANSACTIONS,
  REPORTS_PAYABLE_RECEIVABLES,
} from "../../../../utils/UrlConstants";
import FormGroupSelect from "../../../../components/GeneralComponent/FormGroupSelect";
import {
  COMPANY_DETAILS,
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../../utils/EncryptedConstants";
import moment from "moment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
// import JournalTransactionsReport from "./JournalTransactionsReport/JournalTransactionsReport";
import { CustomErrorMessage } from "../../../../components/Alert";
import ReactSelect from "react-select";
import PayableThisFiscalYearReport from "./PayableThisFiscalYearReport/PayableThisFiscalYearReport";

const initialSearchFields = {
  operationID: Select,
  type: Insert,
  periodID: 0,
  companyID: decryptData(COMPANY_ID, SessionStorage),
  coaid: "",
  fromDate: "",
  toDate: "",
};

const intialChartOfAccountList = {
  OperationID: Select,
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  CoaID: 0,
  AccNatureID: 0,
  AccCode: "",
  AccName: "",
  ParentCoaID: 0,
  AccNature: "",
  AccTypeID: 0,
  Remarks: "",
  FyID: 0,
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const intialPeriodList = {
  OperationID: Search,
  PeriodID: 0,
  Period: "",
  PeriodFrom: "2023-07-24T12:21:14.451Z",
  PeriodTo: "2023-07-24T12:21:14.451Z",
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};
const PayableThisFiscalYear = () => {
  const { SearchFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const { ChartOfAccountList, PeriodList } = SupportingTables;

  const onPrintReportRef = useRef(null);

  const dispatch = useDispatch();

  const initialSelectedSearchableFields = {
    searchableChartOfAccount: null,
    searchablePeriod: null,
  };

  const [selectedSearchableFields, setSelectedSearchableFields] = useState(
    initialSelectedSearchableFields
  );

  const { searchableChartOfAccount, searchablePeriod } =
    selectedSearchableFields;

  useEffect(() => {
    getChartOfAccount();
    getPeriods();
  }, []);

  function getChartOfAccount() {
    PostRequest(CHARTOFACCOUNT, intialChartOfAccountList)
      .then((res) => {
        let ChartOfAccountList = {
          name: "ChartOfAccountList",
          value: res?.data?.Table?.map((x) => ({
            ...x,
            label: x.AccNameCode,
            value: x.CoaID,
            dropdownName: "ChartOfAccount",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: ChartOfAccountList,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getPeriods() {
    PostRequest(PERIOD, intialPeriodList)
      .then((res) => {
        let PeriodList = {
          name: "PeriodList",
          value: res?.data?.Table?.map((x) => ({
            ...x,
            label: x.Period,
            value: x.PeriodID,
            dropdownName: "Period",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: PeriodList,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleInputChangeSelect = (event, index) => {
    if (event.dropdownName == "ChartOfAccount") {
      setSelectedSearchableFields({
        ...selectedSearchableFields,
        searchableChartOfAccount: event,
      });
      let accountCode = { name: "coaid", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: accountCode });
    } else {
      setSelectedSearchableFields({
        ...selectedSearchableFields,
        searchablePeriod: event,
      });
      let accountCode = { name: "periodID", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: accountCode });
    }
  };

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const financialSearchPanel = (
    <Fragment>
      {/* <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Period"
          name="periodID"
          list={PeriodList}
          fieldId="PeriodID"
          fieldName="Period"
          onChange={handleSearchChange}
          value={SearchFields?.periodID}
          required
        />
      </Col> */}

      <Col lg="3" md="3" xs="12">
        <Label>Period</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelect}
          options={PeriodList}
          value={searchablePeriod}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>Account</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelect}
          options={ChartOfAccountList}
          value={searchableChartOfAccount}
        />
      </Col>
      {/* <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Account"
          name="accountCode"
          list={ChartOfAccountList}
          fieldId="AccCode"
          fieldName="AccNameCode"
          onChange={handleSearchChange}
          value={SearchFields?.accountCode}
          required
        />
      </Col> */}
      <Col lg="3" md="3" xs="12">
        <Label>
          From Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="fromDate"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.fromDate}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          To Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="toDate"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.toDate}
          required
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: [],
        SearchFields: SearchFields,
      },
    });
    const payload = {
      ...SearchFields,
      operationID: Select,
      companyID: decryptData(COMPANY_ID, SessionStorage),
      type: Insert,
      userID: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(REPORTS_PAYABLE_RECEIVABLES, payload)
      .then((res) => {
        if (res?.data?.Table?.length > 0) {
          dispatch({
            type: SET_INITIAL_CRUD_FORM_STATE,
            payload: {
              List: res?.data,
              SearchFields: SearchFields,
            },
          });
        } else {
          CustomErrorMessage("No Data Found");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const cancelSearch = () => {
    dispatch({
      type: RESET_SEARCH_FIELDS,
      payload: initialSearchFields,
    });
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: { List: [], SearchFields: initialSearchFields },
    });
    setSelectedSearchableFields(initialSelectedSearchableFields)
  };

  const customFinancialReport = (
    <Fragment>
      {TableList?.Table?.length > 0 ? (
        <div
          className="text-center"
          style={{
            fontSize: 12,
            margin: "10px",
            padding: "10px 15px",
          }}
        >
          <div>
            <h5 className="text-center" style={{ marginBottom: "0" }}>
              <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
            </h5>
          </div>
          <br />
          <h6 style={{ marginBottom: "0", marginTop: "2px" }}>
            Payable (This Fiscal Year)
          </h6>
          <br />

          <div className="d-flex  justify-content-between">
            <table style={{ width: "100%" }}>
              <tbody>
                <td className="bolder text-left">GL-PAYABLE</td>
                <td
                  className="bolder text-center"
                  // style={{ paddingLeft: "100px" }}
                >
                  FROM:{" "}
                  {moment(TableList?.Table1?.[0]?.FromDate).format(
                    "DD-MM-YYYY"
                  )}
                  {"   "}
                  TO:{" "}
                  {moment(TableList?.Table1?.[0]?.ToDate).format("DD-MM-YYYY")}
                </td>
                <td style={{ width: "22%" }} className="bolder text-left"></td>
              </tbody>
            </table>
          </div>
          <br />
          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <table style={{ width: "100%" }}>
              <thead  className="no-left-border tbl-row-border">
                <tr
                  className="tbl-row-bgmr"
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                  }}
                >
                  <th>CODE</th>
                  <th>NAME</th>
                  <th> 0 - 30</th>
                  <th>31 - 60</th>
                  <th>61 - 90</th>
                  <th>Greter than 90</th>
                </tr>
              </thead>
              <tbody  className="tbl-row-border">
                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td className="bolder">{x.AccCode}</td>
                    <td className="bolder">{x?.AccName}</td>
                    <td className="bolder">{x?.["030"]}</td>
                    <td className="bolder">{x?.["3160"]}</td>
                    <td className="bolder">{x?.["6190"]}</td>
                    <td className="bolder">{x?.[">90"]}</td>
                  </tr>
                ))}
              </tbody>
              <br/>
              <tfoot
                style={{
                  backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                    ?.ColourCode,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 14,
                }}
              >
                <tr style={{ width: "100%" }}>
                  <td colSpan={10}>
                    <div>
                      {decryptData(COMPANY_DETAILS, SessionStorage)?.Footer}
                    </div>
                    <div>
                      {decryptData(COMPANY_DETAILS, SessionStorage)?.Address}
                    </div>
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
          <div style={{ display: "none" }}>
            <PayableThisFiscalYearReport ref={onPrintReportRef} />
          </div>
        </div>
      ) : null}
    </Fragment>
  );

  const onPrintReport = useReactToPrint({
    content: () => onPrintReportRef.current,
  });

  return (
    <CrudFormComponent
      formName="Payable This Fiscal Year"
      reportName="Payable This Fiscal Report"
      onPrintReport={onPrintReport}
      customFinancialReport={customFinancialReport}
      tableRows={TableList}
      financialSearchPanel={financialSearchPanel}
      hideSearchPanel={true}
      searchSubmit={submitSearch}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
    />
  );
};
export default PayableThisFiscalYear;
