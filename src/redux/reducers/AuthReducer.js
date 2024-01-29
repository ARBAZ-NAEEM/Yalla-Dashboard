import {
  LOG_IN,
  LOG_OUT,
  SET_CRUD_FROM_FIELDS,
  RESET_FORM_FIELDS,
  SET_SELECTED_MENU,
  SET_CRUD_SEARCH_FIELDS,
  RESET_SEARCH_FIELDS,
} from "../actionType/AuthType";

const initialState = {
  loggedIn: false,
  loginId: null,
  FormFields: {},
  token: null,
  expiry: null,
  menuTable: {},
  selectedMenu: null,
};

const AuthReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case SET_CRUD_FROM_FIELDS:
      return {
        ...state,
        FormFields: { ...state.FormFields, [payload.name]: payload.value },
      };
      case SET_CRUD_SEARCH_FIELDS:
      return {
        ...state,
        SearchFields: { ...state.SearchFields, [payload.name]: payload.value },
      };
    case LOG_IN:
      return {
        ...state,
        loggedIn: true,
        loginId: payload.loginId,
        menuTable: payload.menuTable,
        token: payload.token,
        expiry: payload.expiry,
      };
    case LOG_OUT:
      return {
        ...state,
        loggedIn: false,
        loginId: null,
        menuTable: null,
        token: null,
        expiry: null,
      };
    case RESET_FORM_FIELDS:
      return {
        ...state,
        FormFields: payload,
      };
      case RESET_SEARCH_FIELDS:
      return {
        ...state,
        SearchFields: payload,
      };
    case SET_SELECTED_MENU:
      return {
        ...state,
        selectedMenu: payload,
      };
    default:
      return { ...state };
  }
};

export default AuthReducer;
