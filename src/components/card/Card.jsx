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
        else if(type==='ib' ){
            setScore(parseInt(noOfProblems/3))
        }
        else if(type=='spoj'){
            var x=noOfProblems*20
            if(isNaN(x)){
                x=0
            }
            setScore(x)
        }

    },[])

    if(type==='ib'){
        return <CardContainer >
            <div className="text-center display-6 ">Interview Bit</div>
        <div className="d-flex" >
            
        <div className="d-flex flex-column h-100 justify-content-around">

        <div className="d-flex gap-4">
             <div className="side" style={{fontSize:'22px'}}>Interview Bit Score</div>
            <div className='main' style={{fontSize:'22px'}}>{noOfProblems}</div> 
        </div>
{/* Total */}
         <div className='d-flex gap-4'>
            <div className="side" style={{fontSize:'22px'}}>Total Score</div>
            <div className='main' style={{fontSize:'22px'}}>{score}</div>  
        </div>
        </div>
        <div className="ms-auto">
            <img src={img} width={50} height={'auto'} alt="img" />
        </div>
        </div>
        </CardContainer>
    }

    else if(type=='spoj'){
           return <CardContainer>
             <div className="text-center display-6 ">Spoj</div>
        <div className="d-flex">
        <div className="d-flex flex-column h-100 justify-content-around">

        <div className="d-flex gap-4">
            <div className="side" style={{fontSize:'22px'}}>Problems</div>
            <div className='main' style={{fontSize:'22px'}}>{noOfProblems}</div> 
        </div>
{/* Total */}
         <div className='d-flex gap-4'>
            <div className="side" style={{fontSize:'22px'}}>Total Score</div>
            <div className='main' style={{fontSize:'22px'}}>{score}</div>  
        </div>
        </div>
        <div className="ms-auto">
            <img src={img} width={50} height={'auto'} alt="img" />
        </div>
        </div>
        </CardContainer>
    }

    else{
    return <CardContainer>
        {type=='leetcode'&& <div className="text-center display-6  ">LeetCode</div>}
         {type=='codechef'&& <div className="text-center display-6 ">CodeChef</div>}
          {type=='codeforce'&& <div className="text-center display-6 ">Codeforce</div>}
           {type=='hackerrank'&& <div className="text-center display-6 ">Hackerrank</div>}
           
    <div className="d-flex ">
        <div className="d-flex flex-column h-100 justify-content-around">
       {type!=='hackerrank'&& <div className='d-flex gap-4'>
            <div className="side">No . of problems </div>
            <div className='main'>{noOfProblems}</div>  
        </div>}
        {(type!=='hackerrank' )&&   <div className='d-flex gap-4'>
            <div className="side">No . of Contests </div>
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
}


export default Card;