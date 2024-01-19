var jwt = require('jsonwebtoken')
const JWT_SECRET= 'hellodarknesssmile';

const userdetails=(req,res,next)=>{
    //get user from the jwt token and add id to reqbody
    const token= req.header('auth-token')

    
    if(!token){
        res.status(401).send('not a valid token')
    }
    try {
        const data =jwt.verify(token,JWT_SECRET)
        req.user=data.user;
        
    } catch (error) {
        res.status(401).send('not a valid token')

    }
    next();
}
module.exports = userdetails