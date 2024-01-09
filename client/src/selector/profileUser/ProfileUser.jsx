import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Label from "../../components/label/Label";
import Profile from "../../components/profile/Profile";
import Tag from "../../components/tag/Tag";
import "./ProfileUser.scss";
import StarRating from "../../components/starRating/StarRating ";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
const ProfileUser = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);
  const dispatch = useDispatch();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});
  ////
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      // Assuming you want to set the userRating in formData
      userRating: newRating,
    });
  };

  console.log(currentUser._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(formData);
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/rating/${params.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          rating: formData.userRating,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  ////////
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
    const fetchUser = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/user/getUserno/${params.userId}`);
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
    fetchUser();
  }, [params.userId]);
  return (
    <>
      <div className={`ProfileContainer ${theme}`}>
        <div className="ProfileContainer-container">
          <div className="ProfileContainer-container-left">
            {loading && <p className="">Loading...</p>}
            {error && <p className="">Something went wrong!</p>}
            {user && !loading && !error && (
              <div className={`userprofileDetail ${theme}`}>
                <div className="userserviceDetail-container" key={user.id}>
                  <Profile src={user.avatar} />
                  <Label label={user.brandName} />
                  <div className="userserviceDetail-container-tag">
                    <Tag label={user.typeService} />
                  </div>
                  {/* <RenderStar rating={profile.Rating} /> */}
                  <div className="userserviceDetail-container-detail">
                    <div className="TextBorder-container">
                      <p className="TextBorder-container-label">
                        Location : {user.location}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h2>Rate this item:</h2>
                    <StarRating onChange={handleRatingChange} />
                    <button onClick={handleSubmit}>Submit Rating</button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="ProfileContainer-container-right">
            {/* <ProfileTodo /> */}
            {/* <ServicePromote /> */}
            {/* <ServiceDetail /> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
