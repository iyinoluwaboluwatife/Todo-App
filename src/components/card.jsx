import { Link } from "react-router-dom"; 
import React from "react"; 
import { useState } from "react"; 
import { useQuery } from '@tanstack/react-query'; 

function Card() { 
  let [search, setSearch] = useState(''); 
  let [filter, setFilter] = useState('all'); 
  let [page, setPage] = useState(1); 
  let todosPerPage = 10;

  let { data: todos, error, isLoading } = useQuery({ 
    queryKey: ['todos'], 
    queryFn: async () => { 
      let response = await fetch('https://jsonplaceholder.typicode.com/todos'); 
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
    let matchesSearch = todo.title.toLowerCase().includes(search.toLowerCase()); 
    let matchesFilter = filter === 'all' || (filter === 'completed' && todo.completed) || (filter === 'not-completed' && !todo.completed); 
    return matchesSearch && matchesFilter; 
  }); 

  let indexOfLastTodo = page * todosPerPage; 
  let indexOfFirstTodo = indexOfLastTodo - todosPerPage; 
  let currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

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
                <h3>{todo.title}</h3> 
                <p className={todo.completed ? 'completed' : 'pending'}>{todo.completed ? 'Completed' : 'Pending'}</p> 
                <div className="viewmore"> 
                  <Link to={`/viewmore-task/${todo.id}`}>View more</Link> 
                </div> 
              </div> 
            </div> 
          ))} 
        </section> 
        <div className="pagination"> 
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>Previous</button> 
          <button disabled={indexOfLastTodo >= filteredTodos.length} onClick={() => setPage(page + 1)}>Next</button> 
        </div> 
      </section> 
    </> 
  ); 
} 

export default Card;










