import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function AddTaskPage() {
    let queryClient = useQueryClient();
    let navigate = useNavigate();

    let { mutate: addTaskSubmit } = useMutation({
    mutationFn: async (newTask) => {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    toast.success('Task added successfully');
    navigate('/');
  },
  });

    let [title, setTitle] = useState('');
    let [completed, setCompleted] = useState('');

    let submitForm = (e) => {
        e.preventDefault();
        let newTask = {
        title,
        completed,
        };
        addTaskSubmit(newTask);
    };
    

    return(
        <>
        <div className="form">
        <section className="form-container">
            <form onSubmit={submitForm}>
                <h2>Add New Task</h2>
                <div className="form-area">
                    <label htmlFor="name">Task Name</label><br/>
                    <input type="text" placeholder="e.g Make breakfast" name="name" id="name" required value={title} onChange={(e) =>setTitle(e.target.value)}/>
                </div>
                
                <div className="form-completed">
                    <label htmlFor="completed">Completed</label><br/>
                    <select value={completed} onChange={(e) =>setCompleted(e.target.value)
                    } required>
                        <option value="True">True</option>
                        <option value="False">False</option>
                    </select>
                </div>

                <button className="addtask-button">Add Task</button>
            </form>
        </section>
    </div>
        </>
    )
}
export default AddTaskPage