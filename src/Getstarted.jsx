import GapLeft from "./assets/images/get-started-left.svg";
import GapRight from "./assets/images/get-started-right.svg";
import "./assets/css/getstarted.css";

function GetStarted() {
  return (
    <div className="gap" id="get-started">
      <div className="get-started">
        <p>Revolutionizing Link Optimization</p>
        <button className="button" href="#">
          Get Started
        </button>
      </div>
      <img className="gap-left" src={GapLeft} alt="abstract" />
      <img className="gap-right" src={GapRight} alt="abstract" />
    </div>
  );
}

export default GetStarted;
