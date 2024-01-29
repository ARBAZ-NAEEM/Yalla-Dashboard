import { FETCH_DEPARTMENT_FAILURE, FETCH_DEPARTMENT_REQUEST, FETCH_DEPARTMENT_SUCCESS } from "../actionType/DepartmentType"
const initialState = {
    loading: false,
    depart: [],
    error: ''
}   
const DepartmentReducer = (state = initialState, action) => {
    switch (action.type) {   
      case FETCH_DEPARTMENT_REQUEST:
        return {
          ...state,
          loading: true
        }
      case FETCH_DEPARTMENT_SUCCESS:
        return {
          loading: false,
          depart: action.payload,
          error: ''
        }
      case FETCH_DEPARTMENT_FAILURE:
        return {
          loading: false,
          depart: [],
          error: action.payload
        }
        
      default: return state
    }
  }
  
  export default DepartmentReducer