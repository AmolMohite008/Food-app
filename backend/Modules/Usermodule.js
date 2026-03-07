import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
  name: { type: String, required: [true, "name is must be declare "] },
  email: {
    type: String,
    required: [true, "plese provide your email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "plese provide a password"],
    minlength: 7,
    select: false, // password response me na aaye VVVIP
  },
  cartData:{type:Object ,default:{}}
});

// hash password before save it to run document midddlware

userSchema.pre("save", async function () {
   // Only hash if password is modified
  if (!this.isModified("password")) return;

  this.password = await bcrypt.hash(this.password, 12);
});


export const User = mongoose.model("User", userSchema);
