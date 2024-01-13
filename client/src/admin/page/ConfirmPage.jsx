import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
import AdminAppLayout from "../layouts/AdminAppLayout";
import Label from "../../components/label/Label";
import "./ConfirmPage.scss";
import {
  FaArrowDown,
  FaArrowUp,
  FaLocationArrow,
  FaPeopleArrows,
  FaShopify,
  FaUser,
  FaWrench,
} from "react-icons/fa";
const ConfirmPage = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showDetail, setShowDetail] = useState(false);
  const [confirmData, setConfirmData] = useState({
    userPro: true,
    Confirm: true,
    Request: false,
  });
  const [rejectData, setRejectData] = useState({
    Request: false,
    userPro: false,
    Confirm: false,
  });

  const handleShow = (userId) => {
    setShowDetail(!showDetail);
  };
  const handleConfirm = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/updateconfirm/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(confirmData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
      setUsers(data);
      window.location.reload();
    } catch (error) {
      setError(true);
    }
  };

  const handleReject = async (userId) => {
    try {
      setLoading(true);
      const res = await fetch(`/api/user/updateconfirm/${userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rejectData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(true);
        return;
      }
      setLoading(false);
      setUsers(data);
      
      window.location.reload();
    } catch (error) {
      setError(true);
    }
  };
  // console.log(users);

  useEffect(() => {
    ///update
    // const socket = socketIOClient("http://localhost:5000"); // Replace with your server's URL

    // // Listen for updates from the server
    // socket.on("update", (data) => {
    //   // Update the state with the received data
    //   setUsers(data);
    // });
    ///
    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch("/api/admin/usersreq");
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      setUsers(data);
      setLoading(false);
    };

    fetchUser();
    // ///Update
    // return () => {
    //   socket.disconnect(); // Disconnect the socket when the component unmounts
    // };
    // //
  }, [currentUser]);

  return (
    <AdminAppLayout>
      <div className="confirm-contain">
        <Label label="Comfirm" />
        <div className="confirm-container">
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && !error && (
            <>
              {users.map((user) => (
                <div className="list-user" key={user._id}>
                  <div className="user-confirm" key={user._id}>
                    <img src={user.avatar} alt={user.name} />
                    <div className="user-confirm-name">
                      <p>
                        <FaUser style={{ marginRight: "8px" }} /> Ower:{" "}
                        {user.nameuser}
                      </p>
                      <p>
                        <FaWrench style={{ marginRight: "8px" }} /> Brand Name:{" "}
                        {user.brandName}
                      </p>
                      <p>
                        <FaLocationArrow style={{ marginRight: "8px" }} />
                        Location: {user.brandName}
                      </p>
                    </div>
                    <div className="user-button">
                      <button onClick={() => handleConfirm(user._id)}>
                        Confirm
                      </button>
                      <button onClick={() => handleReject(user._id)}>
                        Reject
                      </button>
                    </div>
                  </div>
                  <div>
                    {showDetail ? (
                      <div className="user-show">
                        <div className="user-detail">
                          <p>Detail: {user.brandName}</p>
                        </div>
                        <div className="user-confirm-detail">
                          <p>Type Service: {user.typeService}</p>
                          <p>Phone : {user.phone}</p>
                          <p>Location : {user.location}</p>
                        </div>
                        <button onClick={() => handleShow(user._id)}>
                          See more <FaArrowUp style={{ fontSize: "12px" }} />
                        </button>
                      </div>
                    ) : (
                      <button onClick={handleShow}>
                        See more <FaArrowDown style={{ fontSize: "12px" }} />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </AdminAppLayout>
  );
};

export default ConfirmPage;
