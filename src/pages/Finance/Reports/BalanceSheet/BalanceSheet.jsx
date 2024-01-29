import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label } from "reactstrap";
import CrudFormComponent from "../../../../components/FormComponents/CrudFormComponent";
import {
  Search,
  Select,
  SessionStorage,
} from "../../../../common/SetupMasterEnum";
import {
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_SEARCH_FIELDS,
  RESET_SEARCH_FIELDS,
} from "../../../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../../../utils/Config";
import { decryptData } from "../../../../EncryptData";
import {
  REPORT_BALANCESHEET,
} from "../../../../utils/UrlConstants";
import {
  COMPANY_DETAILS,
  COMPANY_ID,
} from "../../../../utils/EncryptedConstants";
import moment from "moment";
import { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { CustomErrorMessage } from "../../../../components/Alert";
import BalanceSheetReport from "./BalanceSheetReport/BalanceSheetReport";

const initialSearchFields = {
  operationID: Select,
  companyID: decryptData(COMPANY_ID, SessionStorage),
  fromDate: "2023-08-11T10:19:28.967Z",
  toDate: "2023-08-11T10:19:28.967Z",
};

const BalanceSheet = () => {
  const { SearchFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const { ChartOfAccountList, CostCenterList } = SupportingTables;

  const onPrintReportRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: [],
        SearchFields: initialSearchFields,
      },
    });
  }, []);

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const financialSearchPanel = (
    <Fragment>
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

  const submitSearch = () => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: [],
        SearchFields: SearchFields,
      },
    });
    const payload = {
      ...Search,
      operationID: Select,
      companyID: decryptData(COMPANY_ID, SessionStorage),
    };
    PostRequest(REPORT_BALANCESHEET, payload)
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
  };

  const customFinancialReport = (
    <Fragment>
      {TableList?.Table?.length > 0 ? (
        <div
          className="text-center"
          style={{
            fontSize: 12,
            margin: "10px",
            padding: "10px 25px",
          }}
        >
          <div>
            <div>
              <h5 className="text-center" style={{ marginBottom: "0" }}>
                <u>{decryptData(COMPANY_DETAILS, SessionStorage)?.Header}</u>
              </h5>
              <h6 className="underLineText">BALANCE SHEET</h6>
            </div>
            <table className="d-flex justify-content-center">
              <tbody>
                <tr>
                  <td style={{ width: "100%" }} className="bolder text-center">
                    TO:{" "}
                    {moment(TableList?.Table2?.[0]?.ToDate).format(
                      "DD-MM-YYYY"
                    )}
                    FROM:{" "}
                    {moment(TableList?.Table2?.[0]?.FromDate).format(
                      "DD-MM-YYYY"
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <br />
          <h6 className="text-left">GL-BS</h6>
          <div
            className="d-flex justify-content-between"
            style={{ width: "100%" }}
          >
            <table
              style={{ width: "50%", borderRight: "0" }}
              className="tbl-row-border"
            >
              <thead
                style={{
                  backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                    ?.ColourCode,
                  borderRight: "0",
                }}
                className="tbl-hd-row"
              >
                <tr>
                  <th style={{ paddingLeft: 8 }} className="text-left">
                    Assets
                  </th>
                  <th style={{ paddingRight: 8 }} className="text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody style={{ borderRight: 0 }}>
                {TableList?.Table?.map((x) => (
                  <Fragment>
                    <tr className="tbl-row-border" style={{ width: "50%" }}>
                      <td
                        style={{
                          paddingLeft: 8,
                          fontWeight: "bold",
                          width: "85%",
                        }}
                        className="text-left"
                      >
                        <strong style={{ fontSize: 13, fontWeight: "bold" }}>
                          {x.ParentAccName === "Total" ? null : x.ParentAccName}
                        </strong>
                      </td>
                      <td
                        style={{
                          paddingRight: 8,
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                        colSpan={2}
                        className={
                          x.ParentAccName == "Total"
                            ? "text-right double-underline"
                            : "text-right"
                        }
                        // className="text-right"
                      >
                        <div style={{ display: "flex", flexDirection: "row", justifyContent:'space-between' }}>
                          <div style={{ marginRight: x.ParentAccName === "Total"
                              ? 0
                              : 10 }}>
                            {x.ParentAccName === "Total"
                              ? x.ParentAccName
                              : null}
                          </div>
                          <div>{x.Amount}</div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
            <table style={{ width: "50%" }} className="tbl-row-border">
              <thead
                style={{
                  backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                    ?.ColourCode,
                }}
                className="tbl-hd-row"
              >
                <tr>
                  <th style={{ paddingLeft: 8 }} className="text-left">
                    Liabilities
                  </th>
                  <th style={{ paddingRight: 8 }} className="text-right">
                    Amount
                  </th>
                </tr>
              </thead>
              <tbody>
              {TableList?.Table1?.map((x) => (
                  <Fragment>
                    <tr className="tbl-row-border" style={{ width: "50%" }}>
                      <td
                        style={{
                          paddingLeft: 8,
                          fontWeight: "bold",
                          width: "85%",
                        }}
                        className="text-left"
                      >
                        <strong style={{ fontSize: 13, fontWeight: "bold" }}>
                          {x.ParentAccName === "Total" ? null : x.ParentAccName}
                        </strong>
                      </td>
                      <td
                        style={{
                          paddingRight: 8,
                          fontWeight: "bold",
                          fontSize: 12,
                        }}
                        colSpan={2}
                        className={
                          x.ParentAccName == "Total"
                            ? "text-right double-underline"
                            : "text-right"
                        }
                        // className="text-right"
                      >
                        <div style={{ display: "flex", flexDirection: "row", justifyContent:'space-between' }}>
                          <div style={{ marginRight: x.ParentAccName === "Total"
                              ? 0
                              : 10 }}>
                            {x.ParentAccName === "Total"
                              ? x.ParentAccName
                              : null}
                          </div>
                          <div>{x.Amount}</div>
                        </div>
                      </td>
                    </tr>
                  </Fragment>
                ))}
              </tbody>
            </table>
          </div>
          <div
            style={{
              backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                ?.ColourCode,
              marginTop: "60px",
              width: "100%",
            }}
          >
            <p className="bolder mgbtm" style={{ color: "#fff" }}>
              Wild Venture Water Park and Resort
            </p>
            <p className="bolder mgbtm" style={{ color: "#fff" }}>
              Super Highway Karachi, Gadap Road 04 Away From Baqai Medical
              University Super Highway, Gadap Road Karachi
            </p>
          </div>
        </div>
      ) : null}
      <div style={{ display: "none" }}>
        <BalanceSheetReport ref={onPrintReportRef} />
      </div>
    </Fragment>
  );

  const onPrintReport = useReactToPrint({
    content: () => onPrintReportRef.current,
  });

  return (
    <CrudFormComponent
      formName="Balance Sheet "
      reportName="Balance Sheet Report"
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
export default BalanceSheet;
