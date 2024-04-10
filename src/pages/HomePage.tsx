import { Session } from "@supabase/supabase-js";
import Hero from "../components/Hero.js";
import ScissorStats from "../components/Scissorstats";
import Pricing from "../components/Pricing";
import TrimUrl from "../components/TrimUrl";
import Faq from "../components/Faq";
import GetStarted from "../components/Getstarted";

interface HomePageProps {
  handleSignUpButtonClick: () => void;
  session: Session | null;
}

const HomePage: React.FC<HomePageProps> = ({
  handleSignUpButtonClick,
  session,
}) => {
  return (
    <>
      <Hero
        session={session}
        handleSignUpButtonClick={handleSignUpButtonClick}
      />
      <ScissorStats />
      <Pricing />
      <TrimUrl session={session} />
      <Faq />
      <GetStarted
        session={session}
        handleSignUpButtonClick={handleSignUpButtonClick}
      />
    </>
  );
};

export default HomePage;
