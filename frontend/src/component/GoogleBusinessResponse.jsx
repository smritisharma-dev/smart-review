import React, { useState, useEffect } from "react";
import { searchBusiness, findBusinessDetails } from "../api/googleBusiness.api";

const GoogleBusinessResponse = () => {
  const [query, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);

  const [searchingLoading, setSearchingLoading] = useState(false);
  const [typingLoading, setTypingLoading] = useState(false);

  /* -------------------- TYPING SEARCH -------------------- */
  useEffect(() => {
    if (query.trim().length < 3) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(async () => {
      setTypingLoading(true);
      try {
        const res = await searchBusiness(query);
        setSuggestions(res || []);
      } finally {
        setTypingLoading(false);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [query]);

  /* -------------------- SELECT FROM DROPDOWN -------------------- */
  const handleSelect = (item) => {
    setSelectedBusiness(item);
    setSearchQuery(item.displayName?.text);
    setSuggestions([]);
  };

  /* -------------------- SEARCH BUTTON -------------------- */
  const handleSearch = async () => {
    if (!query.trim()) return;

    setSearchingLoading(true);

    try {
      let placeId = selectedBusiness?.id;

      if (!placeId) {
        const list = await searchBusiness(query);
        if (!list.length) return;
        placeId = list[0].id;
      }

      setSuggestions([]);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const res = await findBusinessDetails(placeId);
      setSelectedBusiness(res);
    } finally {
      setSearchingLoading(false);
      setSearchQuery("");
    }
  };

  /* -------------------- SKELETON -------------------- */
  const BusinessSkeleton = () => (
    <>
      <div className="card shadow-sm mb-4">
        <div className="card-body placeholder-glow">
          <h4 className="placeholder col-6"></h4>
          <p className="placeholder col-4"></p>
        </div>
      </div>

      {[1, 2, 3].map((i) => (
        <div key={i} className="card shadow-sm mb-3">
          <div className="card-body placeholder-glow">
            <h6 className="placeholder col-3"></h6>
            <p className="placeholder col-6"></p>
            <p className="placeholder col-9"></p>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div className="container-fluid mt-4">
      <h4 className="fw-bold mb-1">Google Business Search</h4>
      <p className="text-muted mb-3">
        Search any business and view Google ratings & reviews
      </p>

      {/* Search box */}
      <div className="card shadow-sm mb-4">
        <div className="card-body position-relative">
          <div className="row g-2">
            <div className="col-md-9">
              <input
                className="form-control"
                value={query}
                placeholder="Enter business name"
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedBusiness(null);
                }}
              />
            </div>

            <div className="col-md-3 d-grid">
              <button
                className="google-connect-btn"
                disabled={searchingLoading || !query}
                onClick={handleSearch}
              >
                {searchingLoading ? "Searching..." : "Search"}
              </button>
            </div>
          </div>

          {/* Dropdown */}
          {suggestions.length > 0 && (
            <div className="dropdown-menu show w-100 mt-1">
              {suggestions.map((item) => (
                <button
                  key={item.id}
                  className="dropdown-item"
                  onClick={() => handleSelect(item)}
                >
                  {item.displayName?.text}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Skeleton */}
      {searchingLoading && <BusinessSkeleton />}

      {/* Business Info */}
      {!searchingLoading && selectedBusiness?.rating && (
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h4 className="fw-bold">{selectedBusiness.displayName}</h4>
            <span className="badge bg-success">⭐ {selectedBusiness.rating}</span>
          </div>
        </div>
      )}

      {/* Reviews */}
      {selectedBusiness?.reviews?.map((review, i) => (
        <div key={i} className="card shadow-sm mb-3">
          <div className="card-body">
            <h6>{review.authorAttribution?.displayName || "Anonymous"}</h6>
            <div className="text-warning">{"⭐".repeat(review.rating)}</div>
            <p className="mt-2">{review.text?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GoogleBusinessResponse;
