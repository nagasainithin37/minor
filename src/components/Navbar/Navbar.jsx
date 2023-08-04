import NavbarContainer from "./Navbar";
import { useSelector,useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import  {logout} from '../../store/userSlice.js'
import {adminlogout} from '../../store/adminSlice.js'
function Navbar(){
const {user,isPending,isSuccess ,isError, errorMessage}=useSelector(store=>store.user)

    const dispatch=useDispatch()
    const navigate=useNavigate()

    if(localStorage.getItem('token')==null){
       return <NavbarContainer>
            <nav className="navbar navbar-expand-lg bg-body-warning ">
                <div className="container-fluid">
                  <a className="navbar-brand" to="#">Navbar</a>
                  <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  
                </div>
          </nav>

    </NavbarContainer>
    }
    else if(localStorage.getItem('type')=='admin'){
       return <NavbarContainer>
          <nav className="navbar navbar-expand-lg bg-body-warning ">
        <div className="container-fluid">
          <a className="navbar-brand" to="#">Navbar</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              
              
              <li className="nav-item">
                <NavLink className="nav-link" to="admin/dashboard">Dashboard</NavLink>
              </li>
             
              <li className="nav-item" >
                <NavLink className="nav-link" to='login' onClick={()=>{
                  localStorage.clear()
                  var actionObj=adminlogout()
                  dispatch(actionObj)

                }}>Logout</NavLink>
              </li>
              
              
            </ul>
          </div>
        </div>
      </nav>

    </NavbarContainer>
    }
   else if(localStorage.getItem('type')=='user'){
    return <NavbarContainer>
    <nav className="navbar navbar-expand-lg bg-body-warning ">
  <div className="container-fluid">
    <a className="navbar-brand" to="#">Navbar</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        
        
        <li className="nav-item">
          <NavLink className="nav-link" to="user/dashboard">Dashboard</NavLink>
        </li>
          <li className="nav-item">
          <NavLink className="nav-link" to="user/lbdb">LeaderBoard</NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" to="user/profile">Profile</NavLink>
        </li>
         <li className="nav-item" >
          <NavLink className="nav-link" to='login' onClick={()=>{
            localStorage.clear()
            var actionObj=logout()
            dispatch(actionObj)

          }}>Logout</NavLink>
        </li>
        
        
      </ul>
    </div>
  </div>
</nav>

    </NavbarContainer>
   }
   else{
    return<NavbarContainer>no nav</NavbarContainer>
   }
}

export default Navbar;