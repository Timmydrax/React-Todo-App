// import { useState } from "react";
// import { Link } from "react-router-dom";
// import "../assets/styles/Home.css";
// import PropTypes from "prop-types";
// import Header from "./Header";

// interface Todo {
//   id: number;
//   userId: number;
//   title: string;
//   completed: boolean;
// }

// interface HomeProps {
//   todos: Todo[];
//   loading: boolean;
//   error: string | null;
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
//   todosPerPage: number;
//   currentPage: number;
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
//   updatedStatus: boolean;
//   setUpdatedStatus: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const Home: React.FC<HomeProps> = ({
//   todos,
//   loading,
//   error,
//   setTodos,
//   todosPerPage,
//   currentPage,
//   setCurrentPage,
//   updatedStatus,
//   setUpdatedStatus,
// }) => {
//   const [search, setSearch] = useState<string>("");
//   const [editingTodo, setEditingTodo] = useState<number | null>(null);
//   const [updatedTitle, setUpdatedTitle] = useState<string>("");
//   const [originalTodos] = useState<Todo[]>(todos);
//   const [newTodoTitle, setNewTodoTitle] = useState<string>("");

//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//     setCurrentPage(1);
//   };

//   const addTodo = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (newTodoTitle.trim() === "") {
//       return;
//     }
//     const newTodo: Todo = {
//       userId: 1,
//       id: Math.floor(Math.random() * 1000),
//       title: newTodoTitle,
//       completed: false,
//     };
//     setTodos([newTodo, ...todos]);
//     setNewTodoTitle("");
//   };

//   const filteredTodos = todos.filter((todo) => {
//     if (search === "") {
//       return todo;
//     }
//     return todo.title.toLowerCase().includes(search.toLowerCase());
//   });

//   const indexOfLastTodo = currentPage * todosPerPage;
//   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//   const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

//   const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

//   // Handle Edit Start
//   const startEditing = (todo: Todo) => {
//     setEditingTodo(todo.id);
//     setUpdatedTitle(todo.title);
//     setUpdatedStatus(todo.completed);
//   };

//   // Handle Save
//   const saveTodo = (id: number) => {
//     setTodos((prevTodos) =>
//       prevTodos.map((todo) =>
//         todo.id === id
//           ? { ...todo, title: updatedTitle, completed: updatedStatus }
//           : todo
//       )
//     );
//     setEditingTodo(null);
//   };

//   // Cancel Editing
//   const cancelEditing = () => {
//     setEditingTodo(null);
//     setUpdatedTitle("");
//     setUpdatedStatus(false);
//   };

//   const sortedTodos = (sortType: string) => {
//     let sortedTodos = [...originalTodos];
//     switch (sortType) {
//       case "asc":
//         sortedTodos.sort((a, b) => a.title.localeCompare(b.title));
//         break;
//       case "desc":
//         sortedTodos.sort((a, b) => b.title.localeCompare(a.title));
//         break;
//       case "completed":
//         sortedTodos = originalTodos.filter((todo) => todo.completed);
//         break;
//       case "pending":
//         sortedTodos = originalTodos.filter((todo) => !todo.completed);
//         break;

//       default:
//         sortedTodos = [...originalTodos];
//         break;
//     }
//     setTodos(sortedTodos);
//   };

//   return (
//     <div className="home-container">
//       <Header />

//       <h1>Todo List</h1>

//       <form onSubmit={addTodo}>
//         <input
//           type="text"
//           placeholder="Enter new todo"
//           value={newTodoTitle}
//           onChange={(e) => setNewTodoTitle(e.target.value)}
//         />
//         <button type="submit" className="add-todo">
//           Add New Todo
//         </button>
//       </form>

//       <div className="sort-todo">
//         <input
//           type="text"
//           placeholder="Search Todos"
//           value={search}
//           onChange={handleSearch}
//         />
//         <select
//           onChange={(e) => sortedTodos(e.target.value)}
//           style={{ color: "grey" }}
//         >
//           <option value="" hidden>
//             Sort Todos
//           </option>
//           <option value="all">All</option>
//           <option value="pending">Pending</option>
//           <option value="completed">Completed</option>
//         </select>
//       </div>

//       {currentTodos.length > 0 && !loading && !error && (
//         <ul>
//           {currentTodos.map((todo) => (
//             <li
//               key={todo.id}
//               style={{
//                 textDecoration: todo.completed ? "line-through" : "none",
//               }}
//             >
//               {editingTodo === todo.id ? (
//                 // Editing Mode
//                 <div className="editing-mode">
//                   <input
//                     type="text"
//                     value={updatedTitle}
//                     onChange={(e) => setUpdatedTitle(e.target.value)}
//                   />
//                   <select
//                     value={updatedStatus.toString()} // Ensure updatedStatus is passed as a string
//                     onChange={(e) =>
//                       setUpdatedStatus(e.target.value === "true")
//                     } // Convert the string value to boolean
//                   >
//                     <option value="true">Completed</option>{" "}
//                     {/* Set the value as string "true" */}
//                     <option value="false">Pending</option>{" "}
//                     {/* Set the value as string "false" */}
//                   </select>

