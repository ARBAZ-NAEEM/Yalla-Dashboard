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
  COST_CENTER,
  JOURNALS,
  PERIOD,
  REPORTS_GENERAL_LEDGER,
  REPORTS_JOURNALS_TRANSACTIONS,
  REPORTS_PAYABLE_RECEIVABLES,
} from "../../../../utils/UrlConstants";
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
import GeneralLedgerReport from "./GeneralLedgerReport/GeneralLedgerReport";
// import PayableThisFiscalYearReport from "./PayableThisFiscalYearReport/PayableThisFiscalYearReport";


const PayableThisFiscalYear = () => {
  const { SearchFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const initialSearchFields = {
    operationID: Select,
    companyID: decryptData(COMPANY_ID, SessionStorage),
    costCenterId: 0,
    coaid: 0,
    fromDate: "1900-01-01",
    toDate: "1900-01-01",
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
  
  const intialCostCenterList = {
    operationID: Select,
    costcenterID: 0,
    name: "",
    ccNatureID: 0,
    ccTypeID: 0,
    companyID: decryptData(COMPANY_ID, SessionStorage),
    beginingDate: "2023-06-20T09:07:55.440Z",
    expectedDate: "2023-06-20T09:07:55.440Z",
    actualDate: "2023-06-20T09:07:55.440Z",
    isActive: true,
    userID: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const { ChartOfAccountList, CostCenterList } = SupportingTables;

  const onPrintReportRef = useRef(null);

  const dispatch = useDispatch();

  const initialSelectedSearchableFields = {
    searchableChartOfAccount: null,
    searchableCostCenter: null,
  };

  const [selectedSearchableFields, setSelectedSearchableFields] = useState(
    initialSelectedSearchableFields
  );

  const { searchableChartOfAccount, searchableCostCenter } =
    selectedSearchableFields;

  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: [],
        SearchFields: initialSearchFields,
      },
    });
    getChartOfAccount();
    getCostCenter();
  }, []);

  function getChartOfAccount() {
    PostRequest(CHARTOFACCOUNT, intialChartOfAccountList)
      .then((res) => {
        let ChartOfAccountList = {
          name: "ChartOfAccountList",
          value: res?.data?.Table?.filter((filteredItem) => ( filteredItem.AccTypeID == 2))?.map((x) => ({
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

  function getCostCenter() {
    PostRequest(COST_CENTER, intialCostCenterList)
      .then((res) => {
        let CostCenterList = {
          name: "CostCenterList",
          value: res?.data?.Table?.map((x) => ({
            ...x,
            label: x.Name,
            value: x.CostcenterID,
            dropdownName: "CostCenter",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: CostCenterList,
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
      let coaid = { name: "coaid", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: coaid });
    } else {
      setSelectedSearchableFields({
        ...selectedSearchableFields,
        searchableCostCenter: event,
      });
      let costCenterId = { name: "costCenterId", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: costCenterId });
    }
  };

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const financialSearchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <Label>Account</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelect}
          options={ChartOfAccountList}
          value={searchableChartOfAccount}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>Cost Center</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelect}
          options={CostCenterList}
          value={searchableCostCenter}
        />
      </Col>

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
          //   required
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
          //   required
        />
      </Col>
    </Fragment>
  );

  console.log(decryptData(COMPANY_DETAILS, SessionStorage)?.CompanyID)

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
    };
    PostRequest(REPORTS_GENERAL_LEDGER, payload)
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
    setSelectedSearchableFields(initialSelectedSearchableFields);
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
            General Ledger Report
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
                  {moment(TableList?.Table2?.[0]?.FromDate).format(
                    "DD-MM-YYYY"
                  )}
                  {"   "}
                  TO:{" "}
                  {moment(TableList?.Table2?.[0]?.ToDate).format("DD-MM-YYYY")}
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
                  <th>ACCOUNT NAME</th>
                  <th>DATE</th>
                  <th>VOUCHER TYPE</th>
                  <th>VOUCHER NO.</th>

                  <th>DESCRIPTION</th>

                  <th>DEBIT</th>
                  <th>CREDIT</th>
                  <th>BALANCE</th>
                </tr>
              </thead>
              <tbody className="tbl-row-border">
                <tr className="border-bottom2">
                  <td colSpan={4}></td>
                  <td className="bolder">Opening Balance:-</td>
                  <td></td>
                  <td style={{ fontWeight: 'bold'}}>{TableList?.Table1?.[0]?.OpeningBal}</td>
                </tr>
                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td style={{ fontWeight: "bold" }}>{x.AccName}</td>
                    <td> {moment(new Date(x.Date)).format("DD-MM-YYYY")}</td>
                    <td>{x?.VouType}</td>
                    <td>{x?.VouNo}</td>

                    <td>{x?.Narrations}</td>

                    <td>{x?.Debit}</td>
                    <td>{x?.Credit}</td>
                    <td>{x?.Balance}</td>
                  </tr>
                ))}
                {/* <tr>
                  <td colSpan={3}></td>
                  <td className="bolder text-right">Total:-</td>

                  <td className="border-bottom2 border-top2 bolder">
                    34,500.00
                  </td>
                  <td className="border-bottom2 border-top2 bolder">
                    34,500.00
                  </td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="bolder text-right">CF Balance:-</td>

                  <td className="border-bottom2 bolder">34,500.00</td>
                  <td className="border-bottom2 bolder">34,500.00</td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="bolder text-right">Opening Balance:-</td>

                  <td className="border-bottom2 bolder">34,500.00</td>
                  <td className="border-bottom2 bolder">34,500.00</td>
                </tr>
                <tr>
                  <td colSpan={3}></td>
                  <td className="bolder text-right">Grand Total:-</td>
                  <td className="border-bottom2 bolder">34,500.00</td>
                  <td className="border-bottom2 bolder">34,500.00</td>
                </tr> */}
              </tbody>
              <br />
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
            <GeneralLedgerReport ref={onPrintReportRef} />
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
      formName="General Ledger"
      reportName="General Ledger Report"
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
