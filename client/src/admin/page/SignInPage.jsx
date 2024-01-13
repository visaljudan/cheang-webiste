import React, { useState } from "react";
import AdminOAuth from "../components/oAuth/OAuth";
import FormLayout from "../../layouts/FormLayout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInFailure,
  signInStart,
  signInSuccess,
} from "../../redux/user/userSlice";
import FormField from "../../components/formField/FormField";
import Label from "../../components/label/Label";
import { FaUserPlus } from "react-icons/fa";
import "./SignInPage.scss";
const AdminSignInPage = () => {
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
      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/admin/dashboard");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <FormLayout>
      <div className="form">
        <div className="form-container">
          <Label label="Sign In Admin" />
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
          <AdminOAuth />
        </div>
      </div>
    </FormLayout>
  );
};

export default AdminSignInPage;
