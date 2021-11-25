import { Postdiv, Postimg, Postinfo, Postcatagory, Postdesc, Posttime, Posttitle, Postcatagoryitem, Links } from "./Post.style"

function Post({ post }) {
    const PF = "http://localhost:5000/upload/"
    return (
        <Postdiv>
            {post.photo && (<Postimg src={PF + post.photo} />)}
            <Postinfo>
                <Postcatagory>
                    <Links to={`/?cat=${post.category}`}><Postcatagoryitem>{post.category}</Postcatagoryitem></Links>
                </Postcatagory>
                <Links to={`/post/${post._id}`}> <Posttitle>{post.title}</Posttitle> </Links>
                <Posttime>{new Date(post.createdAt).toDateString()}</Posttime>
                <Postdesc>{post.desc}</Postdesc>
            </Postinfo>
        </Postdiv>
    )
}

export default Post
