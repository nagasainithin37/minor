import ContestContainer from './Contests'
import { VerticalTimeline, VerticalTimelineElement }  from 'react-vertical-timeline-component';
import 'react-vertical-timeline-component/style.min.css';
import { SiLeetcode,SiCodechef,SiCodeforces } from "react-icons/si";
import axios from 'axios';
import { useState } from 'react';
import { FaHackerrank } from "react-icons/fa";

function Contests(){



const [data,setData]=useState([])
const [isFetched,setIsFetched]=useState(false)

var fetchData=async()=>{
    const result=await axios.get('https://kontests.net/api/v1/all')
    setData(result.data)
}
console.log(data)
if(isFetched==false){

    setIsFetched(true)
    fetchData()



}



    return <ContestContainer>
<VerticalTimeline lineColor="black"  >

 

    {data&&data.length!=0&&
    
    data.map((ele,idx)=>{
const utcDate =new Date(ele.start_time)

const endDate=new Date(ele.end_time)




if(ele.site=='LeetCode'){
        return <VerticalTimelineElement key={idx}
  dateClassName="date"
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(58, 59, 58)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 33, 34)' }}
    date={utcDate.toLocaleString()}
    iconStyle={{ background: 'rgb(223, 220, 39)', color: '#fff' }}
    icon={<SiLeetcode />}
  >
    <h3 className="vertical-timeline-element-title">{ele.name}</h3>
    <h4 className="vertical-timeline-element-subtitle">{ele.site}</h4>
    <div className="d-flex gap-2 align-items-center">
        <h4>Ends at : </h4>
        <h5>{endDate.toLocaleString()}</h5>
        </div>
   <button className='btn btn-primary'><a href={ele.url} target='_blank'> Register</a></button> 
    
  </VerticalTimelineElement>
}
else if(ele.site=='CodeChef'){
      return <VerticalTimelineElement key={idx}
  dateClassName="date"
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(58, 59, 58)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 33, 34)' }}
    date={utcDate.toLocaleString()}
    iconStyle={{ background: 'rgb(224, 128, 38)', color: '#fff' }}
    icon={<SiCodechef />}
  >
    <h3 className="vertical-timeline-element-title">{ele.name}</h3>
    <h4 className="vertical-timeline-element-subtitle">{ele.site}</h4>
    <div className="d-flex gap-2 align-items-center">
        <h4>Ends at : </h4>
        <h5>{endDate.toLocaleString()}</h5>
        </div>
   <button className='btn btn-primary'><a href={ele.url} target='_blank'> Register</a></button> 
    
  </VerticalTimelineElement>
}
else if(ele.site=='HackerRank'){
      return <VerticalTimelineElement key={idx}
  dateClassName="date"
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(58, 59, 58)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 33, 34)' }}
    date={utcDate.toLocaleString()}
    iconStyle={{ background: 'rgb(29, 231, 29)', color: '#fff' }}
    icon={<FaHackerrank />}
  >
    <h3 className="vertical-timeline-element-title">{ele.name}</h3>
    <h4 className="vertical-timeline-element-subtitle">{ele.site}</h4>
    <div className="d-flex gap-2 align-items-center">
        <h4>Ends at : </h4>
        <h5>{endDate.toLocaleString()}</h5>
        </div>
   <button className='btn btn-primary'><a href={ele.url} target='_blank'> Register</a></button> 
    
  </VerticalTimelineElement>
}
else if(ele.site=='CodeForces'){
      return <VerticalTimelineElement key={idx}
  dateClassName="date"
    className="vertical-timeline-element--work"
    contentStyle={{ background: 'rgb(58, 59, 58)', color: '#fff' }}
    contentArrowStyle={{ borderRight: '7px solid  rgb(33, 33, 34)' }}
    date={utcDate.toLocaleString()}
    iconStyle={{ background: 'rgb(29, 231, 29)', color: '#fff' }}
    icon={<SiCodeforces />}
  >
    <h3 className="vertical-timeline-element-title">{ele.name}</h3>
    <h4 className="vertical-timeline-element-subtitle">{ele.site}</h4>
    <div className="d-flex gap-2 align-items-center">
        <h4>Ends at : </h4>
        <h5>{endDate.toLocaleString()}</h5>
        </div>
   <button className='btn btn-primary'><a href={ele.url} target='_blank'> Register</a></button> 
    
  </VerticalTimelineElement>
}



    })
    
    }
</VerticalTimeline>
    </ContestContainer>



}



export default Contests