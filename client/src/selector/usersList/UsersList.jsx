import React, { useEffect, useState } from "react";
import Label from "../../components/label/Label";
import Card from "../../components/card/Card";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UsersList.scss";
import { useTheme } from "../../context/ThemeContext";
import SearchFilter from "../../components/searchFilter/SearchFilter";

const UsersList = () => {
  const { theme } = useTheme();
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (currentUser) {
      const fetchServices = async () => {
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
      fetchServices();
    } else {
      const fetchUser = async () => {
        setLoading(true);
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
  }, [currentUser]);

  const params = useParams();
  const filteredUser = users.filter(
    (user) => user.mainService === params.typeservice
  );

  const handleServiceChange = (event) => {
    setSelectedService(event.target.value);
  };
  return (
    <div className={`userslist ${theme}`}>
      <div className="userslist-container">
        <div className="service-navbar">
          {/* <SearchFilter /> */}
          <Label label={params.typeservice} />
        </div>
        <div className="service-card">
          {params.typeservice
            ? filteredUser.map((user) => (
                <Card {...user} key={user._id} ID={user._id} />
              ))
            : users.map((user) => (
                <Card {...user} key={user._id} ID={user._id} />
              ))}
        </div>
      </div>
    </div>
  );
};

export default UsersList;
