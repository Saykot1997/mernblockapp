import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaTimes } from 'react-icons/fa';


export const Singlepostcontainer = styled.div`
    width: 100%;  
    padding: 10px 20px; 
`

export const IMGBOX = styled.div`
  width: 100%;
 
`
export const POSTINFOBOX = styled.div`
   width: 100%;
`
export const INPUTWRAPER = styled.div`
  width: 100%;
`
export const TITLEWREPER = styled.div`
  width: 100%;
`

export const SPimg = styled.img`
   width: 100%;
   height: 300px;
   object-fit: cover;
   border-radius: 10px;
`

export const Singleposttitle = styled.p`
    text-align: center;
    font-weight: 600;
    font-size: 28px;
    margin-top: 20px;
    text-transform: capitalize;

`
export const Iconbox = styled.div`
    margin-top: 20px;
    text-align: right;
    display: ${({ updatemode }) => (updatemode ? "none" : "block")};

    @media only screen and (max-width:600px){
     margin-top: 20px;
    }

`

export const SPinfo = styled.div`
   display: flex;
   justify-content: space-between;
   margin-top: 30px;

   display: ${({ updatemode }) => (updatemode ? "none" : "flex")};
`
export const SPauthor = styled.p`
   font-size: 18px;
   color: #444;
`
export const SPtime = styled.p`
    font-size: 18px;
    color: #444;
`
export const SPdec = styled.p`
    font-size: 18px;
    color: #444;
    line-height: 26px;
    margin-top: 30px;
    text-transform: capitalize;

    &::first-letter{
      font-size: 32px;
      margin-left: 20px;
      font-weight: 600;
    }
`
export const Links = styled(Link)`
    color: #333;
    text-decoration: none;
    font-weight: bold;
`
export const Input = styled.input`
   padding: 20px;
   width: 100%;
   border: none;
   outline: none;
   font-size:25px;
   padding-left: ${({ File }) => (File ? "10px" : "20px")};

   @media only screen and (max-width:600px){
      font-size: 22px;
    }

    @media only screen and (max-width:400px){
      font-size: 20px;
    }
`
export const Textarea = styled.textarea`
   padding: 20px;
   width: 100%;
   border: none;
   outline: none;
   font-size:30px;

   
   @media only screen and (max-width:600px){
      font-size: 25px;
    }

    @media only screen and (max-width:400px){
      font-size: 22px;
    }
`
export const UpdateBtn = styled.button`
   padding: 10px 20px;
   background-color: darkgreen;
   color: white;
   width: 100%;
   margin-top: 20px;
   border-radius: 10px;
   cursor: pointer;
`
export const CloseUpdateMode = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-end;
   
`
export const CloseTheMode = styled(FaTimes)`
  color: red;
  font-size: 20px;
  cursor: pointer;
 
`
export const Span = styled.span`
    color: red;
    text-align: center;
    font-size: 20px;
    margin-top: 20px;
    text-transform: lowercase;
    display: inline-block;
    height: 30px;
    width: 30px;
    border-radius: 50%;
    background-color: yellow;
   
`
export const CommentsBox = styled.div`
    width: 100%;
    margin-top: 20px;
    input{
      padding: 10px;
      margin-right: 10px;
    }
    button{
      padding: 10px 30px;
      text-transform: uppercase;
      font-weight: 600;
      background-color: green;
      color: wheat;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
   
`
export const CommentBox = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 10px 0;
    display: grid;
    align-items: center;
    grid-template-columns: 1fr 4fr 1fr;
    box-shadow: 0 0 3px rgba(0,0,0,.3);
   div{
      width: 100%;
      padding: 5px 10px;
      p{
        margin: 5px 0;
        text-transform: capitalize;
      }

      img{
        width: 60px;
        border-radius: 50%;
      }
      button{
        padding: 5px 10px;
        margin: 5px;
      }
      input{
        padding: 10px;
        width: 100%;
      }
   }
   
`