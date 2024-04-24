import { useState, useRef } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { faqsData } from "../data/data";
import LineGradient from "../images/line-gradient.svg";
import IconPlus from "../images/icon-plus.svg";
import IconMinus from "../images/icon-minus.svg";
import FaqLeft from "../images/faq-left.svg";
import FaqRight from "../images/faq-right.svg";
import "../css/faq.css";

gsap.registerPlugin(useGSAP, ScrollTrigger);
gsap.defaults({ ease: "sine.inOut", duration: 1 });

interface FaqItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  toggleMenu: () => void;
}

const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  isOpen,
  toggleMenu,
}) => {
  const [parent] = useAutoAnimate();

  return (
    <div className="faq-text" onClick={toggleMenu} ref={parent}>
      <p>{question}</p>
      <img src={isOpen ? IconMinus : IconPlus} alt="Toggle icon" />
      {isOpen && <p className="open">{answer}</p>}
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const container = useRef<HTMLDivElement>(null);

  const toggleItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  // GSAP Animation
  useGSAP(
    () => {
      const faqTexts = gsap.utils.toArray(".faq-text");

      faqTexts.forEach((faqText: any) => {
        gsap.from(faqText, {
          y: 120,
          opacity: 0,
          scrollTrigger: {
            trigger: faqText,
            start: "top 95%",
            end: "top 80%",
            scrub: true,
          },
        });
      });
      gsap
        .timeline()
        .from(".faq-title", {
          y: 40,
          opacity: 0.2,
          scrollTrigger: {
            trigger: ".line",
            start: "bottom 95%",
            end: "top 70%",
            scrub: true,
          },
        })
        .from(".line", {
          y: -40,
          opacity: 0,
          scrollTrigger: {
            trigger: ".line",
            start: "bottom 95%",
            end: "top 70%",
            scrub: true,
          },
        });
    },
    { scope: container }
  );

  return (
    <section className="faq" id="faq" ref={container}>
      <div className="faq-intro">
        <img
          src={LineGradient}
          alt="horizontal grey line gradient"
          className="line"
        />
        <p className="faq-title">FAQs</p>
      </div>
      <div className="faq-block">
        {faqsData.map((faq, index) => (
          <FaqItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={index === openIndex}
            toggleMenu={() => toggleItem(index)}
          />
        ))}
      </div>
      <img className="faq-left" src={FaqLeft} alt="abstract" />
      <img className="faq-right" src={FaqRight} alt="abstract" />
    </section>
  );
};

export default Faq;
