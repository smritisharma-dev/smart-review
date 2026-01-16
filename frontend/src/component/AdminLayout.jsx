import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import AdminNav from "./AdminNav";

const AdminLayout = () => {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">
      {/* Global Navbar */}
      <AdminNav />

      <div className="container-fluid mt-3">
        <div className="row">
          {/* Sidebar */}
          <div className="col-3">
            <aside className="bg-white p-3 rounded shadow mb-3">
              <ul className="list-unstyled">

                <li className="mb-2">
                  <NavLink
                    to="/adminmanager/dashboard"
                    className={({ isActive }) =>
                      `d-block p-2 rounded ${
                        isActive
                          ? "border border-primary text-primary bg-light"
                          : "text-dark"
                      }`
                    }
                  >
                    Dashboard Overview
                  </NavLink>
                </li>

                <li className="mb-2">
                  <NavLink
                    to="/adminmanager/google-business"
                    className={({ isActive }) =>
                      `d-block p-2 rounded ${
                        isActive
                          ? "border border-primary text-primary bg-light"
                          : "text-dark"
                      }`
                    }
                  >
                    Google Business
                  </NavLink>
                </li>

                <li className="mb-2">
                  <NavLink
                    to="/adminmanager/review/pending"
                    className={({ isActive }) =>
                      `d-block p-2 rounded ${
                        isActive
                          ? "border border-primary text-primary bg-light"
                          : "text-dark"
                      }`
                    }
                  >
                    Pending Approvals
                  </NavLink>
                </li>

              </ul>
            </aside>
          </div>

          {/* Main Content */}
          <div className="col-9 p-3 main-content">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
