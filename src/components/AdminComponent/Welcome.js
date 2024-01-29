import moment from "moment";
import React from "react";
import { Card, CardBody, Col, Row } from "reactstrap";
import { SessionStorage } from "../../common/SetupMasterEnum";
import { decryptData } from "../../EncryptData";
import {
  formatDateFunc,
  formatDateFunction2,
} from "../../functions/DateFormatFunction";
import {
  COMPANY_DETAILS,
  EMPLOYEE_DESIGNATION,
  EMPLOYEE_NAME,
  KIND,
  LAST_NAME,
  MIDDLE_NAME,
  TYPE,
} from "../../utils/EncryptedConstants";

const Welcome = () => {
  const newDate = new Date();
  const formatDate = formatDateFunction2(newDate, " ", "long");
  const verifyKind = decryptData(KIND, SessionStorage);
  return (
    <Row>
      <Col>
        <Card
          className="welcome-notes text-white mb-2"
          style={{ backgroundColor: "#7367F0" }}
        >
          <CardBody>
            {decryptData(TYPE, SessionStorage) === 2 ? (
              <>
                <h6>Welcome {decryptData(EMPLOYEE_NAME, SessionStorage)}</h6>
                <p className="mb-0 font-size-small">{formatDate}</p>
                <p className="mb-0 font-size-small">
                  Designation:{" "}
                  <span>
                    {decryptData(EMPLOYEE_DESIGNATION, SessionStorage)}
                  </span>
                </p>
              </>
            ) : (
              <>
                {decryptData(TYPE, SessionStorage) === 1 ? (
                  <>
                    <h6>
                      Welcome {decryptData(EMPLOYEE_NAME, SessionStorage)}{" "}
                      {decryptData(MIDDLE_NAME, SessionStorage)}{" "}
                      {decryptData(LAST_NAME, SessionStorage)}
                    </h6>
                    <p className="mb-0 font-size-small">{formatDate}</p>
                    <p className="mb-0 font-size-small">
                      Department:{" "}
                      <span>
                        {decryptData(EMPLOYEE_DESIGNATION, SessionStorage)}
                      </span>
                    </p>
                  </>
                ) : (
                  <>
                    <Row>
                      <Col md="6">
                        <h5 style={{ marginBottom: "0px" }}>
                          Welcome to{" "}
                          {verifyKind === "S" ? "Sefety Engineer" : "Engineer"}
                          {/* {decryptData(MIDDLE_NAME, SessionStorage)}{" "}
                          {decryptData(LAST_NAME, SessionStorage)} */}
                        </h5>
                      </Col>
                      <Col md="6" className="text-right">
                        <span className="mb-0 font-size-large ">
                          {formatDate}
                        </span>
                      </Col>
                    </Row>
                  </>
                )}
              </>
            )}
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};

export default Welcome;
