import { useState,useEffect} from "react"
import Headercomponent from "../../components/Header/Headercomponent"
import Sidebar from "../../components/Sidebar/Sidebar"
import Posts from "../../components/Posts/Posts"
import { Container } from "./Home.style"
import axios from "axios";
import { useLocation } from "react-router"
import { PostWraper,SideWraper } from "./Home.style"


function Home() {
 const [posts, setPosts] = useState([])
 const {search} = useLocation()
 
 useEffect(() => {
    const fatchPosts = async ()=>{
    const res = await axios.get("/posts"+search)
    setPosts(res.data)
    }
    fatchPosts()
   
 },[search])

    return (
        <>
           <Headercomponent />
            <Container>
                <PostWraper>
                    <Posts posts={posts}/>
                </PostWraper>
                <SideWraper>
                     <Sidebar/>
                </SideWraper>
            </Container>
        </>   
    )
}

export default Home
