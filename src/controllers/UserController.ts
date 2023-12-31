import { Request, Response } from "express";
import UserService from "../services/UserService";
import { 
    User,
    UserCreateArgs,
    UserUpdateArgs,
    UserFindUniqueArgs,
    UserFindArgs,
    UserExistsArgs,
    UserExistsOutput,
} from "../models/User"
import { user_role } from "@prisma/client";
import bcrypt from "bcrypt";

const jwt = require("jsonwebtoken");

// TODO: Move validation to middleware
const validator = require('validator');

const UserController = {
    getAllUsers: async (req: Request, res: Response) => {
        try {
            const args : UserFindArgs = {};
            const users: User[] = await UserService.findUsers(args);
            if (!users) {
                return res.status(404).json({ message: "No users found" });
            }
            res.status(200).json({ users });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },
    
    getUserByUsername: async (req: Request, res: Response) => {
        const username = req.params.username;
        try {
            const args : UserFindUniqueArgs = { username: username };
            const user: User | null = await UserService.findUniqueUser(args);

            if (!user) {
                return res.status(404).json({ message: `User ${username} not found` });
            }
            res.status(200).json({ user });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },
    
    isUserExists: async (req: Request, res: Response) => { 
        const username = req.params.username;
        try {
            const args : UserExistsArgs = { username: username };
            const userExists: UserExistsOutput = await UserService.userExists(args);
            res.status(200).json({ userExists });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },
    
    createUser: async (req: Request, res: Response) => {
        console.log("Create User Request in at: " + new Date().toISOString() + " with body: " + JSON.stringify(req.body));
        const { username, email, fullName, password } = req.body;
        try {
            if (!username || !email || !fullName || !password) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            const userExist = await UserService.userExists({ username: username });
            if (userExist.exists) {
                return res.status(400).json({ error: "Username already exists" });
            }

            const emailExist = await UserService.userExists({ email: email });
            if (emailExist.exists) {
                return res.status(400).json({ error: "Email already exists" });
            }

            const args : UserCreateArgs = { username, email, fullName, password, role: user_role.author };
            const user: User | null = await UserService.createUser(args);
            if (!user) {
                return res.status(500).json({ error: "Unexpected error" });
            }
            res.status(200).json({ status: user,msg: user.username +" Berhasil Registrasi" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },

    createCurator: async (req: Request, res: Response) => {
        console.log("Create Curator Request in at: " + new Date().toISOString() + " with body: " + JSON.stringify(req.body));
        const { username, email, fullName, password } = req.body;
        try {
            if (!username || !email || !fullName || !password) {
                return res.status(400).json({ error: "Missing required fields" });
            }
            
            if (!validator.isEmail(email)) {
                return res.status(400).json({ error: "Invalid email format" });
            }

            const userExist = await UserService.userExists({ username: username });
            if (userExist.exists) {
                return res.status(400).json({ error: "Username already exists" });
            }

            const emailExist = await UserService.userExists({ email: email });
            if (emailExist.exists) {
                return res.status(400).json({ error: "Email already exists" });
            }

            const args : UserCreateArgs = { username, email, fullName, password, role: user_role.curator };
            const user: User | null = await UserService.createCurator(args);
            if (!user) {
                return res.status(500).json({ error: "Unexpected error" });
            }
            res.status(200).json({ status: user,msg: user.username +" Berhasil Registrasi" });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },
    
    authorizeUser: async (req: Request, res: Response) => {
        const { username, password } = req.body;
        try {
            const user: User | null = await UserService.authorizeUser({ username: username, password: password });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }
            const match: boolean = await UserService.authorizePass({ username: username, password: password });
            if (!match) {
                return res.status(401).json({ error: "Wrong password" });
            }
            
            const accessToken:string = jwt.sign({ username: user.username, email:user.email, fullname:user.fullName, role:user.role}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "7d",
            });
            res.status(200).json({ message:"Logged in as "+user.username+" role: "+user.role, accessToken: accessToken });
        } catch (error) {
            res.status(500).json({ error: "Internal server error" });
        }
    },
 
}

export default UserController;