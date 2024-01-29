import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Col,
  Row,
} from "reactstrap";
import FormGroupInput from "../../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../../components/GeneralComponent/FormGroupSelect";

const Default = (props) => {

  const { SupportingTables: {DefaultData} } = useSelector(
    (state) => state.CrudFormReducer
  );

  const { partyDefaultDetails_ = [], setpartyDefaultDetails_ = () => {}, FormId } = props;

  useEffect(() => {
    setpartyDefaultDetails_({...partyDefaultDetails_, ...DefaultData?.[0]})
  }, [DefaultData?.[0]]);


  const handleAddChange = (e) => {
    setpartyDefaultDetails_({
      ...partyDefaultDetails_,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <Fragment>
      <Row>
        <Col lg="3" md="3" xs="12">
          <FormGroupSelect
            label="Customer Status"
            name="StatusID"
            value={partyDefaultDetails_?.StatusID}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupSelect
            label="Advance Account"
            name="AdvCoaID"
            value={partyDefaultDetails_?.AdvCoaID}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupSelect
            label="Terms Of Payment"
            name="PaymentModeID"
            value={partyDefaultDetails_?.PaymentModeID}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Due Days"
            name="DueDays"
            value={partyDefaultDetails_?.DueDays}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Credit Limits"
            name="CreditLimit"
            type="Number"
            value={partyDefaultDetails_?.CreditLimit}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupSelect
            label="Customer Business"
            name="BusinessTypeID"
            value={partyDefaultDetails_?.BusinessTypeID}
            onChange={handleAddChange}
            required
            form={FormId}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default Default;
