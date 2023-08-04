import DashboardContainer from "./Dashboard";
import {fetchAllUsers} from '../../../store/adminSlice';
import { useSelector,useDispatch } from "react-redux";
import { useState } from "react";


import { useNavigate } from "react-router-dom";
function DashboardAdmin(){

const {details,isPending,isSuccess ,isError, errorMessage}=useSelector(store=>store.details)
const dispatch=useDispatch()
const [one,setOne]=useState(true)
const navigate=useNavigate()


if(one && isSuccess==false){
    var url=global.api+'get/batchDetails'
    console.log(url)
let actionObject=fetchAllUsers({url:'http://localhost:3015/get/batch',headers:{"Authorization":localStorage.getItem('token')}})
dispatch(actionObject)

    setOne(false)
}

console.log(details)
    return <DashboardContainer>

 {details&&

    details.map((ele,idx)=>{
        return <div className="lb-container">

            <h4>{ele.name}</h4>
            <div className="d-flex justify-content-around gap-4 align-items-center">
                <h6>No Of Students</h6>
                <h5 className="text-primary display-6">{ele.users.length}</h5>
            </div>
            <button className="btn btn-outline-primary w-100"  onClick={()=>{

                navigate('/admin/leaderboard',{
                    state:{
                        batch:ele.name
                    }
                })

            }} >Open</button>

        </div>
    })

    }

    </DashboardContainer>
}

export default DashboardAdmin;