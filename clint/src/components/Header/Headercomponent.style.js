import styled from "styled-components";


export const Headerbox = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;

`

export const Titlebox = styled.div`
    text-align: center;
    position: absolute;
    top: 80px;
    left: 50%;
    color: #444;
    transform: translateX(-50%);
    font-family: 'Lora', serif;
    font-weight: 400;
    font-style: italic;

    
`
export const Title = styled.h3`
    font-size: 18px;
    margin-top: 10px;  
    font-weight:400 ;
`
export const Subtitle = styled.h3`
    font-size: 100px;
    margin-top: 10px;
    font-weight: 400;

    @media only screen and (max-width:600px){
        font-size: 80px;
   }
   @media only screen and (max-width:400px){
        font-size: 50px;
   }
    
`
export const Heroimg = styled.img`
    width: 100%;
    margin-top: 8%;
    height: 550px;
    object-fit: cover;
`
