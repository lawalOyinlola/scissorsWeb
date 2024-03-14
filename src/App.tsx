// // import { BrowserRouter as Router } from "react-router-dom";
// // import { RouterProvider } from "react-router5";
import { useState, useEffect } from "react";
import { footerData } from "./data/data";
// // import AppRouter from "./AppRouter";
import NavBar from "./components/NavBar";
// import Hero from "./components/Hero.js";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import "./css/App.css";
import HomePage from "./pages/HomePage";
import MyUrlPage from "./pages/MyUrlPage";
import UrlDetails from "./components/UrlDetails.js";
import { Session } from "@supabase/supabase-js";
import { getSession } from "./supabase";
// import AnalyticsPage from "./pages/AnalyticsPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const App: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

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
    getSession();
  };

  const handleSignUpButtonClick = () => {
    openAuth();
    setActiveTab("signup");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar
            handleLoginButtonClick={handleLoginButtonClick}
            session={session}
          />
          <HomePage handleSignUpButtonClick={handleSignUpButtonClick} />
          <Footer footerData={footerData} />
          <Auth
            isOpen={isOpen}
            closeAuth={closeAuth}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
          <UrlDetails />
        </>
      ),
    },
    {
      path: "/myurl",
      element: (
        <>
          <NavBar
            handleLoginButtonClick={handleLoginButtonClick}
            session={session}
          />
          <MyUrlPage />
          <Footer footerData={footerData} />
          <Auth
            isOpen={isOpen}
            closeAuth={closeAuth}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
          />
        </>
      ),
    },
    //   {
    //     path: "/analytics",
    //     element:
    //         <AnalyticsPage />

    //   },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
