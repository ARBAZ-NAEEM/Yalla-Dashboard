import React from "react";
import PayableThisFiscalYearReport from "../pages/Finance/Reports/Payable/PayableThisFiscalYearReport/PayableThisFiscalYearReport";

const Dashboard = React.lazy(() => import("../pages/Dashboard"));
const NoPageFound = React.lazy(() => import("../pages/NoPageFound"));
const WorkPermit = React.lazy(() => import("../pages/WorkPermit"));

const Users = React.lazy(() => import("../pages/Setup/Users"));
const Contracts = React.lazy(() => import("../pages/Payroll/Contracts"));
const PayslipStatus = React.lazy(() =>
  import("../pages/Payroll/PayslipStatus")
);
const ChangePassword = React.lazy(() => import("../pages/ChangePassword"));
const PayrollStats = React.lazy(() => import("../pages/Payroll/PayrollStats"));
const ResetPassword = React.lazy(() => import("../pages/ResetPasswordModal"));

//Finance Maintain
const Roles = React.lazy(() => import("../pages/Finance/Maintain//Roles"));
const Menu = React.lazy(() => import("../pages/Finance/Maintain/Menu"));
const AccessConrol = React.lazy(() =>
  import("../pages/Finance/Maintain/AccessControl")
);
const CostCenter = React.lazy(() =>
  import("../pages/Finance/Maintain/CostCenter")
);
const UserRoleAllocation = React.lazy(() =>
  import("../pages/Finance/Maintain/UserRoleAllocation")
);

//Finance Imports
const PaymentVoucher = React.lazy(() =>
  import("../pages/Finance/Transactions/PaymentVoucher")
);
const ReceiptVoucher = React.lazy(() =>
  import("../pages/Finance/Transactions/ReceiptVoucher")
);
// const GeneralLedger = React.lazy(() =>
//   import("../pages/Finance/GeneralLegder")
// );
// const GeneralLedgerReport = React.lazy(() =>
//   import("../pages/Finance/Reports/GeneralLedgerReport")
// );
const ReceivablesAndPayablesReport = React.lazy(() =>
  import("../pages/Finance/Reports/ReceivablesAndPayablesReport")
);
const CashbookReport = React.lazy(() =>
  import("../pages/Finance/Reports/CashbookReport")
);
const CreateInvoice = React.lazy(() =>
  import("../pages/Finance/CreateInvoice")
);
const Journals = React.lazy(() => import("../pages/Finance/Maintain/Journals"));
const ChartOfAccounts = React.lazy(() =>
  import("../pages/Finance/Maintain/ChartOfAccount")
);
const AccountNature = React.lazy(() =>
  import("../pages/Finance/Maintain/AccountNature")
);
const TransactionType = React.lazy(() =>
  import("../pages/Finance/Maintain/TransactionType")
);
const CustomerSetup = React.lazy(() =>
  import("../pages/Finance/Maintain/CustomerSetup")
);
const VendorSetup = React.lazy(() =>
  import("../pages/Finance/Maintain/VendorSetup")
);
const JournalVouchers = React.lazy(() =>
  import("../pages/Finance/Transactions/JournalVouchers")
);
const Company = React.lazy(() => import("../pages/Finance/Maintain/Company"));
const Period = React.lazy(() => import("../pages/Finance/Maintain/Period"));
const FiscalYear = React.lazy(() =>
  import("../pages/Finance/Maintain/FiscalYear")
);
const PeriodFYCompanyMapping = React.lazy(() =>
  import("../pages/Finance/Maintain/PeriodFYCompanyMapping")
);

const AddUser = React.lazy(() => import("../pages/Finance/Maintain/AddUser"));
const SaleInvoiceVouchers = React.lazy(() =>
  import("../pages/Finance/Transactions/SaleInvoiceVouchers")
);
const DebitNote = React.lazy(() =>
  import("../pages/Finance/Transactions/DebitNote")
);
const CreditNote = React.lazy(() =>
  import("../pages/Finance/Transactions/CreditNote")
);
const PurchaseInvoiceVoucher = React.lazy(() =>
  import("../pages/Finance/Transactions/PurchaseInvoiceVoucher")
);
const VoucherApproval = React.lazy(() =>
  import("../pages/Finance/Transactions/VoucherApproval")
);

