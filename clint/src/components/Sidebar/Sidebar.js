import { useState,useEffect } from "react";
import { Sidebarcontainer,SidebarItems,Title,Img,Desc,Sidelist,Sidelistitems,Socallinks,Links} from "./Sidebar.style"
import { FaFacebookSquare,FaTwitterSquare,FaPinterestSquare,FaInstagramSquare } from 'react-icons/fa';
import logo from '../../images/What_is_your_story.jpg'
import axios from "axios";

function Sidebar() {

   const style = { color: "#444", margin:"20px 15px", fontSize:"20px", cursor: "pointer"};

   const [cats, setcats] = useState([]);

   useEffect(()=>{
    axios.get("/category")
    .then((res)=>{setcats(res.data)})
    .catch((err)=>{new console.error(err);});

   },[])

    return (
        <Sidebarcontainer>
            <SidebarItems>
                <Title>about the site</Title>
                <Img src={logo} />
                <Desc>Tell us your story.We and many others are here to listen your untold story that maybe the best insident in your life.Many others also share there story and you can also read there too.</Desc>
            </SidebarItems>
            <SidebarItems>
                <Title>catagoties</Title>

                <Sidelist>
                    {cats.map((c)=>(
                        <Sidelistitems key={c._id} ><Links to={`/?cat=${c.name}`}> {c.name}</Links></Sidelistitems>
                    ))}
                </Sidelist>
            </SidebarItems>
            <SidebarItems>
                <Title>folow us</Title>
                <Socallinks>
                   <Links facebook to={`https://www.facebook.com/saykot.hossain.1/`}><FaFacebookSquare style={style} /> </Links>  
                    <FaTwitterSquare style={style} />
                    <FaPinterestSquare style={style} />
                    <FaInstagramSquare style={style} />
                </Socallinks> 
            </SidebarItems>
        </Sidebarcontainer>
    )
}

export default Sidebar
