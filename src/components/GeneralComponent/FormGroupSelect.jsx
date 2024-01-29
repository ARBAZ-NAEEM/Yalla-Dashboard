import React, { Fragment } from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { array, bool, func, number, string } from "prop-types";

const FormGroupSelect = (props) => {
  const handleChange = (e) => {
    props.onChange({
      target: {
        name: props.name,
        value: props.intString ? e.target.value : parseInt(e.target.value),
        selectedValue: e.target.options[e.target.selectedIndex].text,
        selectedName: props.nameValue,
        newfield: e.target.selectedOptions[0]?.getAttribute("newfield"),
        subfield: e.target.selectedOptions[0]?.getAttribute("subfield"),
      },
    });
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
        id={props.id}
        name={props.name}
        type="select"
        value={props?.value?.toString()}
        onChange={handleChange}
        disabled={props.disabled}
        required={props.required}
        form={props.form}
        newfield={props.newfield}
        subfield={props.subfield}
        style={props.style}
      >
        <option key="abc" value={props.required ? "" : 0}>
          Select
        </option>
        {props?.list &&
          props?.list?.length &&
          props.list.map((item, index) => (
            <option
              key={index}
              value={item[props.fieldId]}
              newfield={item[props.newfield]}
              subfield={item[props.subfield]}
            >
              {item[props.fieldName]}
            </option>
          ))}
      </Input>
    </div>
  );
};

FormGroupSelect.propTypes = {
  label: string,
  id: number,
  name: string,
  value: string,
  onChange: func,
  disabled: bool,
  required: bool,
  list: array,
  fieldId: string,
  fieldName: string,
  form: string,
  intString: string,
};

export default FormGroupSelect;
