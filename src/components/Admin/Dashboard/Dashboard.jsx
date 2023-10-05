import DashboardContainer from "./Dashboard";
import {fetchAllUsers} from '../../../store/adminSlice';
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import { AiFillEdit } from "react-icons/ai";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import { addBatch,delBatch,updateBatch } from "../../../store/adminSlice";
import { AiOutlineDelete } from "react-icons/ai";
import '../../../consts'
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
            const [openEdit,setOpenEdit]=useState(false)
            const handleOpen = () => setOpen(true);
            const handleOpenEdit=()=>setOpenEdit(true)
            const handleClose = () => setOpen(false);
            const handleCloseEdit = () => setOpenEdit(false);
            const [name,setName]=useState('')
            const [oldName,setOldName]=useState(null)
            const [lcn,setLcn]=useState(false)
            const [ccn,setCcn]=useState(false)
            const [cfn,setCfn]=useState(false)
            const [hrn,setHrn]=useState(false)
            const [spojn,setSpojn]=useState(false)
            const [ibn,setIbn]=useState(false)
            const [idx,setIdx]=useState(0)
            var deleteBatch=async(batchName)=>{
                var deleteResult=await axios.get(global.api+'update/deleteBatch?name='+batchName)
                if(deleteResult.data.message=='success'){
                    success(`${batchName} deleted Successfully`)
                    var actionObj=delBatch(batchName)
                    dispatch(actionObj)
                }
                return;
            }

            var updateBatchh=async()=>{
                var obj={}
                // console.log(oldName)
                obj.name=name
                obj._id=oldName
                obj.profiles={}
                obj.profiles.leetcode=lcn
                obj.profiles.codechef=ccn
                obj.profiles.codeforce=cfn
                obj.profiles.spoj=spojn
                obj.profiles.hackerrank=hrn
                obj.profiles.ib=ibn

                const resu=(await axios.put(global.api+"update/batchDetails",obj)).data
                // console.log(resu)
                if(resu.message==='success'){
                        var actionObj=updateBatch({idx,data:obj});
                        dispatch(actionObj)
                        success("Batch updated succesfully")
                }
                else{
                    failure(resu.message)
                }
                handleCloseEdit()
                // obj.profiles.interviewbit=lcn
            }

            if(one && isSuccess==false)
            {
                var url=global.api+'get/batchDetails'
                // console.log(url)
                let actionObject=fetchAllUsers({url:global.api+'get/batch',headers:{"Authorization":localStorage.getItem('token')}})
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
                obj.profiles.ib=ib
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
                <div className="d-flex justify-content-around ">
                <h4  className='mx-3'>{ele.name}</h4>
            <div className='ps-3 pe-3' style={{boxShadow:'black 0px 1px 3px 1px',borderRadius:'5px',cursor:'pointer'}} onClick={()=>{
                setIdx(idx)
                setOldName(ele._id)
                setName(ele.name)
                setLcn(ele.profiles.leetcode)
                setCcn(ele.profiles.codechef)
                setCfn(ele.profiles.codeforce)
                setSpojn(ele.profiles.spoj)
                setIbn(ele.profiles.ib)
                setHrn(ele.profiles.hackerrank)
                handleOpenEdit()
                }}><  AiFillEdit style={{color:'green'}} /></div>
                </div>
                
            
                <div className="d-flex justify-content-around gap-4 align-items-center">
                    <h6>No Of Students </h6>
                    {ele&&ele.users&&<h5 className="text-primary ">{ele.users.length}</h5>}
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
      <div className="form-floating mb-3">
            <input type="text" value={name} className="form-control" onChange={(e)=>{setName(e.target.value)}}  id="floatingInput" placeholder="Enter Batch Name"/>
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


{/* update details */}
 <Modal
    open={openEdit}
    onClose={handleCloseEdit}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
  <Box sx={style} className='d-flex flex-column gap-3'>
      <div className="form-floating mb-3">
            <input type="text" value={name} className="form-control" disabled onChange={(e)=>{setName(e.target.value)}}  id="floatingInput" placeholder="Enter Batch Name"/>
            <label for="floatingInput">Batch Name</label>
        </div>

    <div className="d-flex justify-content-around">
            <div className='d-flex flex-column justify-content-around'>

                    <div className='w-100 d-flex justify-content-between  gap-4 '>

                        <div>LeetCode</div>
                        <input type="checkbox" value={lc} defaultChecked={lcn} onChange={(e)=>{setLcn(!lcn)}}  data-toggle="toggle"></input>
                    </div>
                    <div className='w-100 d-flex justify-content-between gap-4 '>

                        <div>CodeChef</div>
                        <input type="checkbox" value={cc} defaultChecked={ccn} onChange={(e)=>{setCcn(!ccn)}}   data-toggle="toggle"></input>
                    </div>
                    <div className='w-100 d-flex justify-content-between gap-4 '>

                        <div>Spoj</div>
                        <input type="checkbox" value={spoj} defaultChecked={spojn} onChange={(e)=>{setSpojn(!spojn)}}  data-toggle="toggle"></input>
                    </div>

            </div>
             <div className='d-flex flex-column justify-content-around'>

                    <div className='w-100 d-flex justify-content-between  gap-4 '>

                        <div>CodeForce</div>
                        <input type="checkbox" value={cf} defaultChecked={cfn} onChange={(e)=>{setCfn(!cfn)}}  data-toggle="toggle"></input>
                    </div>
                    <div className='w-100 d-flex justify-content-between gap-4 '>

                        <div>Hackerrank</div>
                        <input type="checkbox" value={hr} defaultChecked={hrn} onChange={(e)=>{setHrn(!hrn)}}  data-toggle="toggle"></input>
                    </div>
                    <div className='w-100 d-flex justify-content-between gap-4 '>

                        <div>InterviewBit</div>
                        <input type="checkbox" value={ib} defaultChecked={ibn} onChange={(e)=>{setIbn(!ibn)}}  data-toggle="toggle"></input>
                    </div>

            </div>
    </div>
    <button className='btn btn-primary' onClick={updateBatchh}>Update </button>
  </Box>
</Modal>

<ToastContainer />
    </DashboardContainer>
}

export default DashboardAdmin;