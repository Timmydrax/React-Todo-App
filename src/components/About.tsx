// import { Link, useLocation } from "react-router-dom";
// import "../assets/styles/About.css";

// interface Todo {
//   userId: number;
//   id: number;
//   title: string;
//   completed: boolean;
// }

// // interface AboutProps {
// //   todos: Todo[];
// //   loading: boolean;
// //   error: string | null;
// //   currentPage: number;
// //   setCurrentPage: (page: number) => void;
// //   todosPerPage: number;
// // }

// // Define prop types for About component
// interface AboutProps {
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




// function About({
//   todos,
//   loading,
//   error,
//   currentPage,
//   setCurrentPage,
//   todosPerPage,
// }: AboutProps) {
//   const { state } = useLocation();
//   const todo: Todo | null = state?.todo ?? null;

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
//     <div className="about">
//       {todo ? (
//         <>
//           <h1>Todo Details</h1>
//           <div className="inner-about">
//             <h3>{todo.title}</h3>
//             <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
//             <p>User ID: {todo.userId === 1 ? "Bermuda" : "Anonymous"}</p>
//           </div>
//           <Link to="/" className="about-btn">
//             Go Back to Home
//           </Link>
//         </>
//       ) : (
//         <>
//           {loading && <div className="loader">Loading...</div>}
//           {error && <div className="error">Error: {error}</div>}
//           {!loading && todos.length > 0 && (
//             <>
//               <h2>All Todos</h2>
//               <ul>
//                 {currentTodos.map((todo) => (
//                   <li key={todo.id}>
//                     <h3>{todo.title}</h3>
//                     <p>Status: {todo.completed ? "Completed" : "Pending"}</p>
//                     User ID: {todo.userId === 1 ? "Bermuda" : "Anonymous"}
//                   </li>
//                 ))}
//               </ul>

//               <div className="pagination">
//                 <button
//                   onClick={() => setCurrentPage(1)}
//                   disabled={currentPage === 1}
//                 >
//                   &lt;&lt;
//                 </button>

//                 {paginationNumbers.map((number, index) =>
//                   number === "..." ? (
//                     <span key={index} className="ellipsis">
//                       ...
//                     </span>
//                   ) : (
//                     <button
//                       key={index}
//                       onClick={() => setCurrentPage(number as number)}
//                       className={currentPage === number ? "active" : ""}
//                     >
//                       {number}
//                     </button>
//                   )
//                 )}

//                 <button
//                   onClick={() => setCurrentPage(totalPages)}
//                   disabled={currentPage === totalPages}
//                 >
//                   &gt;&gt;
//                 </button>
//               </div>
//             </>
//           )}
//           {!loading && todos.length === 0 && <h2>No Todos Found</h2>}
//         </>
//       )}
//     </div>
//   );
// }

// export default About;

import { Link, useLocation } from "react-router-dom";
import "../assets/styles/About.css";

// Define the Todo interface
interface Todo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

// Define prop types for About component
interface AboutProps {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  error: string | null;
  setError: React.Dispatch<React.SetStateAction<string | null>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  todosPerPage: number;
  setTodosPerPage: React.Dispatch<React.SetStateAction<number>>;
  updatedStatus: boolean;
  setUpdatedStatus: React.Dispatch<React.SetStateAction<boolean>>;
}

function About({
  page,
  setPage,
  todos,
  setTodos,
  loading,
  setLoading,
  error,
  setError,
  currentPage,
  setCurrentPage,
  todosPerPage,
  setTodosPerPage,
  updatedStatus,
  setUpdatedStatus,
}: AboutProps) {
  const { state } = useLocation();
  const todo: Todo | null = state?.todo ?? null;

  const totalTodos = todos.length;
  const totalPages = Math.ceil(totalTodos / todosPerPage);
  const indexOfLastTodo = currentPage * todosPerPage;
  const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  const currentTodos = todos.slice(indexOfFirstTodo, indexOfLastTodo);

  const getPaginationNumbers = () => {
    const pagination: (number | string)[] = [];

    if (currentPage > 2) {
      pagination.push(1);
      if (currentPage > 3) {
        pagination.push("...");
      }
    }

    const startPage = Math.max(1, currentPage - 1);
    const endPage = Math.min(totalPages, currentPage + 1);

    for (let i = startPage; i <= endPage; i++) {
      pagination.push(i);
    }

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
                      onClick={() => setCurrentPage(number as number)}
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
