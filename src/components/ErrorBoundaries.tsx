import { ErrorBoundary } from "react-error-boundary";
import { Link } from "react-router-dom";
import "../assets/styles/ErrorBoundaries.css";

interface FallbackComponentProps {
  error: Error;
}

const FallbackComponent: React.FC<FallbackComponentProps> = ({ error }) => {
  return (
    <div className="fallback-ui">
      <h1>Oops! Something went wrong..</h1>
      <pre>{error.message}</pre>
      <Link to="/" className="error-link">
        Go Back to Homepage
      </Link>
    </div>
  );
};

const BuggyComponent: React.FC = () => {
  // Simulate an Error to test Error Boundary
  throw new Error(
    "We're sorry! This looks like a crash, could be intentional though but please be patient while we rectify."
  );
};

const ErrorBoundaries: React.FC = () => {
  return (
    <ErrorBoundary
      FallbackComponent={FallbackComponent}
      onReset={() => {
        // Reset any state or retry logic
        console.log("Error boundary reset...");
      }}
    >
      <BuggyComponent />
    </ErrorBoundary>
  );
};

export default ErrorBoundaries;
