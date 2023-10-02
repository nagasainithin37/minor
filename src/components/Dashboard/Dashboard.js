import styled from 'styled-components';

const DashboardContainer=styled.div`
display:flex;
justify-content:space-around;
align-items: center;
flex-wrap:wrap-reverse;
gap:30px;
.fw{
    flex-wrap: wrap;
}
.chart{
    width:300px;
    height:300px
}
`;


export default DashboardContainer