import { useEffect, useRef, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import {
  deleteUserFailure,
  deleteUserSuccess,
  signOutUserStart,
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import Label from "../../components/label/Label";
import FormField from "../../components/formField/FormField";
import { FaSave, FaSignOutAlt, FaTrash } from "react-icons/fa";
import Profile from "../../components/profile/Profile";
import FormatDate from "../../utils/FormatDate";
import "./SettingUser.scss";
import { getProvincesAndCities } from "../../data/Location";
import { getServicesAndSubServices } from "../../data/Service";
import { useLanguage } from "../../context/LanguageContext";
import {
  getCity,
  getMainService,
  getProvince,
  getSelect,
  getSubService,
} from "../../data/wordsLanguage";
import { app } from "../../firebase";

const SettingUser = () => {
  ///////AccountSetting/////////

  //////ProfileSetting////////
  const { theme } = useTheme();
  const { language } = useLanguage();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

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
  /////////////
  //useEffect
  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  //Upload file iamge
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, avatar: downloadURL })
        );
      }
    );
  };

  //Catch value
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Update Account
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
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
      setUpdateSuccess(false);
    }
  };

  //Delete Account
  const handleDeleteUser = async () => {
    handleCloseDeleteModal();
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  //Asking befoe Delete Account
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => {
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  //Signout Account
  const handleSignOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("/api/auth/signout");
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      // Clear the token from localStorage
      localStorage.removeItem("authToken");
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  //Create varaible to store date from usercurrent
  const dateObject = new Date(currentUser.createdAt);
  return (
    <>
      <div className={`addService ${theme}`}>
        <div className="form-addService-container">
          <Label label="Account Setting" />
          <form className="form-addService-field" onSubmit={handleSubmit}>
            <div className="form-addService-input">
              <FormField
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder={currentUser.email}
              />
              <FormField
                type="passowrd"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
              />
              {error ? <p style={{ color: "red" }}>{error}</p> : ""}
              <div className="btn-actions">
                <button>{<FaSave style={{ marginRight: "8px" }} />}Save</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {currentUser.userPro ? (
        <div className={`addService ${theme}`}>
          <div className="form-addService-container">
            <Label label="Profile Setting" />
            <form className="form-addService-field" onSubmit={handleSubmit}>
              {/* Image */}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileRef}
                hidden
                accept="image/*"
              />

              <Profile
                onClick={() => fileRef.current.click()}
                src={formData?.avatar || currentUser.avatar}
              />
              <div>
                <p>
                  {fileUploadError ? (
                    <span style={{ color: "red" }}>
                      Error Image upload (image must be less than 2 mb)
                    </span>
                  ) : filePerc === 100 ? (
                    <span style={{ color: "green" }}>
                      Image successfully uploaded!
                    </span>
                  ) : (
                    ""
                  )}
                </p>
              </div>

              {/* Input */}
              <div className="form-addService-input">
                <FormField
                  type="text"
                  name="nameuser"
                  value={formData.nameuser}
                  onChange={handleChange}
                  placeholder={currentUser.nameuser}
                />
                <FormField
                  type="text"
                  name="brandName"
                  value={formData.brandName}
                  onChange={handleChange}
                  placeholder={currentUser.brandName}
                />

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
                      {locationLanguage.Cities[selectedProvince]?.map(
                        (city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        )
                      )}
                    </select>
                  </div>
                </div>

                <FormField
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder={currentUser.phone}
                />

                <div className="btn-actions">
                  <button>
                    {<FaSave style={{ marginRight: "8px" }} />}
                    Save
                  </button>
                </div>
              </div>
            </form>
            <div className="btn-actions">
              <button onClick={handleShowDeleteModal}>
                {<FaTrash style={{ marginRight: "8px" }} />}
                Delete Account
              </button>
              <button onClick={handleSignOut}>
                {<FaSignOutAlt style={{ marginRight: "8px" }} />}
                Sign Out
              </button>
            </div>
          </div>
          {showDeleteModal && (
            <div className="delete-modal">
              <div className="delete-modal-content">
                <p>Are you sure you want to delete your account?</p>
                <div className="delete-modal-buttons">
                  <button onClick={handleCloseDeleteModal}>Cancel</button>
                  <button onClick={handleDeleteUser}>
                    {<FaTrash style={{ marginRight: "8px" }} />}Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className={`addService ${theme}`}>
          <div className="form-addService-container">
            <Label label="Profile Setting" />
            <form className="form-addService-field" onSubmit={handleSubmit}>
              {/* Image */}
              <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                ref={fileRef}
                hidden
                accept="image/*"
              />
              <Profile
                onClick={() => fileRef.current.click()}
                src={formData?.avatar || currentUser.avatar}
              />
              <p>
                {fileUploadError ? (
                  <span style={{ color: "red" }}>
                    Error Image upload (image must be less than 2 mb)
                  </span>
                ) : filePerc === 100 ? (
                  <span style={{ color: "green" }}>
                    Image successfully uploaded!
                  </span>
                ) : (
                  ""
                )}
              </p>
              {/* Input */}
              <div className="form-addService-input">
                {/* <p style={{ color: "#ff7f00" }}>{FormatDate(dateObject)}</p> */}
                <FormField
                  type="text"
                  name="nameuser"
                  value={formData.nameuser}
                  onChange={handleChange}
                  placeholder={currentUser.nameuser}
                />

                <div className="btn-actions">
                  <button>
                    {<FaSave style={{ marginRight: "8px" }} />}
                    Save
                  </button>
                </div>
              </div>
            </form>
            <div className="btn-actions">
              <button onClick={handleSignOut}>
                {<FaSignOutAlt style={{ marginRight: "8px" }} />}
                Sign Out
              </button>
              <button onClick={handleShowDeleteModal}>
                {<FaTrash style={{ marginRight: "8px" }} />}
                Delete Account
              </button>
            </div>
          </div>
          {showDeleteModal && (
            <div className="delete-modal">
              <div className="delete-modal-content">
                <p>Are you sure you want to delete your account?</p>
                <div className="delete-modal-buttons">
                  <button onClick={handleCloseDeleteModal}>Cancel</button>
                  <button onClick={handleDeleteUser}>
                    {<FaTrash style={{ marginRight: "8px" }} />}Delete
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SettingUser;
