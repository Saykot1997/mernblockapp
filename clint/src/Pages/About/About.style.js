import styled from "styled-components";

export const Aboutcontainer = styled.div`
    width: 100%;
    height:100vh;
    margin-top: 40px;
`
export const Header = styled.div`
    width: 100%;
`
export const Info = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
`
export const H2 = styled.h2`
    font-size:${({title})=>(title ? "30px":"25px")};
    font-weight: ${({title})=>(title ? 500:400)};
    text-align: ${({title})=>(title ? "center":"left")};
    margin-bottom:${({title})=>(title ? "20px":"10px")} ;
`
export const P = styled.p`
    font-style: ${({email})=>(email ? "18px":"16px")};
    margin:${({email})=>(email ? "20px 0":0)};
    font-weight: ${({email})=>(email ? 500:400)};
`
export const Imgbox = styled.div`
    width: 40%;
    padding: 20px;

    @media only screen and (max-width:600px){
       width: 100%;
    }

`
export const Databox = styled.div`
    width: 60%;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media only screen and (max-width:600px){
       width: 100%;
    }

`
export const Img = styled.img`
    width: 100%;
    border-radius: 10px;
`