import { useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { ArrowCircleLeft } from "@phosphor-icons/react/dist/ssr";
import Modal from "../components/Modal";
import "./analyticspage.css";

const AnalyticsPage: React.FC = () => {
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  const location = useLocation();
  const { shortcode } = useParams<{ shortcode: string }>();
  const shortLink = `https://spoo.me/${shortcode}`;
  const analyticsData = location.state?.analyticsData;

  // Handle copy of shortened link
  const handleCopy = async () => {
    try {
      // copy shortened link to clipboard
      await navigator.clipboard.writeText(shortLink);
      // if success update user using modal
      setModalMessage("Short link has been copied to clipboard!");
      setShowModal(true);
    } catch (error) {
      console.error("Failed to copy:", error);
      // if error update user using modal
      setModalMessage("Failed to copy to clipboard!");
      setShowModal(true);
    }
  };

  return (
    <div>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
      <section className="analysis">
        <Link to="/myurl" className="back-btn">
          <ArrowCircleLeft className="back-icon" size={40} weight="duotone" />
        </Link>
        <div className="column flex" onClick={handleCopy}>
          <p className="long">Long link: &nbsp;&nbsp;{analyticsData.url}</p>
          <p>Short link: &nbsp;&nbsp;{shortLink}</p>
          <p>Creation date: &nbsp;&nbsp;{analyticsData["creation-date"]}</p>
        </div>
        <div className="column flex">
          <p>
            Last click: &nbsp;
            {!analyticsData["last-click"]
              ? "none"
              : analyticsData["last-click"]}
          </p>
          <p>
            Last click country: &nbsp;
            {!analyticsData["last-click-country"]
              ? "none"
              : analyticsData["last-click-country"]}
          </p>
        </div>
        <div className="flex">
          <strong>Browsers</strong>
          {!analyticsData.browser ? (
            <p>No data available</p>
          ) : (
            <ul className="flex">
              {Object.keys(analyticsData.browser).map((key) => (
                <li key={key}>
                  <strong>{key}:</strong> {analyticsData.browser[key]}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="flex dark">
          <p>Total click</p>
          <h2>{analyticsData["total-clicks"]}</h2>
        </div>
        <div className="flex left">
          <p>Average daily clicks</p>
          <h2>
            {!analyticsData.average_daily_clicks
              ? 0
              : analyticsData.average_daily_clicks}{" "}
          </h2>
        </div>
        <div className="flex right">
          <p>
            Last click browser: &nbsp;
            {!analyticsData["last-click-browser"]
              ? "none"
              : analyticsData["last-click-browser"]}
          </p>
          <p>
            Last click OS: &nbsp;
            {!analyticsData["last-click-os"]
              ? "none"
              : analyticsData["last-click-os"]}
          </p>
        </div>
        <div className="flex left">
          <p>Average weekly clicks</p>
          <h2>
            {!analyticsData.average_weekly_clicks
              ? 0
              : analyticsData.average_weekly_clicks}
          </h2>
        </div>
        <div className="flex dark">
          <p>Average monthly clicks</p>
          <h2>
            {!analyticsData.average_monthly_clicks
              ? 0
              : analyticsData.average_monthly_clicks}
          </h2>
        </div>
        <div className="flex left">
          <p>Total unique click</p>
          <h2>
            {!analyticsData.total_unique_clicks
              ? 0
              : analyticsData.total_unique_clicks}
          </h2>
        </div>
        <div className="flex right">
          <p>Expired: {analyticsData.expired.toString()}</p>
        </div>
        <div className="column flex">
          <strong>Countries:</strong>
          {!analyticsData.country ? (
            <p>No data available</p>
          ) : (
            <ul className="flex">
              {Object.keys(analyticsData.country).map((key) => (
                <li key={key}>
                  <strong>{key}:</strong> {analyticsData.country[key]}
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;
