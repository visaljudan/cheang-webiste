import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
const Confirm = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      const res = await fetch("/api/admin/userreq");
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      if (data.success === false) {
        setError(data.message);
      }
      setUsers(data);
      setLoading(false);
    };

    fetchUser();
  }, [currentUser]);
  console.log(users);

  return (
    <>
      <div>Confirm</div>
    </>
  );
};

export default Confirm;
