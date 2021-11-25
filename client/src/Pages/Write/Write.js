import { Writeimgbox, Writeimg, Formbox, Form, Formgroup, Input, Textarea, Button } from "./Write.style"
import { IoMdAddCircle } from 'react-icons/io';
import { useContext, useState } from "react";
import { Context } from "../../Context/Context";
import axios from "axios";
import { useHistory } from "react-router";


function Write() {

    const history = useHistory()
    const { user } = useContext(Context)
    const [title, setTitle] = useState('')
    const [desc, setDesc] = useState('')
    const [category, setCategory] = useState('Life')
    const [file, setFile] = useState(null);

    const PostSubmit = async (e) => {

        e.preventDefault();

        if (!title || !desc || !category) {
            window.alert("You can't keep empty the fields.")
        }
        else {

            try {
                await axios.post("/category/", { name: category.toLowerCase() });
            } catch (error) {
                console.log("catagory allready created")
            }

            if (file) {
                const Filename = user.username + Date.now() + file.name;
                const newPost = {
                    username: user.username,
                    title,
                    desc,
                    category: category.toLocaleLowerCase(),
                    photo: Filename
                }

                const Filedata = new FormData();
                Filedata.append('files', file, Filename);

                try {
                    await axios.post('/upload', Filedata)
                }
                catch (err) {
                    delete newPost.photo;
                    window.alert("File upload error !!")
                }

                try {
                    const res = await axios.post('/posts/', newPost)
                    history.replace(`/post/${res.data._id}`)
                }
                catch (err) {
                    window.alert("Upload error !!")
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
                    const res = await axios.post('/posts/', newPost)
                    history.replace(`/post/${res.data._id}`)
                }
                catch (err) {
                    window.alert("Upload error !!")
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
                        <Input category type="text" placeholder="Categories" onChange={(e) => { setCategory(e.target.value) }} />
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
