import Login from "./components/login/Login.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Route,Routes,Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Profile from "./components/Profile/Profile.jsx";
function App() {
  return (
    <div>
      <Navbar/>
      {/* <Login/> */}













    {/* Routes */}


<Routes>
<Route path='/login' element={<Login/>}    />
<Route path="" element={<Navigate replace to="login"/>}/>
<Route path='/user'   >
  <Route path='/user/dashboard' element={<Dashboard/>} />
  <Route path='/user/profile' element={<Profile/>} />
</Route>

</Routes>


    </div>
  );
}

export default App;
