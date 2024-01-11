import { useState, useRef, useEffect } from "react";
import Label from "../../components/label/Label";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
// import "./ServiceList.scss";

const ServiceSelector = () => {
  const { theme } = useTheme();
  const [userSerivce, setUserSerivce] = useState([]);
  const [showServiceError, setShowServiceError] = useState(false);

  const { currentUser } = useSelector((state) => state.user);
  const params = useParams();

  useEffect(() => {
    if (params.userId) {
      fetchShowService();
    }
  }, [params.userId]);

  //Fetch
  const fetchShowService = async () => {
    try {
      setShowServiceError(false);
      const res = await fetch(`/api/user/service/${params.userId}`);
      const data = await res.json();
      if (data.success === false) {
        setShowServiceError(true);
        return;
      }
      setUserSerivce(data);
    } catch (error) {
      setShowServiceError(true);
    }
  };

  return (
    <div className={`listitem ${theme}`}>
      <div className="listitem-container">
        <div className="listitem-container-navbar">{/* <Search /> */}</div>
        <div className="listitem-container-service">
          <div className="service-title">
            <Label label="Service List" />
          </div>
          <div className="service-list">
            <div className="service-list-item">
              {userSerivce.map((service) => (
                <CardService {...service} key={service._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceSelector;
