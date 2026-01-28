import { RouteObject } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import MyUrlPage from "./pages/MyUrlPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import NotFound from "./components/NotFound";
import MyErrorBoundary from "./components/MyErrorBoundary";
import { ErrorBoundary } from "react-error-boundary";
import { useAuth } from "./contexts/AuthContext";

// Wrapper components for routes that need auth context
// These are defined as separate components so they can use hooks
const HomePageWrapper = () => {
  const { session, handleSignUpButtonClick } = useAuth();
  return (
    <HomePage
      handleSignUpButtonClick={handleSignUpButtonClick}
      session={session}
    />
  );
};

const MyUrlPageWrapper = () => {
  const { session } = useAuth();
  return <MyUrlPage session={session} />;
};

// Route definitions
// Note: These components will be rendered inside AuthProvider from App.tsx
export const routes: RouteObject[] = [
  {
    path: "/",
    element: (
      <Layout showFooter={true}>
        <HomePageWrapper />
      </Layout>
    ),
  },
  {
    path: "/myurl",
    element: (
      <Layout showFooter={false}>
        <MyUrlPageWrapper />
      </Layout>
    ),
  },
  {
    path: "/analytics/:shortcode",
    element: (
      <Layout showFooter={true}>
        <AnalyticsPage />
      </Layout>
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
  {
    path: "*",
    element: (
      <ErrorBoundary FallbackComponent={MyErrorBoundary}>
        <Layout showFooter={true}>
          <NotFound />
        </Layout>
      </ErrorBoundary>
    ),
  },
];
