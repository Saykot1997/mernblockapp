
import styled from "styled-components";

export const Container = styled.div`
   display: flex;
   width: 100%;
   flex-wrap: wrap;
`;

export const PostWraper = styled.div`
  width  : 70%;


  @media only screen and (max-width:600px){
   width: 100%;
}

@media only screen and (max-width:400px){
  
}

`;

export const SideWraper = styled.div`
  width  : 30%;

  @media only screen and (max-width:600px){
    width: 100%;
  }

@media only screen and (max-width:400px){
  
}
`