//Reports Imports Started
const JournalTransactions = React.lazy(() =>
  import("../pages/Finance/Reports/JournalsTransactions/JournalTransactions")
);
const TrailBalance = React.lazy(() =>
  import("../pages/Finance/Reports/TrailBalance/TrailBalance")
);

const ReceivablesThisFiscalYear = React.lazy(() =>
  import("../pages/Finance/Reports/Receivables/ReceivablesThisFiscalYear")
);
const PayableThisFiscalYear = React.lazy(() =>
  import("../pages/Finance/Reports/Payable/PayableThisFiscalYear")
);
const GeneralLedger = React.lazy(() =>
  import("../pages/Finance/Reports/GeneralLedger/GeneralLedger")
);
const BalanceSheet = React.lazy(() =>
  import("../pages/Finance/Reports/BalanceSheet/BalanceSheet")
);
const laborwelfare = React.lazy(() => import("../pages/LaborWelfare"));
const SaveWorkPermit = React.lazy(() => import("../pages/SaveWorkPermit"));
const HseCompliance = React.lazy(() => import("../pages/HseCompliance"));
const SafetyHealth = React.lazy(() => import("../pages/SafetyHealth"));
//Reports Imports Ended

var AdminRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-single-02",
    component: Dashboard,
    layout: "/pages",
  },
  {
    path: "/users",
    name: "Users",
    icon: "nc-icon nc-single-02",
    component: Users,
    layout: "/pages/setup",
  },

  {
    path: "/costcenter",
    name: "CostCenter",
    icon: "nc-icon nc-single-02",
    component: CostCenter,
    layout: "/pages/finance/maintain",
  },

  {
    path: "/chartofaccounts",
    icon: "fa fa-download",
    component: ChartOfAccounts,
    layout: "/pages/finance/maintain",
  },

  //   Payroll Routes
  {
    path: "/contracts",
    name: "Contracts",
    icon: "nc-icon nc-single-02",
    component: Contracts,
    layout: "/pages/payroll",
  },
  {
    path: "/payslipstatus",
    name: "Payslip Status",
    icon: "fa fa-download",
    component: PayslipStatus,
    layout: "/pages/payroll",
  },
  {
    path: "/payrollstats",
    name: "Payroll Stats",
    icon: "fa fa-download",
    component: PayrollStats,
    layout: "/pages/payroll",
  },

  //Finance Routes

  {
    path: "/paymentvouchers",
    icon: "fa fa-download",
    component: PaymentVoucher,
    layout: "/pages/finance/transactions",
  },
  {
    path: "/receiptvouchers",
    icon: "fa fa-download",
    component: ReceiptVoucher,
    layout: "/pages/finance/transactions",
  },
  // {
  //   path: "/generalledgerreport",
  //   icon: "fa fa-download",
  //   component: GeneralLedgerReport,
  //   layout: "/pages/finance",
  // },
  // {
  //   path: "/generalledger",
  //   icon: "fa fa-download",
  //   component: GeneralLedger,
  //   layout: "/pages/finance",
  // },
  {
    path: "/receivablesandpayablesreport",
    icon: "fa fa-download",
    component: ReceivablesAndPayablesReport,
    layout: "/pages/finance",
  },
  {
    path: "/cashbookreport",
    icon: "fa fa-download",
    component: CashbookReport,
    layout: "/pages/finance",
  },
  {
    path: "/createinvoice",
    icon: "fa fa-download",
    component: CreateInvoice,
    layout: "/pages/finance",
  },
  {
    path: "/adduser",
    icon: "fa fa-download",
    component: AddUser,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/journals",
    icon: "fa fa-download",
    component: Journals,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/roles",
    icon: "fa fa-download",
    component: Roles,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/menu",
    name: "Menu",
    icon: "nc-icon nc-single-02",
    component: Menu,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/accountnature",
    icon: "fa fa-download",
    component: AccountNature,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/transactiontype",
    icon: "fa fa-download",
    component: TransactionType,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/customer",
    icon: "fa fa-download",
    component: CustomerSetup,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/vendor",
    icon: "fa fa-download",
    component: VendorSetup,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/accesscontrol",
    icon: "fa fa-download",
    component: AccessConrol,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/userroleallocation",
    icon: "fa fa-download",
    component: UserRoleAllocation,
    layout: "/pages/finance/maintain",
  },

  {
    path: "/journalvoucher",
    icon: "fa fa-download",
    component: JournalVouchers,
    layout: "/pages/finance/transactions",
  },
  {
    path: "/purchaseinvoicevoucher",
    icon: "fa fa-download",
    component: PurchaseInvoiceVoucher,
    layout: "/pages/finance/transactions",
  },
  {
    path: "/debitnote",
    icon: "fa fa-download",
    component: DebitNote,
    layout: "/pages/finance/transactions",
  },
  {
    path: "/creditnote",
    icon: "fa fa-download",
    component: CreditNote,
    layout: "/pages/finance/transactions",
  },
  {
    path: "/voucherapproval",
    icon: "fa fa-download",
    component: VoucherApproval,
    layout: "/pages/finance/transactions",
  },

  //Maintain Started
  {
    path: "/company",
    icon: "fa fa-download",
    component: Company,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/saleinvoicevouchers",
    icon: "fa fa-download",
    component: SaleInvoiceVouchers,
    layout: "/pages/finance/transactions",
  },
  {
    path: "/period",
    icon: "fa fa-download",
    component: Period,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/fiscalyear",
    icon: "fa fa-download",
    component: FiscalYear,
    layout: "/pages/finance/maintain",
  },
  {
    path: "/periodfycompanymapping",
    icon: "fa fa-download",
    component: PeriodFYCompanyMapping,
    layout: "/pages/finance/maintain",
  },

  //Reports

  {
    path: "/journaltransactions",
    icon: "fa fa-download",
    component: JournalTransactions,
    layout: "/pages/finance/reports",
  },
  {
    path: "/trailbalance",
    icon: "fa fa-download",
    component: TrailBalance,
    layout: "/pages/finance/reports/trailbalance",
  },
  {
    path: "/receivablethisfiscalyear",
    icon: "fa fa-download",
    component: ReceivablesThisFiscalYear,
    layout: "/pages/finance/reports/receivables",
  },
  {
    path: "/payablethisfiscalyear",
    icon: "fa fa-download",
    component: PayableThisFiscalYear,
    layout: "/pages/finance/reports",
  },
  {
    path: "/payablethisfiscalyearreport",
    icon: "fa fa-download",
    component: PayableThisFiscalYearReport,
    layout: "/pages/finance/reports",
  },
  {
    path: "/generalledger",
    icon: "fa fa-download",
    component: GeneralLedger,
    layout: "/pages/finance/reports",
  },
  {
    path: "/balancesheet",
    icon: "fa fa-download",
    component: BalanceSheet,
    layout: "/pages/finance/reports",
  },

  //Reports End
  {
    path: "/changepassword",
    name: "Change Password",
    icon: "fa fa-download",
    component: ChangePassword,
    layout: "/pages",
  },
  {
    path: "/resetpassword",
    name: "Change Password",
    icon: "fa fa-download",
    component: ResetPassword,
    layout: "/pages",
  },
  {
    path: "/nopagefound",
    name: "No Page Found",
    component: NoPageFound,
    layout: "/pages",
  },

  {
    path: "/WorkPermit",
    name: "No Page Found",
    component: WorkPermit,
    layout: "/pages",
  },
  {
    path: "/laborwelfare",
    name: "No Page Found",
    component: laborwelfare,
    layout: "/pages",
  },
  {
    path: "/SaveWorkPermit",
    name: "No Page Found",
    component: SaveWorkPermit,
    layout: "/pages",
  },
  {
    path: "/HseCompliance",
    name: "No Page Found",
    component: HseCompliance,
    layout: "/pages",
  },
  {
    path: "/SafetyHealth",
    name: "No Page Found",
    component: SafetyHealth,
    layout: "/pages",
  },
];

export default AdminRoutes;
