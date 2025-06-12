import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layout/mainlayout.jsx';
import EditPage from './pages/editpage.jsx';
import AddTaskPage from './pages/addtaskpage.jsx';
import ErrorPage from './pages/error404page.jsx';
import HomePage from './pages/homepage.jsx';
import ViewMorePage, { todoLoader } from './pages/viewmorepage.jsx';

let queryClient = new QueryClient();

function App() {
  let router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: 'edit-task/:id',
        element: <EditPage />,
        loader: todoLoader,
      },
      {
        path: 'add-task',
        element: <AddTaskPage />,
      },
      {
        path: 'viewmore-task/:id',
        element: <ViewMorePage />,
        loader: todoLoader,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;





