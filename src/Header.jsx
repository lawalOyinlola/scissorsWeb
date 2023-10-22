import Logo from "./assets/images/logo-scissor.svg";
import ChevronDown from "./assets/images/chevron-down.svg";
import "./assets/header.css";

function Header() {
  return (
    <header>
      <nav className="header-row">
        <a href="#">
          <img src={Logo} alt="scissors logo" />
        </a>
        <div className="center-nav">
          <a href="#">My URLs</a>
          <a href="#" className="features">
            <span>Features</span>
            <img src={ChevronDown} alt="arrow down icon" />
          </a>
          <a href="#"> Pricing </a>
          <a href="#">Analytics</a>
          <a href="#">FAQs</a>
        </div>
        <div className="login">
          <a className="login-btn" href="#">
            Log in
          </a>
          <button className="btn" href="#">
            Try for free
          </button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
