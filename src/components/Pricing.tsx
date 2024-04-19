import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { pricingData } from "../data/data";
import LineGradient from "../images/line-gradient.svg";
import IconTickBlue from "../images/icon-check-circle-blue.svg";
import IconTick from "../images/icon-check-circle.svg";
import "../css/pricing.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: "sine.inOut", duration: 1 });

interface PricingItem {
  type: string;
  price: string;
  subtitle: string;
  features: string[];
}

const Pricing: React.FC = () => {
  const container = useRef<HTMLDivElement>(null);

  // GSAP Animation
  useGSAP(
    () => {
      gsap
        .timeline()
        .from(".price-texts", {
          opacity: 0.3,
          scale: 0.9,
          scrollTrigger: {
            trigger: ".price-texts",
            start: "bottom 95%",
            end: "top center",
            scrub: true,
          },
        })
        .from(
          ".line",
          {
            y: -40,
            opacity: 0,
            scrollTrigger: {
              trigger: ".line",
              start: "bottom 95%",
              end: "top 30%",
              scrub: true,
            },
          },
          "<"
        )
        .from(".professional", {
          y: 60,
          opacity: 0.4,
          scrollTrigger: {
            trigger: ".price-block",
            start: "top bottom",
            end: "top center",
            scrub: true,
          },
        })
        .from(".basic,.teams", {
          y: -80,
          opacity: 0.4,
          scrollTrigger: {
            trigger: ".price-block",
            start: "top bottom",
            end: "top top",
            scrub: true,
          },
        });
    },
    { scope: container }
  );

  return (
    <section className="pricing" id="pricing" ref={container}>
      <div className="price-texts">
        <img
          src={LineGradient}
          alt="horizontal grey line gradient"
          className="line"
        />
        <p className="price-intro">
          A <span>price perfect</span> for your needs.
        </p>
        <p>
          From catering for your personal, business, event, socials needs, you
          can be rest assured we have you in mind in our pricing.
        </p>
      </div>

      <div className="price-block">
        {pricingData.map((pricing: PricingItem, index: number) => (
          <div key={index} className={`${pricing.type.toLowerCase()} box`}>
            <p className="price-title">{pricing.type}</p>
            <div>
              <h2 className="price">{pricing.price}</h2>
              <ul>
                <p className="price-subtitle">{pricing.subtitle}</p>
                {pricing.features.map(
                  (feature: string, featureIndex: number) => (
                    <li key={featureIndex}>
                      <img
                        src={
                          pricing.type !== "Professional"
                            ? IconTickBlue
                            : IconTick
                        }
                        alt="tick icon"
                      />
                      <p>{feature}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="price-btn">
        <button className="white-btn button">Get Custom Pricing</button>
        <button className="button">Select Pricing</button>
      </div>
    </section>
  );
};

export default Pricing;
