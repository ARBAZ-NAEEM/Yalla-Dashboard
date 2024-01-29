import React, { useRef } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Select } from "../../common/SetupMasterEnum";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";

import {
  SET_INITIAL_CRUD_FORM_STATE,
  SET_INITIAL_DROPDOWN_FORM_STATE,
} from "../../redux/actionType/CrudActionTypes";
import { ADM_PrintTestSlip } from "../../utils/Config";
import { useReactToPrint } from "react-to-print";
import FormGroupButton from "../../components/GeneralComponent/FormGroupButton";
import ReportPrintBulkAdmitSlip from "./Reports/ReportPrintBulkAdmitSlip";

const PrintBulkAdmitSlip = () => {
  const { TableList } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();
  const bulkPrintAdmitSlip = useRef();

  useEffect(() => {
    getBulkAdmitSlip();
  }, []);

  const getBulkAdmitSlip = () => {
    const payload = {
      OperationID: Select,
      // AdmRegID: 2,
      AdmRegID: 0,
    };
    ADM_PrintTestSlip(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data.Table,
          },
        });
        let data = { name: "BulkTestSlipRecord", value: res.data.Table };
        dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "ADMEntryTestId", name: "Test ID" },
    { field: "Name", name: "Name" },
    { field: "FatherName", name: "Father Name" },
    { field: "Cnic", name: "Cnic" },
    { field: "AppliedProgram", name: "Applied Program" },
    { field: "BlockName", name: "Block Name" },
  ];

  const handlePrintBulkAdmitSlip = useReactToPrint({
    content: () => bulkPrintAdmitSlip.current,
  });

  const customButton = (
    <>
      <FormGroupButton
        title="Print Bulk Admit Slip"
        onClick={handlePrintBulkAdmitSlip}
        disabled={TableList?.length > 0 ? false : true}
      ></FormGroupButton>
      <div style={{ display: "none" }}>
        <ReportPrintBulkAdmitSlip ref={bulkPrintAdmitSlip} />
      </div>
    </>
  );

  return (
    <CrudFormComponent
      formName="Print Bulk Admit Slip"
      customButton={customButton}
      hideAction={true}
      tableColumns={columns}
      tableRows={TableList}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default PrintBulkAdmitSlip;
