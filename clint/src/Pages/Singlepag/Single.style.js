import styled from "styled-components";

export const Singlecontainer = styled.div`
   width: 100%;
   display: flex;
   flex-wrap: wrap;
   overflow-x: hidden;
   
`

export const SinglePostWraper = styled.div`
   width: 70%;

   @media only screen and (max-width:600px){
    width: 100%;
  }

`
export const SidebarWraper = styled.div`
   width: 30%;

   @media only screen and (max-width:600px){
    width: 100%;
    margin-left: -20px;
  }

`