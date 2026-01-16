import React from "react";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function Approval() {
  const [review, setReview] = useState([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("pending");
  const [isEditing, setIsEditing] = useState(false);

  const [editReviewData, setEditReviewData] = useState({
    name: "",
    rating: 0,
    heading: "",
    message: ""
  });

  const { status: routeStatus } = useParams();
  const navigate = useNavigate();

  const showReviews = async (status) => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:5000/review/${status}`);
      setReview(res.data.data || []);
      setStatus(status);
    } catch (error) {
      // silent fail for production
    } finally {
      setLoading(false);
    }
  };

  const approvedReview = async (id) => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5000/review/${id}/approve`);
      setReview((pre) => pre.filter((item) => item._id !== id));
    } catch (error) {} 
    finally {
      setLoading(false);
    }
  };

  const rejectReview = async (id) => {
    setLoading(true);
    try {
      await axios.patch(`http://localhost:5000/review/${id}/reject`);
      setReview((pre) => pre.filter((item) => item._id !== id));
    } catch (error) {} 
    finally {
      setLoading(false);
    }
  };

  const editReview = async (id, editedData) => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `http://localhost:5000/review/${id}/edit`,
        editedData
      );
      const updatedReview = res.data.data;
      setReview((pre) =>
        pre.map((item) => (item._id === id ? updatedReview : item))
      );
      setEditReviewData({ name: "", rating: 0, heading: "", message: "" });
    } catch (error) {} 
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const currentStatus = routeStatus || "pending";
    showReviews(currentStatus);
  }, [routeStatus]);

  return (
    <div className="container-fluid mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Review Approval Management</h3>

        <div className="dropdown">
          <button
            className="btn btn-outline-primary dropdown-toggle"
            data-bs-toggle="dropdown"
          >
            Status: {status}
          </button>

          <ul className="dropdown-menu dropdown-menu-end">
            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("../pending", { relative: "path" })}
              >
                Pending
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("../approved", { relative: "path" })}
              >
                Approved
              </button>
            </li>
            <li>
              <button
                className="dropdown-item"
                onClick={() => navigate("/adminmanager/review/rejected")}
              >
                Rejected
              </button>
            </li>
          </ul>
        </div>
      </div>

      <table className="table table-hover mt-3">
        <thead>
          <tr>
            <th>Reviewer</th>
            <th>Heading</th>
            <th>Rating</th>
            <th>Message</th>
            <th>Status</th>
            <th style={{ minWidth: "180px" }}>Action</th>
          </tr>
        </thead>

        <tbody>
          {loading && (
            <tr>
              <td colSpan="8">loading reviews.......</td>
            </tr>
          )}

          {!loading && review.length === 0 && (
            <tr>
              <td colSpan="8">No Reviews found.......</td>
            </tr>
          )}

          {review.map((value) => (
            <tr key={value._id}>
              <td>
                <div>{value.name}</div>
                <small>{value.emailid}</small>
              </td>
              <td>{value.heading}</td>
              <td>{"⭐".repeat(value.rating)}</td>
              <td>{value.message}</td>
              <td>{value.status}</td>
              <td>
                <div className="d-flex flex-nowrap gap-1">
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => {
                      setIsEditing(true);
                      setEditReviewData({
                        name: value.name,
                        heading: value.heading,
                        rating: value.rating,
                        message: value.message
                      });
                    }}
                  >
                    Edit
                  </button>

                  {value.status === "pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => approvedReview(value._id)}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => rejectReview(value._id)}
                      >
                        Reject
                      </button>
                    </>
                  )}
                </div>

                {!loading && isEditing && (
                  <div className="card p-2 mt-2">
                    <input
                      className="form-control mb-1"
                      value={editReviewData.name}
                      onChange={(e) =>
                        setEditReviewData({
                          ...editReviewData,
                          name: e.target.value
                        })
                      }
                    />
                    <input
                      className="form-control mb-1"
                      value={editReviewData.heading}
                      onChange={(e) =>
                        setEditReviewData({
                          ...editReviewData,
                          heading: e.target.value
                        })
                      }
                    />
                    <textarea
                      className="form-control mb-1"
                      value={editReviewData.message}
                      onChange={(e) =>
                        setEditReviewData({
                          ...editReviewData,
                          message: e.target.value
                        })
                      }
                    />
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        editReview(value._id, editReviewData);
                        setIsEditing(false);
                      }}
                    >
                      Save Changes
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Approval;
