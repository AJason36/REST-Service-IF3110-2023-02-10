import { user_role } from '@prisma/client';
import prisma from '../prismaClient';

export type User = {
    username: string;
    email: string | null;
    fullName: string;
    password: string;
    role: user_role;
}

export type UserCreateArgs = {
    username: string;
    email: string;
    fullName: string;
    password: string;
    role: user_role;
}

export type UserUpdateArgs = {
    fullName?: string;
    email?: string;
    role?: user_role;
}

export type UserFindUniqueArgs = {
    username?: string;
    email?: string;
}

export type UserFindArgs = {
    fullName?: string;
    role?: user_role;
}

export type UserExistsArgs = {
    username?: string;
    email?: string;
    fullName?: string;
    role?: user_role;
}

export type UserExistsOutput = {
    exists: boolean;
}

export type UserAuthArgs = {
    username: string;
    password: string;
}