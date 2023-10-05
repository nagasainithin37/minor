import LeaderboardContainer from "./Leaderboard";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import '../../consts'
import { BsSortDown,BsSortUp } from "react-icons/bs";
import { CirclesWithBar } from  'react-loader-spinner'
function Leaderboard(){

    const [lcs,setLcs]=useState(true)
    const [hrs,setHrs]=useState(true)
    const [ibs,setIbs]=useState(true)
    const [ccs,setCcs]=useState(true)
    const [cfs,setCfs]=useState(true)
    const [spojs,setSpojs]=useState(true)
    const [rolls,setRolls]=useState(true)
    const [tts,setTts]=useState(true)
 const [isLoading,setIsLoading]=useState(false)



    const location=useLocation()
    var batch=location.state.batch
    const [data,setData]=useState([])
    var fetchData=async()=>{
        
    }

    useEffect(()=>{

    async function fetchMyAPI() {
        setIsLoading(true)
        var data=await axios.get(`${global.api}get/batchScore?name=${batch}`)
        setData(data.data)
        setIsLoading(false)
        }

        fetchMyAPI()



    },[])

    var sortt=(type)=>{
        // console.log(type)
        if(data==null){
            return
        }
       var  x=data.resObj
        if(type===1){
            if(rolls){
                // //console.log("des")
                x.sort((a, b) => {
                    return (a.username - b.username);
                });
                setRolls(false)
            }
            else{
                //// console.log('asc')
                x.sort((a, b) => {
                    return -(a.username - b.username);
                });
                setRolls(true)
            }
            // //console.log(x)
            setData({...data,...x})
        }
        else if(type===2){
            if(tts){
                // //console.log("des")
                x.sort((a, b) => {
                    return (a.totalScore - b.totalScore);
                });
                setTts(false)
            }
            else{
                //// console.log('asc')
                x.sort((a, b) => {
                    return -(a.totalScore - b.totalScore);
                });
                setTts(true)
            }
            // //console.log(x)
            setData({...data,...x})
        }
        else if(type===3){
            if(lcs){
                // //console.log("des")
                x.sort((a, b) => {
                    return (a.score.lc.total - b.score.lc.total);
                });
                setLcs(false)
            }
            else{
                //// console.log('asc')
                x.sort((a, b) => {
                    return -(a.score.lc.total - b.score.lc.total);
                });
                setLcs(true)
            }
            //console.log(x)
            setData({...data,...x})
        }
        else if(type===4){
            if(hrs){
                //console.log("des")
                x.sort((a, b) => {
                    return (a.score.hr.total - b.score.hr.total);
                });
                setHrs(false)
            }
            else{
               // console.log('asc')
                x.sort((a, b) => {
                    return -(a.score.hr.total - b.score.hr.total);
                });
                setHrs(true)
            }
            //console.log(x)
            setData({...data,...x})
        }
        else if(type===5){
            if(ccs){
                //console.log("des")
                x.sort((a, b) => {
                    return (a.score.cc.total - b.score.cc.total);
                });
                setCcs(false)
            }
            else{
               // console.log('asc')
                x.sort((a, b) => {
                    return -(a.score.cc.total - b.score.cc.total);
                });
                setCcs(true)
            }
            //console.log(x)
            setData({...data,...x})
        }
         else if(type===6){
            if(cfs){
                //console.log("des")
                x.sort((a, b) => {
                    return (a.score.cf.total - b.score.cf.total);
                });
                setCfs(false)
            }
            else{
               // console.log('asc')
                x.sort((a, b) => {
                    return -(a.score.cf.total - b.score.cf.total);
                });
                setCfs(true)
            }
            //console.log(x)
            setData({...data,...x})
        }
         else if(type===7){
            if(spojs){
                //console.log("des")
                x.sort((a, b) => {
                    return (a.score.spoj.total - b.score.spoj.total);
                });
                setSpojs(false)
            }
            else{
               // console.log('asc')
                x.sort((a, b) => {
                    return -(a.score.spoj.total - b.score.spoj.total);
                });
                setSpojs(true)
            }
            //console.log(x)
            setData({...data,...x})
        }
        else if(type===8){
             if(ibs){
                //console.log("des")
                x.sort((a, b) => {
                    return (a.score.ib.total - b.score.ib.total);
                });
                setIbs(false)
            }
            else{
               // console.log('asc')
                x.sort((a, b) => {
                    return -(a.score.ib.total - b.score.ib.total);
                });
                setIbs(true)
            }
            //console.log(x)
            setData({...data,...x})
        }
    }

    return <LeaderboardContainer>
{isLoading==false&&<div className='table-res'>
        <table className="table text-center table-striped table-bordered position-sticky top-0">

            <thead>
            <tr>
                <th rowSpan={2}>Rank</th>
                <th rowSpan={2}>Roll Number {rolls?<BsSortDown className='R-icon' onClick={()=>sortt(1)}/>:<BsSortUp className='R-icon' onClick={()=>sortt(1)}/>}</th>
                <th rowSpan={2} className="hs">Name</th>
                {data&&data.profiles&&data.profiles.leetcode&&
                
                <th colSpan={3}>Leetcode</th>
                }
                {data&&data.profiles&&data.profiles.hackerrank&&
                
                <th colSpan={3}>Hackerrank </th>
                }
                {data&&data.profiles&&data.profiles.codechef&&
                
                <th colSpan={3}>Codechef </th>
                }
                 {data&&data.profiles&&data.profiles.codeforce&&
                
                <th colSpan={3}>Codeforce</th>
                }
                 {data&&data.profiles&&data.profiles.spoj&&
                
                <th>Spoj </th>
                }
                 {data&&data.profiles&&data.profiles.ib&&
                
                <th>Interviw Bit </th>
                }
                <th rowSpan={2}>Total Score {tts?<BsSortDown className='R-icon' onClick={()=>sortt(2)}/>:<BsSortUp className='R-icon' onClick={()=>sortt(2)}/>}</th>
            </tr>
            <tr>
                
                {/*leet code  */}
                {data&&data.profiles&&data.profiles.leetcode&&
                <th >Problems</th>
                }
                {data&&data.profiles&&data.profiles.leetcode&&
                <th >Rating</th>
                }
                {data&&data.profiles&&data.profiles.leetcode&&
                <th >Total  {lcs?<BsSortDown className='R-icon' onClick={()=>sortt(3)}/>:<BsSortUp className='R-icon' onClick={()=>sortt(3)}/>}</th>
                }
                {/* hackerrank */}
                   {data&&data.profiles&&data.profiles.hackerrank&&
                <th >Algorithms</th>
                }
                {data&&data.profiles&&data.profiles.hackerrank&&
                <th >Data Structure</th>
                }
                {data&&data.profiles&&data.profiles.hackerrank&&
                <th >Total {hrs?<BsSortDown className='R-icon ' onClick={()=>sortt(4)}/>:<BsSortUp className='R-icon' onClick={()=>sortt(4)}/>}</th>
                }
                 {/*code chef  */}
                {data&&data.profiles&&data.profiles.codechef&&
                <th >Problems</th>
                }
                {data&&data.profiles&&data.profiles.codechef&&
                <th >Rating</th>
                }
                {data&&data.profiles&&data.profiles.codechef&&
                <th >Total {ccs?<BsSortDown className='R-icon' onClick={()=>sortt(5)}/>:<BsSortUp className='R-icon' onClick={()=>sortt(5)}/>}</th>
                }
                 {/*code force  */}
                {data&&data.profiles&&data.profiles.codeforce&&
                <th >Problems</th>
                }
                {data&&data.profiles&&data.profiles.codeforce&&
                <th >Rating</th>
                }
                {data&&data.profiles&&data.profiles.codeforce&&
                <th >Total  {cfs?<BsSortDown className='R-icon' onClick={()=>sortt(6)}/>:<BsSortUp className='R-icon' onClick={()=>sortt(6)}/>}</th>
                }
                {data&&data.profiles&&data.profiles.spoj&&
                <th >Total {spojs?<BsSortDown className='R-icon' onClick={()=>sortt(7)}/>:<BsSortUp className='R-icon' onClick={()=>sortt(7)}/>}</th>
                }
                 {data&&data.profiles&&data.profiles.ib&&
                <th >Total {ibs?<BsSortDown className='R-icon' onClick={()=>sortt(8)}/>:<BsSortUp className='R-icon' onClick={()=>sortt(8)}/>}</th>
                }

            </tr>

            </thead>

            <tbody>

                    {data&&data.resObj&&
                    data.resObj.map((ele,idx)=>{

                        return <tr key={idx}>

                        <td className='body'>{ele.rank}</td>
                        <td className='body'>{ele.username}</td>
                        <td className='body hs' >{ele.name}</td>
                       {/* leet code */}
                        {data&&data.profiles&&data.profiles.leetcode&&
                            <td className='body'>{ele.score.lc.noOfProblemsSolved}</td>
                        }
                         {data&&data.profiles&&data.profiles.leetcode&&
                            <td className='body'>{ele.score.lc.noOfContests}</td>
                        }
                         {data&&data.profiles&&data.profiles.leetcode&&
                            <td className='body'>{ele.score.lc.total}</td>
                        }
                    
                         {/* hackerrank */}
                        {data&&data.profiles&&data.profiles.hackerrank&&
                            <td className='body'>{ele.score.hr.algo_score}</td>
                        }
                         {data&&data.profiles&&data.profiles.hackerrank&&
                            <td className='body'>{ele.score.hr.ds_score}</td>
                        }
                         {data&&data.profiles&&data.profiles.hackerrank&&
                            <td className='body'>{ele.score.hr.total}</td>
                        }

                          {/* code chef*/}
                        {data&&data.profiles&&data.profiles.codechef&&
                            <td className='body'>{ele.score.cc.noOfProblemsSolved}</td>
                        }
                         {data&&data.profiles&&data.profiles.codechef&&
                            <td className='body'>{ele.score.cc.noOfContests}</td>
                        }
                         {data&&data.profiles&&data.profiles.codechef&&
                            <td className='body'>{ele.score.cc.total}</td>
                        }

                              {/* code force*/}
                        {data&&data.profiles&&data.profiles.codeforce&&
                            <td className='body'>{ele.score.cf.noOfProblemsSolved}</td>
                        }
                         {data&&data.profiles&&data.profiles.codeforce&&
                            <td className='body'>{ele.score.cf.noOfContests}</td>
                        }
                         {data&&data.profiles&&data.profiles.codeforce&&
                            <td className='body'>{ele.score.cf.total}</td>
                        }
                        {/* spoj */}
                        {data&&data.profiles&&data.profiles.spoj&&
                            <td className='body'>{ele.score.spoj.total}</td>
                        }
                         {data&&data.profiles&&data.profiles.ib&&
                            <td className='body'>{ele.score.ib.total}</td>
                        }
                    
                        <td className='body'>{ele.totalScore}</td>






                        </tr>




                    })

                    }

                


            </tbody>



        </table>
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
    </LeaderboardContainer>
}


export default Leaderboard;