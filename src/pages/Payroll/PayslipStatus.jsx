import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  Container,
  Button,
  Badge,
} from "reactstrap";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";

const initialValues = {
  employeeName: "",
  designation: "",
  department: "",
};
const PayslipStatus = () => {
  const [formFields, setFormFields] = useState({
    ...initialValues,
  });
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <Container fluid>
      <Card className="mt-3">
        <CardTitle>Search Payslip Status</CardTitle>
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
            <Col lg="3" md="3" xs="12">
              <FormGroupSelect
                label="Month"
                name="month"
                onChange={handleInputChange}
                value={formFields.month}
              />
            </Col>
            <Col lg="3" md="3" xs="12">
              <FormGroupSelect
                label="Year"
                name="year"
                onChange={handleInputChange}
                value={formFields.year}
              />
            </Col>
            <Col lg="12" md="12" xs="12" className="text-right">
              <Button color="primary">Search</Button>
              <Button color="default">Cancel</Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card className="mt-3">
        <CardTitle>Payslip Details</CardTitle>
        <CardBody>
          <Row>
            <Col>
              <div className="table-responsive">
                <table className="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th>S.No.</th>
                      <th>Employee Name</th>
                      <th>Employee Code</th>
                      <th>Campus Type</th>
                      <th>Month</th>
                      <th>Year</th>
                      <th>Designation</th>
                      <th>Department</th>
                      <th>Basic Wage</th>
                      <th>Net Wage</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Mitchel Admin</td>
                      <td>32234</td>
                      <td>Main Campus</td>
                      <td>june </td>
                      <td>2022</td>
                      <td>Sweeper</td>
                      <td>Lower Staff</td>
                      <td>500</td>
                      <td>500</td>
                      <td>
                        <span className="badge badge-success">Paid</span>
                      </td>
                    </tr>
                    <tr>
                      <td>2</td>
                      <td>Mitchel Admin</td>
                      <td>43324</td>
                      <td>Sub Campus</td>
                      <td>june</td>
                      <td>2022</td>
                      <td>Sweeper</td>
                      <td>Lower Staff</td>
                      <td>500</td>
                      <td>500</td>
                      <td>
                        <span className="badge badge-success">Paid</span>
                      </td>
                    </tr>
                    <tr>
                      <td>3</td>
                      <td>Mitchel Admin</td>
                      <td>36664</td>
                      <td>Main Campus</td>
                      <td>june</td>
                      <td>2022</td>
                      <td>Sweeper</td>
                      <td>Lower Staff</td>
                      <td>500</td>
                      <td>500</td>
                      <td>
                        <span className="badge badge-primary">Unpaid</span>
                      </td>
                    </tr>
                    <tr>
                      <td>4</td>
                      <td>Mitchel Admin</td>
                      <td>32134</td>
                      <td>Sub Campus</td>
                      <td>june</td>
                      <td>2022</td>
                      <td>Sweeper</td>
                      <td>Lower Staff</td>
                      <td>500</td>
                      <td>500</td>
                      <td>
                        <span className="badge badge-success">Paid</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Col>
          </Row>
        </CardBody>
      </Card>
    </Container>
  );
};

export default PayslipStatus;
