import React from "react";
import axios from "axios";
import { BASE_URL, BASE_URL_YALLA } from "./Api";
import { decryptData } from "../EncryptData";
import { TOKEN, UserNetworkInfo } from "./EncryptedConstants";
import { SessionStorage } from "../common/SetupMasterEnum";

export const JsonInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${decryptData(TOKEN, SessionStorage)}`,
    sub: decryptData(UserNetworkInfo)?.IPv4,
  },
});

export const JsonGetInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `token ${decryptData(TOKEN, SessionStorage)}`,
    sub: decryptData(UserNetworkInfo)?.IPv4,
  },
});

export const FormInstance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  headers: {
    "Content-Type": "application/multipart",
    Authorization: `token ${decryptData(TOKEN, SessionStorage)}`,
    sub: decryptData(UserNetworkInfo)?.IPv4,
  },
});

export const PostRequest = (url, data) => {
  return JsonInstance.post(url, data);
};

export const GetRequest = (url, data) => {
  return JsonGetInstance.get(url, data);
};

export const PatchFormRequest = (url, formData) => {
  return FormInstance.patch(url, formData);
};

export const PostFormRequest = (url, formData) => {
  return FormInstance.post(url, formData);
};

// PostRequest('/Setup/Setup_FIN_COA', data).then(res => {})
// PostFormRequest("/Setup/Setup_FIN_COA", formData).then((res) => {});

//Finance_Setups

export const Setup_Setup_FIN_COA = (payload) => {
  return axios.post(`${BASE_URL}/Setup/Setup_FIN_COA`, payload);
};

//Finance Account Nature Api
export const Setup_AccountNature = (payload) => {
  return axios.post(`${BASE_URL}/BPS/SetupAccountNature`, payload);
};

//Finance Journal Api
export const Setup_Journal = (payload) => {
  return axios.post(`${BASE_URL}/BPS/SetupJournals`, payload);
};

//Finance Payment Voucher

export const Finance_FIN_HeadAccountsList = (payload) => {
  return axios.post(`${BASE_URL}/Finance/FIN_HeadAccountsList`, payload);
};

export const Finance_PaymentModel = (payload) => {
  return axios.post(`${BASE_URL}/Finance/PaymentModel`, payload);
};

//SetupMasterDetials
export const Setup_MasterDetails_Operation = (payload) => {
  return axios.post(`${BASE_URL}/Setup/MasterDetail_Operation`, payload);
};
export const Setup_LeaveDefinition_Operations = (payload) => {
  return axios.post(`${BASE_URL}/Setup/LeaveDefinition_Operations`, payload);
};

export const Setup_MasterDetails_All_Dropdowns = (payload) => {
  return axios.post(`${BASE_URL}/Setup/MasterDetail_All_DropDown`, payload);
};

export const Setup_Setup_ADM_SeatType = (payload) => {
  return axios.post(`${BASE_URL}/Setup/Setup_ADM_SeatType`, payload);
};
export const Acad_SetupCourse = (payload) => {
  return axios.post(`${BASE_URL}/Academics/Acad_SetupCourse`, payload);
};

export const Setup_ADM_CourseSMappinge = (payload) => {
  return axios.post(`${BASE_URL}/Setup/Setup_ADM_CourseSMapping`, payload);
};
export const Finance_GLReport = (payload) => {
  return axios.post(`${BASE_URL}/Finance/GLReport`, payload);
};

//Login with menu
export const SecuritySetup_RoleOperation = (payload) => {
  return axios.post(`${BASE_URL}/SecuritySetup/RoleOperation`, payload);
};
//Login with menu
export const SecuritySetup_Authenticate = (id, password) => {
  return axios.get(`${BASE_URL}/SecuritySetup/Authenticate/${id}/${password}`);
};

export const Setup_GetEmployeeProfile = () => {
  return axios.get(`${BASE_URL}/Setup/GetEmployeeProfile`);
};
export const Setup_GetEmployeeProfileById = (id) => {
  return axios.get(`${BASE_URL}/Setup/GetEmployeeProfileById?employeeId=${id}`);
};
export const Setup_SearchEmployee = (payload) => {
  return axios.post(`${BASE_URL}/Setup/SearchEmployee`, payload);
};
export const Setup_CreateEmployee = (data, data1) => {
  const formData = new FormData();
  Object.keys(data).forEach((d) => {
    formData.append(d, data[d]);
  });
  // formData.append("Data", JSON.stringify(data));
  formData.append("pictureName", data1);
  return axios.post(`${BASE_URL}/Setup/CreateEmployee`, formData, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
export const SecuritySetup_GetApplications = (payload) => {
  return axios.post(`${BASE_URL}/SecuritySetup/GetApplications`, payload);
};

export const Setup_MenuItem_Operation = (payload) => {
  return axios.post(`${BASE_URL}/Setup/MenuItem_Operation`, payload);
};

export const Setup_UpdateEmployee = (payload) => {
  return axios.post(`${BASE_URL}/Setup/UpdateEmployee`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const SecuritySetup_AccessControlOprtations = (payload) => {
  return axios.post(
    `${BASE_URL}/SecuritySetup/AccessControlOprtations`,
    payload
  );
};

export const SecuritySetup_UserRoleApplicationMapping = (payload) => {
  return axios.post(
    `${BASE_URL}/SecuritySetup/UserRoleApplicationMapping`,
    payload
  );
};
export const Setup_ReportingTo = (payload) => {
  return axios.get(`${BASE_URL}/Setup/ReportingTo/${payload}`);
};
export const SecuritySetup_ResetPassword = (payload) => {
  return axios.post(`${BASE_URL}/SecuritySetup/ResetPassword`, payload);
};
export const Setup_UpdateProfileImage = (payload) => {
  return axios.post(`${BASE_URL}/Setup/UploadEmployeeProfile`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const Setup_ShiftTiming = () => {
  return axios.post(`${BASE_URL}/Setup/GetEmpShift`);
};

export const Setup_UpdateEmployeeProfilePicture = (payload) => {
  return axios.post(`${BASE_URL}/Setup/UploadEmployeePicture`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
export const Setup_Admission_Blocks = (payload) => {
  return axios.post(`${BASE_URL}/Setup/Setup_Blocks`, payload);
};
export const Setup_Admission_Assign_Block = (payload) => {
  return axios.post(`${BASE_URL}/Setup/AssignBlock`, payload);
};
export const Setup_Admission_Score_Criteria = (payload) => {
  return axios.post(`${BASE_URL}/Setup/ScoreCalculationCriteria`, payload);
};
export const Setup_SetupMarks = (payload) => {
  return axios.post(`${BASE_URL}/Setup/SetupMarks`, payload);
};
export const Setup_AdmissionEligibilty = (payload) => {
  return axios.post(`${BASE_URL}/Setup/SetAdmissionEligibility`, payload);
};
export const Setup_CreateSetupDetail = (payload) => {
  return axios.post(`${BASE_URL}/Setup/CreateSetupDetail`, payload);
};
export const Setup_Dashboard = (payload) => {
  return axios.get(`${BASE_URL}/Setup/GetDashboard`);
};
export const Setup_ADM_FacultyDerpartmentFeeStructure = (payload) => {
  return axios.post(`${BASE_URL}/Setup/Setup_ADM_FeeStructureProgram`, payload);
};
export const Setup_Admission_AcademicYear = (payload) => {
  return axios.post(`${BASE_URL}/Admission/CreateAcademicYear`, payload);
};
export const Setup_Work_Permit = (payload) => {
  return axios.post(`${BASE_URL_YALLA}forms/permit_super/`, payload);
};
export const Setup_CRUD_OTP = (payload) => {
  return axios.post(
    `${BASE_URL}/Setup/OTP_Email_Password_Del_Operations`,
    payload
  );
};

export const ADM_SetupMeritParameter = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_SetupMeritParameter`, payload);
};

