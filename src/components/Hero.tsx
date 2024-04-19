import { useState, useEffect, useRef } from "react";
import { Session } from "@supabase/supabase-js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BlueLine from "../images/blue-line.svg";
import Triangle from "../images/triangle-vector.svg";
import ChainLink from "../images/chainlink.svg";
import ChainLinkDark from "../images/chainlink-dark.svg";
import EllipseBg from "../images/ellipse-background.svg";
import Ellipse from "../images/ellipse.svg";
import "../css/hero.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: "sine.inOut", duration: 1 });

interface HeroProps {
  handleSignUpButtonClick: () => void;
  session: Session | null;
}

const Hero: React.FC<HeroProps> = ({ session, handleSignUpButtonClick }) => {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("light");
  const container = useRef<HTMLDivElement>(null);

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

  // GSAP Animation
  useGSAP(
    () => {
      gsap.from(".ellipse", {
        opacity: 0.3,
        scaleX: 0.4,
        scrollTrigger: {
          trigger: ".chainlink",
          start: "bottom 76%",
          end: "top 20%",
          scrub: true,
        },
      });
      gsap.to(".ellipse", {
        x: "-50%",
        y: "-50%",
      });
      gsap
        .timeline()
        .from(".underline", {
          opacity: 0,
          scaleX: 2,
          duration: 1.2,
        })
        .from(
          ".intro-text",
          {
            opacity: 0,
            y: 30,
            scale: 1.1,
          },
          "-=70%"
        )
        .to(".chainlink-text", {
          x: 48,
          opacity: 0.2,
          scrollTrigger: {
            trigger: ".chainlink",
            start: "bottom bottom",
            end: "top top",
            scrub: true,
          },
        })
        .to(".chainlink-img", {
          x: -56,
          opacity: 0.2,
          scrollTrigger: {
            trigger: ".chainlink",
            start: "bottom bottom",
            end: "top top",
            scrub: true,
          },
        });
    },
    { scope: container }
  );

  return (
    <main id="main" className="main" ref={container}>
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
          <p className="intro-text">
            Personalize your shortened URLs to align with your brand identity.
            Utilize custom slugs, branded links, and domain customization
            options to reinforce your brand presence and enhance user
            engagement.
          </p>
          <div className="signup">
            <button
              className="signup-btn button"
              onClick={handleSignUpButtonClick}
              disabled={session !== null}
            >
              Sign Up
            </button>
            <a href="#features" className="learn-btn">
              Learn more...
            </a>
          </div>
        </div>
        <div className="chainlink">
          <img className="triangle" src={Triangle} alt="triangular figure" />
          <img
            className="chainlink-img"
            src={colorScheme === "light" ? ChainLink : ChainLinkDark}
            alt="connected chain-link image"
          />
          <p className="chainlink-text">
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
};

export default Hero;
