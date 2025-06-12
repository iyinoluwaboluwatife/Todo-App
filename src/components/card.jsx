import { Link } from "react-router-dom";
import React from "react";
import { useState } from "react";
import { useQuery } from '@tanstack/react-query';


function Card() {
  let [currentPage, setCurrentPage] = useState(1);
  let [todosPerPage, setTodosPerPage] = useState(6);
  let [search, setSearch] = useState('');
  let [filter, setFilter] = useState('all');

  let { data: todos, error, isLoading } = useQuery({
    queryKey: ['todos'],
    queryFn: async () => {
      let response = await fetch('/api/to-dos');
      return response.json();
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  let filteredTodos = todos.filter((todo) => {
    let matchesSearch = todo.task.toLowerCase().includes(search.toLowerCase());
    let matchesFilter = filter === 'all' || (filter === 'completed' && todo.completed === 'True') || (filter === 'not-completed' && todo.completed === 'False');
    return matchesSearch && matchesFilter;
  });

  let indexOfLastTodo = currentPage * todosPerPage;
  let indexOfFirstTodo = indexOfLastTodo - todosPerPage;
  let currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

  let paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <>
      <section className="card-section">
        <h2>Tasks</h2>
        <section className="input">
          <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search todos" />
        </section>
        <section className="filter">
          <button onClick={() => setFilter('all')}>All</button>
          <button onClick={() => setFilter('completed')}>Completed</button>
          <button onClick={() => setFilter('not-completed')}>Not Completed</button>
        </section>
        <section className="cards">
          {currentTodos.map((todo) => (
            <div key={todo.id}>
              <div className="card">
                <h3>{todo.task}</h3>
                <p className="descrip">{todo.description.substring(0, 90) + '...'}</p>
                <p className={todo.completed=='True'  ? 'completed' : 'pending'}>{todo.completed=='True' ? 'Completed' : 'Pending'}</p>
                <h4>{todo.duedate}</h4>
                <h5>{todo.starttime}{todo.exactStartTime}- {todo.duetime}{todo.exactDueTime}</h5>
                <div className="viewmore">
                  <Link to={`/viewmore-task/${todo.id}`}>View more</Link>
                </div>
              </div>
            </div>
          ))}
        </section>
        <div className="pagination">
          {Array(Math.ceil(filteredTodos.length / todosPerPage)).fill(null).map((_, index) => (
            <button key={index} onClick={() => paginate(index + 1)}>
              {index + 1}
            </button>
          ))}
        </div>
      </section>
    </>
  );
}

export default Card;












