//SetipSections For Class

//Setup CLass Location

import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col } from "reactstrap";
import {
  Delete,
  Search,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import {
  CustomErrorMessage,
  CustomSuccessAlert,
  DeleteWithConfirmation,
} from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import { decryptData } from "../../EncryptData";
import {
  apiErrorChecker,
  getUserIPInfo,
} from "../../functions/generalFunctions";

import {
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_ALL_CRUD_FROM_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import { Acad_SetupTimeSlots } from "../../utils/Config";
import { tConvert } from "../../functions/DateFormatFunction";

const initialSearchFields = {
  OperationId: Search,
  SetupTimeSlotID: 0,
  Slot: "",
  IsActive: true,
  startTime: null,
  endTime: null,
};
const initialFormFields = {
  OperationId: 0,
  SetupTimeSlotID: 0,
  Slot: "",
  IsActive: true,
  startTime: null,
  endTime: null,
};

const TimeSlot = () => {
  const { SearchFields, FormFields, TableList } = useSelector(
    (state) => state.CrudFormReducer
  );
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    getTimeSlot();
  }, []);

  const getTimeSlot = () => {
    const payload = {
      ...initialSearchFields,
      ...getUserIPInfo(),
    };
    Acad_SetupTimeSlots(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((item) => ({
              ...item,
              SlotTaken: `${item.Slotname} ${tConvert(item.StartTime)} ${tConvert(item.EndTime)}`,
              // StartTimeTaken: tConvert(item.StartTime),
              // EndTimeTaken: tConvert(item.EndTime),
            })),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "SlotTaken", name: "Slot" },
    // { field: "StartTimeTaken", name: "Start Time" },
    // { field: "EndTimeTaken", name: "End Time" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Slot"
          name="Slot"
          maxLength="150"
          required
          onChange={handleSearchChange}
          value={SearchFields?.Slot}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          onChange={handleSearchChange}
          value={SearchFields?.IsActive}
        />
      </Col>
    </Fragment>
  );

  const submitSearch = () => {
    const payload = {
      ...SearchFields,
      OperationID: Search,
      SetupTimeSlotID: 0,
      ...getUserIPInfo(),
    };
    Acad_SetupTimeSlots(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table?.map((item) => ({
              ...item,
              SlotTaken: `${item.Slotname} ${tConvert(item.StartTime)} ${tConvert(item.EndTime)}`,
              // StartTimeTaken: tConvert(item.StartTime),
              // EndTimeTaken: tConvert(item.EndTime),
            })),
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitForm = (id) => {
    if (Date.parse(FormFields?.startTime) > Date.parse(FormFields?.endTime)) {
      alert("Start Time should be smaller than End Time");
      return;
    }
    const payload = {
      ...FormFields,
      OperationId: id,
      ...getUserIPInfo(),
    };
    Acad_SetupTimeSlots(payload)
      .then((res) => {
        const { err, msg } = apiErrorChecker(res);
        if (err) {
          CustomErrorMessage(msg);
          return;
        }
        CustomSuccessAlert(msg);
        getTimeSlot();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    let data = {
      SetupTimeSlotID: obj?.SetupTimeSlotID,
      Slot: obj?.Slotname,
      startTime: obj?.StartTime,
      endTime: obj?.EndTime,
      IsActive: obj?.IsActive,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        let data = {
          OperationId: Delete,
          SetupTimeSlotID: obj?.SetupTimeSlotID,
          Slot: "",
          IsActive: false,
          ...getUserIPInfo(),
        };
        Acad_SetupTimeSlots(data)
          .then((res) => {
            const { err, msg } = apiErrorChecker(res);
            if (err) {
              CustomErrorMessage(msg);
              return;
            }
            CustomSuccessAlert(msg);
            getTimeSlot();
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const cancelSearch = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialSearchFields,
    });
    getTimeSlot();
  };

  const handleCancel = () => {
    dispatch({
      type: RESET_FORM_FIELDS,
      payload: initialFormFields,
    });
  };

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Slot Name"
          name="Slot"
          required
          onChange={handleAddChange}
          value={FormFields?.Slot}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Start Time"
          name="startTime"
          required
          type="time"
          onChange={handleAddChange}
          value={FormFields?.startTime}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="End Time"
          name="endTime"
          required
          type="time"
          onChange={handleAddChange}
          value={FormFields?.endTime}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label=" Is Active"
          name="IsActive"
          onChange={handleAddChange}
          value={FormFields?.IsActive}
        />
      </Col>
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Time Slot"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      cancelSearch={cancelSearch}
      handleCancel={handleCancel}
    />
  );
};

export default TimeSlot;
