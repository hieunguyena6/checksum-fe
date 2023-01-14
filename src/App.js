import {
  createBrowserRouter, RouterProvider,
} from "react-router-dom";
import Auth from './pages/Auth'
import Home from './pages';

const router = createBrowserRouter([
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/",
    element: <Home />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
