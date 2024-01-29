import { bool, func, string } from "prop-types";
import React from "react";
import { FormGroup, Input, Label } from "reactstrap";

const FormGroupCheckbox = (props) => {
  let { padding = 10 } = props;
  const handleChange = (event) => {
    props.onChange({
      target: { name: event.target.name, value: event.target.checked },
    });
  };

  return (
    <FormGroup style={{ padding: padding }}>
      <div className="form-check-inline mt-3">
        <Label className="form-check-Label">
          <Input
            type="checkbox"
            className="form-check-Input"
            name={props.name}
            checked={props.value}
            onChange={handleChange}
            disabled={props.disabled}
          />
          {props.label}
        </Label>
      </div>
    </FormGroup>
  );
};

FormGroupCheckbox.propTypes = {
  onChange: func,
  name: string,
  value: bool,
  label: string,
  disabled: bool,
};

export default FormGroupCheckbox;
