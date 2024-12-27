// import { ErrorBoundary } from "react-error-boundary";
import { ErrorBoundary } from "react-error-boundary";
import PropTypes from "prop-types";
import "../assets/styles/ErrorBoundaries.css";
import { Link } from "react-router-dom";

function FallbackComponent({ error }) {
  return (
    <>
      <div className="fallback-ui">
        <h1>Oops! Something went wrong..</h1>
        <pre>{error.message}</pre>
        <Link to="/" className="error-link">
          Go Back to Homepage
        </Link>
        {/* {console.log(error)} */}
      </div>
    </>
  );
}

function BuggyComponent() {
  // Simulate an Error to test Error Boundary
  throw new Error(
    "We're sorry! This looks like a crash, could be intentional though but please be patient while we rectify."
  );
}

function ErrorBoundaries() {
  return (
    <>
      <ErrorBoundary
        FallbackComponent={FallbackComponent}
        onReset={() => {
          // Reset any state or retry logic
          console.log("Error boundary reset...");
        }}
      >
        <BuggyComponent />
      </ErrorBoundary>
    </>
  );
}

export default ErrorBoundaries;

// Defining Prop Types and Requirements..
FallbackComponent.propTypes = {
  error: PropTypes.any,
  message: PropTypes.any,
  resetErrorBoundary: PropTypes.any,
};
