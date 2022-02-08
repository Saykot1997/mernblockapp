import { Writeimgbox, Writeimg, Formbox, Form, Formgroup, Input, Textarea, Button, Select } from "./Write.style"
import { IoMdAddCircle } from 'react-icons/io';
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { useHistory } from "react-router";
import { Host } from "../../Data"


function Write() {

    const history = useHistory()
    const { user } = useContext(Context)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('')
    const [file, setFile] = useState(null);

    const PostSubmit = async (e) => {

        e.preventDefault();

        if (!title || !desc || !category) {

            window.alert("You can't keep empty the fields.")
        }
        else {


            if (file) {

                const Filedata = new FormData();
                Filedata.append('files', file);
                Filedata.append('title', title);
                Filedata.append('desc', desc);
                Filedata.append('category', category.toLocaleLowerCase());
                Filedata.append('username', user.username);

                try {
                    const res = await axios.post(`${Host}/posts`, Filedata, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                            'Authorization': 'Bearer ' + user.token
                        }
                    })
                    history.replace(`/post/${res.data._id}`)
                }
                catch (err) {
                    window.alert("Upload error !!")
                    console.log(err)
                }
            }
            else {
                const newPost = {
                    username: user.username,
                    title,
                    desc,
                    category: category.toLocaleLowerCase()
                }

                try {
                    const res = await axios.post(`${Host}/posts`, newPost, {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': 'Bearer ' + user.token
                        }
                    })
                    history.replace(`/post/${res.data._id}`)
                }
                catch (err) {
                    window.alert("Upload error !!")
                    console.log(err)
                }
            }
        }
    }


    return (
        <>
            {file && (<Writeimgbox><Writeimg src={URL.createObjectURL(file)} /> </Writeimgbox>)}
            <Formbox>
                <Form onSubmit={PostSubmit}>
                    <Formgroup File>
                        <label htmlFor="File"><IoMdAddCircle style={{ fontSize: "30px" }} /></label>
                        <Input type="file" id="File" style={{ display: "none" }} onChange={(e) => { setFile(e.target.files[0]) }} />
                        <Input placeholder="Title" onChange={(e) => (setTitle(e.target.value))} />
                    </Formgroup>
                    <Formgroup>
                        <Select name="" id="" value={category} onChange={(e) => { setCategory(e.target.value) }}>
                            <option value="">Select Category</option>
                            <option value="Life">Life</option>
                            <option value="Entertain">Entertain</option>
                            <option value="Education">Education</option>
                            <option value="Sports">Sports</option>
                            <option value="Nature">Nature</option>
                        </Select>
                    </Formgroup>
                    <Formgroup>
                        <Textarea placeholder={"Write your story...."} onChange={(e) => (setDesc(e.target.value))} />
                    </Formgroup>
                    <Button type="submit">Publish</Button>
                </Form>
            </Formbox>
        </>
    )
}

export default Write
