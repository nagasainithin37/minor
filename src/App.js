import Login from "./components/login/Login.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import { Route,Routes,Navigate } from "react-router-dom";
import Dashboard from "./components/Dashboard/Dashboard.jsx";
import Profile from "./components/Profile/Profile.jsx";
import Leaderboard from "./components/Leaderboard/Leaderboard.jsx";
import LeaderBoardDashBoard from "./components/LeaderBoardDashBoard/LeaderBoardDashBoard.jsx";
import { useSelector,useDispatch } from "react-redux";
import {fetchUser} from './store/userSlice';
import { useState } from "react";
import './consts.js'
function App() {

//   const {user,isPending,isSuccess ,isError, errorMessage}=useSelector(store=>store.user)
// const dispatch=useDispatch()
// const [one,setOne]=useState(true)



// if(one && isSuccess==false&&localStorage.getItem('token')!=null){
// let actionObject=fetchUser({url:global.api+'user/getdetails',headers:{"Authorization":localStorage.getItem('token')}})
// dispatch(actionObject)

//     setOne(false)
// }







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
</Route>

</Routes>


    </div>
  );
}

export default App;
