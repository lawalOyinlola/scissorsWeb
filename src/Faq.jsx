import { useState } from "react";
import LineGradient from "./assets/images/line-gradient.svg";
import IconPlus from "./assets/images/icon-plus.svg";
import IconMinus from "./assets/images/icon-minus.svg";
import FaqLeft from "./assets/images/faq-left.svg";
import FaqRight from "./assets/images/faq-right.svg";
import faqData from "./assets/data/faqData";
import "./assets/css/faq.css";

const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="faq-text">
      <p>{question}</p>
      <img src={isOpen ? IconMinus : IconPlus} onClick={toggleMenu} />
      <p className="open">{isOpen && answer}</p>
    </div>
  );
};

function Faq() {
  return (
    <section className="faq" id="faq">
      <div className="faq-intro">
        <img src={LineGradient} alt="horizontal grey line gradient" />
        <p>FAQs</p>
      </div>
      <div className="faq-block">
        {faqData.map((item, index) => (
          <FaqItem key={index} question={item.question} answer={item.answer} />
        ))}
      </div>
      <img className="faq-left" src={FaqLeft} alt="abstract" />
      <img className="faq-right" src={FaqRight} alt="abstract" />
    </section>
  );
}

export default Faq;
