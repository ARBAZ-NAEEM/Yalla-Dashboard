import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label, Row } from "reactstrap";
import CrudFormComponent from "../../../../components/FormComponents/CrudFormComponent";
import {
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
import ReactSelect from "react-select";

import { decryptData } from "../../../../EncryptData";
import {
    CHARTOFACCOUNT,
  JOURNALS,
  PERIOD,
  REPORTS_JOURNALS_TRANSACTIONS,
  REPORTS_RECEIVABLES_FISCAL_YEAR,
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
import ReceivablesThisFiscalYearReport from "./ReceivablesThisFiscalYearReports/ReceivablesThisFiscalYearReport";
import { CustomErrorMessage } from "../../../../components/Alert";
import { useState } from "react";


const initialSearchFields = {
  OperationID: Select,
  Type: 2,
  PeriodID: 0,
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  CoaiD: 0,
  FromDate: "2023-08-01T09:37:15.254Z",
  ToDate: "2023-08-01T09:37:15.254Z",
};

const initialPeriodFields = {
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

const initialCOAFields = {
    OperationID: Search,
    CompanyID: decryptData(COMPANY_ID, SessionStorage),
    CoaID: 0,
    AccNatureID: 0,
    AccCode: "",
    AccName: "",
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
};


const ReceivablesThisFiscalYear = () => {
  const { SearchFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [selectedPeriodSearch, setSelectedPeriodSearch] = useState(null);
  const [selectedCOASearch, setSelectedCOASearch] = useState(null);

  const { Period, ChartOfAccount } = SupportingTables;

  const onPrintReportRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    getPeriod();
    getChartOFAccount();
  }, []);

  function getPeriod() {
    PostRequest(PERIOD, initialPeriodFields)
      .then((res) => {
        let Period = { 
            name: "Period", 
            value: res?.data?.Table?.map((x) => ({
                ...x,
                label : x.Period,
                value : x.PeriodID,
                dropdownName : 'Period'
            }))
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: Period,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getChartOFAccount() {
    PostRequest(CHARTOFACCOUNT, initialCOAFields)
      .then((res) => {
        let ChartOfAccount = {
             name: "ChartOfAccount",
              value: res?.data?.Table?.map((x) => ({
                ...x,
                label:x.AccName,
                value: x.CoaID,
                dropdownName : "AccName"
              }))
            };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: ChartOfAccount,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleInputChangeSelectSearch = (event) => {
    if (event.dropdownName === "Period") {
      setSelectedPeriodSearch(event);
      let data = { name: "PeriodID", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    }  else if (event.dropdownName === "AccName") {
      setSelectedCOASearch(event);
      let data = { name: "CoaiD", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    } 
  };

  const financialSearchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
       <Label>Period</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelectSearch}
          options={Period}
          value={selectedPeriodSearch}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
       <Label>Chart Of Account</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelectSearch}
          options={ChartOfAccount}
          value={selectedCOASearch}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          From Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="FromDate"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.FromDate}
          required
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          To Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="ToDate"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.ToDate}
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
      OperationID: Select,
      Type: 1,
      CompanyID: decryptData(COMPANY_ID, SessionStorage),
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(REPORTS_RECEIVABLES_FISCAL_YEAR, payload)
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
      payload: { List: [], SearchFields: SearchFields },
    });
    // getJounalTransactions();
  };

  const customFinancialReport = (
    <Fragment>
      {TableList?.Table?.length > 0 ? (
        <div
          className="text-center"
          // ref={ref}
          style={{
            fontSize: 12,
            margin: "10px",
            padding: "10px 25px",
          }}
        >
        <div>
          <Row>
            <Col lg="3" md="3" xs="12" style={{textAlign:"left", fontSize:"24px"}}>
            {decryptData(COMPANY_DETAILS, SessionStorage)?.Header}
            </Col>

            <Col lg="6" md="6" xs="12" style={{textAlign:"center", fontSize:"24px"}}>
            Receivables This Fiscal Year

            </Col>
          
            <Col lg="3" md="3" xs="12" style={{textAlign:"right", fontSize:"12px"}}>
                FROM:{" "}
                   <b> {moment(TableList?.Table2?.[0]?.FromDate).format(
                      "DD-MM-YYYY"
                    )}</b>
                    {" "} <br />
                TO:{" "}
               <b> {moment(TableList?.Table2?.[0]?.ToDate).format(
                  "DD-MM-YYYY"
                )}</b>
            </Col>
          </Row>
        </div>
        <hr />
          {/* <div>
            <h5 className="text-center" style={{ marginBottom: "0" }}>
              <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
            </h5>
          </div>
          <h6 style={{ marginBottom: "0", marginTop: "2px" }}>
            Receivables This Fiscal Year
          </h6> */}
          <div className="d-flex justify-content-center">
            <table style={{ width: "40%" }}>
              <tbody>
                <tr>
                  <td></td>
                  {/* <td style={{ width: "20%" }} className="bolder">
                    FROM:{" "}
                    {moment(TableList?.Table2?.[0]?.FromDate).format(
                      "DD-MM-YYYY"
                    )}{" "}
                  </td>

                  <td style={{ width: "20%" }} className="bolder">
                    TO:{" "}
                    {moment(TableList?.Table2?.[0]?.ToDate).format(
                      "DD-MM-YYYY"
                    )}
                  </td> */}
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <p className="text-left bolder mgbtm mb-2">GL-Receivables</p>

          <div
            className="d-flex justify-content-center"
            style={{ width: "100%" }}
          >
            <table style={{ width: "100%", border: "1px solid black" }}>
              <thead className="no-left-border">
                <tr
                  className="tbl-row-bgmr"
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                  }}
                >
                  <th>Code</th>
                  <th>Name</th>
                  <th>0-30</th>
                  <th>31-60</th>
                  <th>61-90</th>
                  <th>Greater than 90</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mt-2 mb-2">
                  <td className="text-left bolder">
                    {TableList?.Table?.[0]?.ReceivablesThisFiscalYear}
                  </td>
                </tr>

                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td className="bolder">
                      {x?.AccCode}
                    </td>
                    <td className="bolder">{x?.AccName}</td>
                    <td className="bolder">{x?.["030"]}</td>
                    <td className="bolder">{x?.["3160"]}</td>
                    <td className="bolder text-center">{x?.["6190"]}</td>
                    <td className="bolder">{x?.[">90"]}</td>
                    {/* <td className="text-center">
                      {x?.Debit === 0 ? "0.00" : x?.Debit}
                    </td>
                    <td className="text-center">
                      {x.Credit === 0 ? "0.00" : x.Credit}
                    </td> */}
                  </tr>
                ))}

                {/* <tr>
                  <td className="text-right bolder" colSpan={6}>
                    {" "}
                    {TableList?.Table1?.[0]?.Total}:
                  </td>
                  <td className="text-center bolder">
                    {" "}
                    {TableList?.Table1?.[0]?.Debit}
                  </td>
                  <td className="text-center bolder">
                    {" "}
                    {TableList?.Table1?.[0]?.Credit}
                  </td>
                </tr> */}

                {/* <tr>
                <td className="text-right bolder" colSpan={6}>
                  {" "}
                  <h6>GRAND-TOTAL:</h6>
                </td>
                <td className="text-center"> 17,600</td>
                <td className="text-center"> 17,600</td>
              </tr> */}
              </tbody>
            </table>
          </div>
          <br />
          <footer
            style={{
              backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                ?.ColourCode,
              color: "white",
              fontWeight: "bold",
            }}
          >
            {decryptData(COMPANY_DETAILS, SessionStorage)?.Footer}
            <div>{decryptData(COMPANY_DETAILS, SessionStorage)?.Address}</div>
          </footer>
          <div style={{ display: "none" }}>
            <ReceivablesThisFiscalYearReport ref={onPrintReportRef} />
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
      formName="Receivables This Fiscal Year"
      reportName="Receivables This Fiscal Year Report"
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
export default ReceivablesThisFiscalYear;
