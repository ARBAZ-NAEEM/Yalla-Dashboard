import React, { useState, useEffect } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import { COMPANY_DETAILS, LOGINID } from "../utils/EncryptedConstants";
import { SessionStorage } from "../common/SetupMasterEnum";
import { decryptData } from "../EncryptData";
const LogoutModal = (props) => {
  const [modalState, setModalState] = useState(0);
  useEffect(() => {
    modalState !== 0 && sessionStorage.removeItem(LOGINID);
    setModalState(modalState + 1);
  }, [props.idleModal]);
  return (
    <>
      {
        <Modal
          centered
          // modalTransition={{ timeout: 10 }}
          isOpen={props.idleModal}
          // toggle={() => setIdleModal(false)}
        >
          <ModalHeader style={{ backgroundColor: "#e84b1e" }}>
            Session Expire Warning
          </ModalHeader>
          <ModalBody>Your Session is Expired</ModalBody>
          <ModalFooter>
            <Button
              color="info"
              onClick={(e) => props.signOut(e)}
              style={{
                backgroundColor: "#e84b1e",
                borderColor: "#e84b1e",
                color: "white",
              }}
            >
              Logout
            </Button>
          </ModalFooter>
        </Modal>
      }
    </>
  );
};

export default LogoutModal;
