import styled from "styled-components";
import { Link } from "react-router-dom";

export const Regcontainer = styled.div`
    width: 100%;
    height: 100vh;
    position: relative;
`;
export const Img = styled.img`
   width: 100%;
   height: 100%;
   object-fit: cover;
`
export const Regbox = styled.div`
   display: flex;
   flex-direction: column;
   position: absolute;
   height: 100%;
   width: 100%;
   top: 0;
   left: 0;
   background: linear-gradient(rgba(0,0,0,0.1),rgba(0,0,0,0.2));
`
export const Title = styled.h2`
    text-align: center;
    margin-top: 60px;
    font-weight: 400;
    font-size: 60px;
    color: #fff;

    @media only screen and (max-width:400px){
      font-weight: 300;
      font-size: 30px;
      margin-top: 20px;
    }

`
export const Formbox = styled.div`
   width:100% ;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 30px;

`
export const Form = styled.form`
  max-width: 400px;
  width: 80%;

  @media only screen and (max-width:400px){
     width: 80%;
  }
`
export const Formgroup = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
`
export const Label = styled.label`

 color: #fff;
`
export const Input = styled.input`
   width: 100%;
   padding: 10px;
   border: none;
   outline: none;
   margin: 10px 0;
`;

export const Btn = styled.button`
  padding: 10px 20px;
  color: white;
  background-color:darkblue;
  border: none;
  outline: none;
  margin-top: 20px;
  border-radius: 10px;
  cursor: pointer;
`
export const BtnReg = styled.button`
  padding: 10px 20px;
  color: white;
  background-color:darkgreen;
  border: none;
  outline: none;
  border-radius: 10px;
  cursor: pointer;
  position: absolute;
  top: 20px;
  right: 20px;

  @media only screen and (max-width:400px){
     position: static;
     margin-top: 15px;
     width: 100%;
  }
`
export const Navlink = styled(Link)`
   color: #fff;
   text-decoration: none;
`
export const P = styled.p`
  color: red;
  margin-top: 15px;
  text-align: center;
  font-size: 14px;
  display: none;
  @media only screen and (max-width:400px){
    display: block;
  }
`