import { Link, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import "../assets/styles/About.css";

function About({
  todos,
  loading,
  error,
  currentPage,
  setCurrentPage,
  todosPerPage,
}) {
  const { state } = useLocation();
  const todo = state ? state.todo : null;

  const totalTodos = todos.length;
  const totalPages = Math.ceil(totalTodos / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  // Generate Pagination Numbers
  const getPaginationNumbers = () => {
    const pagination = [];

    // Function to render first page.
    if (currentPage > 2) {
      pagination.push(1);
      if (currentPage > 3) {
        pagination.push("...");
      }
    }

    // Add the current page with it's neighbors
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    // Render last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pagination.push("...");
      }
      pagination.push(totalPages);
    }

    return pagination;
  };

  const paginationNumbers = getPaginationNumbers();

  return (
    <div className="about">
      {todo ? (
        // Render the Todo Details..
        <>
          <h1>Todo Details</h1>
          <div className="inner-about">
            <h3>{todo.title}</h3>
            <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
            <p>User ID: {todo.userId === 1 ? "Bermuda" : "Anonymous"}</p>
          </div>
          <Link to="/" className="about-btn">
            Go Back to Home
          </Link>
        </>
      ) : (
        // Display Paginated Todos
        <>
          {loading && <div className="loader">Loading...</div>}
          {error && <div className="error">Error: {error}</div>}
          {!loading && todos.length > 0 && (
            <>
              <h2>All Todos</h2>
              <ul>
                {currentTodos.map((todo) => (
                  <li key={todo.id}>
                    <h3>{todo.title}</h3>
                    <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
                    User ID: {todo.userId === 1 ? "Bermuda" : "Anonymous"}
                  </li>
                ))}
              </ul>

              {/* Pagination Controls */}
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(1)}
                  disabled={currentPage === 1}
                >
                  &lt;&lt;
                </button>

                {paginationNumbers.map((number, index) =>
                  number === "..." ? (
                    <span key={index} className="ellipsis">
                      ...
                    </span>
                  ) : (
                    <button
                      key={index}
                      onClick={() => setCurrentPage(number)}
                      className={currentPage === number ? "active" : ""}
                    >
                      {number}
                    </button>
                  )
                )}

                <button
                  onClick={() => setCurrentPage(totalPages)}
                  disabled={currentPage === totalPages}
                >
                  &gt;&gt;
                </button>
              </div>
            </>
          )}
          {!loading && todos.length === 0 && <h2>No Todos Found</h2>}
        </>
      )}
    </div>
  );
}

export default About;

// Defining Prop Types and Requirements..
About.propTypes = {
  todos: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
  currentPage: PropTypes.any,
  setCurrentPage: PropTypes.any,
  todosPerPage: PropTypes.any,
};
