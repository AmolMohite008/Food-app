import { User } from "../Modules/Usermodule.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"



// Generate JWT Token
const genrateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET , {
    expiresIn: '7d' // Token expires in 7 days
  });
};

//Login User
export const Login = async (req, res) => {
  console.log("BODY:", req.body);


  try{
   
    const {email ,password} = req.body;

    if(!email || !password){
      return res.status(400).json({message:"pelse provide email and password"})
    }

    const user = await User.findOne({email}).select("+password") 

    if(!user){
      return res.status(400).json({message:"invalid email or password"})
    }

    const checkpassword = await bcrypt.compare(req.body.password ,user.password)

   if(!checkpassword){
    return res.status(400).json({message:"invalid email or password "})
   } 

   const token = genrateToken(user._id) ;

   // Setting cookie
   res.cookie("token", token, {
  httpOnly: true,
  secure: false, // production me true
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/'              // Cookie available for all routes
});

   res.status(200).json({ 
    message:"Login successful",
    token,
    data:{ id: user._id, email: user.email, name: user.name },
   })
  }catch(error){
  
    res.status(400).json({message:error.message ,success: false,})
  }
};

// SignUp or registerUser
export const signUp = async (req, res) => {
  const { name, email, password } = req.body;
  console.log(req.body);
  try {
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.json({ success: false, message: "user already Exists" });
    }

    const newuser = await User.create({ name, email, password });

     console.log(newuser);

    //create JWT token  uparka function call kiya
    const token =  genrateToken(newuser._id);

    //  Setting cookie for signup as well
    res.cookie("token", token, {
  httpOnly: true,
  secure: false, // production me true
  sameSite: "strict",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    path: '/'              // Cookie available for all routes
});

    res.status(201).json({
      success: true,
      message: "User created successfully",
      token,
      data: { //Isme password bhi aa jayega (even if hashed). is karan yesa likaha hai  nahi normal data : newuser yese likha te hai
        _id: newuser._id,
        name: newuser.name,
        email: newuser.email,
      },
    });
    
  } catch (error) {
    res.status(400).json({success: false, error: error.message });
  }
};

// ✅ Logout User - Clear the cookie
export const Logout = async (req, res) => {

    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0), // Set cookie to expire immediately
      secure: false,
      sameSite: "strict",
      path: '/'
    });
    res.status(200).json({
    success: true,
    message: "Logged out successfully"
  });
};


 // this is auth middleware 
export const protect = async (req, res, next) => {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "You are not logged in",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const currentUser = await User.findById(decoded.id);

    if (!currentUser) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists",
      });
    }

    req.user = currentUser; // predifene nahi tumane declare kiya ki req object me jo user(yebhi pridefine nahi hai tumane battaya == karke) aye wo == currentlogendin user
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token or session expired",
    });
  }
};


// jo login hai uska data get
export const getMe = async (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      _id: req.user._id, // req.userId ==  line number 143 bg neet
      name: req.user.name,
      email: req.user.email,
    },
  });
};





