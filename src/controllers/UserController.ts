import { Request, Response } from "express";

const UserController = {
    getAllUsers: async (req: Request, res: Response) => {
        try {
            res.status(200).json({ message: "All users fetched" });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },
    getUserById: async (req: Request, res: Response) => {
        const userId = req.params.userId;
        try {
            res.status(200).json({ message: `User ${userId} fetched` });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },
}

export default UserController;