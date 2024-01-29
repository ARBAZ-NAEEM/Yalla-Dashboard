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
} from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import {
  RESET_SEARCH_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest, Setup_Setup_FIN_COA } from "../../../utils/Config";
import { CUSTOMER_SETUP } from "../../../utils/UrlConstants";
import Customer from "./CustomerTabs/Customer";
import Default from "./CustomerTabs/Default";
import OtherInfo from "./CustomerTabs/OtherInfo";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
} from "../../../components/Alert";
import { decryptData } from "../../../EncryptData";
import { Insert, SessionStorage } from "../../../common/SetupMasterEnum";
import {
  COMPANY_DETAILS,
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";

const CustomerSetup = (props) => {
  const { SearchFields, FormFields, SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );

  const intialPartyInformation_ = {
    PartyTypeID: 3,
    CoaID: 0,
    AccName: "",
    ContactPerson: "",
    CellPhone: "",
    MailingAddress: "",
    ShippingAddress: "",
    Country: "",
    City: "",
    TelePhone: "",
    Fax: "",
    Email: "",
    Web: "",
    Remarks: "",
    Cnic: "",
  };

  const intialPartyDefaultDetails_ = {
    StatusID: 1,
    AdvCoaID: 1,
    PaymentModeID: 1,
    DueDays: 1,
    CreditLimit: 1,
    BusinessTypeID: 1,
  };

  const initialpartyTaxSection_ = {
    NTN: "",
    GST: "",
    IsFiler: true,
    IsGSTExempt: true,
  };

  const [partyInformation_, setPartyInformation_] = useState({
    ...intialPartyInformation_,
  });

  const [partyDefaultDetails_, setPartyDefaultDetails_] = useState({
    ...intialPartyDefaultDetails_,
  });

  const [partyTaxSection_, setpartyTaxSection_] = useState({
    ...initialpartyTaxSection_,
  });

  const initialFormFields = {
    OperationID: Insert,
    CompanyID: decryptData(COMPANY_ID, SessionStorage),
    PartyInfoID: 0,
    PartyTypeID: 3,
    parentCoaID: 0,
    PName: "",
    PCode: "",
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
    partyInformation_: intialPartyInformation_,
    partyDefaultDetails_: intialPartyDefaultDetails_,
    partyTaxSection_: initialpartyTaxSection_,
  };

  const initialSearchFields = {
    OperationID: 1,
    CompanyID: decryptData(COMPANY_ID, SessionStorage),
    PartyInfoID: 0,
    PartyTypeID: 3,
    parentCoaID: 0,
    PName: "",
    PCode: "",
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
    partyInformation_: [],
    partyDefaultDetails_: [],
    partyTaxSection_: [],
  };

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [toggle, setToggle] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [formMasterFields, setFormMasterFields] = useState(initialFormFields);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
    getCustomer();
  }, []);

  const getCustomer = () => {
    PostRequest(CUSTOMER_SETUP, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            SearchFields: initialSearchFields,
            FormFields: initialFormFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "PName", name: "Name" },
    { field: "ContactPerson", name: "Contact Person" },
    { field: "CellPhone", name: "Cell Phone" },
    { field: "BusinessTypeID", name: "Bussiness Type" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const onEditRow = (obj) => {
    const payload = {
      OperationID: 1,
      CompanyID: decryptData(COMPANY_ID, SessionStorage),
      PartyInfoID: obj?.PartyInfoID,
      PartyTypeID: 3,
      parentCoaID: 0,
      PName: "",
      PCode: "",
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
      partyInformation_: [],
      partyDefaultDetails_: [],
      partyTaxSection_: [],
    };
    PostRequest(CUSTOMER_SETUP, payload)
      .then((res) => {
        let CustomerData = { name: "CustomerData", value: res?.data?.Table };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: CustomerData,
        });
        let DefaultData = { name: "DefaultData", value: res?.data?.Table1 };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: DefaultData,
        });
        let TaxData = { name: "TaxData", value: res?.data?.Table2 };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: TaxData,
        });
      })
      .catch((err) => {
        console.error(err);
      });
    setToggle(true);
    setFormMasterFields({
      ...formMasterFields,
      PName: obj.PName,
      CompanyID: decryptData(COMPANY_ID, SessionStorage),
      PCode: obj.PCode,
      PartyInfoID: obj?.PartyInfoID,
      PartyTypeID: 3,
      parentCoaID: obj?.PartyCoaID,
      // partyInformation_: obj?.partyInformation_,
    });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={SupportingTables?.COADropdown?.Table}
          label="Customer"
          name="HeadId"
          fieldId="HeadId"
          fieldName="Head"
          onChange={handleSearchChange}
          value={SearchFields?.HeadId}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    Setup_Setup_FIN_COA(SearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
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
    getCustomer();
  };

  const onDeleteRow = (obj) => {};

  const submitForm = (e) => {
    e.preventDefault();
    if (
      formMasterFields?.parentCoaID === 0 &&
      partyInformation_?.ContactPerson === "" &&
      partyInformation_?.CellPhone === ""
    ) {
      CustomErrorMessage("Please Fill All Required Fields");
    } else {
      const mainPayload = {
        ...formMasterFields,
        partyInformation_: [partyInformation_],
        partyDefaultDetails_: [partyDefaultDetails_],
        partyTaxSection_: [partyTaxSection_],
      };
      PostRequest(CUSTOMER_SETUP, mainPayload)
        .then((res) => {
          if (res.data?.Table[0]?.HasError === 0) {
            CustomSuccessAlert(res.data?.Table[0]?.Message);
            getCustomer();
            setFormMasterFields({
              ...initialFormFields,
            });
            setToggle(false);
          } else {
            CustomErrorMessage(res.data?.Table[0]?.Message);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  const handleClickButton = () => {
    let CustomerData = { name: "CustomerData", value: [] };
    dispatch({
      type: SET_INITIAL_DROPDOWN_FORM_STATE,
      payload: CustomerData,
    });
    let DefaultData = { name: "DefaultData", value: [] };
    dispatch({
      type: SET_INITIAL_DROPDOWN_FORM_STATE,
      payload: DefaultData,
    });
    let TaxData = { name: "TaxData", value: [] };
    dispatch({
      type: SET_INITIAL_DROPDOWN_FORM_STATE,
      payload: TaxData,
    });
    setToggle(true);
  };

  const handleFormCancel = () => {
    setToggle(false);

    setFormMasterFields({
      ...initialFormFields,
    });
    setPartyInformation_(intialPartyInformation_);
    setPartyDefaultDetails_(intialPartyDefaultDetails_);
    setpartyTaxSection_(initialpartyTaxSection_);
  };

  const handleAddChange = (e) => {
    setFormMasterFields({
      ...formMasterFields,
      [e.target.name]: e.target.value,
    });
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
        Customer
      </ModalHeader>
      <ModalBody
        style={{ minHeight: "600px", maxHeight: "600px", overflowY: "scroll" }}
      >
        <form
          id={
            activeTab === "1" ? "Form1" : activeTab === "2" ? "Form2" : "Form3"
          }
          onSubmit={submitForm}
        ></form>
        <Row style={{ marginBottom: "14px" }}>
          <Col lg="2" md="2" xs="12">
            <FormGroupInput
              label="Customer Code"
              name="PCode"
              maxLength={25}
              onChange={handleAddChange}
              value={formMasterFields?.PCode}
              form={
                activeTab === "1"
                  ? "Form1"
                  : activeTab === "2"
                  ? "Form2"
                  : "Form3"
              }
            />
          </Col>
          <Col lg="2" md="2" xs="12">
            <FormGroupInput
              label="Customer Name"
              name="PName"
              maxLength={25}
              isAlphabetic="true"
              required
              onChange={handleAddChange}
              value={formMasterFields?.PName}
              form={
                activeTab === "1"
                  ? "Form1"
                  : activeTab === "2"
                  ? "Form2"
                  : "Form3"
              }
            />
          </Col>
        </Row>
        <Row style={{ padding: "14px" }}>
          <Fragment>
            <Nav pills>
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
                  Customer
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "2" ? "active" : ""}
                  onClick={() => setActiveTab("2")}
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                    color: "white",
                  }}
                >
                  Default
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={activeTab === "3" ? "active" : ""}
                  onClick={() => setActiveTab("3")}
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                    color: "white",
                  }}
                >
                  Tax Info
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
                <Customer
                  partyInformation_={partyInformation_}
                  setPartyInformation_={setPartyInformation_}
                  formMasterFields={formMasterFields}
                  setFormMasterFields={setFormMasterFields}
                  FormId="Form1"
                />
              </TabPane>
              <TabPane style={{ marginTop: 10 }} tabId="2">
                <Default
                  partyDefaultDetails_={partyDefaultDetails_}
                  setPartyDefaultDetails_={setPartyDefaultDetails_}
                  FormId="Form2"
                />
              </TabPane>
              <TabPane style={{ marginTop: 10 }} tabId="3">
                <OtherInfo
                  partyTaxSection_={partyTaxSection_}
                  setpartyTaxSection_={setpartyTaxSection_}
                  FormId="Form3"
                />
              </TabPane>
            </TabContent>
          </Fragment>
        </Row>

        <div style={{ display: "flex", justifyContent: "flex-end" }}>
          <Button
            color="primary"
            form={
              activeTab === "1"
                ? "Form1"
                : activeTab === "2"
                ? "Form2"
                : "Form3"
            }
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
      <Button
        color="secondary"
        className="btn"
        onClick={handleClickButton}
        style={{
          backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
            ?.ColourCode,
          borderColor: decryptData(COMPANY_DETAILS, SessionStorage)?.ColourCode,
        }}
      >
        Add
      </Button>
    </div>
  );

  return (
    <CrudFormComponent
      formName="Customer"
      customButton={customButton}
      tableColumns={columns}
      tableRows={TableList}
      customModal={customModal}
      searchPanel={searchPanel}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      searchSubmit={submitSearch}
      cancelSearch={cancelSearch}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default CustomerSetup;
