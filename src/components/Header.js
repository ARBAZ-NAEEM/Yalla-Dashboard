/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { Container, Nav } from "reactstrap";
import Logo from "../assets/img/filled_logo.png";
import Profile from "../assets/img/noprofilepic.png";
import { isLogin, logout } from "../utils";
import Sidebar from "./Sidebar";
import { useDispatch } from "react-redux";
import { fetchToggle } from "../redux/actions/toggleAction";
import { decryptData } from "../EncryptData";
import {
  COMPANY_DETAILS,
  LOGINID,
  LOGIN_TYPE,
  TYPE,
} from "../utils/EncryptedConstants";
import { SessionStorage } from "../common/SetupMasterEnum";
import LogoutModal from "./LogoutModal";
import { useRef } from "react";
import { hover } from "@testing-library/user-event/dist/hover";

const Header = (props) => {
  const dispatch = useDispatch();
  let history = useHistory();
  const [isToggleOn, isToggleOf] = useState(true);
  const [isActive, setActive] = useState(false);
  const [idleModal, setIdleModal] = useState(false);
  const [matches, setMatches] = useState(
    window.matchMedia("(max-width: 800px)").matches
  );

  let idleTimeout = 1000 * 60 * 10;
  let idleLogout = 1000 * 60 * 10;
  const idleEvent = useRef(null);
  let idleLogoutEvent;

  /**
   * Add any other events listeners here
   */
  const events = ["mousemove", "click", "keypress"];
  const sessionTimeout = () => {
    if (!!idleEvent.current) clearTimeout(idleEvent.current);
    if (!!idleLogoutEvent) clearTimeout(idleLogoutEvent);
    idleEvent.current = setTimeout(() => {
      setIdleModal(true);
    }, idleTimeout);
    idleLogoutEvent = setTimeout(() => logOut, idleLogout);
  };

  const isToggle = (e) => {
    e.preventDefault();
    isToggleOf(!isToggleOn);
    dispatch(fetchToggle(isToggleOn));
  };

  const toggleMenu = (e) => {
    e.preventDefault();
    setActive(!isActive);
  };
  function logOut(e) {
    e.preventDefault();
    logout();
    history.push("/login");
    let loginType = decryptData(LOGIN_TYPE, SessionStorage);
    if (loginType === "1") {
    } else if (loginType === "2") {
      logout();
      history.push("/admissionlogin");
    }
  }
  const changeState = () => {
    setActive(false);
  };

  useEffect(() => {
    const loginId = sessionStorage.getItem(LOGINID);
    if (!loginId) {
      logOut();
    }
    return () => {};
  }, []);
  useEffect(() => {
    window
      .matchMedia("(max-width: 800px)")
      .addEventListener("change", (e) => setMatches(e.matches));
    if (matches) {
      isToggleOf(false);
      dispatch(fetchToggle(true));
    } else {
      isToggleOf(true);
      dispatch(fetchToggle(false));
    }
  }, [matches]);

  useEffect(() => {
    for (let e in events) {
      window.addEventListener(events[e], sessionTimeout);
    }
    return () => {
      for (let e in events) {
        window.removeEventListener(events[e], sessionTimeout);
      }
    };
  }, []);

  function SignOut(e) {
    e.preventDefault();
    let loginType = decryptData(LOGIN_TYPE, SessionStorage);
    if (loginType === "1") {
      logout();
      history.push("/login");
    } else if (loginType === "2") {
      logout();
      history.push("/admissionlogin");
    }
  }

  // var elem = document.documentElement;
  // function openFullscreen() {
  //   if (elem.requestFullscreen) {
  //     elem.requestFullscreen();
  //   } else if (elem.webkitRequestFullscreen) { /* Safari */
  //     elem.webkitRequestFullscreen();
  //   } else if (elem.msRequestFullscreen) { /* IE11 */
  //     elem.msRequestFullscreen();
  //   }
  // }

  const toggleFullScreen = (e) => {
    e.preventDefault();
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  function changeBackground(e) {
    e.target.style.backgroundColor = decryptData(
      COMPANY_DETAILS,
      SessionStorage
    )?.ColourCode;
    e.target.style.color = "white";
  }

  function changeBackgroundOut(e) {
    e.target.style.backgroundColor = null;
  }

  return (
    <>
      <div className="mainHeader">
        <Nav className="navbar navbar-inverse navbar-fixed-top ">
          <Container fluid className="nav-wrap p-0">
            <div className="mobile-only-brand pull-left">
              <div className="nav-header pull-left">
                <div className="logo-wrap">
                  {decryptData(LOGIN_TYPE, SessionStorage) == "1" ? (
                    <Link to="/pages/dashboard">
                      <h2
                        style={{
                          color: decryptData(COMPANY_DETAILS, SessionStorage)
                            ?.ColourCode,
                          fontSize: "22px",
                        }}
                      >
                        {decryptData(COMPANY_DETAILS, SessionStorage)?.Company}
                      </h2>
                      <img className="logo-img" src={Logo} alt="Logo" />
                    </Link>
                  ) : decryptData(TYPE, SessionStorage) != 1 ? (
                    <Link to="/pages/admission/dashboard">
                      <h2
                        style={{
                          color: decryptData(COMPANY_DETAILS, SessionStorage)
                            ?.ColourCode,
                        }}
                      >
                        {decryptData(COMPANY_DETAILS, SessionStorage)?.Company}
                      </h2>
                      {/* <img className="logo-img" src={Logo} alt="Logo" /> */}
                    </Link>
                  ) : (
                    <Link to="/pages/admission/instruction">
                      <h2
                        style={{
                          color: decryptData(COMPANY_DETAILS, SessionStorage)
                            ?.ColourCode,
                        }}
                      >
                        {decryptData(COMPANY_DETAILS, SessionStorage)?.Company}
                      </h2>
                      {/* <img className="logo-img" src={Logo} alt="Logo" /> */}
                    </Link>
                  )}
                </div>
              </div>
              <a
                href="javascript:void(0)"
                id="toggle_nav_btn"
                onClick={isToggle}
                className="toggle-left-nav-btn inline-block ml-20 pull-left"
                // onMouseEnter={changeBackground}
                // onMouseLeave={changeBackgroundOut}
              >
                <i
                  className="ti ti-menu"
                  style={{ color: "#e84b1e" }}
                  // style={{
                  //   color: hover ? decryptData(COMPANY_DETAILS, SessionStorage)
                  //     ?.ColourCode : 'white',
                  // }}
                  // onMouseEnter={changeBackground}
                  // onMouseLeave={changeBackgroundOut}
                ></i>
              </a>
            </div>
            <div id="mobile_only_nav" className="mobile-only-nav pull-right">
              <ul className="nav navbar-right top-nav pull-right">
                <li className="dropdown auth-drp">
                  <a
                    href="#"
                    id="btn"
                    className="pr-0 profile-logout"
                    data-provide="fullscreen"
                    onClick={toggleFullScreen}
                  >
                    <i className="ti-fullscreen"></i>
                  </a>
                  {/* <a
                    href="#"
                    className=" pr-0 profile-logout "
                    data-toggle="dropdown"
                    onClick={toggleMenu}
                  >
                    <span className="user-auth-name inline-block">
                      <span id="lblLoginStatus">HRMS</span>
                      <span className="ti-arrow-circle-down"></span>
                    </span>
                    <img
                      src={Profile}
                      alt="user_auth"
                      className="user-auth-img img-circle"
                    />
                    <span className="user-online-status"></span>
                  </a> */}
                  <a
                    href="#"
                    className=" pr-0 profile-logout"
                    onClick={(e) => logOut(e)}
                  >
                    <i className="ti-power-off text-danger"></i>
                    <span>
                      {" "}
                      <b>LOG OUT</b>
                    </span>
                  </a>

                  {isActive ? (
                    <ul className="dropdown-menu user-auth-dropdown show">
                      <li>
                        <Link to="/pages/changepassword" onClick={changeState}>
                          <i className="ti ti-pencil-alt text-warning"></i>
                          Change Password
                        </Link>
                      </li>
                    </ul>
                  ) : (
                    ""
                  )}
                </li>
              </ul>
            </div>
          </Container>
        </Nav>
      </div>
      <Sidebar isToggle={isToggleOn} />
      {isLogin() && <LogoutModal idleModal={idleModal} signOut={SignOut} />}
    </>
  );
};

export default Header;
