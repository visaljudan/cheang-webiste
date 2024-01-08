import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import socketIOClient from "socket.io-client";
const Confirm = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [confirmData, setConfirmData] = useState({
    userPro: true,
    Confirm: true,
    Request: false,
  });
  const [rejectData, setRejectData] = useState({
    Request: false,
  });

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
      // console.log(data);
      // navigate("");?
      window.location.reload();
    } catch (error) {
      setError(true);
    }
  };

  const handleReject = async (e) => {
    e.preventDefault();
    console.log(users._id);
  };

  useEffect(() => {
    ///update
    const socket = socketIOClient("http://localhost:5000"); // Replace with your server's URL

    // Listen for updates from the server
    socket.on("update", (data) => {
      // Update the state with the received data
      setUsers(data);
    });
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
    ///Update
    return () => {
      socket.disconnect(); // Disconnect the socket when the component unmounts
    };
    //
  }, [currentUser]);
  return (
    <>
      <h1>Comfirm</h1>
      {loading && <div>Loading...</div>}
      {error && <div>Error: {error}</div>}
      {!loading && !error && (
        <>
          {users.map((user) => (
            <div key={user._id}>
              <img
                src={user.avatar}
                alt={user.name}
                style={{ width: "200px", height: "200px" }}
              />
              <p>{user.nameuser}</p>
              <p>{user.brandName}</p>
              <button onClick={() => handleConfirm(user._id)}>Confirm</button>
              <button onSubmit={() => handleReject(user._id)}>Reject</button>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default Confirm;
