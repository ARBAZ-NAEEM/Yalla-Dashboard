import React, { useEffect, Suspense } from "react";
import { Switch, Route, useLocation, useHistory } from "react-router-dom";
import routes from "../routes/AdminRoutes";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Welcome from "../components/AdminComponent/Welcome";
import { Container } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import LoadingPage from "../components/ErrorLoadingComponents/LoadingPage";
import ErrorBoundary from "../utils/ErrorHandler/ErrorBoundary";

const AdminLayout = (props) => {
  const { menuTable, selectedMenu } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();
  const toggleData = useSelector((state) => state.toggle);

  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  const getURL = history?.location?.pathname;
  const menuURL = menuTable?.Table1?.filter((x) => x.MenuURL == getURL).map(
    (y) => y.MenuURL
  );
  return (
    <>
      <Header {...props} />
      <div
        className={
          toggleData?.toggle === true || toggleData?.toggle === undefined
            ? "after-toggle page-wrapper"
            : "page-wrapper"
        }
      >
        <Container fluid>
          <Welcome />
        </Container>

        <ErrorBoundary>
          <Suspense fallback={<LoadingPage />}>
            {routes.map((prop, key) => {
              return (
                <Route
                  // path={prop.path}
                  path={prop.layout + prop.path}
                  // path={menuURL?.length > 0 ? prop.layout + prop.path: "/nopagefound"}
                  component={prop.component}
                  key={key}
                />
              );
            })}
          </Suspense>
        </ErrorBoundary>
        <Footer {...props} />
      </div>
    </>
  );
};

export default AdminLayout;
