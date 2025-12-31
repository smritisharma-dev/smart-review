import React from "react";

function GoogleBusiness() {
  return(


  
    <div className="container-fluid mt-4">

      {/* Page Header */}
      <div className="mb-4">
        <h4 className="fw-bold mb-1">Google Business Search</h4>
        <p className="text-muted mb-0">
          Search any business and view Google ratings & reviews
        </p>
      </div>

      {/* Search Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">Search Business</h6>

          <div className="row g-2">
            <div className="col-md-9">
              <input
                type="text"
                className="form-control"
                placeholder="Enter business name or address"
              />
            </div>
            <div className="col-md-3 d-grid">
              <button className="google-connect-btn">
                Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Business Result */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="fw-bold mb-1">Business Name Here</h5>
          <p className="mb-1">
            ⭐ 4.5 <span className="text-muted">(250 reviews)</span>
          </p>
          <p className="text-muted mb-0">
            Business address will appear here
          </p>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h6 className="fw-semibold mb-3">Google Reviews</h6>

          {/* Review Card */}
          <div className="border-bottom pb-3 mb-3">
            <div className="d-flex justify-content-between">
              <strong>User Name</strong>
              <small className="text-muted">2 months ago</small>
            </div>
            <div className="mb-1">⭐⭐⭐⭐⭐</div>
            <p className="mb-0">
              Review text will appear here.
            </p>
          </div>

          {/* Review Card */}
          <div className="border-bottom pb-3 mb-3">
            <div className="d-flex justify-content-between">
              <strong>User Name</strong>
              <small className="text-muted">5 months ago</small>
            </div>
            <div className="mb-1">⭐⭐⭐⭐</div>
            <p className="mb-0">
              Another review text will appear here.
            </p>
          </div>

          <small className="text-muted">
            Reviews powered by Google Places API
          </small>
        </div>
      </div>

  

    </div>
    
  );
}

export default GoogleBusiness;



  


