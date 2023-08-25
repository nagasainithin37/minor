import BatchContainer from "./batch";
import { useLocation } from "react-router-dom";
import {useEffect,useState,useRef} from 'react';
import axios from "axios";
import '../../../consts'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import {OutTable, ExcelRenderer} from 'react-excel-renderer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CirclesWithBar } from  'react-loader-spinner'

function Batch(){
 const [isLoading,setIsLoading]=useState(false)
const batch_name=useLocation().state.batch


const [data,setData]=useState([])
const [newUserData,setNewUserData]=useState([])
const [addUserData,setAddUserData]=useState([])
const newUserRef=useRef()
const addUserRef=useRef()

var fetchData=async()=>{
    setIsLoading(true)
    var result=await axios.get(global.api+'get/batch-info?name='+batch_name)
    var data=result.data
    setData(data.batchUserDetails)
    setIsLoading(false)
}

var createUsers=async()=>{
    setIsLoading(true)
    if(newUserData.length==0){
        toast.error('No Users found', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
              setIsLoading(false)
        return
    }
    else{

        const postres=  await axios.post(global.api+'create/addUsers',{"name":batch_name,"users":newUserData})
        const postresult=postres.data
        if(postresult['duplicate users'].length==0){
            toast.success('users created Successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            fetchData()
              setIsLoading(false)
            return
        }
        else{
            var errorMsg='cannot Create following users \n'
            for(var i=0;i<postresult['duplicate users'].length;i++){
                errorMsg+=postresult['duplicate users'][i]+'\n'
            }
           toast.error(errorMsg, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: false,
                progress: undefined,
                theme: "colored",

                });
        }
          setIsLoading(false)
        setNewUserData([])
    }
}




var addUsers=async()=>{
    setIsLoading(true)
    if(addUserData.length==0){
            toast.error('No Users found', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
                setIsLoading(false)
            return
        }
        else{

            const result=await axios.put(global.api+'update/addtoGroup',{"name":batch_name,"users":addUserData})
            const resultAdd=result.data
            
             toast.success(`Total ${resultAdd.update_result.modifiedCount}  are added to ${batch_name}`, {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
            });
            fetchData()
              setIsLoading(false)
            return
        }
}




console.log(newUserData)
useEffect(()=>{

fetchData()


},[])


return <BatchContainer>
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
{ isLoading==false&&
<div>
<div className="d-flex justify-content-around align-items-center mt-3">



{/* Name branch email roll no mobile no  lc,cc,hr,cf,spoj */}
<div className="d-flex flex-column gap-2 justify-content-center align-items-start" >
    <input type="file" ref={newUserRef}
    onChange={(e)=>{
    
        const file=e.target.files[0]
        ExcelRenderer(file,(err,res)=>{
          if(err){
            alert(err)
          }
          else{

            const headers=res.rows[0]
            res.rows.shift()
            var result=[]
            for(var i=0;i<res.rows.length;i++){
                var tempObj={}
                for(var j=0;j<headers.length;j++){
                    tempObj[headers[j]]=res.rows[i][j]
                    console.log(headers[j]+' 5 '+res.rows[i][j])
                }
                result.push(tempObj)
            }
            setNewUserData([...result])
          }
        })
      }} 
    
    
    />
    <button className="btn btn-primary" onClick={()=>{
        
        createUsers() 
        newUserRef.current.value=''}}> Add New Users</button>
</div>

<div className="d-flex flex-column gap-2 justify-content-center align-items-start" >
    <input type="file" ref={addUserRef}
        onChange={(e)=>{
    
        const file=e.target.files[0]
        ExcelRenderer(file,(err,res)=>{
          if(err){
            alert(err)
          }
          else{

            // const headers=res.rows[0]
            res.rows.shift()
            var result=[]
            for(var i=0;i<res.rows.length;i++){
                result.push(res.rows[i][0])
                console.log(res.rows[i])
            }
            setAddUserData([...result])
            console.log(result)
            // for(var i=0;i<res.rows.length;i++){
            //     var tempObj={}
            //     for(var j=0;j<headers.length;j++){
            //         tempObj[headers[j]]=res.rows[i][j]
            //         console.log(headers[j]+' 5 '+res.rows[i][j])
            //     }
            //     result.push(tempObj)
            // }
            // setNewUserData([...result])
          }
        })
      }} 
    
    />
    <button className="btn btn-primary"
    
    onClick={()=>{
        
        addUsers() 
        addUserRef.current.value=''}}
    
    > Add Exisiting Users</button>
</div>
</div>

   <table id="table-to-xls" className="table table-striped  text-center mx-auto mt-2">

    <thead>
        <tr className='position-sticky table-dark top-0 ts'>
            <th>#</th>
            <th>Roll Number</th>
            <th className="hs">Name</th>
            <th> Branch</th>
            <th> Email</th>
            <th> Batch</th>
            <th>
            <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn  btn-success"
                    table="table-to-xls"
                    filename={batch_name}
                    sheet="tablexls"
                    buttonText="↓"/>
                </th>
        </tr>
    </thead>
    <tbody>
       {data&&
        data.map((ele,idx)=>{
            return <tr key={idx}>
                <td>{idx+1}</td>
                <td >{ele.username}</td>
                <td className="hs">{ele.name}</td>
                <td>{ele.branch}</td>
                <td>{ele.email}</td>
                <td >    
                    {   ele.batch.map((batch,batchIdx)=>{
                        return <li key={batchIdx} >{batch}</li>
                    })

                    }

                </td>
                <td></td>

            </tr>
        })
       }
    </tbody>

   </table>
    

</div>
}
<ToastContainer />
</BatchContainer>

}


export default Batch;