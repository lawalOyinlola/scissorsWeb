import { useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { XCircle } from "@phosphor-icons/react";
import "../css/auth.css";

interface AuthProps {
  isLoading: boolean;
  authIsOpen: boolean;
  isRedirected: boolean;
  setIsRedirected: React.Dispatch<React.SetStateAction<boolean>>;
  activeTab: "signup" | "login" | "forgot" | "reset";
  closeAuth: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogout: () => void;
  handlePasswordReset: (e: React.FormEvent<HTMLFormElement>) => void;
  handlePasswordUpdate: (e: React.FormEvent<HTMLFormElement>) => void;
  handleTabClick: (tabId: "signup" | "login" | "forgot" | "reset") => void;
  errors: any;
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const Auth: React.FC<AuthProps> = ({
  isLoading,
  authIsOpen,
  isRedirected,
  setIsRedirected,
  activeTab,
  closeAuth,
  handleInputChange,
  handleSignUp,
  handleLogin,
  handleLogout,
  handlePasswordReset,
  handlePasswordUpdate,
  handleTabClick,
  errors,
  formData,
}) => {
  const [parent] = useAutoAnimate();

  // Listen for ESC button press to close Auth component
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAuth();
      }
    };

    // If Auth Component is open listen for ESC key press
    if (authIsOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }
    // If Auth Component is not open,remove the listen for ESC key press
    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [authIsOpen, closeAuth]);

  // Close Auth modal window on click of overlay
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      // close modal window
      closeAuth();
      // if redirected for update password, also logout and update redirect state
      if (isRedirected) {
        handleLogout();
        setIsRedirected(false);
      }
    }
  };

  return (
    <>
      <section
        className={authIsOpen ? "auth " : "auth hidden"}
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

          <div className="tab-content" ref={parent}>
            {/* Signup form */}
            {activeTab === "signup" && (
              <div id="signup">
                <h2>Create Account</h2>
                <form onSubmit={handleSignUp}>
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
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      minLength={6}
                      autoComplete="off"
                      required
                    />
                    <label>
                      Password<span className="req">*</span>
                    </label>
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      minLength={6}
                      autoComplete="off"
                      required
                    />
                    <label>
                      Confirm password<span className="req">*</span>
                    </label>
                    {errors.confirmPassword && (
                      <p className="error">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <button className="button">
                    {isLoading ? "..." : "Get Started"}
                  </button>
                </form>
              </div>
            )}

            {/* Login form */}
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
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      minLength={6}
                      autoComplete="off"
                      required
                    />
                    <label>Password</label>
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                  <a
                    onClick={() => handleTabClick("forgot")}
                    className="forgot"
                    href="#forgot"
                  >
                    Forgot Password?
                  </a>
                  <button className="button">
                    {isLoading ? "..." : "Log In"}
                  </button>
                  <p className="login-tos">
                    By logging in, You agree to Scissor's Terms of Service and
                    Privacy Policy.
                  </p>
                </form>
              </div>
            )}

            {/* Forgot password form */}
            {activeTab === "forgot" && (
              <div id="forgot">
                <h2>Reset Password</h2>
                <form
                  action="/"
                  method="post"
                  onSubmit={handlePasswordReset}
                  className="reset-form"
                >
                  <div className="input-box">
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                    <label>Email</label>
                    {errors.email && <p className="error">{errors.email}</p>}
                  </div>
                  <button className="button next">
                    {isLoading ? "..." : "next →"}
                  </button>
                  <p className="contact-support">
                    Error resetting password?&nbsp;
                    <a href="mailto:oyinlolalawal1705@gmail.com">
                      Contact Support
                    </a>
                  </p>
                </form>
              </div>
            )}

            {/* Reset/Update password form */}
            {activeTab === "reset" && (
              <div id="reset">
                <h2>Create New Password</h2>
                <form
                  action="/"
                  method="post"
                  onSubmit={handlePasswordUpdate}
                  className="reset-form"
                >
                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      minLength={6}
                      autoComplete="off"
                      required
                    />
                    <label>Password</label>
                    {errors.password && (
                      <p className="error">{errors.password}</p>
                    )}
                  </div>
                  <button className="button next">
                    {isLoading ? "..." : "confirm"}
                  </button>
                  <p className="contact-support">
                    Error resetting password?&nbsp;
                    <a href="mailto:oyinlolalawal1705@gmail.com">
                      Contact Support
                    </a>
                  </p>
                </form>
              </div>
            )}
          </div>
          <XCircle
            size={34}
            weight="duotone"
            onClick={closeAuth}
            className="cancel-btn"
          />
        </div>
      </section>
    </>
  );
};

export default Auth;
