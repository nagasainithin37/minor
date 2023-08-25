import Login from "./components/login/Login.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Route,Routes,Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
import LeaderBoardDashBoard from "./components/LeaderBoardDashBoard/LeaderBoardDashBoard.jsx";
import DashboardAdmin from "./components/Admin/Dashboard/Dashboard.jsx";
import Batch from './components/Admin/batch/batch.jsx'
import Contests from "./components/Upcoming Contests/Contests.jsx";


import { useState } from "react";
import './consts.js'
import BatchContainer from "./components/Admin/batch/batch.js";
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
  <Route path='/user/lbdb' element={<LeaderBoardDashBoard/>} />
  <Route path='/user/leaderboard' element={<Leaderboard/>} />
  <Route path='/user/contests' element={<Contests/>}/>
</Route>
<Route  path='/admin' >
  <Route path='/admin/dashboard' element={<DashboardAdmin/>} />
   <Route path='/admin/batch' element={<Batch/>} />

</Route>
</Routes>


    </div>
  );
}

export default App;
