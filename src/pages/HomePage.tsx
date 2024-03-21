// import { useState } from "react";
import Hero from "../components/Hero.js";
import ScissorStats from "../components/Scissorstats";
import Pricing from "../components/Pricing";
import TrimUrl from "../components/TrimUrl";
import Faq from "../components/Faq";
import GetStarted from "../components/Getstarted";
import { Session } from "@supabase/supabase-js";

interface HomePageProps {
  handleSignUpButtonClick: () => void;
  session: Session | null;
}

const HomePage: React.FC<HomePageProps> = ({
  handleSignUpButtonClick,
  session,
}) => {
  // const [isOpen, setIsOpen] = useState(false);

  // const [activeTab, setActiveTab] = useState<"signup" | "login" | "forgot">(
  //   "signup"
  // );

  // const openAuth = () => {
  //   setIsOpen(true);
  //   document.body.classList.add("auth-open");
  // };

  // const handleSignUpButtonClick = () => {
  //   openAuth();
  //   setActiveTab("signup");
  // };
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
