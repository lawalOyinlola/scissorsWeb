import LineGradient from "./assets/images/line-gradient.svg";
import IconTickBlue from "./assets/images/icon-check-circle-blue.svg";
import IconTick from "./assets/images/icon-check-circle.svg";
import "./assets/pricing.css";

function Pricing() {
  return (
    <section className="pricing" id="priceee">
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
        <div className="basic box">
          <p className="price-title">Basic</p>

          <div>
            <h2 className="price">Free</h2>

            <ul>
              <p className="price-subtitle">Free plan for all users</p>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>Unlimited URL Shortening</p>
              </li>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>Basic Link Analytics</p>
              </li>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>Customizable Short Links</p>
              </li>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>Standard Support</p>
              </li>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>Ad-supported</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="professional box">
          <p className="price-title">Professional</p>

          <div>
            <h2 className="price">
              $15<span>/</span>month
            </h2>

            <ul>
              <p className="price-subtitle">Ideal for business creators</p>

              <li>
                <img src={IconTick} alt="tick icon" />

                <p>Enhanced Link Analytics</p>
              </li>

              <li>
                <img src={IconTick} alt="tick icon" />

                <p>Custom Branded Domains</p>
              </li>

              <li>
                <img src={IconTick} alt="tick icon" />

                <p>Advanced Link Customization</p>
              </li>

              <li>
                <img src={IconTick} alt="tick icon" />

                <p>Priority Support</p>
              </li>

              <li>
                <img src={IconTick} alt="tick icon" />

                <p>Ad-free Experience</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="teams box">
          <p className="price-title">Teams</p>

          <div>
            <h2 className="price">
              $25<span>/</span>month
            </h2>

            <ul>
              <p className="price-subtitle">Share with up to 10 users</p>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>Team Collaboration</p>
              </li>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>User Roles and Permissions</p>
              </li>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>Enhanced Security</p>
              </li>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>API Access</p>
              </li>

              <li>
                <img src={IconTickBlue} alt="tick icon" />

                <p>Dedicated Account Manager</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="price-btn">
        <button className="white-btn" href="#">
          Get Custom Pricing
        </button>

        <button href="#">Select Pricing</button>
      </div>
    </section>
  );
}

export default Pricing;
