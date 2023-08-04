import LeaderBoardDashBoardContainer from "./LeaderBoardDashBoard";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";




function LeaderBoardDashBoard(){

    const navigate=useNavigate()
const {user,isPending,isSuccess ,isError, errorMessage}=useSelector(store=>store.user)
    return <LeaderBoardDashBoardContainer>

    {user&&user.auth&&user.auth.batch&&

    user.auth.batch.map((ele,idx)=>{
        return <div className="lb-container">

            <h4>{ele}</h4>

            <button className="btn btn-outline-primary w-100"  onClick={()=>{

                navigate('/user/leaderboard',{
                    state:{
                        batch:ele
                    }
                })

            }} >Open</button>

        </div>
    })

    }


    </LeaderBoardDashBoardContainer>
}


export default LeaderBoardDashBoard;