import styled from "styled-components";
import { Link } from "react-router-dom";

export const Sidebarcontainer = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   margin: 20px;
   background-color: #fdfbfb;

`

export const SidebarItems = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   align-items: center;
   justify-content: center;
   padding: 20px;
`
export const Title = styled.span`
   display: block;
   width: 80%;
   padding: 10px;
   text-align: center;
   text-transform: uppercase;
   font-size: 16px;
   font-weight: 600;
   border-top: 1px solid #666;
   border-bottom: 1px solid #666;
   font-family: 'Noto Sans TC', sans-serif;
`

export const Desc = styled.p`
   font-size: 16px;
   color: #444;
   margin-top: 20px;
   width: 70%;
   text-align: center;
   font-weight: 500;
   font-family: 'Roboto', sans-serif;

`
export const Img = styled.img`
    width: 80%;
    border-radius: 10px;
    margin-top: 20px;
`
export const Sidelist = styled.ul`
    list-style-type: none;
    width: 100%;
`
export const Sidelistitems = styled.li`
    font-size: 18px;
    text-align: center;
    margin-top: 20px;
    font-family: 'Roboto', sans-serif;
`

export const Socallinks = styled.div`
  display: flex;
`
export const Links = styled(Link)`
   color: ${({facebook})=>(facebook ? "#444" : "#333")};
   text-decoration: none;
   
`