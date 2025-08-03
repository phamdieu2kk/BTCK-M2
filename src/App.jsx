// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import các trang
import Home from "./pages/Home/Home";
import AddCar from "./pages/AddCar/AddCar";
import CarDetails from "./pages/CarDetails/CarDetails";
import Category from "./pages/Category/Category";
import Profile from "./pages/Profile/Profile";
import SearchFilter from "./pages/SearchFilter/SearchFilter";
import DetailCar from "./components/DetailCar/DetailCar";
import Payment from "./pages/Payment/Payment";
import Favorites from "./pages/Favorites/Favorites";
import Dashboard from "./pages/Dashboard/Dashboard";

// Import CSS cho Slick Carousel
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/car/:id" element={<CarDetails />} />
        <Route path="/category" element={<Category />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchFilter />} />
        <Route path="/detailcar/:id" element={<DetailCar />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
