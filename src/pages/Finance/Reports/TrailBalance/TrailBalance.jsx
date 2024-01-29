import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label } from "reactstrap";
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

import { decryptData } from "../../../../EncryptData";
import {
  CHARTOFACCOUNT,
  JOURNALS,
  REPORTS_JOURNALS_TRANSACTIONS,
  REPORTS_TRAILBALANCE,
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
import TrialBalanceReport from "./TrailBalanceReports/TrialBalanceReport";
import ReactSelect from "react-select";
import { useState } from "react";

const initialSearchFields = {
  operationID: Select,
  companyID: decryptData(COMPANY_ID, SessionStorage),
  coaID: 0,
  fromDate: "2023-08-04T13:52:06.707Z",
  toDate: "2023-08-04T13:52:06.707Z",
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

const TrailBalance = () => {
  const { SearchFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const onPrintReportRef = useRef(null);

  const dispatch = useDispatch();

  // const { ChartOfAccountList } = SupportingTables;

  // const [selectedSearchableFields, setSelectedSearchableFields] =
  //   useState(null);

  // useEffect(() => {
  //   getChartOfAccount();
  // }, []);

  // function getChartOfAccount() {
  //   PostRequest(CHARTOFACCOUNT, intialChartOfAccountList)
  //     .then((res) => {
  //       let ChartOfAccountList = {
  //         name: "ChartOfAccountList",
  //         value: res?.data?.Table?.map((x) => ({
  //           ...x,
  //           label: x.AccNameCode,
  //           value: x.CoaID,
  //           dropdownName: "ChartOfAccount",
  //         })),
  //       };
  //       dispatch({
  //         type: SET_INITIAL_DROPDOWN_FORM_STATE,
  //         payload: ChartOfAccountList,
  //       });
  //     })
  //     .catch((err) => {
  //       console.error(err);
  //     });
  // }

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  // const handleInputChangeSelect = (event, index) => {
  //   if (event.dropdownName == "ChartOfAccount") {
  //     setSelectedSearchableFields(event);
  //     let coaid = { name: "coaid", value: event.value };
  //     dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: coaid });
  //   }
  // };

  const financialSearchPanel = (
    <Fragment>
      {/* <Col lg="3" md="3" xs="12">
        <Label>Account</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelect}
          options={ChartOfAccountList}
          value={selectedSearchableFields}
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
    const payload = {
      ...SearchFields,
      operationID: Select,
      companyID: decryptData(COMPANY_ID, SessionStorage),
      coaID: 0,
    };
    PostRequest(REPORTS_TRAILBALANCE, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data,
            SearchFields: SearchFields,
          },
        });
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
  };

  const customFinancialReport = (
    <Fragment>
      {TableList?.Table?.length > 0 ? (
        <div
          className="text-center"
          style={{
            fontSize: 13,
            margin: "10px",
            padding: "10px 25px",
          }}
        >
          <div>
            <h5 className="text-center" style={{ marginBottom: "0" }}>
              <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
            </h5>
          </div>
          <h6 style={{ marginBottom: "0", marginTop: "2px" }}>TRIAL BALANCE</h6>
          <div className="d-flex justify-content-center">
            <table style={{ width: "35%" }}>
              <tbody>
                <tr>
                  <td style={{ width: "50%" }} className="bolder text-center">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-around",
                      }}
                    >
                      <div>
                        TO:{" "}
                        {moment(TableList?.Table2?.[0]?.ToDate).format(
                          "DD-MM-YYYY"
                        )}
                      </div>
                      <div>
                        FROM:{" "}
                        {moment(TableList?.Table2?.[0]?.FromDate).format(
                          "DD-MM-YYYY"
                        )}
                      </div>
                    </div>
                  </td>
                </tr>
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
                  <th className="tbl-row-border" rowSpan={4}>
                    ACC CODE
                  </th>
                  <th
                    className="tbl-row-border"
                    rowSpan={4}
                    style={{ verticalAlign: "middle" }}
                  >
                    ACCOUNT NAME
                  </th>
                  <th className="tbl-row-border" colSpan={2}>
                    OPENING
                  </th>
                  <th className="tbl-row-border" colSpan={2}>
                    CURRENT
                  </th>
                  <th className="tbl-row-border" colSpan={2}>
                    CLOSING
                  </th>
                </tr>
                <tr
                  className="tbl-row-bgmr"
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                  }}
                >
                  <th className="tbl-row-border"> DEBIT</th>
                  <th className="tbl-row-border"> CREDIT</th>
                  <th className="tbl-row-border"> DEBIT</th>
                  <th className="tbl-row-border"> CREDIT</th>
                  <th className="tbl-row-border"> DEBIT</th>
                  <th className="tbl-row-border"> CREDIT</th>
                </tr>
              </thead>
              <tbody className="tbl-row-border">
                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td>{x.AccCode}</td>
                    <td>{x?.AccName}</td>
                    <td>{x?.OpeningDebit}</td>
                    <td>{x?.OpeningCredit}</td>
                    <td>{x?.CrAmount}</td>
                    <td>{x?.DrAmount}</td>
                    <td>{x?.ClosingDebit}</td>
                    <td>{x?.ClosingCredit}</td>
                  </tr>
                ))}
                {TableList?.Table1.map((x) => (
                  <tr className="bolder border-bottom2">
                    <td colSpan={2} className="text-right bolder">
                      Grand Total:
                    </td>
                    <td>{x.OpeningDebit}</td>
                    <td>{x.OpeningCredit}</td>
                    <td>{x.DrAmount}</td>
                    <td>{x.CrAmount}</td>
                    <td>{x.ClosingDebit}</td>
                    <td>{x.ClosingCredit}</td>
                  </tr>
                ))}
                {TableList?.Table?.length < 5 ? (
                  <tr className="fotterSpacing">
                    <td colSpan={8} className="text-left">
                      {" "}
                    </td>
                  </tr>
                ) : null}
              </tbody>
              <tfoot
                style={{
                  backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                    ?.ColourCode,
                  color: "white",
                  fontWeight: "bold",
                  fontSize: 10,
                }}
              >
                <tr style={{ width: "100%" }}>
                  <td className="text-center" colSpan={10}>
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
            <TrialBalanceReport ref={onPrintReportRef} />
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
      formName="Trail Balance"
      reportName="Trail Balance Report"
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
export default TrailBalance;
