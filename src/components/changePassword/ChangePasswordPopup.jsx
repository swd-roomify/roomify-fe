import { useState } from "react";
import { updatePasswordUtil } from "@/utils/AuthUtil"; 
import "../../assets/style/css/changePasswordPopup.css";

const ChangePasswordPopup = ({ onClose }) => {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!newPassword || !confirmPassword) {
            setMessage("Please fill in all fields.");
            return;
        }
        if (newPassword !== confirmPassword) {
            setMessage("New passwords do not match.");
            return;
        }

        const user = JSON.parse(localStorage.getItem("user"));
        if (!user || !user.user_id) {
            setMessage("User not found. Please log in again.");
            return;
        }

        setLoading(true);
        try {
            await updatePasswordUtil(user.user_id, oldPassword, newPassword);
            setMessage("✅ Password changed successfully!");
            setTimeout(() => {
                setMessage("");
                onClose();
            }, 2000);
        } catch (error) {
            setMessage("❌ Failed to change password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="close-btn" onClick={onClose}>&times;</button>
                <h2>🔒 Change Password</h2>
                <form onSubmit={handleSubmit}>
                    <label>Old Password</label>
                    <small className="info-text">Optional if password not initialized (created by Google)</small>
                    <input 
                        type="password" 
                        value={oldPassword} 
                        onChange={(e) => setOldPassword(e.target.value)} 
                    />

                    <label>New Password</label>
                    <input 
                        type="password" 
                        value={newPassword} 
                        onChange={(e) => setNewPassword(e.target.value)} 
                        required 
                    />

                    <label>Confirm New Password</label>
                    <input 
                        type="password" 
                        value={confirmPassword} 
                        onChange={(e) => setConfirmPassword(e.target.value)} 
                        required 
                    />

                    {message && <p className="message">{message}</p>}
                    
                    <div className="popup-actions">
                        <button type="submit" className="submit-btn" disabled={loading}>
                            {loading ? "Updating..." : "Change Password"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ChangePasswordPopup;
