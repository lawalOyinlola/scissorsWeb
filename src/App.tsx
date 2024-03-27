import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
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
import NotFound from "./components/NotFound.js";
import MyErrorBoundary from "./components/MyErrorBoundary.js";
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

    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });

    if (!formData.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email address is required",
      }));
      setIsLoading(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid email address",
      }));
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
      setIsLoading(false);
      return;
    }

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
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
      });
      setIsLoading(false);
      handleTabClick("login");

      console.log("User signed up successfully:", data.user?.role);
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

      console.log("User logged in successfully:", data.user?.role);
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
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const handleLoginButtonClick = () => {
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
    openAuth();
    setActiveTab("login");
  };

  const handleSignUpButtonClick = () => {
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
    openAuth();
    setActiveTab("signup");
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ErrorBoundary FallbackComponent={MyErrorBoundary}>
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
        </ErrorBoundary>
      ),
    },
    {
      path: "/myurl",
      element: (
        <ErrorBoundary FallbackComponent={MyErrorBoundary}>
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
        </ErrorBoundary>
      ),
    },
    {
      path: "/analytics/:shortcode",
      element: (
        <ErrorBoundary FallbackComponent={MyErrorBoundary}>
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
        </ErrorBoundary>
      ),
    },
    {
      path: "*",
      element: (
        <ErrorBoundary FallbackComponent={MyErrorBoundary}>
          <NotFound />
          <Footer />
        </ErrorBoundary>
      ),
    },
    {
      path: "/error",
      element: (
        <ErrorBoundary FallbackComponent={MyErrorBoundary}>
          <MyErrorBoundary />
        </ErrorBoundary>
      ),
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;
