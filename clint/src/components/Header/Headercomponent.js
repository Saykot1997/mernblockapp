import Heroimage from "../../images/bg.jpg"
import { Headerbox,Titlebox,Title,Subtitle,Heroimg } from './Headercomponent.style'

function Headercomponent () {
    return (
        <Headerbox>
                <Titlebox>
                    <Title>React & Node</Title>
                    <Subtitle>Blog</Subtitle>
                </Titlebox>
               <Heroimg src={Heroimage} alt="" />
       </Headerbox>
    )
}

export default Headercomponent
