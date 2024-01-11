import React, { useEffect, useState } from "react";
import Label from "../../components/label/Label";
import Card from "../../components/card/Card";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UsersList.scss";

const UsersList = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [showMore, setShowMore] = useState(false);

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
    (user) => user.typeService === params.typeservice
  );

  return (
    <div className="userslist-container">
      <div className="service-navbar">
        <Label label={params.typeservice} />
      </div>
      <div className="service-card">
        {filteredUser.map((user) => (
          <Card {...user} key={user._id} ID={user._id} />
        ))}
      </div>
    </div>
  );
};

export default UsersList;
