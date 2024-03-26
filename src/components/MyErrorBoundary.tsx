import { Link } from "react-router-dom";
import "../css/error.css";

function MyErrorBoundary() {
  return (
    <div className="error-container">
      <div>
        <h1>Something went wrong</h1>
      </div>
      <div className="links">
        <Link to="/" className="link">
          Go back to home page.
        </Link>
      </div>
    </div>
  );
}

export default MyErrorBoundary;
