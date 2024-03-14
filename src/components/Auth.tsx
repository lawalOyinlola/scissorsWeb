import { useEffect, useState } from "react";
// import supabase from "../supabase";
import { supabase } from "../supabase";
import Modal from "./Modal";
import "../css/auth.css";
// import { getSession } from "../supabase";

interface AuthProps {
  isOpen: boolean;
  closeAuth: () => void;
  activeTab: "signup" | "login" | "forgot";
  handleTabClick: (tabId: "signup" | "login" | "forgot") => void;
}

const Auth: React.FC<AuthProps> = ({
  isOpen,
  closeAuth,
  activeTab,
  handleTabClick,
}) => {
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAuth();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [isOpen, closeAuth]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeAuth();
    }
  };

  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);
  // const [isInvalid, setIsInvalid] = useState(false);

  // const handleInputClick = () => {
  //   setIsInvalid(true);
  // };

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      console.error("Passwords do not match");
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
      closeAuth();

      console.log("User signed up successfully:", data);
    } catch (error) {
      console.error("Error signing up:", (error as Error).message);

      setModalMessage(`Error signing up: ${(error as Error).message}`);
      setShowModal(true);
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: formData.email,
        password: formData.password,
      });

      if (error) {
        throw error;
      }
      setModalMessage("You logged in successfully, Log in to use the app");
      setShowModal(true);
      closeAuth();

      console.log("User logged in successfully:", data);
    } catch (error) {
      console.error("Error logging in:", (error as Error).message);

      setModalMessage(`Error loggin in: ${(error as Error).message}`);
      setShowModal(true);
    }
  };

  const handleLogOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }
      setModalMessage("You logged out - Login to explore analytics");
      setShowModal(true);
      closeAuth();

      console.log("User logged out successfully");
    } catch (error) {
      console.error("Error logging out:", (error as Error).message);

      setModalMessage(`Error logging out: ${(error as Error).message}`);
      setShowModal(true);
    }
  };

  return (
    <>
      {showModal && (
        <Modal message={modalMessage} onClose={() => setShowModal(false)} />
      )}
      <section
        className={isOpen ? "auth" : "auth hidden"}
        onClick={handleOverlayClick}
      >
        <div className="auth-container">
          <ul className="tab-group">
            <li
              className={`tab ${activeTab === "signup" ? "active" : ""}`}
              onClick={() => handleTabClick("signup")}
            >
              <a href="#signup">Sign Up</a>
            </li>
            <li
              className={`tab ${
                activeTab === "login" || activeTab === "forgot" ? "active" : ""
              }`}
              onClick={() => handleTabClick("login")}
            >
              <a href="#login">Log In</a>
            </li>
          </ul>

          <div className="tab-content">
            {activeTab === "signup" && (
              <div id="signup">
                <h2>Create Account</h2>
                <form onSubmit={handleSignUp}>
                  {/* <div className={`input-box ${isInvalid ? "invalid" : ""}`}>
                  <input
                    type="text"
                    name="displayName"
                    value={formData.displayName}
                    onChange={handleInputChange}
                    onClick={handleInputClick}
                    required
                  />
                  <label>Username</label>
                </div> */}
                  <div className="input-box">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <label>
                      Email<span className="req">*</span>
                    </label>
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      autoComplete="off"
                      required
                    />
                    <label>
                      Password<span className="req">*</span>
                    </label>
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      autoComplete="off"
                      required
                    />
                    <label>
                      Confirm password<span className="req">*</span>
                    </label>
                  </div>
                  <button className="button">Get Started</button>
                  <a href="#" onClick={closeAuth}>
                    Close
                  </a>
                </form>
              </div>
            )}

            {activeTab === "login" && (
              <div id="login">
                <h2>Welcome Back!</h2>
                <form onSubmit={handleLogin}>
                  <div className="input-box">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Email</label>
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Password</label>
                  </div>
                  <a
                    onClick={() => handleTabClick("forgot")}
                    className="forgot"
                    href="#forgot"
                  >
                    Forgot Password?
                  </a>
                  <button className="button">Log In</button>
                  <button className="button" onClick={handleLogOut}>
                    Log Out
                  </button>
                </form>
              </div>
            )}

            {activeTab === "forgot" && (
              <div id="forgot">
                <h2>Create New Password</h2>
                <form action="/" method="post">
                  <div className="input-box">
                    <input type="password" name="password" required />
                    <label>New Password</label>
                  </div>
                  <div className="input-box">
                    <input type="password" name="password" required />
                    <label>Confirm New Password</label>
                  </div>

                  <button className="button">next →</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Auth;
