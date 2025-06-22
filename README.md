
## Table of Contents

- #features
- #installation
- #usage
- #structure
- #tech stack
- #contributing


## Features

- Create, read, update, and delete todos
- Filter todos by completion status
- Search todos by task name
- Pagination

## Installation

1. Clone the repository: git clone https://github.com/your-iyinoluwaboluwatife/Todo-App.git
2. Install dependencies: npm install
3. Start the JSON server: json-server --watch db.json --port 5000
4. Start the app: npm run dev

## Usage

1. Open your browser and navigate to http://localhost:3000
2. Create a new todo by clicking on the "Add Task" button
3. View, edit, or delete todos by clicking on the respective buttons



## Structure

 App.jsx - Main route configuration
 main.jsx - React app entry point
 index.css - Global styles

 layout/
  mainlayout.jsx - Layout wrapper with Nav + Outlet + Toast

 pages/- All route-based pages
  homepage.jsx
  addtaskpage.jsx
  editpage.jsx
  viewmorepage.jsx
  error404page.jsx
  testerrorpage.jsx

 components/
  nav.jsx - Navigation header
  card.jsx - Card grid and filter UI
  herosection.jsx - Hero banner on homepage


## Tech Stack

- [React](https://reactjs.org/) – UI framework
- [React Router v6](https://reactrouter.com/) – Routing
- [React Query](https://tanstack.com/query/latest) – API state management
- [React Icons](https://react-icons.github.io/react-icons/) – Icons
- [Toastify](https://fkhadra.github.io/react-toastify/) – Notifications
- [JSONPlaceholder](https://jsonplaceholder.typicode.com/) – Mock REST API



## Contributing

Contributions are welcome! If you'd like to contribute to this project, please fork the repository and submit a pull request.