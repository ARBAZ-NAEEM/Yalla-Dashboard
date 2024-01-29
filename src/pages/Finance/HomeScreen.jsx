import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  Col,
  Container,
  Row,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
} from "reactstrap";
import FormGroupButton from "../../components/GeneralComponent/FormGroupButton";
import FormGroupTable from "../../components/GeneralComponent/FormGroupTable";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";

const HomeScreen = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [modal1, setModal1] = useState(false);
  const toggle1 = () => setModal1(!modal1);

  return (
    <Container fluid>
      <Row>
        <Col lg={{ size: 6, offset: 3 }} md="6" xs="6">
          <Card className="mt-3 p-4">
            <CardBody>
              <Row>
                <Col lg="12" md="12" xs="12" className="text-center mb-2">
                  <Button
                    color="success"
                    className="btn btn-finance"
                    type="submit"
                    onClick={toggle}
                  >
                    Search
                  </Button>
                  <Button
                    color="success"
                    className="btn btn-finance"
                    type="submit"
                  >
                    Search
                  </Button>
                  <Button
                    color="success"
                    className="btn btn-finance"
                    type="submit"
                  >
                    Search
                  </Button>
                </Col>

                <Col lg="12" md="12" xs="12" className="text-center">
                  <Button
                    color="success"
                    className="btn btn-finance"
                    type="submit"
                  >
                    Search
                  </Button>
                  <Button
                    color="success"
                    className="btn btn-finance"
                    type="submit"
                  >
                    Search
                  </Button>
                  <Button
                    color="success"
                    className="btn btn-finance"
                    type="submit"
                  >
                    Search
                  </Button>
                </Col>
              </Row>
            </CardBody>
          </Card>
        </Col>
      </Row>

      <Modal isOpen={modal} toggle={toggle} centered>
        <ModalHeader>Finance</ModalHeader>
        <ModalBody className="p-4">
          <Row>
            <Col lg="12" md="12" xs="12" className="text-center">
              <Button
                color="success"
                className="btn btn-finance"
                type="submit"
                onClick={toggle1}
              >
                Pay
              </Button>
              <Button color="success" className="btn btn-finance" type="submit">
                Receive
              </Button>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Save
          </Button>{" "}
          <Button color="default" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>

      <Modal isOpen={modal1} toggle={toggle1} centered size="lg">
        <ModalHeader>Finance</ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="4" md="4" xs="12">
              <FormGroupSelect label="Title" />
            </Col>
            <Col lg="4" md="4" xs="12">
              <FormGroupInput label="Date" />
            </Col>
          </Row>

          <Row>
            <Col lg="12" md="12" xs="12" className="text-right">
              <Button color="primary">Save</Button>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg="12" md="12" xs="12">
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Dummmy</td>
                    <td style={{ width: "20%" }} className="text-center">
                      <button
                        className="btnic btn btn-primary btn-sm"
                        size="sm"
                      >
                        <i class="fa fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg="12" md="12" xs="12">
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>Text</th>
                    <th></th>
                    <th></th>
                    <th style={{ width: "20%" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ width: "25%" }}>
                      <FormGroupSelect />
                    </td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                      <button className="btnic btn btn-primary btn-sm">
                        <i class="fa fa-pencil-square-o"></i>
                      </button>
                      <button className="btn btn-danger btnic">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroupSelect />
                    </td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                      <button className="btnic btn btn-primary btn-sm">
                        <i class="fa fa-pencil-square-o"></i>
                      </button>
                      <button className="btn btn-danger btnic">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroupSelect />
                    </td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                      <button className="btnic btn btn-primary btn-sm">
                        <i class="fa fa-pencil-square-o"></i>
                      </button>
                      <button className="btn btn-danger btnic">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg="12" md="12" xs="12">
              <Table bordered>
                <tbody>
                  <tr>
                    <td>Tax</td>
                    <td style={{ width: "20%" }} className="text-center">
                      <button className="btnic btn btn-primary btn-sm">
                        <i class="fa fa-plus"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg="12" md="12" xs="12">
              <Table bordered striped>
                <thead>
                  <tr>
                    <th>Text</th>
                    <th></th>
                    <th></th>
                    <th style={{ width: "20%" }} className="text-center">
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td style={{ width: "25%" }}>
                      <FormGroupSelect />
                    </td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                      <button className="btnic btn btn-primary btn-sm">
                        <i class="fa fa-pencil-square-o"></i>
                      </button>
                      <button className="btnic btn btn-danger">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroupSelect />
                    </td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                      <button className="btnic btn btn-primary btn-sm">
                        <i class="fa fa-pencil-square-o"></i>
                      </button>
                      <button className="btnic btn btn-danger">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <FormGroupSelect />
                    </td>
                    <td></td>
                    <td></td>
                    <td className="text-center">
                      <button className="btnic btn btn-primary btn-sm">
                        <i class="fa fa-pencil-square-o"></i>
                      </button>
                      <button className="btnic btn btn-danger">
                        <i class="fa fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Save</Button>{" "}
          <Button color="default" onClick={toggle1}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default HomeScreen;
