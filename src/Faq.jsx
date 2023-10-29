import { useState } from "react";
import LineGradient from "./assets/images/line-gradient.svg";
import IconPlus from "./assets/images/icon-plus.svg";
import IconMinus from "./assets/images/icon-minus.svg";
import "./assets/faq.css";

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
        <FaqItem
          question="How does URL shortening work?"
          answer="URL shortening works by taking a long URL and creating a shorter, condensed version that redirects to the original URL. When a user clicks on the shortened link, they are redirected to the intended destination."
        />
        <FaqItem
          question="Is it necessary to create an account to use the URL shortening service?"
          answer="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Soluta possimus qui, animi, facere blanditiis eum, cumque beatae veniam vero veritatis eligendi nemo pariatur voluptatibus magni. Autem error itaque non quis."
        />
        <FaqItem
          question="Are the shortened links permanent? Will they expire?"
          answer="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Placeat, quia. Non explicabo suscipit unde itaque minus, corrupti at distinctio. Animi quos iure aliquid necessitatibus quia sapiente molestiae facilis harum sequi."
        />
        <FaqItem
          question="Are there any limitations on the number of URLs I can shorten?"
          answer="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quod voluptatibus reiciendis iusto deserunt dicta eaque error minima consequatur! Officia ea quidem ipsum distinctio neque minus eveniet unde dignissimos consequuntur delectus."
        />
        <FaqItem
          question="Can I customize the shortened URLs to reflect my brand or content?"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores ex fuga dicta quam totam recusandae et perspiciatis tempore possimus! Quisquam soluta totam quibusdam dolorum sint consequuntur doloribus nam nesciunt nisi!"
        />
        <FaqItem
          question="Can I track the performance of my shortened URLs?"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Architecto eos aperiam excepturi. Ipsam voluptatem eaque architecto laboriosam hic nihil sint possimus, accusamus, corrupti in odio totam voluptatum modi vitae aspernatur."
        />
        <FaqItem
          question="How secure is the URL shortening service? Are the shortened links protected against spam or malicious activity?"
          answer="Lorem, ipsum dolor sit amet consectetur adipisicing elit. Corporis quas et pariatur possimus, earum natus eius fugit aliquam exercitationem sint non beatae? Ullam?"
        />
        <FaqItem
          question="What is a QR code and what can it do?"
          answer="Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque placeat ullam numquam laboriosam debitis perferendis, repudiandae sequi quia labore tempora pariatur non itaque assumenda quas dolore ut mollitia! Facilis, eius."
        />
        <FaqItem
          question="Is there an API available for integrating the URL shortening service into my own applications or websites?"
          answer="Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugit laboriosam doloribus corrupti temporibus quos voluptate facilis ipsum. Consectetur, nihil illo. Hic, adipisci fugiat velit architecto soluta atque consequuntur neque dolores!"
        />
      </div>
    </section>
  );
}

export default Faq;
