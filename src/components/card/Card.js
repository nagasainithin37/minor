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
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    color:blue;
    text-shadow: 0.1px 0.1px 1.2px #d50000;
}

.main{
    font-weight: bolder;
    font-size:17px;
    font-style: oblique;
    font-family: Verdana, Geneva, Tahoma, sans-serif;

}

.display-6{
    text-shadow:4px 0px 10px #6f6868 ;
}

`

export default CardContainer