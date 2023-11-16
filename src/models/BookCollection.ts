import prisma from '../prismaClient';

export type BookCollection = {
    collectionId: number;
    createdBy: string;
    desc: string|null;
    createdAt: Date;
    updatedAt: Date;
}

export type BookCollectionCreateArgs = {
    createdBy: string;
    desc: string | null;
}

export type BookCollectionUpdateArgs = {
    desc?: string | null;
}

export type BookCollectionFindUniqueArgs = {
    collectionId?: number;
    createdBy?: string;
}

export type BookCollectionFindArgs = {
    collectionId?: number;
}