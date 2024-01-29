import React, { useState, Fragment } from "react";
import { useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardBody,
  Nav,
  Form,
  FormGroup,
  Button,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  Spinner,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../../../assets/css/login.css";
import loginImage from "../../../assets/img/auth-v2-login-illustration-light.png";
import dash from "../../../assets/img/icons8-dash-24.png";
import Logo from "../../../assets/img/filled_logo.png";

import loginbg from "../../../assets/img/login-bg2.jpg";
import loginbgimage from "../../../assets/img/bg_image.jpg";
import { RESET_FORM_FIELDS } from "../../../redux/actionType/AuthType";

import propTypes from "prop-types";

const LoginFormComponent = (props) => {
  const {
    fieldEmployeePanel,
    formSubmit,
    initialFormFields,
    loginType,
    fieldNewRegistration,
    disableButton,
  } = props;

  const dispatch = useDispatch();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formSubmit("2");
  };

  return (
    <div className="auth-page">
      <Container>
        <Row className="align-items-center">
          <Col lg="6">
            <Card className="auth-picture">
              <img src={loginImage} alt="" />
            </Card>
          </Col>
          <Col lg="6">
            <Card className="auth-form">
              <CardBody className="p-4">
                {loginType === "Existing" && (
                  <Fragment>
                    <TabContent className="tab-content-inner">
                      <TabPane>
                        <Form onSubmit={handleFormSubmit}>
                          {/* <h3 className="authf-title mb-1">Finance Portal</h3> */}
                          <h1 className="login-heading">
                            {/* Welcome !{" "} */}
                            <img className="logo-img" src={Logo} alt="Logo" />
                          </h1>
                          {/* <img
                            src={dash}
                            style={{ margin: "auto", display: "table" }}
                          /> */}
                          <p className="authf-stitle mb-3">
                            Sign in to your Account
                          </p>
                          {fieldEmployeePanel}
                          {/* <FormGroup className="form-group text-right">
                            <Link to="/forgotusername" className="forgot-link align-txt">
                              Forgot LoginId
                            </Link>
                            <Link to="/forgotpassword" className="forgot-link">
                              {" "}
                              | Forgot Password
                            </Link>
                          </FormGroup> */}
                          <div className="mt-2 mb-2">
                            <Button
                              style={{
                                backgroundColor: "#e84b1e",
                                borderColor: "#e84b1e",
                                borderRadius: "10px",
                              }}
                              color="primary"
                              className="login_btn"
                              type="submit"
                              disabled={
                                disableButton == undefined
                                  ? false
                                  : disableButton
                              }
                            >
                              Login Now
                              {/* <i class="fa fa-sign-in" aria-hidden="true"></i> */}
                            </Button>
                            <span className="register-account">
                              <a href="/Register">Register Now</a>
                            </span>

                            {/* <Button
                              style={{
                                backgroundColor: "#e84b1e",
                                borderColor: "#e84b1e",
                                borderRadius: "10px",
                              }}
                              color="primary"
                              className="login_btn"
                              // type="submit"
                              disabled={
                                disableButton == undefined
                                  ? false
                                  : disableButton
                              }
                              href="/Register"
                            >
                              Register Now
                              <i class="fa fa-sign-in" aria-hidden="true"></i>
                            </Button> */}
                            {/* <Spinner animation="border" role="status">
                                <span className="visually-hidden">Loading...</span>
                              </Spinner> */}
                          </div>
                        </Form>
                      </TabPane>
                    </TabContent>
                  </Fragment>
                )}
                <div className="form-copyright">
                  <b> Copyright © {new Date().getFullYear()} Yalla Safety.</b>
                </div>
                {fieldNewRegistration && (
                  <div className="form-copyright text-center">
                    UAN: 0243-920126
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

LoginFormComponent.propTypes = {
  fieldEmployeePanel: propTypes.element,
  formSubmit: propTypes.func,
  initialFormFields: propTypes.object,
  loginType: propTypes.string,
  buttonName: propTypes.string,
  disableButton: propTypes.bool,
};

export default LoginFormComponent;
