import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import HomePage from "./page/HomePage";
import test from "./components/test";
import SignInPage from "./page/SignInPage";
import NotFoundPage from "./page/NotFoundPage";
import MainNavbar from "./layouts/navbar/MainNavbar";
import { LanguageProvider } from "./context/LanguageContext";
import { ThemeProvider } from "./context/ThemeContext";
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

            <Route path="component" Component={MainNavbar} />
          </Routes>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

export default App;
