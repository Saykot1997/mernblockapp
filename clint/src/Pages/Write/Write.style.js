import styled from "styled-components";

export const Writeimgbox = styled.div`
    width: 100%;
    height: 250px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 60px;

    @media only screen and (max-width:600px){
      margin-top: 20px;
   }
    @media only screen and (max-width:400px){
     
   }
`
export const Writeimg = styled.img`
    width: 70%;
    height: 100%;
    border-radius: 10px;
    object-fit: cover;

    @media only screen and (max-width:600px){
      width: 80%;
   }
    @media only screen and (max-width:400px){
      width: 95%;
   }
`
export const Formbox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative; 
`
export const Form = styled.form`
   width: 70%;
   display: flex;
   flex-direction: column;

   @media only screen and (max-width:600px){
     width: 80%;
   }
    @media only screen and (max-width:400px){
      width: 95%;
   }
`
export const Formgroup = styled.div`
   width: 100%;
   display: ${({File})=>(File ? "flex":"block")};
   align-items: center;
`
export const Input = styled.input`
   padding: 20px;
   width: 100%;
   border: none;
   outline: none;
   font-size:25px;
   padding-left: ${({File})=>(File ? "10px" : "20px")};

   @media only screen and (max-width:600px){
      font-size:20px;
   }
    @media only screen and (max-width:400px){
      font-size:${({category})=>(category ? "18px" : "25px")};
      font-weight:${({category})=>(category ? "400" : "300")};
   }
`
export const Textarea = styled.textarea`
   padding: 20px;
   width: 100%;
   height: 400px;
   border: none;
   outline: none;
   font-size:30px;

   
   @media only screen and (max-width:600px){
      font-size:25px;
   }
    @media only screen and (max-width:400px){
      font-size:20px;
   }

`
export const Button = styled.button`
   padding: 10px 15px;
   color: #fff;
   background-color: green;
   position: absolute;
   top: 20px;
   right: 20px;
   border-radius: 10px;
   border: none;
   outline: none;
   cursor: pointer;

   @media only screen and (max-width:600px){
      padding: 10px;
   }
    @media only screen and (max-width:400px){
     
   }
`