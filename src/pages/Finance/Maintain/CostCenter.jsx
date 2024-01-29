import React, { Fragment } from "react";
import moment from "moment/moment";
import ReactSelect from "react-select";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import {
  Delete,
  Insert,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest } from "../../../utils/Config";

import {
  CustomErrorMessage,
  DeleteWithConfirmation,
  CustomSuccessAlert,
} from "../../../components/Alert";
import { decryptData } from "../../../EncryptData";
import {
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";
import { COST_CENTER, CUSTOMER_SETUP } from "../../../utils/UrlConstants";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";

const initialSearchFields = {
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
const initialFormFields = {
  operationID: Insert,
  costcenterID: 0,
  name: "",
  ccNatureID: 0,
  ccTypeID: 0,
  companyID: decryptData(COMPANY_ID, SessionStorage),
  beginingDate: "",
  expectedDate: "",
  actualDate: "",
  isActive: true,
  userID: decryptData(LOGINID, SessionStorage),
  userIP: decryptData(UserNetworkInfo)?.IPv4,
};

const CostCenter = () => {
  const { SearchFields, FormFields, SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const { PartyNature, PartyType, PartyDetails } = SupportingTables;

  const [selectedNature, setSelectedNature] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedPartyDetails, setSelectedPartyDetails] = useState(null);

  const [selectedNatureSearch, setSelectedNatureSearch] = useState(null);
  const [selectedTypeSearch, setSelectedTypeSearch] = useState(null);
  const [selectedPartyDetailsSearch, setSelectedPartyDetailsSearch] =
    useState(null);

  useEffect(() => {
    getPartyDetails();
    getCostCenter();
  }, []);

  const getPartyDetails = () => {
    const payload = {
      operationID: Select,
      partyInfoID: 0,
      pName: "string",
      pCode: "string",
      userID: 0,
      userIP: "string",
      partyInformation_: [
        {
          partyTypeID: 0,
          coaID: 0,
          contactPerson: "string",
          cellPhone: "string",
          mailingAddress: "string",
          shippingAddress: "string",
          country: "string",
          city: "string",
          telePhone: "string",
          fax: "string",
          email: "string",
          web: "string",
          remarks: "string",
          cnic: "string",
        },
      ],
      partyDefaultDetails_: [
        {
          statusID: 0,
          advCoaID: 0,
          paymentModeID: 0,
          dueDays: 0,
          creditLimit: 0,
          businessTypeID: 0,
        },
      ],
      partyTaxSection_: [
        {
          ntn: "string",
          gst: "string",
          isFiler: true,
          isGSTExempt: true,
        },
      ],
    };
    PostRequest(CUSTOMER_SETUP, payload)
      .then((res) => {
        let PartyDetails = {
          name: "PartyDetails",
          value: res?.data?.Table?.map((x) => ({
            ...x,
            label: x.PName,
            value: x.PartyInfoID,
            dropdownName: "PartyDetails",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: PartyDetails,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function getCostCenter() {
    PostRequest(COST_CENTER, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        let PartyNature = {
          name: "PartyNature",
          value: res?.data?.Table1?.map((x) => ({
            ...x,
            label: x.CCNature,
            value: x.CostCenterNatureID,
            dropdownName: "PartyNature",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: PartyNature,
        });
        let PartyType = {
          name: "PartyType",
          value: res?.data?.Table2?.map((x) => ({
            ...x,
            label: x.CCType,
            value: x.CostcenterTypeID,
            dropdownName: "PartyType",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: PartyType,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "Name", name: "Cost Center" },
    { field: "CCType", name: "Cost Center Type" },
    { field: "CCNature", name: "Cost Center Nature" },
    { field: "PName", name: "Party" },

    { field: "BeginingDate", name: "Begining Date" },
    { field: "ExpectedDate", name: "Expected Date" },
    { field: "ActualDate", name: "Actual Date" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleInputChangeSelectSearch = (event) => {
    if (event.dropdownName === "PartyNature") {
      setSelectedNatureSearch(event);
      let data = { name: "ccNatureID", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    } else if (event.dropdownName === "PartyType") {
      setSelectedTypeSearch(event);
      let data = { name: "ccTypeID", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    } else if (event.dropdownName === "PartyDetails") {
      setSelectedPartyDetailsSearch(event);
      let data = { name: "partyInfoID", value: event.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    }
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Name"
          name="name"
          maxLength="150"
          required
          isAlphabetic="true"
          onChange={handleSearchChange}
          value={SearchFields?.name}
        />
      </Col>
      <Col md="3" lg="3" xs="12">
        <Label>Nature</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelectSearch}
          options={PartyNature}
          value={selectedNatureSearch}
        />
      </Col>
      <Col md="3" lg="3" xs="12">
        <Label>Type</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelectSearch}
          options={PartyType}
          value={selectedTypeSearch}
        />
      </Col>
      {/* <Col md="3" lg="3" xs="12">
        <Label>Party Details</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelectSearch}
          options={PartyDetails}
          value={selectedPartyDetailsSearch}
        />
      </Col> */}
      <Col lg="3" md="3" xs="12">
        <Label>
          Begining Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="beginingDate"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.beginingDate}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          Expected Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="expectedDate"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.expectedDate}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <Label>
          Actual Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="actualDate"
          type="date"
          onChange={handleSearchChange}
          value={SearchFields?.actualDate}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="isActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      operationID: Search,
      costcenterID: 0,
      userID: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };

    PostRequest(COST_CENTER, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: SearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = (id) => {
    const payload = {
      ...FormFields,
      operationID: id,
      costcenterID: id === 2 ? 0 : FormFields?.costcenterID,
      userID: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };
    PostRequest(COST_CENTER, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res?.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
          getCostCenter();
        } else {
          CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let ccNatureEvent = { label: obj?.CCNature, value: obj?.CCNatureID };
    let ccTypeEvent = { label: obj?.CCType, value: obj?.CCTypeID };
    let ccPartyInfoType = { label: obj?.PName, value: obj?.PartyInfoID };
    setSelectedNature(ccNatureEvent);
    setSelectedType(ccTypeEvent);
    setSelectedPartyDetails(ccPartyInfoType);
    let data = {
      costcenterID: obj?.CostcenterID,
      name: obj?.Name,
      ccNatureID: obj?.CCNatureID,
      ccTypeID: obj?.CCTypeID,
      companyID: decryptData(COMPANY_ID, SessionStorage),
      // partyInfoID: obj?.PartyInfoID,
      beginingDate: moment(obj.BeginingDate).format("YYYY-MM-DD"),
      expectedDate: moment(obj.ExpectedDate).format("YYYY-MM-DD"),
      actualDate: moment(obj.ActualDate).format("YYYY-MM-DD"),
      isActive: obj?.IsActive,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          operationId: Delete,
          costcenterID: obj?.CostcenterID,
          name: obj?.Name,
          ccNatureID: obj?.CCNatureID,
          ccTypeID: obj?.CCTypeID,
          companyID: decryptData(COMPANY_ID, SessionStorage),
          // partyInfoID: obj?.PartyInfoID,
          beginingDate: obj.BeginingDate,
          expectedDate: obj.ExpectedDate,
          actualDate: obj.ActualDate,
          isActive: false,
          userID: decryptData(LOGINID, SessionStorage),
          userIP: decryptData(UserNetworkInfo)?.IPv4,
        };

        PostRequest(COST_CENTER, payload)
          .then((res) => {
            dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
            if (res?.data?.Table?.[0]?.HasError === 0) {
              CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
              getCostCenter();
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

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    setSelectedNatureSearch(null);
    setSelectedPartyDetailsSearch(null);
    setSelectedTypeSearch(null);
    getCostCenter();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
    setSelectedNature(null);
    setSelectedPartyDetails(null);
    setSelectedType(null);
  };

  const handleInputChangeSelectAdd = (event) => {
    if (event.dropdownName === "PartyNature") {
      setSelectedNature(event);
      let data = { name: "ccNatureID", value: event.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    } else if (event.dropdownName === "PartyType") {
      setSelectedType(event);
      let data = { name: "ccTypeID", value: event.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    } else if (event.dropdownName === "PartyDetails") {
      setSelectedPartyDetails(event);
      let data = { name: "partyInfoID", value: event.value };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
  };

  const formPanel = (
    <Fragment>
      <Col lg="4" md="4" xs="12">
        <FormGroupInput
          label="Name"
          name="name"
          maxLength="150"
          required
          isAlphabetic="true"
          onChange={handleAddChange}
          value={FormFields?.name}
        />
      </Col>
      <Col md="4" lg="4" xs="12">
        <Label>Nature</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelectAdd}
          options={PartyNature}
          value={selectedNature}
        />
      </Col>
      <Col md="4" lg="4" xs="12">
        <Label>Type</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelectAdd}
          options={PartyType}
          value={selectedType}
        />
      </Col>
      {/* <Col md="6" lg="6" xs="12">
        <Label>Party Details</Label>
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={handleInputChangeSelectAdd}
          options={PartyDetails}
          value={selectedPartyDetails}
        />
      </Col> */}

      <Col lg="4" md="4" xs="12">
        <Label>
          Begining Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="beginingDate"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.beginingDate}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <Label>
          Expected Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="expectedDate"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.expectedDate}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <Label>
          Actual Date
          <span className="text-danger">*</span>
        </Label>
        <Input
          name="actualDate"
          type="date"
          onChange={handleAddChange}
          value={FormFields?.actualDate}
          required
        />
      </Col>
      <Col lg="4" md="4" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="isActive"
          value={FormFields?.isActive}
          onChange={handleAddChange}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Cost Center"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      modalStyle={{ minWidth: "60vw", width: "60%" }}
    />
  );
};

export default CostCenter;
