import DashboardContainer from "./Dashboard";
import {fetchAllUsers} from '../../../store/adminSlice';
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { addBatch,delBatch } from "../../../store/adminSlice";
import { AiOutlineDelete } from "react-icons/ai";
// Modal styles
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',

  boxShadow: 24,
  p: 4,
};


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






function DashboardAdmin(){

            const {details,isPending,isSuccess ,isError, errorMessage}=useSelector(store=>store.details)
            const dispatch=useDispatch()
            const [one,setOne]=useState(true)
            const [lc,setLc]=useState(false)
            const [cc,setCc]=useState(false)
            const [cf,setCf]=useState(false)
            const [hr,setHr]=useState(false)
            const [spoj,setSpoj]=useState(false)
            const [ib,setIb]=useState(false)
            const navigate=useNavigate()
            const [open,setOpen]=useState(false)
            const handleOpen = () => setOpen(true);
            const handleClose = () => setOpen(false);
            const [name,setName]=useState('')


            var deleteBatch=async(batchName)=>{
                var deleteResult=await axios.get(global.api+'update/deleteBatch?name='+batchName)
                if(deleteResult.data.message=='success'){
                    success(`${batchName} deleted Successfully`)
                    var actionObj=delBatch(batchName)
                    dispatch(actionObj)
                }
                return;
            }

            if(one && isSuccess==false)
            {
                var url=global.api+'get/batchDetails'
                console.log(url)
                let actionObject=fetchAllUsers({url:'http://localhost:3015/get/batch',headers:{"Authorization":localStorage.getItem('token')}})
                dispatch(actionObject)
                setOne(false)
            }

            var createBatch=async()=>{
                var obj={}
                if(name.trim().length==0){
                    failure('Enter Batch Name')
                    return
                }
                obj.name=name;
                obj.profiles={}
                obj.profiles.leetcode=lc
                obj.profiles.codechef=cc
                obj.profiles.codeforce=cf
                obj.profiles.spoj=spoj
                obj.profiles.hackerrank=hr
                obj.users=[]
                var result=(await axios.post(global.api+'create/batch',obj)).data
                if(result.type=='success'){
                    success(result.message)
                    var actionObj=addBatch(obj)
                    dispatch(actionObj)
                    handleClose()
                }
                else{
                    failure(result.message)
                }
                
            }
    return <DashboardContainer>

        <div className="d-flex w-100">
            <button className="btn btn-primary" onClick={handleOpen}>Create New Batch</button>
        </div>


 {details&&

    details.map((ele,idx)=>{
        return <div className="lb-container ">
            <h4>{ele.name}</h4>
          
            
            
           
            <div className="d-flex justify-content-around gap-4 align-items-center">
                <h6>No Of Students</h6>
                {ele&&ele.user&&<h5 className="text-primary display-6">{ele.users.length}</h5>}
            </div>
  <div className='d-flex justify-content-around w-100'>
            <button className="btn btn-outline-primary "  onClick={()=>{

                navigate('/admin/batch',{
                    state:{
                        batch:ele.name
                    }
                })

            }} >Open</button>
        <button className='btn btn-danger' onClick={()=>{
            deleteBatch(ele.name)
        }}><AiOutlineDelete/></button>
         </div>
        </div>
    })

    }



    {/* create batch modal */}

    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >

 

  <Box sx={style} className='d-flex flex-column gap-3'>
      <div class="form-floating mb-3">
            <input type="text" value={name} class="form-control" onChange={(e)=>{setName(e.target.value)}}  id="floatingInput" placeholder="Enter Batch Name"/>
            <label for="floatingInput">Batch Name</label>
        </div>

    <div className="d-flex justify-content-around">
            <div className='d-flex flex-column justify-content-around'>

                    <div className='w-100 d-flex justify-content-between  gap-4 '>

                        <div>LeetCode</div>
                        <input type="checkbox" value={lc} onChange={(e)=>{setLc(!lc)}}  data-toggle="toggle"></input>
                    </div>
                    <div className='w-100 d-flex justify-content-between gap-4 '>

                        <div>CodeChef</div>
                        <input type="checkbox" value={cc} onChange={(e)=>{setCc(!cc)}}   data-toggle="toggle"></input>
                    </div>
                    <div className='w-100 d-flex justify-content-between gap-4 '>

                        <div>Spoj</div>
                        <input type="checkbox" value={spoj} onChange={(e)=>{setSpoj(!spoj)}}  data-toggle="toggle"></input>
                    </div>

            </div>
             <div className='d-flex flex-column justify-content-around'>

                    <div className='w-100 d-flex justify-content-between  gap-4 '>

                        <div>CodeForce</div>
                        <input type="checkbox" value={cf} onChange={(e)=>{setCf(!cf)}}  data-toggle="toggle"></input>
                    </div>
                    <div className='w-100 d-flex justify-content-between gap-4 '>

                        <div>Hackerrank</div>
                        <input type="checkbox" value={hr} onChange={(e)=>{setHr(!hr)}}  data-toggle="toggle"></input>
                    </div>
                    <div className='w-100 d-flex justify-content-between gap-4 '>

                        <div>InterviewBit</div>
                        <input type="checkbox" value={ib} onChange={(e)=>{setIb(!ib)}}  data-toggle="toggle"></input>
                    </div>

            </div>
    </div>
    <button className='btn btn-primary' onClick={createBatch}>Create Group </button>
  </Box>
</Modal>



<ToastContainer />
    </DashboardContainer>
}

export default DashboardAdmin;