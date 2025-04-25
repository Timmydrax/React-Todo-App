
// Home.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import { Link } from "react-router-dom";
import "../assets/styles/Home.css";
import PropTypes from "prop-types";
import Header from "./Header";

interface Todo {
  id: number;
  userId: number;
  title: string;
  completed: boolean;
}

interface HomeProps {
  page: number; // Expect page here
  setPage: React.Dispatch<React.SetStateAction<number>>; // Expect setPage here
  todos: Todo[];
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todosPerPage: number;
  setTodosPerPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  updatedStatus: boolean;
  setUpdatedStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({
  todos,
  loading,
  error,
  setTodos,
  todosPerPage,
  currentPage,
  setCurrentPage,
  updatedStatus,
  setUpdatedStatus,
}) => {
  const [search, setSearch] = useState<string>("");
  const [editingTodo, setEditingTodo] = useState<number | null>(null);
  const [updatedTitle, setUpdatedTitle] = useState<string>("");
  const [originalTodos] = useState<Todo[]>(todos);
  const [newTodoTitle, setNewTodoTitle] = useState<string>("");

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setCurrentPage(1);
  };

  const addTodo = (e: FormEvent) => {
    e.preventDefault();
    if (newTodoTitle.trim() === "") {
      return;
    }
    const newTodo: Todo = {
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

  // Handle Edit Start
  const startEditing = (todo: Todo) => {
    setEditingTodo(todo.id);
    setUpdatedTitle(todo.title);
    setUpdatedStatus(todo.completed);
  };

  // Handle Save
  const saveTodo = (id: number) => {
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
    setUpdatedStatus(false);
  };

  const sortedTodos = (sortType: string) => {
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
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {currentTodos.length > 0 && !loading && !error && (
        <ul>
          {currentTodos.map((todo) => (
            <li
              key={todo.id}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
              }}
            >
              {editingTodo === todo.id ? (
                // Editing Mode
                <div className="editing-mode">
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                  <select
                    value={updatedStatus.toString()} // Ensure updatedStatus is passed as a string
                    onChange={(e) =>
                      setUpdatedStatus(e.target.value === "true")
                    } // Convert the string value to boolean
                  >
                    <option value="true">Completed</option>
                    {/* Set the value as string "true" */}
                    <option value="false">Pending</option>
                    {/* Set the value as string "false" */}
                  </select>

                  <button className="save" onClick={() => saveTodo(todo.id)}>
                    Save
                  </button>
                  <button onClick={cancelEditing}>Cancel</button>
                </div>
              ) : (
                // Display Todo
                <div className="view-todo">
                  <Link to="/about" state={{ todo }}>
                    <h3>{todo.title}</h3>
                  </Link>

                  <div className="view-todo-btn">
                    <button className="edit" onClick={() => startEditing(todo)}>
                      Edit
                    </button>

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

      {/* Pagination */}
      {!loading && totalPages > 1 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
