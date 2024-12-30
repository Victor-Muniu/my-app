import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../components/Applayout/AppLayout";
import MainLayout from "../components/maincomponents/MainLayout";
import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Purchases from "../pages/Purchases";
import ExpenseManagement from "../pages/ExpenseManagement";
import ChartOfAccounts from "../pages/ChartOfAccounts";
import GeneralLedger from "../pages/GeneralLedger";
import TrialBalance from "../pages/TrialBalance";
import Payroll from "../pages/Payroll";
import StaffDirectory from "../pages/StaffDirectory";
import CreditorsManagement from "../pages/CreditorsManagement";
import DailyCollections from "../pages/DailyCollections";
import AssetManagement from "../pages/AssetManagement";
import InventoryManagement from "../pages/InventoryManagement";
import BalanceSheet from "../pages/BalanceSheet";
import ProfitAndLoss from "../pages/ProfitAndLoss";
import DebtorsManagement from "../pages/DebtorsManagement";
import LeaveManagement from "../pages/LeaveManagement";
import SalesPerformers from "../pages/SalesPerformers";
import RoomStatus from "../pages/RoomStatus";
import SalesOverview from "../pages/SalesOverview";
import SupplierAddressBook from "../pages/SupplierAddressBook";
import LocalPurchaseOrders from "../pages/LocalPurchaseOrders";
import Restaurant from "../pages/Restaurant";
import Bar from "../pages/Bar";
import Podium from "../pages/Podium";
import RequisitionPage from "../pages/RequisitionPage";
import KOTManagerPage from "../pages/KOTManagerPage";
export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <Dashboard />
      }
    ]
  },
  {
    path: "/purchases",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <Purchases />
      }
    ]
  },
  {
    path: "/expense",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <ExpenseManagement />
      }
    ]
  },
  {
    path: "/chart_of_accounts",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <ChartOfAccounts />
      }
    ]
  },
  {
    path: "/general_ledger",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <GeneralLedger />
      }
    ]
  },
  {
    path: "/trial_balance",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <TrialBalance />
      }
    ]
  },
  {
    path: "/payroll",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <Payroll />
      }
    ]
  },
  {
    path: "/staff",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <StaffDirectory />
      }
    ]
  },
  {
    path: "/creditors",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <CreditorsManagement />
      }
    ]
  },
  {
    path: "/daily_collections",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <DailyCollections />
      }
    ]
  },
  {
    path: "/assets",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <AssetManagement />
      }
    ]
  },
  {
    path: "/inventory",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <InventoryManagement />
      }
    ]
  },
  {
    path: "/balance_sheet",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <BalanceSheet />
      }
    ]
  },
  {
    path: "/profit_loss",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <ProfitAndLoss />
      }
    ]
  },
  {
    path: "/debtors",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <DebtorsManagement />
      }
    ]
  },
  {
    path: "/leave",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <LeaveManagement />
      }
    ]
  },
  {
    path: "/podium",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <SalesPerformers />
      }
    ]
  },
  {
    path: "/room_status",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <RoomStatus />
      }
    ]
  },
  {
    path: "/sales",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <SalesOverview />
      }
    ]
  },
  {
    path: "/supplier_address",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <SupplierAddressBook />
      }
    ]
  },
  {
    path: "/lpo",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <LocalPurchaseOrders />
      }
    ]
  },
  {
    path: "/restaurant",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <Restaurant />
      }
    ]
  }, 
  {
    path: "/bar",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <Bar />
      }
    ]
  },
  {
    path: "/podium",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <Podium />
      }
    ]
  },
  {
    path: "/requisition_form",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <RequisitionPage />
      }
    ]
  },
  {
    path: "/kot",
    element: <ProtectedRoute element={<MainLayout />} />, 
    children: [
      {
        index: true,
        element: <KOTManagerPage />
      }
    ]
  }
]);
