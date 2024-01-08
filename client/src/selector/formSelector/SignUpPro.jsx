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
import { useDispatch, useSelector } from "react-redux";
import ServiceList from "../../data/ServiceList";
import { provinces, cities } from "../../data/Location";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";

const SignUpPro = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});
  const handleChange = (e) => {
    if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.checked,
      });
    } else if (e.target.type === "text" || "tel") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    } else if (e.target.id === "typeService") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  console.log(formData);
  ////Select
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  //   const provinces = ["Phnom Penh", "Siem Reap"];
  //   const cities = {
  //     "Phnom Penh": ["Dangkok", "Beung Keng Kon"],
  //     "Siem Reap": ["Siem Reap", "Angkor Thom"],
  //   };

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    setSelectedCity(""); // Reset city when province changes
    setFormData({
      ...formData,
      province: event.target.value, // Set the province in formData
      city: "", // Reset city in formData
    });
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    setFormData({
      ...formData,
      city: event.target.value, // Set the city in formData
      location: `${selectedProvince} ${event.target.value}`,
    });
  };

  ////
  console.log(currentUser._id);
  console.log("659ad361bc14d4e007c9003f");
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e);
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      console.log(data);
      navigate("/");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  return (
    <div className={`form ${theme} ${language}`}>
      <div className="form-container">
        <Label label="Sign Up" />
        <form className="form-field" onSubmit={handleSubmit}>
          <FormField
            type="text"
            name="brandName"
            value={formData.brandName}
            onChange={handleChange}
            placeholder="Brand name"
            required
          />
          <div className="select">
            <select
              id="province"
              name="province"
              value={selectedProvince}
              onChange={handleProvinceChange}
            >
              <option value="">Select Province</option>
              {provinces.map((province) => (
                <option key={province} value={province}>
                  {province}
                </option>
              ))}
            </select>

            <div>
              <select
                id="city"
                name="city"
                value={selectedCity}
                onChange={handleCityChange}
                disabled={!selectedProvince} // Disable city dropdown if no province selected
              >
                <option value="">Select City</option>
                {cities[selectedProvince]?.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* <FormField
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="Location"
              required
            /> */}
          <div className="select">
            <select
              id="typeService"
              name="typeService"
              value={formData.typeService}
              onChange={handleChange}
            >
              <option value="">Select Type Service</option>
              {ServiceList.slice(1).map((service) => (
                <option key={service.id} value={service.value}>
                  {service.value}
                </option>
              ))}
            </select>
          </div>

          <FormField
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Phone"
            required
          />
          <FormField
            type="checkbox"
            name="Request"
            onChange={handleChange}
            required
          />
          <span>ProUser</span>

          {/* <button>Sign Up</button> */}
          <div className="btn-action">
            <button type="submit">
              <FaUserPlus style={{ marginRight: "8px" }} /> Request
            </button>
          </div>
          {error && <p>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUpPro;
