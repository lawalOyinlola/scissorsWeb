import { Bug } from "@phosphor-icons/react";
import "../css/error.css";

function MyErrorBoundary() {
  return (
    <section className="error-container">
      <div className="wrong">
        <Bug className="bug" weight="duotone" />
        <h2>Something went wrong</h2>
      </div>
      <a href="/" className="home">
        Go back to home page.
      </a>
    </section>
  );
}

export default MyErrorBoundary;
