import axios from 'axios';
import React, { useState } from 'react'
import { Body, InputBox, Statement, Title, Wraper } from './password-reset.style';
import { Host } from "../../Data";

function PasswordReset() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);



    const sendEmail = () => {

        setLoading(true);
        axios.post(`${Host}/password/sendemail`, ({ email: email })).then(res => {

            if (res.status === 200) {
                setLoading(false)
                setSuccess("Message has been send. Please check your email");
            }
        }).catch(function (error) {

            if (error.response.data === "User not found") {
                setLoading(false);
                setError("User not found.Enter correct email");
            } else {
                setLoading(false);
                setError("Server Error");
            }
        });

    }

    if (loading) {
        return <div><h3 style={{ marginTop: "20px", textAlign: "center" }}>Loading...</h3></div>
    }
    if (error) {
        return <div><h3 style={{ color: "red", marginTop: "20px", textAlign: "center" }}>{error}</h3></div>
    }

    if (success) {
        return <div><h3 style={{ marginTop: "20px", textAlign: "center" }}>{success}</h3></div>
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
                    <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    <button onClick={sendEmail}>Send Request</button>
                </InputBox>
            </Wraper>
        </Body >

    )
}

export default PasswordReset
