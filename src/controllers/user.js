

// import userModel from '../models/user.js'
// import auth from '../common/auth.js'

// const create = async (req, res) => {
//     try {
//       const existingUser = await userModel.findOne({ email: req.body.email });
  
//       if (!existingUser) {
//         const hashedPassword = await auth.hashPassword(req.body.password);
//         await userModel.create({
//           name: req.body.name,
//           email: req.body.email,
//           password: hashedPassword,
//         });
  
//         res.status(201).send({
//           message: "User created successfully",
//         });
//       } else {
//         res.status(400).send({
//           message: `User with email ${req.body.email} already exists`,
//         });
//       }
//     } catch (error) {
//       console.error("Error creating user:", error);
//       res.status(500).send({
//         message: "Internal Server error",
//         error: error.message,
//       });
//     }
//   };
  

// const login = async (req,res)=>{
//     try {
    
//         let user = await userModel.findOne({email:req.body.email})
//         if(user){
//             let hashCompare = await auth.hashCompare(req.body.password,user.password)
      
//         if(hashCompare){
//             let token = await auth.createToken({
//             id:user._id,
//             name:user.name,
//             email:user.email,
//             role:user.role,
//             status:user.status
          
            
            

//             })

//             let userData = await userModel.findOne({email:req.body.email},{_id:0,password:0,createdAt:0,email:0})
//             res.status(200).send({
//                 message:"login Successfull",
//                 token,
//                 userData
//             })
           
//         }
//         else{
//             res.status(400).send({
//                 message:`Invaild Passsword`
//             })
//         }
//     }
//     else{
//         res.status(400).send({
//             message:`Account with ${req.body.email } does not exists!`
//         })
//     }

       
//     } catch (error) {
//         res.status(500).send({
//             message:`Internal Server Error `,
//             error:error.message 
//         })
        
//     }

// }

// const registerUser = async (req, res) => {
//     const { name, email, mobile, add, status, role, desc, password } = req.body;

//     try {
//         if (!name || !email || !password ||!status || !add || !role || !mobile || !desc ) {
//             return res.status(400).json({message:"Please fill in all the required fields."});
//         }

//         const hashedPassword = await auth.hashPassword(password);
//         const prenumber=await userModel.findOne({ mobile:mobile });
//         const preUser = await userModel.findOne({ email: email });

//         if (preUser) {
          
//             return res.status(400).send({message:` ${req.body.email }  is already present.`});
//         }
// if(prenumber)
// {
//     return res.status(400).send({message:` ${req.body.mobile} is already present.`});
// }
//         const newUser = new userModel({
//             name, status, add, role, email,  mobile,  desc, password: hashedPassword
//         });

//         await newUser.save();

//         res.status(201).json({message:"User Created Successfully", newUser});
//         // console.log(newUser);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json("Internal Server Error");
//     }
// };

// const getUserData = async (req, res) => {
//     try {
//         const userData = await userModel.find();
//         const totalUsers = await userModel.countDocuments({role:'user'});
//         const activeUsers = await userModel.countDocuments({ status: 'Active' });
//         const inactiveUsers = await userModel.countDocuments({ status: 'InActive' });
       

//         res.status(200).json({userData,totalUsers,activeUsers,inactiveUsers});
     
//         console.log(userData);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json("Internal Server Error");
//     }
// };

// const getIndividualUser = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const userIndividual = await userModel.findById(id);

//         if (!userIndividual) {
//             return res.status(404).json("User not found");
//         }

//         console.log(userIndividual);
//         res.status(200).json(userIndividual);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json("Internal Server Error");
//     }
// };

// const updateUserData =async(req,res)=>{
//     try {
//         const {id} = req.params;
//         // const hashedPassword = await Auth.hashPassword(password);
                       
//         req.body.password = await auth.hashPassword(req.body.password)
//         const updateduser = await userModel.findByIdAndUpdate(id,req.body,{
//             new:true
//         });
       
//         // console.log(updateduser);
//         res.status(201).json(updateduser);

//     } catch (error) {
//         res.status(400).json(error);
//     }
// }

// const deleteUser = async (req, res) => {
//     try {
//         const { id } = req.params;

//         const deletedUser = await userModel.findByIdAndDelete(id);

//         if (!deletedUser) {
//             return res.status(404).json("User not found");
//         }

//         console.log(deletedUser);
//         res.status(200).json(deletedUser);
//     } catch (error) {
//         console.error("Error:", error);
//         res.status(500).json("Internal Server Error");
//     }
// };

// export default{
//     create,
//     login,
//     registerUser,
//     getUserData,
//     getIndividualUser,
//     deleteUser,
//     updateUserData
// }

import auth from '../common/auth.js'; // Importing the auth module

import userModel from '../models/user.js';

const create = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await auth.hashPassword(password); // Correct usage of hashPassword from auth module

    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ message: 'Internal Server error' });
  }
};


const login = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ message: `Account with ${req.body.email} does not exist` });
    }

    const passwordMatch = await auth.hashCompare(req.body.password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: `Invalid Password` });
    }

    // Reusing the token generated during sign-up
    const token = await auth.createToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status
    });

    const userData = await userModel.findOne({ email: req.body.email }, { _id: 0, password: 0, createdAt: 0, email: 0 });
    
    res.status(200).json({
      message: "Login Successful",
      token,
      userData
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



const registerUser = async (req, res) => {
  const { name, email, mobile, add, status, role, desc, password } = req.body;

  try {
    if (!name || !email || !password || !status || !add || !role || !mobile || !desc) {
      return res.status(400).json({ message: "Please fill in all the required fields." });
    }

    const prenumber = await userModel.findOne({ mobile: mobile });
    const preUser = await userModel.findOne({ email: email });

    if (preUser) {
      return res.status(400).json({ message: `${req.body.email} is already present.` });
    }

    if (prenumber) {
      return res.status(400).json({ message: `${req.body.mobile} is already present.` });
    }

    const hashedPassword = await auth.hashPassword(password);

    const newUser = new userModel({
      name, status, add, role, email, mobile, desc, password: hashedPassword
    });

    await newUser.save();

    res.status(201).json({ message: "User Created Successfully", newUser });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getUserData = async (req, res) => {
  try {
    const userData = await userModel.find();
    const totalUsers = await userModel.countDocuments({ role: 'user' });
    const activeUsers = await userModel.countDocuments({ status: 'Active' });
    const inactiveUsers = await userModel.countDocuments({ status: 'InActive' });

    res.status(200).json({ userData, totalUsers, activeUsers, inactiveUsers });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const getIndividualUser = async (req, res) => {
  try {
    const { id } = req.params;
    const userIndividual = await userModel.findById(id);

    if (!userIndividual) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(userIndividual);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

const updateUserData = async (req, res) => {
  try {
    const { id } = req.params;
    req.body.password = await auth.hashPassword(req.body.password);
    const updateduser = await userModel.findByIdAndUpdate(id, req.body, { new: true });

    res.status(201).json(updateduser);
  } catch (error) {
    res.status(400).json(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await userModel.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json("User not found");
    }

    res.status(200).json(deletedUser);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


export default {
    create,
    login,
    registerUser,
    getUserData,
    getIndividualUser,
    updateUserData,
    deleteUser
  };
  