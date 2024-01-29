import React, { useEffect, useState } from "react";
import { Button, Table } from "reactstrap";
import { element, array, bool, string } from "prop-types";
import { Fragment } from "react";
import Spinner from "react-spinkit";
import { decryptData } from "../../EncryptData";
import { COMPANY_DETAILS } from "../../utils/EncryptedConstants";
import { SessionStorage } from "../../common/SetupMasterEnum";

const FormGroupTable = (props) => {
  const [onLoad, setOnLoad] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setOnLoad(false);
    }, 1000);
  }, []);
  return (
    <>
      <Fragment>
        <Table
          bordered
          striped
          responsive
          style={{ width: "100%" }}
          className={props?.customizeColor && props?.customizeColor}
        >
          <thead>
            <tr>
              {props?.hideSerialNumber === true ? null : (
                <th
                  style={{
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                  }}
                >
                  S.No.
                </th>
              )}
              {props?.columns &&
                props?.columns?.map((column, index) => (
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      backgroundColor: decryptData(
                        COMPANY_DETAILS,
                        SessionStorage
                      )?.ColourCode,
                    }}
                    key={index}
                  >
                    {column?.name}
                  </th>
                ))}
              {props?.hideAction === true ? null : (
                <th
                  className="text-center"
                  style={{
                    width: 150,
                    backgroundColor: decryptData(
                      COMPANY_DETAILS,
                      SessionStorage
                    )?.ColourCode,
                  }}
                >
                  Action
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {props?.customeRows
              ? props?.customeRows
              : props?.rows &&
                props?.rows?.map((row, index) => (
                  <tr key={index}>
                    {props?.hideSerialNumber === true ? null : (
                      <td style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                        {index + 1}
                      </td>
                    )}
                    {props?.columns &&
                      props?.columns?.map((column, ind) =>
                        props?.showEligiblityColor === true ? (
                          <td
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                            key={ind}
                            className={
                              props?.showEligiblityColor
                                ? row[column?.field] === "Eligible"
                                  ? "text-success"
                                  : row[column?.field] === "Not-Eligible"
                                  ? "text-danger"
                                  : ""
                                : ""
                            }
                          >
                            {column?.render
                              ? column?.render
                              : row[column?.field]}
                          </td>
                        ) : (
                          <td
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                            }}
                            key={ind}
                            className={
                              props?.showColor
                                ? row[column?.field] === "Completed"
                                  ? "text-success"
                                  : "text-danger"
                                : ""
                            }
                          >
                            {column?.render
                              ? column?.render
                              : row[column?.field]}
                          </td>
                        )
                      )}
                    {props?.hideAction === true ? null : (
                      <td
                        className="text-center"
                        style={{ whiteSpace: "nowrap", overflow: "hidden" }}
                      >
                        {props?.onView && (
                          <Button
                            color="primary"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onView(index, row)}
                          >
                            <i className="fa fa-eye"></i>
                          </Button>
                        )}
                        {props?.onDownload && (
                          <Button
                            color="primary"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onDownload(index, row)}
                          >
                            <i class="fa fa-download"></i>
                          </Button>
                        )}
                        {props?.onDownloadText && (
                          <Button
                            color="secondary"
                            // className="btnic"
                            size="sm"
                            onClick={() => props?.onDownloadText(index, row)}
                          >
                            Download Sample Paper
                          </Button>
                        )}
                        {props?.onEdit && (
                          <Button
                            color="primary"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onEdit(index, row)}
                          >
                            <i className="fa fa-pencil-square-o"></i>
                          </Button>
                        )}
                        {props?.onChat && (
                          <Button
                            color="primary"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onChat(index, row)}
                          >
                            <i
                              class="fa fa-commenting-o"
                              aria-hidden="true"
                            ></i>
                          </Button>
                        )}
                        {props?.onDelete && (
                          <Button
                            color="danger"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onDelete(index, row)}
                          >
                            <i className="fa fa-trash"></i>
                          </Button>
                        )}
                        {props?.onConfirm && (
                          <Button
                            color="success"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onConfirm(index, row)}
                          >
                            <i className="fa fa-thumbs-o-up"> </i>
                          </Button>
                        )}

                        {props?.onRevert && (
                          <Button
                            color="success"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onRevert(index, row)}
                          >
                            <i className="fa fa-undo"></i>
                          </Button>
                        )}
                        {props?.onRefuse && (
                          <Button
                            color="danger"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onRefuse(index, row)}
                          >
                            <i className="fa fa-remove"></i>
                          </Button>
                        )}
                        {props?.onGenerateVoucher && (
                          <Button
                            color="success"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onGenerateVoucher(index, row)}
                          >
                            <i className="fa fa-file"></i>
                          </Button>
                        )}
                        {props?.onPrint && (
                          <Button
                            color="success"
                            className="btnic"
                            size="sm"
                            onClick={() => props?.onPrint(index, row)}
                          >
                            <i class="fa fa-print"></i>
                          </Button>
                        )}
                      </td>
                    )}
                    {props?.action && <td>{props?.action}</td>}
                  </tr>
                ))}
          </tbody>
        </Table>
        {props?.rows && props?.rows?.length === 0 && (
          <div
            style={{
              width: "100%",
              textAlign: "center",
              background: "#e9e9e9",
              marginTop: -15,
              padding: 20,
              fontWeight: "bold",
            }}
          >
            No Data Available
          </div>
        )}
      </Fragment>
    </>
  );
};

FormGroupTable.propTypes = {
  rows: array,
  columns: array,
  action: element,
  hideAction: bool,
  hideSerialNumber: bool,
  showColor: bool,
  showEligiblityColor: bool,
  customizeColor: string,
};

export default FormGroupTable;
