import React from "react";
import { CardTitle, Col, Row } from "reactstrap";
import logoimg from "../../assets/img/logo.png";

const LoginHeader = () => {
  return (
    <CardTitle tag="h5" className="p-4 pt-2 pb-2">
      <Row>
        <Col xs="2" className="text-center">
          <img src={logoimg} height="60" />
        </Col>
        <Col xs="10">
          <h5 className="mt-2 mb-0">SHAH ABDUL LATIF UNIVERSITY</h5>
          <p className="mb-0">
            <small>KHAIRPUR</small>
          </p>
        </Col>
      </Row>
    </CardTitle>
  );
};

export default LoginHeader;
