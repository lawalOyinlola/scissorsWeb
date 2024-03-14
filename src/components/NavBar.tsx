// import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { X, List } from "@phosphor-icons/react";
import Logo from "../images/logo-scissor.svg";
import ChevronDown from "../images/chevron-down.svg";
import ChevronDownBlue from "../images/chevron-down-blue.svg";
import "../css/navbar.css";
import { Session } from "@supabase/supabase-js";

interface NavBarProps {
  handleLoginButtonClick: () => void;
  // session: Session | null;
  // sessionData: Session | null;
  session: Session | null;
}

const NavBar: React.FC<NavBarProps> = ({ handleLoginButtonClick, session }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // const display = useNavigate();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleFixedHeader = () => {
    const navbar = document.getElementById("navbar");
    const main = document.getElementById("main");

    const scrollPosition = window.scrollY;
    const threshold = 500;

    if (navbar && main) {
      if (scrollPosition > threshold) {
        navbar.classList.add("fixed");
        main.style.paddingTop = navbar.offsetHeight + "px";
      } else {
        navbar.classList.remove("fixed");
        main.style.paddingTop = "0";
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleFixedHeader);
    return () => {
      window.removeEventListener("scroll", toggleFixedHeader);
    };
  }, []);

  // useEffect(() => {
  //   document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  //     anchor.addEventListener("click", (e) => {
  //       e.preventDefault();

  //       const targetId = anchor.getAttribute("href") ?? "";
  //       const targetElement = document.querySelector(targetId);

  //       if (targetElement) {
  //         targetElement.scrollIntoView({
  //           behavior: "smooth",
  //         });
  //       }
  //     });
  //   });
  // }, []);

  return (
    <header id="navbar">
      <div className="header">
        <NavLink to="/" className="link">
          <img src={Logo} alt="scissors logo" />
        </NavLink>
        <nav className="header-nav">
          <ul className={!isOpen ? "nav" : "nav-open"}>
            {/* <li >
              <a href="#trim-url">My URLs</a>
            </li> */}
            <li onClick={toggleMenu}>
              <NavLink to="/myurl" className="link">
                My Urls
              </NavLink>
            </li>
            <li onClick={toggleMenu}>
              <a
                href="#features"
                className="features-link"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
              >
                <span>Features</span>
                <img
                  className="chevron"
                  src={isHovered ? ChevronDownBlue : ChevronDown}
                  alt="arrow down icon"
                />
              </a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#pricing"> Pricing </a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#stats">Analytics</a>
            </li>
            <li onClick={toggleMenu}>
              <a href="#faq">FAQs</a>
            </li>
            <ul className="login">
              <li onClick={toggleMenu}>
                <a className="login-btn" onClick={handleLoginButtonClick}>
                  Login
                </a>
              </li>
              <div>
                {session ? (
                  <div>
                    <p>Signed in as: {session.user?.email}</p>
                    <a>Logout out</a>
                  </div>
                ) : (
                  <div>
                    <button onClick={handleLoginButtonClick}>Login 2</button>
                  </div>
                )}
              </div>
              <li className="try" onClick={toggleMenu}>
                <a href="#trim-url" className="try-btn button">
                  Try for free
                </a>
              </li>
            </ul>
          </ul>
        </nav>
        <button className="menu-btn" onClick={toggleMenu}>
          {!isOpen ? (
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
