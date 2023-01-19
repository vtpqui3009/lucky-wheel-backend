import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';

import {User} from "../model/User.js";

//signup a user
const signup = async (req, res, next) => {
    try {
        const totalUsers = await User.find();
        
        if (Array.from(totalUsers).length >= 2) {
            return res.status(403).json({message: "Người yêu tôi mới được xài app này, xin cảm ơn các bạn vì đã tải app. Chào thân ái!"});
        }
        
        
        const {username, email, password, role} = req.body;
        
        const hashedPassword = await bcrypt.hash(password, 12);
        
        await User.create({
            username,
            email,
            password: hashedPassword,
            role
        });
        
        return res.status(200).json({message: "user created"});
        
    } catch (error) {
        console.log(error);
    }
};

//login user
const login = async (req, res, next) => {
    try {
        const {email, password} = req.body;
        
        if (!email || !password) {
            return res.status(400).json({
                message: "Quên nhập email hoặc mật khẩu kìa em yêu ơi!",
            });
        }
        
        const user = await User.findOne({email});
        
        if (!user) {
            return res.status(400).json({
                message: "Em nhập sai email kìa!",
            });
        }
        
        const comparePassword = await bcrypt.compare(req.body.password, user.password);
        
        if (!comparePassword) {
            return res.status(401).json({
                message: "Sai mật khẩu rồi em yêu ơi!",
            });
        }
        
        if (user && comparePassword && email === "ttvyisqui's@gmail.com" && password === 'vylacuaqui' || user.role === 'admin') {
            const token = jwt.sign({email: req.body.email}, 'secret', {expiresIn: '1h'});
            return res.status(200).json({
                message: user.role === 'admin' ? 'Go' : "Ok em tới đây đi em yêu",
                "token": token,
                'currentUser': user
            });
        }
        
    } catch (error) {
        console.log(error);
    }
};

// index user
const index = async (req, res, next) => {
    try {
        
        const users = await User.find();
        
        return res.status(200).json({"All users": users});
        
    } catch (error) {
        console.log(error);
    }
};

// index user by id
const indexById = async (req, res, next) => {
    try {
        
        const existingUser = await User.findById(req.params.id);
        
        if (!existingUser) {
            return res.status(400).json({message: "Who are you ?"});
        }
        
        return res.status(200).json({user: existingUser});
        
    } catch (error) {
        console.log(error);
    }
};


// delete user
const deleteUser = async (req, res, next) => {
    try {
        
        const user = await User.findById(req.params.id);
        await user.remove();
        return res.status(200).json({message: "Delete user successfully"});
        
    } catch (error) {
        console.log(error);
    }
};
const isAuth = (req, res, next) => {
    
    const authHeader = req.get("Authorization");
    
    if (!authHeader) {
        return res.status(401).json({message: 'not authenticated'});
    }
    
    const token = authHeader.split(' ')[1];
    
    let decodedToken;
    
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        return res.status(500).json({message: err.message || 'could not decode the token'});
    }
    
    if (!decodedToken) {
        return res.status(401).json({message: 'unauthorized'});
    } else {
        return res.status(200).json({message: 'here is your resource'});
    }
    
};


export {signup, login, index, deleteUser, indexById, isAuth};
