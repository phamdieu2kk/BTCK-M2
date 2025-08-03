import React, { createContext, useContext, useState } from "react";

// Tạo Context
export const UserContextObj = createContext();

// Provider
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@example.com",
    avatar: "/src/assets/img/profile-pic.png",
    phone: "0123456789",
    address: "123 Nguyễn Huệ, Quận 1, TP.HCM",
  });

  // Hàm cập nhật thông tin người dùng (Edit Profile)
  const updateUser = (newData) => {
    setUser((prev) => ({ ...prev, ...newData }));
  };

  // Hàm đăng xuất
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user"); // nếu dùng localStorage
  };

  return (
    <UserContextObj.Provider value={{ user, updateUser, logout }}>
      {children}
    </UserContextObj.Provider>
  );
};

// Hook dùng nhanh
export const useUser = () => useContext(UserContextObj);
