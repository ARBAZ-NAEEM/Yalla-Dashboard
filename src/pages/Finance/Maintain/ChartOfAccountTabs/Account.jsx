import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Col, Label, Modal, ModalBody, Row, Table } from "reactstrap";
import FormGroupInput from "../../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../../components/GeneralComponent/FormGroupSelect";
import FormGroupCheckbox from "../../../../components/GeneralComponent/FormGroupCheckbox";
import {
  SET_CRUD_FROM_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
  SET_MULTI_CRUD_FORM_FIELD,
  SET_MULTI_CRUD_SUPPORTINGTABLE,
} from "../../../../redux/actionType/CrudActionTypes";
import { Select, SessionStorage } from "../../../../common/SetupMasterEnum";
import { decryptData } from "../../../../EncryptData";
import {
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../../utils/EncryptedConstants";
import { ACCOUNTNATURE, CHARTOFACCOUNT } from "../../../../utils/UrlConstants";
import { PostRequest } from "../../../../utils/Config";
import ReactSelect from "react-select";

const Account = (props) => {
  const initialFormFields = {
    OperationID: Select,
    AoaID: 0,
    AccNatureID: 0,
    AccCode: "",
    AccName: "",
    ParentAccCode: "",
    AccNature: "",
    AccTypeID: 0,
    Remarks: "",
    FyID: 0,
    IsActive: true,
    UserID: 0,
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const initialChartOfAccountValues = {
    operationID: Select,
    CompanyID: decryptData(COMPANY_ID, SessionStorage),
    coaID: 0,
    accNatureID: 0,
    accCode: "",
    accName: "",
    accTypeID: 0,
    remarks: "",
    fyID: 0,
    isActive: true,
    userID: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const { FormFields, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const [toggleAccCode, setToggleAccCode] = useState(false);
  const [ChartOfAccountInnerModal, setChartOfAccountInnerModal] = useState([]);

  const { selectedAccountNature = {}, setSelectedAccountNature = () => {} } =
    props;

  const dispatch = useDispatch();
  const { AccountNature, accountTypeName } = SupportingTables;

  useEffect(() => {
    getAccountNature();
  }, []);

  const getAccountNature = () => {
    PostRequest(ACCOUNTNATURE, initialFormFields)
      .then((res) => {
        let AccountNature = {
          name: "AccountNature",
          value: res?.data?.Table?.map((x) => ({
            ...x,
            value: x.AccNatureID,
            label: x.AccNature,
            dropdownName: "AccountNature",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: AccountNature,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getChartOfAccounts = (AccCode) => {
    const payload = {
      ...initialChartOfAccountValues,
      accCode: AccCode,
      CompanyID: decryptData(COMPANY_ID, SessionStorage),
    };
    PostRequest(CHARTOFACCOUNT, payload)
      .then((res) => {
        setChartOfAccountInnerModal(res?.data?.Table);
        setToggleAccCode(true);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "Program", name: "Program" },
    { field: "Part1", name: "Part I" },
    { field: "Part2", name: "Part II" },
    { field: "Part3", name: "Part III" },
    { field: "Part4", name: "Part IV" },
    { field: "SubTotal", name: "Sub. Total" },
    {
      field: "Financial",
      name: "Financial (millions)",
    },
  ];

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleInputChangeSelect = (event) => {
    if (event.dropdownName === "AccountNature") {
      setSelectedAccountNature(event);
      let data = { name: "AccNatureID", value: event.AccNatureID };
      dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
    }
  };

  const handleAccountCodeKeyStroke = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        getChartOfAccounts(e.target.value);
      }
    }
  };

  const handleInputChange = (e) => {
    const data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handlelRowInnerModal = (x) => {
    const onInnerModalClick = { label: x.AccNature, value: x.AccNatureID };
    setSelectedAccountNature(onInnerModalClick);
    dispatch({
      type: SET_MULTI_CRUD_FORM_FIELD,
      payload: {
        AccCode: `${x.AccCode}.`,
        AccNatureID: x.AccNatureID,
        ParentCoaID: x.CoaID,
      },
    });
    setToggleAccCode(false);
  };

  const handleCancelAccCodeModal = () => {
    setToggleAccCode(false);
  };

  return (
    <Fragment>
      <Row>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Parent Acc Code"
            name="ParentCoaID"
            value={FormFields?.ParentCoaID}
            handleKeyDown={(e) => {
              handleAccountCodeKeyStroke(e);
            }}
            onChange={(e) => handleInputChange(e)}
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Acc Code Suffix"
            name="AccCode"
            value={FormFields?.AccCode}
            onChange={handleAddChange}
            required
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Account Name"
            name="AccName"
            value={FormFields?.AccName}
            onChange={handleAddChange}
            required
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <Label>Account Nature</Label>
          <ReactSelect
            closeMenuOnSelect={true}
            onChange={handleInputChangeSelect}
            options={AccountNature}
            value={selectedAccountNature}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" md="3" xs="12">
          <FormGroupSelect
            label="Account Type"
            name="AccTypeID"
            fieldId="AccTypeID"
            fieldName="AccType"
            value={FormFields?.AccTypeID}
            list={accountTypeName}
            onChange={handleAddChange}
            required
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupCheckbox
            label=" Active"
            name="IsActive"
            value={FormFields?.IsActive}
            onChange={handleAddChange}
            required
          />
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" xs="12">
          <FormGroupInput
            label="Remarks"
            type="textarea"
            name="Remarks"
            value={FormFields?.Remarks}
            onChange={handleAddChange}
          />
        </Col>
      </Row>

      <Modal
        isOpen={toggleAccCode}
        centered
        size="xl"
        style={{ minWidth: "50vw", width: "50%" }}
        modalTransition={{ timeout: 10 }}
        backdrop="static"
      >
        <ModalBody>
          <Row className="mt-3">
            <Col lg="12" md="12" xs="12">
              <Table bordered striped responsive>
                <thead>
                  <tr>
                    <th>Account Code</th>
                    <th>Account Name</th>
                    <th>Nature</th>
                  </tr>
                </thead>

                <tbody>
                  {ChartOfAccountInnerModal?.length > 0 ? (
                    ChartOfAccountInnerModal?.map((x, i) => (
                      <tr className="hoverOnTableRow" key={i}>
                        <td
                          onClick={() => handlelRowInnerModal(x, i)}
                          style={{ width: "10%" }}
                        >
                          {x.AccCode}
                        </td>
                        <td
                          onClick={() => handlelRowInnerModal(x, i)}
                          style={{ width: "15%" }}
                        >
                          {x.AccName}
                        </td>
                        <td
                          onClick={() => handlelRowInnerModal(x, i)}
                          style={{ width: "30%" }}
                        >
                          {x.AccNature}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="3">
                        <div
                          style={{
                            width: "100%",
                            textAlign: "center",
                            background: "#e9e9e9",
                            padding: 20,
                            fontWeight: "bold",
                          }}
                        >
                          No Data Available
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="mt-3">
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button color="default" onClick={handleCancelAccCodeModal}>
                Cancel
              </Button>
            </div>
          </Row>
        </ModalBody>
      </Modal>
    </Fragment>
  );
};

export default Account;
