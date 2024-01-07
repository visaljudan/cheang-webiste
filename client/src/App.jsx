import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUpPage from "./page/SignUpPage";
import HomePage from "./page/HomePage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={SignUpPage} />
        <Route path="homepage" Component={HomePage} />
      </Routes>
    </Router>
  );
};

export default App;
