import LineGradient from "./assets/images/line-gradient.svg";
import { statData, infoData } from "./assets/data/scissorsData";
import "./assets/css/scissorstats.css";

function ScissorStats() {
  return (
    <section className="scissors-info" id="stats">
      <div className="stats">
        <p className="stat">
          One Stop Four <span>Possibilities</span>
        </p>
        <div className="stat-texts">
          {statData.map((stat) => (
            <div key={stat.name}>
              <p>{stat.number}</p>
              <p>{stat.stat}</p>
            </div>
          ))}
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
          {infoData.map((block, index) => (
            <InfoBlock
              key={index}
              iconSrc={block.iconSrc}
              altText={block.altText}
              title={block.title}
              description={block.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

const InfoBlock = ({ iconSrc, altText, title, description }) => (
  <div className="info-block">
    <img src={iconSrc} alt={altText} />
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  </div>
);

export default ScissorStats;
