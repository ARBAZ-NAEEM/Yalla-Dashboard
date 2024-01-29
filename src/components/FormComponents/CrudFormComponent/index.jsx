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
  Collapse,
} from "reactstrap";
import FormGroupButton from "../../../components/GeneralComponent/FormGroupButton";
import FormGroupTable from "../../../components/GeneralComponent/FormGroupTable";

import propTypes from "prop-types";
import { RESET_FORM_FIELDS } from "../../../redux/actionType/CrudActionTypes";
import { useEffect } from "react";
import useFade from "../../../Hooks/useFade";
import LoadingPageInner from "../../ErrorLoadingComponents/LoadingPageInner";
import { COMPANY_DETAILS } from "../../../utils/EncryptedConstants";
import { SessionStorage } from "../../../common/SetupMasterEnum";
import { decryptData } from "../../../EncryptData";

const CrudFormComponent = (props) => {
  const {
    searchPanel,
    formPanel,
    tableColumns,
    formName,
    newButton = true,
    buttonName,
    updateButtonName,
    updateControl,
    searchSubmit,
    cancelSearch,
    formSubmit,
    tableRows,
    onEdit,
    onChat,
    onDelete,
    onConfirm,
    onRefuse,
    onRevert,
    onView,
    onGenerateVoucher,
    featureList = [],
    handleCancel,
    customTable,
    hideAction,
    customModal,
    customModalSecond,
    hideSubmitButton,
    customButton,
    modalSize,
    showSaveButton,
    buttonWithoutList,
    buttonWithoutListDescription,
    modalStyle,
    customPagination,
    hideSearchPanel,
    processButtonName,
    formLoader,
    customFinancialReport,
    reportName,
    financialSearchPanel,
    onPrintReport,
  } = props;

  const dispatch = useDispatch();
  const { TableList } = useSelector((state) => state.CrudFormReducer);
  const [toggleForm, setToggleForm] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const [operationId, setOperationId] = useState(2);
  const [showSupply, setShowSupply, fadeOutProps] = useFade(false, 700);

  const [collapse, setCollapse] = useState(true);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    searchSubmit();
  };

  const handleUpdate = () => {
    updateControl();
  };

  const handleSearchCancel = (e) => {
    e.preventDefault();
    cancelSearch && cancelSearch();
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setOperationId(2);
    formSubmit(operationId);
    // dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    setToggleForm(false);
  };

  const handleFormCancel = () => {
    setToggleForm(false);
    setOperationId(2);
    // dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    handleCancel && handleCancel();
  };

  const handleChatCancel = () => {
    setChatOpen(false);
    setOperationId(2);
    // dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    handleCancel && handleCancel();
  };

  const onEditRow = (index, obj) => {
    onEdit(obj, index);
    setOperationId(3);
    setToggleForm(true);
  };

  const onChatOpen = (index, obj) => {
    onChat(obj, index);
    setOperationId(3);
    setChatOpen(true);
  };

  const onDeleteRow = (index, obj) => {
    onDelete(obj, index);
  };

  const onConfirmRow = (index) => {
    let obj = TableList[index];
    onConfirm(obj);
  };

  const onRefuseRow = (index) => {
    let obj = TableList[index];
    onRefuse(obj);
  };

  const onRevertRow = (index) => {
    let obj = TableList[index];
    onRevert(obj);
  };

  const handleToggle = (e) => {
    e.preventDefault();
    setCollapse(!collapse);
  };

  const handlePrintReport = () => {
    onPrintReport && onPrintReport();
  };

  const [messages, setMessages] = useState([
    { text: "Hello!", sender: "user" },
    { text: "Hi there!", sender: "bot" },
    { text: "How are you?", sender: "user" },
    { text: "I'm good, thanks!", sender: "bot" },
  ]);

  const onViewRow = (index) => {
    let obj = TableList[index];
    onView(obj);
  };

  useEffect(() => {
    setShowSupply(true);
  }, []);

  return (
    <Fragment>
      {showSupply && (
        <Container {...fadeOutProps} fluid>
          <Fragment>
            {!hideSearchPanel && (
              <Card className="mt-3">
                <CardTitle>Search {formName}</CardTitle>
                <CardBody>
                  <form onSubmit={handleSearchSubmit}>
                    {searchPanel && (
                      <Row>
                        {searchPanel}
                        <Col lg="12" md="12" xs="12" className="text-right">
                          <Button
                            color="primary"
                            className="btn"
                            type="submit"
                            style={{
                              backgroundColor: "#076030",
                              borderColor: "#076030",
                            }}
                          >
                            Search
                          </Button>
                          {updateButtonName && (
                            <Button
                              color="primary"
                              className="btn"
                              onClick={handleUpdate}
                              style={{
                                backgroundColor: "#076030",
                                borderColor: "#076030",
                              }}
                            >
                              {updateButtonName}
                            </Button>
                          )}
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
            )}
          </Fragment>

          {financialSearchPanel && !searchPanel && (
            <Fragment>
              {featureList.some((x) => x.FeatureId === 6) ? (
                <Card className="mt-3">
                  <CardTitle>
                    <Row>
                      {featureList.some((x) => x.FeatureId === 4) ? (
                        <Col lg="6" md="3" xs="12">
                          {formName} Search
                        </Col>
                      ) : (
                        ""
                      )}
                      <Col lg="6" md="3" xs="12" className="text-right">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                            marginRight: "10px",
                          }}
                        >
                          {collapse === true ? (
                            <i
                              class="fa fa-angle-up fa-2x"
                              onClick={handleToggle}
                            ></i>
                          ) : (
                            <i
                              class="fa fa-angle-down fa-2x"
                              onClick={handleToggle}
                            ></i>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </CardTitle>
                  <Collapse isOpen={collapse}>
                    <CardBody>
                      <form onSubmit={handleSearchSubmit}>
                        {financialSearchPanel && (
                          <Row>
                            {financialSearchPanel}
                            <Col lg="12" md="12" xs="12" className="text-right">
                              <Button
                                color="primary"
                                className="btn"
                                type="submit"
                                style={{
                                  backgroundColor: decryptData(
                                    COMPANY_DETAILS,
                                    SessionStorage
                                  )?.ColourCode,
                                  borderColor: decryptData(
                                    COMPANY_DETAILS,
                                    SessionStorage
                                  )?.ColourCode,
                                }}
                              >
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
                  </Collapse>
                </Card>
              ) : null}
            </Fragment>
          )}

          {customFinancialReport && (
            <Fragment>
              {TableList?.Table?.length > 0 && (
                <Card {...fadeOutProps}>
                  <CardTitle>
                    <Row>
                      <Col lg="6" md="3" xs="12">
                        {reportName}
                      </Col>
                      <Col lg="6" md="3" xs="12" className="text-right">
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "end",
                          }}
                        >
                          <FormGroupButton
                            title="Print"
                            onClick={handlePrintReport}
                            id="add-btn"
                          ></FormGroupButton>
                        </div>
                      </Col>
                    </Row>
                  </CardTitle>
                  <CardBody {...fadeOutProps}>
                    {featureList.some((x) => x.FeatureId === 4) ? (
                      <Row>
                        <Col>
                          {customFinancialReport && customFinancialReport}
                        </Col>
                      </Row>
                    ) : null}
                  </CardBody>
                </Card>
              )}
            </Fragment>
          )}

          {/* 
          {tableColumns && (
            <Card>
              <CardTitle>
                <Row>
                  {featureList.some((x) => x.FeatureId === 4) ? (
                    <Col lg="6" md="3" xs="12">
                      {formName} List
                    </Col>
                  ) : (
                    ""
                  )}
                  {!hideSubmitButton && (
                    <Col lg="12" md="12" xs="12" className="text-right">
                      <div style={{ display: "flex", justifyContent: "end" }}>
                        {customButton && customButton}
                        {
                          buttonName && newButton && (
                            // featureList.some((x) => x.FeatureId === 1) && (
                            <FormGroupButton
                              title={buttonName}
                              onClick={() => setToggleForm(true)}
                              id="add-btn"
                              showToolTip={false}
                              toolTipTitle="Add"
                              showIcon={true}
                            ></FormGroupButton>
                          )
                          // )
                        }
                      </div>
                    </Col>
                  )}
                </Row>
              </CardTitle>

              <CardBody {...fadeOutProps}>
                {featureList.some((x) => x.FeatureId === 4) ? (
                  <Row>
                    <Col>
                      {!customTable && tableColumns && (
                        <Fragment>
                          {formLoader ? (
                            <LoadingPageInner />
                          ) : (
                            <Fragment>
                              <FormGroupTable
                                columns={tableColumns && tableColumns}
                                rows={tableRows && tableRows}
                                onEdit={
                                  onEdit &&
                                  featureList.some((x) => x.FeatureId === 2)
                                    ? onEditRow
                                    : null
                                }
                                onRevert={onRevert && onRevertRow}
                                onDelete={
                                  onDelete &&
                                  featureList.some((x) => x.FeatureId === 3)
                                    ? onDeleteRow
                                    : null
                                }
                                onConfirm={onConfirm && onConfirmRow}
                                onRefuse={onRefuse && onRefuseRow}
                                onGenerateVoucher={
                                  onGenerateVoucher && onGenerateVoucher
                                }
                                hideAction={hideAction}
                              />
                              {customPagination && customPagination}
                            </Fragment>
                          )}
                        </Fragment>
                      )}
                      {customTable && customTable}
                    </Col>
                  </Row>
                ) : (
                  <Col lg="6" md="3" xs="12">
                    No Data Found
                  </Col>
                )}
              </CardBody>
            </Card>
          )} */}

          {tableColumns && (
            <Card>
              <CardTitle>
                <Row>
                  {featureList.some((x) => x.FeatureId === 4) ? (
                    <Col lg="6" md="3" xs="12">
                      {formName} List
                    </Col>
                  ) : (
                    ""
                  )}
                  {!hideSubmitButton && (
                    <Col lg="12" md="12" xs="12" className="text-left">
                      <div style={{ display: "flex", justifyContent: "start" }}>
                        {customButton && customButton}
                        {
                          buttonName && newButton && (
                            // featureList.some((x) => x.FeatureId === 1) && (
                            <FormGroupButton
                              title={buttonName}
                              onClick={() => setToggleForm(true)}
                              id="add-btn"
                              showToolTip={false}
                              toolTipTitle="Add "
                              showIcon={true}
                            ></FormGroupButton>
                          )
                          // )
                        }
                      </div>
                    </Col>
                  )}
                </Row>
              </CardTitle>

              <CardBody {...fadeOutProps}>
                <Row>
                  <Col>
                    {!customTable && tableColumns && (
                      <Fragment>
                        {formLoader ? (
                          <LoadingPageInner />
                        ) : (
                          <Fragment>
                            <FormGroupTable
                              columns={tableColumns && tableColumns}
                              rows={tableRows && tableRows}
                              // onEdit={onEditRow}
                              // onChat={onChatOpen}
                              onRevert={onRevert && onRevertRow}
                              onDelete={
                                onDelete &&
                                featureList.some((x) => x.FeatureId === 3)
                                  ? onDeleteRow
                                  : null
                              }
                              onConfirm={onConfirm && onConfirmRow}
                              onRefuse={onRefuse && onRefuseRow}
                              onView={onView && onViewRow}
                              onGenerateVoucher={
                                onGenerateVoucher && onGenerateVoucher
                              }
                              hideAction={hideAction}
                            />
                            {customPagination && customPagination}
                          </Fragment>
                        )}
                      </Fragment>
                    )}
                    {customTable && customTable}
                  </Col>
                </Row>
              </CardBody>
            </Card>
          )}

          {buttonWithoutList && (
            <Card>
              <CardTitle>
                <Row>
                  <Col lg="6" md="3" xs="12">
                    {buttonWithoutListDescription} List
                  </Col>
                  <Col lg="6" md="3" xs="12" className="text-right">
                    <div style={{ display: "flex", justifyContent: "end" }}>
                      {customButton && customButton}
                      {buttonName && newButton && (
                        // featureList.some((x) => x.FeatureId === 1) && (
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
                    </div>
                  </Col>
                </Row>
              </CardTitle>
            </Card>
          )}

          {customModal && customModal}
          {customModalSecond && customModalSecond}

          {buttonName && (
            <Modal
              isOpen={toggleForm}
              centered
              size={modalSize}
              // toggle={toggle}
              modalTransition={{ timeout: 10 }}
              // backdrop="static"
              style={modalStyle}
            >
              <ModalHeader style={{ backgroundColor: "#076030" }}>
                {"Edit Ticket"}
              </ModalHeader>
              <ModalBody>
                <form onSubmit={handleFormSubmit}>
                  {formPanel && (
                    <Row>
                      {formPanel}
                      <div
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        {showSaveButton === false ? null : (
                          <Button
                            color="primary"
                            type="submit"
                            style={{
                              backgroundColor: "#076030",
                              borderColor: "#076030",
                            }}
                          >
                            Save
                          </Button>
                        )}
                        {processButtonName && (
                          <Button color="primary" type="submit">
                            {processButtonName}
                          </Button>
                        )}

                        <Button color="default" onClick={handleFormCancel}>
                          Cancel
                        </Button>
                      </div>
                    </Row>
                  )}
                </form>
              </ModalBody>
            </Modal>
          )}

          {buttonName && (
            <Modal
              isOpen={chatOpen}
              centered
              size={modalSize}
              // toggle={toggle}
              modalTransition={{ timeout: 10 }}
              // backdrop="static"
              style={modalStyle}
            >
              <ModalHeader
                className="chat_modal"
                style={{ backgroundColor: "#076030" }}
              >
                <Row>
                  <Col md="10">{"Client Chat"}</Col>
                  <Col md="2" className="close_modal">
                    <i
                      onClick={handleChatCancel}
                      className="close_chat"
                      color="default"
                      class="fa fa-times-circle-o"
                      aria-hidden="true"
                    ></i>
                  </Col>
                </Row>
              </ModalHeader>
              <ModalBody>
                <div
                  style={{ margin: "auto", fontFamily: "Arial, sans-serif" }}
                >
                  <div
                    style={{
                      border: "1px solid #ccc",
                      borderRadius: "8px",
                      padding: "10px",
                      background: "#f5f5f5",
                    }}
                  >
                    {messages.map((message, index) => (
                      <div
                        key={index}
                        style={{
                          marginBottom: "8px",
                          padding: "12px",
                          borderRadius: "8px",
                          maxWidth: "100%",
                          backgroundColor:
                            message.sender === "user" ? "#dcf8c6" : "#fff",
                          alignSelf:
                            message.sender === "user"
                              ? "flex-start"
                              : "flex-end",
                        }}
                      >
                        {message.text}
                      </div>
                    ))}
                  </div>
                </div>
              </ModalBody>
            </Modal>
          )}
        </Container>
      )}
    </Fragment>
  );
};

CrudFormComponent.propTypes = {
  searchPanel: propTypes.element,
  formPanel: propTypes.element,
  tableColumns: propTypes.array,
  formName: propTypes.string,
  newButton: propTypes.bool,
  buttonName: propTypes.string,
  updateButtonName: propTypes.string,
  updateControl: propTypes.func,
  searchSubmit: propTypes.func,
  formSubmit: propTypes.func,
  tableRows: propTypes.array,
  onEdit: propTypes.func,
  onChat: propTypes.func,
  onDelete: propTypes.func,
  onConfirm: propTypes.func,
  onRefuse: propTypes.func,
  onRevert: propTypes.func,
  onView: propTypes.func,
  onGenerateVoucher: propTypes.func,
  initialSearchFields: propTypes.object,
  initialFormFields: propTypes.object,
  featureList: propTypes.array,
  handleCancel: propTypes.func,
  cancelSearch: propTypes.func,
  customTable: propTypes.element,
  hideAction: propTypes.bool,
  customModal: propTypes.element,
  customModalSecond: propTypes.element,
  hideSubmitButton: propTypes.bool,
  customButton: propTypes.element,
  modalSize: propTypes.string,
  showSaveButton: propTypes.bool,
  buttonWithoutList: propTypes.bool,
  buttonWithoutListDescription: propTypes.string,
  customPagination: propTypes.element,
  hideSearchPanel: propTypes.bool,
  processButtonName: propTypes.string,
  modalStyle: propTypes.string,
  formLoader: propTypes.bool,
  customFinancialReport: propTypes.element,
  reportName: propTypes.string,
  financialSearchPanel: propTypes.element,
  onPrintReport: propTypes.func,
};

export default CrudFormComponent;
