import { useState } from "react";
import { faqsData } from "../data/data";
import LineGradient from "../images/line-gradient.svg";
import IconPlus from "../images/icon-plus.svg";
import IconMinus from "../images/icon-minus.svg";
import FaqLeft from "../images/faq-left.svg";
import FaqRight from "../images/faq-right.svg";
import "../css/faq.css";

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<
  FaqItemProps & { isOpen: boolean; toggleMenu: () => void }
> = ({ question, answer, isOpen, toggleMenu }) => {
  return (
    <div className="faq-text" onClick={toggleMenu}>
      <p>{question}</p>
      <img src={isOpen ? IconMinus : IconPlus} alt="Toggle icon" />
      {isOpen && <p className="open">{answer}</p>}
    </div>
  );
};

const Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => {
    setOpenIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <section className="faq" id="faq">
      <div className="faq-intro">
        <img src={LineGradient} alt="horizontal grey line gradient" />
        <p>FAQs</p>
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
