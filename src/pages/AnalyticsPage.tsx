import { useLocation, useParams } from "react-router-dom";
import "./analyticspage.css";

const AnalyticsPage: React.FC = () => {
  const location = useLocation();
  const { shortcode } = useParams<{ shortcode: string }>();
  const analyticsData = location.state?.analyticsData;
  console.log(analyticsData);

  if (!analyticsData) {
    return <p>Loading...</p>;
  }

  return (
    <section className="analysis">
      <div className="column flex">
        <p>Long link: &nbsp;&nbsp;{analyticsData.url}</p>
        <p>Short link: &nbsp;&nbsp;https://spoo.me/{shortcode}</p>
        <p>Creation date: &nbsp;&nbsp;{analyticsData["creation-date"]}</p>
      </div>
      <div className="column flex">
        <p>Last click: {analyticsData["last-click"]}</p>
        <p>Last click country: {analyticsData["last-click-country"]}</p>
        <p>Last click browser: {analyticsData["last-click-browser"]}</p>
        <p>Last click OS: {analyticsData["last-click-os"]}</p>
      </div>
      <div className="flex">
        <strong>Browser</strong>
        {/* <ul>
          {Object.entries(analyticsData.browser).map(([browserName]) => (
            <li key={browserName}>
              {browserName}: {}
            </li>
          ))}
        </ul> */}
      </div>
      <div className="flex dark">
        <p>Total click</p>
        <h2>{analyticsData["total-clicks"]}</h2>
      </div>
      <div className="flex left">
        <p>Average daily clicks</p>
        <h2>{analyticsData.average_daily_clicks}</h2>
      </div>
      <div className="flex right"></div>
      <div className="flex ">
        <p>Average weekly clicks</p>
        <h2>{analyticsData.average_weekly_clicks}</h2>
      </div>
      <div className="flex dark">
        <p>Average monthly clicks</p>
        <h2>{analyticsData.average_monthly_clicks}</h2>
      </div>
      <div className="flex left">
        <p>Total unique click</p>
        <h2> {analyticsData.total_unique_clicks}</h2>
      </div>
      <div className="flex right">
        <p>Expired: {analyticsData.expired.toString()}</p>
      </div>
      <div className="column flex">
        <strong>Country:</strong>
        {/* <ul>
          {Object.entries(analyticsData.country).map(([country]) => (
            <li key={country}>
              {country}: {}
            </li>
          ))}
        </ul> */}
      </div>
    </section>
  );
};

export default AnalyticsPage;
