import LineGradient from "./assets/images/line-gradient.svg";
import IconLink from "./assets/images/icon-link.svg";
import IconWrite from "./assets/images/icon-write.svg";
import IconApps from "./assets/images/icon-apps.svg";
import IconVolt from "./assets/images/icon-volt.svg";
import "./assets/scissorstats.css";

function ScissorStats() {
  return (
    <section className="scissors-info" id="stats">
      <div className="stats">
        <p className="stat">
          One Stop Four <span>Possibilities</span>
        </p>
        <div className="stat-texts">
          <div>
            <p>3M</p>
            <p>Active users</p>
          </div>
          <div>
            <p>60M</p>
            <p>Links &amp; QR codes created</p>
          </div>
          <div>
            <p>1B</p>
            <p>Clicked and scanned connection</p>
          </div>
          <div>
            <p>300k</p>
            <p>App intergrations</p>
          </div>
        </div>
      </div>
      <div className="info" id="features">
        <div className="why-scissors">
          <img src={LineGradient} alt="horizontal grey line gradient" />
          <p className="why-text">
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
        <div className="info-blocks">
          <div className="info-block">
            <img src={IconLink} alt="link icon" />
            <div>
              <p>URL Shortening</p>
              <p>
                Scissor allows you to shorten URLs of your business, events.
                Shorten your URL at scale, URL redirects.
              </p>
            </div>
          </div>
          <div className="info-block">
            <img src={IconWrite} alt="notepad icon" />
            <div>
              <p>Custom URLs</p>
              <p>
                With Scissor, you can create custom URLs, with the length you
                want! A solution for socials and businesses.
              </p>
            </div>
          </div>
          <div className="info-block">
            <img src={IconApps} alt="app icon" />
            <div>
              <p>QR Codes</p>
              <p>
                Generate QR codes to your business, events. Bring your audience
                and customers to your doorstep with this scan and go solution.
              </p>
            </div>
          </div>
          <div className="info-block">
            <img src={IconVolt} alt="chart icon" />
            <div>
              <p>Data Analytics</p>
              <p>
                Receive data on the usage of either your shortened URL, custom
                URLs or generated QR codes. Embedded to monitor progress.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ScissorStats;
