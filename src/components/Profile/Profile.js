import styled from 'styled-components'


const ProfileContainer=styled.div`

    display:flex;
    margin-top: 20px;
    justify-content: space-around;
    align-items:center;
    /* height:90vh; */
    label{
        font-weight: bold;
    }
    .user{
        margin-top: 30px;
        height:400px;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        box-shadow: 0.5px 0.5px 3px  black;
        border-radius:6px;
        padding:20px;
    }


`


export default ProfileContainer