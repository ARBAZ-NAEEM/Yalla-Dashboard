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
  subject: "",
};

const Subject = () => {
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
    { field: "subject", name: "Subject" },
    { field: "faculties", name: "Faculties" }
  ];

  const rows = [
    {
      subject: "Archaelogy",
      faculties: "Physical Sciences",
    },
    {
      subject: "Computer Science",
      faculties: "IT",
    },
    {
      subject: "Teacher Education",
      faculties: "Education",
    },
    
  ];

  const subjectlist = [
    { id: 1, name: "Archaelogy" },
    { id: 2, name: "Computer Science" },
    { id: 3, name: "Teacher Education" },
  ];

  const facultieslist = [
    { id: 1, name: "Physical Sciences" },
    { id: 2, name: "IT" },
    { id: 3, name: "Education" },
  ];

  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Container fluid>
      <Card className='mt-3'>
        <CardTitle>Search Subject</CardTitle>
        <CardBody>
          <Row>
            <Col lg='3' md='3' xs='12'>
            <FormGroupSelect
            label="Subject"
            name="subject"
            list={subjectlist}
            fieldId="id"
            fieldName="name"
          />
             </Col>
             <Col lg='3' md='3' xs='12'>
            <FormGroupSelect
            label="Faculties"
            name="faculties"
            list={facultieslist}
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
              Subject List
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
        <ModalHeader toggle={toggle}>Add/Edit Subject</ModalHeader>
        <ModalBody>
          <Row>
          <Col lg='6' md='6' xs='12'>
          <FormGroupSelect
          label="Subject"
          name="subject"
          list={subjectlist}
          fieldId="id"
          fieldName="name"
        />
           </Col>
           <Col lg='6' md='6' xs='12'>
          <FormGroupSelect
          label="Faculties"
          name="faculties"
          list={facultieslist}
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

export default Subject;
