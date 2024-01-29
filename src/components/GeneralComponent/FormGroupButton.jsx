import React from "react";
import { Button, Spinner, Tooltip } from "reactstrap";
import { bool, func, string } from "prop-types";
import { decryptData } from "../../EncryptData";
import { COMPANY_DETAILS } from "../../utils/EncryptedConstants";
import { SessionStorage } from "../../common/SetupMasterEnum";

const FormGroupButton = (props) => {
  let {
    loading,
    color,
    type,
    onClick,
    title,
    disabled,
    id,
    isOpen,
    toggle,
    toolTipTitle,
    showToolTip,
    showIcon,
  } = props;
  return props.hide === true ? null : (
    <div className="form-group">
      <Button
           style={{backgroundColor:"#076030" ,
                                borderColor:"#076030"}}
        type={type}
        color={color ? color : "primary"}
        size="sm"
        onClick={onClick}
        disabled={loading || disabled}
        id={id}
      >
        {loading === true && (
          <Spinner
            size="sm"
            animation="border"
            variant="light"
            style={{ marginRight: 10 }}
          />
        )}
        {title}
        {showIcon === true ? (
          
          <i className="fa fa-ticket" style={{ paddingLeft: "5px" }}></i>
        ) : (
          ""
        )}
        {showToolTip === true ? (
          <Tooltip isOpen={isOpen} target={id} toggle={toggle}>
            {toolTipTitle}
          </Tooltip>
        ) : (
          ""
        )}
      </Button>
    </div>
  );
};

FormGroupButton.propTypes = {
  onClick: func,
  color: string,
  title: string,
  loading: bool,
  disabled: bool,
  type: string,
  id: string,
  isOpen: bool,
  toggle: func,
  toolTipTitle: string,
  showToolTip: bool,
  showIcon: bool,
};

export default FormGroupButton;
