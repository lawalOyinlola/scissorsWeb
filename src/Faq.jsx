import LineGradient from "./assets/images/line-gradient.svg";
import IconPlus from "./assets/images/icon-plus.svg";
import IconMinus from "./assets/images/icon-minus.svg";
import "./assets/faq.css";

function Faq() {
  return (
    <section className="faq">
      <div className="faq-intro">
        <img src={LineGradient} alt="horizontal grey line gradient" />
        <p>FAQs</p>
      </div>
      <div className="faq-block">
        <div className="faq-text">
          <p>How does URL shortening work?</p>
          <img src={IconMinus} alt="minus icon" />
          <p className="open">
            URL shortening works by taking a long URL and creating a shorter,
            condensed version that redirects to the original URL. When a user
            clicks on the shortened link, they are redirected to the intended
            destination.
          </p>
        </div>
        <div className="faq-text">
          <p>
            Is it necessary to create an account to use the URL shortening
            service?
          </p>
          <img src={IconPlus} alt="plus icon" />
        </div>
        <div className="faq-text">
          <p>Are the shortened links permanent? Will they expire?</p>
          <img src={IconPlus} alt="plus icon" />
        </div>
        <div className="faq-text">
          <p>Are there any limitations on the number of URLs I can shorten?</p>
          <img src={IconPlus} alt="plus icon" />
        </div>
        <div className="faq-text">
          <p>
            Can I customize the shortened URLs to reflect my brand or content?
          </p>
          <img src={IconPlus} alt="plus icon" />
        </div>
        <div className="faq-text">
          <p>Can I track the performance of my shortened URLs?</p>
          <img src={IconPlus} alt="plus icon" />
        </div>
        <div className="faq-text">
          <p>
            How secure is the URL shortening service? Are the shortened links
            protected against spam or malicious activity?
          </p>
          <img src={IconPlus} alt="plus icon" />
        </div>
        <div className="faq-text">
          <p>What is a QR code and what can it do?</p>
          <img src={IconPlus} alt="plus icon" />
        </div>
        <div className="faq-text">
          <p>
            Is there an API available for integrating the URL shortening service
            into my own applications or websites?
          </p>
          <img src={IconPlus} alt="plus icon" />
        </div>
      </div>
    </section>
  );
}

export default Faq;
