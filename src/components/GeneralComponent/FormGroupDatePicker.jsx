import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const FormGroupDatePicker = (props) => {
  let { type = "date" } = props;
  const handleChange = (e) => {
    let data = { target: { name: e.target.name, value: e.target.value } };
    props.onChange(data);
  };

  return (
    <div className="form-group">
      {props.label && props.required ? (
        <Label>
          {props.label}
          <span className="text-danger">*</span>
        </Label>
      ) : (
        props.label && <Label>{props.label}</Label>
      )}
      <Input
        type={type}
        // pattern="\d{4}-\d{2}-\d{2}"
        // type='datetime'
        className="form-control"
        name={props.name}
        value={props.value}
        onChange={handleChange}
        required={props.required}
        disabled={props.disabled}
        min={props.min}
        max={props.max}
        form={props.form}
      />
    </div>
  );
};

export default FormGroupDatePicker;
