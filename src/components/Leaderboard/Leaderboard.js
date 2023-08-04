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
thead{
    position:sticky;
    top:0px;
}
`;


export default LeaderboardContainer