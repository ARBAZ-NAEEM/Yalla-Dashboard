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
  courseNumber: "",
};

const CourseNumber = () => {
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
    { field: "coursenumber", name: "Course Number" },
    { field: "courses", name: "Courses" },
    { field: "subjects", name: "Subjects" }
  ];
  const rows = [
    {
     coursenumber: "ENG-202",
      courses:"Archaelogy",
      subjects:"English",
    },
    {
     coursenumber: "ENG-202",
      courses:"Teacher Education",
      subjects:"Physics",
    },
    {
     coursenumber: "Maths-203",
      courses:"Archaelogy",
      subjects:"Maths",
    },
  ];


  const coursenumberlist = [
    { id: 1, name: "ENG-202" },
    { id: 2, name: "Maths-203" },
    { id: 3, name: "Physics-205" },
  ];

  const courseslist = [
    { id: 1, name: "Archaelogy" },
    { id: 2, name: "Computer Science" },
    { id: 3, name: "Teacher Education" },
  ];
  
  const subjectlist = [
    { id: 1, name: "English" },
    { id: 2, name: "Physics" },
    { id: 3, name: "Maths" },
  ];
  

  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Container fluid>
      <Card className='mt-3'>
        <CardTitle>Search Course Number</CardTitle>
        <CardBody>
          <Row>
          <Col lg='3' md='3' xs='12'>
          <FormGroupSelect
          label="Course Number"
          name="coursenumber"
          list={coursenumberlist}
          fieldId="id"
          fieldName="name"
        />
           </Col>
           <Col lg='3' md='3' xs='12'>
          <FormGroupSelect
          label="Courses"
          name="courses"
          list={courseslist}
          fieldId="id"
          fieldName="name"
        />
           </Col>
           <Col lg='3' md='3' xs='12'>
           <FormGroupSelect
           label="Subject"
           name="subject"
           list={subjectlist}
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
              Course Number List
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
        <ModalHeader toggle={toggle}>Add/Edit Course Number</ModalHeader>
        <ModalBody>
          <Row>
          <Col lg='6' md='6' xs='12'>
          <FormGroupSelect
          label="Course Number"
          name="coursenumber"
          list={coursenumberlist}
          fieldId="id"
          fieldName="name"
        />
           </Col>
           <Col lg='6' md='6' xs='12'>
          <FormGroupSelect
          label="Courses"
          name="courses"
          list={courseslist}
          fieldId="id"
          fieldName="name"
        />
           </Col>
           <Col lg='6' md='6' xs='12'>
           <FormGroupSelect
           label="Subject"
           name="subject"
           list={subjectlist}
           fieldId="id"
           fieldName="name"
         />
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

export default CourseNumber;
