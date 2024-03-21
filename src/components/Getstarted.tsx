import { Session } from "@supabase/supabase-js";
import GapLeft from "../images/get-started-left.svg";
import GapRight from "../images/get-started-right.svg";
import "../css/getstarted.css";

interface StartedProps {
  handleSignUpButtonClick: () => void;
  session: Session | null;
}

const GetStarted: React.FC<StartedProps> = ({
  session,
  handleSignUpButtonClick,
}) => {
  return (
    <div className="gap" id="get-started">
      <div className="get-started">
        <p>Revolutionizing Link Optimization</p>
        <button
          className="button"
          onClick={handleSignUpButtonClick}
          disabled={session !== null}
        >
          Get Started
        </button>
      </div>
      <img className="gap-left" src={GapLeft} alt="abstract" />
      <img className="gap-right" src={GapRight} alt="abstract" />
    </div>
  );
};

export default GetStarted;
