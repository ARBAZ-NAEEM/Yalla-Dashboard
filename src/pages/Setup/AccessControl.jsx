import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label, Row } from "reactstrap";
import {
  roleByApplication,
  Select,
  SessionStorage,
} from "../../common/SetupMasterEnum";
import { SomeThingWentWrong, SuccessAlert } from "../../components/Alert";
import CrudFormComponent from "../../components/FormComponents/CrudFormComponent";
import FormGroupSelect from "../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../EncryptData";
import {
  SET_CRUD_SEARCH_FIELDS,
} from "../../redux/actionType/CrudActionTypes";
import {
  SecuritySetup_GetApplications,
  SecuritySetup_RoleOperation,
  SecuritySetup_AccessControlOprtations,
} from "../../utils/Config";
import { LOGINID } from "../../utils/EncryptedConstants";

const initialSelectionList = {
  ApplicationList: [],
  RoleList: [],
};

const AccessControl = () => {
  const {
    SearchFields,
  } = useSelector((state) => state.CrudFormReducer);

  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [selectionList, setSelectionList] = useState(initialSelectionList);
  const [roleList, setRoleList] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [accessListFeatures, setAccessListFeatures] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    getApplicationName();
  }, []);

  const getApplicationName = () => {
    const data = {
      UserId : decryptData(LOGINID, SessionStorage)
    }
    SecuritySetup_GetApplications(data)
      .then((res) => {
        setSelectionList({
          ...selectionList,
          RoleList: res?.data?.Table,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getRolesByApplication = (e) => {
    const payload = {
      OperationId: roleByApplication,
      ApplicationID: e,
    };
    SecuritySetup_RoleOperation(payload)
      .then((res) => {
        setRoleList(res.data);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const submitSearch = () => {
    getAccessControlOperations();
  };

  const updateControl = () => {

    if(SearchFields.RoleApplicationMappingId != undefined){
      postUpdateControls();
    }
    else{
      SomeThingWentWrong();
    }
    
  };

  const postUpdateControls = () => {
    const data = {
      OperationId: 2,
      RoleApplicationMappingID: SearchFields.RoleApplicationMappingId,
      MenuItemFeatureID: accessListFeatures
        .filter((item) => item.checked === 1)
        .map((data) => data.MenuItemFeatureId)
        .join(","),
      roleApplicationMenuItemFeatureMappingId: accessListFeatures
        .filter((item) => item.checked === 1)
        .map((data) => data.RoleApplicationMenuItemFeatureMappingId)
        .join(","),
      ApplicationId: 0,
      MenuID: 0,
      FeatureID: 0,
      Feature: "",
      Checked: "",
      IsActive: true,
      CreatedBy: 1,
      ModifiedBy: 1,
      UserIP: "192.168.1.105",
    };
    SecuritySetup_AccessControlOprtations(data)
      .then((res) => {
        if(res.data.Table[0].HasError == 0){
          SuccessAlert();
          getAccessControlOperations()
        }else{
          SomeThingWentWrong();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAccessControlOperations = () => {
    const data = {
      OperationId: 1,
      RoleApplicationMappingID: SearchFields.RoleApplicationMappingId,
      roleApplicationMenuItemFeatureMappingId: "0",
      MenuItemFeatureID: "0",
      ApplicationId: 0,
      MenuID: 0,
      FeatureID: 0,
      Feature: "",
      Checked: "",
      IsActive: true,
      CreatedBy: 0,
      ModifiedBy: 0,
      UserIP: "192.168.1.105",
    };
    SecuritySetup_AccessControlOprtations(data)
      .then((res) => {
        setAccessListFeatures(res.data.Table);
        setAccessList(res.data.Table1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
    if (e.target.name === "ApplicationID") {
      getRolesByApplication(e.target.value);
    }
  };

  const handleInputFeatureChange = (e, object, index) => {

    const val = e.target.checked == true ? 1 : 0;

    let ind = accessListFeatures.findIndex(
      (x) => x.MenuId === object.MenuId && x.Feature === object.Feature
    );
    accessListFeatures[ind].checked = val;
    setAccessListFeatures([...accessListFeatures]);
    const value = accessListFeatures.map((data) => data.checked).join(",");

  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={selectionList.RoleList}
          label="Application Name"
          name="ApplicationID"
          fieldId="ApplicationId"
          fieldName="ApplicationName"
          onChange={handleSearchChange}
          value={SearchFields?.ApplicationID}
        />
      </Col>

      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={roleList}
          label="Role"
          name="RoleApplicationMappingId"
          fieldId="RoleApplicationMappingId"
          fieldName="Role"
          onChange={handleSearchChange}
          value={SearchFields?.RoleApplicationMappingId}
        />
      </Col>
      <Row>
        <Col lg="3" md="3" xs="12" style={{ margin: 20 }}>
          <ul>
            {accessList &&
              accessList
                ?.filter((item) => item.ParentId === null)
                .map((parentItem, parentIndex) => (
                  <li key={parentItem.MenuId}>
                    <Label className="form-check-Label">
                      {/* <Input
                        type="checkbox"
                        checked={parentItem.checked == 1 ? true : false}
                        onChange={(e) =>
                          handleInputFeatureChange(
                            e,
                            parentItem,
                            accessList.indexOf(parentItem)
                          )
                        }
                      /> */}
                      {" " + parentItem.MenuName}
                    </Label>
                    {accessListFeatures?.filter(
                      (access4) => access4.MenuId === parentItem.MenuId
                    ).length > 0 && (
                      <ul style={{ marginLeft: 20 }}>
                        {accessListFeatures
                          ?.filter(
                            (access4) => access4.MenuId === parentItem.MenuId
                          )
                          .map((item4, childIndex) => (
                            <li key={item4.MenuId}>
                              <Label className="form-check-Label">
                                <Input
                                  type="checkbox"
                                  checked={item4.checked == 1 ? true : false}
                                  onChange={(e) =>
                                    handleInputFeatureChange(
                                      e,
                                      item4,
                                      accessList.indexOf(item4)
                                    )
                                  }
                                />
                                {" " + item4.Feature}
                              </Label>
                            </li>
                          ))}
                      </ul>
                    )}
                    {accessList?.filter(
                      (item1) => item1.ParentId === parentItem.MenuId
                    ).length > 0 ? (
                      <ul>
                        {accessList
                          ?.filter(
                            (item1) => item1.ParentId === parentItem.MenuId
                          )
                          .map((item1, childIndex) => (
                            <li key={item1.MenuId}>
                              <Label className="form-check-Label">
                                {/* <Input
                                  type="checkbox"
                                  checked={item1.checked == 1 ? true : false}
                                  onChange={(e) =>
                                    handleInputFeatureChange(
                                      e,
                                      item1,
                                      accessList.indexOf(item1)
                                    )
                                  }
                                /> */}
                                {" " + item1.MenuName}
                              </Label>
                              {accessListFeatures?.filter(
                                (access2) => access2.MenuId === item1.MenuId
                              ).length > 0 && (
                                <ul style={{ marginLeft: 20 }}>
                                  {accessListFeatures
                                    ?.filter(
                                      (access2) =>
                                        access2.MenuId === item1.MenuId
                                    )
                                    .map((access2, childAccessIndex) => (
                                      <li key={childIndex}>
                                        <Label className="form-check-Label">
                                          <Input
                                            type="checkbox"
                                            checked={
                                              access2.checked == 1
                                                ? true
                                                : false
                                            }
                                            onChange={(e) =>
                                              handleInputFeatureChange(
                                                e,
                                                access2,
                                                accessListFeatures.indexOf(
                                                  access2
                                                )
                                              )
                                            }
                                          />
                                          {" " + access2.Feature}
                                        </Label>
                                      </li>
                                    ))}
                                </ul>
                              )}
                              {accessList?.filter(
                                (item3) => item3.ParentId === item1.MenuId
                              ).length > 0 &&
                                accessList
                                  ?.filter(
                                    (item3) => item3.ParentId === item1.MenuId
                                  )
                                  .map((item3, childItem3Index) => (
                                    <li key={item3.MenuId}>
                                      <Label className="form-check-Label">
                                        {/* <Input
                                          type="checkbox"
                                          checked={
                                            item3.checked == 1 ? true : false
                                          }
                                          onChange={(e) =>
                                            handleInputFeatureChange(
                                              e,
                                              item3,
                                              accessList.indexOf(item3)
                                            )
                                          }
                                        /> */}
                                        {" " + item3.MenuName}
                                      </Label>
                                      {accessListFeatures?.filter(
                                        (access2) =>
                                          access2.MenuId === item3.MenuId
                                      ).length > 0 && (
                                        <ul style={{ marginLeft: 30 }}>
                                          {accessListFeatures
                                            ?.filter(
                                              (access2) =>
                                                access2.MenuId === item3.MenuId
                                            )
                                            .map(
                                              (access2, childAccess2Index) => (
                                                <li key={access2.MenuId}>
                                                  <Label className="form-check-Label">
                                                    <Input
                                                      type="checkbox"
                                                      checked={
                                                        access2.checked == 1
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={(e) =>
                                                        handleInputFeatureChange(
                                                          e,
                                                          access2,
                                                          accessListFeatures.indexOf(
                                                            access2
                                                          )
                                                        )
                                                      }
                                                    />
                                                    {" " + access2.Feature}
                                                  </Label>
                                                </li>
                                              )
                                            )}
                                        </ul>
                                      )}
                                    </li>
                                  ))}
                            </li>
                          ))}
                      </ul>
                    ) : accessListFeatures?.filter(
                        (access1) => access1.MenuId === parentItem.MenuId
                      ).length > 0 ? (
                      <ul>
                        {accessListFeatures
                          ?.filter(
                            (access1) => access1.MenuId === parentItem.MenuId
                          )
                          .map((item1, childIndex) => (
                            <li key={item1.MenuId}>
                              <Label className="form-check-Label">
                                {/* <Input
                                  type="checkbox"
                                  checked={item1.checked == 1 ? true : false}
                                  onChange={(e) =>
                                    handleInputFeatureChange(
                                      e,
                                      item1,
                                      accessListFeatures.indexOf(item1)
                                    )
                                  }
                                /> */}
                                {" " + item1.MenuName}
                              </Label>
                            </li>
                          ))}
                      </ul>
                    ) : null}
                  </li>
                ))}
          </ul>
        </Col>
      </Row>
    </Fragment>
  );

  const cancelSearch = () => {
    // getApplicationName();
  };

  return (
    <CrudFormComponent
      formName="Access Control"
      updateButtonName="Update Control"
      searchPanel={searchPanel}
      searchSubmit={submitSearch}
      updateControl={updateControl}
      cancelSearch={cancelSearch}
      featureList={menuTable?.Table2?.filter((x) => x.MenuId === selectedMenu)}
    />
  );
};

export default AccessControl;