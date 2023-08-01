import styled from 'styled-components';

const LoginContainer=styled.div`
display:flex;
justify-content: space-around;
align-items: center;
/* height:100vh; */
color:#cfc8c2;
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


`;



export default LoginContainer;