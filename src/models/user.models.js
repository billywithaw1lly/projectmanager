// writing the schema with mongoose

import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import crypto from "crypto"

const userSchema = new Schema(
  {
    avatar: {
      type: {
        url: String,
        localPath: String,
      },
      default: {
        url: `https://placehold.co/200x200`,
        localPath: "",
      },
    },
    username: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    refreshToken: {
      type: String,
    },
    forgotPasswordToken: {
      type: String,
    },
    forgotPasswordExpiry: {
      type: Date,
    },
    emailVerificationToken: {
      type: String,
    },
    emailVerificationExpiry: {
      type: Date,
    },
  },
  {
    timestamps: true,
  },
);

// middleware to save changed/new passwords
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next()

  this.password = await bcrypt.hash(this.password, 10)
  next()
})

//function to check if password is correct
userSchema.methods.isPasswordCorrect = async function(password){
  return await bcrypt.compare(password, this.password) 
}

//function for generating access token
userSchema.methods.generateAccessToken = function(){
  return jwt.sign(
    {
      _id: this.id,
      email: this.email,
      username: this.username
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
  )
}

//function for generating refresh token
userSchema.methods.generateRefreshToken = function(){
  return jwt.sign(
    {
      id: this.id,
      email: this.email,
      username: this.username
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
  )
}

//function for generating temp token
userSchema.methods.generateTemporaryToken = function() {
  const unHashedToken = crypto.randomBytes(20).toString("hex")

  const hashedToken = crypto
      .createHash("sha256")
      .update(unHashedToken)
      .digest("hex")
  
  const tokenExpiry = Date.now() + (20 * 60 * 1000)
  return {unHashedToken, hashedToken, tokenExpiry}
};

export const User = mongoose.model("User", userSchema);
