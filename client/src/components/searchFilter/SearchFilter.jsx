import { useEffect, useState } from "react";
import { FaSearch, FaUserPlus } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import { useNavigate, useParams } from "react-router-dom";
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
import "./SearchFilter.scss";
import Card from "../card/Card";

const SearchFilter = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({});

  ////////////////
  const handleChange = (e) => {
    if (e.target.type === "text" || e.target.type === "tel") {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });

      // Update live search results as the user types
    }
    fetchLiveSearchResults(formData);
  };
  console.log(formData);
  ////
  const locationLanguage = getProvincesAndCities(language);
  const locationEnglsih = getProvincesAndCities("en");
  const [selectedProvince, setSelectedProvince] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const handleProvinceChange = (event) => {
    setSelectedProvince(event.target.value);
    const index = locationLanguage.Provinces.indexOf(event.target.value);
    setSelectedCity(""); // Reset city when province changes
    setFormData({
      ...formData,
      province: locationEnglsih.Provinces[index], // Set the province in formData
      city: "", // Reset city in formData
    });
  };
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

    setFormData({
      ...formData,
      subService: value, // Set the province in formData
    });
  };

  ////
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     dispatch(updateUserStart());
  //     const res = await fetch(`/api/user/update/${currentUser._id}`, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(updateUserFailure(data.message));
  //       return;
  //     }
  //     dispatch(updateUserSuccess(data));
  //     console.log(data);
  //     navigate("/");
  //   } catch (error) {
  //     dispatch(updateUserFailure(error.message));
  //   }
  // };

  useEffect(() => {
    if (params.typeservice) {
      const index = servicesEnglsih.MainService.indexOf(params.typeservice);
      setSelectedMainService(servicesLanguage.MainService[index]);
    }
  });

  /////////Search///////////
  const [liveSearchResults, setLiveSearchResults] = useState([]);
  const fetchLiveSearchResults = async (searchTerm) => {
    try {
      setLoading(true);
      const res = await fetch(
        `/api/user/live-search?searchTerm=${searchTerm}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      setLiveSearchResults(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };
  // useEffect(() => {
  //   const fetchSearchResults = async () => {
  //     try {
  //       setLoading(true);
  //       const res = await fetch("/api/user/search", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(formData),
  //       });
  //       const data = await res.json();
  //       setSearchResults(data);
  //       setLoading(false);
  //     } catch (error) {
  //       setError(error.message);
  //       setLoading(false);
  //     }
  //   };

  //   const delayDebounceFn = setTimeout(() => {
  //     if (formData.Request) {
  //       fetchSearchResults();
  //     }
  //   }, 1000);

  //   return () => clearTimeout(delayDebounceFn);
  // }, [formData]);
  return (
    <>
      <div className={`form ${theme}`}>
        <div className="form-container-search">
          <form className="form-field">
            {/* Text */}
            <div className="form-text ">
              <FormField
                type="text"
                name="brandName"
                value={formData.brandName}
                onChange={handleChange}
                placeholder="Brand Name"
                required
              />

              <button type="submit">
                <FaSearch style={{ marginRight: "8px" }} /> Search
              </button>
            </div>

            {/* Service */}
            <div className="filter">
              <div className="select">
                {params.typeservice ? (
                  ""
                ) : (
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
                )}

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

              {/* Location */}
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
            </div>
            {error && <p>{error}</p>}
          </form>
          <div>
            <h2>Search Results</h2>
            {loading && <p>Loading...</p>}
            {liveSearchResults.map((result) => (
              <div key={result.id}>
                <Card {...result} key={result._id} ID={result._id} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchFilter;

// import React from "react";

// const SearchFilter = () => {
//   return <div>SearchFilter</div>;
// };

// export default SearchFilter;
