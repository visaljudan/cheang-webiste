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
import AdminSignInPage from "./admin/page/SignInPage";
import DashboardPage from "./admin/page/DashboardPage";
import ShowPieChart from "./admin/components/pieChart/ShowPieChart";
import ConfirmPage from "./admin/page/ConfirmPage";
import ProfilePage from "./page/ProfilePage";
import AboutPage from "./page/AboutPage";
import UsersList from "./page/UsersListPage";
import SearchFilter from "./components/searchFilter/SearchFilter";

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
            <Route path="/about" Component={AboutPage} />
            <Route path="profile/:userId" Component={ProfilePage} />
            <Route path="userlist/:typeservice" Component={UsersList} />

            {/* Admin */}

            <Route path="/admin/signin" Component={AdminSignInPage} />
            <Route path="/admin/dashboard" Component={DashboardPage} />
            <Route path="/admin/dashboard/confirm" Component={ConfirmPage} />

            {/* Test */}
            <Route path="test" Component={SearchFilter} />
            <Route path="pie" Component={ShowPieChart} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
