import React, { Fragment, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Scrollbars } from "react-custom-scrollbars";
import { SET_SELECTED_MENU } from "../redux/actionType/AuthType";
import { SET_INITIAL_CRUD_FORM_STATE } from "../redux/actionType/CrudActionTypes";
import { decryptData, encryptData } from "../EncryptData";
import { SessionStorage } from "../common/SetupMasterEnum";
import { COMPANY_DETAILS } from "../utils/EncryptedConstants";
import dashboardIcon from "../assets/img/icons8-dashboard-30.png";
import workIcon from "../assets/img/icons8-work-30.png";
import laborIcon from "../assets/img/icons8-labor-30.png";
import arrowDown from "../assets/img/icons8-down-arrow-18.png";
import complianceIcon from "../assets/img/icons8-compliance-20.png";
import safetyIcon from "../assets/img/icons8-safety-helmet-30.png";
import sidebarImage from "../assets/img/custom-32.svg";

const Sidebar = (props) => {
  const dispatch = useDispatch();

  const { menuTable } = useSelector((state) => state.AuthReducer);
  const toggleSidebar = props?.isToggle;
  const [isActive, setActive] = useState(false);
  const [uniqId, setUniqId] = useState("");
  const [parentText, setParentText] = useState("");
  const [isChildActive, setChildActive] = useState(false);
  const [child, setChild] = useState("");
  const [innerData, setInnerData] = useState([]);
  const [innerChildData, setInnerChildData] = useState([]);

  const [currentParams, setCurrentParams] = useState("");

  const parentClick = (params, e) => {
    e.preventDefault();
    if (currentParams === params) {
      setActive(isActive);
    } else {
      setActive(true);
    }
  };

  const changeState = (menu) => {
    dispatch({
      type: SET_INITIAL_CRUD_FORM_STATE,
      payload: {
        List: new Array(0),
      },
    });
    encryptData(menu.MenuId, "MenuId", SessionStorage);
    dispatch({ type: SET_SELECTED_MENU, payload: menu.MenuId });
  };

  function changeBackground(e) {
    e.target.style.backgroundColor = decryptData(
      COMPANY_DETAILS,
      SessionStorage
    )?.ColourCode;
  }

  function changeBackgroundOut(e) {
    e.target.style.backgroundColor = null;
  }

  const [hover, setHover] = useState(false);

  const hoverStyle = {
    color: {},
  };

  const normalStyle = {
    //Styles
  };

  const onMouseEnter = (e) => {
    e.target.style.color = decryptData(
      COMPANY_DETAILS,
      SessionStorage
    )?.ColourCode;
  };

  const onMouseLeave = (e) => {
    e.target.style.color = null;
  };

  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [show3, setShow3] = useState(false);
  const [show4, setShow4] = useState(false);

  const onToggleClick = () => {
    setShow(!show);
    setShow1(false);
    setShow2(false);
    setShow4(false);
  };
  const onToggleClick1 = () => {
    setShow(false);
    setShow1(!show1);
    setShow2(false);
    setShow4(false);
  };
  const onToggleClick2 = () => {
    setShow(false);
    setShow1(false);
    setShow2(!show2);
    setShow3(!show3);
    setShow4(false);
  };
  const onToggleClick3 = () => {
    setShow(false);
    setShow1(false);
    setShow2(show2);
    setShow3(!show3);
    setShow4(false);
  };
  const onToggleClick4 = () => {
    setShow(false);
    setShow1(false);
    setShow2(false);
    setShow3(false);
    setShow4(!show4);
  };
  return (
    <>
      {toggleSidebar ? (
        <>
          <div className="fixed-sidebar-left show">
            <ul
              id=""
              className="list-group d-block nav navbar-nav side-nav nicescroll-bar"
            >
              <li className="sub">
                <Link
                  to={"/pages/dashboard"}
                  onClick={onToggleClick}
                  className={show ? "active" : ""}
                >
                  <img src={dashboardIcon} alt="" /> Dashboard{" "}
                </Link>
                <Link
                  to={"/pages/SafetyHealth"}
                  onClick={onToggleClick4}
                  className={show4 ? "active" : ""}
                >
                  <img src={safetyIcon} alt="" /> Health And Safety{" "}
                </Link>

                <Link
                  to={"/pages/WorkPermit"}
                  onClick={onToggleClick1}
                  className={show1 ? "active" : ""}
                >
                  <img src={workIcon} alt="" />
                  Work Permit{" "}
                </Link>

                <Link
                  to={"/pages/laborwelfare"}
                  onClick={onToggleClick2}
                  className={show2 ? "active" : ""}
                >
                  <img src={laborIcon} alt="" />
                  labor welfare{" "}
                  <img className="arrow-left" src={arrowDown} alt="" />
                </Link>
                {show2 && (
                  <Link
                    to={"/pages/HseCompliance"}
                    onClick={onToggleClick3}
                    className={show3 ? "sub-active  sub-menu" : "sub-menu"}
                  >
                    <img src={complianceIcon} alt="" />
                    HSE Compliance{" "}
                  </Link>
                )}
              </li>
            </ul>

            {/* <div className="sidebar_image_div">
            <img className="sidebar_image" src={sidebarImage} alt="sidebarImage" />
            <h6 className="" style={{textAlign: "center", color: decryptData(COMPANY_DETAILS, SessionStorage)
                                        ?.ColourCode}}>Finance Portal</h6>
            </div> */}
          </div>

          {/* {isActive ? (
            <div className="submenu show">
              <div className="slimScrollDiv">
                <div className="nicescroll-bar">
                  <Scrollbars style={{ height: "460px" }}>
                    <div id="childm" className="submenuinn">
                      <ul id="dropdown1" className="list-group d-block">
                        {innerData.map((menu, ind) => {
                          return (
                            <Fragment key={ind}>
                              <li className="sub">
                                {menuTable?.Table1?.filter(
                                  (x) => x.ParentId == menu.MenuId
                                ).length === 0 ? (
                                  <Link
                                    className="noChild"
                                    to={menu.MenuURL}
                                    onClick={() => changeState(menu)}
                                  >
                                    <i className={menu.IconClass}></i>
                                    <span>{menu.MenuName}</span>
                                    <span className="holder"></span>
                                  </Link>
                                ) : (
                                  <>
                                    <a
                                      className="haveChild"
                                      id={
                                        text == menu.MenuName && isChildActive
                                          ? "childClass"
                                          : ""
                                      }
                                      onClick={(e) => childClick(menu, e)}
                                    >
                                      <i
                                        id={
                                          text == menu.MenuName && isChildActive
                                            ? "childIcon"
                                            : ""
                                        }
                                        className="ti ti-user"
                                      ></i>
                                      <span>{menu.MenuName}</span>
                                      <span className="holder"></span> 
                                    </a>
                                    {text == menu.MenuName ? (
                                      <>
                                        {isChildActive ? (
                                          <ul
                                            id=""
                                            className="list-group d-block"
                                            style={{
                                              borderTop: "1px solid #fcb30c",
                                              borderRadius: "0px",
                                            }}
                                          >
                                            {innerChildData.map((subMenu) => {
                                              return (
                                                <li
                                                  className="sub"
                                                  key={subMenu.MenuId}
                                                >
                                                  <Link
                                                    to={subMenu.MenuURL}
                                                    className="makeLabel"
                                                    onClick={() =>
                                                      changeState(subMenu)
                                                    }
                                                  >
                                                    {subMenu.MenuName}
                                                  </Link>
                                                </li>
                                              );
                                            })}
                                          </ul>
                                        ) : (
                                          ""
                                        )}
                                      </>
                                    ) : (
                                      ""
                                    )}
                                  </>
                                )}
                              </li>
                            </Fragment>
                          );
                        })}
                      </ul>
                    </div>
                  </Scrollbars>
                </div>
              </div>
            </div>
          ) : (
            ""
          )} */}
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Sidebar;
