import { Request, Response, NextFunction } from "express";
import { JsonWebTokenError } from "jsonwebtoken";
import { user, user_role } from "@prisma/client";

const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

type Payload = {
    username: string;
    email: string;
    fullName: string;
    role: user_role;
}
  
export const verifyToken = (req: Request, res: Response, next: NextFunction) => { 
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err: any, user: any) => {
        if (err) {
            return res.status(403).json({ message: "Forbidden" });
        }
        req.body.user = user;
        next();
    });
}

export const authenticateUser = (req: Request, res: Response, next: NextFunction) =>{ 
    const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET,
    (err: JsonWebTokenError, user: Payload) => {
        if (err) return next(err);
        res.locals.user = user;
      return next();
    }
  );
}

export const authenticateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: JsonWebTokenError, user: Payload) => {
            if (err) return next(err);
            if (user.role !== user_role.author) return res.sendStatus(403);
            res.locals.user = user;
            return next();
        }
    );
}

export const authenticateCurator = (req: Request, res: Response, next: NextFunction) => { 
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: JsonWebTokenError, user: Payload) => {
            if (err) return next(err);
            if (user.role !== user_role.curator) return res.sendStatus(403);
            res.locals.user = user;
            return next();
        }
    );
}

export const authenticateAuthorByBookId = (req: Request, res: Response, next: NextFunction) => { 
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (token == null) return res.sendStatus(401);
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err: JsonWebTokenError, user: Payload) => {
            if (err) return next(err);
            if (user.role !== user_role.author) return res.sendStatus(403);
            if (user.username !== req.body.book.createdBy) return res.sendStatus(403);
            res.locals.user = user;
            return next();
        }
    );
}

