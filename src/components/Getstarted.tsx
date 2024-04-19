import { useRef } from "react";
import { Session } from "@supabase/supabase-js";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import GapLeft from "../images/get-started-left.svg";
import GapRight from "../images/get-started-right.svg";
import "../css/getstarted.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: "sine.inOut", duration: 1 });

interface StartedProps {
  handleSignUpButtonClick: () => void;
  session: Session | null;
}

const GetStarted: React.FC<StartedProps> = ({
  session,
  handleSignUpButtonClick,
}) => {
  const container = useRef<HTMLDivElement>(null);

  // GSAP Animation
  useGSAP(
    () => {
      gsap.from(".get-started", {
        opacity: 0.5,
        scale: 0.9,
        scrollTrigger: {
          trigger: ".get-started",
          start: "top 95%",
          end: "top center",
          scrub: true,
        },
      });
    },
    { scope: container }
  );

  return (
    <div className="gap" id="get-started" ref={container}>
      <div className="get-started">
        <p>Revolutionizing Link Optimization</p>
        <button
          className="button"
          onClick={handleSignUpButtonClick}
          disabled={session !== null}
        >
          Get Started
        </button>
      </div>
      <img className="gap-left" src={GapLeft} alt="abstract" />
      <img className="gap-right" src={GapRight} alt="abstract" />
    </div>
  );
};

export default GetStarted;
