import { Navbar, Navleft, Navright, Navcenter, Navmenu, Navmenuitems, Navlink, Img, ToggleButton, CloseMenu, Logo } from "./Topbar.styled"
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import { Host } from "../../Data"


export default function Topbar() {

    const [small, setSmall] = useState(false)

    const PF = `${Host}/upload/`
    const { user, dispatch } = useContext(Context);

    const Logout = () => {
        dispatch({ type: "LOGOUT" })
    }

    const menutoggle = () => {
        setSmall(!small)
    }

    return (
        <Navbar>
            <Navleft>
                <Logo to="/"> Saykot</Logo>
            </Navleft>
            <Navcenter small={small}>
                <Navmenu onClick={menutoggle} >
                    <Navmenuitems>
                        <Navlink to="/" small={small}>Home</Navlink>
                    </Navmenuitems>
                    <Navmenuitems>
                        <Navlink to="/about" small={small}>About</Navlink>
                    </Navmenuitems>
                    <Navmenuitems>
                        <Navlink to="/write" small={small}>Write</Navlink>
                    </Navmenuitems>
                    <Navmenuitems>
                        <Navlink to="/login" small={small} onClick={Logout}>{user && "Logout"}</Navlink>
                    </Navmenuitems>
                </Navmenu>
            </Navcenter>
            <Navright>
                <Navlink to="/setting" main> {user ? (<Img src={PF + user.profilepic} alt="user" />) : <> <Navlink to="/login" login>Login</Navlink> <Navlink to="/register" register >Register</Navlink> </>} </Navlink>
                {small ? <CloseMenu onClick={menutoggle} /> : <ToggleButton onClick={menutoggle} />}
            </Navright>
        </Navbar>
    )
}

