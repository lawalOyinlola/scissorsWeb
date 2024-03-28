import { Link } from "react-router-dom";
import { Bug } from "@phosphor-icons/react";
import "../css/error.css";

function MyErrorBoundary() {
  return (
    <section className="error-container">
      <div className="wrong">
        <Bug size={120} weight="duotone" />
        <h2>Something went wrong</h2>
      </div>
      <Link to="/" className="home">
        Go back to home page.
      </Link>
    </section>
  );
}

export default MyErrorBoundary;
