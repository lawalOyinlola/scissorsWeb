import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { X, List } from "@phosphor-icons/react";
import { Session } from "@supabase/supabase-js";
import Logo from "../images/logo-scissor.svg";
import ChevronDown from "../images/chevron-down.svg";
import ChevronDownBlue from "../images/chevron-down-blue.svg";
import "../css/navbar.css";

interface NavBarProps {
  handleLoginButtonClick: () => void;
  handleLogout: () => void;
  session: Session | null;
}

const NavBar: React.FC<NavBarProps> = ({
  handleLoginButtonClick,
  handleLogout,
  session,
}) => {
  const body = document.body;

  const [navIsOpen, setNavIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMenu = () => {
    setNavIsOpen(!navIsOpen);
    toggleNavOpenClass(!navIsOpen);
  };

  const handleMenuBtn = () => {
    setNavIsOpen(false);
    toggleNavOpenClass(false);
  };

  const toggleNavOpenClass = (navIsOpen: boolean) => {
    if (navIsOpen) {
      body.classList.add("nav-open");
    } else {
      body.classList.remove("nav-open");
    }
  };

  const toggleFixedHeader = () => {
    const navbar = document.getElementById("navbar");

    const scrollPosition = window.scrollY;
    const threshold = 500;
    if (navbar && body) {
      if (scrollPosition > threshold) {
        navbar.classList.add("fixed");
        body.style.paddingTop = navbar.offsetHeight + "px";
      } else {
        navbar.classList.remove("fixed");
        body.style.paddingTop = "0";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleFixedHeader);
    return () => {
      window.removeEventListener("scroll", toggleFixedHeader);
    };
  }, []);

  return (
    <header id="navbar">
      <div className="header">
        <NavLink to="/" className="link">
          <img src={Logo} alt="scissors logo" />
        </NavLink>
        <nav className="header-nav">
          <ul className={!navIsOpen ? "nav" : "nav open"}>
            <li onClick={handleMenuBtn}>
              <NavLink to="/myurl" className="link">
                My URLs
              </NavLink>
            </li>
            <li onClick={handleMenuBtn}>
              <a
                href="../#features"
                className="features-link"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                Features
                <img
                  className="chevron"
                  src={isHovered ? ChevronDownBlue : ChevronDown}
                  alt="arrow down icon"
                />
              </a>
            </li>
            <li onClick={handleMenuBtn}>
              <a href="../#pricing"> Pricing </a>
            </li>
            <li onClick={handleMenuBtn}>
              <a href="../#stats">Analytics</a>
            </li>
            <li onClick={handleMenuBtn}>
              <a href="../#faq">FAQs</a>
            </li>

            <ul className="login">
              <li onClick={handleMenuBtn}>
                {session ? (
                  <a className="login-btn" onClick={handleLogout}>
                    Logout
                  </a>
                ) : (
                  <a className="login-btn" onClick={handleLoginButtonClick}>
                    Login
                  </a>
                )}
              </li>
              <li className="try" onClick={toggleMenu}>
                <a href="#trim-url" className="try-btn button">
                  Try for free
                </a>
              </li>
            </ul>
          </ul>
        </nav>

        <button className="menu-btn" onClick={toggleMenu}>
          {!navIsOpen ? (
            <List size={42} weight="bold" />
          ) : (
            <X size={42} weight="bold" />
          )}
        </button>
      </div>
    </header>
  );
};

export default NavBar;
