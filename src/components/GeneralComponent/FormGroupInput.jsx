import React from "react";
import { FormGroup, Input, Label } from "reactstrap";
import { number, bool, func, string, objectOf } from "prop-types";

const FormGroupInput = (props) => {
  let {
    label,
    type,
    name,
    value,
    onChange,
    disabled,
    required,
    maxLength,
    minLength,
    isNumber,
    isAlphabetic,
    isFloat,
    placeholder,
    onBlur,
    form,
    isIcon,
    iconClass,
    handleKeyDown,
  } = props;

  const handleChange = (e) => {
    if (e.target.getAttribute("isnumber") === "true") {
      e.target.value = e.target.value.replace(/\D/g, "");
    } else if (e.target.getAttribute("isalphabetic") === "true") {
      e.target.value = e.target.value.replace(/[^a-z ]/gi, "");
    } else if (e.target.getAttribute("isfloat") === "true") {
      e.target.value = e.target.value.replace(/[^0-9.]/g, "");
    }
    onChange(e);
  };

  const handleBlur = (e) => {
    e.preventDefault();
    e.target.value = e.target.value.trim();
    onChange(e);
    onBlur && onBlur();
  };
  return (
    <div className="form-group">
      {label && required ? (
        <Label>
          {label}
          <span className="text-danger">*</span>
        </Label>
      ) : (
        label && <Label>{label}</Label>
      )}
      {isIcon ? (
        <span className="input-icon">
          <i className={iconClass}></i>
        </span>
      ) : null}
      <Input
        onKeyDown={handleKeyDown}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value || ""}
        onChange={handleChange}
        disabled={disabled}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
        isnumber={isNumber}
        isalphabetic={isAlphabetic}
        isfloat={isFloat}
        onBlur={handleBlur}
        style={props.inputStyle}
        form={form}
      />
    </div>
  );
};

FormGroupInput.propTypes = {
  label: string,
  form: string,
  type: string,
  name: string,
  value: string,
  onChange: func,
  disabled: bool,
  required: bool,
  maxLength: string,
  minLength: string,
  isNumber: string,
  isAlphabetic: string,
  isFloat: string,
  placeholder: string,
  isIcon: bool,
  iconClass: string,
  handleKeyDown: func,
};

export default FormGroupInput;
