import { Link } from "react-router-dom";

function CustomError() {
  return (
    <>
      <section className="error-404">
        <h1>Error 404 - Page not found</h1>
        <p>
          We&39;re sorry, but the page you&39;re looking for doesn&39;t exist.
        </p>
        <Link to="/">Go back to Homepage.</Link>
      </section>
    </>
  );
}

export default CustomError;
