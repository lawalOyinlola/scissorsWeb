import { analyticsData, featuresData } from "../data/data";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/src/ScrollTrigger";
import LineGradient from "../images/line-gradient.svg";
import "../css/scissorstats.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: "sine.inOut", duration: 1 });
interface AnalyticsData {
  number: string;
  stat: string;
}
interface Feature {
  iconSrc: string;
  altText: string;
  title: string;
  description: string;
}

interface FeatureProps {
  iconSrc: string;
  altText: string;
  title: string;
  description: string;
}

const ScissorStats: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  // GSAP Animation
  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".analytics-heading", {
          opacity: 0.3,
          scale: 1.2,
          scrollTrigger: {
            trigger: ".analytics",
            start: "bottom 95%",
            end: "top 30%",
            scrub: true,
          },
        })
        .from([".analytics-text"], {
          y: 50,
          opacity: 0.2,
          scrollTrigger: {
            trigger: ".analytics",
            start: "bottom 95%",
            end: "top 30%",
            scrub: true,
          },
        })
        .from(".line,.icon-img", {
          y: -40,
          opacity: 0.3,
          scrollTrigger: {
            trigger: ".line",
            start: "bottom 95%",
            end: "top 30%",
            scrub: true,
          },
        })
        .from(".why-scissors,.feature-block", {
          y: 50,
          opacity: 0.4,
          scrollTrigger: {
            trigger: ".line",
            start: "bottom 95%",
            end: "top 30%",
            scrub: true,
          },
        });
    },
    { scope: container }
  );

  return (
    <section className="scissors-info" id="stats" ref={container}>
      <div className="analytics">
        <p className="analytics-heading">
          One Stop.
          <br />
          Four <span>Possibilities.</span>
        </p>
        <div className="analytics-info">
          {analyticsData.map((analysis: AnalyticsData, index: number) => (
            <div key={index}>
              <p className="analytics-no">{analysis.number}</p>
              <p className="analytics-text">{analysis.stat}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="features" id="features">
        <div className="why-scissors">
          <img
            className="line"
            src={LineGradient}
            alt="horizontal grey line gradient"
          />
          <p className="features-heading">
            Why choose <span>Scissors</span>
          </p>
          <p>
            Scissors is the hub of everything that has to do with your link
            management. We shorten your URLs, allow you creating custom ones for
            your personal, business, event usage. Our swift QR code creation,
            management and usage tracking with advance analytics for all of
            these is second to none.
          </p>
        </div>
        <div className="features-container">
          {featuresData.map((feature: Feature, index: number) => (
            <FeatureBlock
              key={index}
              iconSrc={feature.iconSrc}
              altText={feature.altText}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureBlock: React.FC<FeatureProps> = ({
  iconSrc,
  altText,
  title,
  description,
}) => (
  <div className="feature-block">
    <img src={iconSrc} alt={altText} className="icon-img" />
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  </div>
);

export default ScissorStats;
