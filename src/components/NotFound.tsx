import { Link } from "react-router-dom";
import { Alien } from "@phosphor-icons/react";
import "../css/error.css";

function NotFound() {
  return (
    <div className="not-found">
      <Alien size={100} weight="duotone" />
      <div>
        <h1 className="code">404 Error</h1>
        <h2>We can&apos;t find the page you&apos;re looking for</h2>
      </div>
      <Link to="/" className="home">
        Go back home
      </Link>
    </div>
  );
}

export default NotFound;
