import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import HomePage from "./page/HomePage";
import SignInPage from "./page/SignInPage";
import NotFoundPage from "./page/NotFoundPage";
import MainNavbar from "./layouts/navbar/MainNavbar";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./admin/page/DashboardPage";
import "./App.scss";
import SignUpPro from "./selector/formSelector/SignUpPro";
import Confirm from "./admin/page/Confirm";
import AdminSignInPage from "./admin/page/SignInPage";
import DashboardPage from "./admin/page/DashboardPage";
import ShowPieChart from "./admin/components/pieChart/ShowPieChart";

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider>
          <Routes>
            <Route path="/" Component={HomePage} />
            <Route path="*" Component={NotFoundPage} />

            <Route path="/signup" Component={SignUpPage} />
            <Route path="/signin" Component={SignInPage} />
            <Route path="/signup-pro" Component={SignUpPro} />

            {/* Admin */}

            <Route path="/admin/signin" Component={AdminSignInPage} />
            <Route path="/admin/dashboard" Component={DashboardPage} />
            <Route path="/admin/dashboard/confirm" Component={Confirm} />

            {/* Test */}
            <Route path="component" Component={MainNavbar} />
            <Route path="pie" Component={ShowPieChart} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
