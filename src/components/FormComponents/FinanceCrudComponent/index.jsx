import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import FormGroupButton from "../../../components/GeneralComponent/FormGroupButton";
import FormGroupTable from "../../../components/GeneralComponent/FormGroupTable";

import propTypes from "prop-types";
import { RESET_FORM_FIELDS } from "../../../redux/actionType/CrudActionTypes";
import { useEffect } from "react";
import LoadingPageInner from "../../ErrorLoadingComponents/LoadingPageInner";
import { decryptData } from "../../../EncryptData";
import { COMPANY_DETAILS } from "../../../utils/EncryptedConstants";
import { SessionStorage } from "../../../common/SetupMasterEnum";

const FinanceCrudComponent = (props) => {
  const {
    searchPanel,
    formPanel,
    tableColumns,
    formName,
    newButton = true,
    buttonName,
    searchSubmit,
    cancelSearch,
    formSubmit,
    tableRows,
    onEdit,
    onDelete,
    onPrint,
    featureList = [],
    handleCancel,
    modalView,
    customModalHeader,
    customModal,
    InnerModal,
    saveCondition,
    customButton,
    customInnerModal,
    formLoader,
  } = props;

  const dispatch = useDispatch();
  const { TableList } = useSelector((state) => state.CrudFormReducer);

  const [toggleForm, setToggleForm] = useState(false);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchSubmit();
  };

  const handleSearchCancel = (e) => {
    e.preventDefault();
    cancelSearch && cancelSearch();
  };

  const handleSaveForm = () => {
    formSubmit(false);
    setToggleForm(false);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formSubmit(true);
    setToggleForm(false);
  };

  const handleFormCancel = () => {
    setToggleForm(false);
    handleCancel && handleCancel();
  };

  const onEditRow = (index) => {
    let obj = TableList[index];
    onEdit(obj);
    setToggleForm(true);
  };

  const onDeleteRow = (index) => {
    let obj = TableList[index];
    onDelete(obj);
  };

  const onPrintRow = (index) => {
    let obj = TableList[index];
    onPrint(obj);
  };

  return (
    <Container fluid>
      {featureList.some((x) => x.FeatureId === 6) ? (
        <Card className="mt-3">
          <CardTitle>Search {formName}</CardTitle>
          <CardBody>
            <form onSubmit={handleSearchSubmit}>
              {searchPanel && (
                <Row>
                  {searchPanel}
                  <Col lg="12" md="12" xs="12" className="text-right">
                    <Button color="primary" className="btn" type="submit" style={{backgroundColor:decryptData(COMPANY_DETAILS, SessionStorage)?.ColourCode, borderColor:decryptData(COMPANY_DETAILS, SessionStorage)?.ColourCode}}>
                      Search
                    </Button>
                    <Button
                      className="btn"
                      color="default"
                      onClick={handleSearchCancel}
                    >
                      Cancel
                    </Button>
                  </Col>
                </Row>
              )}
            </form>
          </CardBody>
        </Card>
      ) : null}
      {tableColumns && (
        <Card>
          <CardTitle>
            <Row>
              {featureList.some((x) => x.FeatureId === 4) ? (
                <Col lg="6" md="3" xs="12">
                  {formName} List
                </Col>
              ) : null}
              <Col lg="6" md="3" xs="12" className="text-right">
                {customButton && customButton}
                {!customButton &&
                  buttonName &&
                  newButton &&
                  featureList.some((x) => x.FeatureId === 1) && (
                    <FormGroupButton
                      title={buttonName}
                      onClick={() => setToggleForm(true)}
                      id="add-btn"
                      //   isOpen={tooltip}
                      //   toggle={() => setToolTip(!tooltip)}
                      showToolTip={false}
                      toolTipTitle="Add"
                      showIcon={true}
                    ></FormGroupButton>
                  )}
              </Col>
            </Row>
          </CardTitle>

          <CardBody>
            {featureList.some((x) => x.FeatureId === 4) ? (
              <Row>
                <Col>
                  {tableColumns && (
                    <Fragment>
                      {formLoader ? (
                        <LoadingPageInner />
                      ) : (
                        <Fragment>
                          <FormGroupTable
                            columns={tableColumns}
                            rows={tableRows}
                            onEdit={
                              onEdit &&
                              featureList.some((x) => x.FeatureId === 2)
                                ? onEditRow
                                : null
                            }
                            onDelete={
                              onDelete &&
                              featureList.some((x) => x.FeatureId === 3)
                                ? onDeleteRow
                                : null
                            }
                            onPrint={onPrint && onPrintRow}
                          />
                        </Fragment>
                      )}
                    </Fragment>
                  )}
                </Col>
              </Row>
            ) : (
              <Col lg="6" md="3" xs="12">
                No Data Found
              </Col>
            )}
          </CardBody>
        </Card>
      )}
      {customModal && customModal}
      {customInnerModal && customInnerModal}

      {!customModal && buttonName && (
        <Modal
          isOpen={toggleForm}
          centered
          size="xl"
          style={{ minWidth: "90vw", width: "90%" }}
          modalTransition={{ timeout: 10 }}
          backdrop="static"
        >
          <ModalHeader className={`${customModalHeader} `}>
            Add/Edit {formName}
          </ModalHeader>
          <ModalBody>
            {modalView && modalView}
            <form onSubmit={handleFormSubmit}>
              <Row className="mt-3">
                <div style={{ display: "flex", justifyContent: "flex-end" }}>
                  {/* <Button color="warning" type="submit">
                    Post
                  </Button> */}
                  <Button
                    className="btn-primary-custom-save"
                    color="primary"
                    disabled={saveCondition && saveCondition}
                    onClick={handleSaveForm}
                    style={{backgroundColor:decryptData(COMPANY_DETAILS, SessionStorage)?.ColourCode}}
                  >
                    Save
                  </Button>
                  <Button color="default" onClick={handleFormCancel}>
                    Cancel
                  </Button>
                </div>
              </Row>
            </form>
          </ModalBody>
        </Modal>
      )}
      {InnerModal && InnerModal}
    </Container>
  );
};

FinanceCrudComponent.propTypes = {
  searchPanel: propTypes.element,
  formPanel: propTypes.element,
  tableColumns: propTypes.array,
  formName: propTypes.string,
  newButton: propTypes.bool,
  buttonName: propTypes.string,
  searchSubmit: propTypes.func,
  formSubmit: propTypes.func,
  tableRows: propTypes.array,
  onEdit: propTypes.func,
  onDelete: propTypes.func,
  onPrint: propTypes.func,
  customModalHeader: propTypes.string,
  initialSearchFields: propTypes.object,
  initialFormFields: propTypes.object,
  featureList: propTypes.array,
  handleCancel: propTypes.func,
  cancelSearch: propTypes.func,
  modalView: propTypes.element,
  customModal: propTypes.element,
  InnerModal: propTypes.element,
  saveCondition: propTypes.bool,
  customButton: propTypes.element,
  customInnerModal: propTypes.element,
  formLoader: propTypes.bool,
};

export default FinanceCrudComponent;
