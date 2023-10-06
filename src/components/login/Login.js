import styled from 'styled-components';
const LoginContainer=styled.div`
display:flex;
justify-content: space-around;
align-items: center;
/* height:100vh; */
height:100vh!important;
color:#cfc8c2;
background-color:white ;
.login{
    padding:50px 30px;
    border-radius: 5px;
    box-shadow: 2px 3px 9px 0px black;
    background-image: linear-gradient(134deg, #494545, #000000);

}
label{
    color:white;
    font-weight: bold;
    font-size: 20px;
    font-style: italic;
    margin-bottom: 5px;
}



@media only screen and (max-width: 1050px) {
  img,.img{
        display:none;
    }

    body{
        display:flex;
        align-items: center;
        
        justify-content: center;
    }
    .login{
    
    }
}



`;



export default LoginContainer;