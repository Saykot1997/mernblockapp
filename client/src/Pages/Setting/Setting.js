import Sidebar from "../../components/Sidebar/Sidebar"
import { Settingcontainer, Settingupdate, Title, Updateaccount, Deleteaccount, Profrile, Ptitle, Pimg, Logobox, Formgroup, Form, Buttonbox, Button, Input, SidebarWraper } from "./Setting.style"
import { FaUserCircle } from 'react-icons/fa';
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Context } from "../../Context/Context";
import { userActions } from "../../Context/Action";
import { useHistory } from "react-router";
import { Host } from "../../Data"


function Setting() {

    const { user, dispatch } = useContext(Context);
    const PF = `${Host}/upload/`
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [profilepic, setProfilepic] = useState(null);
    const history = useHistory()

    useEffect(() => {

        setUsername(user.username);
        setEmail(user.email);

    }, [user])

    const updateUser = async (e) => {
        e.preventDefault();

        if (!profilepic && !username && !email && !password) {

            window.alert("You did not fill any fild");

        } else {

            if (profilepic) {

                const Picturedata = new FormData();
                Picturedata.append('files', profilepic);
                Picturedata.append('username', username);
                Picturedata.append('email', email);
                password && Picturedata.append('password', password);

                try {

                    const userUploadRes = await axios.post(`${Host}/users/${user._id}`, Picturedata, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': `Bearer ${user.token}`
                        }
                    });

                    setPassword("");
                    dispatch({ type: userActions.UpdateSuccess, payload: userUploadRes.data });
                    window.alert("Update Success");

                } catch (err) {

                    dispatch({ type: userActions.UpdateFailour })
                    window.alert("User can't upnate!!!! ")
                }

            } else {

                try {

                    const updateAbleUser = {
                        username,
                        email,
                    }

                    password && (updateAbleUser.password = password);

                    const userUploadRes = await axios.post(`${Host}/users/${user._id}`, updateAbleUser, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${user.token}`
                        }
                    });

                    setPassword("");
                    dispatch({ type: userActions.UpdateSuccess, payload: userUploadRes.data });
                    window.alert("User updated successfully");

                } catch (err) {

                    dispatch({ type: userActions.UpdateFailour })
                    window.alert("User can't upnate!!!! ")
                }

            }
        };

    };

    const deleteUser = async () => {

        try {
            const res = await axios.delete(`${Host}/users/${user._id}`, {
                headers: {
                    'Authorization': `Bearer ${user.token}`
                }
            })
            res && history.replace("/register");
            res && dispatch({ type: "LOGOUT" })

        } catch (error) {

            dispatch({ type: "UPDATE_FAILOUR " })
        }

    }


    return (
        <Settingcontainer>
            <Settingupdate>
                <Title>
                    <Updateaccount>Update Your Account</Updateaccount>
                    < Deleteaccount onClick={deleteUser}>Delete Account</ Deleteaccount>
                </Title>
                <Profrile>
                    <Ptitle>Profile Picture</Ptitle>
                    <Logobox>
                        <Pimg src={profilepic ? URL.createObjectURL(profilepic) : PF + user.profilepic} />
                        <label htmlFor="File"><FaUserCircle style={{ fontSize: "30px", color: "pink", cursor: "pointer", marginLeft: "10px" }} /></label>
                        <Input type="file" id="File" style={{ display: "none" }} onChange={e => setProfilepic(e.target.files[0])} />
                    </Logobox>
                </Profrile>
                <Form>
                    <Formgroup>
                        <label htmlFor="Name">Youe Name</label>
                        <Input type="text" value={username} id="Name" onChange={(e) => { setUsername(e.target.value) }} />
                    </Formgroup>
                    <Formgroup>
                        <label htmlFor="Email">Your Email</label>
                        <Input type="email" value={email} id="Email" onChange={(e) => { setEmail(e.target.value) }} />
                    </Formgroup>
                    <Formgroup>
                        <label htmlFor="Passward">Passward</label>
                        <Input type="password" placeholder="Your Passward" id="Passward" value={password} onChange={(e) => { setPassword(e.target.value) }} />
                    </Formgroup>
                    <Buttonbox Button>
                        <Button onClick={updateUser}>Submit</Button>
                    </Buttonbox>
                </Form>
            </Settingupdate>
            <SidebarWraper>
                <Sidebar />
            </SidebarWraper>
        </Settingcontainer>
    )
}

export default Setting
