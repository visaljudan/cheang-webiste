import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import Label from "../../components/label/Label";
import FormField from "../../components/formField/FormField";
import { FaUserPlus } from "react-icons/fa";
import { NavigationLink } from "../../components/navigationLink/NavigationLink";
import {
  signInStart,
  signInFailure,
  signInSuccess,
} from "../../redux/user/userSlice";
import OAuth from "../../components/oAuth/OAuth";
import "./SignUp.scss";

const SignIn = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { error, loading } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart(true));
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  console.log(loading);
  return (
    <div className={`form ${theme} ${language}`}>
      <div className="form-container">
        <Label label="Sign Up" />
        <form className="form-field" onSubmit={handleSubmit}>
          <FormField
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            required
          />
          <FormField
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <div className="btn-action">
            <button>
              {loading ? (
                "Loading..."
              ) : (
                <>
                  <FaUserPlus style={{ marginRight: "8px" }} /> Sign In
                </>
              )}
            </button>
          </div>
          <div className="error">{error ? "" : <h6>{error}</h6>}</div>
        </form>
        <p>
          Don't have account?
          <NavigationLink
            href="/signup"
            value="Sign Up"
            style={{ color: "#ff7f00", marginLeft: "8px" }}
          />
        </p>
        <OAuth />
      </div>
    </div>
  );
};

export default SignIn;
