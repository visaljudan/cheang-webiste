import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Profile from "../../components/profile/Profile";
import { Link } from "react-router-dom";
import "./SaveUser.scss";
const SaveUser = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  useEffect(() => {
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
  }, [currentUser]);
  return (
    <div>
      {currentUser?.saves.map((save, index) => (
        <div className="save" key={index}>
          <div className="save-profile">
            <Profile src={save.userAvatar} />
            <p>{save.userName}</p>
          </div>
          <div className="save-profile-action">
            <Link to={`/profile/${save.userId}`}>
              <button style={{ width: "6rem" }}>See more</button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SaveUser;
