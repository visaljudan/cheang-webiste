import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Label from "../../components/label/Label";
import AdminAppLayout from "../layouts/AdminAppLayout";
// import PeiChart from "../components/pieChart/PieChart";
import "./DashboardPage.scss";

const DashboardPage = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    console.log(currentUser);
    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch("/api/user/countusers");
      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
      }
      setUsers(data);
      console.log(data);
      setLoading(false);
    };

    fetchUser();
  }, [currentUser]);

  //Pei chart

  return (
    <AdminAppLayout>
      <div className="dashboard-contain">
        <Label label="DashBoard" />
        <div className="users-container">
          <div className="user-box">
            <h3>Total Users</h3>
            <p>{users.length}</p>
          </div>
          <div className="user-box">
            <h3>User</h3>
            <p>{users.filter((user) => !user.userPro).length}</p>
          </div>
          <div className="user-box">
            <h3>User Pro</h3>
            <p>{users.filter((user) => user.userPro).length}</p>
          </div>
        </div>
        <div className="user-peichart">
          <div className="pei-container">
            {/* <PeiChart /> */}
          </div>
        </div>
      </div>
    </AdminAppLayout>
  );
};

export default DashboardPage;
