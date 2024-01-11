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
import ShowStar from "../../components/starRating/ShowStar";
import { FaRegSave, FaSave } from "react-icons/fa";
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
  // const [userRating, setUserRating] = useState(0);

  const handleRatingChange = (newRating) => {
    setFormData({
      ...formData,
      // Assuming you want to set the userRating in formData
      userRating: newRating,
    });
  };

  /////////////////comments//////////////////////////
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
  /////////////Save/////////
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
      dispatch(updateUserSuccess(data)); // Assuming you have a success action

      // Fetch the updated user data after rating
      const updatedUserResponse = await fetch(
        `/api/user/getUser/${params.userId}`
      );
      const updatedUserData = await updatedUserResponse.json();
      setUser(updatedUserData);

      dispatch(updateUserSuccess(data));
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
  }, []);
  const averageRating =
    user && user.ratings.length > 0
      ? user.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
        user.ratings.length
      : 0;

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
                  <div>
                    <ShowStar rating={averageRating.toFixed(2)} />
                    <p>Average Rating: {averageRating.toFixed(2)}</p>
                  </div>

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
                    <StarRating
                      userId={params.userId}
                      onChange={handleRatingChange}
                    />
                    {currentUser ? (
                      <button onClick={handleSubmit}>Submit Rating</button>
                    ) : null}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="ProfileContainer-container-right">
            {/* <ProfileTodo /> */}
            {/* <ServicePromote /> */}
            {/* <ServiceDetail /> */}
            <div>
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

              <button onClick={handleSave}>
                <FaSave style={{ marginRight: "8px" }} />
                save
              </button>
            </div>
            <div>
              <h2>Comments</h2>
              <div>
                <textarea
                  value={newComment}
                  onChange={handleCommentChange}
                  placeholder="Type your comment..."
                />
                <button onClick={handleCommentSubmit}>Submit</button>
              </div>
              <ul>
                {user?.comments.map((comment, index) => (
                  <div key={index}>
                    <img src={comment.userAvatar} />
                    <h6>{comment.userName}</h6>
                    <li>{comment.comment}</li>
                    <button onClick={() => handleCommentDelete(comment._id)}>
                      Delete Comment
                    </button>
                  </div>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileUser;
