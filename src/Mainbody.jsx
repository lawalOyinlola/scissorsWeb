import { useState, useEffect } from "react";
import BlueLine from "./assets/images/blue-line.svg";
import Triangle from "./assets/images/triangle-vector.svg";
import ChainLink from "./assets/images/chainlink.svg";
import ChainLinkDark from "./assets/images/chainlink-dark.svg";
import EllipseBg from "./assets/images/ellipse-background.svg";
import Ellipse from "./assets/images/ellipse.svg";
import "./assets/css/mainbody.css";

function MainBody() {
  const [colorScheme, setColorScheme] = useState("light");

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    setColorScheme(mediaQuery.matches ? "dark" : "light");

    const handleChange = () => {
      setColorScheme(mediaQuery.matches ? "dark" : "light");
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return (
    <main id="main">
      <div className="main-body">
        <div className="main-top">
          <div className="main-intros">
            <p className="main-intro">
              Optimize Your Online Experience with Our Advanced
              <span>
                &nbsp;URL Shortening
                <img
                  className="underline"
                  src={BlueLine}
                  alt=" blue underline"
                />
              </span>
              &nbsp;Solution
            </p>
          </div>
          <p>
            Personalize your shortened URLs to align with your brand identity.
            Utilize custom slugs, branded links, and domain customization
            options to reinforce your brand presence and enhance user
            engagement.
          </p>
          <div className="signup">
            <button className="signup-btn button">Sign Up</button>
            <a href="#">Learn more</a>
          </div>
        </div>
        <div className="chainlink">
          <img className="triangle" src={Triangle} alt="triangular figure" />
          <img
            src={colorScheme === "light" ? ChainLink : ChainLinkDark}
            alt="connected chain-link image"
          />
          <p>
            Seamlessly transform your long URLs into concise and shareable links
            with just few clicks.
          </p>
        </div>
      </div>
      <figure className="main-bottom">
        <img className="ellipse" src={Ellipse} alt="grey ellipse" />
        <img className="grey-bg" src={EllipseBg} alt="grey background" />
      </figure>
    </main>
  );
}

export default MainBody;
