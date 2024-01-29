import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Col,
  Container,
  Progress,
  Row,
  FormGroup,
  Input,
  Label,
  Modal,
  ModalBody,
  ModalHeader,
  ModalFooter,
} from "reactstrap";

import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupTable from "../../components/GeneralComponent/FormGroupTable";

const initialValues = {
  cadre: "",
  employeeType: "",
};

const Cadre = () => {
  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

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
    { field: "cadre", name: "Cadre" },
    { field: "employeeType", name: "Employee Type" },
  ];
  const rows = [
    {
      cadre: "General",
      employeeType: "Admin",
    },
    {
      cadre: "Technical",
      employeeType: "Admin",
    },
  ];
  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Container fluid>
      <Card className='mt-3'>
        <CardTitle>Search Cadre</CardTitle>
        <CardBody>
            <Row>
              <Col lg='3' md='3' xs='12'>
                <FormGroupInput label='Cadre' name='cadre' onChange={handleInputChange} value={formFields.cadre} />
              </Col>

              <Col lg='3' md='3' xs='12'>
                <FormGroupInput label='Employee Type' name='employeeType' onChange={handleInputChange} value={formFields.employeeType} />
              </Col>

              <Col lg='12' md='12' xs='12' className='text-right'>
                <Button color='primary' className='btn'>
                  Search
                </Button>
                <Button className='btn' color='default'>
                  Cancel
                </Button>
              </Col>
            </Row>
        </CardBody>
      </Card>
      <Card>
        <CardTitle>
          <Row>
            <Col lg='6' md='3' xs='12'>
              Cadre List
            </Col>
            <Col lg='6' md='3' xs='12' className='text-right'>
              <Button color='primary' className='btn' onClick={toggle}>
                Add <i className='fa fa-plus'></i>
              </Button>
            </Col>
          </Row>
        </CardTitle>
        <CardBody>
            <Row>
              <Col>
                <FormGroupTable columns={columns} rows={rows} onEdit={onEdit} onDelete={onDelete} />
              </Col>
            </Row>
        </CardBody>
      </Card>

      <Modal isOpen={modal} centered toggle={toggle} modalTransition={{ timeout: 10 }}>
        <ModalHeader toggle={toggle}>Add/Edit Cadre</ModalHeader>
        <ModalBody>
          <Row>
            <Col lg='6' md='6' xs='12'>
              <FormGroupInput label='Cadre' name='cadre' onChange={handleInputChange} value={formFields.cadre} />
            </Col>
            <Col lg='6' md='6' xs='12'>
              <FormGroupInput label='Employee Type' name='employeetype' onChange={handleInputChange} value={formFields.employeetype} />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary'>Save</Button>
          <Button color='default' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default Cadre;
