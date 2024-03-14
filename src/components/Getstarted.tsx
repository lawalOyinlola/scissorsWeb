import GapLeft from "../images/get-started-left.svg";
import GapRight from "../images/get-started-right.svg";
import Qr from "../images/qr.png";
import "../css/getstarted.css";

interface StartedProps {
  handleSignUpButtonClick: () => void;
}

const GetStarted: React.FC<StartedProps> = ({ handleSignUpButtonClick }) => {
  return (
    <div className="gap" id="get-started">
      <div className="get-started">
        <p>Revolutionizing Link Optimization</p>
        <img src={Qr} alt="" className="qr" />
        <button className="button" onClick={handleSignUpButtonClick}>
          Get Started
        </button>
      </div>
      <img className="gap-left" src={GapLeft} alt="abstract" />
      <img className="gap-right" src={GapRight} alt="abstract" />
    </div>
  );
};

export default GetStarted;
