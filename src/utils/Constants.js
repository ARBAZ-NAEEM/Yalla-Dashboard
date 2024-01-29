import { InsertData_Followup } from "./CommonMethods";

export const ApiMethods = {
  CrudUser: "CrudUser"
};

export const ControllerName = {
  User: "User"
};
export const SetupMasterIds = {
  DocumentParentTypes: 2,
  DocumentSubTypes: 3,
  Province: 4,
  City: 5,
  Union: 6,
  Council: 7,
  Village_Muhalla: 8,
  Gender: 9,
  NatureOfCase: 10,
  MaritalStatus: 11,
  Relation: 12,
  Expense: 13,
  Occupation: 14,
  Referrer: 15,
  Pets: 16,
  SourceOfDrinking: 17,
  LoanType: 18,
  AssetStatus: 19,
  AssetsType: 20,
  SupportingDocuments: 21,
  AcademicLevel: 23,
  AcceptanceOfCharity: 24,
  Diseases: 25,
  DonationType: 26,
  HomeApplaince: 27,
  Disability: 28,
  Country: 29,
  District: 30,
  Religion: 31,
  Bank: 33,
  Category: 34,
  FundCategory: 35,
  ComapnyFamily: 39,
  ReferrerCategory: 41,
  JobStatus: 45,
  Degree: 46,
  CurrentClassSemester: 47,
  FeesPeriod: 48,
  ContactType: 1046,
  FundSubCategory: 36,
  Frequency: 37,
  PaymentType: 38,
  CompanyFamily: 39,
  FollowUp: 40,
  ReferrerType: 1047,
  AssetSubType: 1051,
  GeneralDonation: 1052,
  Currency: 1053,
  LearnAbout: 1055,
  PreferredArea: 1056,
  CaseStatus: 1057,
  SupportStatus: 1063,
  MedicalCard: 1064,
  PaymentStatus: 1068,
  PaymentList: 1069,
  Qualification: 23,
  DontationCategory: 1071,
  PaymentTypeDetail: 1072,
  PKR: 310,
  DonationCat_Donor: 725,
  PaymentType_Cheque: 736,
  CaseSupportStatusApproved: 415,
  CaseSupportStatusReject: 416,
  DEBITCREDITCARDNO: 869,
  CASH: 735
};

export const SetupMasterDetailsConstantsValues = {
  Applicant: 1,
  Employee: 2,
  Company: 3,
  CompanyFamily: 4,
  FrequencyOneTime: 642
};

export const Roles = {
  SuperAdmin: 1,
  InvestigatingOfficer: 3,
  HOD: 11,
  Trustee: 12,
  Audit: 14,
  Accounts: 15,
  FrontDesk: 16,
  Marketing: 17
};

export const TabNo = {
  FirstTab: "1",
  SecondTab: "2",
  ThirdTab: "3",
  FourthTab: "4",
  FifthTab: "5",
  SixthTab: "6",
  SeventhTab: "7"
};
export const SubTabNo = {
  First_FirstTab: "11",
  First_SecondTab: "12",
  First_ThirdTab: "13",
  First_FourthTab: "14",
  Second_FirstTab: "21",
  Second_SecondTab: "22",
  Second_ThirdTab: "23",
  Second_FourthTab: "24",
  Second_FifthTab: "25",
  Second_SixthTab: "26",
  Third_FirstTab: "31",
  Third_SecondTab: "31"
};
export const HomeApplainceConst = {
  AssetTypeId: 5,
  Own: 6
};
export const PaymentMethod = {
  BankId: 743,
  ElectronicId: 738,
  ReadyToDisbursed: 659
};

export const CaseStatuses = {
  Assigned_Investigator: 343,
  Unassigned: 344,
  Closed: 409,
  Re_Investigation: 410,
  Terminated: 411,
  Submitted_Investigator: 472,
  Submitted_HOD: 474,
  Objection_HOD: 476,
  Approved_Trustee: 480,
  Objection_Trustee: 481,
  Rejected: 626,
  Case_Hold_Trustee: 746,
  Objection_Auditor: 747,
  Objection_Accounts: 748
};

export const BaseAPIURL = "http://localhost:42750/api";

export const PasswordStrength = new RegExp(
  "^(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
);

export const STATUS_TYPE = {
  Normal: "Normal",
  Supply: "Suppli"
};
