import styled from "styled-components";
import {Link} from "react-router-dom";
import {FaAlignJustify} from "react-icons/fa"
import { FaTimes } from 'react-icons/fa';

export const Navbar = styled.nav`
    width: 100%;
    height: 60px;
    background-color: white;
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    padding:20px;
    z-index: 999;
    position: relative;
    transition: 0.5s ease;

`;

export const Navleft = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width:600px){
        position: absolute;
        left: 0;
        top: 0;
        height: 60px;
        width: 50%;
        justify-content: flex-start;
        padding: 0 10px;
    }
    @media only screen and (max-width:400px){
        width: 30%;
    }
    
`
export const Navright = styled.div`
    flex: 3;
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width:600px){
        position: absolute;
        right: 0;
        top: 0;
        height: 60px;
        width: 50%;
        justify-content: flex-end;
        padding: 0 10px;
    }
    @media only screen and (max-width:400px){
        width: 70%;
    }
    
`

export const Navcenter = styled.div`
    flex: 6;
    display: flex;
    align-items: center;
    justify-content: center;
    

    @media only screen and (max-width:600px){
        background-color: black;
        color: white;
        height: 100vh;
        width: 100%;
        position: absolute;
        top: ${({small})=>(small ? 0 : "-1000px")};
        right: 0;
        z-index: 1000;
        align-items: flex-start;
        transition: 0.5s ease;
   
    }
`
export const Navmenu = styled.ul`
    display: flex;
    align-items: center;
    justify-content: center;

    @media only screen and (max-width:600px){
        flex-direction: column;
    }

`

export const Navmenuitems = styled.li`
    margin-right: 20px;
    font-size: 18px;
    list-style: none;
    font-weight: 300;
    
    @media only screen and (max-width:800px){
        margin-right: 18px;
        font-size: 16px;
    }
    @media only screen and (max-width:600px){
        margin-top: 60px;
    }
`
export const Navlink = styled(Link)`
    text-decoration: none;
    color: #444;
    text-transform: uppercase;
    font-weight: 300;
    font-family: 'Josefin Sans', sans-serif;

    @media only screen and (max-width:600px){
        font-weight: 500;
        color: ${({small})=>small ? "#fff" : "black" };
        font-size:${({small})=>small ? "20px" : "14px" } ;
        margin-right: ${({small})=>small ? "0" : "20px" } ;
        display: ${({main})=>(main? "flex": "block")};
        justify-content:${({main})=>(main? "flex-end": "flex-start")};
        width: ${({main})=>(main? "80%": "100%")};

    }
    @media only screen and (max-width:400px){
        font-weight: 500;
        color: ${({small})=>small ? "#fff" : "black" };
        font-size:${({small})=>small ? "16px" : "14px" } ;
        display: ${({main})=>(main? "flex": "block")};
    }
`
export const Img =styled.img`
   width: 40px;
   height: 40px;
   border-radius: 50%;
   margin-right: 20px;

   @media only screen and (max-width:600px){
      margin: 0;
   }
`
export const ToggleButton = styled(FaAlignJustify)`
    cursor: pointer;
    font-size: 20px;
    display: none;
    
      @media only screen and (max-width:600px){
     display: block;
     width: 20%;
   }
    @media only screen and (max-width:400px){
     display: block;
   }
`
export const CloseMenu = styled(FaTimes)`
   color: white;
   font-size: 25px;
   cursor: pointer;
   z-index: 10000;

`
export const Logo = styled(Link)`
  color:  black;
  font-weight: 500;
  font-size: 24px;
  text-decoration: none;

  @media only screen and (max-width:600px){
    font-size: 22px; 
   }
  @media only screen and (max-width:400px){
    font-size: 20px; 
   }
`