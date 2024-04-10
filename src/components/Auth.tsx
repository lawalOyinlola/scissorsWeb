import { useEffect } from "react";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import { XCircle } from "@phosphor-icons/react";
import "../css/auth.css";

interface AuthProps {
  isLoading: boolean;
  closeAuth: () => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => void;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => void;
  handleTabClick: (tabId: "signup" | "login" | "forgot") => void;
  activeTab: "signup" | "login" | "forgot";
  authIsOpen: boolean;
  errors: any;
  formData: {
    email: string;
    password: string;
    confirmPassword: string;
  };
}

const Auth: React.FC<AuthProps> = ({
  authIsOpen,
  activeTab,
  closeAuth,
  errors,
  formData,
  handleTabClick,
  handleLogin,
  handleInputChange,
  handleSignUp,
  isLoading,
}) => {
  const [parent] = useAutoAnimate();
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeAuth();
      }
    };

    if (authIsOpen) {
      document.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [authIsOpen, closeAuth]);

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeAuth();
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
                    {" "}
                    {isLoading ? "..." : "Log In"}
                  </button>
                </form>
              </div>
            )}

            {/* Forgot password form */}
            {activeTab === "forgot" && (
              <div id="forgot">
                <h2>Create New Password</h2>
                <form action="/" method="post">
                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      onChange={handleInputChange}
                      autoComplete="off"
                      minLength={6}
                      required
                    />
                    <label>New Password</label>
                  </div>
                  <div className="input-box">
                    <input
                      type="password"
                      name="password"
                      onChange={handleInputChange}
                      autoComplete="off"
                      minLength={6}
                      required
                    />
                    <label>Confirm New Password</label>
                    {errors.confirmPassword && (
                      <p className="error">{errors.confirmPassword}</p>
                    )}
                  </div>
                  <button className="button">next →</button>
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
