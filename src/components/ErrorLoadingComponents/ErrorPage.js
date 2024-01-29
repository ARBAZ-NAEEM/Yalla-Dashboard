import React from "react";
import { useHistory } from "react-router-dom";
import { Button, Col, Container, Row } from "reactstrap";

const ErrorPage = () => {
  const history = useHistory();
  const Back = () => {
    setTimeout(() => {
      history.go(0);
    }, 300);
  };

  return (
    <Container>
      <Row>
        <Col>
          <div
            className="mt-3 text-center"
            style={{ fontFamily: "sans-serif" }}
          >
            <i style={{ fontSize: "160px" }} className="fa fa-cloud"></i>
            <h3 style={{ fontWeight: "600" }}>
              Something went wrong. Please try again.
            </h3>
            <a
              style={{
                fontFamily: "sans-serif",
                fontSize: "21px",
                color: "#837b7b",
                textShadow: "1px 1px #000",
              }}
              href="#"
              onClick={() => {
                history.go();
                // Back();
              }}
            >
              <i style={{ paddingRight: "6px" }} className="fa fa-undo"></i>
              Tap to Retry
            </a>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ErrorPage;
