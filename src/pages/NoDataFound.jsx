import React, { useEffect } from "react";
import {useLocation } from "react-router-dom";
import { Container } from "reactstrap";
import Welcome from "../components/AdminComponent/Welcome";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { fetchToggle } from "../redux/actions/toggleAction";
// import { fetchToggle } from "../redux/actions/toggleAction";

const NoDataFound = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const toggleData = useSelector((state) => state.toggle);
  useEffect(() => {
    dispatch(fetchToggle());
  }, []);
  useEffect(() => {
    document.scrollingElement.scrollTop = 0;
  }, [location]);
  return (
    <>
      <Header />

      <div
        className={
          toggleData.toggle ? "after-toggle page-wrapper" : "page-wrapper"
        }
      >
        <Container fluid>
          <Welcome />
        </Container>
        <h3 className="text-center no-page-found">No Page Found</h3>
        <Footer />
      </div>
    </>
  );
};

export default NoDataFound;
