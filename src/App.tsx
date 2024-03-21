import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState, useEffect } from "react";
import { Session } from "@supabase/supabase-js";
import { getSession, supabase } from "./supabase";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import MyUrlPage from "./pages/MyUrlPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import Footer from "./components/Footer";
import Auth from "./components/Auth";
import Modal from "./components/Modal.js";
import "./css/index.css";

const App: React.FC = () => {
  const [authIsOpen, setAuthIsOpen] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<"signup" | "login" | "forgot">(
    "signup"
  );
  const [errors, setErrors] = useState<{ [key: string]: string }>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    fetchSession();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      setIsLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }
      setModalMessage("You signed up successfully");
      setShowModal(true);
      setFormData({
        email: formData.email,
        password: "",
        confirmPassword: "",
      });
      setIsLoading(false);
      handleTabClick("login");

      console.log("User signed up successfully:", data);
    } catch (error) {
      console.error("Error signing up:", (error as Error).message);

      setModalMessage(`Error signing up: ${(error as Error).message}`);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }
      setSession(data.session ?? null);
      setModalMessage("You logged in successfully");
      setShowModal(true);
      setIsLoading(false);
      closeAuth();

      console.log("User logged in successfully:", data.user);
    } catch (error) {
      console.error("Error logging in:", (error as Error).message);

      setModalMessage(`Error logging in: ${(error as Error).message}`);
      setShowModal(true);
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
      setSession(null);
      setModalMessage("You logged out - Login to explore more features");
      setShowModal(true);

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", (error as Error).message);

      setModalMessage(`Error logging out: ${(error as Error).message}`);
      setShowModal(true);
    }
  };

  const openAuth = () => {
    setAuthIsOpen(true);
    document.body.classList.add("auth-open");
  };

  const closeAuth = () => {
    setAuthIsOpen(false);
    document.body.classList.remove("auth-open");
  };

  const handleTabClick = (tabId: "signup" | "login" | "forgot") => {
    setActiveTab(tabId);
  };

  const handleLoginButtonClick = () => {
    openAuth();
    setActiveTab("login");
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
            handleLogout={handleLogout}
          />
          <HomePage
            handleSignUpButtonClick={handleSignUpButtonClick}
            session={session}
          />
          <Footer />
          <Auth
            authIsOpen={authIsOpen}
            errors={errors}
            formData={formData}
            closeAuth={closeAuth}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            handleLogin={handleLogin}
            handleInputChange={handleInputChange}
            handleSignUp={handleSignUp}
            isLoading={isLoading}
          />
          {showModal && (
            <Modal message={modalMessage} onClose={() => setShowModal(false)} />
          )}
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
            handleLogout={handleLogout}
          />
          <MyUrlPage session={session} />
          <Footer />
          <Auth
            authIsOpen={authIsOpen}
            errors={errors}
            formData={formData}
            closeAuth={closeAuth}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            handleLogin={handleLogin}
            handleInputChange={handleInputChange}
            handleSignUp={handleSignUp}
            isLoading={isLoading}
          />
          {showModal && (
            <Modal message={modalMessage} onClose={() => setShowModal(false)} />
          )}
        </>
      ),
    },
    {
      path: "/analytics/:shortcode",
      element: (
        <>
          <NavBar
            handleLoginButtonClick={handleLoginButtonClick}
            session={session}
            handleLogout={handleLogout}
          />
          <AnalyticsPage />
          <Footer />
          <Auth
            authIsOpen={authIsOpen}
            errors={errors}
            formData={formData}
            closeAuth={closeAuth}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            handleLogin={handleLogin}
            handleInputChange={handleInputChange}
            handleSignUp={handleSignUp}
            isLoading={isLoading}
          />
          {showModal && (
            <Modal message={modalMessage} onClose={() => setShowModal(false)} />
          )}
        </>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
