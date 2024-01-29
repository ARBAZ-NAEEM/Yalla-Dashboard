import React from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { SET_INITIAL_DROPDOWN_FORM_STATE } from "../redux/actionType/CrudActionTypes";

export const GetUserIP = () => {
  const dispatch = useDispatch();
  axios
    .get(`https://geolocation-db.com/json/`)
    .then((res) => {
      let data = {
        name: "UserConnectionDetails",
        value: res.data,
      };
      dispatch({ type: SET_INITIAL_DROPDOWN_FORM_STATE, payload: data });
    })
    .catch((e) => {
      console.error(e);
    });
};

