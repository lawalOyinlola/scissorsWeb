import { useState } from "react";
import PropTypes from "prop-types";
import LineGradient from "./assets/images/line-gradient.svg";
import IconPlus from "./assets/images/icon-plus.svg";
import IconMinus from "./assets/images/icon-minus.svg";
import FaqLeft from "./assets/images/faq-left.svg";
import FaqRight from "./assets/images/faq-right.svg";
import faqData from "./assets/data/faqData";
import "./assets/css/faq.css";

const FaqItem = ({ question, answer, isOpen, toggleMenu }) => {
  return (
    <div className="faq-text" onClick={toggleMenu}>
      <p>{question}</p>
      <img src={isOpen ? IconMinus : IconPlus} />
      {isOpen && <p className="open">{answer}</p>}
    </div>
  );
};

FaqItem.propTypes = {
  question: PropTypes.string.isRequired,
  answer: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  toggleMenu: PropTypes.func.isRequired,
};

function Faq() {
  const [openIndex, setOpenIndex] = useState(0);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="faq" id="faq">
      <div className="faq-intro">
        <img src={LineGradient} alt="horizontal grey line gradient" />
        <p>FAQs</p>
      </div>
      <div className="faq-block">
        {faqData.map((faq, index) => (
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
}

export default Faq;
