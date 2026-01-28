import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Session } from "@supabase/supabase-js";
import { getSession, supabase } from "../../utils/supabase";

interface AuthFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

interface AuthErrors {
  email: string;
  password: string;
  confirmPassword: string;
}

type AuthTab = "signup" | "login" | "forgot" | "reset";

interface AuthContextType {
  session: Session | null;
  authIsOpen: boolean;
  activeTab: AuthTab;
  formData: AuthFormData;
  errors: AuthErrors;
  isLoading: boolean;
  isRedirected: boolean;
  modalMessage: string;
  showModal: boolean;
  setAuthIsOpen: (open: boolean) => void;
  setActiveTab: (tab: AuthTab) => void;
  setFormData: (data: AuthFormData) => void;
  setErrors: (errors: AuthErrors) => void;
  setIsLoading: (loading: boolean) => void;
  setIsRedirected: React.Dispatch<React.SetStateAction<boolean>>;
  setModalMessage: (message: string) => void;
  setShowModal: (show: boolean) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSignUp: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogin: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleLogout: () => Promise<void>;
  handlePasswordReset: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handlePasswordUpdate: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleTabClick: (tabId: AuthTab) => void;
  openAuth: () => void;
  closeAuth: () => void;
  handleLoginButtonClick: () => void;
  handleSignUpButtonClick: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [authIsOpen, setAuthIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<AuthTab>("signup");
  const [formData, setFormData] = useState<AuthFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<AuthErrors>({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isRedirected, setIsRedirected] = useState(false);
  const [modalMessage, setModalMessage] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      setSession(session);
    };

    supabase.auth.onAuthStateChange(async (event, session) => {
      if (session && event === "PASSWORD_RECOVERY") {
        setActiveTab("reset");
        openAuth();
        setIsRedirected(true);
      }
      setSession(session);
    });

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
      const { error } = await supabase.auth.signUp({
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
      handleTabClick("login");
    } catch (error) {
      console.error("Error signing up:", (error as Error).message);
      setModalMessage(`Error signing up: ${(error as Error).message}`);
      setShowModal(true);
    }
    setIsLoading(false);
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
      closeAuth();
    } catch (error) {
      console.error("Error logging in:", (error as Error).message);
      setModalMessage(`Error logging in: ${(error as Error).message}`);
      setShowModal(true);
    }
    setIsLoading(false);
  };

  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        throw error;
      }

      setSession(null);
      if (!isRedirected) {
        setModalMessage("You logged out - Login to explore more features");
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error logging out:", (error as Error).message);
      setModalMessage(`Error logging out: ${(error as Error).message}`);
      setShowModal(true);
    }
  };

  const handlePasswordReset = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.resetPasswordForEmail(
        formData.email
      );

      if (error) {
        throw error;
      }

      setModalMessage("Email sent for password reset");
      setShowModal(true);
      console.log("Email sent for password reset:", data);
    } catch (error) {
      console.error("Error sending email:", (error as Error).message);
      setModalMessage(`Error sending email ${(error as Error).message}`);
      setShowModal(true);
    }
    setIsLoading(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const { data, error } = await supabase.auth.updateUser({
      password: formData.password,
    });

    if (data) {
      setModalMessage("Password updated successfully!");
      setShowModal(true);
      handleLogout();
      handleTabClick("login");
    }

    if (error) {
      setModalMessage(`Error resetting password: ${(error as Error).message}`);
      setShowModal(true);
    }
    setIsLoading(false);
  };

  const openAuth = () => {
    setAuthIsOpen(true);
    document.body.classList.add("auth-open");
  };

  const closeAuth = () => {
    setAuthIsOpen(false);
    document.body.classList.remove("auth-open");
    if (isRedirected) {
      handleLogout();
      setIsRedirected(false);
    }
  };

  const handleTabClick = (tabId: AuthTab) => {
    if (isRedirected) {
      handleLogout();
      setIsRedirected(false);
    }
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
    setActiveTab("login");
    openAuth();
  };

  const handleSignUpButtonClick = () => {
    setErrors({
      email: "",
      password: "",
      confirmPassword: "",
    });
    setActiveTab("signup");
    openAuth();
  };

  const value: AuthContextType = {
    session,
    authIsOpen,
    activeTab,
    formData,
    errors,
    isLoading,
    isRedirected,
    modalMessage,
    showModal,
    setAuthIsOpen,
    setActiveTab,
    setFormData,
    setErrors,
    setIsLoading,
    setIsRedirected,
    setModalMessage,
    setShowModal,
    handleInputChange,
    handleSignUp,
    handleLogin,
    handleLogout,
    handlePasswordReset,
    handlePasswordUpdate,
    handleTabClick,
    openAuth,
    closeAuth,
    handleLoginButtonClick,
    handleSignUpButtonClick,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
