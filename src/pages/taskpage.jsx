import React, { useState, useEffect } from 'react';

function TaskPage() {
  let [todos, setTodos] = useState([]);

  useEffect(() => {
    let fetchTodos = async () => {
      let apiUrl = 'http://localhost:5000/to-dos';
      try {
        let response = await fetch(apiUrl);
        let data = await response.json();
        setTodos(data);
      } catch (error) {
        console.log('Error fetching data', error);
      }
    };
    fetchTodos();
  }, []);

  let handleCheck = (id) =>{
        setTodos(
            todos.map((todo)=>todo.id===id ? {...todo,checked:!todo.checked} : todo)
        )
    }

  return (
    <div  className="tasks">
      {todos.map((todo) => (
                       <section key={todo.id} className="task">
                        <h2>{todo.task}</h2>
                    <p className={todo.checked ? 'completed' : 'pending'}>{todo.checked ? 'Completed' : 'Pending'}</p>
                    
                    <input type="checkbox" checked = {todo.checked} onChange={() =>handleCheck(todo.id)} id="task-checkbox"/>
                    <label htmlFor="task-checkbox"></label>
                </section>
      ))}
    </div>
  );
}


export default TaskPage 














// //import Card from '../components/card.jsx'
// import { useState } from "react";

// function TaskPage() { 
//     let [tasks, setTasks] = useState([
//         {id:1, checked:false},
//         // {id:2, checked:false},
//         // {id:3, checked:false}
//     ]);

//     let handleCheck = (id) =>{
//         setTasks(
//             tasks.map((task)=>task.id===id ? {...task,checked:!task.checked} : task)
//         )
//     }

//     return(
        // <>
        // <section className="tasks">
            
        //     {tasks.map((task)=>(<div key={task.id}>
        //         <section className="task">
        //             <p className={task.checked ? 'completed' : 'pending'}>{task.checked ? 'Completed' : 'Pending'}</p>
        //             <h2>make breakfast</h2>
        //             <input type="checkbox" checked = {task.checked} onChange={() =>handleCheck(task.id)} id="task-checkbox"/>
        //             <label htmlFor="task-checkbox"></label>
        //         </section> 
        //     </div>))}
        // </section>  
        // </>
//     )
// }


// export default TaskPage 





