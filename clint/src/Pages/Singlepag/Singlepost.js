import {useLocation} from "react-router"; 
import {useState,useEffect} from "react"
import { Singlepostcontainer,SPimg ,Singleposttitle,Iconbox,SPauthor,SPtime,SPinfo,SPdec,Links,Input,Textarea,UpdateBtn,CloseUpdateMode,CloseTheMode,IMGBOX} from './Singlepost.style'
import { FaEdit} from 'react-icons/fa';
import { RiDeleteBin6Line} from 'react-icons/ri';
import axios from "axios"
import { useContext } from "react";
import { Context } from "../../Context/Context";

function Singlepost() {
    const {user} = useContext(Context)
    const PF = "/upload/"
    const location = useLocation()
    const path = location.pathname.split("/")[2];
    const [post, setpost] = useState({})
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [photo,setPhoto] = useState(null)
    const [updatemode,setUpdatemode] = useState(false)

    useEffect(()=>{

    const getPost = async ()=>{
    const res = await axios.get("/posts/"+path)
    setpost(res.data)
    setTitle(res.data.title)
    setDesc(res.data.desc)
}          
    getPost()
   },[path])

   const deletePost =()=>{
    axios.delete(`/posts/${post._id}`,{data:{ username:user.username}})
    .then((res)=>{window.location.replace("/")})
    .catch((err)=>{console.log(err)});
   }

   const updatePost = async ()=>{

    if(photo) 
    {
        const Photoname = user.username + Date.now() + photo.name;
        const newPost = {
            username:user.username,
            title,
            desc,
            photo:Photoname
        }
       
        const Photodata = new FormData();
        Photodata.append('files',photo,Photoname);

        try 
        { 
           await axios.post('/upload',Photodata)
        } 
        catch (err)
        {
            delete newPost.photo;
           window.alert("File upload error !!")
        }

        try 
        {
           const res = await axios.put(`/posts/${post._id}`,newPost)
           window.location.replace(`/post/${res.data._id}`)
        } 
        catch (err)
        {
            console.log(err)
        }
    }
    else
    {
        const newPost = {
            username:user.username,
            title,
            desc,
        }

        try 
        {
           const res = await axios.put(`/posts/${post._id}`,newPost)
           window.location.replace(`/post/${res.data._id}`)
        } 
        catch (err)
        {
            console.log(err)
        }
    }   
   }


    return (
        
        <Singlepostcontainer>

           { photo ? (<IMGBOX><SPimg src={URL.createObjectURL(photo)} /></IMGBOX>) : (<IMGBOX><SPimg src={PF+post.photo } /></IMGBOX>) }
           {updatemode && <label for="file" style={{fontSize:"30px",marginLeft:"20px",fontWeight:"900",cursor:"pointer"}} >+</label>}
               <Input type="file" id="file" style={{display:"none"}} onChange={(e)=>{setPhoto(e.target.files[0])}}></Input>
               {updatemode && <CloseUpdateMode onClick={()=>{ setUpdatemode(false)}}><CloseTheMode/></CloseUpdateMode>}
              { updatemode ? <Input autoFocus placeholder="Title" value={title} onChange={(e)=>(setTitle(e.target.value))}/> : <Singleposttitle>{post.title}</Singleposttitle>}
                {(post.username === user?.username) && 
                    <Iconbox updatemode={updatemode}>
                        <FaEdit onClick={()=>{setUpdatemode(true)}} style={{fontSize:"20px",margin:"0 8px",color:"teal",cursor:"pointer"}}/>
                        <RiDeleteBin6Line onClick={deletePost} style={{fontSize:"20px",margin:"0 8px",color:"tomato",cursor:"pointer"}}/>
                    </Iconbox>}
           
            { updatemode ?  <Textarea value={desc} placeholder={"Write your story...."} onChange={(e)=>(setDesc(e.target.value))}/> : <SPdec> {post.desc}</SPdec>}
            <SPinfo updatemode={updatemode}>
                <SPauthor>Wretten by <Links to={`/?user=${post.username}`}>{post.username}</Links></SPauthor>
                <SPtime>{new Date(post.createdAt).toDateString()}</SPtime>
            </SPinfo>
            {updatemode && <UpdateBtn onClick={updatePost}>Update</UpdateBtn>}            
        </Singlepostcontainer>
    )
}

export default Singlepost
