import {FaTrashAlt} from 'react-icons/fa';
import {FaEdit} from 'react-icons/fa';
import {FaArrowLeft} from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useParams,useLoaderData,useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function ViewMorePage() {
    let todo = useLoaderData();
    let {id} = useParams()
    let navigate = useNavigate()

        let { mutate: deleteTask } = useMutation({
    mutationFn: async (id) => {
        let response = await fetch(`/api/to-dos/${id}`, {
        method: 'DELETE',
        });
        return response.json();
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['todos'] });
        
    },
    });


    let onDelete =(todoId)=>{
        let confirm = window.confirm('Are you sure you want to delete this task?');
        if (!confirm) return

        deleteTask(todoId);
        toast.success('Task deleted successfully');
        return navigate('/')
    }

    return(
        <>
        <Link to='/' className='back'> <FaArrowLeft className='backarrow'/> Go back</Link>
        <section className="more">
            <section className='viewmorepage'>
                <div>
                    <h3>Task</h3>
                    <p>{todo.task}</p>
                </div>
                <div>
                    <h3>Task Description</h3>
                    <p>{todo.description} </p>
                </div>
                <div>
                    <h3>Completion Status</h3>
                    <p>{todo.completed} </p>
                </div>
                <div>
                    <h3>Time</h3>
                    <p>{todo.starttime}{todo.exactStartTime}- {todo.duetime}{todo.exactDueTime}</p>
                </div>
                <div>
                    <h3>Due date</h3>
                    <p>{todo.duedate}</p>
                </div>
                <button className='delete-container' onClick={()=>onDelete(todo.id)}>
                    Delete<FaTrashAlt className="delete"></FaTrashAlt>
                </button>
                <Link to={`/edit-task/${todo.id}`} className='edit-container'>
                        Edit<FaEdit className="edit"></FaEdit>
                </Link>
                
            </section>
        </section>
        
        </>
    )
}

let todoLoader = async ({params}) =>{
    let response = await fetch (`http://localhost:5000/to-dos/${params.id}`);
    let data = await response.json()
    return data
}

export {ViewMorePage as default, todoLoader}