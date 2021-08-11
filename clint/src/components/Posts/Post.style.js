import styled from "styled-components";
import {Link} from "react-router-dom";

export const Postdiv = styled.div`
   width: 31%;
   margin-top: 30px;
   padding: 10px;

   @media only screen and (max-width:1000px){
    width: 50%;
}

@media only screen and (max-width:800px){
  width: 100%;
}
   
`;

export const Postimg = styled.img`
    width: 100%;
    height: 250px;
    border-radius: 10px;
    margin-bottom: 20px;
    cursor: pointer;
`
export const Postinfo = styled.div`
    width: 100%;
`
export const Postcatagory= styled.div`
    display: flex;
    justify-content: center;
`
export const Postcatagoryitem = styled.span`
    font-style: 18px;
    color: #444;
    margin-right: 15px;
    cursor: pointer;

`

export const Posttitle = styled.h3`
    text-align: center;
    text-transform: capitalize;
    font-size: 25px;
    margin: 15px 0;
    font-family: 'Roboto', sans-serif;
    font-weight: 500;
    cursor: pointer;
`

export const Posttime = styled.p`
    text-align: center;
    color: #666;
    margin: 15px 0;
`
export const Postdesc = styled.p`
    line-height: 26px;
    font-family: 'Roboto', sans-serif;
    color: #444;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical; 
`
export const Links = styled(Link)`
    color: #333;
    text-decoration: none;
`
