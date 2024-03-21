import { analyticsData, featuresData } from "../data/data";
import LineGradient from "../images/line-gradient.svg";
import "../css/scissorstats.css";

interface AnalyticsData {
  number: string;
  stat: string;
}
interface Feature {
  iconSrc: string;
  altText: string;
  title: string;
  description: string;
}

interface FeatureProps {
  iconSrc: string;
  altText: string;
  title: string;
  description: string;
}

const ScissorStats: React.FC = () => {
  return (
    <section className="scissors-info" id="stats">
      <div className="analytics">
        <p className="analytics-heading">
          One Stop Four <span>Possibilities</span>
        </p>
        <div className="analytics-info">
          {analyticsData.map((analysis: AnalyticsData, index: number) => (
            <div key={index}>
              <p>{analysis.number}</p>
              <p>{analysis.stat}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="features" id="features">
        <div className="why-scissors">
          <img src={LineGradient} alt="horizontal grey line gradient" />
          <p className="features-heading">
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
        <div className="features-container">
          {featuresData.map((feature: Feature, index: number) => (
            <FeatureBlock
              key={index}
              iconSrc={feature.iconSrc}
              altText={feature.altText}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureBlock: React.FC<FeatureProps> = ({
  iconSrc,
  altText,
  title,
  description,
}) => (
  <div className="feature-block">
    <img src={iconSrc} alt={altText} />
    <div>
      <p>{title}</p>
      <p>{description}</p>
    </div>
  </div>
);

export default ScissorStats;
