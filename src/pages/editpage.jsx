
import { useState } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useParams, useLoaderData, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function EditPage() {
  let todo = useLoaderData();
  let { id } = useParams();
  let queryClient = useQueryClient();
  let navigate = useNavigate();

  let { mutate: updateTaskSubmit } = useMutation({
    mutationFn: async (updatedTask) => {
    let response = await fetch(`http://localhost:5000/to-dos/${updatedTask.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedTask),
    });
    return response.json();
  },
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['todos'] });
    toast.success('Task Updated successfully');
    navigate('/');
  },
  });

  let [task, setTask] = useState(todo.task);
  let [description, setDescription] = useState(todo.description);
  let [duedate, setDuedate] = useState(todo.duedate);
  let [starttime, setStarttime] = useState(todo.starttime);
  let [duetime, setDuetime] = useState(todo.duetime);
  let [exactStartTime, setExactStartTime] = useState(todo.exactStartTime);
  let [exactDueTime, setExactDueTime] = useState(todo.exactDueTime);
  let [completed, setCompleted] = useState(todo.completed);

  let submitForm = (e) => {
    e.preventDefault();
    let updatedTask = {
      id,
      task,
      description,
      duedate,
      starttime,
      duetime,
      exactStartTime,
      exactDueTime,
      completed,
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
                    <input type="text" placeholder="e.g Make breakfast" name="name" id="name" required value={task} onChange={(e) =>setTask(e.target.value)}/>
                </div>
                <div className="form-area">
                    <label htmlFor="description">Task Description</label><br/>
                    <textarea name="description" id="description" placeholder="Make yam and egg for Daddy and Tito before going to school.Tito wants scrambled eggs" required value={description} onChange={(e) =>setDescription(e.target.value)}></textarea>
                </div>
                <div className="form-area">
                    <label htmlFor="start time">Start Time</label><br/>
                    <input  type="time" id="start time" name="start time" required value={starttime} onChange={(e) =>setStarttime(e.target.value)}/>
                    <select value={exactStartTime} onChange={(e) =>setExactStartTime(e.target.value)} required>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                    </select>
                </div>
                <div className="form-area">
                    <label htmlFor="due time">Due Time</label><br/>
                    <input type="time" id="due time" name="due time" required value={duetime} onChange={(e) =>setDuetime(e.target.value)}/>
                    <select value={exactDueTime} onChange={(e) =>setExactDueTime(e.target.value)
                    } required>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                    </select>
                </div>
                <div className="form-area">
                    <label htmlFor="date">Due Date</label><br/>
                    <input type="date" id="date" name="date" required value={duedate} onChange={(e) =>setDuedate(e.target.value)}/>
                </div>
                <div className="form-completed">
                    <label htmlFor="completed">Completed</label><br/>
                    <select value={completed} onChange={(e) =>setCompleted(e.target.value)
                    } required>
                        <option value="True">True</option>
                        <option value="False">False</option>
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