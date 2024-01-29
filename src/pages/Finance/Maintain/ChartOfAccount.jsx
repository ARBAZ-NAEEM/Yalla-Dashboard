import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import {
  Insert,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import {
  RESET_FORM_FIELDS,
  RESET_SEARCH_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest, Setup_Setup_FIN_COA } from "../../../utils/Config";
import Account from "./ChartOfAccountTabs/Account";
import CurrentYear from "./ChartOfAccountTabs/CurrentYear";
import {
  ACCOUNTNATURE,
  CHARTOFACCOUNT,
  REPORTS_GENERAL_LEDGER,
} from "../../../utils/UrlConstants";
import {
  COMPANY_DETAILS,
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
} from "../../../components/Alert";
import FormGroupButton from "../../../components/GeneralComponent/FormGroupButton";
import moment from "moment";

const intialGLFields = {
  operationID: Select,
  companyID: decryptData(COMPANY_ID, SessionStorage),
  costCenterId: 0,
  coaid: 0,
  fromDate: "1900-01-01",
  toDate: "1900-01-01",
};

const initialSearchFields = {
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

const initialFormFields = {
  OperationID: Select,
  CompanyID: decryptData(COMPANY_ID, SessionStorage),
  CoaID: 0,
  AccNatureID: 0,
  AccCode: "",
  AccName: "",
  ParentCoaID: 0,
  AccTypeID: 0,
  Remarks: "",
  AccNature: "",
  FyID: 0,
  IsActive: true,
  UserID: decryptData(LOGINID, SessionStorage),
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const intialAccountNatureFields = {
  OperationID: Select,
  AccNatureID: 0,
  AccNature: "",
  IsActive: true,
  userID: 0,
  UserIP: decryptData(UserNetworkInfo)?.IPv4,
};

const ChartOfAccounts = (props) => {
  const { SearchFields, FormFields, SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [toggle, setToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [operationId, setOperationId] = useState(2);

  const [selectedAccountNature, setSelectedAccountNature] = useState(null);

  const [childAccount, setChildAccount] = useState([]);

  const [toggleSecondModal, setToggleSecondModal] = useState(false);

  const dispatch = useDispatch();

  const { AccountNatureList, AccountsList, ChartOfAccountGL } =
    SupportingTables;

  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
    getChartOfAccounts();
    getAccountNature();
  }, []);

  function getChartOfAccounts(natureId) {
    PostRequest(
      CHARTOFACCOUNT,
      natureId === undefined
        ? initialSearchFields
        : { ...initialSearchFields, AccNatureID: natureId }
    )
      .then((res) => {
        if (natureId !== undefined) {
          let AccountsList = {
            name: "AccountsList",
            value: res?.data?.Table,
          };
          dispatch({
            type: SET_INITIAL_DROPDOWN_FORM_STATE,
            payload: AccountsList,
          });
        } else {
          let accountTypeName = {
            name: "accountTypeName",
            value: res?.data?.Table1,
          };
          dispatch({
            type: SET_INITIAL_DROPDOWN_FORM_STATE,
            payload: accountTypeName,
          });
          dispatch({
            type: SET_INITIAL_CRUD_FORM_STATE,
            payload: {
              List: res?.data?.Table.map((x) => ({
                ...x,
                IsActive: x.IsActive ? "Active" : "InActive",
              })),
              SearchFields: initialSearchFields,
            },
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getAccountNature() {
    PostRequest(ACCOUNTNATURE, intialAccountNatureFields)
      .then((res) => {
        let AccountNatureList = {
          name: "AccountNatureList",
          value: res?.data?.Table,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: AccountNatureList,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "AccID", name: "A/C #" },
    { field: "AccCode", name: "Account Code" },
    { field: "AccName", name: "Account Name" },
    { field: "ParentCoaID", name: "Parent A/C #" },
    { field: "CoaID", name: "Code" },
    { field: "AccNature", name: "Nature" },
    { field: "IsActive", name: "Is Active" },
  ];

  const handleSearchChange = (e) => {
    const { name, value } = e.target;
    if (name === "AccNatureID") {
      getChartOfAccounts(value);
    }
    let data = { name: name, value: value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const onEditRow = (obj) => {
    let bindDropDownAccname = { value: obj.AccNatureID, label: obj.AccNature };
    setSelectedAccountNature(bindDropDownAccname);
    setOperationId(3);
    let data = {
      CompanyID: decryptData(COMPANY_ID, SessionStorage),
      CoaID: obj?.CoaID,
      AccNatureID: obj?.AccNatureID,
      AccCode: obj?.AccCode,
      AccName: obj?.AccName,
      ParentCoaID: obj?.ParentCoaID,
      AccTypeID: obj?.AccTypeID,
      AccType: obj?.AccType,
      Remarks: obj.Remarks,
      IsActive: obj?.IsActive === "Active" ? true : false,
      UserIP: obj?.UserIP,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
    setToggle(true);
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={AccountNatureList}
          label="Head of Account"
          name="AccNatureID"
          fieldId="AccNatureID"
          fieldName="AccNature"
          onChange={handleSearchChange}
          value={SearchFields?.AccNatureID}
        />
      </Col>

      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={AccountsList}
          label="Account"
          name="CoaId"
          fieldId="CoaID"
          fieldName="AccNameCode"
          onChange={handleSearchChange}
          value={SearchFields?.CoaId}
        />
      </Col>
    </Fragment>
  );

  const styles = {
    activetab: {
      backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)?.ColourCode,
      color: "white",
    },
  };

  const submitSearch = () => {
    PostRequest(CHARTOFACCOUNT, SearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table.map((x) => ({
              ...x,
              IsActive: x.IsActive ? "Active" : "InActive",
            })),
            SearchFields: SearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const cancelSearch = () => {
    dispatch({ type: RESET_SEARCH_FIELDS, payload: initialSearchFields });
    getChartOfAccounts();
  };

  const onDeleteRow = (obj) => {
    console.log(obj);
  };

  const submitForm = () => {
    const payload = {
      ...FormFields,
      OperationID: operationId,
      CompanyID: decryptData(COMPANY_ID, SessionStorage),
      CoaID: operationId === 2 ? 0 : FormFields?.CoaID,
      ParentCoaID: FormFields?.ParentCoaID === "" ? 0 : FormFields?.ParentCoaID,
      FyID: 0,
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(CHARTOFACCOUNT, payload)
      .then((res) => {
        if (res?.data?.Table?.[0]?.HasError === 0) {
          dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
          CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
          setToggle(false);
          setSelectedAccountNature(null);
          getChartOfAccounts();
          setOperationId(2);
        } else {
          CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleClickButton = () => {
    setToggle(true);
  };

  const handleFormCancel = () => {
    setToggle(false);
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    setOperationId(2);
    setSelectedAccountNature(null);
  };

  const customModal = (
    <Modal
      isOpen={toggle}
      centered
      style={{ maxWidth: "1500px", width: "100%" }}
      modalTransition={{ timeout: 10 }}
      backdrop="static"
    >
      <ModalHeader
        style={{
          backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
            ?.ColourCode,
        }}
      >
        Chart of Account
      </ModalHeader>
      <ModalBody
        style={{ minHeight: "600px", maxHeight: "600px", overflowY: "scroll" }}
      >
        <Row>
          <Fragment>
            <Nav
              pills
              style={{
                borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                  ?.ColourCode,
                color: "white",
              }}
            >
              <NavItem>
                <NavLink
                  className={activeTab === "1" ? "active" : ""}
                  onClick={() => setActiveTab("1")}
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                    color: "white",
                  }}
                >
                  Account
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "2" ? "active" : ""}
                  onClick={() => setActiveTab("2")}
                  style={styles.activetab}
                >
                  Current Year
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent
              style={{
                backgroundColor: "white",
                borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                  ?.ColourCode,
              }}
              className="tab-content-inner"
              activeTab={activeTab}
            >
              <TabPane style={{ marginTop: 10 }} tabId="1">
                <Account
                  selectedAccountNature={selectedAccountNature}
                  setSelectedAccountNature={setSelectedAccountNature}
                />
              </TabPane>
              <TabPane style={{ marginTop: 10 }} tabId="2">
                <CurrentYear {...props} />
              </TabPane>
            </TabContent>
          </Fragment>
        </Row>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="primary"
            onClick={submitForm}
            style={{
              backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                ?.ColourCode,
              borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                ?.ColourCode,
            }}
          >
            Save
          </Button>
          <Button color="default" onClick={handleFormCancel}>
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );

  const customButton = (
    <div>
      <FormGroupButton
        title="Add"
        onClick={handleClickButton}
        id="add-btn"
        //   isOpen={tooltip}
        //   toggle={() => setToolTip(!tooltip)}
        showToolTip={false}
        toolTipTitle="Add"
        showIcon={true}
      ></FormGroupButton>
    </div>
  );

  const handleClickOnDetailAccount = (e, obj) => {
    e.preventDefault();
    console.log(obj);
    debugger;
    const payload = {
      ...intialGLFields,
      coaid: obj?.CoaID,
    };
    PostRequest(REPORTS_GENERAL_LEDGER, payload)
      .then((res) => {
        console.log(res?.data);
        let ChartOfAccountGL = { name: "ChartOfAccountGL", value: res?.data };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: ChartOfAccountGL,
        });
        setToggleSecondModal(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const MenuItem = ({ item }) => {
    const [showChildren, setShowChildren] = useState(false);

    const handleClick = () => {
      setShowChildren(!showChildren);
    };

    return (
      <tr>
        <td
          className="customTd"
          style={{
            paddingLeft: 25,
            width: "70%",
          }}
        >
          <i
            style={{
              marginRight: 5,
              color: decryptData(COMPANY_DETAILS)?.ColourCode,
            }}
            class={
              showChildren ? "fa fa-angle-up fa-lg" : "fa fa-angle-down fa-lg"
            }
            aria-hidden="true"
            onClick={handleClick}
          ></i>
          {item?.AccTypeID === 1 ? (
            item.AccNameCode
          ) : (
            <a
              style={{ fontWeight: "bold" }}
              href=""
              onClick={(e) => handleClickOnDetailAccount(e, item)}
            >
              {item.AccNameCode}
            </a>
          )}

          {showChildren && item.children && item.children.length > 0 && (
            <table style={{ marginTop: 10 }} className="table table-striped  ">
              <tbody>
                {item.children.map((child) => (
                  <MenuItem key={child.AccID} item={child} />
                ))}
              </tbody>
            </table>
          )}
        </td>
        <td>
          <Button
            color="primary"
            className="btnic"
            size="sm"
            onClick={() => onEditRow(item)}
          >
            <i className="fa fa-pencil-square-o"></i>
          </Button>
        </td>
      </tr>
    );
  };

  const buildNestedMenu = (parentId = 0) => {
    return TableList.filter((item) => item.ParentCoaID == parentId).map(
      (item) => ({
        ...item,
        children: buildNestedMenu(item.CoaID),
      })
    );
  };

  const topLevelItems = buildNestedMenu();

  const customTable = (
    <table className="table table-striped tbl-row-border ">
      <thead>
        <tr>
          <th
            style={{
              backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                ?.ColourCode,
            }}
            className="text-center"
          >
            Acount Name
          </th>
          <th
            style={{
              backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                ?.ColourCode,
            }}
            className="text-center"
          >
            Action
          </th>
        </tr>
      </thead>
      <tbody>
        {topLevelItems.map((item) => (
          <MenuItem key={item.AccID} item={item} />
        ))}
      </tbody>
    </table>
  );

  const handleModalClose = () => {
    setToggleSecondModal(false);
  };

  const customModalSecond = (
    <Modal
      isOpen={toggleSecondModal}
      centered
      style={{ maxWidth: "1500px", width: "100%" }}
      modalTransition={{ timeout: 10 }}
      backdrop="static"
    >
      <ModalHeader
        style={{
          justifyContent: "center",
          backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
            ?.ColourCode,
        }}
      >
        CHART OF ACCOUNT GENERAL LEDGER
      </ModalHeader>
      <ModalBody
        style={{ minHeight: "800px", maxHeight: "800px", overflowY: "scroll" }}
      >
        <Row>
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
                    {moment(ChartOfAccountGL?.Table2?.[0]?.FromDate).format(
                      "DD-MM-YYYY"
                    )}
                    {"   "}
                    TO:{" "}
                    {moment(ChartOfAccountGL?.Table2?.[0]?.ToDate).format(
                      "DD-MM-YYYY"
                    )}
                  </td>
                  <td
                    style={{ width: "22%" }}
                    className="bolder text-left"
                  ></td>
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
                    <td style={{ fontWeight: "bold" }}>
                      {ChartOfAccountGL?.Table1?.[0]?.OpeningBal}
                    </td>
                  </tr>

                  {ChartOfAccountGL?.Table?.map((x) => (
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
                </tbody>
                <br />
                <tfoot
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
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
          </div>
        </Row>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          {/* <Button
            color="primary"
            onClick={submitForm}
            style={{
              backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                ?.ColourCode,
              borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                ?.ColourCode,
            }}
          >
            Save
          </Button> */}
          <Button color="default" onClick={handleModalClose}>
            Cancel
          </Button>
        </div>
      </ModalBody>
    </Modal>
  );

  return (
    <CrudFormComponent
      formName="Chart of Accounts"
      customButton={customButton}
      tableColumns={columns}
      tableRows={TableList}
      customModal={customModal}
      searchPanel={searchPanel}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      searchSubmit={submitSearch}
      cancelSearch={cancelSearch}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      customTable={customTable}
      customModalSecond={customModalSecond}
    />
  );
};

export default ChartOfAccounts;
