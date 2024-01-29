import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "../layout/AdminLayout";
import Login from "../pages/Login";
import { isLogin, logout } from "../utils";
import PrivateRoute from "./PrivateRoutes";
import NoDataFound from "../pages/NoDataFound";
import ForgotUsername from "../pages/ForgotUsername";
import ForgotPassword from "../pages/ForgotPassword";
import { SessionStorage } from "../common/SetupMasterEnum";
import { LOGINID, LOGIN_TYPE } from "../utils/EncryptedConstants";
import { decryptData } from "../EncryptData";
import Register from "../pages/Register";

const Redirection = () => {
  let loginType = decryptData(LOGIN_TYPE, SessionStorage);
  if (loginType !== undefined) {
    if (loginType === "1") {
      logout();
      return <Redirect to="/login" />;
    }
  } else {
    logout();
    return <Redirect to="/login" />;
  }
};

export default function MainRoutes() {
  return (
    <>
      <Switch>
        <Route
          path="/pages"
          render={(props) =>
            isLogin() ? <AdminLayout {...props} /> : <Redirection />
          }
        />
        <Route exact path="/login" component={Login}></Route>
        <Route exact path="/forgotusername" component={ForgotUsername}></Route>
        <Route exact path="/forgotpassword" component={ForgotPassword}></Route>
        <Route exact path="/Register" component={Register}></Route>
        <PrivateRoute exact component={NoDataFound} />
      </Switch>
    </>
  );
}
