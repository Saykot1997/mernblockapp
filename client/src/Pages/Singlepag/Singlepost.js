import { useHistory, useLocation } from "react-router";
import { useState, useEffect } from "react"
import { Singlepostcontainer, SPimg, Singleposttitle, Iconbox, SPauthor, SPtime, SPinfo, SPdec, Links, Input, Textarea, UpdateBtn, CloseUpdateMode, CloseTheMode, IMGBOX, CommentsBox, CommentBox } from './Singlepost.style'
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Line } from 'react-icons/ri';
import axios from "axios"
import { useContext } from "react";
import { Context } from "../../Context/Context";

function Singlepost() {
    const history = useHistory()
    const { user } = useContext(Context)
    const PF = "http://localhost:5000/upload/"
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setpost] = useState(null)
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [photo, setPhoto] = useState(null)
    const [updatemode, setUpdatemode] = useState(false)
    const [comments, setComments] = useState("");
    const [edditAbleCom, setEdditAbleCom] = useState("");
    const [activeCommentID, setActiveCommentID] = useState("");
    const [commentEdit, setCommentEdit] = useState(false);


    useEffect(() => {

        const getPost = async () => {
            const res = await axios.get("/posts/" + path)
            setpost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
        getPost()
    }, [path])

    const deletePost = () => {
        axios.delete(`/posts/${post._id}`, { data: { username: user.username } })
            .then((res) => { history.replace("/") })
            .catch((err) => { console.log(err) });
    }

    const updatePost = async () => {

        setUpdatemode(false)

        if (photo) {
            const Photoname = user.username + Date.now() + photo.name;
            const newPost = {
                username: user.username,
                title,
                desc,
                photo: Photoname
            }

            const Photodata = new FormData();
            Photodata.append('files', photo, Photoname);

            try {
                await axios.post('/upload', Photodata)
            }
            catch (err) {
                delete newPost.photo;
                window.alert("File upload error !!")
            }

            try {
                const res = await axios.put(`/posts/${post._id}`, newPost)

                history.replace(`/post/${res.data._id}`)
                setpost(res.data)
                setTitle(res.data.title)
                setDesc(res.data.desc)
            }
            catch (err) {
                console.log(err)
            }
        }
        else {

            const newPost = {
                username: user.username,
                title,
                desc,
            }

            try {
                const res = await axios.put(`/posts/${post._id}`, newPost);
                setpost(res.data)
                setTitle(res.data.title)
                setDesc(res.data.desc)
            }
            catch (err) {
                console.log(err)
            }
        }
    }

    const CommentPost = async () => {
        const res = await axios.put(`/posts/comments/${post._id}`, { comments })
        setComments('')
        if (res) {
            const res = await axios.get("/posts/" + path)
            setpost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)

        }
    }

    const EdditComment = (comment) => {
        setEdditAbleCom(comment.comments);
        setActiveCommentID(comment._id)
        setCommentEdit(!commentEdit)
    }
    const EdditCommentClose = () => {
        setEdditAbleCom("");
        setActiveCommentID("")
        setCommentEdit(!commentEdit)
    }

    const EdditCommentSave = async (comment) => {
        setCommentEdit(!commentEdit)
        setActiveCommentID("")
        const res = await axios.put(`/posts/comments/eddit/${post._id}`, { comments: edditAbleCom, commentId: comment._id })
        if (res) {
            const res = await axios.get("/posts/" + path)
            setpost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
    }

    const DeleteComment = async (comment) => {

        const res = await axios.put(`/posts/comments/delete/${post._id}`, { commentId: comment._id })

        if (res) {
            const res = await axios.get("/posts/" + path)
            setpost(res.data)
            setTitle(res.data.title)
            setDesc(res.data.desc)
        }
    }




    return (

        <Singlepostcontainer>
            {
                post && (
                    <>
                        {photo ? (<IMGBOX><SPimg src={URL.createObjectURL(photo)} /></IMGBOX>) : (<IMGBOX><SPimg src={PF + post.photo} /></IMGBOX>)}
                        {updatemode && <label for="file" style={{ fontSize: "30px", marginLeft: "20px", fontWeight: "900", cursor: "pointer" }} >+</label>}
                        <Input type="file" id="file" style={{ display: "none" }} onChange={(e) => { setPhoto(e.target.files[0]) }}></Input>
                        {updatemode && <CloseUpdateMode onClick={() => { setUpdatemode(false) }}><CloseTheMode /></CloseUpdateMode>}
                        {updatemode ? <Input autoFocus value={title} onChange={(e) => (setTitle(e.target.value))} /> : <Singleposttitle>{post.title}</Singleposttitle>}
                        {(post.username === user?.username) &&
                            <Iconbox updatemode={updatemode}>
                                <FaEdit onClick={() => { setUpdatemode(true) }} style={{ fontSize: "20px", margin: "0 8px", color: "teal", cursor: "pointer" }} />
                                <RiDeleteBin6Line onClick={deletePost} style={{ fontSize: "20px", margin: "0 8px", color: "tomato", cursor: "pointer" }} />
                            </Iconbox>}

                        {updatemode ? <Textarea value={desc} onChange={(e) => (setDesc(e.target.value))} /> : <SPdec> {post.desc}</SPdec>}
                        <SPinfo updatemode={updatemode}>
                            <SPauthor>Wretten by <Links to={`/?user=${post.username}`}>{post.username}</Links></SPauthor>
                            <SPtime>{new Date(post.createdAt).toDateString()}</SPtime>
                        </SPinfo>
                        {
                            !updatemode && (
                                <>
                                    {
                                        post.comments.length > 0 && post.comments.map((item, i) =>

                                            <CommentBox key={i}>
                                                <div>
                                                    <img src={PF + item.user.profilepic} />
                                                    <p>{item.user.username}</p>
                                                </div>
                                                <div>
                                                    {
                                                        commentEdit && activeCommentID == item._id && <input type="text" value={edditAbleCom} onChange={(e) => { setEdditAbleCom(e.target.value) }} />
                                                    }
                                                    {
                                                        activeCommentID != item._id && <p>{item.comments}</p>
                                                    }

                                                </div>
                                                {
                                                    item.user.username == user.username && (

                                                        <div>
                                                            {commentEdit && activeCommentID == item._id ?
                                                                <button onClick={() => { EdditCommentSave(item) }}>Save</button> :

                                                                <button onClick={() => { EdditComment(item) }}>Eddite</button>
                                                            }
                                                            {commentEdit && activeCommentID == item._id ?
                                                                <button onClick={EdditCommentClose}>Close</button> :
                                                                <button onClick={() => { DeleteComment(item) }}>Delete</button>
                                                            }
                                                        </div>
                                                    )
                                                }
                                            </CommentBox>
                                        )
                                    }
                                    <CommentsBox>
                                        <input type="text" placeholder="Your Comments" value={comments} onChange={(e) => { setComments(e.target.value) }} />
                                        <button onClick={CommentPost}>post</button>
                                    </CommentsBox>

                                </>
                            )
                        }
                        {updatemode && <UpdateBtn onClick={updatePost}>Update</UpdateBtn>}
                    </>

                )
            }
        </Singlepostcontainer >
    )
}

export default Singlepost
