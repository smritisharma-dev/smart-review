// AdminLayout.js
import React from "react";
import AdminNav from "./AdminNav";

const AdminLayout = ({ children }) => {
  return (
    <div className="min-vh-100 bg-light d-flex flex-column">

      {/* Global Navbar */}
      <AdminNav />

      {/* Content Area (removes big top space) */}
      <div className="container-fluid mt-3">
        <div className="row">

          {/* Sidebar */}
          <div className="col-3">
            <aside className="bg-white p-3 rounded shadow mb-3">
              <ul className="list-unstyled">
                <li className="p-2 mb-2 bg-primary text-white rounded">Dashboard Overview</li>
                <li className="p-2 mb-2 bg-light rounded">All Reviews</li>
                <li className="p-2 mb-2 bg-light rounded">Pending Approvals</li>
                <li className="p-2 mb-2 bg-light rounded">Analytics</li>
                <li className="p-2 mb-2 bg-light rounded">Cloud API Data</li>
              </ul>
            </aside>
</div>
            
          {/* Main Content */}
          <div className="col-9 p-3 main-content">
            {children}
            <h2>Welcome to Admin Panel</h2>
            <p>Select a menu item to view details.</p>
          </div>

        </div>
      </div>
      </div>

    
  );
};

export default AdminLayout;
