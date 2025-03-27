import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/style/css/profile.css"; // Import file CSS

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) {
      navigate("/login");
      return;
    }
    setUser(JSON.parse(storedUser));
  }, [navigate]);

  const getValue = (value) => (value ? value : "Unknown");

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2>{getValue(user.username)}</h2>
        <p><strong>Email:</strong> {getValue(user.email)}</p>
        <p><strong>User ID:</strong> {getValue(user.user_id)}</p>
        <p><strong>Role:</strong> {getValue(user.role?.name)}</p>
        <p><strong>Account Status:</strong> {user.is_enabled ? "Disabled" : "Active"}</p>
        <p><strong>Created At:</strong> {getValue(new Date(user.createdAt).toLocaleString())}</p>
      </div>
    </div>
  );
};

export default Profile;
