import LeaderboardContainer from "./Leaderboard";
import { useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import '../../consts'


function Leaderboard(){

    const location=useLocation()
    var batch=location.state.batch
    const [data,setData]=useState([])
    var fetchData=async()=>{
        
    }

    useEffect(()=>{

    async function fetchMyAPI() {
        var data=await axios.get(`${global.api}get/batchScore?name=${batch}`)
        setData(data.data)
        }

        fetchMyAPI()



    },[])


    return <LeaderboardContainer>

        <table className="table text-center table-striped table-bordered position-sticky top-0">

            <thead>
            <tr>
                <th rowSpan={2}>Rank</th>
                <th rowSpan={2}>Roll Number</th>
                <th rowSpan={2}>Name</th>
                {data&&data.profiles&&data.profiles.leetcode&&
                
                <th colSpan={3}>Leetcode</th>
                }
                {data&&data.profiles&&data.profiles.hackerrank&&
                
                <th colSpan={3}>Hackerrank</th>
                }
                {data&&data.profiles&&data.profiles.codechef&&
                
                <th colSpan={3}>Codechef</th>
                }
                 {data&&data.profiles&&data.profiles.codeforce&&
                
                <th colSpan={3}>Codeforce</th>
                }
                 {data&&data.profiles&&data.profiles.spoj&&
                
                <th>Spoj</th>
                }
                <th rowSpan={2}>Total Score</th>
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
                <th >Total</th>
                }
                {/* hackerrank */}
                   {data&&data.profiles&&data.profiles.hackerrank&&
                <th >Algorithms</th>
                }
                {data&&data.profiles&&data.profiles.hackerrank&&
                <th >Data Structure</th>
                }
                {data&&data.profiles&&data.profiles.hackerrank&&
                <th >Total</th>
                }
                 {/*code chef  */}
                {data&&data.profiles&&data.profiles.codechef&&
                <th >Problems</th>
                }
                {data&&data.profiles&&data.profiles.codechef&&
                <th >Rating</th>
                }
                {data&&data.profiles&&data.profiles.codechef&&
                <th >Total</th>
                }
                 {/*code force  */}
                {data&&data.profiles&&data.profiles.codeforce&&
                <th >Problems</th>
                }
                {data&&data.profiles&&data.profiles.codeforce&&
                <th >Rating</th>
                }
                {data&&data.profiles&&data.profiles.codeforce&&
                <th >Total</th>
                }
                {data&&data.profiles&&data.profiles.spoj&&
                <th >Total</th>
                }
                

            </tr>

            </thead>

            <tbody>

                    {data&&data.resObj&&
                    data.resObj.map((ele,idx)=>{

                        return <tr key={idx}>

                        <td className='body'>{idx+1}</td>
                        <td className='body'>{ele.username}</td>
                        <td className='body'>{ele.name}</td>
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
                        <td className='body'>{ele.totalScore}</td>






                        </tr>




                    })

                    }

                


            </tbody>



        </table>


    </LeaderboardContainer>
}


export default Leaderboard;