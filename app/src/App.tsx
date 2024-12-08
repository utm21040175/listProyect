
import './App.css';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { RegisterParticipant } from './participants/RegisterParticipant';
import { Login } from './components/Login';
import { CreateEvent } from './admins/CreateEvent'
import { Dashboard } from './admins/Dashboard';
import { ListUsers } from './admins/ListUsers';
import { ListTeams } from './admins/ListTeams';
import { ListEvent } from './admins/ListEvents';

const router = createBrowserRouter([
  {
    path: "/home",
    element : <Dashboard/>
  },
  {
    path: "/user/list",
    element : <ListUsers/>
  },
  {
    path: "/event/list",
    element : <ListEvent/>
  },
  {
    path: "/team/list",
    element : <ListTeams/>
  },
  {
    path: "/",
    element: <Login/>
  },{
    path: "/register",
    element: <RegisterParticipant/>
  },{
    path: "/recover-password",
    element: <div>HOLA RECOVERPASSWORD</div>
  },{
    path: "/event",
    element: <CreateEvent/>
  }
])
function App() {
  return (
    <RouterProvider router={router}/>
  );
}

export default App;
