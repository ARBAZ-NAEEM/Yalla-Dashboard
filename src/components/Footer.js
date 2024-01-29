import React from "react";
import { Col, Container, Row } from "reactstrap";

const Footer = () => {
  return (
    <div className="footer">
      <Container fluid>
        <Row>
          <Col sm="12">
            <p className="mb-0">
              <b>Copyright © {new Date().getFullYear()} Yalla Safety.</b>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
