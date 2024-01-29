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
  JOURNALS,
  REPORTS_JOURNALS_TRANSACTIONS,
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
import JournalTransactionsReport from "./JournalTransactionsReport/JournalTransactionsReport";
import { CustomErrorMessage } from "../../../../components/Alert";

const initialSearchFields = {
  operationID: Select,
  journalID: 0,
  companyID: decryptData(COMPANY_ID, SessionStorage),
  fromDate: "2023-07-25T12:10:15.459Z",
  toDate: "2023-07-25T12:10:15.459Z",
  rangeSelectionID: 0,
  isApproved: true,
  userID: decryptData(LOGINID, SessionStorage),
  userIP: decryptData(UserNetworkInfo)?.IPv4,
};

const initialJournalFields = {
  OperationID: Select,
  JournalID: 0,
  JournalCode: "",
  JournalName: "",
  TransTypeID: 0,
  flex: "",
  AssociatedJournalID: 0,
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const JournalTransactions = () => {
  const { SearchFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const { JournalList } = SupportingTables;

  const onPrintReportRef = useRef(null);

  const dispatch = useDispatch();

  console.log(Object.keys(TableList)?.length);

  useEffect(() => {
    console.log(decryptData(COMPANY_DETAILS, SessionStorage));
    getJournals();
  }, []);

  function getJournals() {
    PostRequest(JOURNALS, initialJournalFields)
      .then((res) => {
        let JournalList = { name: "JournalList", value: res?.data?.Table };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: JournalList,
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

  const financialSearchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Journal"
          name="journalID"
          list={JournalList}
          fieldId="JournalID"
          fieldName="JournalName"
          onChange={handleSearchChange}
          value={SearchFields?.journalID}
          required
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
      rangeSelectionID: 0,
      isApproved: true,
      userID: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(REPORTS_JOURNALS_TRANSACTIONS, payload)
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
            <h5 className="text-center" style={{ marginBottom: "0" }}>
              <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
            </h5>
          </div>
          <h6 style={{ marginBottom: "0", marginTop: "2px" }}>
            JOURNAL TRANSACTIONS
          </h6>
          <div className="d-flex justify-content-center">
            <table style={{ width: "35%" }}>
              <tbody>
                <tr>
                  <td></td>
                  <td style={{ width: "20%" }} className="bolder">
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
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <p className="text-left bolder mgbtm">GL-Jrnl_TRA</p>

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
                  <th className="text-left">DATE</th>
                  <th>Voucher No.</th>
                  <th>ACCOUNT CODE</th>
                  <th>ACCOUNT NAME</th>
                  <th>DESCRIPTION</th>
                  <th>CC CODE</th>
                  <th>DEBIT</th>
                  <th>CREDIT</th>
                </tr>
              </thead>
              <tbody>
                <tr className="mt-2 mb-2">
                  <td className="text-left bolder">
                    {TableList?.Table?.[0]?.Journal}
                  </td>
                </tr>

                {TableList?.Table?.map((x) => (
                  <tr className="border-bottom2">
                    <td className="text-left">
                      {" "}
                      {moment(x?.Date).format("DD-MM-YYYY")}
                    </td>
                    <td className="bolder">{x?.VouMasterId}</td>
                    <td className="bolder">{x?.AccCode}</td>
                    <td className="text-center bolder">{x?.AccName}</td>
                    <td className="bolder text-center">{x?.Narrations}</td>
                    <td className="bolder">{x?.Name}</td>
                    <td className="text-center">
                      {x?.Debit === 0 ? "0.00" : x?.Debit}
                    </td>
                    <td className="text-center">
                      {x.Credit === 0 ? "0.00" : x.Credit}
                    </td>
                  </tr>
                ))}

                <tr className="border-bottom2">
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
                </tr>
                {TableList?.Table?.length < 5 ? (
                  <tr className="fotterSpacing">
                    <td colSpan={8} className="text-left">
                      {" "}
                    </td>
                  </tr>
                ) : null}

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
            <JournalTransactionsReport ref={onPrintReportRef} />
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
      formName="Journal Transactions"
      reportName="Journal Transactions Report"
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
export default JournalTransactions;
