import { pricingData } from "../data/data";
import LineGradient from "../images/line-gradient.svg";
import IconTickBlue from "../images/icon-check-circle-blue.svg";
import IconTick from "../images/icon-check-circle.svg";
import "../css/pricing.css";

interface PricingItem {
  type: string;
  price: string;
  subtitle: string;
  features: string[];
}

const Pricing: React.FC = () => {
  return (
    <section className="pricing" id="pricing">
      <div className="price-texts">
        <img src={LineGradient} alt="horizontal grey line gradient" />
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
