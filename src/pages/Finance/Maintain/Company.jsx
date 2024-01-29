import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Input, Row } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import {
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
  CustomSuccessAlert,
} from "../../../components/Alert";

import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import { decryptData } from "../../../EncryptData";
import {
  COMPANY_DETAILS,
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";
import { COMPANY, JOURNALS } from "../../../utils/UrlConstants";
import styled from "styled-components";
import logo_image from "../../../assets/img/upload_image.jpg";
import { SketchPicker, BlockPicker } from "react-color";

const Company = () => {
  const [sketchPickerColor, setSketchPickerColor] = useState({
    r: "241",
    g: "112",
    b: "19",
    a: "1",
  });

  const { r, g, b, a } = sketchPickerColor;

  const [hideColorPicker, setHideColorPicker] = useState(false);

  const initialSearchFields = {
    OperationID: Select,
    ColourCode: "",
    CompanyID: 0,
    ParentCompanyID: 0,
    Company: "",
    IsParent: true,
    Address: "",
    Icon: "",
    Header: "",
    Footer: "",
    Phone1: "",
    Phone2: "",
    RepresentativePhone: "",
    Ntn: "",
    Stn: "",
    IsActive: true,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const initialFormFields = {
    OperationID: Insert,
    ColourCode: "",
    CompanyID: 0,
    ParentCompanyID: 0,
    Company: "",
    IsParent: true,
    Address: "",
    Icon: "",
    Header: "",
    Footer: "",
    Phone1: "",
    Phone2: "",
    RepresentativePhone: "",
    Ntn: "",
    Stn: "",
    IsActive: true,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const { SearchFields, FormFields, TableList, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  const { Companies } = SupportingTables;

  const [formLoad, setFormLoad] = useState(true);

  useEffect(() => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
        FormFields: initialFormFields,
        SearchFields: initialSearchFields,
      },
    });
    getCompany();
  }, []);

  function getCompany() {
    PostRequest(COMPANY, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table.map((x) => ({
              ...x,
              IsActive: x.IsActive ? "Active" : "InActive",
            })),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        let data = { name: "Companies", value: res?.data?.Table };
        dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
        setFormLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "Company", name: "Company Name" },
    { field: "ParentCompany", name: "Parent Company" },
    { field: "Header", name: "Header" },
    { field: "Footer", name: "Footer" },
    { field: "RepresentativePhone", name: "Representative Phone" },
    { field: "STN", name: "STN" },
    { field: "NTN", name: "NTN" },
    { field: "Address", name: "Address" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="4" xs="12">
        <FormGroupSelect
          label="Trans Type"
          name="TransTypeID"
          // list={TransType}
          fieldId="TransTypeID"
          fieldName="TransType"
          value={SearchFields?.TransTypeID}
          onChange={handleSearchChange}
          required
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupInput
          label="Journal Code"
          name="JournalCode"
          required
          onChange={handleSearchChange}
          value={SearchFields?.JournalCode}
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupInput
          label="Journal Name"
          name="JournalName"
          required
          onChange={handleSearchChange}
          value={SearchFields?.JournalName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Associated Journal"
          name="AssociatedJournalID"
          onChange={handleSearchChange}
          value={SearchFields?.AssociatedJournalID}
        />
      </Col>
      <Col lg="2" md="2" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          value={SearchFields?.IsActive}
          onChange={handleSearchChange}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    setFormLoad(true);
    const payload = {
      ...SearchFields,
      OperationID: Search,
    };
    PostRequest(JOURNALS, payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table.map((x) => ({
              ...x,
              IsActive: x.IsActive ? "Active" : "InActive",
            })),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        setFormLoad(false);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = (id) => {
    setFormLoad(true);
    const payload = {
      ...FormFields,
      OperationID: id,
      ParentCompanyID:
        FormFields?.ParentCompanyID === null ? 0 : FormFields?.ParentCompanyID,
      UserID: decryptData(LOGINID, SessionStorage),
    };
    PostRequest(COMPANY, payload)
      .then((res) => {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        if (res.data?.Table[0]?.HasError === 0) {
          CustomSuccessAlert(res.data?.Table[0]?.MESSAGE);
          getCompany();
        } else {
          CustomErrorMessage(res.data?.Table[0]?.MESSAGE);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      CompanyID: obj?.CompanyID,
      ParentCompanyID: obj?.ParentCompanyID,
      Company: obj?.Company,
      IsParent: obj?.IsParent,
      Address: obj?.Address,
      Icon: "",
      Header: obj?.Header,
      Footer: obj?.Footer,
      Phone1: obj?.Phone1,
      Phone2: obj?.Phone2,
      RepresentativePhone: obj?.RepresentativePhone,
      Ntn: obj?.NTN,
      Stn: obj?.STN,
      ColourCode: obj?.ColourCode,
      IsActive: obj?.IsActive === "Active" ? true : false,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {};

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    getCompany();
  };

  const handleCancel = () => {
    console.log(sketchPickerColor);
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const handleOnClickColorPicker = () => {
    setHideColorPicker(!hideColorPicker);
  };

  const handleColorPickerChange = (color) => {
    setSketchPickerColor(color.rgb);
    let ColourCode = { name: "ColourCode", value: `rgba(${r},${g},${b},${a})` };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: ColourCode });
  };

  const formPanel = (
    <Fragment>
      {/* <Row>
        <Col lg="12" md="12" xs="12">
          <div className="sketchpicker">
            <h6>Sketch Picker</h6>
            <div
              style={{
                backgroundColor: `rgba(${r},${g},${b},${a})`,
                width: 100,
                height: 50,
                border: "2px solid white",
              }}
            ></div>
            <SketchPicker
              onChange={(color) => {
                setSketchPickerColor(color.rgb);
              }}
              color={sketchPickerColor}
            />
          </div>
        </Col>
      </Row> */}
      <Row>
        <Col lg="9" md="3" sm="9" xs="12">
          <Row>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput
                label="Company Name"
                name="Company"
                value={FormFields?.Company}
                onChange={handleAddChange}
                required
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput
                label="Header"
                name="Header"
                required
                onChange={handleAddChange}
                value={FormFields?.Header}
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput
                label="Footer"
                name="Footer"
                required
                onChange={handleAddChange}
                value={FormFields?.Footer}
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput
                label="Representative Phone"
                name="RepresentativePhone"
                required
                onChange={handleAddChange}
                value={FormFields?.RepresentativePhone}
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput
                label="Phone 1"
                name="Phone1"
                value={FormFields?.Phone1}
                onChange={handleAddChange}
                required
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput
                label="Phone 2"
                name="Phone2"
                onChange={handleAddChange}
                value={FormFields?.Phone2}
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput
                label="NTN"
                name="Ntn"
                onChange={handleAddChange}
                value={FormFields?.Ntn}
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput
                label="STN"
                name="Stn"
                onChange={handleAddChange}
                value={FormFields?.Stn}
              />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupSelect
                label="Parent Company"
                name="ParentCompanyID"
                fieldId="CompanyID"
                fieldName="Company"
                list={Companies}
                onChange={handleAddChange}
                value={FormFields?.ParentCompanyID}
              />
            </Col>

            <Col lg="12" md="12" xs="12">
              <FormGroupInput
                label="Address"
                name="Address"
                type="textarea"
                maxLength={255}
                required
                onChange={handleAddChange}
                value={FormFields?.Address}
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <Button
                color="primary"
                className="mt-4"
                // style={{ float: "right" }}
                onClick={handleOnClickColorPicker}
                style={{
                  backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                    ?.ColourCode,
                  borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                    ?.ColourCode,
                }}
              >
                {hideColorPicker == true ? "Close" : "Open"} Color Picker
              </Button>
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupInput
                label="Color Code"
                name="ColourCode"
                maxLength={255}
                required
                onChange={handleAddChange}
                value={FormFields?.ColourCode}
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupCheckbox
                label=" Is Parent"
                name="IsParent"
                value={FormFields?.IsParent}
                onChange={handleAddChange}
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupCheckbox
                label="Is Active"
                name="IsActive"
                value={FormFields?.IsActive}
                onChange={handleAddChange}
              />
            </Col>
            <Row>
              <Col lg="4" md="4" xs="12">
                {hideColorPicker && (
                  <SketchPicker
                    className="mt-4"
                    onChange={(color) => {
                      handleColorPickerChange(color);
                    }}
                    color={sketchPickerColor}
                  />
                )}
              </Col>
            </Row>
          </Row>
        </Col>
        <Col lg="3" md="3" sm="3" xs="12" className="text-center">
          <div className="profile-info text-center mb-2">
            <div className="profile-img-wrap image_layout_upload">
              <img
                src={""}
                className="rounded-square"
                width={160}
                height={160}
                alt="Employee"
                name="icon"
              />
              <div className="fileupload">
                <img src={logo_image} alt="" />
                <Input
                  className="upload"
                  type="file"
                  accept="image/*"
                  color="default"
                  name="icon"
                  onChange={""}
                />
              </div>
            </div>
          </div>

          <div className="mt-0">
            <Button
              color="primary"
              className="mt-0"
              style={{
                float: "right",
                backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
                  ?.ColourCode,
                borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                  ?.ColourCode,
              }}
            >
              Clear
            </Button>
          </div>
        </Col>
      </Row>
      <Row></Row>
    </Fragment>
  );

  return (
    <CrudFormComponent
      formName="Company"
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
      formLoader={formLoad}
    />
  );
};

export default Company;
