import styled from 'styled-components';
const CardContainer=styled.div`

width:300px;
height:180px;
padding:15px;
display:flex;
flex-direction: column;
justify-content:space-around;
box-shadow: 0px 0px 4px 0.5px #bbb2b2;
border-radius: 5px;
.side{
    font-weight:bold;
    font-size: 18px;
    font-style: italic;
   
    color:#9c27b0;
    
}

.main{
    font-weight: bolder;
    font-size:17px;
    font-style: oblique;
    font-family: Verdana, Geneva, Tahoma, sans-serif;

}

.display-6{
    font-weight: 700;
}

`

export default CardContainer