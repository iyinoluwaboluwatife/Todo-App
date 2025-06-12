
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditPage() {
  let todo = useLoaderData();
  let { id } = useParams();
  id = Number(id);
  let queryClient = useQueryClient();
  let navigate = useNavigate();

  let { mutate: updateTaskSubmit } = useMutation({ 
  mutationFn: async (updatedTask) => { 
    let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${updatedTask.id}`, { 
      method: 'PATCH', 
      headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ 
        title: updatedTask.title, 
        completed: updatedTask.completed, 
      }), 
    }); 
   if (!response.ok) { 
      throw new Error('Failed to update task'); 
    } 
    return response.json(); 
  },  
  onSuccess: () => { 
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    queryClient.invalidateQueries({ queryKey: ['todo', id] });
    toast.success('Task Updated successfully'); 
    navigate('/'); 
  }, 
});




  let [title, setTitle] = useState(todo.title);
  let [completed, setCompleted] = useState(todo.completed);
  let [userId, setUserId] = useState(todo.userId);

  let submitForm = (e) => {
    e.preventDefault();
    let updatedTask = {
      id,
      title,
      completed,
      userId,
    };
    updateTaskSubmit(updatedTask);
  };
    

    return(
        <>
        <div className="form">
        <section className="form-container">
            <form onSubmit={submitForm}>
                <h2>Edit Task</h2>
                <div className="form-area">
                    <label htmlFor="name">Task Name</label><br/>
                    <input type="text" placeholder="e.g Make breakfast" name="name" id="name" required value={title} onChange={(e) =>setTitle(e.target.value)}/>
                </div>
                
                <div className="form-completed">
                    <label htmlFor="completed">Completed</label><br/>
                    <select value={completed ? 'true' : 'false'} onChange={(e) =>setCompleted(e.target.value === 'true')} required> 
                <option value="true">Completed</option> 
                <option value="false">Not Completed</option> 
              </select> 
                </div>

                <button className="addtask-button">Update Task</button>
            </form>
        </section>
    </div>
        </>
    )
}
export default EditPage