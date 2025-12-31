import React, { useEffect, useState } from "react";
import axios from "axios";

function ShowReview() {
  const [reviewData, setReviewData] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:5000/fetchReview")
      .then((res) => {
        console.log(res.data.showReview);
        setReviewData(res.data.showReview);
      })
      .catch((error) => console.log("data not received", error.message));
  }, []);

  return (
    <div className="container bg-light mt-3">
      <div className="row d-flex align-items-center ">

        <h1 className="text-center text-primary"> Reviews </h1>
      </div>
      {reviewData.map((value, index) => (
        <div key={index} className="mb-4 p-3 border-5 border-bottom border-primary">
          <div className="row d-flex align-items-center mb-2">
            <div className="col-2 ">
              <span  style={{color:"yellow",fontSize:"30px"}}>{"★".repeat(value.rating)}</span>
            </div>

            <div className="col-5 ">
              {value.status==="pending" ?(
              <p className="text-warning">{value.status}</p>)
:(
<p className="text-sucess">{value.status}</p>)
}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
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
