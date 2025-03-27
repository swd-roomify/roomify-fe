import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ChangePasswordPopup from "@/components/changePassword/ChangePasswordPopup";
import "../../assets/style/css/profile.css"; // Import CSS

const Profile = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [isPopupOpen, setIsPopupOpen] = useState(false);

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
                <h1 className="profile-title">User Profile</h1>
                <div className="profile-info">
                    <p><strong>Username:</strong> {getValue(user.username)}</p>
                    <p><strong>Email:</strong> {getValue(user.email)}</p>
                    <p><strong>User ID:</strong> {getValue(user.user_id)}</p>
                    <p><strong>Role:</strong> {getValue(user.role_name)}</p>
                    {/* <p><strong>Account Status:</strong> {user.is_enabled ? "Disabled" : "Active"}</p> */}
                    <p><strong>Created At:</strong> {getValue(new Date(user.created_at).toLocaleString())}</p>
                </div>
                <button className="change-password-btn" onClick={() => setIsPopupOpen(true)}>
                    Change Password
                </button>
            </div>

            {isPopupOpen && <ChangePasswordPopup onClose={() => setIsPopupOpen(false)} />}
        </div>
    );
};

export default Profile;
