import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { NavigationLink } from "../../components/navigationLink/NavigationLink";
import Label from "../../components/label/Label";
import FormField from "../../components/formField/FormField";
import OAuth from "../../components/oAuth/OAuth";
import "./SignUp.scss";

const SignUp = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/");
    } catch (error) {
      setLoading(false);
    }
  };
  return (
    <div className={`form ${theme} ${language}`}>
      <div className="form-container">
        <Label label="Sign Up" />
        <form className="form-field" onSubmit={handleSubmit}>
          <FormField
            type="text"
            name="nameuser"
            value={formData.nameuser}
            onChange={handleChange}
            placeholder="Nam User"
            required
          />
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
                  <FaUserPlus style={{ marginRight: "8px" }} /> Sign Up
                </>
              )}
            </button>
          </div>
          <div className="error">{error && <h6>{error}</h6>}</div>
        </form>
        <p>
          Already have an account?
          <NavigationLink
            href="/signin"
            value="Sign In"
            style={{ color: "#ff7f00", marginLeft: "8px" }}
          />
        </p>
        <OAuth />
      </div>
    </div>
  );
};

export default SignUp;
