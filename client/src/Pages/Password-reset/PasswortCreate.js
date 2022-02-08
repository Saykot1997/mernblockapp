import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Context } from "../../Context/Context"
import { useHistory, useLocation } from 'react-router';
import { userActions } from "../../Context/Action";
import { Body, Error, InputBox, Title, Wraper } from './password-reset.style';
import { Host } from "../../Data";

function PasswortCreate() {

    const [password, setPassword] = useState('');
    const [passwordRepeat, setPasswordRepeat] = useState('');
    const location = useLocation();
    const history = useHistory();
    const { dispatch } = useContext(Context);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

    const GetParams = (quiry) => {

        if (quiry) {
            const quiryString = quiry.split("?")[1];
            if (quiryString.length > 0) {
                const params = quiryString.split("&");
                const paramObj = {};
                params.forEach(element => {
                    const keyValue = element.split("=");
                    paramObj[keyValue[0]] = keyValue[1];
                });

                return paramObj
            }

        }

        return {};
    }

    const params = GetParams(location.search);

    const CreateNewPassword = async () => {

        if (password && passwordRepeat) {

            if (password === passwordRepeat) {

                const tokenData = {
                    token: params.token,
                    userId: params.id,
                    password: password
                }

                try {
                    setLoading(true);
                    const res = await axios.post(`${Host}/password/create-password`, tokenData);
                    dispatch({ type: userActions.UpdateSuccess, payload: res.data });
                    res.data && history.replace('/');
                }
                catch (error) {

                    setLoading(false);
                    setError(error.response.data);
                }

            } else {

                alert("Password dosenot match !!!");
            }

        } else {

            alert("Fill all fields");
        }
    }


    if (loading) {
        return <div><h3 style={{ marginTop: "20px", textAlign: "center" }}>Loading...</h3></div>
    }
    if (error) {

        return <div><h3 style={{ color: "red", marginTop: "20px", textAlign: "center" }}>{error}</h3></div>
    }

    return (
        <Body>
            <Wraper>
                <Title>
                    <h4>PasswortCreate</h4>
                </Title>
                <InputBox>
                    <input type={showPassword ? "text" : "password"} placeholder="New Password" onChange={(e) => { setPassword(e.target.value) }} />
                    {
                        showPassword ? <p onClick={() => { setShowPassword(false) }}>hide</p> : <p onClick={() => { setShowPassword(true) }}>show</p>
                    }
                </InputBox>
                <InputBox>
                    <input type={showPasswordRepeat ? "text" : "password"} placeholder="Confirm Password" onChange={(e) => { setPasswordRepeat(e.target.value) }} />
                    {
                        showPasswordRepeat ? <p onClick={() => { setShowPasswordRepeat(false) }}>hide</p> : <p onClick={() => { setShowPasswordRepeat(true) }}>show</p>
                    }
                    <button onClick={CreateNewPassword}>Create</button>
                </InputBox>
                <Error>{error}</Error>
            </Wraper>
        </Body>

    )
}

export default PasswortCreate
