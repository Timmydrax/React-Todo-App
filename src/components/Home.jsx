import { useState } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Home.css";
import PropTypes from "prop-types";
import Header from "./Header.jsx";

function Home({
  todos,
  loading,
  error,
  setTodos,
  todosPerPage,
  currentPage,
  setCurrentPage,
  updatedStatus,
  setUpdatedStatus,
}) {
  const [search, setSearch] = useState("");
  const [editingTodo, setEditingTodo] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");
  const [originalTodos] = useState(todos);
  const [newTodoTitle, setNewTodoTitle] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const addTodo = (e) => {
    e.preventDefault();
    if (newTodoTitle.trim() === "") {
      return;
    }
    const newTodo = {
      userId: 1,
      id: Math.floor(Math.random() * 1000),
      title: newTodoTitle,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
    setNewTodoTitle("");
  };

  const filteredTodos = todos.filter((todo) => {
    if (search === "") {
      return todo;
    }
    return todo.title.toLowerCase().includes(search.toLowerCase());
  });

  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

  const getPaginationNumbers = () => {
    const pagination = [];

    // Always show the first page
    if (currentPage > 2) {
      pagination.push(1);
      if (currentPage > 3) {
        pagination.push("...");
      }
    }

    // Add current page and its neighbors
    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

    // Always show the last page
    if (currentPage < totalPages - 1) {
      if (currentPage < totalPages - 2) {
        pagination.push("...");
      }
      pagination.push(totalPages);
    }

    return pagination;
  };

  const paginationNumbers = getPaginationNumbers();

  // Handle Edit Start
  const startEditing = (todo) => {
    setEditingTodo(todo.id);
    setUpdatedTitle(todo.title);
    setUpdatedStatus(todo.completed);
  };

  // Handle Save
  const saveTodo = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id
          ? { ...todo, title: updatedTitle, completed: updatedStatus }
          : todo
      )
    );
    setEditingTodo(null);
  };

  // Cancel Editing
  const cancelEditing = () => {
    setEditingTodo(null);
    setUpdatedTitle("");
    setUpdatedStatus("");
  };

  const sortedTodos = (sortType) => {
    let sortedTodos = [...originalTodos];
    switch (sortType) {
      case "asc":
        sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "desc":
        sortedTodos.sort((a, b) => b.title.localeCompare(a.title));
        break;
      case "completed":
        sortedTodos = originalTodos.filter((todo) => todo.completed);
        break;
      case "pending":
        sortedTodos = originalTodos.filter((todo) => !todo.completed);
        break;

      default:
        sortedTodos = [...originalTodos];
        break;
    }
    setTodos(sortedTodos);
  };

  return (
    <>
      <div className="home-container">
        <Header />

        <h1>Todo List</h1>

        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Enter new todo"
            value={newTodoTitle}
            onChange={(e) => setNewTodoTitle(e.target.value)}
          />
          <button type="submit" className="add-todo">
            Add New Todo
          </button>
        </form>

        <div className="sort-todo">
          <input
            type="text"
            placeholder="Search Todos"
            value={search}
            onChange={handleSearch}
          />
          <select
            onChange={(e) => sortedTodos(e.target.value)}
            style={{ color: "grey" }}
          >
            <option value="" hidden>
              Sort Todos
            </option>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </div>

        {currentTodos.length > 0 && !loading && !error && (
          <ul>
            {currentTodos.map((todo) => (
              <li key={todo.id}>
                {editingTodo === todo.id ? (
                  // Editing Mode
                  <div>
                    <input
                      type="text"
                      value={updatedTitle}
                      onChange={(e) => setUpdatedTitle(e.target.value)}
                    />
                    <select
                      value={updatedStatus}
                      onChange={(e) => setUpdatedStatus(e.target.value)}
                    >
                      <option value={true}>Completed</option>
                      <option value={false}>Pending</option>
                    </select>

                    <button className="save" onClick={() => saveTodo(todo.id)}>
                      Save
                    </button>
                    <button onClick={cancelEditing}>Cancel</button>
                  </div>
                ) : (
                  // View Mode
                  <div className="view-todo">
                    <h3>{todo.title}</h3>

                    <div className="view-todo-btn">
                      <button
                        className="edit"
                        onClick={() => startEditing(todo)}
                      >
                        Edit
                      </button>

                      <Link to="/about" state={{ todo }}>
                        <button className="edit">View Details</button>
                      </Link>

                      <button
                        style={{
                          backgroundColor: "red",
                          marginLeft: "0.2em",
                          fontSize: "small",
                          marginTop: "0.2em",
                        }}
                        onClick={() =>
                          setTodos(todos.filter((t) => t.id !== todo.id))
                        }
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {!loading && currentTodos.length === 0 && (
          <h2>No Todos Found for {search}</h2>
        )}

        {/* Pagination Controls */}
        {!loading && totalPages > 1 && (
          <div className="pagination">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {/* Pagination */}
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
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;

// Defining Prop Types and Requirements..
Home.propTypes = {
  todosPerPage: PropTypes.any,
  currentPage: PropTypes.any,
  setTodos: PropTypes.any,
  setCurrentPage: PropTypes.any,
  updatedStatus: PropTypes.any,
  setUpdatedStatus: PropTypes.any,
  todos: PropTypes.any,
  loading: PropTypes.any,
  error: PropTypes.any,
};
