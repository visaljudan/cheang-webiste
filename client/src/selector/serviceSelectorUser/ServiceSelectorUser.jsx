import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import Label from "../../components/label/Label";
import CardServices from "../../components/cardService/CardService";
import { FaPenAlt, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import "./ServiceSelectorUser.scss";
import CardService from "../../components/cardService/CardService";

const ServiceSelectorUser = () => {
  const { theme } = useTheme();
  const [serivce, setSerivce] = useState([]);
  const [showServiceError, setShowServiceError] = useState(false);
  const [userSerivce, setUserSerivce] = useState([]);

  const params = useParams();
  // const { currentUser } = useSelector((state) => state.user);
  console.log(params);

  //Fetch
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
        <div className="listitem-container-navbar"></div>
        <div className="listitem-container-service">
          <div className="service-title">
            <Label label="Title of Item" />
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

export default ServiceSelectorUser;
