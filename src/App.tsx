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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRedirected, setIsRedirected] = useState<boolean>(false);
  const [activeTab, setActiveTab] = useState<
    "signup" | "login" | "forgot" | "reset"
  >("signup");
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({
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
    // check if there's a session and update the status
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };
    // Check redirection action, triggered by password recovery link click
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event === "PASSWORD_RECOVERY") {
        setActiveTab("reset");
        openAuth();
        setIsRedirected(true);
      }
    });

    fetchSession();
  }, []);

  // Handle input change to update input data
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Sign up
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // set loading state true
    setIsLoading(true);

    // initialize Errors
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });

    // Validation
    // If no email input
    if (!formData.email.trim()) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email address is required",
      }));
      setIsLoading(false);
      return;
    }

    // check email format is standard using a regex function
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Enter a valid email address",
      }));
      setIsLoading(false);
      return;
    }

    // Check password length is greater than 6
    if (formData.password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long",
      }));
      setIsLoading(false);
      return;
    }

    // check password and confirm password are the same
    if (formData.password !== formData.confirmPassword) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match",
      }));
      setIsLoading(false);
      return;
    }

    // authenticate user
    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }
      // update a successful sign up and save email to database
      setModalMessage("You signed up successfully");
      setShowModal(true);
      setFormData({
        email: formData.email,
        password: "",
        confirmPassword: "",
      });
      // Initialize errors after a successful sign up
      setErrors({
        email: "",
        password: "",
        confirmPassword: "",
      });
      // switch tab/navigate user to login
      handleTabClick("login");

      console.log("User signed up successfully:", data.user?.role);
    } catch (error) {
      console.error("Error signing up:", (error as Error).message);
      // if error show error modal and update user
      setModalMessage(`Error signing up: ${(error as Error).message}`);
      setShowModal(true);
    }
    // remove loading state
    setIsLoading(false);
  };

  // Handle Login
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // set loading state true
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }
      // begin a session, prompt user through a modal of successful login and close the authentication window
      setSession(data.session ?? null);
      setModalMessage("You logged in successfully");
      setShowModal(true);
      closeAuth();

      console.log("User logged in successfully:", data.user?.role);
    } catch (error) {
      console.error("Error logging in:", (error as Error).message);
      // If error update user through the modal
      setModalMessage(`Error logging in: ${(error as Error).message}`);
      setShowModal(true);
    }
    // remove loading state
    setIsLoading(false);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
      // update session state
      setSession(null);
      // Update user through a modal of successful logout, if he is not being redirected from a reset link
      if (!isRedirected) {
        setModalMessage("You logged out - Login to explore more features");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error logging out:", (error as Error).message);
      // If error update user through the modal
      setModalMessage(`Error logging out: ${(error as Error).message}`);
      setShowModal(true);
    }
  };

  // Handle password reset( Send reset link to email)
  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // set loading state true
    setIsLoading(true);
    // send reset link to email
    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formData.email
      );

      if (error) {
        throw error;
      }
      // update user of success
      setModalMessage("Email sent for password reset");
      setShowModal(true);
      console.log("Email sent for password reset:", data);
    } catch (error) {
      console.error("Error sending email:", (error as Error).message);
      // update user if error
      setModalMessage(`Error sending email ${(error as Error).message}`);
      setShowModal(true);
    }
    // remove loading state
    setIsLoading(false);
  };

  // open the authentication modal and remove scrollable from body element
  const openAuth = () => {
    setAuthIsOpen(true);
    document.body.classList.add("auth-open");
  };

  // close the authentication modal and add scrollable back to the body element
  const closeAuth = () => {
    setAuthIsOpen(false);
    document.body.classList.remove("auth-open");
    // if redirected for update password, also logout and update redirect state
    if (isRedirected) {
      handleLogout();
      setIsRedirected(false);
    }
  };

  // navigate through the Authentication menu
  const handleTabClick = (tabId: "signup" | "login" | "forgot" | "reset") => {
    // if redirected for update password, logout and update/initialize redirect state
    if (isRedirected) {
      handleLogout();
      setIsRedirected(false);
    }
    // then navigate Auth tab and initialize error
    setActiveTab(tabId);
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  // handle click of the login button
  const handleLoginButtonClick = () => {
    // initialize errors
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
    // navigate to login menu and open authentication modal
    setActiveTab("login");
    openAuth();
  };

  const handleSignUpButtonClick = () => {
    // initialize errors
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
    // navigate to signup menu and open authentication modal
    setActiveTab("signup");
    openAuth();
  };

  // Handle Password Update
  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    //   // set loading state true
    setIsLoading(true);
    //   // send reset link to email
    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (data) {
      // If successful prompt user
      setModalMessage("Password updated successfully!");
      setShowModal(true);
      // log the user out
      handleLogout();
      // navigate Auth tab login modal
      handleTabClick("login");
    }

    if (error) {
      // If error update user through the modal
      setModalMessage(`Error resetting password: ${(error as Error).message}`);
      setShowModal(true);
    }
    // remove loading state
    setIsLoading(false);
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
            handleInputChange={handleInputChange}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            handleSignUp={handleSignUp}
            handlePasswordReset={handlePasswordReset}
            handlePasswordUpdate={handlePasswordUpdate}
            isLoading={isLoading}
            setIsRedirected={setIsRedirected}
            isRedirected={isRedirected}
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
          {/* <Footer /> */}
          <Auth
            authIsOpen={authIsOpen}
            errors={errors}
            formData={formData}
            closeAuth={closeAuth}
            activeTab={activeTab}
            handleTabClick={handleTabClick}
            handleInputChange={handleInputChange}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            handleSignUp={handleSignUp}
            handlePasswordReset={handlePasswordReset}
            handlePasswordUpdate={handlePasswordUpdate}
            isLoading={isLoading}
            setIsRedirected={setIsRedirected}
            isRedirected={isRedirected}
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
            handleInputChange={handleInputChange}
            handleLogin={handleLogin}
            handleLogout={handleLogout}
            handleSignUp={handleSignUp}
            handlePasswordReset={handlePasswordReset}
            handlePasswordUpdate={handlePasswordUpdate}
            isLoading={isLoading}
            setIsRedirected={setIsRedirected}
            isRedirected={isRedirected}
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
