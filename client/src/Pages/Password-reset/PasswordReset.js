import axios from 'axios';
import React, { useState } from 'react'
import { Body, InputBox, Statement, Title, Wraper } from './password-reset.style';

function PasswordReset() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);


    const sendEmail = () => {

        setLoading(true);
        axios.post("/password/sendemail", ({ email: email })).then(res => {

            if (res.status === 200) {
                setLoading(false)
                setSuccess("Message has been send")
            }
        }).catch(function (error) {

            if (error.response) {
                setLoading(false)
                setError("Something went wrong")
            }
        });

    }

    if (loading) {
        return <div><h3>Loading...</h3></div>
    }
    if (error) {
        return <div><h3 style={{ color: "red" }}>{error}</h3></div>
    }

    if (success) {
        return <div><h3>{success}</h3></div>
    }

    return (
        <Body>
            <Wraper>
                <Title>
                    <h4>Forget Password ?</h4>
                </Title>
                <Statement>
                    <p>Don't wory.Give your email we will send you a reset</p>
                </Statement>
                <InputBox>
                    <input type={showPassword ? "text" : "password"} placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    {
                        showPassword ? <p onClick={() => { setShowPassword(false) }}>hide</p> : <p onClick={() => { setShowPassword(true) }}>show</p>
                    }
                    <button onClick={sendEmail}>Send Request</button>
                </InputBox>
            </Wraper>
        </Body >

    )
}

export default PasswordReset
