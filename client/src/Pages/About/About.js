import { FaFacebookSquare, FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa"
import Photo from "../../images/ProfilePhoto.jpg"
import { Aboutcontainer, Header, Info, H2, Img, Imgbox, Databox, P } from "./About.style"
import { MdEmail } from "react-icons/md"

function About() {

    const style = { color: "#444", margin: "20px 15px", fontSize: "20px", cursor: "pointer" };


    return (
        <Aboutcontainer>
            <Header>
                <H2 title>
                    About Me.
                </H2>
            </Header>
            <Info>
                <Imgbox>
                    <Img src={Photo} />
                </Imgbox>
                <Databox>
                    <H2>I am Saykot Hossain</H2>
                    <p>I am a full stack webdeveloper</p>
                    <div>
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
                        <a href="mailto:saykothossain14@gmail.com?subject=SendMail&body=Description" target="_blank" rel="noopener noreferrer">
                            <MdEmail style={style} />
                        </a>
                    </div>
                    <P>Every person has there own thinking world. <br /> That carries an especial and unique thought from others.</P>
                </Databox>
            </Info>
        </Aboutcontainer>
    )
}

export default About
