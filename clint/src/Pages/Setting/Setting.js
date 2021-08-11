import Sidebar from "../../components/Sidebar/Sidebar"
import { Settingcontainer,Settingupdate,Title,Updateaccount, Deleteaccount,Profrile,Ptitle,Pimg,Logobox,Formgroup,Form,Buttonbox,Button,Input,SidebarWraper} from "./Setting.style"
import { FaUserCircle } from 'react-icons/fa';
import axios from "axios";
import { useContext,useState } from "react";
import { Context } from "../../Context/Context";


function Setting (){  
    const {user, dispatch} = useContext(Context);
    const PF = "/upload/"
    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [profilepic,setProfilepic] = useState(null)

    const updateUser = async (e)=>{
      e.preventDefault();
      
  if ( !profilepic && !username && !email && !password )   //if no fild is selected
     
        {
            window.alert("You did not fill any fild")
        };

  if ( profilepic && username && email && password) // if all filds are selectted
      
       {  
            const profilepicname = Date.now() + "-" + profilepic.name;

            const updateAbleUser = {
            userId:user._id,
            profilepic:profilepicname,
            username,
            email,
            password
            }

            const Picturedata = new FormData();
            Picturedata.append('files',profilepic,profilepicname);

            try {
                const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
                userUploadRes && await axios.post('/upload',Picturedata)
                dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
                window.location.reload()
            } catch (err) {
                dispatch({type:"Update_FAILOUR"})
                window.alert("User can't upnate!!!! ")
            }
    
        };
       
  if ( profilepic && !username && !email && !password)  // if only profile picture upload
   
        {  
            const profilepicname = Date.now() + "-" + profilepic.name;
    
            const updateAbleUser = {
            userId:user._id,
            profilepic:profilepicname
            }
    
            const Picturedata = new FormData();
            Picturedata.append('files',profilepic,profilepicname);
    
            try {
                const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
                userUploadRes && await axios.post('/upload',Picturedata)
                dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
                window.location.reload()
            } catch (err) {
                dispatch({type:"Update_FAILOUR"})
                window.alert("User can't upnate!!!! ")
            }
         
       };
       
  if ( profilepic && username && !email && !password)
       
       {
           const profilepicname = Date.now() + "-" + profilepic.name;
     
           const updateAbleUser = {
             userId:user._id,
             profilepic:profilepicname,
             username
           }
     
           const Picturedata = new FormData();
           Picturedata.append('files',profilepic,profilepicname);
     
           try {
               const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
               userUploadRes && await axios.post('/upload',Picturedata)
               dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
               window.location.reload()
           } catch (err) {
               dispatch({type:"Update_FAILOUR"})
               window.alert("User can't upnate!!!! ")
           }
   
       } ;
       
  if (profilepic && !username && email && !password)
       
       {
           const profilepicname = Date.now() + "-" + profilepic.name;
     
           const updateAbleUser = {
             userId:user._id,
             profilepic:profilepicname,
             email
           }
     
           const Picturedata = new FormData();
           Picturedata.append('files',profilepic,profilepicname);
     
           try {
               const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
               userUploadRes && await axios.post('/upload',Picturedata)
               dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
               window.location.reload()
           } catch (err) {
               dispatch({type:"Update_FAILOUR"})
               window.alert("User can't upnate!!!! ")
           }
   
       }; 
       
  if (profilepic && !username && !email && password)
       
       {
           const profilepicname = Date.now() + "-" + profilepic.name;
     
           const updateAbleUser = {
             userId:user._id,
             profilepic:profilepicname,
             password
           }
     
           const Picturedata = new FormData();
           Picturedata.append('files',profilepic,profilepicname);
     
           try {
               const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
               userUploadRes && await axios.post('/upload',Picturedata)
               dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
               window.location.reload()
           } catch (err) {
               dispatch({type:"Update_FAILOUR"})
               window.alert("User can't upnate!!!! ")
           }
   
       };
       
  if (!profilepic && username && !email && !password)
       
        {
            const updateAbleUser = {
                userId:user._id,
                username
            }

    
            try {
                const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
                dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
                window.location.reload()
            } catch (err) {
                dispatch({type:"Update_FAILOUR"})
                window.alert("User can't upnate!!!! ")
            }

        };
    
   if (!profilepic && username && email && !password)
    
        {
            const updateAbleUser = {
                userId:user._id,
                username,
                email
            }

            try {
                const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
                dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
                window.location.reload()
            } catch (err) {
                dispatch({type:"Update_FAILOUR"})
                window.alert("User can't upnate!!!! ")
            }

        };
    
  if (!profilepic && username && !email && password)
    
        {
            const updateAbleUser = {
                userId:user._id,
                username,
                password
            }

    
            try {
                const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
                dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
                window.location.reload()
            } catch (err) {
                dispatch({type:"Update_FAILOUR"})
                window.alert("User can't upnate!!!! ")
            }

        };
        
  if (!profilepic && !username && email && !password)
        
        {
            const updateAbleUser = {
                userId:user._id,
                email
            }

    
            try {
                const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
                dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
                window.location.reload()
            } catch (err) {
                dispatch({type:"Update_FAILOUR"})
                window.alert("User can't upnate!!!! ")
            }

       };
    
  if (!profilepic && !username && email && password)
    
        {
        const updateAbleUser = {
            userId:user._id,
            email,
            password
        }

            try {
                const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
                dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
                window.location.reload()
            } catch (err) {
                dispatch({type:"Update_FAILOUR"})
                window.alert("User can't upnate!!!! ")
            }

        };
    
   if (!profilepic && !username && !email && password)
    
        {
            const updateAbleUser = {
                userId:user._id,
                password
            }

            try {
                const userUploadRes = await axios.put(`/users/${user._id}`,updateAbleUser)
                dispatch({type:"UPDATE_SUCCESS",payload:userUploadRes.data})
                window.location.reload()
            } catch (err) {
                dispatch({type:"Update_FAILOUR"})
                window.alert("User can't upnate!!!! ")
            }
        };

    
    };

    const deleteUser = async ()=>{
    
        try {
            const res = await axios.delete(`/users/${user._id}`,{data:{userId:user._id,username:user.username}})
            res && window.location.replace("/register");
            res &&  dispatch({type:"LOGOUT"})

        } catch (error) {
            dispatch({type:"UPDATE_FAILOUR "}) 
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
                      <Pimg src={profilepic ? URL.createObjectURL(profilepic) : PF+user.profilepic}/>
                    <label htmlFor="File"><FaUserCircle style={{fontSize:"30px",color:"pink",cursor:"pointer",marginLeft:"10px"}}/></label>
                    <Input type="file" id="File" style={{display:"none"}} onChange={e=>setProfilepic(e.target.files[0])}/>
                  </Logobox>
              </Profrile>
              <Form onSubmit={updateUser}>
                  <Formgroup>
                      <label htmlFor="Name">Youe Name</label>
                      <Input type="text" placeholder={user.username} id="Name" onChange={(e)=>{setUsername(e.target.value)}}/>
                  </Formgroup>
                  <Formgroup>
                      <label htmlFor="Email">Your Email</label>
                      <Input type="email" placeholder={user.email} id="Email" onChange={(e)=>{setEmail(e.target.value)}} />
                  </Formgroup>
                  <Formgroup>
                      <label htmlFor="Passward">Passward</label>
                      <Input type="password" placeholder="Your Passward" id="Passward" onChange={(e)=>{setPassword(e.target.value)}}/>
                  </Formgroup>
                  <Buttonbox Button>
                      <Button type="submit">Subit</Button>
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
