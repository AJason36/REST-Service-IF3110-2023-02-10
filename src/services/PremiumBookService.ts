import { premium_book as PrismaBook } from "@prisma/client"
import {
    PremiumBook,
    PremiumBookCreateArgs,
    PremiumBookUpdateArgs,
    PremiumBookFindUniqueArgs,
    PremiumBookFindArgs,
    PremiumBookExistsArgs,
    PremiumBookExistsOutput,
} from "../models/PremiumBook"
import prisma from "../prismaClient"

const PremiumBookService = {
    // create a premium book
    createPremiumBook: async (data: PremiumBookCreateArgs): Promise<PremiumBook | null> => {
        try {
            const created: PrismaBook = await prisma.premium_book.create({
                data: {
                    title: data.title,
                    genre: data.genre,
                    year: data.year,
                    content: data.content,
                    duration: data.duration,
                    audio_path: data.audioPath,
                    created_by: data.createdBy,
                },
            });
            return PremiumBookService.mapPrismaBookToPremiumBook(created);
        } catch (error) {
            console.error('Error creating premium book:', error);
            return null;
        }
    },

    // update a premium book
    updatePremiumBook: async (bookId: number, data: PremiumBookUpdateArgs): Promise<PremiumBook | null> => {
        try {
            const updated: PrismaBook = await prisma.premium_book.update({
                where: {
                    book_id: bookId,
                },
                data: {
                    title: data.title,
                    genre: data.genre,
                    year: data.year,
                    content: data.content,
                    duration: data.duration,
                    audio_path: data.audioPath
                }
            }
            )
            return PremiumBookService.mapPrismaBookToPremiumBook(updated);
        } catch (error) {
            console.error('Error updating premium book:', error);
            return null;
        }
    },

    // find book by id
    findBookById: async (args: PremiumBookFindUniqueArgs): Promise<PremiumBook | null> => { 
        try {
            const found: PrismaBook | null = await prisma.premium_book.findUnique({
                where: {
                    book_id: args.book_id,
                },
            });
            return found?PremiumBookService.mapPrismaBookToPremiumBook(found):null;
        } catch (error) {
            console.error('Error finding premium book by id:', error);
            return null;
        }
    },

    //find books by created id
    findBooksByAuthor: async (args: PremiumBookFindArgs): Promise<PremiumBook[]> => { 
        try {
            const found: PrismaBook[] = await prisma.premium_book.findMany({
                where: {
                    created_by: args.createdBy,
                },
            });
            return found.map((book) => PremiumBookService.mapPrismaBookToPremiumBook(book));
        } catch (error) {
            console.error('Error finding premium books by author:', error);
            return [];
        }
    },

    // find book by title
    findBookByTitle: async (args: PremiumBookFindUniqueArgs): Promise<PremiumBook | null> => { 
        try {
            const found: PrismaBook | null = await prisma.premium_book.findFirst({
                where: {
                    title: args.title,
                },
            });
            return found ? PremiumBookService.mapPrismaBookToPremiumBook(found) : null;
        }
        catch (error) { 
            console.error('Error finding premium book by title:', error);
            return null;
        }
        
    },

    findAllBooks: async (): Promise<PremiumBook[]> => { 
        try {
            const found: PrismaBook[] = await prisma.premium_book.findMany({})
            return found.map(PremiumBookService.mapPrismaBookToPremiumBook)
        } catch (error) {
            console.error('Error finding premium books:', error);
            return [];
        }
    },


    // map Prisma Book to Premium Book models
    mapPrismaBookToPremiumBook: (prismaBook: PrismaBook): PremiumBook => {
        return {
            book_id: prismaBook.book_id,
            title: prismaBook.title,
            genre: prismaBook.genre,
            year: prismaBook.year,
            content: prismaBook.content,
            duration: prismaBook.duration,
            audioPath: prismaBook.audio_path,
            createdBy:prismaBook.created_by
        }
    }
}


export default PremiumBookService;