import React, { useEffect, useState } from "react";
import Card from "../../components/card/Card";
import Label from "../../components/label/Label";
import ServiceList from "../../data/ServiceList";
import { useLanguage } from "../../context/LanguageContext";
import { NavigationLink } from "../../components/navigationLink/NavigationLink";
import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import "./UsersSelector.scss";
import { getServicesAndSubServices } from "../../data/Service";
import {
  getAllCategories,
  getPopular,
  getSeeMore,
} from "../../data/wordsLanguage";

const UsersSelector = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    if (!currentUser) {
      const fetchUsers = async () => {
        setLoading(true);
        const res = await fetch("/api/user/getalluser");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        }
        setUsers(data);
        setLoading(false);
      };
      fetchUsers();
    } else {
      const fetchUserswithCrrunetUser = async () => {
        setLoading(true);
        const currentUserSearchQuery = currentUser._id
          ? `&excludeUserId=${currentUser._id}`
          : "";
        const res = await fetch(
          `/api/user/getalluserac?${currentUserSearchQuery}`
        );
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        }
        setUsers(data);
        setLoading(false);
      };
      fetchUserswithCrrunetUser();
    }
  }, [currentUser]);
  const servicesLanguage = getServicesAndSubServices(language);
  const servicesEnglsih = getServicesAndSubServices("en");
  return (
    <div className={`service-container ${theme} `} id="service_section">
      {/* Left Column */}
      <div className="service-container-category">
        <Label label={getAllCategories(language)} />
        <ul className="category-list">
          {loading ? (
            <p>Loading...</p>
          ) : (
            servicesLanguage.MainService.map((main, index) => (
              <li key={index}>
                <NavigationLink value={main} href={"#" + main} />
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Right Column */}
      <div className="service-container-service">
        {servicesLanguage.MainService.map((service, index) => {
          const englishService = servicesEnglsih.MainService[index];
          const filteredUser = users.filter(
            (user) => user.mainService === englishService
          );

          return (
            <React.Fragment key={index}>
              <div className="service-navbar">
                <Label label={service} idLabel={service} key={index} />
                <NavigationLink
                  href={`/userlist/${englishService}`}
                  value={getSeeMore(language)}
                />
              </div>
              <div className="service-card">
                {filteredUser.map((user) => (
                  <Card {...user} key={user._id} ID={user._id} />
                ))}
              </div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default UsersSelector;
