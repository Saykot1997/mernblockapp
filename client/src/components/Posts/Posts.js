import { Postscontainer } from "./Posts.style"
import Post from "./Post"

function Posts({posts}) {
    return (
        <Postscontainer>
           {posts.map((p)=>( <Post key={p._id} post={p} />))}
        </Postscontainer>
    )
}

export default Posts
