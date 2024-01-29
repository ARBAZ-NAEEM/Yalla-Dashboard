import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Container,
  FormGroup,
  Progress,
  Row,
  Table,
} from "reactstrap";
import Welcome from "../../components/AdminComponent/Welcome";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import Profile1 from "../../assets/img/emp-img.jpg";
import Profile2 from "../../assets/img/emp-img1.jpg";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";

const initialValues = {
  fromDate: "",
  toDate: "",
  name: "",
};

const Contracts = () => {
  const [formFields, setFormFields] = useState({
    ...initialValues,
  });
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  const columns = [
    { field: "employees", name: "Employees" },
    { field: "timeOffType", name: "Time Off Type" },
    { field: "description", name: "Description" },
    { field: "startDate", name: "Start Date" },
    { field: "endDate", name: "End Date" },
    { field: "duration", name: "Duration" },
    { field: "status", name: "Status" },
  ];
  const rows = [
    {
      employees: "Sharlena Rahode",
      timeOffType: "Sick Time Off",
      description: "Second Dentist Appointment",
      startDate: "1995-05-06",
      endDate: "1995-05-06",
      duration: "2 Days",
      status: "To Approve",
    },
    {
      employees: "Sharlena Rahode",
      timeOffType: "Sick Time Off",
      description: "Second Dentist Appointment",
      startDate: "1995-05-06",
      endDate: "1995-05-06",
      duration: "2 Days",
      status: "To Approve",
    },
  ];
  return (
    <Container fluid>
      <Card className="mt-3">
        <CardTitle>Search Contracts</CardTitle>
        <CardBody>
          <Row>
            <Col lg="3" md="3" xs="12">
              <FormGroupInput
                label="Employee Name"
                name="employeeName"
                onChange={handleInputChange}
                value={formFields.employeeName}
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupInput
                label="Employee Code "
                name="employeeCode"
                onChange={handleInputChange}
                value={formFields.employeeCode}
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupSelect
                label="Designation"
                name="designation"
                onChange={handleInputChange}
                value={formFields.designation}
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupSelect
                label="Department"
                name="department"
                onChange={handleInputChange}
                value={formFields.department}
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupSelect
                label="Campus Type"
                name="campusType"
                onChange={handleInputChange}
                value={formFields.campusType}
              />
            </Col>
            <Col lg="12" md="12" xs="12" className="text-right">
              <Button color="primary">Search</Button>
              <Button color="default">Cancel</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Card>
        <CardTitle>Contract List</CardTitle>
        <CardBody>
          <Row>
            <Col lg="12" md="12" sm="12" xs="12">
              <Table>
                <thead>
                  <tr>
                    <th>S.No.</th>
                    <th>Name</th>
                    <th>Date Created</th>
                    <th>Designation</th>
                    <th>Salary</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>1</td>
                    <td>
                      <div className="payroll-status">
                        <img
                          src={Profile1}
                          alt="employee"
                          className="img-circle"
                        />
                        Marc Demo
                      </div>
                    </td>
                    <td>02-04-2022</td>
                    <td>Experienced Developer</td>
                    <td>5,000 PKR / Month </td>
                    <td>
                      <div className="payroll-status ">
                        <span className="badge badge-success">Confirmed</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>2</td>
                    <td>
                      <div className="payroll-status">
                        <img
                          src={Profile2}
                          alt="employee"
                          className="img-circle"
                        />
                        Marc Demo
                      </div>
                    </td>
                    <td>02-04-2022</td>
                    <td>Experienced Developer</td>
                    <td>5,000 PKR / Month </td>
                    <td>
                      <div className="payroll-status ">
                        <span className="badge badge-warning">Probation</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td>
                      <div className="payroll-status">
                        <img
                          src={Profile1}
                          alt="employee"
                          className="img-circle"
                        />
                        Marc Demo
                      </div>
                    </td>
                    <td>02-04-2022</td>
                    <td>Experienced Developer</td>
                    <td>5,000 PKR / Month </td>
                    <td>
                      <div className="payroll-status ">
                        <span className="badge badge-success">Confirmed</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>4</td>
                    <td>
                      <div className="payroll-status">
                        <img
                          src={Profile2}
                          alt="employee"
                          className="img-circle"
                        />
                        Marc Demo
                      </div>
                    </td>
                    <td>02-04-2022</td>
                    <td>Experienced Developer</td>
                    <td>5,000 PKR / Month </td>
                    <td>
                      <div className="payroll-status ">
                        <span className="badge badge-primary">Relieved</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td>5</td>
                    <td>
                      <div className="payroll-status">
                        <img
                          src={Profile1}
                          alt="employee"
                          className="img-circle"
                        />
                        Marc Demo
                      </div>
                    </td>
                    <td>02-04-2022</td>
                    <td>Experienced Developer</td>
                    <td>5,000 PKR / Month </td>
                    <td>
                      <div className="payroll-status ">
                        <span className="badge badge-info">Retired</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
          <Row>
            <Col lg="9" md="9">
              <p className="font-size-normal">Showing 10-50 of 2000 records</p>
            </Col>
            <Col lg="3" md="3" className="text-right">
              <span className="font-size-normal">Records Per Page </span>
              <select>
                <option>10</option>
                <option>20</option>
                <option>30</option>
                <option>40</option>
                <option>50</option>
              </select>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default Contracts;
