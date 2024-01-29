import axios from "axios"
import { FETCH_DEPARTMENT_FAILURE, FETCH_DEPARTMENT_REQUEST, FETCH_DEPARTMENT_SUCCESS} from "../actionType/DepartmentType"
import { BASE_URL_SETUP } from "../../utils/Api"

export const fetchDepartmentRequest = () => {
    return {
        type: FETCH_DEPARTMENT_REQUEST
    }
}
export const fetchDepartmentSuccess = depart => {
    return {
        type: FETCH_DEPARTMENT_SUCCESS,
        payload: depart
    }
}
export const fetchDepartmentFailure = error => {
    return {
        type: FETCH_DEPARTMENT_FAILURE,
        payload: error
    }
}

     
// Post Depart
export const departmentCRUD = (data) => {
    return (dispatch) =>{
        dispatch(fetchDepartmentRequest)
        axios
        .post(BASE_URL_SETUP + "/CreateDepartment",data)
        .then((response) => {
            dispatch(fetchDepartmentSuccess())
        })
        .catch(error =>{
            const errorMsg = error.message
            dispatch(fetchDepartmentFailure(errorMsg))
        })
    }
}