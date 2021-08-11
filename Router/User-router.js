const router = require('express').Router();
const User = require('../Models/User_model');
const Post = require('../Models/Post_model');
const bcrypt = require('bcrypt');  
const fs = require("fs")
// const authgurd = require("../authgard/authgurd")

// update account

router.put('/:id',async (req,res)=>{

 if(req.body.userId === req.params.id){

        if(req.body.profilepic)
        {
            const user = await User.findById(req.body.userId)
            const oldPhoto = user.profilepic;
            const uploadDir = "upload/";
            const oldPhotoWithPath = uploadDir+oldPhoto;
        
            if (fs.existsSync(oldPhotoWithPath)) {
                fs.unlink(oldPhotoWithPath,(err) => {
                console.log(err);
                });
            }
        }
            
        if(req.body.password){
            req.body.password = await bcrypt.hash(req.body.password,10);
            try{
                const updateduser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
                res.status(200).json(updateduser );
            }catch(err){res.status(500).json(err);}

        } else{
            try{
                const updateduser = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
                res.status(200).json(updateduser );
            }catch(err){res.status(500).json(err);}
        }   
 }else{

     res.status(400).json("you can update only your account!!");
  }
})

// delate account

router.delete('/:id',async (req,res)=>{
   

    if(req.body.userId === req.params.id)
    {
        try
        {
            const user = await User.findById(req.params.id);

            try
            {
                if(user.profilepic)
                {
                    const oldPhoto = user.profilepic;
                    const uploadDir = "upload/";
                    const oldPhotoWithPath = uploadDir+oldPhoto;
                
                    if (fs.existsSync(oldPhotoWithPath)) {
                        fs.unlink(oldPhotoWithPath, (err) => {
                        if(err){new Error("could not delete profile picture")}
                        });
                    }
                }
                  const allpost = await Post.find({username:user.username})
                  allpost.map((post)=>{
                    
                    if(post.photo)
                    {
                        const oldPhoto = post.photo;
                        const uploadDir = "upload/";
                        const oldPhotoWithPath = uploadDir+oldPhoto;
                    
                        if (fs.existsSync(oldPhotoWithPath)) {
                            fs.unlink(oldPhotoWithPath, (err) => {
                        if(err){new Error("Culd not delete photos")}
                            });
                        }
                    }

                  })
              
                await Post.deleteMany({username:user.username})
                await User.findByIdAndDelete(req.params.id);
                res.status(200).json('user has been deleted !!')
            }
            catch(err)
            {
                res.status(500).json(err);
            }
            
        } 
        catch (error)
        {
            res.status(404).json('user not found !!')
        }
   
    }
    else
    {
        res.status(400).json("you can delete only your account!!");
    }
   });


// Get user 

router.get('/:id', async (req,res)=>{

try {
    
    const user = await User.findById(req.params.id);

    if(!user){
        res.status(400).json("User not found");
    }

    const {password, ...others} = user._doc;

    res.status(200).json(others);

} catch (error) {
    
    res.status(500).json(error)  
}

});



module.exports = router