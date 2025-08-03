// src/contexts/DropDownContext.jsx
import { createContext, useContext, useState } from "react";

// Tạo context
const DropDownContext = createContext();

// Provider bọc toàn ứng dụng
export const DropDownProvider = ({ children }) => {
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropOffLocation, setDropOffLocation] = useState("");

  const swapLocations = () => {
    setPickupLocation((prev) => {
      const temp = dropOffLocation;
      setDropOffLocation(prev);
      return temp;
    });
  };

  return (
    <DropDownContext.Provider
      value={{
        pickupLocation,
        setPickupLocation,
        dropOffLocation,
        setDropOffLocation,
        swapLocations,
      }}
    >
      {children}
    </DropDownContext.Provider>
  );
};

// Hook custom
export const useDropDownContext = () => useContext(DropDownContext);
