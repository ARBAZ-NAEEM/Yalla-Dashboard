import React, { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
} from "reactstrap";
import Swal from "sweetalert2";
import { SessionStorage } from "../common/SetupMasterEnum";
import FormGroupInput from "../components/GeneralComponent/FormGroupInput";
import { decryptData } from "../EncryptData";
import { SecuritySetup_ResetPassword } from "../utils/Config";
import { LOGINID, TYPE, USER_ID } from "../utils/EncryptedConstants";

const ChangePassword = () => {
  const initialValues = {
    UserId: decryptData(LOGINID, SessionStorage),
    Type: decryptData(TYPE, SessionStorage),
    Emp_Stud_ID: decryptData("EmplId", SessionStorage),
    OldPass: "",
    NewPass: "",
    ConfirmPass: "",
  };

  const [formFields, setFormFields] = useState({
    ...initialValues,
  });
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    if (formFields.OldPass === formFields.NewPass) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "Old Password & New Password can not be same",
      });
    } else if (formFields.NewPass !== formFields.ConfirmPass) {
      Swal.fire({
        title: "Error",
        icon: "error",
        text: "New Password & Confrim Password do not match.",
      });
    } else {
      SecuritySetup_ResetPassword(formFields).then((res) => {
        if (res?.data?.Table[0]?.haserror == 0) {
          setFormFields({
            ...initialValues,
          });
          Swal.fire({
            title: "Success",
            icon: "success",
            text: res?.data?.Table[0]?.Message,
          });
        } else {
          Swal.fire({
            title: "Error",
            icon: "error",
            text: res?.data?.Table[0]?.Message,
          });
        }
      });
    }
  };
  return (
    <Container fluid>
      <Card className="mt-3">
        <CardTitle>Change Password</CardTitle>
        <CardBody>
          <form onSubmit={onSubmit}>
            <Row>
              <Col lg="4" md="3" xs="12"></Col>
              <Col lg="4" md="3" xs="12">
                <FormGroupInput
                  className="row"
                  label="Old Password"
                  name="OldPass"
                  required={true}
                  onChange={handleInputChange}
                  value={formFields.OldPass}
                  type="password"
                />
                <FormGroupInput
                  label="New Password"
                  name="NewPass"
                  required={true}
                  onChange={handleInputChange}
                  value={formFields.NewPass}
                  type="password"
                />
                <FormGroupInput
                  label="Confirm Password"
                  name="ConfirmPass"
                  required={true}
                  onChange={handleInputChange}
                  value={formFields.ConfirmPass}
                  type="password"
                />
                <Button color="primary" className="mt-2">
                  Change Password
                </Button>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>
    </Container>
  );
};

export default ChangePassword;
