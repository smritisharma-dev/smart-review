import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
      <div className="container-fluid">
       
<Link className="navbar-brand fw-bold" to="/">
  <span className="text-warning">Smart</span> Reviews
</Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link className="nav-link active" aria-current="page" to="/reviewPage">Review Us</Link>
            <Link className="nav-link" to="/showreview">Show Reviews</Link>
            <Link className="nav-link" to="/adminLogin">Login Admin</Link>
            <span className="nav-link disabled" aria-disabled="true">Disabled</span>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
