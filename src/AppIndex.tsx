import { useState } from "react";
import { footerData } from "./data/data";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import App from "./App";
import Auth from "./components/Auth";
import "./css/App.css";

const AppIndex: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openAuth = () => {
    setIsOpen(true);
    document.body.classList.add("auth-open");
  };

  const closeAuth = () => {
    setIsOpen(false);
    document.body.classList.remove("auth-open");
  };

  const [activeTab, setActiveTab] = useState<"signup" | "login" | "forgot">(
    "signup"
  );

  const handleTabClick = (tabId: "signup" | "login" | "forgot") => {
    setActiveTab(tabId);
  };

  const handleLoginButtonClick = () => {
    openAuth();
    setActiveTab("login");
  };
  return (
    <>
      <NavBar handleLoginButtonClick={handleLoginButtonClick} />
      <App />
      <Footer footerData={footerData} />
      <Auth
        isOpen={isOpen}
        closeAuth={closeAuth}
        activeTab={activeTab}
        handleTabClick={handleTabClick}
      />
    </>
  );
};

export default AppIndex;
