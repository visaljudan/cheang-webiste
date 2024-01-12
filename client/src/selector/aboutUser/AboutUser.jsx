import { useTheme } from "../../context/ThemeContext";
import TextBorder from "../../components/textBorder/TextBorder";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Label from "../../components/label/Label";
import {
  FaLocationArrow,
  FaMapMarkedAlt,
  FaMarsStroke,
  FaPhone,
  FaUserAlt,
  FaWrench,
} from "react-icons/fa";
import { useParams } from "react-router-dom";

const AboutUser = () => {
  const { theme } = useTheme();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [user, setUser] = useState([]);
  const params = useParams();

  useEffect(() => {
    const fetchService = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/getUser/${params.userId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(true);
          setLoading(false);
          return;
        }
        setUser(data);
        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchService();
  }, [params.userId]);
  return (
    <>
      {loading && <p className="">Loading...</p>}
      {user.length !== 0 ? (
        <div className={`service-about ${theme}`}>
          <Label label="About Me" />
          <div className="serivce-about-container" key={user.id}>
            <TextBorder
              label={<FaMapMarkedAlt />}
              text={"Brand Name : " + (user.brandName || "None")}
            />
            <TextBorder
              label={<FaUserAlt />}
              text={"Owner : " + user.nameuser}
            />
            <TextBorder
              label={<FaLocationArrow />}
              text={"Location : " + (user.province + user.city || "None")}
            />
            <TextBorder
              label={<FaWrench />}
              text={
                "Type of Service : " +
                (user.mainService + " " + user.subService || "None")
              }
            />
            <TextBorder
              label={<FaPhone />}
              text={"Phone Number " + (user.phone || "None")}
            />
          </div>
        </div>
      ) : (
        <div className={`service-about ${theme}`}>
          <Label label="About Me" />
          <div className="serivce-about-container" key={currentUser.id}>
            <TextBorder
              label={<FaMapMarkedAlt />}
              text={"Brand Name : " + (currentUser.brandName || "None")}
            />
            <TextBorder
              label={<FaUserAlt />}
              text={"Owner : " + currentUser.nameuser}
            />
            <TextBorder
              label={<FaLocationArrow />}
              text={
                "Location : " +
                (currentUser.province + currentUser.city || "None")
              }
            />
            <TextBorder
              label={<FaWrench />}
              text={
                "Type of Service : " +
                (currentUser.mainService + currentUser.subService || "None")
              }
            />
            <TextBorder
              label={<FaPhone />}
              text={"Phone Number " + (currentUser.phone || "None")}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default AboutUser;
