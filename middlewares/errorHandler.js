const errorHandler = (err,req,res,next)=>{
    let code = 500
    let errMessage = `Internal Server Error`

    switch (err.name) {
         case "BSONTypeError" :
            code = 404
            errMessage = "User Not Found"
            break;

        case "UserNotFound":
                code = 404
                errMessage = "User Not Found"
                break;
        
        case "InputEmail":
            code = 400
                errMessage = "Email Is Required"
                break;   
        
        case "InputPassword":
            code = 400
            errMessage = "Password Is Required"
            break;  
                        
        case "InputUsername":
            code = 400
            errMessage = "Username Is Required"
            break;  

        default:
            break;
    }

    res.status(code).json({ message: errMessage })
}

  module.exports = errorHandler