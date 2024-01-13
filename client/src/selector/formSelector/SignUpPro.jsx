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
import {
  getBecomePro,
  getBrandName,
  getCity,
  getMainService,
  getPhone,
  getProvince,
  getRequest,
  getSelect,
  getSubService,
} from "../../data/wordsLanguage";

const SignUpPro = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { currentUser } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  //Handle change data
  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "tel") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
        Request: true,
      });
    }
  };

  //Location
  const locationLanguage = getProvincesAndCities(language);
  const locationEnglsih = getProvincesAndCities("en");

  //Varaible location
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  //Handle change for province
  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    const index = locationLanguage.Provinces.indexOf(event.target.value);
    setSelectedCity("");
    setFormData({
      ...formData,
      province: locationEnglsih.Provinces[index], // Set the province in formData
      city: "", // Reset city in formData
    });
  };

  //Handle change for city
  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    const index = locationLanguage.Provinces.indexOf(selectedProvince);
    const subCityArray = locationLanguage.Cities[selectedProvince];
    const indexCity = subCityArray.indexOf(event.target.value);
    const value =
      locationEnglsih.Cities[locationEnglsih.Provinces[index]][indexCity];
    setFormData({
      ...formData,
      city: value,
    });
  };

  //Service
  const servicesLanguage = getServicesAndSubServices(language);
  const servicesEnglsih = getServicesAndSubServices("en");

  //Variable for main & sub service
  const [selectedMainService, setSelectedMainService] = useState("");
  const [selectedSubService, setSelectedSubService] = useState("");

  //Handle change for main service
  const handleMainServiceChange = (event) => {
    setSelectedMainService(event.target.value);
    const index = servicesLanguage.MainService.indexOf(event.target.value);
    setSelectedSubService("");
    setFormData({
      ...formData,
      mainService: servicesEnglsih.MainService[index],
      subService: "",
    });
  };

  //Handle change for sub service
  const handleSubServiceChange = (event) => {
    setSelectedSubService(event.target.value);
    const index = servicesLanguage.MainService.indexOf(selectedMainService);
    const subServiceArray = servicesLanguage.SubService[selectedMainService];
    const indexSub = subServiceArray.indexOf(event.target.value);
    const value =
      servicesEnglsih.SubService[servicesEnglsih.MainService[index]][indexSub];
    setFormData({
      ...formData,
      subService: value,
    });
  };

  //Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
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
        <div className={`form ${theme}`}>
          <div className="form-container">
            <Label label={getBecomePro(language)} />
            <form className="form-field" onSubmit={handleSubmit}>
              {/* Select Brand Name */}
              <FormField
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder={getBrandName(language)}
                required
              />
              {/* Select Service */}
              <div className="select">
                <select
                  id="mainSerivce"
                  name="mainSerivce"
                  value={selectedMainService}
                  onChange={handleMainServiceChange}
                >
                  <option value="">
                    {getSelect(language) + " " + getMainService(language)}
                  </option>
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
                    disabled={!selectedMainService}
                  >
                    <option value="">
                      {" "}
                      {getSelect(language) + " " + getSubService(language)}
                    </option>
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

              {/* Select Location */}
              <div className="select">
                <select
                  id="province"
                  name="province"
                  value={selectedProvince}
                  onChange={handleProvinceChange}
                >
                  <option value="">
                    {getSelect(language) + " " + getProvince(language)}
                  </option>
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
                    disabled={!selectedProvince}
                  >
                    <option value="">
                      {getSelect(language) + " " + getCity(language)}
                    </option>
                    {locationLanguage.Cities[selectedProvince]?.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <FormField
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder={getPhone(language)}
                required
              />

              <div className="btn-action">
                <button type="submit">
                  <FaUserPlus style={{ marginRight: "8px" }} />{" "}
                  {getRequest(language)}
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
