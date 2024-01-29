import React, { forwardRef } from "react";
import logoimg from "../../../../assets/img/logo.png";
import { useSelector } from "react-redux";

const PaymentVoucherReport = forwardRef((props, ref) => {
  const { SupportingTables } = useSelector((state) => state.CrudFormReducer);

  const { PrintData } = SupportingTables;

  return (
    <>
      <div
        ref={ref}
        className="text-center"
        style={{
          fontSize: 12,
          margin: "10px",
          padding: "10px 25px",
        }}
      >
        <div>
          <div>
            <h5 className="text-center" style={{ marginBottom: "0" }}>
              <img src={logoimg} height="55" />
              <u>Sheikh Ayaz University Shikarpur(2021 - 22)</u>
            </h5>
          </div>
          <h5>
            <u>PAYMENT VOUCHER</u>
          </h5>
        </div>
        <br />
        <div className="d-flex" style={{ width: "25%" }}>
          <table>
            <tbody className="tbl-row-border">
              <tr className="tbl-row-border">
                <td className="tbl-row-border">Voucher Number</td>
                <td className="tbl-row-border">
                  {PrintData?.Table?.[0]?.VouMasterId}
                </td>
              </tr>
              <tr className="tbl-row-border">
                <td className="tbl-row-border">Voucher Date</td>
                <td className="tbl-row-border">
                  {PrintData?.Table?.[0]?.TransDate}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <div className="d-flex justify-content-between">
          <p className="text-left">
            Bank Account: <span id="fin-border-hd2">60</span>
          </p>
          <p>
            Cheque Ref: <span id="fin-border-hd2"></span>
          </p>
          <p>
            Dated: <span id="fin-border-hd1"></span>
          </p>
        </div>
        <div className="d-flex justify-content-between">
          <p className="text-left">
            Bank Title:{" "}
            <span id="fin-border-hd1">{PrintData?.Table?.[0]?.AccName}</span>
          </p>
          <p>
            Journal Ref:{" "}
            <span id="fin-border-hd1">
              {PrintData?.Table?.[0]?.JournalName}
            </span>
          </p>
        </div>
        <div
          className="d-flex justify-content-center"
          style={{ width: "100%" }}
        >
          <table style={{ width: "100%" }} className="tbl-row-border">
            <thead className="tbl-hd-row">
              <tr>
                <th rowSpan={1} colSpan={2} className="tbl-row-border">
                  <strong>ACCOUNT HEADS</strong>
                </th>
                <th rowSpan={3} colSpan={4} className="tbl-row-border">
                  <strong>NARRATION</strong>
                </th>
                <th rowSpan={3} colSpan={1} className="tbl-row-border">
                  <strong>COST CENTRE</strong>
                </th>
                <th rowSpan={3} colSpan={1} className="tbl-row-border">
                  <strong>DEBIT AMOUNT</strong>
                </th>
                <th rowSpan={3} colSpan={1} className="tbl-row-border">
                  <strong>CREDIT AMOUNT</strong>
                </th>
              </tr>
              <tr>
                <th rowSpan={1} colSpan={1} className="tbl-row-border">
                  <strong>CODE</strong>
                </th>
                <th rowSpan={1} colSpan={1} className="tbl-row-border">
                  <strong>ACCOUNT TITLE</strong>
                </th>
              </tr>
            </thead>
            <tbody>
              {PrintData?.Table1?.length > 0 &&
                PrintData?.Table1?.map((x, i) => (
                  <tr key={i}>
                    <td className="tbl-row-border">{x.AccCode}</td>
                    <td className="tbl-row-border">{x.AccName}</td>
                    <td className="tbl-row-border" colSpan={4}>
                      {x.Narrations}
                    </td>
                    <td className="tbl-row-border"> {x.CostCenter}</td>
                    <td className="tbl-row-border">{x.Debit}</td>
                    <td className="tbl-row-border">{x.Credit}</td>
                  </tr>
                ))}
              <tr style={{ fontWeight: "bold" }}>
                <td className="tbl-row-border">
                  {PrintData?.Table?.[0]?.AccCode}
                </td>
                <td className="tbl-row-border">
                  {PrintData?.Table?.[0]?.AccName}
                </td>
                <td className="tbl-row-border" colSpan={4}>
                  {PrintData?.Table?.[0]?.Narrations}
                </td>
                <td className="tbl-row-border"></td>
                <td className="tbl-row-border">
                  {PrintData?.Table?.[0]?.Debit}
                </td>
                <td className="tbl-row-border">
                  {PrintData?.Table?.[0]?.Credit}
                </td>
              </tr>
              <tr>
                <td className="tbl-row-border">IN WORDS:</td>
                <td className="tbl-row-border-tl" colSpan={6}>
                  RUPEES SEVEN HUNDRED ONLY /-
                </td>
                <td className="tbl-row-border">700.00</td>
                <td className="tbl-row-border">0.00</td>
              </tr>
            </tbody>
          </table>
        </div>
        <br />
        <br />
        <div className="d-flex">
          <p>
            <br />
            <span id="fin-border-foot">Prepared By</span>
          </p>
          <p style={{ marginLeft: "5px" }}>
            <br />
            <span id="fin-border-foot">Checked By</span>
          </p>
          <p style={{ marginLeft: "10px" }}>
            <br />
            <span id="fin-border-foot">Approved By</span>
          </p>
        </div>
        <p className="text-right" style={{ marginLeft: "10px" }}>
          <br />
          <span id="fin-border-foot">Received By</span>
        </p>
      </div>
    </>
  );
});

export default PaymentVoucherReport;
