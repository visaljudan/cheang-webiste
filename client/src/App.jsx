import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import HomePage from "./page/HomePage";
import test from "./components/test";
import SignInPage from "./page/SignInPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={HomePage} />
        <Route path="/signup" Component={SignUpPage} />
        <Route path="/signin" Component={SignInPage} />

        <Route path="component" Component={test} />
      </Routes>
    </Router>
  );
};

export default App;
