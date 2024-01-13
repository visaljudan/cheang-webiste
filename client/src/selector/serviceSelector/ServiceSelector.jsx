import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import Label from "../../components/label/Label";
import CardServices from "../../components/cardService/CardService";
import { FaPenAlt, FaTrash } from "react-icons/fa";
import "./ServiceSelector.scss";
import { useParams } from "react-router-dom";

const ServiceSelector = () => {
  const { theme } = useTheme();
  const [serivce, setSerivce] = useState([]);
  const [showServiceError, setShowServiceError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    if (currentUser) {
      fetchShowService();
    }
  }, [currentUser]);

  //Fetch
  const fetchShowService = async () => {
    try {
      setShowServiceError(false);
      const res = await fetch(`/api/user/services/${currentUser._id}`);
      const data = await res.json();
      if (data.success === false) {
        setShowServiceError(true);
        return;
      }
      setSerivce(data);
      console.log(data);
    } catch (error) {
      setShowServiceError(true);
    }
  };

  //Delete Service
  const handleServiceDelete = async (serviceId) => {
    try {
      const res = await fetch(`/api/service/delete/${serviceId}`, {
        method: "DELETE",
      });
      const data = await res.json();
      console.log("data");

      console.log(data);
      if (data.success === false) {
        console.log(data.message);
        return;
      }

      setSerivce((prev) => prev.filter((service) => service._id !== serviceId));
    } catch (error) {
      console.log(error.message);
    }
  };

  //Modal
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState(null);
  const handleShowDeleteModal = (serviceId) => {
    setSelectedServiceId(serviceId);
    setShowDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
  };

  return (
    <div className={`listitem ${theme}`}>
      <div className="listitem-container">
        {/* <div className="listitem-container-navbar"></div> */}
        <div className="listitem-container-service">
          <div className="service-title">
            <Label label="Title of Item" />
          </div>
          <div className="service-list">
            <div className="service-list-item">
              {serivce.map((service) => (
                <CardServices {...service} key={service._id}>
                  <button onClick={() => handleShowDeleteModal(service._id)}>
                    {<FaPenAlt style={{ marginRight: "8px" }} />} Edit
                  </button>
                  <button onClick={() => handleServiceDelete(service._id)}>
                    {<FaTrash style={{ marginRight: "8px" }} />} Delete
                  </button>
                </CardServices>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* {showDeleteModal && (
        <div className="delete-modal">
          <div className="delete-modal-content">
            <AuthServiceUpdat serviceId={selectedServiceId} />
            <div className="delete-modal-buttons">
              <button onClick={handleCloseDeleteModal}>Cancel</button>
              <button>
                {<FaTrash style={{ marginRight: "8px" }} />}Delete
              </button>
            </div>
          </div>
        </div>
      )} */}
    </div>
  );
};

export default ServiceSelector;
