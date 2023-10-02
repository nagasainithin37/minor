import styled from 'styled-components';

const BatchContainer=styled.div`

li{
    list-style-type: none;
}

.hs{
    position:sticky;
    left:0px;
}
.ts{
    z-index:2
}
.tbl{
    height:90vh;
    overflow: scroll;
   
}

@media only screen and (max-width: 720px) {
    .table-res{
    width:100vw;
    overflow-x: scroll;

}
}


`;


export default BatchContainer;