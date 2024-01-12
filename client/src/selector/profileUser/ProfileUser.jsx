import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FaComment,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaRegSave,
  FaSave,
  FaThumbsDown,
  FaWrench,
} from "react-icons/fa";
import Tag from "../../components/tag/Tag";
import Label from "../../components/label/Label";
import Profile from "../../components/profile/Profile";
import StarRating from "../../components/starRating/StarRating ";
import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";
import ShowStar from "../../components/starRating/ShowStar";
import "./ProfileUser.scss";
import TextBorder from "../../components/textBorder/TextBorder";
import Button from "../../components/button/Button";
import ServiceSelector from "../serviceSelector/ServiceSelector";
import { NavigationLink } from "../../components/navigationLink/NavigationLink";
import AboutUser from "../aboutUser/AboutUser";
const ProfileUser = () => {
  const { theme } = useTheme();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [normal, setNormal] = useState("service");
  const dispatch = useDispatch();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState({});

  ////////////////Rating////////////////////////////
  const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      // Assuming you want to set the userRating in formData
      userRating: newRating,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
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

      // Assuming the server responds with the updated user data
      setUser(data.updatedUser); // Update the state with the new data
      // dispatch(updateUserSuccess(data)); // Assuming you have a success action

      // Fetch the updated user data after rating
      const updatedUserResponse = await fetch(
        `/api/user/getUser/${params.userId}`
      );
      const updatedUserData = await updatedUserResponse.json();
      setUser(updatedUserData);

      // dispatch(updateUserSuccess(data));
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const averageRating =
    user && user.ratings.length > 0
      ? user.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
        user.ratings.length
      : 0;

  ///////////Comments//////////
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleCommentSubmit = async (e) => {
    try {
      e.preventDefault(); // Prevent the default form submission

      dispatch(updateUserStart());

      const res = await fetch(`/api/user/comment/${params.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nameuser: currentUser.nameuser,
          avatar: currentUser.avatar,
          comment: newComment,
        }),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      // Assuming the server responds with the updated user data
      setUser(data.updatedUser); // Update the state with the new data

      // Fetch the updated user data after posting a comment
      const updatedUserResponse = await fetch(
        `/api/user/getUser/${params.userId}`
      );
      const updatedUserData = await updatedUserResponse.json();
      setUser(updatedUserData);

      // // Clear the newComment state after successful comment submission
      setNewComment("");
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleCommentDelete = async (commentId) => {
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/deletecomment/${commentId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          // Include any authentication headers if required
        },
        body: JSON.stringify({
          user: user._id,
        }),
      });

      const data = await res.json();
      // console.log(data);
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }
      setUser(data);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  ///////////Save User//////////
  const handleSave = async () => {
    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/save/${params.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
      } else {
        // Dispatch a success action if the save operation is successful
        dispatch(updateUserSuccess(data));
      }
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const isAlreadySaved = currentUser?.saves.some(
    (save) => save.userId === params.userId
  );
  //////////////////////////////

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
    // const fetchUser = async () => {
    //   try {
    //     setLoading(true);
    //     const res = await fetch(`/api/user/getUserno/${params.userId}`);
    //     const data = await res.json();
    //     if (data.success === false) {
    //       setError(true);
    //       setLoading(false);
    //       return;
    //     }
    //     setUser(data);
    //     setLoading(false);
    //     setError(false);
    //   } catch (error) {
    //     setError(true);
    //     setLoading(false);
    //   }
    // };
    // fetchUser();
  }, []);
  return (
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
                  <Tag label={user.mainService} />
                  <Tag label={user.subService} />
                </div>
                <div className="userserviceDetail-container-rate">
                  <ShowStar rating={averageRating.toFixed(2)} />
                  <p>{averageRating.toFixed(2)}</p>
                </div>
                <div className="userserviceDetail-container-detail">
                  <div className="TextBorder-container">
                    <TextBorder
                      label={<FaMapMarkerAlt />}
                      text={user.city + user.province}
                    />
                    <TextBorder label={<FaPhoneAlt />} text={user.phone} />
                  </div>
                </div>
                <div className="userserviceDetail-container-rating">
                  {/* <Label label="Rate this service" /> */}
                  <StarRating
                    userId={params.userId}
                    onChange={handleRatingChange}
                  />
                  <button onClick={handleSubmit}>Submit Rating</button>
                </div>
              </div>
            </div>
          )}
        </div>
        <div className="ProfileContainer-container-right">
          <div className="profileTodo">
            <>
              {normal === "service" ? (
                <>
                  <div className="serviceDetail-container">
                    <button className="disabled" disabled>
                      {<FaWrench style={{ marginRight: "8px" }} />}
                      Service
                    </button>
                    <button onClick={() => setNormal("about")}>
                      {<FaInfoCircle style={{ marginRight: "8px" }} />}
                      About
                    </button>
                    <button onClick={handleSave}>
                      {isAlreadySaved ? (
                        <>
                          <FaRegSave style={{ marginRight: "8px" }} />
                          Unsave
                        </>
                      ) : (
                        <>
                          <FaSave style={{ marginRight: "8px" }} />
                          Save
                        </>
                      )}
                    </button>
                  </div>
                  <ServiceSelector />
                </>
              ) : normal === "about" ? (
                <>
                  <div className="serviceDetail-container">
                    <button onClick={() => setNormal("service")}>
                      {<FaWrench style={{ marginRight: "8px" }} />}
                      Service
                    </button>
                    <button className="disabled" disabled>
                      {<FaInfoCircle style={{ marginRight: "8px" }} />}
                      About
                    </button>
                    <button onClick={handleSave}>
                      {isAlreadySaved ? (
                        <>
                          <FaRegSave style={{ marginRight: "8px" }} />
                          Unsave
                        </>
                      ) : (
                        <>
                          <FaSave style={{ marginRight: "8px" }} />
                          Save
                        </>
                      )}
                    </button>
                  </div>

                  <AboutUser />
                </>
              ) : (
                ""
              )}
            </>
          </div>
        </div>
      </div>

      {/* //////////// */}
      <div className="ProfileContainer-container-bottom">
        <Label label="Comments" />
        <div className="comment-container">
          <Profile src={currentUser.avatar} />
          <textarea
            className="comment-box"
            value={newComment}
            onChange={handleCommentChange}
            placeholder="Type your comment..."
          />
          <button onClick={handleCommentSubmit}>
            <FaComment style={{ marginRight: "8px" }} />
            Comments
          </button>
        </div>
        <div className="comment-area">
          <ul>
            {user?.comments.map((comment, index) => (
              <div key={index}>
                <div className="comment-area-profile">
                  <Profile src={comment.userAvatar} />
                  <p>{comment.userName}</p>
                </div>
                <div className="comment-area-comments">
                  <p>{comment.comment}</p>
                  <NavigationLink
                    onClick={() => handleCommentDelete(comment._id)}
                    value="Delete"
                  />
                </div>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileUser;
