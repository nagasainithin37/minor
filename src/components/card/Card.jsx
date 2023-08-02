import CardContainer from "./Card";
import { useState,useEffect } from "react";
function Card({noOfProblems,noOfContests,rating,type,img}){

    const [score,setScore]=useState(0)

    useEffect(()=>{

        if(type==='leetcode'){
            var x=noOfProblems*50
            if(noOfContests>=3 && rating>=1300)
            {
                x+=parseInt(Math.pow((rating-1300),2)/30)
            }
            setScore(x)
        }
        else if(type=='codechef'){
           var  x=noOfProblems*10
            if(noOfContests>=3 && rating>=1300)
                  x+=parseInt(Math.pow((rating-1300),2)/30)
            setScore(x)
        }
        else if(type=='hackerrank'){
            setScore(noOfContests+noOfProblems)
        }
        else if(type=='codeforce'){
            var x=noOfProblems*10
            if(noOfContests>=3 && rating>=1200)
             x+=parseInt(Math.pow((rating-1200),2)/30)
            setScore(x)
        }

    },[])

    return <CardContainer>
    <div className="d-flex ">
        <div className="d-flex flex-column h-100 justify-content-around">
       {type!=='hackerrank'&& <div className='d-flex gap-4'>
            <div className="side">No of problems </div>
            <div className='main'>{noOfProblems}</div>  
        </div>}
        {(type!=='hackerrank' )&&   <div className='d-flex gap-4'>
            <div className="side">No of Contests </div>
            <div className='main'>{noOfContests}</div>  
        </div>}
         {type!=='hackerrank'&&<div className='d-flex gap-4'>
            <div className="side">Rating </div>
            <div className='main'>{rating}</div>  
        </div>}

        {type==='hackerrank'&&<div className='d-flex gap-4'>
            <div className="side">Algorithms  </div>
            <div className='main'>{noOfProblems}</div>  
        </div>}
         {type==='hackerrank'&&<div className='d-flex gap-4'>
            <div className="side">Data Strctures  </div>
            <div className='main'>{noOfContests}</div>  
        </div>}
{/* Total */}
         <div className='d-flex gap-4'>
            <div className="side" style={{fontSize:'22px'}}>Total Score</div>
            <div className='main' style={{fontSize:'22px'}}>{score}</div>  
        </div>
        </div>
         <div className="ms-auto">
            <img src={img} width={40} height={'auto'} alt="img" />
        </div>
    </div>
    
    </CardContainer>
}


export default Card;