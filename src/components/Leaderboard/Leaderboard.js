import styled from 'styled-components';


const LeaderboardContainer=styled.div`
/* overflow-x: hidden; */
table,tr{
    overflow-x: scroll;
}
.body{
    font-weight: bold;
}
th{
    background-color:black;
    color:white
}
.hs{
    position:sticky;
    left:0px;
}
thead{
    position:sticky;
    top:0px;
}
.R-icon{
    cursor:pointer;
}
@media only screen and (max-width: 1050px) {
    .table-res{
    width:100vw;
    overflow-x: scroll;

}
}

`;


export default LeaderboardContainer