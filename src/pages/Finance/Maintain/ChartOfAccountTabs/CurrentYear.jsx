import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Button,
  Col,
  Input,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
} from "reactstrap";
import FormGroupInput from "../../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../../components/GeneralComponent/FormGroupSelect";
import FormGroupCheckbox from "../../../../components/GeneralComponent/FormGroupCheckbox";
import { decryptData } from "../../../../EncryptData";
import { COMPANY_DETAILS } from "../../../../utils/EncryptedConstants";
import { SessionStorage } from "../../../../common/SetupMasterEnum";

const CurrentYear = (props) => {
  const { TableList } = useSelector((state) => state.CrudFormReducer);

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

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

  return (
    <Fragment>
      <Row>
        <Col lg="12" md="12" xs="12">
          <h5 className="mt-2">Account Balance</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered striped responsive style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{backgroundColor :decryptData(COMPANY_DETAILS, SessionStorage)
              ?.ColourCode}} rowSpan={2} colSpan={1}>
                  S.No.
                </th>
                {columns?.map((column, index) => (
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      backgroundColor :decryptData(COMPANY_DETAILS, SessionStorage)
              ?.ColourCode
                    }}
                    key={index}
                  >
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Col>
      </Row>
      <Row>
        <Col lg="12" md="12" xs="12">
          <h5 className="mt-2">Month Wise</h5>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table bordered striped responsive style={{ width: "100%" }}>
            <thead>
              <tr>
                <th style={{backgroundColor :decryptData(COMPANY_DETAILS, SessionStorage)
              ?.ColourCode}} rowSpan={2} colSpan={1}>
                  S.No.
                </th>
                {columns?.map((column, index) => (
                  <th
                    style={{
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      backgroundColor :decryptData(COMPANY_DETAILS, SessionStorage)
              ?.ColourCode
                    }}
                    key={index}
                  >
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody></tbody>
          </Table>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CurrentYear;
