import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userService from "../services/userService";
import "../pages/Account.scss";

const Account = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  });
  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userDataFromStorage = JSON.parse(localStorage.getItem("user"));
        console.log("User data from storage:", userDataFromStorage); // Log 1

        if (userDataFromStorage && userDataFromStorage.email) {
          console.log(
            "Fetching user data from API for email:",
            userDataFromStorage.email
          ); // Log 2
          const userResponse = await userService.getUserByEmail(
            userDataFromStorage.email
          );
          console.log("API response for user data:", userResponse); // Log 3

          // Check if response and data exist and have the expected structure
          const userData = userResponse?.data?.data; // Corrected: access nested data
          console.log("Processed user data from API:", userData); // Log 4

          if (userData) {
            setUser(userData);
            setFormData({
              fullName: userData.fullName || "",
              email: userData.email || "",
              phone: userData.phone || "",
              address: userData.address || "",
            });
            console.log("User state and formData set:", userData); // Log 5
          } else {
            console.error("User data not found in API response.");
            // If user data not found in API despite having email in storage, maybe log out or navigate to login
            navigate("/dang-nhap-tai-khoan"); // Or handle appropriately
          }
        } else {
          console.log("No user data or email in storage, navigating to login."); // Log 6
          navigate("/dang-nhap-tai-khoan");
        }
      } catch (error) {
        console.error("Error fetching user data:", error); // Log 7
        // Consider navigating to login or showing an error message
        navigate("/dang-nhap-tai-khoan");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePasswordInputChange = (e) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      // Ensure user object and its id exist before calling update
      if (!user || !user.id) {
        console.error("User object or user ID is missing.");
        alert("Không tìm thấy thông tin người dùng để cập nhật.");
        return;
      }
      const response = await userService.update({
        // Assuming your update endpoint uses user ID from the user object
        ...user,
        ...formData,
      });

      console.log("Update API response:", response); // Log update response

      // Assuming update API also returns user data in response.data.data
      const updatedUserData = response?.data?.data;
      console.log("Processed updated user data:", updatedUserData); // Log processed updated data

      if (updatedUserData) {
        setUser(updatedUserData);
        localStorage.setItem("user", JSON.stringify(updatedUserData)); // Corrected: save only the user data object
        console.log("User data saved to localStorage:", updatedUserData); // Log data saved to storage
        setIsEditing(false);
        alert("Cập nhật thông tin thành công!");
      } else {
        console.error("Updated user data not found in API response.");
        alert(
          "Cập nhật thông tin thất bại: Không nhận được dữ liệu người dùng cập nhật."
        );
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Cập nhật thông tin thất bại.");
    }
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      alert("Mật khẩu mới và xác nhận mật khẩu mới không khớp.");
      return;
    }

    if (!user || !user.id) {
      alert("Không tìm thấy thông tin người dùng.");
      return;
    }

    try {
      // Call the change password API
      await userService.changePassword(
        user.id,
        passwordData.oldPassword,
        passwordData.newPassword
      );
      alert("Đổi mật khẩu thành công!");
      // Clear the password fields
      setPasswordData({
        oldPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      });
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle specific error messages from backend if available
      const errorMessage =
        error.response?.data?.message || "Đổi mật khẩu thất bại.";
      alert(errorMessage);
    }
  };

  return (
    <div className="account-page">
      <div className="account-container">
        <div className="account-sidebar">
          <div className="user-info">
            <div className="avatar">
              <i className="fa-solid fa-user"></i>
            </div>
            <h3>{user?.fullName || "Đang tải..."}</h3>
            <p>{user?.email || ""}</p>
          </div>
          <nav className="account-nav">
            <button
              className={`nav-item ${activeTab === "profile" ? "active" : ""}`}
              onClick={() => setActiveTab("profile")}
            >
              <i className="fa-solid fa-user"></i>
              Thông tin cá nhân
            </button>
            <button
              className={`nav-item ${
                activeTab === "change-password" ? "active" : ""
              }`}
              onClick={() => setActiveTab("change-password")}
            >
              <i className="fa-solid fa-lock"></i>
              Đổi mật khẩu
            </button>
          </nav>
        </div>

        <div className="account-content">
          {activeTab === "profile" && user && (
            <div className="profile-section">
              <div className="section-header">
                <h2>Thông tin cá nhân</h2>
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  {isEditing ? "Hủy" : "Chỉnh sửa"}
                </button>
              </div>

              <form onSubmit={handleUpdateProfile}>
                <div className="form-group">
                  <label>Họ và tên</label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                <div className="form-group">
                  <label>Số điện thoại</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    disabled={!isEditing}
                  />
                </div>

                {isEditing && (
                  <button type="submit" className="save-button">
                    Lưu thay đổi
                  </button>
                )}
              </form>
            </div>
          )}

          {activeTab === "change-password" && (
            <div className="change-password-section">
              <div className="section-header">
                <h2>Đổi mật khẩu</h2>
              </div>

              <form onSubmit={handleChangePassword}>
                <div className="form-group">
                  <label>Mật khẩu cũ</label>
                  <input
                    type="password"
                    name="oldPassword"
                    value={passwordData.oldPassword}
                    onChange={handlePasswordInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Mật khẩu mới</label>
                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Xác nhận mật khẩu mới</label>
                  <input
                    type="password"
                    name="confirmNewPassword"
                    value={passwordData.confirmNewPassword}
                    onChange={handlePasswordInputChange}
                    required
                  />
                </div>

                <button type="submit" className="save-button">
                  Đổi mật khẩu
                </button>
              </form>
            </div>
          )}

          {!user && activeTab === "profile" && (
            <div className="loading-message">
              Đang tải thông tin người dùng...
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
