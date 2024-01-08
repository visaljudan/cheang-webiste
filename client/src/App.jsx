import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import HomePage from "./page/HomePage";
import SignInPage from "./page/SignInPage";
import NotFoundPage from "./page/NotFoundPage";
import MainNavbar from "./layouts/navbar/MainNavbar";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
import Dashboard from "./admin/page/Dashboard";
import "./App.scss";
import SignUpPro from "./selector/formSelector/SignUpPro";
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
            <Route path="/admin/dashboard" Component={Dashboard} />
            {/* Test */}
            <Route path="component" Component={MainNavbar} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
