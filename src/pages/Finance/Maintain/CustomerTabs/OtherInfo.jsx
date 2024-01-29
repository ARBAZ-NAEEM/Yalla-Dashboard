import React, { Fragment } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Col,
  Row,
} from "reactstrap";
import FormGroupInput from "../../../../components/GeneralComponent/FormGroupInput";
import FormGroupCheckbox from "../../../../components/GeneralComponent/FormGroupCheckbox";

const OtherInfo = (props) => {

  const { FormFields, SupportingTables,  SupportingTables: {TaxData} } = useSelector(
    (state) => state.CrudFormReducer
  );

  const { partyTaxSection_ = [], setpartyTaxSection_ = () => {}, FormId } = props;

  useEffect(() => {
    setpartyTaxSection_({...partyTaxSection_, ...TaxData?.[0]})
  },[TaxData?.[0]]);
 
  const handleAddChange = (e) => {
    setpartyTaxSection_({
      ...partyTaxSection_,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Fragment>
      <Row>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Ntn :"
            name="NTN"
            maxLength={30}
            value={partyTaxSection_?.NTN}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="3" md="3" xs="12">
          <FormGroupInput
            label="Gst #:"
            name="GST"
            maxLength={30}
            value={partyTaxSection_?.GST}
            onChange={handleAddChange}
            form={FormId}
          />
        </Col>
        <Col lg="2" md="2" xs="12">
          <FormGroupCheckbox
            label="FILER"
            name="IsFiler"
            value={partyTaxSection_?.IsFiler}
            onChange={handleAddChange}
            
          />
        </Col>
        <Col lg="2" md="2" xs="12">
          <FormGroupCheckbox
            label="GST Exempted"
            name="IsGSTExempt"
            value={partyTaxSection_?.IsGSTExempt}
            onChange={handleAddChange}
          />
        </Col>
      </Row>
    </Fragment>
  );
};

export default OtherInfo;
