import React, { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useLanguage } from "../../context/LanguageContext";
import ServiceList from "../../data/ServiceList";
import Label from "../../components/label/Label";
import Card from "../../components/card/Card";
import { NavigationLink } from "../../components/navigationLink/NavigationLink";
import "./UsersSelector.scss";
import { useSelector } from "react-redux";

const UsersSelector = () => {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const ImgUrl =
    "https://images.pexels.com/photos/19274988/pexels-photo-19274988/free-photo-of-black-and-white-photo-of-a-woman-standing-in-the-forest.jpeg?auto=compress&cs=tinysrgb&w=600";

  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setShowMore(false);
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
    fetchServices();

    if (!currentUser) {
      const fetchUser = async () => {
        setLoading(true);
        setShowMore(false);
        const res = await fetch("/api/user/getalluser");
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
        }
        setUsers(data);
        setLoading(false);
      };

      fetchUser();
    }
  }, [location.search, currentUser]);
  return (
    <div
      className={`service-container ${theme} ${language}`}
      id="service_section"
    >
      {/* Left Column */}
      <div className="service-container-category">
        <Label label="All Categories" />
        <ul className="category-list">
          {ServiceList.map((list) => (
            <li key={list.id}>
              <NavigationLink {...list} />
            </li>
          ))}
        </ul>
      </div>

      {/* Right Column */}
      <div className="service-container-service">
        {ServiceList.map((list) => {
          const filteredUser = users.filter(
            (user) => user.typeService === list.value
          );
          return (
            <React.Fragment key={list.id}>
              <div className="service-navbar">
                <Label
                  label={list.value}
                  idLabel={list.href.slice(1)}
                  key={list.id}
                />
                {/* <NavigationLink
              href={`/userlist/${list.nameLink.toLowerCase()}`}
              nameLink="See more"
            /> */}
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
