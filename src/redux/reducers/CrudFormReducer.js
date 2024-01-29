import {
  RESET_SEARCH_FIELDS,
  RESET_FORM_FIELDS,
  SET_ALL_CRUD_FROM_FIELDS,
  SET_CRUD_FROM_FIELDS,
  SET_CRUD_SEARCH_FIELDS,
  SET_INITIAL_DROPDOWN_FORM_STATE,
  SET_INITIAL_CRUD_FORM_STATE,
  TOGGLE_CRUD_FORM_TABLE_LOADING,
  SET_ALL_CRUD_SEARCH_FIELDS,
  SET_MULTI_CRUD_FORM_FIELD,
  SET_MULTI_CRUD_SEARCH_FIELD,
  SET_MULTI_CRUD_SUPPORTINGTABLE,
} from "../actionType/CrudActionTypes";

const initialState = {
  TableLoading: false,
  FormLoading: false,
  SearchFields: {},
  FormFields: {},
  TableList: [],
  SupportingTables: {},
};

const CrudFormReducer = (state = initialState, action) => {
  let { type, payload } = action;
  switch (type) {
    case TOGGLE_CRUD_FORM_TABLE_LOADING:
      return { ...state, TableLoading: !state.TableLoading };
    case TOGGLE_CRUD_FORM_TABLE_LOADING:
      return { ...state, FormLoading: !state.FormLoading };
    case SET_INITIAL_CRUD_FORM_STATE:
      return {
        ...state,
        TableList: payload.List,
        FormFields: payload.FormFields,
        SearchFields: payload.SearchFields,
      };
    case SET_INITIAL_DROPDOWN_FORM_STATE:
      return {
        ...state,
        SupportingTables: {
          ...state.SupportingTables,
          [payload.name]: payload.value,
        },
      };
    case SET_INITIAL_CRUD_FORM_STATE:
      return {
        ...state,
        TableList: payload.List,
        FormFields: payload.FormFields,
        SearchFields: payload.SearchFields,
      };
    case SET_CRUD_FROM_FIELDS:
      return {
        ...state,
        FormFields: { ...state.FormFields, [payload.name]: payload.value },
      };
    case SET_ALL_CRUD_FROM_FIELDS:
      return {
        ...state,
        FormFields: payload,
      };
    case SET_ALL_CRUD_SEARCH_FIELDS:
      return {
        ...state,
        SearchFields: payload,
      };
    case SET_CRUD_SEARCH_FIELDS:
      return {
        ...state,
        SearchFields: { ...state.SearchFields, [payload.name]: payload.value },
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
    case SET_MULTI_CRUD_FORM_FIELD:
      return {
        ...state,
        FormFields: { ...state.FormFields, ...payload },
      };
    case SET_MULTI_CRUD_SEARCH_FIELD:
      return {
        ...state,
        SearchFields: { ...state.SearchFields, ...payload },
      };
    case SET_MULTI_CRUD_SUPPORTINGTABLE:
      return {
        ...state,
        SupportingTables: {
          ...state.SupportingTables,
          ...payload,
        },
      };
    default:
      return { ...state };
  }
};

export default CrudFormReducer;
