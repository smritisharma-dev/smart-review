// AdminLayout.js
import { NavLink, Outlet } from "react-router-dom";
import React from "react";
import AdminNav from "./AdminNav";
import DashboardOver from "./DashboardOver";

const AdminLayout = ({ children }) => {
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
                <li className="p-2 mb-2 bg-primary text-white rounded"><NavLink to="/adminmanager/dashboard" className="p-2 d-block bg-light rounded">
                    Dashboard Overview
                  </NavLink></li>
                <li className="p-2 mb-2 bg-light rounded"><NavLink to="/adminmanager/google-business" className="p-2 d-block bg-light rounded">
                    Google Business
                  </NavLink></li>
                <li className="p-2 mb-2 bg-light rounded"><NavLink to="/adminmanager/approval" className="p-2 d-block bg-light rounded">Pending Approvals</NavLink></li>
                <li className="p-2 mb-2 bg-light rounded"><NavLink to="/adminmanager/analytics" className="p-2 d-block bg-light rounded">
                    Analytics
                  </NavLink></li>
                <li className="p-2 mb-2 bg-light rounded"></li>
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