export const ADM_SecureAdmissionSeatsFacultyWise = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/ADM_SecureAdmissionSeatsFacultyWise`,
    payload
  );
};

// TMS
export const TMS_Leave_Applied_Operations = (payload) => {
  return axios.post(`${BASE_URL}/TMS/Leave_Applied_Operations`, payload);
};

// TMS
export const TMS_GetShift = (payload) => {
  return axios.post(`${BASE_URL}/TMS/GetShift`, payload);
};

export const SecuritySetup_Employee_Hierarchical_Operations = (payload) => {
  return axios.post(
    `${BASE_URL}/SecuritySetup/Employee_Hierarchical_Operations`,
    payload
  );
};

export const TMS_TMS_Employee_Leave_History = (payload) => {
  return axios.post(`${BASE_URL}/TMS/TMS_Employee_Leave_History`, payload);
};

export const TMS_UpdateShift = (payload) => {
  return axios.post(`${BASE_URL}/TMS/UpdateShift`, payload);
};

export const TMS_ViewCalendarMonth = (payload) => {
  return axios.post(`${BASE_URL}/TMS/ViewCalendarMonth`, payload);
};
export const TMS_GetDayTypeList = (payload) => {
  return axios.post(`${BASE_URL}/TMS/GetDaytypeList`, payload);
};

export const TMS_UpdateCalendar = (payload) => {
  return axios.post(`${BASE_URL}/TMS/UpdateEmpCalender`, payload);
};

export const TMS_TMS_Employee_TimeAdjustmentRequest = (payload) => {
  return axios.post(
    `${BASE_URL}/TMS/TMS_Employee_TimeAdjustmentRequest`,
    payload
  );
};

export const TMS_TMS_Incharge_TimeAdjustmentRequest = (payload) => {
  return axios.post(
    `${BASE_URL}/TMS/TMS_Incharge_TimeAdjustmentRequest`,
    payload
  );
};

export const TMS_Attendance_Stats = (payload) => {
  return axios.get(`${BASE_URL}/TMS/GetAttendanceStats/${payload}`);
};
export const TMS_EmployeeWebSignInOut = (payload) => {
  return axios.post(`${BASE_URL}/TMS/TMS_EmployeeWebSignInOut`, payload);
};

export const TMS_TMS_Employee_DailyActivity_In_Out_Report = (payload) => {
  return axios.post(
    `${BASE_URL}/TMS/TMS_Employee_DailyActivity_In_Out_Report`,
    payload
  );
};

export const TMS_TMS_Employee_TimeAdjustmentRequestt = (payload) => {
  return axios.post(
    `${BASE_URL}/TMS/TMS_Employee_TimeAdjustmentRequest`,
    payload
  );
};
export const TMS_Incharge_WebSignInOut = (payload) => {
  return axios.post(`${BASE_URL}/TMS/AssignWebSignInOut`, payload);
};
export const TMS_GetWebSignInOutAccess = (payload) => {
  return axios.get(`${BASE_URL}/TMS/GetWebSignInOutAccess/${payload}`);
};

// Dashboard

//Reset Credentials
export const SecuritySetup_ForgetCredentials = (payload) => {
  return axios.post(`${BASE_URL}/SecuritySetup/ForgetCredentials`, payload);
};

// Admission_Apis

export const ADM_ManualSeatConsideration = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/ADM_ManualSeatConsideration`,
    payload
  );
};

