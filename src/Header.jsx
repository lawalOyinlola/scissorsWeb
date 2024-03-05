import Logo from "./assets/images/logo-scissor.svg";
import ChevronDown from "./assets/images/chevron-down.svg";
import ChevronDownBlue from "./assets/images/chevron-down-blue.svg";
import { X, List } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import "./assets/css/header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function toggleFixedHeader() {
    const navbar = document.getElementById("navbar");
    const main = document.getElementById("main");
    const scrollPosition = window.scrollY;

    const threshold = 500;

    if (scrollPosition > threshold) {
      navbar.classList.add("fixed");
      main.style.paddingTop = navbar.offsetHeight + "px";
    } else {
      navbar.classList.remove("fixed");
      main.style.paddingTop = 0;
    }
  }

  window.addEventListener("scroll", toggleFixedHeader);

  useEffect(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const targetId = this.getAttribute("href");
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: "smooth",
          });
        }
      });
    });
  }, []);

  function toggleMenu() {
    setIsOpen(!isOpen);
  }

  return (
    <header id="navbar">
      <div className="header">
        <a href="#main">
          <img src={Logo} alt="scissors logo" />
        </a>
        <nav className="header-nav">
          <ul className={!isOpen ? "nav" : "nav-open"}>
            <li onClick={toggleMenu}>
              <a href="#cta-form">My URLs</a>
            </li>
            <li onClick={toggleMenu}>
              <a
                href="#features"
                className="features"
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
                <a className="login-btn" href="#get-started">
                  Log in
                </a>
              </li>
              <li onClick={toggleMenu}>
                <button className="try-btn button">Try for free</button>
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
}

export default Header;
