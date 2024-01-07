import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import HomePage from "./page/HomePage";
import test from "./components/test";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={SignUpPage} />
        <Route path="homepage" Component={HomePage} />

        <Route path="component" Component={test} />
      </Routes>
    </Router>
  );
};

export default App;
