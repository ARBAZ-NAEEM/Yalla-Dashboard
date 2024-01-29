import React, { useState } from "react";
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
import "../assets/css/login.css";
import logoimg from "../assets/img/logo.png";
import loginbg from "../assets/img/login-bg2.jpg";
import { Select } from "../common/SetupMasterEnum";
import FormGroupInput from "../components/GeneralComponent/FormGroupInput";
import { SecuritySetup_ForgetCredentials } from "../utils/Config";
import Swal from "sweetalert2";
import dash from "../../src/assets/img/icons8-dash-24.png";

// import Swal from "sweetalert2";



const initialFormFields = {
  Cnic: "",
  LoginId: "",
  OperationId: Select,
};
const ForgotPassword = (props) => {
  const [formFields, setFormFields] = useState(initialFormFields);
  const handleSearchChange = (e) => {
    setFormFields({
      ...formFields,
      [e.target.name]: e.target.value,
    });
  };
  function getUserCredentials(payload) {
    SecuritySetup_ForgetCredentials(payload)
      .then((res) => {
        if (res?.data?.Table[0]?.Column1 == 1) {
          Swal.fire({
            title: "Success",
            icon: "success",
            text: res?.data?.Table[0]?.Column2,
            timer: 3000,
          }).then((results) => {
            if (results.isDismissed) {
              setFormFields({
                ...initialFormFields,
              });
            } else if (results.isConfirmed) {
              setFormFields({
                ...initialFormFields,
              });
            }
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: res?.data?.Table[0]?.Column2,
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  const onSubmit = (e) => {
    e.preventDefault();
    getUserCredentials(formFields);
  };
  return (
    <div className="auth-page">
      <Container fluid>
        <Row className="align-items-center">
          <Col lg="12">
            <Card className="auth-form">
              <CardBody className="p-5 pt-3 pb-3">
                {/* <div className="login-brand">
                  <img src={logoimg} height="130" />
                </div> */}
                <form onSubmit={onSubmit}>
                  <h4 className="authf-title mb-2">Forgot Login Id</h4>
                  <img src={dash} style={{margin:'auto', display:'table'}}/>
                  <FormGroupInput
                    isIcon={true}
                    iconClass="fa fa-id-badge"
                    placeholder={'xxxxxxxxxxxxx'}
                    label="CNIC"
                    name="Cnic"
                    required
                    onChange={handleSearchChange}
                    value={formFields.Cnic}
                    isNumber="true"
                    maxLength="13"
                  />
                  <FormGroup className="form-group text-right">
                    <Link type="button" to="/login" className="forgot-link">
                      Login
                    </Link>
                  </FormGroup>
                  <div className="text-center mt-3 mb-4">
                    <Button
                      color="primary"
                      className="w-50"
                      type="submit"
                      style={{ backgroundColor: "#0f73ee", borderColor: "#0f73ee", borderRadius:"40px" }}
                    >
                      Submit
                    </Button>
                  </div>
                </form>
                <div className="form-copyright text-center">
                  <b> Copyright © {new Date().getFullYear()} SALU.</b>
                </div>
              </CardBody>
            </Card>
          </Col>
          {/* <Col lg="6" style={{ backgroundImage: `url(${loginbg})`, backgroundSize: 'cover' }}></Col> */}
        </Row>
      </Container>
    </div>
  );
};

export default ForgotPassword;
