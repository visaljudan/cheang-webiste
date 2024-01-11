import { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate } from "react-router-dom";
import Label from "../../components/label/Label";
import FormField from "../../components/formField/FormField";
import { useDispatch, useSelector } from "react-redux";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import FormLayout from "../../layouts/FormLayout";
import { getServicesAndSubServices } from "../../data/Service";
import { useLanguage } from "../../context/LanguageContext";
import { getProvincesAndCities } from "../../data/Location";
import "./SignUp.scss";

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
    if (e.target.type === "text" || e.target.type === "tel") {
      console.log("work");
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
        Request: true,
      });
    }
  };
  ////
  const locationLanguage = getProvincesAndCities(language);
  const locationEnglsih = getProvincesAndCities("en");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  console.log(formData);
  // console.log(locationEnglsih.Provinces);
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    const index = locationLanguage.Provinces.indexOf(event.target.value);
    setSelectedCity(""); // Reset city when province changes
    setFormData({
      ...formData,
      porvince: locationEnglsih.Provinces[index], // Set the province in formData
      city: "", // Reset city in formData
    });
  };
  // };
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    const index = locationLanguage.Provinces.indexOf(selectedProvince);
    const subCityArray = locationLanguage.Cities[selectedProvince];
    const indexCity = subCityArray.indexOf(event.target.value);
    const value =
      locationEnglsih.Cities[locationEnglsih.Provinces[index]][indexCity];
    console.log(value);

    setFormData({
      ...formData,
      city: value,
    });
  };

  /////////////type service/////////////
  const servicesLanguage = getServicesAndSubServices(language);
  const servicesEnglsih = getServicesAndSubServices("en");

  const [selectedMainService, setSelectedMainService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");

  const handleMainServiceChange = (event) => {
    setSelectedMainService(event.target.value);
    const index = servicesLanguage.MainService.indexOf(event.target.value);
    setSelectedSubService(""); // Reset city when province changes
    setFormData({
      ...formData,
      mainService: servicesEnglsih.MainService[index], // Set the province in formData
      subService: "", // Reset city in formData
    });
  };

  const handleSubServiceChange = (event) => {
    setSelectedSubService(event.target.value);
    const index = servicesLanguage.MainService.indexOf(selectedMainService);
    const subServiceArray = servicesLanguage.SubService[selectedMainService];
    const indexSub = subServiceArray.indexOf(event.target.value);
    const value =
      servicesEnglsih.SubService[servicesEnglsih.MainService[index]][indexSub];
    console.log(value);

    setFormData({
      ...formData,
      subService: value, // Set the province in formData
    });
  };

  ////
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
    <FormLayout>
      {currentUser.userPro ? (
        "You are alreay Pro!"
      ) : (
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
                  {locationLanguage.Provinces.map((province) => (
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
                    {locationLanguage.Cities[selectedProvince]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="select">
                <select
                  id="mainSerivce"
                  name="mainSerivce"
                  value={selectedMainService}
                  onChange={handleMainServiceChange}
                >
                  <option value="">Select Main Service</option>
                  {servicesLanguage.MainService.map((mainservice) => (
                    <option key={mainservice} value={mainservice}>
                      {mainservice}
                    </option>
                  ))}
                </select>

                <div>
                  <select
                    id="subService"
                    name="subService"
                    value={selectedSubService}
                    onChange={handleSubServiceChange}
                    disabled={!selectedMainService} // Disable city dropdown if no province selected
                  >
                    <option value="">Select Sub Service</option>
                    {servicesLanguage.SubService[selectedMainService]?.map(
                      (subservice) => (
                        <option key={subservice} value={subservice}>
                          {subservice}
                        </option>
                      )
                    )}
                  </select>
                </div>
              </div>

              <FormField
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
              />
              {/* <FormField
              type="checkbox"
              name="Request"
              onChange={handleChange}
              required
            /> 
            <span>ProUser</span>
                    */}
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
      )}
    </FormLayout>
  );
};

export default SignUpPro;
