// import { useState } from "react";
import Hero from "../components/Hero.js";
import ScissorStats from "../components/Scissorstats";
import Pricing from "../components/Pricing";
import TrimUrl from "../components/TrimUrl";
import Faq from "../components/Faq";
import GetStarted from "../components/Getstarted";

interface HomePageProps {
  handleSignUpButtonClick: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ handleSignUpButtonClick }) => {
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
      <Hero handleSignUpButtonClick={handleSignUpButtonClick} />
      <ScissorStats />
      <Pricing />
      <TrimUrl />
      <Faq />
      <GetStarted handleSignUpButtonClick={handleSignUpButtonClick} />
    </>
  );
};

export default HomePage;
