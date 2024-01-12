import { useEffect, useState } from "react";
import { useTheme } from "../../context/ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  FaComment,
  FaInfoCircle,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPlusCircle,
  FaRegSave,
  FaSave,
  FaSellcast,
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
import TextBorder from "../../components/textBorder/TextBorder";
import Button from "../../components/button/Button";
import ServiceSelector from "../serviceSelector/ServiceSelector";
import { NavigationLink } from "../../components/navigationLink/NavigationLink";
import AboutUser from "../aboutUser/AboutUser";
import ServiceCreate from "../serviceCreate/ServiceCreate";
// import "./ProfileUser.scss";
const ProfileUserCurrent = () => {
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
  //   const [userRating, setUserRating] = useState(0);

  //   const handleRatingChange = (newRating) => {
  //     setFormData({
  //       ...formData,
  //       // Assuming you want to set the userRating in formData
  //       userRating: newRating,
  //     });
  //   };

  //   const handleSubmit = async (e) => {
  //     e.preventDefault();
  //     try {
  //       dispatch(updateUserStart());
  //       const res = await fetch(`/api/user/rating/${params.userId}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           rating: formData.userRating,
  //         }),
  //       });

  //       const data = await res.json();
  //       if (data.success === false) {
  //         dispatch(updateUserFailure(data.message));
  //         return;
  //       }

  //       // Assuming the server responds with the updated user data
  //       setUser(data.updatedUser); // Update the state with the new data
  //       // dispatch(updateUserSuccess(data)); // Assuming you have a success action

  //       // Fetch the updated user data after rating
  //       const updatedUserResponse = await fetch(
  //         `/api/user/getUser/${params.userId}`
  //       );
  //       const updatedUserData = await updatedUserResponse.json();
  //       setUser(updatedUserData);

  //       // dispatch(updateUserSuccess(data));
  //     } catch (error) {
  //       dispatch(updateUserFailure(error.message));
  //     }
  //   };

  const averageRating =
    user && user.ratings.length > 0
      ? user.ratings.reduce((sum, rating) => sum + rating.rating, 0) /
        user.ratings.length
      : 0;

  ///////////Comments//////////
  //   const [comments, setComments] = useState([]);
  //   const [newComment, setNewComment] = useState("");

  //   const handleCommentChange = (event) => {
  //     setNewComment(event.target.value);
  //   };

  //   const handleCommentSubmit = async (e) => {
  //     try {
  //       e.preventDefault(); // Prevent the default form submission

  //       dispatch(updateUserStart());

  //       const res = await fetch(`/api/user/comment/${params.userId}`, {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           nameuser: currentUser.nameuser,
  //           avatar: currentUser.avatar,
  //           comment: newComment,
  //         }),
  //       });

  //       const data = await res.json();
  //       if (data.success === false) {
  //         dispatch(updateUserFailure(data.message));
  //         return;
  //       }
  //       // Assuming the server responds with the updated user data
  //       setUser(data.updatedUser); // Update the state with the new data

  //       // Fetch the updated user data after posting a comment
  //       const updatedUserResponse = await fetch(
  //         `/api/user/getUser/${params.userId}`
  //       );
  //       const updatedUserData = await updatedUserResponse.json();
  //       setUser(updatedUserData);

  //       // // Clear the newComment state after successful comment submission
  //       setNewComment("");
  //     } catch (error) {
  //       dispatch(updateUserFailure(error.message));
  //     }
  //   };

  //   const handleCommentDelete = async (commentId) => {
  //     try {
  //       dispatch(updateUserStart());

  //       const res = await fetch(`/api/user/deletecomment/${commentId}`, {
  //         method: "DELETE",
  //         headers: {
  //           "Content-Type": "application/json",
  //           // Include any authentication headers if required
  //         },
  //         body: JSON.stringify({
  //           user: user._id,
  //         }),
  //       });

  //       const data = await res.json();
  //       // console.log(data);
  //       if (data.success === false) {
  //         dispatch(updateUserFailure(data.message));
  //         return;
  //       }
  //       setUser(data);
  //     } catch (error) {
  //       dispatch(updateUserFailure(error.message));
  //     }
  //   };

  ///////////Save User//////////
  //////////////

  console.log(currentUser);
  return (
    <div className={`ProfileContainer ${theme}`}>
      <div className="ProfileContainer-container">
        <div className="ProfileContainer-container-left">
          {loading && <p className="">Loading...</p>}
          {error && <p className="">Something went wrong!</p>}
          {currentUser && !loading && !error && (
            <div className={`userprofileDetail ${theme}`}>
              <div className="userserviceDetail-container" key={currentUser.id}>
                <Profile src={currentUser.avatar} />
                {currentUser.userPro ? (
                  <Label label={currentUser.brandName} />
                ) : (
                  <Label label={currentUser.nameuser} />
                )}
                <div className="userserviceDetail-container-tag">
                  <Tag label={currentUser.mainService || "None"} />
                  <Tag label={currentUser.subService || "None"} />
                </div>
                <div className="userserviceDetail-container-rate">
                  <ShowStar rating={averageRating.toFixed(2)} />
                  <p>{averageRating.toFixed(2)}</p>
                </div>
                <div className="userserviceDetail-container-detail">
                  <div className="TextBorder-container">
                    <TextBorder
                      label={<FaMapMarkerAlt />}
                      text={currentUser.city + currentUser.province || "None"}
                    />
                    <TextBorder
                      label={<FaPhoneAlt />}
                      text={currentUser.phone || "None"}
                    />
                  </div>
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
                    <button onClick={() => setNormal("addService")}>
                      {<FaPlusCircle style={{ marginRight: "8px" }} />}
                      Add Service
                    </button>
                    <button onClick={() => setNormal("setting")}>
                      {<FaSellcast style={{ marginRight: "8px" }} />}
                      Setting
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
                    <button onClick={() => setNormal("addService")}>
                      {<FaPlusCircle style={{ marginRight: "8px" }} />}
                      Add Service
                    </button>
                    <button onClick={() => setNormal("setting")}>
                      {<FaSellcast style={{ marginRight: "8px" }} />}
                      Setting
                    </button>
                  </div>

                  <AboutUser />
                </>
              ) : normal === "addService" ? (
                <>
                  <div className="serviceDetail-container">
                    <button onClick={() => setNormal("service")}>
                      {<FaWrench style={{ marginRight: "8px" }} />}
                      Service
                    </button>
                    <button onClick={() => setNormal("about")}>
                      {<FaInfoCircle style={{ marginRight: "8px" }} />}
                      About
                    </button>
                    <button className="disabled" disabled>
                      {<FaPlusCircle style={{ marginRight: "8px" }} />}
                      Add Service
                    </button>
                    <button onClick={() => setNormal("setting")}>
                      {<FaSellcast style={{ marginRight: "8px" }} />}
                      Setting
                    </button>
                  </div>
                  <ServiceCreate />
                </>
              ) : normal === "setting" ? (
                <>
                  <div className="serviceDetail-container">
                    <button onClick={() => setNormal("service")}>
                      {<FaWrench style={{ marginRight: "8px" }} />}
                      Service
                    </button>
                    <button onClick={() => setNormal("about")}>
                      {<FaInfoCircle style={{ marginRight: "8px" }} />}
                      About
                    </button>
                    <button onClick={() => setNormal("addService")}>
                      {<FaPlusCircle style={{ marginRight: "8px" }} />}
                      Add Service
                    </button>
                    <button className="disabled" disabled>
                      {<FaSellcast style={{ marginRight: "8px" }} />}
                      Setting
                    </button>
                  </div>
                </>
              ) : (
                ""
              )}
            </>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileUserCurrent;
