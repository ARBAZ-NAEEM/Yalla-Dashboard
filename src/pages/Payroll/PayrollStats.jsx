import React from "react";
import "chart.js/auto";
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Input,
  Row,
  Button,
} from "reactstrap";
import { Doughnut, Bar } from "react-chartjs-2";


const histogramChartData = {
  labels: ["Jan 2018", "Feb 2018", "March 2018", "April 2018"],
  datasets: [
    {
      label: "Working",
      backgroundColor: "rgba(0,166,181,1)",
      hoverBackgroundColor: "rgba(0,166,181,0.8)",
      data: [65, 59, 80, 81, 56, 55, 40]
    },

    {
      label: "Retired",
      backgroundColor: "rgba(178,31,0,1)",
      hoverBackgroundColor: "rgba(178,31,0,0.8)",
      data: [45, 79, 50, 41, 16, 85, 20]
    },
    {
      label: "Relieved",
      backgroundColor: "rgba(201,222,0,1)",
      hoverBackgroundColor: "rgba(201,222,0,0.8)",
      data: [45, 79, 50, 41, 16, 85, 20]
    }
  ]
};
const pieChartData = {
  labels: ["Regular", "Adhoc", "Fixed Pay", "TTS"],
  datasets: [
    {
      label: "Employee Breakdown",
      backgroundColor: ["#B21F00", "#C9DE00", "#2FDE00", "#00A6B4"],
      hoverBackgroundColor: ["#501800", "#4B5000", "#175000", "#003350"],
      data: [150, 40, 30, 30],
    },
  ],
  
};
const barChartHorizontalData = {
  labels: ["Management", "Account Services", "Account Planning", "HR & Faculty", "Production"],
  datasets: [
    {
      label: "Salary Breakdown",
      backgroundColor: "rgba(201,222,0,1)",
      data: [65, 59, 80, 81, 56],
    },
  ],
};
const barChartData = {
  labels: ["Jan 2020", "Feb 2020", "Mar 2020", "Apr 2020", "May 2020"],
  datasets: [
    {
      label: "Payroll Taxes",
      backgroundColor: "rgba(75,192,192,1)",
      data: [65, 59, 80, 81, 56],
    },
  ],
};
const PayrollStats = (props) => {
  const columns = [
    { field: "FamilyMemberName", name: "Family Member Name" },
    { field: "EligibleCard", name: "Eligible" },
    { field: "MedicalCardAmount", name: "Amount" },
  ];
  return (
    <Container fluid className="pt-2">
      <Row>
        <Col lg="3" md="4">
          <Card className="card-s2">
            <CardBody>
              <p className="card-number mb-0 pb-0">49</p>
              <p className="card-total mb-0">Active Employees</p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="4">
          <Card className="card-s4">
            <CardBody>
              <p className="card-number mb-0 pb-0">2</p>
              <p className="card-total mb-0">New Joining</p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="4">
          <Card className="card-s1">
            <CardBody>
              <p className="card-number mb-0 pb-0">3,55,55,555</p>
              <p className="card-total mb-0">Total Payroll</p>
            </CardBody>
          </Card>
        </Col>
        <Col lg="3" md="4">
          <Card className="card-s3">
            <CardBody>
              <p className="card-number mb-0 pb-0">5</p>
              <p className="card-total mb-0">Processed Payroll</p>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Row>
        <Col lg="6" md="6" sm="12" xs="12">
          <Card>
            <CardBody>
              <div className="charts-payroll">
                <Bar
                  data={histogramChartData}
                  
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6" sm="12" xs="12">
          <Card>
            <CardBody>
              <div className="charts-payroll">
                <Bar
                  data={barChartHorizontalData}
                  options={{
                    indexAxis: "y",
                  }}
                />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6" sm="12" xs="12">
          <Card>
            <CardBody>
              <div className="piechart-payroll">
                <Doughnut data={pieChartData} />
              </div>
            </CardBody>
          </Card>
        </Col>
        <Col lg="6" md="6" sm="12" xs="12">
          <Card>
            <CardBody>
              <div className="barchart-payroll">
                <Bar data={barChartData} />
              </div>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default PayrollStats;
