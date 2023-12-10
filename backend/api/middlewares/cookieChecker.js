


const cookieChecker=(req,res,next)=>{
console.log(req.cookies)
next();
}

export default cookieChecker