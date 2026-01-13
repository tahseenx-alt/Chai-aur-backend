import { asyncHandler } from "../utils/asynchandler.js"
import { ApiError } from "../utils/apiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/apiresponse.js"

const registerUser = asyncHandler(async (req, res) => {
     // get user details from frontend
    // validation - not empty
    // check if user already exists: username, email
    // check for images, check for avatar
    // upload them to cloudinary, avatar
    // create user object - create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return res

    const { fullname, email, username, password } = req.body
    console.log("email:", email)

    // other appraoch but here we have to write for all case 
    /*
      if(fullname === ""){
       throw 
      }
     */
    if (
        [fullname, email, username, password].some((field) => {
            return field?.trim() === ""
        })
    ) {
        throw new ApiError(400, "All field must be full ")
    }

    // checking the user is already exit or not 
    const existingUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existingUser) {
        throw new ApiError(409, "User with email or username already exists")
    }

    // images or avatar
    const avatarLocalPath = req.files?.avatar?.[0]?.path
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar file is required ")
    }

    // uploading on Cloundinary
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = coverImageLocalPath
        ? await uploadOnCloudinary(coverImageLocalPath)
        : null

    if (!avatar) {
        throw new ApiError(400, "Avatar file is required ")
    }

    const user = await User.create({
        fullname,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    const createdUser = await User.findById(user._id).select(
        // removing 
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registrating the User ")
    }

    // returning 
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registerd Succesfully ")
    )
})

export { registerUser }
