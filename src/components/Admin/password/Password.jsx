import PasswordContainer from "./Password";
import { useState } from "react";
import '../../../consts'
import axios  from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CirclesWithBar } from  'react-loader-spinner'

function Password(){

    const [isLoading,setIsLoading]=useState(false)
    const [username,setUsername]=useState('')
    const [oldPassword,setOldPassword]=useState('')
    const [newPassword1,setNewPassword1]=useState('')
    const [newPassword2,setNewPassword2]=useState('')


 const success = (msg) => {
      toast.success(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
 }
const failure = (msg) => {
    // console.log('failure')
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



    const reset=async()=>{
        setIsLoading(true)
        if(username.length==0){
            failure("enter username")
            setIsLoading(false)
            return
        }
        let result =await axios.put(global.api+'auth/changePswByAdmin',{username})
        if(result && result.data && result.data.payload.modifiedCount==1){
            success("Password changed")
        }
        else{
            failure("error occured")
        }
    setOldPassword('')
        setNewPassword1('')
        setNewPassword2('')
        setUsername('')
        setIsLoading(false)
    }


    const update=async()=>{
         if(newPassword1.length==0){
            failure("enter password")
            return
        }
setIsLoading(true)
        if(newPassword1!=newPassword2){
            failure("Password doesnt match")
                    setIsLoading(false)

            return
        }

        let body={
            "username":localStorage.getItem("username"),
            "oldPassword":oldPassword,
            "newPassword":newPassword1
        }

        let result=await axios.put(global.api+"auth/changePassword",body)
        if(result&&result.data.status=='success'){
            success(result.data.message)
        }
        else{
            failure(result.data.message??"Error occured")
        }
        setIsLoading(false)
        setOldPassword('')
        setNewPassword1('')
        setNewPassword2('')
        setUsername('')
    }




    return <div>    
   {!isLoading&&
    <PasswordContainer>


        <div className="cardd p-3 ">

            <div className="display-6 text-primary">Reset User Password </div>
            <div class="mb-3 mt-2">
        <input type="text" class="form-control" value={username }  id="exampleFormControlInput1" onChange={(e)=>{setUsername(e.target.value)}} placeholder="Username"/>
        </div>

            <button className="btn btn-primary" onClick={reset}>Reset</button>
            </div>


        <div className="cardd p-3">
            <div className="display-6 text-primary">Reset Your Password </div>

        <div class="mb-3 mt-2">
        <input type="password" class="form-control" value={oldPassword}  onChange={(e)=>{setOldPassword(e.target.value)}} id="exampleFormControlInput1" placeholder="old password"/>
        </div>
            

        <div class="mb-3 mt-2">
        <input type="password" class="form-control" value={newPassword1}  onChange={(e)=>{setNewPassword1(e.target.value)}} id="exampleFormControlInput1" placeholder="New Password"/>
        </div>


        <div class="mb-3 mt-2">
        <input type="password" class="form-control" value={newPassword2} onChange={(e)=>{setNewPassword2(e.target.value)}} id="exampleFormControlInput1" placeholder="Re enter password"/>
        </div>
                <button className="btn btn-primary" onClick={update}>Update</button>
        </div>


    </PasswordContainer>
}


    { isLoading &&
      <CirclesWithBar height="100"
  width="100"
  color="#4fa94d"
  wrapperStyle={{height:'90vh'}}
  wrapperClass="d-flex justify-content-center align-items-center "
  visible={true}
  outerCircleColor=""
  innerCircleColor=""
  barColor=""
  ariaLabel='circles-with-bar-loading'/>

      }  
<ToastContainer />
    </div>



}


export default Password;