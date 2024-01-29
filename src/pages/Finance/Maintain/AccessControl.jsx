import React, { Fragment, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Col, Input, Label, Row } from "reactstrap";
import {
  roleByApplication,
  Search,
  Select,
  SessionStorage,
} from "../../../common/SetupMasterEnum";
import {
  CustomSuccessAlert,
  SomeThingWentWrong,
  SuccessAlert,
} from "../../../components/Alert";
import CrudFormComponent from "../../../components/FormComponents/CrudFormComponent";
import FormGroupSelect from "../../../components/GeneralComponent/FormGroupSelect";
import { decryptData } from "../../../EncryptData";
import { SET_CRUD_SEARCH_FIELDS } from "../../../redux/actionType/CrudActionTypes";
import {
  SecuritySetup_GetApplications,
  SecuritySetup_RoleOperation,
  SecuritySetup_AccessControlOprtations,
  PostRequest,
} from "../../../utils/Config";
import {
  COMPANY,
  ROLES,
  ROLESACCESSCONTROL,
} from "../../../utils/UrlConstants";
import { LOGINID, UserNetworkInfo } from "../../../utils/EncryptedConstants";

const initialSelectionList = {
  ApplicationList: [],
  RoleList: [],
};

const initialCompanyList = {
  OperationID: Select,
  CompanyID: 0,
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

const initialRoleFields = {
  operationId: Search,
  companyID: 0,
  roleID: 0,
  roleName: "",
  isFixed: true,
  isActive: true,
  level: "",
  userID: decryptData(LOGINID, SessionStorage),
  userIP: decryptData(UserNetworkInfo)?.IPv4,
};

const AccessControl = () => {
  const { SearchFields } = useSelector((state) => state.CrudFormReducer);
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const [selectionList, setSelectionList] = useState(initialSelectionList);
  const [roleList, setRoleList] = useState([]);
  const [accessList, setAccessList] = useState([]);
  const [accessListFeatures, setAccessListFeatures] = useState([]);

  const initialTbL_TYPE_ROLEMENUITEMFEATUREMAPPING_ = {
    roleMenuItemFeatureMappingID: 0,
    roleId: 0,
    menuItemFeatureID: 0,
    isChecked: true,
  };

  const [
    tbL_TYPE_ROLEMENUITEMFEATUREMAPPING_,
    setTbL_TYPE_ROLEMENUITEMFEATUREMAPPING_,
  ] = useState(initialTbL_TYPE_ROLEMENUITEMFEATUREMAPPING_);
  const dispatch = useDispatch();

  const initialSearchFields = {
    operationId: Select,
    roleMenuItemFeatureMappingID: 0,
    menuItemFeatureID: 0,
    roleID: 0,
    isActive: true,
    createdBy: 0,
    modifiedBy: 0,
    checked: true,
    userId: decryptData(LOGINID, SessionStorage),
    userIP: decryptData(UserNetworkInfo)?.IPv4,
    tbL_TYPE_ROLEMENUITEMFEATUREMAPPING_: [
      tbL_TYPE_ROLEMENUITEMFEATUREMAPPING_,
    ],
  };

  useEffect(() => {
    getRolesByCompany(Select);
    getCompanyName();
  }, []);

  const getCompanyName = () => {
    PostRequest(COMPANY, initialCompanyList)
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

  const submitSearch = () => {
    getAccessControlOperations();
  };

  const getRolesByCompany = (e) => {
    const payload = {
      ...initialRoleFields,
      operationId: Search,
      companyID: e,
      userID: decryptData(LOGINID, SessionStorage),
    };
    PostRequest(ROLES, payload)
      .then((res) => {
        setRoleList(res?.data?.Table);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const updateControl = () => {
    postUpdateControls();
    // if (SearchFields.RoleApplicationMappingId != undefined) {

    // } else {
    //   SomeThingWentWrong();
    // }
  };

  const postUpdateControls = () => {
    const data = {
      operationId: 2,
      roleMenuItemFeatureMappingID: 0,
      menuItemFeatureID: 0,
      roleID: 0,
      isActive: true,
      createdBy: decryptData(LOGINID, SessionStorage),
      modifiedBy: decryptData(LOGINID, SessionStorage),
      checked: true,
      userIP: decryptData(UserNetworkInfo)?.IPv4,
      tbL_TYPE_ROLEMENUITEMFEATUREMAPPING_:
        tbL_TYPE_ROLEMENUITEMFEATUREMAPPING_,
    };
    PostRequest(ROLESACCESSCONTROL, data)
      .then((res) => {
        if (res?.data?.Table?.[0].HasError == 0) {
          CustomSuccessAlert(res?.data?.Table?.[0].Message);
          getAccessControlOperations();
        } else {
          SomeThingWentWrong();
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getAccessControlOperations = () => {
    const data = {
      ...initialSearchFields,
      roleID: SearchFields?.roleID,
      tbL_TYPE_ROLEMENUITEMFEATUREMAPPING_: [
        {
          roleMenuItemFeatureMappingID: 0,
          roleId: 0,
          menuItemFeatureID: 0,
          isChecked: true,
        },
      ],
    };
    PostRequest(ROLESACCESSCONTROL, data)
      .then((res) => {
        setAccessListFeatures(res?.data?.Table);
        setAccessList(res?.data?.Table1);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleSearchChange = (e) => {
    let data = { name: e.target.name, value: e.target.value };
    dispatch({ type: SET_CRUD_SEARCH_FIELDS, payload: data });
  };

  const handleInputFeatureChange = (e, object, index) => {
    const val = e.target.checked == true ? 1 : 0;
    let ind = accessListFeatures.findIndex(
      (x) => x.MenuId === object.MenuId && x.Feature === object.Feature
    );
    accessListFeatures[ind].checked = val;
    setAccessListFeatures([...accessListFeatures]);

    let checkedData = accessListFeatures?.map((x) => ({
      roleMenuItemFeatureMappingID: x.RoleMenuItemFeatureMappingId,
      roleId: x.RoleID,
      menuItemFeatureID: x.MenuItemFeatureId,
      isChecked: x.checked === 1 ? true : false,
    }));
    checkedData[ind].isChecked = e.target.checked;
    setTbL_TYPE_ROLEMENUITEMFEATUREMAPPING_([...checkedData]);
    // const value = accessListFeatures.map((data) => data.checked).join(",");
  };

  const searchPanel = (
    <Fragment>
      <Col lg="3" md="3" xs="12">
        <FormGroupSelect
          list={roleList}
          label="Role"
          name="roleID"
          fieldId="RoleId"
          fieldName="Role"
          onChange={handleSearchChange}
          value={SearchFields?.roleID}
        />
      </Col>
      <Row>
        <Col lg="3" md="3" xs="12" style={{ margin: 20 }}>
          {/* Orignal Old Code Started */}

          <ul>
            {accessList &&
              accessList
                ?.filter((item) => item.ParentId === null)
                .map((parentItem, parentIndex) => (
                  <li key={parentItem.MenuId}>
                    <Label className="form-check-Label">
                      {" " + parentItem.MenuName}
                    </Label>
                    {accessListFeatures?.filter(
                      (access4) => access4.MenuId == parentItem.MenuId
                    ).length > 0 && (
                      <ul style={{ marginLeft: 20 }}>
                        {accessListFeatures
                          ?.filter(
                            (access4) => access4.MenuId == parentItem.MenuId
                          )
                          .map((item4, childIndex) => (
                            <li key={childIndex}>
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
                    {
                      accessList?.filter(
                        (item1) => item1.ParentId == parentItem.MenuId
                      ).length > 0 ? (
                        <ul>
                          {accessList
                            ?.filter(
                              (item1) => item1.ParentId == parentItem.MenuId
                            )
                            .map((item1, childIndex) => (
                              <li key={item1.MenuId}>
                                <Label className="form-check-Label">
                                  {" " + item1.MenuName}
                                </Label>
                                {accessListFeatures?.filter(
                                  (access2) => access2.MenuId == item1.MenuId
                                ).length > 0 && (
                                  <ul style={{ marginLeft: 20 }}>
                                    {accessListFeatures
                                      ?.filter(
                                        (access2) =>
                                          access2.MenuId == item1.MenuId
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
                                  (item3) => item3.ParentId == item1.MenuId
                                ).length > 0 &&
                                  accessList
                                    ?.filter(
                                      (item3) => item3.ParentId == item1.MenuId
                                    )
                                    .map((item3, childItem3Index) => (
                                      <li key={item3.MenuId}>
                                        <Label className="form-check-Label">
                                          {" " + item3.MenuName}
                                        </Label>
                                        {accessListFeatures?.filter(
                                          (access2) =>
                                            access2.MenuId == item3.MenuId
                                        ).length > 0 && (
                                          <ul style={{ marginLeft: 30 }}>
                                            {accessListFeatures
                                              ?.filter(
                                                (access2) =>
                                                  access2.MenuId == item3.MenuId
                                              )
                                              .map(
                                                (
                                                  access2,
                                                  childAccess2Index
                                                ) => (
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
                      ) : null
                      // accessListFeatures?.filter(
                      //     (access1) => access1.MenuId == parentItem.MenuId
                      //   ).length > 0 ? (
                      //   <ul>
                      //     {accessListFeatures
                      //       ?.filter(
                      //         (access2) => access2.MenuId == parentItem.MenuId
                      //       )
                      //       .map((item2, childIndex) => (
                      //         <li key={childIndex}>
                      //           <Label className="form-check-Label">
                      //             {" asdasd" + item2.MenuName}
                      //           </Label>
                      //         </li>
                      //       ))}
                      //   </ul>
                      // ) : null
                    }
                  </li>
                ))}
          </ul>

          {/* Orignal Old Code End */}

          {/* <ul>
            {accessList &&
              accessList
                ?.filter((parentItem) => parentItem.ParentId == null)
                ?.map((parentMenu) => (
                  <li>
                    <Label>{parentMenu?.MenuName}</Label>
                    {accessListFeatures
                      ?.filter(
                        (perntFeatures) =>
                          perntFeatures?.MenuId == parentMenu?.MenuId
                      )
                      ?.map((parentFeature) => (
                        <ul>
                          <li>
                            <Label className="form-check-Label">
                              <Input
                                type="checkbox"
                                checked={
                                  parentFeature.checked == 1 ? true : false
                                }
                                onChange={(e) =>
                                  handleInputFeatureChange(
                                    e,
                                    parentFeature,
                                    accessListFeatures.indexOf(parentFeature)
                                  )
                                }
                              />
                              {" " + parentFeature.Feature}
                            </Label>
                          </li>
                        </ul>
                      ))}
                    <ul>
                      {accessList &&
                        accessList
                          ?.filter(
                            (childMenu) =>
                              childMenu?.ParentId == parentMenu?.MenuId
                          )
                          ?.map((childMenuName) => (
                            <li>
                              <Label>{childMenuName?.MenuName}</Label>
                              {accessListFeatures
                                ?.filter(
                                  (childFeature) =>
                                    childFeature?.MenuId == childMenuName?.MenuId
                                )
                                ?.map((childFeatureName) => (
                                  <ul>
                                    <li>
                                      <Label className="form-check-Label">
                                        <Input
                                          type="checkbox"
                                          checked={
                                            childFeatureName.checked == 1
                                              ? true
                                              : false
                                          }
                                          onChange={(e) =>
                                            handleInputFeatureChange(
                                              e,
                                              childFeatureName,
                                              accessListFeatures.indexOf(
                                                childFeatureName
                                              )
                                            )
                                          }
                                        />
                                        {" " + childFeatureName.Feature}
                                      </Label>
                                    </li>
                                  </ul>
                                ))}
                            </li>
                          ))}
                    </ul>
                  </li>
                ))}
          </ul> */}
        </Col>
      </Row>
    </Fragment>
  );

  const cancelSearch = () => {
    getCompanyName();
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

// {accessList?.filter(
//   (item1) => item1.ParentId === parentItem.MenuId
// )?.length > 0 ? (
//   <ul>
//     {accessList
//       ?.filter(
//         (item1) => item1.ParentId === parentItem.MenuId
//       )
//       ?.map((item1, childIndex) => (
//         <li>
//           <Label className="form-check-Label">
//             {" " + item1.MenuName}
//           </Label>
//           {accessListFeatures?.filter(
//             (access2) => access2.MenuId === item1.MenuId
//           ).length > 0 && (
//             <ul style={{ marginLeft: 20 }}>
//               {accessListFeatures
//                 ?.filter(
//                   (access2) =>
//                     access2.MenuId === item1.MenuId
//                 )
//                 .map((access2, childAccessIndex) => (
//                   <li key={childIndex}>
//                     <Label className="form-check-Label">
//                       <Input
//                         type="checkbox"
//                         checked={
//                           access2.checked == 1
//                             ? true
//                             : false
//                         }
//                         onChange={(e) =>
//                           handleInputFeatureChange(
//                             e,
//                             access2,
//                             accessListFeatures.indexOf(
//                               access2
//                             )
//                           )
//                         }
//                       />
//                       {" " + access2.Feature}
//                     </Label>
//                   </li>
//                 ))}
//             </ul>
//           )}
//         </li>
//       ))}
//   </ul>
// ) : (
//   <h5>No data</h5>
// )}
