import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Input, Label, Row } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import {
  Insert,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";
import { decryptData } from "../../../EncryptData";
import {
  COMPANY_DETAILS,
  COMPANY_ID,
  LOGINID,
} from "../../../utils/EncryptedConstants";
import { VOUCHER_APPROVAL } from "../../../utils/UrlConstants";
import { PostRequest } from "../../../utils/Config";
import moment from "moment/moment";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupButton from "../../../components/GeneralComponent/FormGroupButton";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
} from "../../../components/Alert";

const VoucherApproval = () => {
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  useEffect(() => {}, []);

  const [showTable, setShowTable] = useState(false);

  const dispatch = useDispatch();

  const initialSearchFields = {
    operationID: Select,
    companyID: decryptData(COMPANY_ID, SessionStorage),
    transTypeID: 0,
    userId: decryptData(LOGINID, SessionStorage),
    fromDate: "2023-08-17T13:28:12.807Z",
    toDate: "2023-08-17T13:28:12.807Z",
    tbL_TYPE_VOUCHERAPPROVALS_: [
      {
        vouMasterId: 0,
        vouDetailId: 0,
        isApproved: true,
      },
    ],
  };

  const columns = [{ field: "SetupDetailName", name: "Voucher" }];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const searchPanel = (
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
      ...initialSearchFields,
      fromDate: SearchFields?.fromDate,
      toDate: SearchFields?.toDate,
    };
    PostRequest(VOUCHER_APPROVAL, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.VoucherApprovals,
            SearchFields: SearchFields,
          },
        });
        setShowTable(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = () => {
    const payload = {
      operationID: Insert,
      companyID: decryptData(COMPANY_ID, SessionStorage),
      transTypeID: 0,
      userId: decryptData(LOGINID, SessionStorage),
      fromDate: SearchFields?.fromDate,
      toDate: SearchFields?.toDate,
      tbL_TYPE_VOUCHERAPPROVALS_: TableList?.map((x) => ({
        vouMasterId: x.Vou_MasterId,
        vouDetailId: 0,
        isApproved: x.IsApproved,
      })),
    };
    PostRequest(VOUCHER_APPROVAL, payload)
      .then((res) => {
        console.log(res?.data);
        if (res?.data?.VoucherApprovals?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.VoucherApprovals?.[0]?.Message);
        } else {
          CustomErrorMessage(res?.data?.VoucherApprovals?.[0]?.Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
  };

  const handleClickApprove = (e, item, index) => {
    TableList[index][e.target.name] = e.target.value;
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: TableList,
        SearchFields: SearchFields,
      },
    });
  };

  const customTable = (
    <>
      <Row>
        <Col>
          <div>
            <table className="table mb-0 mt-2">
              <thead>
                <tr>
                  <th
                    className="text-center"
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                  >
                    S.No
                  </th>
                  <th
                    className="text-center"
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                  >
                    Journal Name
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-center"
                  >
                    Transaction Type
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-center"
                  >
                    Date
                  </th>

                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-center"
                  >
                    Amount
                  </th>
                  <th
                    style={{
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                      borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                        ?.ColourCode,
                    }}
                    className="text-center"
                  >
                    Approve
                  </th>
                </tr>
              </thead>
              <tbody>
                {TableList?.length > 0 &&
                  TableList?.map((item, index) => {
                    return (
                      <tr style={{ verticalAlign: "middle" }} key={index}>
                        <td className="text-center">{index + 1}</td>
                        <td className="text-center">{item?.JournalName}</td>
                        <td className="text-center">{item?.TransType}</td>
                        <td className="text-center">
                          {moment(new Date(item?.Date)).format("DD-MM-YYYY")}
                        </td>
                        <td className="text-center">{item?.Debit}</td>
                        <td className="text-center">
                          <FormGroupCheckbox
                            name="IsApproved"
                            value={item.IsApproved}
                            onChange={(e) => {
                              handleClickApprove(e, item, index);
                            }}
                          />
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
            {TableList?.length == 0 && (
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
      <br />
      <Row>
        <Col className="text-right">
          <div>
            <FormGroupButton
              title="Submit"
              onClick={submitForm}
              id="add-btn"
            ></FormGroupButton>
          </div>
        </Col>
      </Row>
    </>
  );

  const handleClickBulkApprove = () => {
    const bulkChecked = TableList?.map((x) => ({
      ...x,
      IsApproved: true,
    }));
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: bulkChecked,
        SearchFields: SearchFields,
      },
    });
  };

  const customButton = (
    <div>
      <FormGroupButton
        title="Check All"
        onClick={handleClickBulkApprove}
        id="add-btn"
      ></FormGroupButton>
    </div>
  );

  const customMessage = (
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
      Please Search
    </div>
  );

  return (
    <CrudFormComponent
      formName="Voucher Approval"
      tableColumns={columns}
      customTable={showTable === true ? customTable : customMessage}
      tableRows={TableList}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      customButton={showTable === true ? customButton : null}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
    />
  );
};

export default VoucherApproval;
