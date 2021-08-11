import styled from "styled-components";


export const Settingcontainer = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    overflow-x: hidden;
`

export const Settingupdate = styled.div`
    width: 70%;
    padding: 20px;

    @media only screen and (max-width:600px){
     width: 100%;
   }
    @media only screen and (max-width:400px){
      
   }
`

export const SidebarWraper = styled.div`
   width: 30%;

   @media only screen and (max-width:600px){
     width: 100%;
     margin-left: -20px;
   }
    @media only screen and (max-width:400px){
     
   }
`
export const Title = styled.div`
    width: 100%;
    justify-content: space-between;
    display: flex;
    
`

export const Updateaccount = styled.h3`
  font-size: 30px;
  font-weight: 600;
  color: darkgreen;
  /* width: 50%; */
  cursor: pointer;
  display: inline-block;

  @media only screen and (max-width:600px){
    font-size: 18px;
   }
`
export const Deleteaccount = styled.h4`
    font-size: 16px;
    font-weight: 400;
    color: red;
    /* width: 50%; */
    text-align: right;
    cursor: pointer;
    display: inline-block;

`
export const Profrile = styled.div`
    width: 100%;
    margin-top: 30px;
`
export const Ptitle = styled.h4`
    font-size: 20px;
    font-weight: 400;
    margin-bottom: 10px;
`
export const Pimg = styled.img`
    width: 80px;
    height: 80px;
    border-radius: 5px;
`
export const Logobox = styled.form`
  display: flex;
  align-items: center;
`
export const Form = styled.form`
    width: 100%;
    margin-top: 20px;
`

export const Formgroup = styled.div`
   width: 100%;
   display: flex;
   flex-direction: column;
   margin-top: 30px;
`
export const Buttonbox = styled.div`
   width: 100%;
   display: flex;
   align-items: center;
   justify-content: center;
   margin-top: 20px;
`
export const Button = styled.button`
  padding: 10px 15px;
  color: #fff;
  background-color: green;
  border-radius: 5px;
  border: none;
  outline:none;
  width: 100px;
  cursor: pointer;
`
export const Input = styled.input`
   width: 100%;
   padding:20px 20px 10px 0;
   border: none;
   outline: none;
   border-bottom: 1px solid #444;
`


