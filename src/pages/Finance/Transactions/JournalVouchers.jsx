import React, { Fragment } from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Table,
} from "reactstrap";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import {
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
  SET_INITIAL_CRUD_FORM_STATE,
} from "../../../redux/actionType/CrudActionTypes";
import FinanceCrudComponent from "../../../components/FormComponents/FinanceCrudComponent";
import {
  Insert,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";
import { PostRequest } from "../../../utils/Config";
import { decryptData } from "../../../EncryptData";
import {
  COMPANY_DETAILS,
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";
import {
  CHARTOFACCOUNT,
  COST_CENTER,
  VOUCHERS,
} from "../../../utils/UrlConstants";
import ReactSelect from "react-select";
import FormGroupButton from "../../../components/GeneralComponent/FormGroupButton";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
  CustomWarningMessage,
} from "../../../components/Alert";
import moment from "moment/moment";
import { useReactToPrint } from "react-to-print";
import { useRef } from "react";
import PaymentVoucherReport from "../Reports/PaymentVoucherReports/PaymentVoucherReport";

const JournalVouchers = () => {
  const { SupportingTables, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  const printPaymentVoucherReport = useRef(null);
  const timeoutRef = useRef(null);

  const initialSearchFields = { JournalCode: "" };

  const intialTypeVoucherMaster = {
    journalID: 0,
    refDate: "2023-07-03T13:09:11.499Z",
    refJournal: "",
    refJournallNo: "",
    date: "2023-06-20T09:07:55.440Z",
    isPost: true,
  };

  const [tbL_TYPE_VOUCHERMASTER_, settbL_TYPE_VOUCHERMASTER_] = useState(
    intialTypeVoucherMaster
  );

  const intialTypeVoucherDetails = {
    costCenterID: 0,
    coaID: 0,
    refJournal: "",
    refJournallNo: "",
    refDate: "2023-07-03T12:29:01.784Z",
    date: "2023-06-20T09:07:55.440Z",
    chqNo: "",
    chqDate: "2023-06-20T09:07:55.440Z",
    invoiceNo: "",
    invoiceDate: "2023-06-20T09:07:55.440Z",
    invoiceDocs: "",
    narrations: "",
    debit: 0,
    credit: 0,
  };

  const [tbL_TYPE_VOUCHERDETAIL_, settbL_TYPE_VOUCHERDETAIL_] = useState(
    intialTypeVoucherDetails
  );

  const initialFields = {
    operationID: Select,
    journalID: 0,
    flex: "JV",
    parameterID: Select,
    companyID: decryptData(COMPANY_ID, SessionStorage),
    vouMasterID: 0,
    userID: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
    tbL_TYPE_VOUCHERMASTER_: [tbL_TYPE_VOUCHERMASTER_],
    tbL_TYPE_VOUCHERDETAIL_: [tbL_TYPE_VOUCHERDETAIL_],
  };

  const [inputList, setInputList] = useState([
    {
      costCenterID: 0,
      accCode: 0,
      coaID: 0,
      refJournal: "",
      refJournallNo: "",
      refDate: "2023-07-03T12:29:01.784Z",
      date: "2023-06-20T09:07:55.440Z",
      chqNo: "",
      chqDate: "2023-06-20T09:07:55.440Z",
      invoiceNo: "",
      invoiceDate: "2023-06-20T09:07:55.440Z",
      invoiceDocs: "",
      narrations: "",
      debit: 0,
      credit: 0,
    },
  ]);

  const initialChartOfAccountValues = {
    operationID: Select,
    companyID: decryptData(COMPANY_ID, SessionStorage),
    coaID: 0,
    accNatureID: 0,
    accCode: "",
    accName: "",
    parentAccCode: "",
    accTypeID: 0,
    remarks: "",
    fyID: 0,
    isActive: true,
    userID: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
  };

  const {
    Journals,
    CostCenter,
    ChartOfAccountList,
    ChartOfAccountListInnerModal,
    JournalCode,
  } = SupportingTables;

  const [toggleForm, setToggleForm] = useState(false);
  const [toggleAccCode, setToggleAccCode] = useState(false);

  const [selectedJournal, setSelectedJournal] = useState(null);
  const [selectedChartOfAccount, setSelectedChartOfAccount] = useState(null);
  const [selectedCostCenter, setSelectedCostCenter] = useState(null);
  const [selectedCostCenterArray, setSelectedCostCenterArray] = useState([]);
  const [selectedChartOfAccountArray, setSelectedChartOfAccountArray] =
    useState([]);

  const [mainModalIndex, setMainModalIndex] = useState(0);

  //SearchPanel Searchable Dropdown

  const [selectedJournalCode, setSelectedJournalCode] = useState(null);

  useEffect(() => {
    getCostCenter();
    getChartOfAccounts(null);
    getPaymentVouchers();
    return () => clearTimeout(timeoutRef.current);
  }, []);

  const getPaymentVouchers = () => {
    PostRequest(VOUCHERS, initialFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((x) => ({
              ...x,
              TransDate: moment(new Date(x.TransDate)).format("DD-MM-YYYY"),
            })),
          },
        });
        let Journals = {
          name: "Journals",
          value: res?.data?.Table1?.map((x) => ({
            ...x,
            value: x.JournalID,
            label: x.JournalCode,
            dropdownName: "Journals",
          })),
        };
        dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: Journals });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getChartOfAccounts = (AccCode) => {
    const payload = {
      ...initialChartOfAccountValues,
      accCode: AccCode,
    };
    PostRequest(
      CHARTOFACCOUNT,
      AccCode !== null ? payload : initialChartOfAccountValues
    )
      .then((res) => {
        if (AccCode !== null) {
          let ChartOfAccountListInnerModal = {
            name: "ChartOfAccountListInnerModal",
            value: res?.data?.Table,
          };
          dispatch({
            type: SET_INITIAL_DROPDOWN_FORM_STATE,
            payload: ChartOfAccountListInnerModal,
          });
          setToggleAccCode(true);
        } else {
          let ChartOfAccountList = {
            name: "ChartOfAccountList",
            value: res?.data?.Table?.filter((x) => x.AccTypeID !== 1)?.map(
              (x) => ({
                ...x,
                value: x.CoaID,
                label: x.AccNameCode,
                accCode: x.AccCode,
                dropdownName: "ChartOfAccount",
              })
            ),
          };
          dispatch({
            type: SET_INITIAL_DROPDOWN_FORM_STATE,
            payload: ChartOfAccountList,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  function getCostCenter() {
    const payload = {
      operationID: Select,
      companyID: decryptData(COMPANY_ID, SessionStorage),
      costcenterID: 0,
      name: "",
      ccNatureID: 0,
      ccTypeID: 0,
      partyInfoID: 0,
      beginingDate: "2023-06-20T09:07:55.440Z",
      expectedDate: "2023-06-20T09:07:55.440Z",
      actualDate: "2023-06-20T09:07:55.440Z",
      isActive: true,
      userID: decryptData(LOGINID, SessionStorage),
      userIP: decryptData(UserNetworkInfo)?.IPv4,
    };

    PostRequest(COST_CENTER, payload)
      .then((res) => {
        let CostCenter = {
          name: "CostCenter",
          value: res?.data?.Table?.map((x) => ({
            ...x,
            value: x.CostcenterID,
            label: x.Name,
            dropdownName: "CostCenter",
          })),
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: CostCenter,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "JournalCode", name: "Journal Code" },
    { field: "Transactions", name: "Transactions No" },
    { field: "TransDate", name: "Transaction Date" },
    { field: "Narrations", name: "Narrations" },
    { field: "Amount", name: "Amount" },
  ];

  const onDeleteRow = (index) => {};

  const onEditRow = (obj) => {
    console.log(obj);
    const payload = {
      ...initialFields,
      vouMasterID: obj?.VouMasterId,
      parameterID: Insert,
      operationID: Select,
    };
    PostRequest(VOUCHERS, payload)
      .then((res) => {
        onEditRowApiDataBinding(res?.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRowApiDataBinding = (data) => {
    let ArrayTable = data?.Table1?.map((x) => ({
      ...x,
      costCenterID: x.CostCenterID,
      coaID: x.CoaID,
      accCode: x.AccCode,
      date: moment(new Date(x.TransDate)).format("YYYY-MM-DD"),
      chqNo: "",
      chqDate: "2023-06-20T09:07:55.440Z",
      invoiceNo: "",
      invoiceDate: "2023-06-20T09:07:55.440Z",
      invoiceDocs: "",
      narrations: x.Narrations,
      debit: x.Debit,
      credit: x.Credit,
      refJournal: x.RefJournal,
      refJournallNo: x.RefJournallNo,
      refDate: moment(new Date(x.RefDate)).format("YYYY-MM-DD"),
    }));
    setInputList([...ArrayTable]);
    const onEditEvent = data?.Table1?.map((x) => ({
      label: x.CostCenter,
      value: x.costCenterID,
    }));
    setSelectedCostCenterArray([...onEditEvent]);
    settbL_TYPE_VOUCHERMASTER_({
      ...tbL_TYPE_VOUCHERMASTER_,
      journalID: data?.Table?.[0]?.JournalID,
      refDate: moment(new Date(data?.Table?.[0]?.RefDate)).format("YYYY-MM-DD"),
      refJournal: data?.Table?.[0]?.RefJournal,
      refJournallNo: data?.Table?.[0]?.RefJournallNo,
      date: moment(new Date(data?.Table?.[0]?.TransDate)).format("YYYY-MM-DD"),
      isPost: true,
    });
    let editSelectedJournal = {
      label: data?.Table?.[0]?.JournalCode,
      value: data?.Table?.[0]?.JournalID,
    };
    setSelectedJournal(editSelectedJournal);
    setToggleForm(true);
  };

  const handleVoucherMasterChange = (e) => {
    settbL_TYPE_VOUCHERMASTER_({
      ...tbL_TYPE_VOUCHERMASTER_,
      [e.target.name]: e.target.value,
    });
  };

  const handleInputChange = (e, index) => {
    let { name, value, newfield } = e.target;
    let list = [...inputList];
    if (name === "coaID") {
      list[index]["accCode"] = newfield;
      list[index][name] = value;
      setInputList(list);
    } else if (name === "debit") {
      if (value > 0) {
        list[index]["credit"] = 0;
        list[index][name] = value;
        setInputList(list);
      } else {
        list[index]["credit"] = 0;
        list[index][name] = value;
        setInputList(list);
      }
    } else if (name === "credit") {
      if (value > 0) {
        list[index]["debit"] = 0;
        list[index][name] = value;
        setInputList(list);
      } else {
        list[index]["debit"] = 0;
        list[index][name] = value;
        setInputList(list);
      }
    } else if (name === "refDate") {
      let formatedDate = moment(new Date(value)).format("YYYY-MM-DD");
      list[index][name] = formatedDate;
      setInputList(list);
    } else {
      list[index][name] = value;
      setInputList(list);
    }
  };

  const handleDebitCreditKeyStroke = (e, i) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setInputList([
        ...inputList,
        {
          costCenterID: 0,
          coaID: 0,
          accCode: 0,
          refJournal: "",
          refJournallNo: "",
          refDate: "",
          date: "2023-06-20T09:07:55.440Z",
          chqNo: "",
          chqDate: "2023-06-20T09:07:55.440Z",
          invoiceNo: "",
          invoiceDate: "2023-06-20T09:07:55.440Z",
          invoiceDocs: "",
          narrations: "",
          debit: 0,
          credit: 0,
        },
      ]);
    }
  };

  const handleAccountCodeKeyStroke = (e, i) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (e.target.value) {
        setMainModalIndex(i);
        getChartOfAccounts(e.target.value);
      }
    }
  };

  function calculateSum(type) {
    let debitsum = 0;
    let creditsum = 0;
    let totalsum = 0;
    let grandSum = 0;
    let sum = 0;

    for (let index = 0; index < inputList.length; index++) {
      if (
        Number.isNaN(inputList[index].debit) === true ||
        inputList[index].debit === ""
      ) {
        inputList[index].debit = 0;
        debitsum += parseFloat(inputList[index].debit);
      } else {
        debitsum += parseFloat(inputList[index].debit);
      }
    }
    for (let index = 0; index < inputList.length; index++) {
      if (
        Number.isNaN(inputList[index].credit) ||
        inputList[index].credit === ""
      ) {
        inputList[index].credit = 0;
        creditsum += parseFloat(inputList[index].credit);
      } else {
        creditsum += parseFloat(inputList[index].credit);
      }
    }

    totalsum = debitsum - creditsum;

    if (totalsum < 0) {
      sum = totalsum * -1;
    } else {
      sum = totalsum;
    }

    if (type === "GrandSum") {
      grandSum = sum + creditsum;
      return grandSum;
    } else if (type === "DebitSum") {
      return debitsum;
    } else if (type === "Creditsum") {
      return creditsum;
    } else return sum;
  }

  const submitSearch = () => {};

  const submitForm = (e) => {
    e.preventDefault();
    if (calculateSum("DebitSum") === calculateSum("Creditsum")) {
      const mainPayload = {
        operationID: Insert,
        journalID: tbL_TYPE_VOUCHERMASTER_?.journalID,
        flex: "JV",
        companyID: decryptData(COMPANY_ID, SessionStorage),
        parameterID: 0,
        vouMasterID: 0,
        userID: decryptData(LOGINID, SessionStorage),
        userIP: decryptData(UserNetworkInfo)?.IPv4,
        tbL_TYPE_VOUCHERMASTER_: [tbL_TYPE_VOUCHERMASTER_],
        tbL_TYPE_VOUCHERDETAIL_: inputList,
      };
      PostRequest(VOUCHERS, mainPayload)
        .then((res) => {
          if (res?.data?.Table?.[0]?.HasError === 0) {
            emptyAllModalFields();
            CustomSuccessAlert(res?.data?.Table?.[0]?.MESSAGE);
            getPaymentVouchers();
            setToggleForm(false);
          } else {
            CustomErrorMessage(res?.data?.Table?.[0]?.MESSAGE);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    } else {
      CustomWarningMessage("Please enter proper amount");
    }
  };

  const handleInputChangeSelect = (event, index) => {
    if (event.dropdownName === "Journals") {
      setSelectedJournal(event);
      settbL_TYPE_VOUCHERMASTER_({
        ...tbL_TYPE_VOUCHERMASTER_,
        journalID: event.JournalID,
      });
    } else if (event.dropdownName === "ChartOfAccount") {
      setSelectedChartOfAccount(event);
    } else if (event.dropdownName === "CostCenter") {
      setSelectedCostCenter(event);
    }
  };

  const handleInputChangeArraySelect = (event, index) => {
    let list = [...inputList];
    if (event.dropdownName === "CostCenter") {
      const spliceCCArray = [...selectedCostCenterArray];
      spliceCCArray[index] = event;
      setSelectedCostCenterArray(spliceCCArray);
      list[index]["costCenterID"] = event.value;
      setInputList(list);
    } else if (event.dropdownName === "ChartOfAccount") {
      const spliceCOAArray = [...selectedChartOfAccountArray];
      spliceCOAArray.splice(index, 1);
      setSelectedChartOfAccountArray(spliceCOAArray);
      list[index]["coaID"] = event.value;
      list[index]["accCode"] = event.AccCode;
      setInputList(list);
    }
  };

  // handle click event of the Remove button
  const handleRemoveClick = (index) => {
    const list = [...inputList];
    const spliceCOAArray = [...selectedChartOfAccountArray];
    const spliceCCArray = [...selectedCostCenterArray];
    spliceCOAArray.splice(index, 1);
    spliceCCArray.splice(index, 1);
    list.splice(index, 1);
    setInputList(list);
    setSelectedChartOfAccountArray(spliceCOAArray);
    setSelectedCostCenter(spliceCCArray);
  };

  const handleCancel = () => {
    setToggleForm(false);
    emptyAllModalFields();
  };

  const emptyAllModalFields = () => {
    setInputList([
      {
        costCenterID: 0,
        accCode: 0,
        coaID: 0,
        refJournal: "string",
        refJournallNo: "string",
        refDate: "",
        date: "2023-06-20T09:07:55.440Z",
        chqNo: "",
        chqDate: "2023-06-20T09:07:55.440Z",
        invoiceNo: "",
        invoiceDate: "2023-06-20T09:07:55.440Z",
        invoiceDocs: "",
        narrations: "",
        debit: 0,
        credit: 0,
      },
    ]);
    settbL_TYPE_VOUCHERDETAIL_(intialTypeVoucherDetails);
    settbL_TYPE_VOUCHERMASTER_(intialTypeVoucherMaster);
    setSelectedJournal(null);
    setSelectedChartOfAccount(null);
    setSelectedChartOfAccountArray([]);
    setSelectedCostCenter(null);
    setSelectedCostCenterArray([]);
  };

  const customModal = (
    <Fragment>
      <Modal
        isOpen={toggleForm}
        centered
        size="xl"
        style={{ minWidth: "90vw", width: "90%" }}
        modalTransition={{ timeout: 10 }}
        backdrop="static"
      >
        <ModalHeader
          style={{
            backgroundColor: decryptData(COMPANY_DETAILS, SessionStorage)
              ?.ColourCode,
          }}
        >
          Add/Edit Journal Voucher
        </ModalHeader>
        <ModalBody>
          <form onSubmit={submitForm}>
            <Row>
              <Col lg="3" md="3" xs="12">
                <Label>Journals</Label>
                <ReactSelect
                  closeMenuOnSelect={true}
                  onChange={handleInputChangeSelect}
                  options={Journals}
                  value={selectedJournal}
                />
              </Col>
              <Col lg="3" md="3" xs="12">
                <Label>
                  Date
                  <span className="text-danger">*</span>
                </Label>
                <Input
                  name="date"
                  type="date"
                  onChange={handleVoucherMasterChange}
                  value={tbL_TYPE_VOUCHERMASTER_?.date}
                  required
                />
              </Col>
            </Row>
            <Row>
              <Col lg="3" md="3" xs="12">
                <FormGroupInput
                  label="Ref Jrnl"
                  name="refJournal"
                  onChange={handleVoucherMasterChange}
                  value={tbL_TYPE_VOUCHERMASTER_?.refJournal}
                  required
                />
              </Col>
              <Col lg="3" md="3" xs="12">
                <FormGroupInput
                  label="Ref #"
                  name="refJournallNo"
                  isNumber="true"
                  onChange={handleVoucherMasterChange}
                  value={tbL_TYPE_VOUCHERMASTER_?.refJournallNo}
                  required
                />
              </Col>
              <Col lg="3" md="3" xs="12">
                <Label>
                  Ref Date
                  <span className="text-danger">*</span>
                </Label>
                <Input
                  name="refDate"
                  type="date"
                  onChange={handleVoucherMasterChange}
                  value={tbL_TYPE_VOUCHERMASTER_?.refDate}
                  required
                />
              </Col>
            </Row>
            {/* <div className="table-responsive"> */}
            <Row className="mt-3">
              <Col lg="12" md="12" xs="12">
                <Table className="financeTableRightBorder financeTableLeftBorder">
                  <thead>
                    <tr>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        Acc Code
                      </th>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        Acc Name
                      </th>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        Narration
                      </th>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        Ref. Jrnl
                      </th>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        Ref. No
                      </th>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        Ref. Date
                      </th>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        CC Cd
                      </th>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        Debit
                      </th>
                      <th
                        className="text-center"
                        style={{
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                      >
                        Credit
                      </th>
                      <th
                        style={{
                          width: "8%",
                          backgroundColor: decryptData(
                            COMPANY_DETAILS,
                            SessionStorage
                          )?.ColourCode,
                        }}
                        className="text-center"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {inputList?.length &&
                      inputList?.map((x, i) => (
                        <tr key={i}>
                          <td className="VoucherCenter" style={{ width: "7%" }}>
                            <FormGroupInput
                              name="accCode"
                              value={x.accCode}
                              handleKeyDown={(e) => {
                                handleAccountCodeKeyStroke(e, i);
                              }}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td
                            className="VoucherCenter"
                            style={{ width: "10%" }}
                          >
                            <FormGroupSelect
                              name="coaID"
                              value={x.coaID}
                              list={ChartOfAccountList}
                              fieldId="CoaID"
                              fieldName="AccNameCode"
                              newfield="AccCode"
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td
                            className="VoucherCenter"
                            style={{ width: "25%" }}
                          >
                            <FormGroupInput
                              className="ml10"
                              name="narrations"
                              value={x.narrations}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td
                            style={{ width: "10%" }}
                            className="VoucherCenter"
                          >
                            <FormGroupInput
                              className="ml10"
                              name="refJournal"
                              value={x.refJournal}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td style={{ width: "7%" }} className="VoucherCenter">
                            <FormGroupInput
                              className="ml10"
                              name="refJournallNo"
                              value={x.refJournallNo}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td
                            style={{ width: "10%" }}
                            className="VoucherCenter"
                          >
                            <Input
                              name="refDate"
                              type="date"
                              onChange={(e) => handleInputChange(e, i)}
                              value={x.refDate}
                              required
                            />
                          </td>
                          <td
                            className="VoucherCenter"
                            style={{ width: "10%" }}
                          >
                            <ReactSelect
                              closeMenuOnSelect={true}
                              onChange={(e) =>
                                handleInputChangeArraySelect(e, i)
                              }
                              options={CostCenter}
                              value={selectedCostCenterArray[i]}
                            />
                          </td>
                          <td style={{ width: "7%" }} className="VoucherCenter">
                            <FormGroupInput
                              className="ml10"
                              name="debit"
                              handleKeyDown={(e) =>
                                handleDebitCreditKeyStroke(e, i)
                              }
                              isFloat="true"
                              value={
                                Number.isInteger(x.debit)
                                  ? `${x.debit}.00`
                                  : x.debit
                              }
                              disabled={x.credit?.length > 0 ? true : false}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td style={{ width: "7%" }} className="VoucherCenter">
                            <FormGroupInput
                              className="ml10"
                              name="credit"
                              isFloat="true"
                              handleKeyDown={(e) =>
                                handleDebitCreditKeyStroke(e, i)
                              }
                              value={x.credit}
                              disabled={x.debit?.length > 0 ? true : false}
                              onChange={(e) => handleInputChange(e, i)}
                            />
                          </td>
                          <td className="text-center">
                            {inputList?.length !== 1 && (
                              <button
                                className="btn btn-remove btnic"
                                style={{ textAlign: "center" }}
                                onClick={() => handleRemoveClick(i)}
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            )}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </Col>
            </Row>
            {/* </div> */}
            <div className="table-responsive">
              <Row style={{ marginTop: "100px" }}>
                <Col lg="12" md="12" xs="12">
                  <Table bordered style={{ width: "100%" }}>
                    <tbody>
                      <tr style={{ backgroundColor: "rgb(230 231 153)" }}>
                        <td style={{ width: "50%" }} colSpan={3}></td>
                        <td
                          style={{ width: "15%", fontWeight: "bold" }}
                          className="text-center"
                        >
                          Total
                        </td>
                        <td
                          style={{ width: "7%", fontWeight: "bold" }}
                          className="text-center"
                        >
                          {parseFloat(calculateSum("DebitSum")).toFixed(2)}
                        </td>
                        <td
                          style={{ width: "7%", fontWeight: "bold" }}
                          className="text-center"
                        >
                          {parseFloat(calculateSum("Creditsum")).toFixed(2)}
                        </td>
                        <td
                          style={{ width: "10%" }}
                          className="text-center"
                        ></td>
                      </tr>
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </div>

            <Row className="mt-3">
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <Button
                  className="btn-primary-custom-save"
                  color="primary"
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                    borderColor: decryptData(COMPANY_DETAILS, SessionStorage)
                      ?.ColourCode,
                  }}
                >
                  Save
                </Button>
                <Button color="default" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            </Row>
          </form>
        </ModalBody>
      </Modal>
    </Fragment>
  );

  const handleSearchChangeArraySelect = (e) => {
    if (e.dropdownName === "SearchJournalsCode") {
      setSelectedJournalCode(e);
      let SearchJournalCode = { name: "JournalCode", value: e.value };
      dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: SearchJournalCode });
    }
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <ReactSelect
          closeMenuOnSelect={true}
          onChange={(e) => handleSearchChangeArraySelect(e)}
          options={JournalCode}
          value={selectedJournalCode}
        />
      </Col>
    </Fragment>
  );

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
  };

  const customButton = (
    <FormGroupButton
      title="Add Jounal Voucher"
      onClick={() => setToggleForm(true)}
      id="add-btn"
      showToolTip={false}
      toolTipTitle="Add"
      showIcon={true}
    ></FormGroupButton>
  );

  const handleCancelAccCodeModal = () => {
    setToggleAccCode(false);
  };

  const handlekRowInnerModal = (x, i) => {
    if (x.AccTypeID == 1) {
      CustomErrorMessage("You cannot Select Group Account");
    } else {
      let List = [...inputList];
      List[mainModalIndex]["accCode"] = x.AccCode;
      List[mainModalIndex]["coaID"] = x.CoaID;
      setInputList(List);
      setToggleAccCode(false);
    }
  };

  const customInnerModal = (
    <Fragment>
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
                    <th
                      style={{
                        backgroundColor: decryptData(
                          COMPANY_DETAILS,
                          SessionStorage
                        )?.ColourCode,
                      }}
                    >
                      Account Code
                    </th>
                    <th
                      style={{
                        backgroundColor: decryptData(
                          COMPANY_DETAILS,
                          SessionStorage
                        )?.ColourCode,
                      }}
                    >
                      Account Name
                    </th>
                    <th
                      style={{
                        backgroundColor: decryptData(
                          COMPANY_DETAILS,
                          SessionStorage
                        )?.ColourCode,
                      }}
                    >
                      Nature
                    </th>
                    <th
                      style={{
                        backgroundColor: decryptData(
                          COMPANY_DETAILS,
                          SessionStorage
                        )?.ColourCode,
                      }}
                    >
                      Account Type
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {ChartOfAccountListInnerModal?.length > 0 ? (
                    ChartOfAccountListInnerModal?.map((x, i) => (
                      <tr className="hoverOnTableRow" key={i}>
                        <td
                          onClick={() => handlekRowInnerModal(x, i)}
                          style={{
                            width: "10%",
                            fontWeight: x.AccTypeID == 1 ? "bold" : "normal",
                            lineHeight: x.AccTypeID == 1 ? 3 : 0,
                            verticalAlign: "middle",
                            paddingLeft: x.AccTypeID !== 1 && "40px",
                          }}
                        >
                          {x.AccCode}
                        </td>
                        <td
                          style={{
                            width: "15%",
                            fontWeight: x.AccTypeID == 1 ? "bold" : "normal",
                            verticalAlign: "middle",
                            paddingLeft: x.AccTypeID !== 1 && "40px",
                          }}
                        >
                          {x.AccName}
                        </td>
                        <td
                          style={{
                            width: "15%",
                            fontWeight: x.AccTypeID == 1 ? "bold" : "normal",
                            verticalAlign: "middle",
                            paddingLeft: x.AccTypeID !== 1 && "40px",
                          }}
                        >
                          {x.AccNature}
                        </td>
                        <td
                          onClick={() => handlekRowInnerModal(x, i)}
                          style={{
                            width: "30%",
                            fontWeight: x.AccTypeID == 1 ? "bold" : "normal",
                            verticalAlign: "middle",
                            paddingLeft: x.AccTypeID !== 1 && "40px",
                          }}
                        >
                          {x.AccType}
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
      <div style={{ display: "none" }}>
        <PaymentVoucherReport ref={printPaymentVoucherReport} />
      </div>
    </Fragment>
  );

  const handlePrintPaymentVoucherReport = useReactToPrint({
    content: () => printPaymentVoucherReport.current,
  });

  const onPrintRow = (obj) => {
    const payload = {
      ...initialFields,
      vouMasterID: obj?.VouMasterId,
      parameterID: Insert,
      operationID: Select,
    };
    PostRequest(VOUCHERS, payload)
      .then((res) => {
        let PrintData = { name: "PrintData", value: res?.data };
        dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: PrintData });
        timeoutRef.current = setTimeout(
          () => handlePrintPaymentVoucherReport(),
          200
        );
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <FinanceCrudComponent
      formName="Journal Voucher"
      customButton={customButton}
      tableColumns={columns}
      tableRows={TableList}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onDelete={onDeleteRow}
      onEdit={onEditRow}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
      customModal={customModal}
      customInnerModal={customInnerModal}
      onPrint={onPrintRow}
    />
  );
};

export default JournalVouchers;
