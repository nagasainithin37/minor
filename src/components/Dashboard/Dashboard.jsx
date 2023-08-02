import DashboardContainer from "./Dashboard";
import { useSelector,useDispatch } from "react-redux";
import {fetchUser} from '../../store/userSlice';
import { useState,useEffect } from "react";
import Card from "../card/Card.jsx";
import '../../consts'
import { Doughnut } from 'react-chartjs-2';
import { Chart } from "chart.js/auto";



function Dashboard(){

var images={}
images['lc']='https://upload.wikimedia.org/wikipedia/commons/1/19/LeetCode_logo_black.png'
images['cc']='https://i.pinimg.com/originals/c5/d9/fc/c5d9fc1e18bcf039f464c2ab6cfb3eb6.jpg'
images['hr']='https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/HackerRank_Icon-1000px.png/800px-HackerRank_Icon-1000px.png'
images['cf']='https://store-images.s-microsoft.com/image/apps.48094.14504742535903781.aedbca21-113a-48f4-b001-4204e73b22fc.503f883f-8339-4dc5-8609-81713a59281f'
images['spoj']='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQLREO1ILW3HNvha5SjIm4hcSXwYxyC4oIqXkVpQAFNyw&s'
images['ib']='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvgtP1YdZF5ULyEr60-e6OK0ZCZGfNDrJ_x6PptpBCXg&s';



const {user,isPending,isSuccess ,isError, errorMessage}=useSelector(store=>store.user)
const dispatch=useDispatch()
const [one,setOne]=useState(true)



if(one){
let actionObject=fetchUser({url:global.api+'user/getdetails',headers:{"Authorization":localStorage.getItem('token')}})
dispatch(actionObject)

    setOne(false)
}

var getScore=(type)=>{
    if(isSuccess==false){
        return 0;
    }
    if(type==='leetcode'){
            var x=user.score.lc.noOfProblemsSolved*50
            if(user.score.lc.noOfContests>=3 && user.score.lc.rating>=1300)
            {
                x+=parseInt(Math.pow((user.score.lc.rating-1300),2)/30)
            }
            return x;
        }
        else if(type=='codechef'){
          var x=user.score.cc.noOfProblemsSolved*10
            if(user.score.cc.noOfContests>=3 && user.score.cc.rating>=1300)
            {
                x+=parseInt(Math.pow((user.score.cc.rating-1300),2)/30)
            }
            return x;
        }
        else if(type=='hackerrank'){
            return user.score.hr.algo_score+user.score.hr.ds_score
        }
        else if(type=='codeforce'){
            var x=user.score.cf.noOfProblemsSolved*50
            if(user.score.cf.noOfContests>=3 && user.score.cf.rating>=1300)
            {
                x+=parseInt(Math.pow((user.score.cf.rating-1300),2)/30)
            }
            return x;
        }
        else if(type=='spoj'){
            return user.score.spoj.noOfProblemsSolved*20;
        }

}
  const dta = {
  labels: [
    'LeetCode',
    'CodeChef',
    'CodeForces',
    'spoj',
    'HackerRank'
  ],
  datasets: [{
    // data:[100,200,300,400,500,600],
    data: [getScore('leetcode'),getScore('codechef'),getScore('codeforce'),getScore('spoj'),getScore('hackerrank')],
    backgroundColor: [
      'rgb(255, 99, 132)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)',
      'rgb(0,255,0)',
      'rgb(220,20,60)',

    ],
    hoverOffset: 4
  }]
};

// console.log(dta)
    return <DashboardContainer>
      
        <div className="d-flex justify-content-around flex-column ">
            
            <div className='d-flex justify-content-around w-100 mt-5 gap-5 '>
       
       {user.profile&&user.profile.lc&&
         <Card 
            noOfProblems={user.score.lc.noOfProblemsSolved} 
            noOfContests={user.score.lc.noOfContests} 
            rating={user.score.lc.rating} 
            type="leetcode"  
            img={images['lc']}/>
       }

        {/* code chef */}
       
       {user.profile&&user.profile.cc&&
         <Card 
            noOfProblems={user.score.cc.noOfProblemsSolved} 
            noOfContests={user.score.cc.noOfContests} 
            rating={user.score.cc.rating}
            type="codechef"
            img={images['cc']}
        />}
            </div>

            <div className='d-flex justify-content-around w-100 mt-5 gap-5 '>
                    {/* hackerrank */}
                    {user.profile&&user.profile.hr&&
                    <Card 
                        noOfProblems={user.score.hr.algo_score} 
                        noOfContests={user.score.hr.ds_score} 
                        rating={null}
                        type="hackerrank"
                        img={images['hr']}
                    />}

                        {/* code forces */}
                {user.profile&&user.profile.cf&&
                    <Card 
                        noOfProblems={user.score.cf.noOfProblemsSolved} 
                        noOfContests={user.score.cf.noOfContests} 
                        rating={user.score.cf.rating}
                        type="codeforce"
                        img={images['cf']}
                    />}
                    

            </div>

          


        
        </div>
<div className="chart">
{isSuccess&&<Doughnut data={dta}/>}
</div>
    </DashboardContainer>
}


export default Dashboard