const jwt = require("jsonwebtoken");

const authgurd = async (req,res,next) => {

   const token = req.cookies.jwt;

  try
   {
        const isvarified = await jwt.verify(token,process.env.SECRATE_key);

        if(isvarified){
            req.body.username = isvarified.username
            req.body.userId = isvarified.userid
            next()
        }else{
            res.status(400).json('token is not varified')
        }
    } 
    catch (error)
    {
      res.status(500).json('you need to login first !!')
    }

}


module.exports = authgurd