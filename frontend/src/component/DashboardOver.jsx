import React from "react";
import axios from 'axios'
import { useEffect,useState } from "react";
import Trendchart from "./Trendchart";

const DashboardOver = () => {
const [Review , setReview] =useState([])

const[totalReview, SettotalReview] = useState(0)
const[pendingRev,setpendingRev] = useState(0)
const[avgRating , setavgRating] = useState(0)
useEffect(()=>{

axios.get('http://localhost:5000/fetchReview')

.then(res=>{
  

  
 console.log( res.data.latestReview)
 setReview(res.data.latestReview)
 SettotalReview(res.data.totalReview)
 setpendingRev(res.data.pendingReview)
 setavgRating(res.data.averageRating)
})

.catch(error=>{

  console.log(error.response?.data || error.message)
})

},[])

  return (
    <div className="container-fluid bg-light p-4">

      {/* ROW 1: Analytics + Stats */}
      <div className="row mb-3">

        {/* LEFT */}
        <div className="col-md-8">

          {/* Review Trend */}
          <div className="card mb-2 shadow-sm border-0">
            <div className="card-body">
              

              
              
                <Trendchart/>
              
            </div>
          </div>

          {/* Visitor Analytics */}
          <div className="card shadow-sm border-0">
            <div className="card-body">
              <h6 className="mb-1">Visitor Analytics</h6>
              <p className="text-muted small mb-2">
                Profile views & interactions
              </p>

              <div
                className="d-flex align-items-center justify-content-center text-muted"
                style={{
                  height: "180px",
                  backgroundColor: "#f1f3f5",
                  borderRadius: "6px"
                }}
              >
                Visitor Analytics Chart
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT */}
        <div className="col-md-4">

          <div className="card mb-1 bg-primary text-white shadow-sm">
            <div className="card-body text-center">
              <h6>Total Reviews</h6>
              <h2>{totalReview}</h2>
            </div>
          </div>

          <div className="card mb-1 bg-warning text-dark shadow-sm">
            <div className="card-body text-center">
              <h6>Pending Reviews</h6>
              <h2>{pendingRev}</h2>
            </div>
          </div>

          <div className="card bg-success text-white shadow-sm">
            <div className="card-body text-center">
              <h6>Average Rating</h6>
              <h2>{Number(avgRating.toFixed(1))} ⭐</h2>
            </div>
          </div>

        </div>
      </div>

      {/* ROW 2: Recent Reviews Table */}
      <div className="row">
        <div className="col-12">
          <div
            className="card shadow-sm border-0 p-3"
            style={{ backgroundColor: "#f5f7fb" }}
          >
            <h5 className="card-title mb-3">Recent Reviews</h5>

            <table className="table table-hover align-middle">
              <thead style={{ backgroundColor: "#eef1f5" }}>
                <tr>
                  <th>Date</th>
                  <th>Rating</th>
                  <th>Heading</th>
                  <th>Message</th>
                  <th>Email</th>
                </tr>
              </thead>

              <tbody>

                {Review.map((value,index)=>{

                  return(
                <tr key={index}>
                  <td>{new Date(value.submittedAt).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  })}</td>
                  <td><span style={{ color: "#f5c518", fontSize: "18px" }}>
    {"★".repeat(value.rating)}
  </span></td>
                  <td>{value.heading}</td>
                  <td>{value.message}</td>
                  <td>{value.emailid}</td>
                </tr>
                )})
}
              </tbody>
            </table>
          </div>
        </div>
      </div>

    </div>
  );
};

export default DashboardOver;
