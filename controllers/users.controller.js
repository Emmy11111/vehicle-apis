const User = require("../models/Users");
const bcrypt = require('bcrypt');
const { jwtSign } = require("../util/jwt");

exports.registerUser = async (req, res) => {
    try {

        const { username, email, password, phoneNumber,nationalId } = req.body;

        const exist = await User.findOne({ email: email });
        if (exist){
            return res.status(400).send({status: false,message: "Email already exists, please try different email addreress"});    
        }

        const newUser = new User({
            username, email, password: await hashText(password), phoneNumber,nationalId
        });

        const userInfo = await newUser.save();
        const token = await jwtSign({id: userInfo?.id?.toString(), email: userInfo?.email,username: userInfo?.username,phoneNumber: userInfo.phoneNumber })
        
        return res.status(201).send({message: "Account created successfully!",status: true,access_token: token});

    }
    catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }
}

async function hashText(text) {
    const saltRounds = 10;
    try {
      const hash = await bcrypt.hash(text, saltRounds);
      return hash;
    } catch (error) {
      console.error('Error hashing password:', error);
    }
}
  
exports.Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userInfo = await User.findOne({
                email: email
        });

        if (userInfo) {
            const hashedPassword = userInfo?.password;

            const result = await bcrypt.compare(password ? password : "", hashedPassword);
            
            if (result) {
                const token = await jwtSign({id: userInfo?.id?.toString(), email: userInfo?.email,username: userInfo?.username,phoneNumber: userInfo.phonNumber });
                return res.json({message: "Signed in successfully!",status: true,access_token: token});
            }
        }

        return res.status(400).json({message: "Incorrect email or password",status: false,access_token: null});
    }
    catch (error) {
        return res.status(400).send(error);
    }
}

exports.getLoggedInUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await getUserById(id);

        if (!user) {
            return res.status(401).json("No such user found");
        }

        return res.json(user);
    }
    catch (error) {
        res.status(400).json(error)
    }
}

const getUserById = async (id) => {
    const user = await User.findById(id);
    return user;
}
  