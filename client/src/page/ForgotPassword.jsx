import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FormField from "../components/formField/FormField";
const ForgotPassword = () => {
  const { error, loading } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  //handle change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Sign in
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart(true));
      const res = await fetch("/api/auth/resetPassword", {
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
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <form className="form-field" onSubmit={handleSubmit}>
      <FormField
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
      />
    </form>
  );
};

export default ForgotPassword;
