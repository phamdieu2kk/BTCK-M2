import { useState, useEffect } from "react";
import { useSnackbar } from "../contexts/SnackbarContext";
export const useLikedCars = (carId) => {
  const [liked, setLiked] = useState(false);
  const { showSnackbar } = useSnackbar(); // ✅ dùng Snackbar

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("favoriteCars")) || [];
    setLiked(stored.some((car) => car.id === carId));
  }, [carId]);

  const toggleLike = () => {
    const stored = JSON.parse(localStorage.getItem("favoriteCars")) || [];

    const existing = stored.find((car) => car.id === carId);
    let updated;

    if (existing) {
      updated = stored.filter((car) => car.id !== carId);
      setLiked(false);
      showSnackbar("Đã xóa khỏi danh sách yêu thích", "warning");
    } else {
      const carData = JSON.parse(localStorage.getItem("allCars")) || [];
      const newCar = carData.find((c) => c.id === carId);
      if (!newCar) return;
      updated = [...stored, newCar];
      setLiked(true);
      showSnackbar("Đã thêm vào danh sách yêu thích", "success");
    }

    localStorage.setItem("favoriteCars", JSON.stringify(updated));
  };

  return { liked, toggleLike };
};
