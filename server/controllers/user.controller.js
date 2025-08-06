import AppError from "../utils/error.util.js";
import User from "../models/user.model.js";
import cloudinary from "cloudinary"
import fs from "fs"
import crypto from "crypto"
import sendEmail from "../utils/sendEmail.js";

const cookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true
}

const register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (!fullName || !email || !password) {
      return next(new AppError("All fields are required", 400))
    }
    const userExists = await User.findOne({ email })
    if (userExists) {
      return new AppError("Tum to pehle se ho", 400);
    }

    const user = await User.create({
      fullName,
      email,
      password,
      avatar: {
        public_id: email,
        secure_url: ""
      }
    })
    if (!user) {
      return new AppError("User registration failes, please try again", 400)
    }
    //todo file upload
    console.log("file details", req.file);

    if (req.file) {

      try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill"
        })
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          fs.rm(`uploads/${req.file.filename}`, (error) => {
            if (error) {
              console.error("failed to delete file :", error);
            }
          })

        }

      } catch (error) {
        return next(new AppError(error.message || "File not uploaded, please try again", 500))
      }
    }

    await user.save();

    user.password = undefined;

    const token = await user.generateJWTToken();

    res.cookie('token', token, cookieOptions)

    res.status(200).json({
      success: true,
      message: "User registred successfully",
      user,
    })
  } catch (error) {
    return next(new AppError(error.message, 500))
  }

}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return next(new AppError("All fields are required", 400))
    }

    const user = await User.findOne({
      email
    }).select('+password')

    if (!user || !user.comparePassword(password)) {
      return next(new AppError("Email or password does not match", 400))
    }

    const token = await user.generateJWTToken();
    user.password = undefined

    res.cookie('token', token, cookieOptions);


    res.status(200).json({
      success: true,
      message: "User loggedin successfully",
      user
    })
  }
  catch (error) {
    return next(new AppError(error.message, 500))
  }
}


const logout = (req, res) => {
  try {
    res.cookie('token', null, {
      secure: true,
      maxAge: 0,
      httpOnly: true
    })
    res.status(200).json({
      success: true,
      message: "User logged out successfully"
    })
  } catch (error) {
    return next(new AppError(error.message, 500))
  }
}

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const user = await User.findById(userId)
    res.status(200).json({
      success: true,
      message: "User details",
      user
    })
  } catch (error) {
    return next(new AppError("Failed to fetch user profile detail", 500))
  }
}

const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  if (!email) {
    return next(new AppError("email is required", 400))
  }

  const user = await User.findOne({ email })

  if (!user) {
    return next(new AppError("Email not registered", 500))
  }

  const resetToken = await user.generatePasswordResetToken();

  await user.save()

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`

  const subject = 'Reset Password'
  const message = `You can reset your password by clicking <a href=${resetPasswordUrl} target="_blank">Reset your password</a>\nIf the above link does not work for som reason then copy this link in a new tab ${resetPasswordUrl}.\nIf you have not requested this,kindly ignore`

  try {


    await sendEmail(email, subject, message)


    res.status(200).json({
      success: true,
      message: `Reset password token has been sent to ${email}`
    })
  } catch (error) {

    user.forgotPasswordExpiry = undefined
    user.forgotPasswordToken = undefined

    await user.save()
    return next(new AppError(error.message, 400))
  }
  next()
}

const resetPassword = async (req, res, next) => {
  const { resetToken } = req.params;

  const { password } = req.body;
  const forgotPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() }
  })

  if (!user) {
    return next(new AppError("Token is invalid or expired", 400))
  }

  user.password = password;

  user.forgotPasswordExpiry = undefined;
  user.forgotPasswordToken = undefined;
  user.save();


  res.status(200).json({
    success: true,
    message: "Password changed successfully"
  })


}

const changePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const { id } = req.user;


  if (!oldPassword || !newPassword) {
    return next(new AppError("All credentias are required", 400))
  }

  const user = await User.findById(id).select("+password")

  if (!user) {
    return next(new AppError("User does not exist", 400))
  }

  const isPasswordValid = await user.comparePassword(oldPassword)

  if (!isPasswordValid) {
    return next(new AppError("Invalid old password", 400))
  }

  user.password = newPassword;

  await user.save();

  user.password = undefined;

  res.status(200).json({
    success: true,
    message: "Password changed successfully"
  })


}
const updateUser = async (req, res) => {
  const { fullName } = req.body;
  const { id } = req.user.id;

  const user = await User.findById(id)

  if (!user) {
    return next(new AppError("User does not exist", 400))
  }

  if(req.fullName){
    user.fullName = fullName
  }

  if(req.file){
    await cloudinary.v2.uploader.destroy(user.avatar.public_id);
  }

   try {
        const result = await cloudinary.v2.uploader.upload(req.file.path, {
          folder: "LMS",
          width: 250,
          height: 250,
          gravity: "faces",
          crop: "fill"
        })
        if (result) {
          user.avatar.public_id = result.public_id;
          user.avatar.secure_url = result.secure_url;

          fs.rm(`uploads/${req.file.filename}`, (error) => {
            if (error) {
              console.error("failed to delete file :", error);
            }
          })

        }

      } catch (error) {
        return next(new AppError(error.message || "File not uploaded, please try again", 500))
      }


      await user.save()

      res.status(200).json({
        success:true,
        message:"User details updated successfully"
      })

  }

export {
  register,
  login,
  logout,
  getProfile,
  forgotPassword,
  resetPassword,
  changePassword,
  updateUser
}