export const ADM_AddQuota = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_AddQuota`, payload);
};

export const ADM_AddManualPreferences = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_AddManualPreferences`, payload);
};

export const ADM_Approved_Reject_SelfFinance = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/ADM_Approved_Reject_SelfFinance`,
    payload
  );
};
export const ADM_Registered_Candidates = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_Registered_Candidates`, payload);
};

export const ADM_EligibilityCriteriaDependency = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/ADM_EligibilityCriteriaDependency`,
    payload
  );
};

export const ADM_Department_Program_Candidate_Report = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/ADM_Department_Program_Candidate_Report`,
    payload
  );
};

export const Admission_ADM_DashBoard = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_DashBoard`, payload);
};

export const Admission_ADM_Registration = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_Registration`, payload);
};
export const Admission_GetStudendAdmissionRecord = (ADMRegId, Programid) => {
  return axios.post(
    `${BASE_URL}/Admission/GetStudentAdmissionRecord/${ADMRegId}/${Programid}`
  );
};
export const Admision_CreateAdmissionRecord = (payload) => {
  return axios.post(`${BASE_URL}/Admission/CreatAdimissionRecord`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
export const Admission_GetRegisterRecords = (payload) => {
  return axios.post(`${BASE_URL}/Admission/GetRegisteredRecords`, payload);
};
export const Admission_UpdateRegistrationRecord = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/StudentRegistrationApproval`,
    payload
  );
};

export const Admission_ADMUploadFeeChallan = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADMUploadFeeChallan`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};

export const Admission_ADM_CandidateStatus = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_CandidateStatus`, payload);
};

export const Admission_PrintAdmissionForm = (ADMRegId, Programid) => {
  return axios.post(
    `${BASE_URL}/Admission/PrintAdmissionForm/${ADMRegId}/${Programid}`
  );
};
export const Admission_OMR_Record = (payload) => {
  return axios.post(`${BASE_URL}/Admission/OMRRecord`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
export const Admission_SamplePaper = (payload) => {
  return axios.post(`${BASE_URL}/Admission/SamplePaper`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
export const Admission_InterviewScreening = (payload) => {
  return axios.post(`${BASE_URL}/Admission/InterviewScreening`, payload);
};
export const Admission_Scheduler = (payload) => {
  return axios.post(`${BASE_URL}/Admission/AdmissionSchedule`, payload);
};

export const Admission_UpdateFeeChallan = (payload) => {
  return axios.post(`${BASE_URL}/Admission/UpdateFeeChallan`, payload);
};
export const Admission_CandidateList = (payload) => {
  return axios.get(`${BASE_URL}/Admission/GetCandidateListDropdown`, payload);
};
export const Admission_Exam = (payload) => {
  return axios.post(`${BASE_URL}/Admission/CreateExam`, payload);
};
export const Admission_Schedule_Records = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/AdmissionScheduleForAdmission`,
    payload
  );
};
export const Admission_Description = (payload) => {
  return axios.post(`${BASE_URL}/Admission/CreateDescription`, payload);
};

