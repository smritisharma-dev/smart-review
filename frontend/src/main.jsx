import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App";
import ReviewManagerNav from "./component/ReviewManagerNav";
import ShowReview from "./component/ShowReview";
import Login from "./component/Login";

import AdminLayout from "./component/AdminLayout";
import DashboardOver from "./component/DashboardOver";

import GoogleBusinessResponse from "./component/GoogleBusinessResponse";
import Approval from "./component/Approval";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ReviewManagerNav />

    <div className="container mt-4">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<App />} />
        <Route path="/reviewPage" element={<App />} />
        <Route path="/showreview" element={<ShowReview />} />
        <Route path="/adminlogin" element={<Login />} />

        {/* Admin Routes */}
        <Route path="/adminmanager" element={<AdminLayout />}>
          <Route index element={<DashboardOver />} />
          <Route path="dashboard" element={<DashboardOver />} />
          <Route path="google-business" element={<GoogleBusinessResponse />} />
          <Route path="review/:status" element={<Approval />} />
          
        </Route>
      </Routes>
    </div>
  </BrowserRouter>
);
