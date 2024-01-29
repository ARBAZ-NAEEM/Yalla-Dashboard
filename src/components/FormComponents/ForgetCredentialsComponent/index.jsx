import React, { useState, useEffect, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  Row,
  Col,
  Card,
  CardTitle,
  CardBody,
  Nav,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
  NavItem,
  NavLink,
  TabPane,
  TabContent,
  CardFooter,
} from "reactstrap";
import { Link } from "react-router-dom";
import "../../../assets/css/login.css";
import logoimg from "../../../assets/img/logo.png";
import loginbg from "../../../assets/img/login-bg2.jpg";
// import Swal from "sweetalert2";
import { RESET_FORM_FIELDS } from "../../../redux/actionType/AuthType";

import propTypes from "prop-types";

const LoginFormComponent = (props) => {
  const { fieldsPanel,  formSubmit,  initialFormFields, } = props;

  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState("1");
  const loginData = () => {
    localStorage.setItem("loginId", "2");
    props.history.push("/pages/dashboard");
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    formSubmit();
  };

  useEffect(() => {}, []);

  return (
    <div className="auth-page" style={{ backgroundImage: `url(${loginbg})` }}>
      <Container>
        <Row className="align-items-center">
          <Col lg="6">
            <Card>
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
              <CardBody className="p-5 pt-3 pb-3">
                <Nav pills className="mt-3">
                  <NavItem>
                    <NavLink
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => {setActiveTab("1");dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields })}}
                    >
                      Student
                    </NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => {setActiveTab("2");dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields })}}
                    >
                      Employee
                    </NavLink>
                  </NavItem>
                </Nav>
                <TabContent className="tab-content-inner" activeTab={activeTab}>
                  <TabPane tabId={activeTab}>
                    <Form onSubmit={handleFormSubmit}>
                      <h3 class="mb-1">Welcome {activeTab == 1 ? 'Student' : 'Employee'}!</h3>
                      <p class="text-muted text-sm mb-3">Sign In To Continue</p>
                      {
                        activeTab == 1 ? 
                        (
                             <Fragment>{fieldsPanel}</Fragment>
                        ): 
                        (
                             <Fragment>{fieldEmployeePanel}</Fragment>
                        )
                      }
                      <FormGroup className="form-group text-right">
                        <Link to="/forgotusername" className="forgot-link">
                          Forgot LoginId
                        </Link>
                        <Link to="/forgotpassword" className="forgot-link">
                          {" "}
                          | Forgot Password
                        </Link>
                      </FormGroup>
                      {/* <Button color="primary" type="button" onClick={loginData}> */}
                      <Button color="primary" type="submit">
                        Login
                      </Button>
                    </Form>
                  </TabPane>
                </TabContent>
              </CardBody>
              <CardFooter>
                <div className="form-copyright text-center">
                  Copyright © 2022 Shah Abdul Latif University.
                </div>
              </CardFooter>
            </Card>
          </Col>
          <Col lg="6"></Col>
        </Row>
      </Container>
    </div>
  );
};

LoginFormComponent.propTypes = {
  fieldsPanel: propTypes.element,
  fieldEmployeePanel: propTypes.element,
  formSubmit: propTypes.func,
  initialFormFields: propTypes.object,
};

export default LoginFormComponent;
