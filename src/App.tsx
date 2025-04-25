import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// Aggregating Components...
import { Home, About, ErrorBoundaries, CustomError } from "./components";
import { ClipLoader } from "react-spinners";

// Define the type for the Todo item
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [page, setPage] = useState<number>(1); // Current page for pagination
  const [todos, setTodos] = useState<Todo[]>([]); // Store fetched todos
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Error message type
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [todosPerPage, setTodosPerPage] = useState<number>(10);
  const [updatedStatus, setUpdatedStatus] = useState<boolean>(false); // Change to boolean

  // Load todos from local storage on initial render
  useEffect(() => {
    let isMounted = true;
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
      setLoading(false);
    } else {
      fetchData(); // Fetch todos if not found in local storage
    }

    return () => {
      // Cleanup function to cancel updates if the component unmounts
      isMounted = false;
    };
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    if (todos.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos`
      );
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      const data: Todo[] = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error: any) {
      setError(error.message || "An unknown error occurred");
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div>
        <ClipLoader color="#00bcd4" loading={loading} size={150} />
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <Home
              page={page}
              setPage={setPage}
              todos={todos}
              setTodos={setTodos}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              todosPerPage={todosPerPage}
              setTodosPerPage={setTodosPerPage}
              updatedStatus={updatedStatus} // Passing the boolean state
              setUpdatedStatus={setUpdatedStatus} // State updater function
            />
          }
        />
        <Route
          path="/about"
          element={
            <About
              page={page}
              setPage={setPage}
              todos={todos}
              setTodos={setTodos}
              loading={loading}
              setLoading={setLoading}
              error={error}
              setError={setError}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              todosPerPage={todosPerPage}
              setTodosPerPage={setTodosPerPage}
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
            />
          }
        />
        <Route path="/error" element={<ErrorBoundaries />} />
        <Route path="/custom-error" element={<CustomError />} />
        {/* Wild Card Route */}
        <Route path="*" element={<CustomError />} />
      </Routes>
    </>
  );
}

export default App;
