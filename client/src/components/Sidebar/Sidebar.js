import { useState, useEffect } from "react";
import { Sidebarcontainer, SidebarItems, Title, Img, Desc, Sidelist, Sidelistitems, Socallinks, Links } from "./Sidebar.style"
import { FaFacebookSquare, FaGithub, FaLinkedin, FaWhatsapp } from 'react-icons/fa';
import logo from '../../images/What_is_your_story.jpg'
import axios from "axios";
import { Host } from "../../Data";

function Sidebar() {

    const style = { color: "#444", margin: "20px 15px", fontSize: "20px", cursor: "pointer" };

    const [cats, setcats] = useState([]);

    useEffect(() => {

        const getCatetories = async () => {
            const res = await axios.get(`${Host}/category/getAllCategories`);
            setcats(res.data);
        }

        getCatetories();

    }, [])

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
                    {cats.map((c) => (
                        <Sidelistitems key={c._id} ><Links to={`/?cat=${c}`}> {c}</Links></Sidelistitems>
                    ))}
                </Sidelist>
            </SidebarItems>
            <SidebarItems>
                <Title>contact Me</Title>
                <Socallinks>
                    <a href="https://www.facebook.com/saykot.hossain.1/" target="_blank" without rel="noreferrer">
                        <FaFacebookSquare style={style} />
                    </a>
                    <a href="https://github.com/Saykot1997" target="_blank" without rel="noreferrer">
                        <FaGithub style={style} />
                    </a>
                    <a href="https://www.linkedin.com/in/shohel-mia-6b31b9216/" target="_blank" without rel="noreferrer">

                        <FaLinkedin style={style} />
                    </a>
                    <a href={`https://wa.me/+8801838652572`} target="_blank" rel="noopener noreferrer">
                        <FaWhatsapp style={style} />
                    </a>
                </Socallinks>
            </SidebarItems>
        </Sidebarcontainer>
    )
}

export default Sidebar
