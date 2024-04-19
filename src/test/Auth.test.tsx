import "@testing-library/jest-dom";
import { render, fireEvent, waitFor } from "@testing-library/react";
import Auth from "../components/Auth";

describe("Auth Component", () => {
  const mockProps = {
    isLoading: false,
    isRedirected: false,
    setIsRedirected: jest.fn(),
    closeAuth: jest.fn(),
    handleInputChange: jest.fn(),
    handleLogin: jest.fn(),
    handleLogout: jest.fn(),
    handleSignUp: jest.fn(),
    handlePasswordReset: jest.fn(),
    handlePasswordUpdate: jest.fn(),
    handleTabClick: jest.fn(),
    activeTab: "",
    authIsOpen: true,
    errors: {},
    formData: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  };

  it("renders signup form correctly", () => {
    const { getByText, getByLabelText } = render(
      <Auth {...mockProps} activeTab="signup" />
    );

    expect(getByText("Create Account")).toBeInTheDocument();
    expect(getByLabelText("email")).toBeInTheDocument();
    expect(getByLabelText("password")).toBeInTheDocument();
    expect(getByLabelText("confirm password")).toBeInTheDocument();
  });

  it("calls handleSignUp function when signup button is clicked", async () => {
    const { getByText } = render(<Auth {...mockProps} activeTab="signup" />);

    fireEvent.click(getByText("Get Started"));

    await waitFor(() => {
      expect(mockProps.handleSignUp).toHaveBeenCalled();
    });
  });

  it("renders login form correctly", () => {
    const { getByText, getByLabelText } = render(
      <Auth {...mockProps} activeTab="login" />
    );

    expect(getByText("Welcome Back!")).toBeInTheDocument();
    expect(getByLabelText("email")).toBeInTheDocument();
    expect(getByLabelText("password")).toBeInTheDocument();
    expect(getByText("forgot password?")).toBeInTheDocument();
  });

  it("calls handleLogin function when login button is clicked", async () => {
    const { getByText } = render(<Auth {...mockProps} activeTab="login" />);

    fireEvent.click(getByText("Log In"));

    await waitFor(() => {
      expect(mockProps.handleLogin).toHaveBeenCalled();
    });
  });

  it("renders forgot password form correctly", () => {
    const { getByText, getByLabelText } = render(
      <Auth {...mockProps} activeTab="forgot" />
    );

    expect(getByText("Reset Password")).toBeInTheDocument();
    expect(getByLabelText("email")).toBeInTheDocument();
  });
});
