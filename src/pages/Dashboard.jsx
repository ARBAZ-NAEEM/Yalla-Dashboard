/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Modal,
  Button,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import ResetPasswordModal from "../pages/ResetPasswordModal";
import {
  RESET_FORM_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../redux/actionType/CrudActionTypes";
import FormGroupInput from "../components/GeneralComponent/FormGroupInput";
import {
  PostRequest,
  SecuritySetup_ForgetCredentials,
  SecuritySetup_ResetPassword,
  Setup_Dashboard,
} from "../utils/Config";
import Swal from "sweetalert2";
import { Insert, Select, SessionStorage } from "../common/SetupMasterEnum";
import {
  COMPANY_DETAILS,
  COMPANY_ID,
  RESETPASSWORD,
} from "../utils/EncryptedConstants";
import { decryptData, encryptData } from "../EncryptData";
import { DASHBOARD } from "../utils/UrlConstants";
import people from "../assets/img/people.svg";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { PolarArea } from "react-chartjs-2";

const initialFormFields = {
  Cnic: "",
  LoginId: "",
  OperationId: Insert,
};

const Dashboard = (props) => {
  const initialDashboardFields = {
    operationID: Select,
    periodID: 0,
    companyID: decryptData(COMPANY_ID, SessionStorage),
  };

  const { FormFields, SupportingTables } = useSelector(
    (state) => state.CrudFormReducer
  );
  const [dashboardList, setDashboardList] = useState([]);
  const [openTogel, setOpenToggle] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    let data = {
      name: "ResetPassword",
      value: decryptData(RESETPASSWORD, SessionStorage),
    };
    dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: initialFormFields });
    // getDashboardData();
    getDashbaord();
  }, []);

  function getDashbaord() {
    PostRequest(DASHBOARD, initialDashboardFields)
      .then((res) => {
        setDashboardList(res?.data?.Table);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const handleInputChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleSubmitResetPassword = (e) => {
    e.preventDefault();
    SecuritySetup_ForgetCredentials(FormFields).then((res) => {
      if (res?.data?.Table[0]?.Column1 == 2) {
        dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
        setOpenToggle(false);
        Swal.fire({
          title: "Success",
          icon: "success",
          text: res?.data?.Table[0]?.Column2,
        });
      } else {
        Swal.fire({
          title: "Error",
          icon: "error",
          text: res?.data?.Table[0]?.Column2,
        });
      }
    });
  };

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);
  const data1 = {
    labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
    datasets: [
      {
        label: "# of Votes",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container fluid className="pt-2">
      {SupportingTables?.ResetPassword == "0" ? (
        <Modal
          isOpen={openTogel}
          centered
          // toggle={toggle}
          modalTransition={{ timeout: 10 }}
          backdrop="static"
        >
          <ModalHeader
          // toggle={toggle}
          >
            Reset Password
          </ModalHeader>
          <ModalBody>
            <form onSubmit={handleSubmitResetPassword}>
              <Row>
                <Col lg="12" md="12" xs="12">
                  <FormGroupInput
                    type="email"
                    label="Login ID"
                    name="LoginId"
                    required
                    onChange={handleInputChange}
                    value={FormFields?.LoginId}
                  />
                </Col>
                <Col lg="12" md="12" xs="12">
                  <Button color="primary" className="mt-2">
                    Change Password
                  </Button>
                  <Button
                    color="primary"
                    className="mt-2"
                    onClick={() => setOpenToggle(false)}
                  >
                    Close
                  </Button>
                </Col>
              </Row>
            </form>
          </ModalBody>
        </Modal>
      ) : null}

      <Row>
        {/* <Col md="6">
          <Card style={{ borderRadius: "20px" }}>
            <CardBody style={{ padding: "0px" }}>
              <div className="card-people">
                <img src={people} alt="" />
                <div className="weather-info">
                  <div className="weahter-class">
                    <h2 style={{ fontSize: "50px" }}>
                      <i
                        style={{ fontSize: "30px", marginRight: "10px" }}
                        class="fa fa-sun-o"
                        aria-hidden="true"
                      ></i>
                      31
                      <sup>C</sup>
                    </h2>
                  </div>
                  <div className="country-class">
                    <p style={{ marginBottom: "0px", fontSize: "20px" }}>
                      <b>Pakistan</b>
                    </p>
                    <p style={{ marginBottom: "0px" }}>Karachi</p>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>
        </Col> */}
        <Col md="12">
          <Row>
            <Col md="3">
              <Card className="card-sec">
                <CardBody style={{ backgroundColor: "#7DA0FA", color: "#fff" }}>
                  <p className="mb-4">Labors</p>
                  <p style={{ fontSize: "30px", marginBottom: "2px" }}>100</p>
                  <p style={{ fontSize: "0.875rem" }}>(30 days)</p>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="card-sec">
                <CardBody style={{ backgroundColor: "#4747A1", color: "#fff" }}>
                  <p className="mb-4">Working</p>
                  <p style={{ fontSize: "30px", marginBottom: "2px" }}>90</p>
                  <p style={{ fontSize: "0.875rem" }}>(30 days)</p>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="card-sec">
                <CardBody style={{ backgroundColor: "#7978E9", color: "#fff" }}>
                  <p className="mb-4">Active</p>
                  <p style={{ fontSize: "30px", marginBottom: "2px" }}>50</p>
                  <p style={{ fontSize: "0.875rem" }}> (-- days)</p>
                </CardBody>
              </Card>
            </Col>
            <Col md="3">
              <Card className="card-sec">
                <CardBody style={{ backgroundColor: "#F3797E", color: "#fff" }}>
                  <p className="mb-4">Completed</p>
                  <p style={{ fontSize: "30px", marginBottom: "2px" }}>20</p>
                  <p style={{ fontSize: "0.875rem" }}>30.22% </p>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* <Row>
        <Col md="6">
          <Card>
            <CardBody>
              <Doughnut data={data} />
            </CardBody>
          </Card>
        </Col>
        <Col md="6">
          <Card>
            <CardBody>
              <PolarArea data={data1} />
            </CardBody>
          </Card>
        </Col>
      </Row> */}
    </Container>
  );
};

export default Dashboard;
