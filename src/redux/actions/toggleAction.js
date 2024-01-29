import { TOGGLE } from "../reducers/toggleReducer";

export const toggleFetch = (data) => {
  return {
    type: TOGGLE,
    payload: data,
  };
};

export const fetchToggle = (params) => {
  return (dispatch) => {
    dispatch(toggleFetch(params));
  };
};
