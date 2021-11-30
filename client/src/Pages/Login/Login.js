import { Logincontainer, Img, Loginbox, Title, Formbox, Form, Formgroup, Input, Btn, BtnReg, Navlink, P, Forget } from "./login.style"
import Image from "../../images/Log.jpg"
import { useContext, useRef } from "react"
import axios from "axios"
import { Context } from "../../Context/Context"
import { useHistory } from "react-router"

function Login() {
    const { dispatch, isFeching } = useContext(Context);
    const history = useHistory();

    const userRef = useRef()
    const passwordRef = useRef()

    const Login = async (e) => {

        e.preventDefault();
        dispatch({ type: "LOGIN_START" })

        try {
            const res = await axios.post("/auth/login", { username: userRef.current.value, password: passwordRef.current.value });
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
            res.data && history.replace('/');
        }
        catch (error) {
            dispatch({ type: "LOGIN_FAILOUR" })
            window.alert('Wrong Information');
        }
    }


    return (
        <Logincontainer>
            <Img src={Image} />
            <Loginbox>
                <Title>Login </Title>
                <Formbox>
                    <Form onSubmit={Login}>
                        <Formgroup>
                            <label htmlFor="Username">User Name Or Email</label>
                            <Input id='Username' type="text" placeholder="Your Name" ref={userRef} />
                        </Formgroup>
                        <Formgroup>
                            <label htmlFor="Password" >Password</label>
                            <Input type="password" placeholder="Your Password" id='Password' ref={passwordRef} />
                        </Formgroup>
                        <Formgroup>
                            <Btn type="submit" disabled={isFeching}>Login</Btn>
                        </Formgroup>
                        <Formgroup>
                            <P>Don't have an account?</P>
                            <Navlink to="/register"><BtnReg>Register</BtnReg></Navlink>
                        </Formgroup>
                        <Formgroup>
                            <Forget to="/PasswordReset">Forget Password ?</Forget>
                        </Formgroup>
                    </Form>
                </Formbox>
            </Loginbox>
        </Logincontainer>
    )
}

export default Login
