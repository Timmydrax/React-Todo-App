import { useEffect, useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
// Aggregating Components...
import { Home, About, ErrorBoundaries, CustomError } from "./components";
import { ClipLoader } from "react-spinners";

function App() {
  const [page, setPage] = useState(1); // Current page for pagination
  const [todos, setTodos] = useState([]); // Store fetched todos
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [todosPerPage, setTodosPerPage] = useState(10);
  const [updatedStatus, setUpdatedStatus] = useState("");

  // Load todos from local storage on initial render
  useEffect(() => {
    let isMounted = true;
    isMounted;
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
      setLoading(false);
    } else {
      fetchData(); // Fetch todos if not found in local storage
    }

    return () => {
      // Cleanup function to cancel updates if the component unmounts
      console.log("Cleanup: Component unmounted or dependency changed");
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
      const data = await response.json();
      {
        setTodos(data);
        setLoading(false);
        console.log(data);
        console.log(data.length);
      }
    } catch (error) {
      {
        setError(error.message);
        setLoading(false);
      }
    }
  };

  if (loading)
    return (
      <div>
        <ClipLoader color="#00bcd4" loading={loading} size={150} />
      </div>
    );

  if (error) return <p>Error: {error}</p>;

  return (
    <>
      {/* <Navigation /> */}
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
              updatedStatus={updatedStatus}
              setUpdatedStatus={setUpdatedStatus}
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
