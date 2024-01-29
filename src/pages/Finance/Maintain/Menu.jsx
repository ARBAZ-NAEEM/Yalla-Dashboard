import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Row } from "reactstrap";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupInput from "../../../components/GeneralComponent/FormGroupInput";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import FormGroupCheckbox from "../../../components/GeneralComponent/FormGroupCheckbox";
import {
  Delete,
  eCheckedFeatureList,
  featureList,
  Insert,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";

import {
  SET_ALL_CRUD_FROM_FIELDS,
  SET_INITIAL_CRUD_FORM_STATE,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
} from "../../../redux/actionType/CrudActionTypes";
import { PostRequest, Setup_MenuItem_Operation } from "../../../utils/Config";

import {
  CustomErrorMessage,
  DeleteAlert,
  DeleteWithConfirmation,
  SomeThingWentWrong,
} from "../../../components/Alert";
import { decryptData } from "../../../EncryptData";
import { CustomSuccessAlert } from "../../../components/Alert";
import { COMPANY, SETUPMENUITEM_OPERATIONS } from "../../../utils/UrlConstants";
import {
  COMPANY_ID,
  LOGINID,
  UserNetworkInfo,
} from "../../../utils/EncryptedConstants";

const initialSelectionList = {
  CompanyID: [],
};

const initialFeatureList = {
  Features: "",
};

const Menu = () => {
  const initialCompanyList = {
    OperationID: Select,
    CompanyID: decryptData(COMPANY_ID, SessionStorage),
    ParentCompanyID: 0,
    Company: "",
    IsParent: true,
    Address: "",
    Icon: "",
    Header: "",
    Footer: "",
    Phone1: "",
    Phone2: "",
    RepresentativePhone: "",
    Ntn: "",
    Stn: "",
    IsActive: true,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
  };
  const intialFormtbL_TYPE_MenuItemFeatureMapping_ = {
    featureid: 0,
    menuitemid: 0,
    isActive: true,
  };

  const [
    formTbL_TYPE_MenuItemFeatureMapping_,
    setFormTbL_TYPE_MenuItemFeatureMapping_,
  ] = useState(intialFormtbL_TYPE_MenuItemFeatureMapping_);

  const initialSearchFields = {
    OperationId: Select,
    FeatureList: "",
    MenuId: 0,
    MenuName: "",
    MenuURL: "",
    ParentId: "0",
    CompanyId: decryptData(COMPANY_ID, SessionStorage),
    IconClass: "",
    SubNode: "",
    IsDisplayInMenu: true,
    IsActive: false,
    SortOrder: 0,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
    tbL_TYPE_MenuItemFeatureMapping_: [
      {
        featureid: 0,
        menuitemid: 0,
        isActive: true,
      },
    ],
  };
  const initialFormFields = {
    OperationId: Select,
    FeatureList: "",
    MenuId: 0,
    MenuName: "",
    MenuURL: "",
    ParentId: "0",
    CompanyId: decryptData(COMPANY_ID, SessionStorage),
    IconClass: "",
    SubNode: "",
    IsDisplayInMenu: false,
    IsActive: false,
    SortOrder: 0,
    UserID: decryptData(LOGINID, SessionStorage),
    UserIP: decryptData(UserNetworkInfo)?.IPv4,
    tbL_TYPE_MenuItemFeatureMapping_: [formTbL_TYPE_MenuItemFeatureMapping_],
  };
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

  const [parentIdList, setParentIdList] = useState([]);

  useEffect(() => {
    getCompanyName();
    getMenus();
  }, []);

  const getCompanyName = () => {
    PostRequest(COMPANY, initialCompanyList)
      .then((res) => {
        setSelectionList({
          ...selectionList,
          CompanyID: res?.data?.Table,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getMenus = () => {
    PostRequest(SETUPMENUITEM_OPERATIONS, initialSearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: initialSearchFields,
          },
        });
        setFeatureMapData(res?.data?.Table1);
        setParentIdList(res?.data?.Table2);
        let featuredValue = res?.data?.Table1?.map((x) => ({
          featureid: x.FeatureId,
          menuitemid: 0,
          isActive: x.Checked === 0 ? false : true,
        }));
        setFormTbL_TYPE_MenuItemFeatureMapping_([...featuredValue]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const columns = [
    { field: "Company", name: "Company" },
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
      formTbL_TYPE_MenuItemFeatureMapping_[index].isActive = e.target.value;
      setFormTbL_TYPE_MenuItemFeatureMapping_([
        ...formTbL_TYPE_MenuItemFeatureMapping_,
      ]);
    } else {
      debugger;
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
      let featuredValue = featureMapData?.map((x) => ({
        featureid: x.FeatureId,
        menuitemid: 0,
        isActive: x.Checked === 0 ? false : true,
      }));
      featuredValue[index].isActive = e.target.value;
      setFormTbL_TYPE_MenuItemFeatureMapping_([...featuredValue]);
    }
  };

  const handleCancel = () => {
    setAllFeatureList(initialFeatureList);
    dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
    let mapData = featureMapData.map((x) => ({ ...x, Checked: false }));
    setFeatureMapData([...mapData]);
    setCheckedFeatureList([]);
    setFormTbL_TYPE_MenuItemFeatureMapping_([
      intialFormtbL_TYPE_MenuItemFeatureMapping_,
    ]);
  };

  const submitSearch = () => {
    PostRequest(SETUPMENUITEM_OPERATIONS, SearchFields)
      .then((res) => {
        dispatch({
          type: SET_INITIAL_CRUD_FORM_STATE,
          payload: {
            List: res?.data?.Table,
            FormFields: initialFormFields,
            SearchFields: SearchFields,
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
    getMenus();
  };

  const submitForm = (id) => {
    const payload = {
      ...FormFields,
      OperationId: id,
      SubNode: "",
      ParentId:
        FormFields?.ParentId == "11" ? null : FormFields?.ParentId?.toString(),
      FeatureList: allFeatureList.Features,
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
      tbL_TYPE_MenuItemFeatureMapping_: formTbL_TYPE_MenuItemFeatureMapping_,
    };
    console.log(payload);
    debugger;
    PostRequest(SETUPMENUITEM_OPERATIONS, payload)
      .then((res) => {
        if (res?.data?.Table?.[0]?.HasError === 0) {
          CustomSuccessAlert(res?.data?.Table?.[0]?.Message);
          dispatch({ type: RESET_FORM_FIELDS, payload: initialFormFields });
          setAllFeatureList(initialFeatureList);
          let mapData = featureMapData.map((x) => ({ ...x, Checked: false }));
          setFeatureMapData([...mapData]);
          setCheckedFeatureList([]);
          getMenus();
          //   getRoles();
        } else {
          CustomErrorMessage(res?.data?.Table?.[0]?.Message);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const onEditRow = (obj) => {
    console.log(obj);
    const payload = {
      operationId: eCheckedFeatureList,
      MenuId: obj.MenuId,
      FeatureList: "",
      MenuName: "",
      MenuURL: "",
      ParentId: "0",
      CompanyId: 0,
      IconClass: "",
      SubNode: "",
      IsDisplayInMenu: false,
      IsActive: false,
      SortOrder: 0,
      UserID: decryptData(LOGINID, SessionStorage),
      UserIP: decryptData(UserNetworkInfo)?.IPv4,
      tbL_TYPE_MenuItemFeatureMapping_: [
        {
          featureid: 0,
          menuitemid: 0,
          isActive: true,
        },
      ],
    };

    PostRequest(SETUPMENUITEM_OPERATIONS, payload)
      .then((res) => {
        setCheckedFeatureList(res?.data?.Table);
        let data = res?.data?.Table?.map((x) => ({
          featureid: x.FeatureId,
          menuitemid: x.MenuId,
          isActive: x.Checked === 1 ? true : false,
        }));
        setFormTbL_TYPE_MenuItemFeatureMapping_([...data]);
      })
      .catch((err) => {
        console.error(err);
      });
    let data = {
      MenuName: obj.MenuName,
      MenuId: obj.MenuId,
      MenuURL: obj.MenuURL,
      ParentId: obj.ParentId,
      SortOrder: obj.SortOrder,
      CompanyId: obj.CompanyID,
      IconClass: obj?.IconClass,
      IsDisplayInMenu: obj.IsDisplayInMenu,
      IsActive: obj.IsActive,
    };
    dispatch({ type: SET_ALL_CRUD_FROM_FIELDS, payload: data });
  };

  const onDeleteRow = (obj) => {
    console.log(obj);
    DeleteWithConfirmation().then((result) => {
      if (result.isConfirmed) {
        const payload = {
          OperationId: Delete,
          FeatureList: "",
          MenuId: obj.MenuId,
          MenuName: obj?.MenuName,
          MenuURL: obj?.MenuURL,
          ParentId: obj?.ParentId,
          CompanyId: obj?.CompanyID,
          IconClass: obj?.IconClass,
          SubNode: obj?.SubNode,
          IsDisplayInMenu: false,
          IsActive: false,
          SortOrder: obj?.SortOrder,
          UserID: decryptData(LOGINID, SessionStorage),
          UserIP: decryptData(UserNetworkInfo)?.IPv4,
        };

        PostRequest(SETUPMENUITEM_OPERATIONS, payload)
          .then((res) => {
            if (res.data?.Table?.[0]?.HasError === 0) {
              CustomSuccessAlert(res?.data?.Table?.[0]?.Message);
              getMenus();
            } else {
              CustomErrorMessage(res?.data?.Table?.[0]?.Message);
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
          label="Company"
          name="CompanyId"
          fieldId="CompanyID"
          fieldName="Company"
          list={selectionList.CompanyID}
          onChange={handleSearchChange}
          value={SearchFields?.CompanyId}
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
          label=" Is Active"
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
        <FormGroupSelect
          label="Parent ID"
          name="ParentId"
          fieldId="MenuId"
          fieldName="MenuName"
          list={parentIdList}
          onChange={handleAddChange}
          value={FormFields?.ParentId}
        ></FormGroupSelect>
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
          label="Company"
          name="CompanyId"
          fieldId="CompanyID"
          fieldName="Company"
          list={selectionList?.CompanyID}
          onChange={handleAddChange}
          value={FormFields?.CompanyId}
        ></FormGroupSelect>
      </Col>
      <Col lg="6" md="6" xs="12">
        <FormGroupInput
          label="Icon"
          name="IconClass"
          onChange={handleAddChange}
          value={FormFields?.IconClass}
        />
      </Col>

      <Col lg="6" md="6" xs="12">
        <FormGroupCheckbox
          label=" Is Display"
          name="IsDisplayInMenu"
          onChange={handleAddChange}
          value={FormFields?.IsDisplayInMenu}
        />
      </Col>
      
      <Col lg="6" md="6" xs="12">
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
              <Col key={index} lg="3" md="3" xs="12">
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
              <Col key={index} lg="3" md="3" xs="12">
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
