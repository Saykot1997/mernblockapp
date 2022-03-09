import { Regcontainer, Img, Regbox, Title, Formbox, Form, Formgroup, Input, Btn, BtnReg, Label, Navlink, P } from "./Register.style"
import Image from "../../images/reg.jpg"
import { useState } from "react"
import axios from "axios"
import { useHistory } from "react-router";
import { Host } from "../../Data"

function Register() {

    const [username, setUsername] = useState("")
    const [useremail, setEmail] = useState("")
    const [userpassword, setPassword] = useState("")
    const [error, setError] = useState("");
    const history = useHistory();


    const registration = async (e) => {

        setError("")

        if (username === "" || useremail === "" || userpassword === "") {

            window.alert("please fill all the fields");

        } else {

            try {

                e.preventDefault()
                const res = await axios.post(`${Host}/auth/register`, { username: username, email: useremail, password: userpassword })
                res.data && history.replace("/login")
                setError(false)

            } catch (err) {

                if (err.response.data === "Username already exist") {

                    setError(err.response.data);

                } else if (err.response.data === "Email already exist") {

                    setError(err.response.data);

                } else if (err.response.data === "Username and Email already exist") {

                    setError(err.response.data);

                } else {

                    console.log(err)
                }

            }
        }
    }

    return (
        <Regcontainer>
            <Img src={Image} />
            <Regbox>
                <Title>Register </Title>
                <Formbox>
                    <Form onSubmit={registration}>
                        <Formgroup>
                            <Label htmlFor="Name">Name</Label>
                            <Input id='Name' type="text" placeholder="Your Name" onChange={(e) => { setUsername(e.target.value) }} />
                        </Formgroup>
                        <Formgroup>
                            <Label htmlFor="Email">Email</Label>
                            <Input id='Email' type="text" placeholder="Your Email" onChange={(e) => { setEmail(e.target.value) }} />
                        </Formgroup>
                        <Formgroup>
                            <Label htmlFor="Password" >Password</Label>
                            <Input type="password" placeholder="Your Password" id='Password' onChange={(e) => { setPassword(e.target.value) }} />
                        </Formgroup>
                        <Formgroup>
                            <Btn type="submit">Register</Btn>
                        </Formgroup>
                        <Formgroup>
                            <P>Already have an account?</P>
                            <Navlink to="/login"><BtnReg>Login</BtnReg></Navlink>
                        </Formgroup>
                        {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}
                    </Form>
                </Formbox>
            </Regbox>
        </Regcontainer>
    )
}

export default Register
