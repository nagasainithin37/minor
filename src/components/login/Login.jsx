import LoginContainer from "./Login";
import logo from "./undraw_online_stats_0g94.svg";
import { useEffect, useState } from "react";
import '../../consts'
import axios  from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CirclesWithBar } from  'react-loader-spinner'

function Login()
{

  const navigate=useNavigate()

  const notify = (msg) => {

toast.error(msg, {
position: "top-right",
autoClose: 3000,
hideProgressBar: false,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
theme: "dark",
});


  }
// const {user,isPending,isSuccess ,isError, errorMessage}=useSelector(store=>store.user)
    const [username,setUserName]=useState('')
    const [password,setPassword]=useState('')
    const [visible,setVisible]=useState(false)
    const [isLoading,setIsLoading]=useState(false)
  // on submit
    const handleSubmit=async ()=>{
      
      setIsLoading(true)
      var authObj={}
      console.log(username.trim().length)
      if(username.trim().length==0){
        notify('Enter Username')
         setIsLoading(false)
        return
      }
      if(password.trim().length==0){
        notify('Enter Password')
         setIsLoading(false)
        return
      }
      authObj.username=username
      authObj.password=password
      // let actionObject=fetchUser({url:'http://localhost:3015/auth/login',body:authObj})
      // dispatch(actionObject)
      // console.log('bye')
      var result=await axios.post(`${global.api}auth/login`,authObj)
      var data=result.data
      setIsLoading(false)
      if(data.message!='Login Success'){
        notify(data.message)
        return
      }
      localStorage.setItem('token',data.token)
      localStorage.setItem('username',data.username)
      localStorage.setItem('type',data.type)
      if(data.type=='user')
      navigate('/user/dashboard')
    else{
      navigate('/admin/dashboard')
    }
    }





useEffect(()=>{

  if(localStorage.getItem('token')!=null){
    if(localStorage.getItem('type')=='user')
      navigate('/user/dashboard')
    if(localStorage.getItem('type')=='admin'){
      navigate('/admin/dashboard')
    }
  }


},[])


    return <div> 
   {isLoading==false &&
    <LoginContainer>
        
          <div className='img'>
              <img src={logo} alt="" width="500px" height="500px" />
          </div>
        <div className="login">

          {/* username */}
        <div className="form-group mt-4">
          <label >Username</label>
          <input type="text" className="form-control" value={username} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Username/Rollnumber"
          
          onChange={(e)=>{setUserName(e.target.value)}}
          />
          
          <small id="emailHelp" className="form-text text-light">We'll never share your email with anyone else.</small>
        </div>
        {/* Password */}
        <div className="form-group mt-3">
          <label >Password</label>
          <input type={visible?'text':'password'} value={password} className="form-control" id="exampleInputPassword1" placeholder="Password"
          onChange={(e)=>{setPassword(e.target.value)}}
          />
        </div>
        
        {/* set visibility */}
        <div className="form-check mt-2">
          <input type="checkbox" checked={visible} onChange={(e)=>{
            setVisible(!visible)
          }} className="form-check-input" id="exampleCheck1"/>

            
            {!visible&&<p className="form-check-label" >Show Password </p>}
            
            {visible&&<p className="form-check-label">Hide Password </p>}
          
        </div>
        <button  className="btn btn-primary mt-3  w-100" onClick={handleSubmit}>Login</button>

      </div>
    
        

    
            
            
               
    </LoginContainer>
}
       { isLoading &&
      <CirclesWithBar
  height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{height:'90vh'}}
  wrapperClass="d-flex justify-content-center align-items-center "
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'
/>

      }  
<ToastContainer />
</div>
}

export default Login;