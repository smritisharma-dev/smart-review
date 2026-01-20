import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowReview() {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    axios
      .get("https://smart-review-backend.onrender.com/fetchReview")
      .then((res) => {
        const approvedOnly = (res.data.showReview || []).filter(
          (item) => item.status === "approved"
        );
        setReviewData(approvedOnly);
      })
      .catch(() => {
        // silent fail for production
      });
  }, []);

  return (
    <div className="container bg-light mt-3">
      <div className="row align-items-center">
        <h1 className="text-center text-primary">Reviews</h1>
      </div>

      {reviewData.map((value, index) => (
        <div key={index} className="mb-4 p-4 bg-white shadow-sm rounded">
          <div className="row align-items-center mb-2">
            <div className="col-2">
              <span style={{ color: "yellow", fontSize: "30px" }}>
                {"★".repeat(value.rating)}
              </span>
            </div>

            <div className="col-5">
              <p className="text-success">{value.status}</p>
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <h4>{value.name || "Anonymous"}</h4>
              <h4>{value.heading}</h4>
              <h6>{value.emailid}</h6>
              <p>{value.message}</p>
              <p>
                {new Date(value.submittedAt).toLocaleString("en-IN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true
                })}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ShowReview;
