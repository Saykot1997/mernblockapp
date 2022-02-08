import { Logincontainer, Img, Loginbox, Title, Formbox, Form, Formgroup, Input, Btn, BtnReg, Navlink, P, Forget } from "./login.style"
import Image from "../../images/Log.jpg"
import { useContext, useRef } from "react"
import axios from "axios"
import { Context } from "../../Context/Context"
import { useHistory } from "react-router";
import { Host } from "../../Data";

function Login() {
    const { dispatch, isFeching } = useContext(Context);
    const history = useHistory();

    const userRef = useRef()
    const passwordRef = useRef()

    const Login = async (e) => {

        e.preventDefault();

        if (userRef.current.value === "" || passwordRef.current.value === "") {

            alert("please fill all the fields");

        } else {

            dispatch({ type: "LOGIN_START" })

            try {
                const data = {
                    username: userRef.current.value,
                    password: passwordRef.current.value
                }
                console.log(data)
                const res = await axios.post(`${Host}/auth/login`, data);
                dispatch({ type: "LOGIN_SUCCESS", payload: res.data })
                res.data && history.replace('/');
            }
            catch (error) {

                console.log(error)
                dispatch({ type: "LOGIN_FAILOUR" })
                window.alert('Wrong Information');
            }
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
                            <Input id='Username' type="text" placeholder="User name or email address" ref={userRef} />
                        </Formgroup>
                        <Formgroup>
                            <label htmlFor="Password" >Password</label>
                            <Input type="password" placeholder="Password" id='Password' ref={passwordRef} />
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
