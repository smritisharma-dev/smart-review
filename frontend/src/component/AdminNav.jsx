import React from "react";
import { useNavigate } from "react-router-dom";

const AdminNav = () => {
  const navigate = useNavigate();

  // Function to actually log out
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/adminlogin");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <span className="navbar-brand text-white mb-0 h4">SmartReview Admin</span>

          {/* Logout Button - triggers modal */}
          <button
            type="button"
            className="btn"
            data-bs-toggle="modal"
            data-bs-target="#logoutModal"
            style={{
              backgroundColor: "white",
              border: "none",
              padding: "6px 18px",
              borderRadius: "20px",
              fontWeight: "600",
              color: "#005eff",
              cursor: "pointer",
              boxShadow: "0 2px 6px rgba(0,0,0,0.15)",
              transition: "0.2s",
              float: "right",
              marginRight: "20px",
              marginTop: "8px"
            }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#f0f6ff")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "white")}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      <div
        className="modal fade"
        id="logoutModal"
        tabIndex="-1"
        aria-labelledby="logoutModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title" id="logoutModalLabel">
                Confirm Logout
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              Are you sure you want to logout?
            </div>

            <div className="modal-footer">
              <button
  type="button"
  className="btn btn-danger"
  onClick={handleLogout}
  data-bs-dismiss="modal"
>
  Logout
</button>

<button
  type="button"
  className="btn btn-secondary"
  data-bs-dismiss="modal"
>
  Cancel
</button>
            </div>

          </div>
        </div>
      </div>
    </>
  );
};

export default AdminNav;
