
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { RegisterParticipant } from './participants/RegisterParticipant';
import { Login } from './components/Login';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },{
    path: "/register",
    element: <RegisterParticipant/>
  },{
    path: "/recover-password",
    element: <div>HOLA RECOVERPASSWORD</div>
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
