import {asyncHandler} from "../utils/asynchandler.js"

const registerUser = asyncHandler(async (req,res)=>{
    return  res.status(200).json({
        message:"Server is runnig "
    })
})


export {registerUser}