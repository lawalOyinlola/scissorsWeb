import { ReactNode } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "../contexts/AuthContext";
import NavBar from "./NavBar";
import Footer from "./Footer";
import Auth from "./Auth";
import Modal from "./Modal";
import MyErrorBoundary from "./MyErrorBoundary";

interface LayoutProps {
  children: ReactNode;
  showFooter?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showFooter = true }) => {
  const {
    authIsOpen,
    activeTab,
    errors,
    formData,
    closeAuth,
    handleTabClick,
    handleInputChange,
    handleLogin,
    handleLogout,
    handleSignUp,
    handlePasswordReset,
    handlePasswordUpdate,
    isLoading,
    setIsRedirected,
    isRedirected,
    session,
    handleLoginButtonClick,
    modalMessage,
    showModal,
    setShowModal,
  } = useAuth();

  return (
    <ErrorBoundary FallbackComponent={MyErrorBoundary}>
      <div className="layout">

        <NavBar
          handleLoginButtonClick={handleLoginButtonClick}
          session={session}
          handleLogout={handleLogout}
        />
        {children}
        {showFooter && <Footer />}
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
      </div>
    </ErrorBoundary>
  );
};

export default Layout;
