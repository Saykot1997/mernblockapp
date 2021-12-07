import styled from 'styled-components';

import Img from '../../images/1.jpeg';

export const Body = styled.div`
    display: flex;
    justify-content: center;
    background-image: url(${Img});
    background-position: center;
    background-size: cover;
    width: 100%;
    height:calc(100vh - 60px);
    
`
export const Wraper = styled.div`
   margin-top: 40px;
   height: 400px;
   width: 500px;
   padding: 20px;
   background: rgba(0,0,0,0.3);
   box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.75);
`
export const Title = styled.div`
    font-size: 26px;
    color: #fff;
    text-align: center;
    margin-bottom: 20px;
`
export const Statement = styled.div`
    font-size: 17px;
    color: #fff;
    text-align: center;
`
export const InputBox = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    position: relative;
    
    p{
       position: absolute;
       top: 8px;
       right: 10px;
       color: #fff;
       cursor: pointer;
    }

    input{
        width: 100%;
        padding: 10px 20px;
        border: none;
        border-bottom: 1px solid #fff;
        margin-bottom: 10px;
        background: transparent;
        color: #fff;
        font-size: 18px;
        ::placeholder{
            color: #fff;
            font-size: 16px;
        }
        :focus{
            outline: none;
            border: 1px solid #fff;
        } 
        
    }

    button{
        width: 100%;
        padding: 5px 10px;
        border: none;
        margin-top: 20px;
        background: #fff;
        color: #000;
        font-size: 16px;
        transition: all 0.3s ease;
        cursor: pointer;
        :hover{
            background: #000;
            color: #fff;
        }
    }
`;

export const Error = styled.div`
    font-size: 16px;
    color: red;
    text-align: center;
    margin-top: 10px;
`