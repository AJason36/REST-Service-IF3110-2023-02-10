import { book_collection as PrismaCollection } from "@prisma/client"
import {
    BookCollection, BookCollectionCreateArgs, BookCollectionUpdateArgs, BookCollectionFindUniqueArgs,
} from "../models/BookCollection"  
import prisma from "../prismaClient"

const BookCollectionService = {
    // create a book collection
    createBookCollection: async (data: BookCollectionCreateArgs): Promise<BookCollection | null> => {
        try {
            const created: PrismaCollection = await prisma.book_collection.create({
                data: {
                    created_by: data.createdBy ?? null,
                    desc: data.desc ?? '',
                    created_at: new Date()
                },
            });
            return BookCollectionService.mapPrismaCollectionToBookCollection(created);
        } catch (error) {
            console.error('Error creating book collection:', error);
            return null;
        }
    },

    // update a book collection
    updateBookCollection: async (collectionId: number, data: BookCollectionUpdateArgs): Promise<BookCollection | null> => {
        try {
            const updated: PrismaCollection = await prisma.book_collection.update({
                where: {
                    collection_id: collectionId,
                },
                data: {
                    desc: data.desc??'',
                }
            }
            )
            return BookCollectionService.mapPrismaCollectionToBookCollection(updated);
        } catch (error) {
            console.error('Error updating book collection:', error);
            return null;
        }
    },

    // find collection by id
    findCollectionById: async (args: BookCollectionFindUniqueArgs): Promise<BookCollection | null> => { 
        try {
            const found: PrismaCollection | null = await prisma.book_collection.findUnique({
                where: {
                    collection_id: args.collectionId,
                    created_by: args.createdBy
                }
            })
            return found ? BookCollectionService.mapPrismaCollectionToBookCollection(found) : null;
        } catch (error) {
            console.error('Error finding book collection:', error);
            return null;
        }
    },

    //find all collection
    findAllCollection: async (): Promise<BookCollection[]> => {
        try {
            const found: PrismaCollection[] = await prisma.book_collection.findMany({})
            return found.map(BookCollectionService.mapPrismaCollectionToBookCollection)
        } catch (error) {
            console.error('Error finding book collection:', error);
            return [];
        }
    },

    // map prisma book to book
    mapPrismaCollectionToBookCollection: (prismaCollection: PrismaCollection): BookCollection => {
        return {
            collectionId: prismaCollection.collection_id,
            createdBy: prismaCollection.created_by ?? '',
            desc: prismaCollection.desc,
            createdAt: prismaCollection.created_at,
            updatedAt: prismaCollection.updated_at ?? new Date(0)
        }
    }
}

export default BookCollectionService;