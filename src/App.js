import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import "react-datepicker/dist/react-datepicker.css";
import MainRoutes from "./routes/MainRoutes";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { LOG_IN, SET_SELECTED_MENU } from "./redux/actionType/AuthType";
import { decryptData, encryptData } from "./EncryptData";
import { LOGINID, MENU_TABLE, UserNetworkInfo } from "./utils/EncryptedConstants";
import { Setup_MasterDetails_All_Dropdowns } from "./utils/Config";
import { Select, SessionStorage } from "./common/SetupMasterEnum";
import { SET_INITIAL_DROPDOWN_FORM_STATE } from "./redux/actionType/CrudActionTypes";

function App() {


  const dispatch = useDispatch();
  useEffect(() => {
  
    getUserNetworkInfo();
    getMasterDetailAllDropdown();
    const loginId = decryptData(LOGINID, SessionStorage);
    // const loginId = JSON.parse(localStorage.getItem("loginId"));
    const MenuId = decryptData("MenuId", SessionStorage);
    const menuTable = decryptData(MENU_TABLE, SessionStorage);
    let data = {
      loginId: loginId,
      token: null,
      expiry: null,
      menuTable: { Table1: menuTable?.Table1, Table2: menuTable?.Table2 },
    };
    dispatch({ type: LOG_IN, payload: data });
    dispatch({ type: SET_SELECTED_MENU, payload: MenuId });
  }, []);

  function getUserNetworkInfo() {
    Axios.get(`https://geolocation-db.com/json/`)
      .then((res) => {
        encryptData(res?.data, UserNetworkInfo);
      })
      .catch((e) => {
        console.error(e);
      });
  }

  function getMasterDetailAllDropdown() {
    const payload = {
      operationId: Select,
    };

    Setup_MasterDetails_All_Dropdowns(payload)
      .then((res) => {
        let data = {
          name: "MasterDropdown",
          value: res?.data,
        };
        dispatch({
          type: SET_INITIAL_DROPDOWN_FORM_STATE,
          payload: data,
        });
      })
      .catch((err) => {
        console.error(err);
      });
  }

  // color picker work
  // const { themeColor } = useSelector((state) => state.ProductCartReducer);
  // ConfigProvider.config({
  //   theme: {
  //     primaryColor: themeColor, //"#df368d", // "#4561B9",
  //   },
  // });
  return (
    <div className="App">
      <Router>
        <MainRoutes />
      </Router>
    </div>
  );
}

export default App;
