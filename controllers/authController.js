import userModel from "../models/userModel.js"

export const registerController = async (req, res, next) => {
    const { name, email, password } = req.body
    //validate
    if (!name) {
        next("name is required");
    }
    if (!email) {
        next("email is required");
    }
    if (!password) {
        next("password is required");
    }
    const existingUser = await userModel.findOne({ email })
    if (existingUser) {
        next("User is already exists ,please log in");
    }
    const user = await userModel.create({ name, email, password })
    //token
    // const token = user.createJWT()
    res.status(201).send({
        success: true,
        message: 'User crated successfully',
        user: {
            email: user.email,
            name: user.name,
            location: user.location
        },
        // token
    })
}

export const loginController = async (req, res, next) => {
    const { email, password } = req.body
    //validation
    if (!email || !password) {
        next("Please provide all field")
    }
    //find user by email
    const user = await userModel.findOne({ email }).select("+password")
    if (!user) {
        next("Invalid user name or password")
    }
    console.log(user)
    //compare password
    const isMatch = await user.comparePassword(password)
    if (!isMatch) {
        next('Invalid user name or password')
    }
    user.password = undefined
    const token = user.createJWT()
    res.status(200).json({
        success: true,
        message: 'Login successfully',
        user,
        token
    })
}

export const listUser = async (req, res, next) => {
    try {
        const users = await userModel.find();
        res.status(200).json({
            success: true,
            message: "Users retrieved successfully",
            users,
        });
    } catch (error) {
        next(error);
    }
};