//                   <button className="save" onClick={() => saveTodo(todo.id)}>
//                     Save
//                   </button>
//                   <button onClick={cancelEditing}>Cancel</button>
//                 </div>
//               ) : (
//                 // Display Todo
//                 <div className="view-todo">
//                   <Link to="/about" state={{ todo }}>
//                     <h3>{todo.title}</h3>
//                   </Link>

//                   <div className="view-todo-btn">
//                     <button className="edit" onClick={() => startEditing(todo)}>
//                       Edit
//                     </button>

//                     <button
//                       style={{
//                         backgroundColor: "red",
//                         marginLeft: "0.2em",
//                         fontSize: "small",
//                         marginTop: "0.2em",
//                       }}
//                       onClick={() =>
//                         setTodos(todos.filter((t) => t.id !== todo.id))
//                       }
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       )}

//       {!loading && currentTodos.length === 0 && (
//         <h2>No Todos Found for {search}</h2>
//       )}

//       {/* Pagination */}
//       {!loading && totalPages > 1 && (
//         <div className="pagination">
//           <button
//             onClick={() => setCurrentPage(currentPage - 1)}
//             disabled={currentPage === 1}
//           >
//             Previous
//           </button>

//           <button
//             onClick={() => setCurrentPage(currentPage + 1)}
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Home;

// import { useState, useEffect } from "react";
// import { Todo } from "../types";  // Ensure this is correctly imported if you are using it elsewhere in your code

// // Define prop types for Home component
// interface HomeProps {
//   page: number;
//   setPage: React.Dispatch<React.SetStateAction<number>>;
//   todos: Todo[];
//   setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
//   loading: boolean;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
//   error: string | null;
//   setError: React.Dispatch<React.SetStateAction<string | null>>;
//   currentPage: number;
//   setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
//   todosPerPage: number;
//   setTodosPerPage: React.Dispatch<React.SetStateAction<number>>;
//   updatedStatus: boolean;
//   setUpdatedStatus: React.Dispatch<React.SetStateAction<boolean>>;
// }

// function Home({
//   page,
//   setPage,
//   todos,
//   setTodos,
//   loading,
//   setLoading,
//   error,
//   setError,
//   currentPage,
//   setCurrentPage,
//   todosPerPage,
//   setTodosPerPage,
//   updatedStatus,
//   setUpdatedStatus,
// }: HomeProps) {
//   const totalTodos = todos.length;
//   const totalPages = Math.ceil(totalTodos / todosPerPage);
//   const indexOfLastTodo = currentPage * todosPerPage;
//   const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
//   const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

//   const getPaginationNumbers = () => {
//     const pagination: (number | string)[] = [];

//     if (currentPage > 2) {
//       pagination.push(1);
//       if (currentPage > 3) {
//         pagination.push("...");
//       }
//     }

//     const startPage = Math.max(1, currentPage - 1);
//     const endPage = Math.min(totalPages, currentPage + 1);

//     for (let i = startPage; i <= endPage; i++) {
//       pagination.push(i);
//     }

//     if (currentPage < totalPages - 1) {
//       if (currentPage < totalPages - 2) {
//         pagination.push("...");
//       }
//       pagination.push(totalPages);
//     }

//     return pagination;
//   };

//   const paginationNumbers = getPaginationNumbers();

//   return (
//     <div className="home">
//       {loading && <div className="loader">Loading...</div>}
//       {error && <div className="error">Error: {error}</div>}
//       {!loading && todos.length > 0 && (
//         <>
//           <h2>All Todos</h2>
//           <ul>
//             {currentTodos.map((todo) => (
//               <li key={todo.id}>
//                 <h3>{todo.title}</h3>
//                 <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
//                 User ID: {todo.userId === 1 ? "Bermuda" : "Anonymous"}
//               </li>
//             ))}
//           </ul>

//           <div className="pagination">
//             <button
//               onClick={() => setCurrentPage(1)}
//               disabled={currentPage === 1}
//             >
//               &lt;&lt;
//             </button>

//             {paginationNumbers.map((number, index) =>
//               number === "..." ? (
//                 <span key={index} className="ellipsis">
//                   ...
//                 </span>
//               ) : (
//                 <button
//                   key={index}
//                   onClick={() => setCurrentPage(number as number)}
//                   className={currentPage === number ? "active" : ""}
//                 >
//                   {number}
//                 </button>
//               )
//             )}

//             <button
//               onClick={() => setCurrentPage(totalPages)}
//               disabled={currentPage === totalPages}
//             >
//               &gt;&gt;
//             </button>
//           </div>
//         </>
//       )}
//       {!loading && todos.length === 0 && <h2>No Todos Found</h2>}
//     </div>
//   );
// }

// export default Home;

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
