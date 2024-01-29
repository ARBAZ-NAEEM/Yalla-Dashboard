import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import FormGroupCheckbox from "../../components/GeneralComponent/FormGroupCheckbox";
import {
  Delete,
  eCheckedFeatureList,
  featureList,
  Search,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  SecuritySetup_GetApplications,
  Setup_MenuItem_Operation,
} from "../../utils/Config";

import {
  DeleteAlert,
  DeleteWithConfirmation,
  SomeThingWentWrong,
} from "../../components/Alert";
import { decryptData } from "../../EncryptData";
import { CustomSuccessAlert } from "../../components/Alert";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSearchFields = { ApplicationID: 0, MenuName: "", IsActive: false };
const initialFormFields = {
  MenuName: "",
  MenuId: 0,
  MenuURL: "",
  ParentID: "",
  SortOrder: "",
  ApplicationID: 0,
  IsDisplayInMenu: false,
  IsActive: false,
  ModifiedBy: 0,
  FeatureList: "",
  // FeatureList: [],
};

const initialSelectionList = {
  ApplicationID: [],
};

const initialFeatureList = {
  Features: "",
};

const Menu = () => {
  const {
    SearchFields,
    FormFields,
    TableLoading,
    FormLoading,
    SupportingTables,
    TableList,
  } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const [selectionList, setSelectionList] = useState(initialSelectionList);
  const [allFeatureList, setAllFeatureList] = useState(initialFeatureList);
  const [featureMapData, setFeatureMapData] = useState([]);
  const [checkedFeatureList, setCheckedFeatureList] = useState([]);

  useEffect(() => {
    getRoles();
    getApplicationName();
    getFeatures();
    // getCheckedFeatures();
  }, []);

  function getRoles() {
    const payload = {
      operationId: Select,
      // applicationId: applicationId,
    };

    Setup_MenuItem_Operation(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getApplicationName() {
    const data = {
      UserId: decryptData(LOGINID, SessionStorage),
    };
    SecuritySetup_GetApplications(data)
      .then((res) => {
        setSelectionList({
          ...selectionList,
          ApplicationID: res?.data?.Table,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function getFeatures() {
    const payload = {
      operationId: featureList,
    };

    Setup_MenuItem_Operation(payload)
      .then((res) => {
        setFeatureMapData(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  const columns = [
    { field: "MenuName", name: "Menu Name" },
    { field: "MenuURL", name: "Menu URL" },
    { field: "CreatedBy", name: "Created By" },
    { field: "CreatedDate", name: "Created Date" },
    { field: "ModifiedBy", name: "Modified By" },
    { field: "ModifiedDate", name: "Modified Date" },
    // { field: "IsDisplayInMenu", name: "Is Display In Menu" },
    // { field: "IsActive", name: "Is Active" },
  ];

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleAddChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_FROM_FIELDS, payload: data });
  };

  const handleInputFeatureChange = (e, index) => {
    if (checkedFeatureList.length > 0) {
      checkedFeatureList[index].Checked = e.target.value;
      setCheckedFeatureList([...checkedFeatureList]);
      const feature_ID = checkedFeatureList
        .filter((item) => item.Checked == 1)
        .map((data) => data.FeatureId)
        .join(",");

      setAllFeatureList({
        ...allFeatureList,
        Features: feature_ID,
      });
    } else {
      featureMapData[index].Checked = e.target.value;
      setFeatureMapData([...featureMapData]);
      const feature_ID = featureMapData
        .filter((item) => item.Checked == 1)
        .map((data) => data.FeatureId)
        .join(",");
      setAllFeatureList({
        ...allFeatureList,
        Features: feature_ID,
      });
    }
  };

  const handleCancel = () => {
    setAllFeatureList(initialFeatureList);
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    let mapData = featureMapData.map((x) => ({ ...x, Checked: false }));
    setFeatureMapData([...mapData]);
    setCheckedFeatureList([]);
  };

  const submitSearch = () => {
    const payload = {
      operationId: Search,
      applicationId: SearchFields?.ApplicationID,
      menuName: SearchFields?.MenuName,
      IsActive: SearchFields?.IsActive,
    };

    Setup_MenuItem_Operation(payload)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res.data,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        setAllFeatureList(initialFeatureList);
        let mapData = featureMapData.map((x) => ({ ...x, Checked: false }));
        setFeatureMapData([...mapData]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const cancelSearch = () => {
    getRoles();
  };

  const submitForm = (id) => {
    const payload = {
      ...FormFields,
      operationId: id,
      FeatureList: allFeatureList.Features,
      createdBy: decryptData(LOGINID, SessionStorage),
    };

    Setup_MenuItem_Operation(payload)
      .then((res) => {
        if (res?.data?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.[0]?.Message);
          dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
          setAllFeatureList(initialFeatureList);
          let mapData = featureMapData.map((x) => ({ ...x, Checked: false }));
          setFeatureMapData([...mapData]);
          setCheckedFeatureList([]);
          getRoles();
        } else {
          SomeThingWentWrong();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    const payload = {
      operationId: eCheckedFeatureList,
      MenuId: obj.MenuId,
    };

    Setup_MenuItem_Operation(payload)
      .then((res) => {
        setCheckedFeatureList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
    let data = {
      MenuName: obj.MenuName,
      MenuId: obj.MenuId,
      MenuURL: obj.MenuURL,
      ParentID: obj.ParentID,
      SortOrder: obj.SortOrder,
      ApplicationID: obj.ApplicationId,
      IsDisplayInMenu: obj.IsDisplayInMenu,
      IsActive: obj.IsActive,
      ModifiedBy: decryptData(LOGINID, SessionStorage),
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          operationId: Delete,
          ApplicationId: obj.ApplicationId,
          MenuId: obj.MenuId,
          MenuName: obj.MenuName,
          FeatureList: allFeatureList.Features,
          MenuURL: obj.MenuURL,
          ParentId: obj.ParentId,
          SubNode: obj.SubNode,
          IsDisplayInMenu: obj.IsDisplayInMenu,
          IsActive: obj.IsActive,
          SortOrder: obj.SortOrder,
          CreatedBy: 0,
          ModifiedBy: decryptData(LOGINID, SessionStorage),
          UserIP: obj.UserIP,
          CreatedDate: obj.CreatedDate,
          ModifiedDate: obj.ModifiedDate,
          SerialNo: obj.SerialNo,
        };

        Setup_MenuItem_Operation(payload)
          .then((res) => {
            if (res.data[0].HasError === 0) {
              DeleteAlert();
              getRoles();
            } else {
              SomeThingWentWrong();
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    });
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          label="Application ID"
          name="ApplicationID"
          fieldId="ApplicationId"
          fieldName="ApplicationName"
          list={selectionList.ApplicationID}
          onChange={handleSearchChange}
          value={SearchFields?.ApplicationID}
        ></FormGroupSelect>
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupInput
          label="Menu Name"
          name="MenuName"
          onChange={handleSearchChange}
          value={SearchFields?.MenuName}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="is Active"
          name="IsActive"
          onChange={handleSearchChange}
          value={SearchFields?.IsActive}
        />
      </Col>
    </Fragment>
  );

  const formPanel = (
    <Fragment>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Menu Name"
          name="MenuName"
          onChange={handleAddChange}
          value={FormFields?.MenuName}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Menu URL"
          name="MenuURL"
          onChange={handleAddChange}
          value={FormFields?.MenuURL}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Parent ID"
          isNumber="true"
          name="ParentID"
          onChange={handleAddChange}
          value={FormFields?.ParentID}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Sort Order"
          isNumber="true"
          name="SortOrder"
          onChange={handleAddChange}
          value={FormFields?.SortOrder}
        />
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupSelect
          label="Application ID"
          name="ApplicationID"
          fieldId="ApplicationId"
          fieldName="ApplicationName"
          list={selectionList?.ApplicationID}
          onChange={handleAddChange}
          value={FormFields?.ApplicationID}
        ></FormGroupSelect>
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Display"
          name="IsDisplayInMenu"
          onChange={handleAddChange}
          value={FormFields?.IsDisplayInMenu}
        />
      </Col>
      <Col lg="3" md="3" xs="12">
        <FormGroupCheckbox
          label="Is Active"
          name="IsActive"
          onChange={handleAddChange}
          value={FormFields?.IsActive}
        />
      </Col>
      {checkedFeatureList?.length > 0 ? (
        <Row>
          {checkedFeatureList?.map((data, index) => {
            return (
              <Col lg="3" md="3" xs="12">
                <FormGroupCheckbox
                  label={data.Feature}
                  name="FeatureList"
                  onChange={(e) => handleInputFeatureChange(e, index)}
                  value={data.Checked}
                  padding={0}
                />
              </Col>
            );
          })}
        </Row>
      ) : (
        <Row>
          {featureMapData?.map((data, index) => {
            return (
              <Col lg="3" md="3" xs="12">
                <FormGroupCheckbox
                  label={data.Feature}
                  name="FeatureList"
                  onChange={(e) => handleInputFeatureChange(e, index)}
                  value={data.Checked}
                  padding={0}
                />
              </Col>
            );
          })}
        </Row>
      )}
    </Fragment>
  );
  return (
    <CrudFormComponent
      formName="Menu"
      buttonName="Add"
      tableColumns={columns}
      tableRows={TableList}
      formPanel={formPanel}
      searchPanel={searchPanel}
      formSubmit={submitForm}
      searchSubmit={submitSearch}
      onEdit={onEditRow}
      onDelete={onDeleteRow}
      cancelSearch={cancelSearch}
      initialFormFields={initialFormFields}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
      handleCancel={handleCancel}
    />
  );
};

export default Menu;
