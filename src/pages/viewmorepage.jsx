
import { FaTrashAlt } from 'react-icons/fa';
import { FaEdit } from 'react-icons/fa';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useParams, useLoaderData, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';

function ViewMorePage() {
  let todo = useLoaderData();
  let { id } = useParams()
  let navigate = useNavigate()
  let queryClient = useQueryClient();

  let { mutate: deleteTask } = useMutation({
    mutationFn: async (id) => {
      let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE',
      });
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todos'] });
      toast.success('Task deleted successfully');
      navigate('/');
    },
  });

  let onDelete = (todoId) => {
    let confirm = window.confirm('Are you sure you want to delete this task?');
    if (confirm) {
      deleteTask(todoId);
    }
  }

  return (
    <>
      <Link to='/' className='back'>
        <FaArrowLeft className='backarrow' /> Go back
      </Link>
      <section className="more">
        <section className='viewmorepage'>
          <div>
            <h3>Task</h3>
            <p>{todo.title}</p>
          </div>
          <div>
            <h3>Completion Status</h3>
            <p className='completionstatus'>{todo.completed ? 'Completed' : 'Not Completed'}</p>
          </div>
          <button className='delete-container' onClick={() => onDelete(todo.id)}>
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

let todoLoader = async ({ params }) => {
  let response = await fetch(`https://jsonplaceholder.typicode.com/todos/${params.id}`);
  let data = await response.json()
  return data
}

export { ViewMorePage as default, todoLoader }