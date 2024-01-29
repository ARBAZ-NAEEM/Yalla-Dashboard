import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row, Label } from "reactstrap";
import FormGroupInput from "../../../../components/GeneralComponent/FormGroupInput";
import { SET_INITIAL_DROPDOWN_FORM_STATE } from "../../../../redux/actionType/CrudActionTypes";
import ReactSelect from "react-select";
import { CHARTOFACCOUNT } from "../../../../utils/UrlConstants";
import { PostRequest } from "../../../../utils/Config";
import {
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../../utils/EncryptedConstants";
import { decryptData } from "../../../../EncryptData";
import { Select, SessionStorage } from "../../../../common/SetupMasterEnum";

const Vendor = (props) => {
  const dispatch = useDispatch();

  const {
    SupportingTables,
    SupportingTables: { CustomerData },
  } = useSelector((state) => state.CrudFormReducer);
  const [selectedChartOfAccount, setSelectedChartOfAccount] = useState(null);

  const { ChartOfAccount } = SupportingTables;

  const initialChartOfAccount = {
    OperationID: Select,
    CoaID: 0,
    AccNatureID: 0,
    AccCode: "",
    AccName: "ACCOUNT PAYABLE",
    companyID: decryptData(COMPANY_ID, SessionStorage),
    ParentAccCode: "",
    AccTypeID: 0,
    Remarks: "",
    AccNature: "",
    FyID: 0,
    IsActive: true,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const {
    partyInformation_ = {},
    formMasterFields = {},
    setPartyInformation_ = () => {},
    setFormMasterFields = () => {},
    FormId,
  } = props;

  useEffect(() => {
    setPartyInformation_({ ...partyInformation_, ...CustomerData?.[0] });
    console.log(CustomerData);
    getChartOfAccount();
  }, [CustomerData]);

  // const handleAddChange = (e) => {
  //   console.log(e);
  //   let data = { name: e.target.name, value: e.target.value };
  //   dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  // };

  const getChartOfAccount = () => {
    PostRequest(CHARTOFACCOUNT, initialChartOfAccount)
      .then((res) => {
        let ChartOfAccount = {
          name: "ChartOfAccount",
          value: res?.data?.Table?.map((x) => ({
            ...x,
            value: x.CoaID,
            label: x.AccName,
            dropdownName: "ChartOfAccount",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: ChartOfAccount,
        });
        setSelectedChartOfAccount({
          value: res?.data?.Table?.[0]?.CoaID,
          label: res?.data?.Table?.[0]?.AccName,
        });
        setFormMasterFields({
          ...formMasterFields,
          parentCoaID: res?.data?.Table?.[0]?.CoaID,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleAddChange = (e) => {
    setPartyInformation_({
      ...partyInformation_,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChangeSelect = (event) => {
    if (event.dropdownName === "ChartOfAccount") {
      setSelectedChartOfAccount(event);
      setFormMasterFields({
        ...formMasterFields,
        parentCoaID: event.CoaID,
      });
    }
  };

  // const handleInputChangeSelect = (event) => {
  //   if (event.dropdownName === "ChartOfAccount") {
  //     setSelectedChartOfAccount(event);
  //     let data = { name: "ChartOfAccount", value: event.CoaID };
  //     dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  //   }
  // };

  return (
    <Fragment>
      <Row>
        <Col lg="3" md="3" xs="12">
          <Label>Chart Of Account</Label>
          <ReactSelect
            closeMenuOnSelect={true}
            onChange={handleInputChangeSelect}
            options={ChartOfAccount}
            value={selectedChartOfAccount}
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Contact Person"
            name="ContactPerson"
            value={partyInformation_?.ContactPerson}
            onChange={handleAddChange}
            required
            form={FormId}
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Cell Phone:"
            name="CellPhone"
            isNumber="true"
            maxLength={12}
            value={partyInformation_?.CellPhone}
            onChange={handleAddChange}
            required
            form={FormId}
          />
        </Col>
        <Col lg="3" md="3" xs="3">
          <FormGroupInput
            label="CNIC:"
            name="Cnic"
            isNumber="true"
            maxLength={13}
            value={partyInformation_?.Cnic}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6" xs="6">
          <FormGroupInput
            label="Mailing Address"
            type="textarea"
            name="MailingAddress"
            maxLength={255}
            value={partyInformation_?.MailingAddress}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="6" md="6" xs="6">
          <FormGroupInput
            label="Shipping Address"
            type="textarea"
            name="ShippingAddress"
            maxLength={255}
            value={partyInformation_?.ShippingAddress}
            onChange={handleAddChange}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="2" md="2" xs="12">
          <FormGroupInput
            label="Country:"
            name="Country"
            maxLength={22}
            value={partyInformation_?.Country}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="2" md="2" xs="12">
          <FormGroupInput
            label="City:"
            name="City"
            maxLength={22}
            value={partyInformation_?.City}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="2" md="2" xs="12">
          <FormGroupInput
            label="TelePhone:"
            name="TelePhone"
            isNumber="true"
            maxLength={12}
            value={partyInformation_?.TelePhone}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="2" md="2" xs="12">
          <FormGroupInput
            label="Fax:"
            name="Fax"
            maxLength={30}
            value={partyInformation_?.Fax}
            onChange={handleAddChange}
          />
        </Col>
        <Col lg="2" md="2" xs="12">
          <FormGroupInput
            label="Email:"
            name="Email"
            maxLength={25}
            value={partyInformation_?.Email}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="2" md="2" xs="12">
          <FormGroupInput
            label="Web:"
            name="Web"
            maxLength={30}
            value={partyInformation_?.Web}
            onChange={handleAddChange}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6" xs="6">
          <FormGroupInput
            label="Remarks"
            type="textarea"
            name="Remarks"
            maxLength={255}
            value={partyInformation_?.Remarks}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Vendor;
