import {Route,
  createBrowserRouter,
  RouterProvider, createRoutesFromElements,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MainLayout from './layout/mainlayout.jsx';
import EditPage from './pages/editpage.jsx';
import AddTaskPage from './pages/addtaskpage.jsx';
import ErrorPage from './pages/error404page.jsx'; 
import TestErrorPage from './pages/testerrorpage.jsx';
import HomePage from './pages/homepage.jsx';
import ViewMorePage, { todoLoader } from './pages/viewmorepage.jsx';

let queryClient = new QueryClient();


let router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'edit-task/:id', element: <EditPage />, loader: todoLoader },
      { path: 'add-task', element: <AddTaskPage /> },
      { path: 'viewmore-task/:id', element: <ViewMorePage />, loader: todoLoader },
      { path: 'trigger-error', element: <TestErrorPage />, errorElement: <ErrorPage />, },
      { path: '*', element: <ErrorPage /> }, // Move the catch-all route here
    ],
  },
]);


// let router = createBrowserRouter([
//   {
//     path: '/',
//     element: <MainLayout />,
//     children: [
//       { index: true, element: <HomePage /> },
//       { path: 'edit-task/:id', element: <EditPage />, loader: todoLoader },
//       { path: 'add-task', element: <AddTaskPage /> },
//       { path: 'viewmore-task/:id', element: <ViewMorePage />, loader: todoLoader },
//       {
//         path: 'trigger-error', 
//         element: <TestErrorPage />,
//         errorElement: <ErrorPage />, 
//       },
//     ],
//   },
//   {
//     path: '*',
//     element: <ErrorPage />, 
//   },
// ]);

function App() {

  

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;