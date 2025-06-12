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
  let router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<MainLayout />}>
        <Route path="*" element={<ErrorPage />} />
        <Route index element={<HomePage />} />
        <Route path="/edit-task/:id" element={<EditPage />} loader={todoLoader} />
        <Route path="/add-task" element={<AddTaskPage />} />
        <Route path="/viewmore-task/:id" element={<ViewMorePage />} loader={todoLoader} />
      </Route>
    )
  );

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router}></RouterProvider>
    </QueryClientProvider>
  );
}

export default App;





