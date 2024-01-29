import { combineReducers } from "redux";
import DepartmentReducer from "./DepartmentReducer";
import toggleReducer from "./toggleReducer";
import CrudFormReducer from "./CrudFormReducer";
import AuthReducer from "./AuthReducer";

const allReducers = combineReducers({
  toggle: toggleReducer,
  department: DepartmentReducer,
  CrudFormReducer,
  AuthReducer,
});

export default allReducers;
