import styled from 'styled-components'


const ProfileContainer=styled.div`
    display:flex;
    padding-top: 20px;
    justify-content: space-around;
    align-items:center;
    /* height:90vh; */
    label{
        font-weight: bold;
    }
    .user{
        background-color: white;
        margin-top: 30px;
        height:400px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-shadow: 0.5px 0.5px 3px  black;
        
        border-radius:6px;
        padding:20px;
    }
@media only screen and (max-width: 720px) {
   .fc{
    flex-direction: column;
    
   }

   .one{
    margin-top:200px;
   }

   .user{
    overflow: scroll;
    padding:50px;
    margin-top:0px;
    height:100vh;
   }
   /* margin-top: 100px; */
}

`


export default ProfileContainer