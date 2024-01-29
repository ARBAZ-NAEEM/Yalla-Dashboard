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
import FormGroupButton from "../../components/GeneralComponent/FormGroupButton";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import FormGroupTable from "../../components/GeneralComponent/FormGroupTable";

const initialValues = {
  group: "",
  email: "",
};
const searchValues = {
  group: "",
  email: "",
};

const EmailGroup = () => {
  const [modal, setModal] = useState(false);
  const [tooltip, setToolTip] = useState(false);
  const toggle = () => setModal(!modal);
  const [searchFields, setSearchFields] = useState({
    ...searchValues,
  });
  const [formFields, setFormFields] = useState({
    ...initialValues,
  });

  const handleSearchChange = (event) => {
    setSearchFields({
      ...searchFields,
      [event.target.name]: event.target.value,
    });
  };
  const handleInputChange = (event) => {
    setFormFields({
      ...formFields,
      [event.target.name]: event.target.value,
    });
  };
  const list = [
    { id: 1, name: "Vice Chancellor" },
    { id: 2, name: "Student" },
    { id: 3, name: "HOD" },
  ];

  const columns = [
    { field: "group", name: "Group" },
    { field: "email", name: "Email" },
  ];
  const rows = [
    { group: "Vice Chancellor", email: "salu@gmail.com" },
    { group: "Student", email: "salu@gmail.com" },
    { group: "HOD", email: "salu@gmail.com" },
  ];

  const onEdit = () => {};
  const onDelete = () => {};

  return (
    <Container fluid>
      <Card className="mt-3">
        <CardTitle>Search Email Group</CardTitle>
        <CardBody>
          <Row>
            {/* <Col lg="3" md="3" xs="12">
              <FormGroupSelect
                label="Group"
                name="group"
                list={list}
                fieldId="id"
                fieldName="name"
              />
            </Col> */}
            <Col lg="3" md="3" xs="12">
              <FormGroupInput
                label="Email"
                name="email"
                onChange={handleSearchChange}
                value={searchFields.email}
              />
            </Col>

            <Col lg="12" md="12" xs="12" className="text-right">
              <Button color="primary" className="btn">
                Search
              </Button>
              <Button className="btn" color="default">
                Cancel
              </Button>
            </Col>
          </Row>
        </CardBody>
      </Card>
      <Card>
        <CardTitle>
          <Row>
            <Col lg="6" md="3" xs="12">
              Email Group List
            </Col>
            <Col lg="6" md="3" xs="12" className="text-right">
              <FormGroupButton
                title="Add"
                onClick={toggle}
                id="add-btn"
                isOpen={tooltip}
                toggle={() => setToolTip(!tooltip)}
                showToolTip={false}
                toolTipTitle="Add"
                showIcon={true}
              ></FormGroupButton>
            </Col>
          </Row>
        </CardTitle>
        <CardBody>
          <Row>
            <Col>
              <FormGroupTable
                columns={columns}
                rows={rows}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      <Modal
        isOpen={modal}
        centered
        toggle={toggle}
        modalTransition={{ timeout: 10 }}
        backdrop="static"
      >
        <ModalHeader toggle={toggle}>Add/Edit Group</ModalHeader>
        <ModalBody>
          <Row>
            <Col lg="6" md="6" xs="12">
              <FormGroupSelect
                label="Group"
                name="group"
                list={list}
                fieldId="id"
                fieldName="name"
                value={formFields.group}
              />
            </Col>
            <Col lg="6" md="6" xs="12">
              <FormGroupInput
                label="Email"
                name="email"
                onChange={handleInputChange}
                value={formFields.email}
              />
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button color="primary">Save</Button>
          <Button color="default" onClick={toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </Container>
  );
};

export default EmailGroup;
