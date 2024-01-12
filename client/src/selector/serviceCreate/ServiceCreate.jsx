import { useEffect, useRef, useState } from "react";
import { FaPlusCircle } from "react-icons/fa";
import { useTheme } from "../../context/ThemeContext";
import FormField from "../../components/formField/FormField";
import Label from "../../components/label/Label";
import { useSelector } from "react-redux";
import { app } from "../../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useNavigate } from "react-router-dom";
import "./ServiceCreate.scss";

const ServiceCreate = () => {
  const { theme } = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState();
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    descritpion: "",
    price: 0,
    image:
      "https://static-00.iconduck.com/assets.00/wrench-icon-2047x2048-jyerjpd9.png",
  });
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const ImgUrls =
    "https://static-00.iconduck.com/assets.00/wrench-icon-2047x2048-jyerjpd9.png";

  useEffect(() => {
    if (file) {
      StoreImage(file);
    }
  }, [file]);

  //Upload file iamge
  const StoreImage = (file) => {
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
          setFormData({ ...formData, image: downloadURL })
        );
      }
    );
  };

  //Handle Change
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Validate input based on field name
    if (name === "name" && value.length > 50) {
      return; // Prevent updating state if length exceeds 50 characters
    } else if (name === "descritpion" && value.length > 100) {
      return; // Prevent updating state if length exceeds 100 characters
    }

    // Update the state
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/service/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        userRef: currentUser._id,
      }),
    });
    const data = await res.json();
    console.log("data");
    console.log(data);
    setLoading(false);
    if (data.success === false) {
      setError(data.message);
    }
    navigate("/profile");
    window.location.reload();
  };
  ///////
  const maxCharacters = 200;

  return (
    <div className={`addService ${theme}`}>
      <div className="form-addService-container">
        <Label label="Add New Serivce" />
        <form className="form-addService-field" onSubmit={handleSubmit}>
          <div className="form-addService-input">
            <FormField
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name Service"
              required
            />
            <div>
              <textarea
                name="descritpion"
                value={formData.descritpion}
                onChange={handleChange}
                placeholder="Description"
                required
                maxLength={200} // Set the maximum length to 100 characters
              />
              <div>
                Character Count: {formData.description.length}/{maxCharacters}
              </div>
            </div>
            <FormField
              type="number"
              name="price"
              step="0.001"
              value={formData.price}
              onChange={handleChange}
              placeholder="Price"
              required
            />
            <div className="btn-actions">
              <button>
                {<FaPlusCircle style={{ marginRight: "8px" }} />} Add Service
              </button>
              <div className="btn-image">
                <button onClick={() => fileRef.current.click()}>
                  {<FaPlusCircle style={{ marginRight: "8px" }} />}Add Image
                </button>

                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  ref={fileRef}
                  hidden
                  accept="image/*"
                />
              </div>
            </div>
          </div>
          <div className="form-addService-image">
            <div className="image-container">
              <img
                src={formData?.image || ImgUrls}
                style={{
                  maxWidth: "15rem",
                  maxHeight: "15rem",
                  objectFit: "cover",
                }}
                alt="image"
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
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServiceCreate;
