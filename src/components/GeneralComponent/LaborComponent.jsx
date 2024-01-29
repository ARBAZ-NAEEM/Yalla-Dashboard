import React, { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  Col,
  Container,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Doughnut, Pie } from "react-chartjs-2";
import DatePicker from "react-datepicker";
import { LABOR_WALFARE } from "../../utils/UrlConstants";
import { GetRequest } from "../../utils/Config";
import { SET_INITIAL_CRUD_FORM_STATE } from "../../redux/actionType/CrudActionTypes";
import { useDispatch, useSelector } from "react-redux";

const LaborComponent = () => {
  const { TableList } = useSelector((state) => state.CrudFormReducer);

  const [selectedDate, setSelectedDate] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    getLaborWalfare();
    console.log(TableList);
  }, []);

  const getLaborWalfare = () => {
    GetRequest(LABOR_WALFARE)
      .then((res) => {
        console.log(res?.data?.results?.num_of_users_no_complains);
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.results,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  ChartJS.register(ArcElement, Tooltip, Legend);
  const data = {
    labels: ["No complaints ", "complaints"],
    datasets: [
      {
        label: "My First Dataset",
        data: [
          TableList?.num_of_users_no_complains,
          TableList?.num_of_users_complains,
        ],
        backgroundColor: ["#e84b1e ", "limegreen"],
        hoverOffset: 4,
      },
    ],
  };

  const CustomInput = React.forwardRef(({ value, onClick }, ref) => (
    <input
      type="text"
      value={value}
      onClick={onClick}
      // onChange={(e) => {}}
      placeholder="Day-Month-Year"
      ref={ref}
    />
  ));

  //   const options = {
  //     maintainAspectRatio: false, // Set to false to allow specifying height and width
  //     height: 1200, // Set your desired height here
  //     width: 1200, // Set your desired width here
  //   };

  return (
    <>
      <section className="labour-welfare">
        <Container>
          <Card>
            <CardBody>
              <Row>
                <Col md="12">
                  <div className="form-group select-date-range">
                    <label htmlFor="">Select Date :</label> <br />
                    <DatePicker
                      showIcon
                      selected={selectedDate}
                      onChange={(date) => setSelectedDate(date)}
                      customInput={<CustomInput />}
                      showYearDropdown
                      scrollableYearDropdown
                      dateFormat="MM-d-yyyy"
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <Col md="6">
                  <div className="count-section">
                    <Card>
                      {" "}
                      <h6 className="nocomplaints-count">
                        <span>
                          No Compliants: #{" "}
                          {TableList?.num_of_users_no_complains}
                        </span>{" "}
                      </h6>
                    </Card>
                    <Card>
                      {" "}
                      <h6 className="complaints-count">
                        <span>
                          Complaints: # {TableList?.num_of_users_complains}{" "}
                        </span>
                      </h6>
                    </Card>
                  </div>{" "}
                </Col>{" "}
                <Col md="6">
                  <div className="chart-section">
                    <Pie data={data} />
                  </div>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Container>
      </section>
    </>
  );
};

export default LaborComponent;
