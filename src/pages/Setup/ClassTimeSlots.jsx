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
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";

const initialValues = {
  cassTimeSlots: "",
};

const ClassTimeSlots = () => {
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
    { field: "classtimeslots", name: "Class Time Slots" },
    { field: "programtypes", name: "Courses" },
  ];

  const rows = [
    {
      classtimeslots: "9AM - 12PM",
      programtypes:"Morning",
    },
    {
      classtimeslots: "10AM - 01PM",
      programtypes:"Evening",
    },
    {
      classtimeslots: "11AM - 02PM",
      programtypes:"Morning",
    },
  ];

  const classtimeslotslist = [
    { id: 1, name: "9AM - 12PM" },
    { id: 2, name: "10AM - 01PM" },
    { id: 3, name: "11AM - 02PM" },
  ];

  const programtypeslist = [
    { id: 1, name: "Morning" },
    { id: 1, name: "Evening" },
  ];


  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Container fluid>
      <Card className='mt-3'>
        <CardTitle>Search Class Time Slots</CardTitle>
        <CardBody>
          <Row>
          <Col lg='3' md='3' xs='12'>
          <FormGroupSelect
          label="Class Time Slots"
          name="classtimeslots"
          list={classtimeslotslist}
          fieldId="id"
          fieldName="name"
        />
           </Col>
           <Col lg='3' md='3' xs='12'>
          <FormGroupSelect
          label="Program Types"
          name="programtypes"
          list={programtypeslist}
          fieldId="id"
          fieldName="name"
        />
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
              Class Time Slots List
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

      <Modal isOpen={modal} centered toggle={toggle} modalTransition={{ timeout: 10 }} data-backdrop="static" data-keyboard="false" >
        <ModalHeader toggle={toggle}>Add/Edit Class Time Slots</ModalHeader>
        <ModalBody>
          <Row>
          <Col lg='6' md='6' xs='12'>
          <FormGroupSelect
          label="Class Time Slots"
          name="classtimeslots"
          list={classtimeslotslist}
          fieldId="id"
          fieldName="name"
        />
           </Col>
           <Col lg='6' md='6' xs='12'>
          <FormGroupSelect
          label="Program Types"
          name="programtypes"
          list={programtypeslist}
          fieldId="id"
          fieldName="name"
        />
           </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color='primary' >Save</Button>
          <Button color='default' onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default ClassTimeSlots;
