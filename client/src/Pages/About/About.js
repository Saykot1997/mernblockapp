import { useContext } from "react"
import { Context } from "../../Context/Context"
import { Aboutcontainer, Header, Info, H2, Img, Imgbox, Databox, P } from "./About.style"

function About() {

    const { user } = useContext(Context)
    const PF = "http://localhost:5000/upload/"

    return (
        <Aboutcontainer>
            <Header>
                <H2 title>
                    About Me.
                </H2>
            </Header>
            <Info>
                <Imgbox>
                    <Img src={PF + user.profilepic} />
                </Imgbox>
                <Databox>
                    <H2>I am {user.username}</H2>
                    <P email>My email address : {user.email}</P>
                    <P>Every person has there own thinking world. <br /> That carries an especial and unique thought from others.</P>
                </Databox>
            </Info>
        </Aboutcontainer>
    )
}

export default About
