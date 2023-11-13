import { PrismaClient, user as PrismaUser } from "@prisma/client"

import { 
    User,
    UserCreateArgs,
    UserUpdateArgs,
    UserFindUniqueArgs,
    UserFindArgs,
    UserExistsArgs,
    UserExistsOutput,
} from "../models/User"

import prisma from "../prismaClient"

const UserService = {
    // create a user
    createUser: async (data: UserCreateArgs): Promise<User | null> => {  
        try {
            const created: PrismaUser = await prisma.user.create({
                data: {
                    username: data.username,
                    email: data.email,
                    full_name: data.fullName,
                    password: data.password,
                    role: data.role,
                },
            });
            return UserService.mapPrismaUserToUser(created);
        } catch (error) {
            console.error('Error creating user:', error);
            return null;
        }  
    },

    // update a user
    updateUser: async (username: string, data: UserUpdateArgs): Promise<User | null> => {
        try {
            const updated: PrismaUser = await prisma.user.update({
                where: {
                    username: username,
                },
                data: {
                    full_name: data.fullName,
                    email: data.email,
                    role: data.role,
                },
            });
            return UserService.mapPrismaUserToUser(updated);
        } catch (error) {
            console.error('Error updating user:', error);
            return null;
        }
    },

    // find a user by username or email
    findUniqueUser: async (args: UserFindUniqueArgs): Promise<User | null> => {
        try {
            const found: PrismaUser | null = await prisma.user.findUnique({
                where: {
                    username: args.username,
                    email: args.email,
                },
            });
            return found ? UserService.mapPrismaUserToUser(found) : null;
        } catch (error) {
            console.error('Error finding user:', error);
            return null;
        }
    },

    // find users by full name or role
    findUsers: async (args: UserFindArgs): Promise<User[]> => {
        try {
            const found: PrismaUser[] = await prisma.user.findMany({
                where: {
                    full_name: args.fullName,
                    role: args.role,
                },
            });
            return found.map((user: PrismaUser) => UserService.mapPrismaUserToUser(user));
        } catch (error) {
            console.error('Error finding users:', error);
            return [];
        }
    },
    
    // check if a user exists
    userExists: async (args: UserExistsArgs): Promise<UserExistsOutput> => {
        try {
            const found: PrismaUser | null = await prisma.user.findFirst({
                where: {
                    username: args.username,
                    email: args.email,
                    full_name: args.fullName,
                    role: args.role,
                },
            });
            return {
                exists: found ? true : false,
            };
        } catch (error) {
            console.error('Error finding users:', error);
            return {
                exists: false,
            };
        }
    },

    // map Prisma user to User models
    mapPrismaUserToUser: (prismaUser : PrismaUser) : User => {
        return {
            username: prismaUser.username,
            email: prismaUser.email,
            fullName: prismaUser.full_name,
            password: prismaUser.password,
            role: prismaUser.role,
        }
    }
}