import { Link } from "react-router-dom";
import "../assets/styles/CustomError.css";

function CustomError() {
  return (
    <>
      <div className="error-404">
        <h1>404 - Page Not Found</h1>
        <p>
          Don&apos;t worry, it happens to the best of us! The page you&apos;re
          looking for is currently hiding.
        </p>
        <Link to="/" className="custom-error-link">
          Return to Safety.
        </Link>
      </div>
    </>
  );
}

export default CustomError;