export const Admission_MeritList = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_OpenMeritList`, payload);
};

export const Approved_Reject_MeritList = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/ADM_Approved_RejectMeritList`,
    payload
  );
};

export const ADM_AdmissionSecureStudent = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/ADM_AdmissionSecureStudent`,
    payload
  );
};

export const ADM_PrintTestSlip = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_PrintTestSlip`, payload);
};

export const ADM_PrintVoucher = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_PrintVoucher`, payload);
};

export const ADM_GenerateMeritListOps = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_GenerateMeritListOps`, payload);
};

export const ADM_AddManualOPMLSeatAllocation = (payload) => {
  return axios.post(
    `${BASE_URL}/Admission/ADM_AddManualOPMLSeatAllocation`,
    payload
  );
};

export const ADM_ADM_OfferedPrograms = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_ADM_OfferedPrograms`, payload);
};

export const ADM_SetupTestTimeDetail = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_SetupTestTimeDetail`, payload);
};

export const ADM_Update_PersonalInfo = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_Update_PersonalInfo`, payload, {
    headers: {
      "content-type": "multipart/form-data",
    },
  });
};
//Admission Setups API

export const ADM_SetupMeritScore = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_SetupMeritScore`, payload);
};

//Report

export const Report_CandidateStatus = (payload) => {
  return axios.post(`${BASE_URL}/Reports/CandidateStatusReport`, payload);
};

//CandidateForgetPassword

export const Admission_ADM_ForgetPassword = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_ForgetPassword`, payload);
};

//Hostel
export const Hostel_MangeHostel = (payload) => {
  return axios.post(`${BASE_URL}/Hostel/ManageHostel`, payload);
};
export const Hostel_HostelRoom = (payload) => {
  return axios.post(`${BASE_URL}/Hostel/HostelRoom`, payload);
};
export const Hostel_HostelInstruction = (payload) => {
  return axios.post(`${BASE_URL}/Hostel/HostelInstruction`, payload);
};

//Challan
export const Admission_ADM_UG_VoucherDetails = (payload) => {
  return axios.post(`${BASE_URL}/Admission/ADM_UG_VoucherDetails`, payload);
};

//Academic Setup

export const Acad_SetupLecturer = (payload) => {
  return axios.post(`${BASE_URL}/Academics/Acad_SetupLecturer`, payload);
};

export const Acad_SetupTimeSlots = (payload) => {
  return axios.post(`${BASE_URL}/Academics/Acad_SetupTimeSlots`, payload);
};

export const Acad_StudentDetailOps = (payload) => {
  return axios.post(`${BASE_URL}/Academics/Acad_StudentDetailOps`, payload);
};

export const Acad_SuppleImprovement = (payload) => {
  return axios.post(`${BASE_URL}/Academics/SuppleImprovement`, payload);
};
