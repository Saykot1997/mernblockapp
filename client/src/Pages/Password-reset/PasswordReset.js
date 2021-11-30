import axios from 'axios';
import React, { useState } from 'react'

function PasswordReset() {

    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);


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
        <div>
            <h1>Password Reset</h1>
            <input type="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }} />
            <button onClick={sendEmail}>Reset</button>
        </div>
    )
}

export default PasswordReset
