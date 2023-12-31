import ProfileContainer from "./Profile";
import { useSelector,useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import '../../consts'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {update} from '../../store/userSlice';
import { CirclesWithBar } from  'react-loader-spinner'
import { fetchUser } from "../../store/userSlice";
function Profile(){

    const {user,isPending,isSuccess ,isError, errorMessage}=useSelector(store=>store.user)
    const [name,setName]=useState(user.user?user.user.name:'' )
    const [email,setEmail]=useState(user.auth?user.auth.email:'')
    const [pno,setPno]=useState(user.user?user.user.mobileno:'')
    const [lc,setLc]=useState(user.profile?user.profile.lc:'')
    const [cc,setCc]=useState(user.profile?user.profile.cc:'')
    const [cf,setCf]=useState(user.profile?user.profile.cf:'')
    const [ib,setIb]=useState(user.profile?user.profile.ib:'')
    const [spoj,setSpoj]=useState(user.profile?user.profile.spoj:'')
    const [hr,setHr]=useState(user.profile?user.profile.hr:'')
    const [isLoading,setIsLoading]=useState(false)
    const [updates,setUpdated]=useState(false)
    const dispatch=useDispatch()
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

  
    const updatee=async()=>{
        if(newPassword1.length==0){
            failure("enter password")
            return
        }
setIsLoading(true)
        if(newPassword1!=newPassword2 ){
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
    }



  var globalbody={}
    var update=async()=>{
        setIsLoading(true)
        var body={}
        globalbody=JSON.parse(JSON.stringify(user));
        globalbody.user.name=name;
        globalbody.auth.email=email;
        globalbody.user.mobileno=pno


        body.username=user.auth.username
        body.auth={'email':email}
        body.userid=user.user._id
        body.profileid=user.profile._id;
        body.user={
        
            'name':name,
            'mobileno':pno
        }
        body.profiles={
            "lc":lc,
            "cc":cc,
           "cf":cf,
            "spoj":spoj,
            "hr":hr,
            "ib":ib,
        }
        globalbody.profile={...globalbody.profile,...body.profiles}
        // console.log(globalbody)
        var url=global.api+"update/user"
        var result=await axios.put(url,body)
        var res=result.data
        if(res.message==='updated Successfully'){
             let actionObject=fetchUser({url:global.api+'user/getdetails',headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(actionObject)
        //    setUpdated(true)
            success(res.message)
        }
        else{
            failure(res.message)
        }

        setIsLoading(false)
    }

    if(updates){
        
            setUpdated(false)
    }

    return <div>
    
    <ProfileContainer>

        {!isLoading&&isSuccess&&<div className='user'>

        <div>
        <div className='d-flex justify-content-around gap-4 fc one'>
        {/* Name */}
        <div className="form-floating mb-3">
            <input type="text" value={name} className="form-control" onChange={(e)=>{setName(e.target.value)}}  id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Name</label>
        </div>
        {/* Email */}
        <div className="form-floating mb-3">
            <input type="email" value={email} className="form-control" onChange={(e)=>{setEmail(e.target.value)}}  id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Email</label>
        </div>
        {/* Mobile number */}
         <div className="form-floating mb-3">
            <input type="number" value={pno} className="form-control" onChange={(e)=>{setPno(e.target.value)}}  id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Phone number</label>
        </div>
        </div>

        {/* platforms */}

        <div className='d-flex justify-content-around gap-4 fc'>
      
        <div className="form-floating mb-3">
            <input type="text" value={lc} className="form-control" onChange={(e)=>{setLc(e.target.value)}}  id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Leetcode</label>
        </div>
     
        <div className="form-floating mb-3">
            <input type="text" value={cc} className="form-control" onChange={(e)=>{setCc(e.target.value)}}  id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Codechef</label>
        </div>
     
         <div className="form-floating mb-3">
            <input type="text" value={hr}  onChange={(e)=>{setHr(e.target.value)}}  className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Hackerrank</label>
        </div>
        </div>

        {/* platforms 2 */}

        <div className='d-flex justify-content-around gap-4 fc'>
        
        <div className="form-floating mb-3">
            <input type="text" value={ib}  onChange={(e)=>{setIb(e.target.value)}}  className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Interview Bit</label>
        </div>
    
        <div className="form-floating mb-3">
            <input type="text" value={cf} onChange={(e)=>{setCf(e.target.value)}}   className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Code Forces</label>
        </div>
       
         <div className="form-floating mb-3">
            <input type="text" value={spoj} onChange={(e)=>{setSpoj(e.target.value)}}   className="form-control" id="floatingInput" placeholder="name@example.com"/>
            <label for="floatingInput">Spoj</label>
        </div>
        </div>

        <button className="btn btn-primary" onClick={update} >Update</button>

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
                <button className="btn btn-primary" onClick={updatee}>Update</button>
        </div>
        
        </div>
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
    
    
    </ProfileContainer>
    <ToastContainer />
</div>
}



export default Profile