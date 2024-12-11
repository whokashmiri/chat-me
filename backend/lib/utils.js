import jwt from 'jsonwebtoken'

export const generateToken = (userId,res)=>{
const token  = jwt.sign({userId}, process.env.JWT_SECRET,{
    expiresIn:"7d"
})
res.cookie("jwt",token,{

    maxAge : 7 * 27 * 60 * 60 * 1000,
    httpOnly: true, //XSS attacks
    sameSite:"strict",  //CSRF attacks
    secure: process.env.NODE_ENV !== "development"
})
return token;
};