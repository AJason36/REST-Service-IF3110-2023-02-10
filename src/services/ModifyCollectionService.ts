import prisma from "../prismaClient"
import { in_collection as inCollection } from "@prisma/client";
import BookCollectionService from "./BookCollectionService";

const ModifyCollectionService = {
    // Remove book from book collection
    async removeBookFromCollection(collectionId: number, bookId: number): Promise<boolean> {
        try {
            await prisma.in_collection.delete({
                where: {
                    collection_id_book_id: {
                        collection_id: collectionId,
                        book_id: bookId,
                    },
                },
            });
            return true;
        } catch (error) {
            console.error('Error removing book from collection:', error);
            return false;
        }
    },

    // Check if a book is in the book collection
    async isBookInCollection(collectionId: number, bookId: number): Promise<boolean> {
        try {
            const count = await prisma.in_collection.count({
                where: {
                    AND: [
                        { collection_id: collectionId },
                        { book_id: bookId }
                    ]
                },
            });
            return count > 0;
        } catch (error) {
            console.error('Error checking if book is in collection:', error);
            return false;
        }
    },

    // Add book to book collection
    async addBookToCollection(collectionId: number, bookId: number): Promise<boolean> {
        try {
            await prisma.in_collection.create({
                data: {
                    collection_id: collectionId,
                    book_id: bookId,
                },
            });
            return true;
        } catch (error) {
            console.error('Error adding book to collection:', error);
            return false;
        }
    },

    async getBooksInCollection(collectionId: number): Promise<{collection_id: number, book_id: number, title:string, author:string|null}[]> {
        const booksInCollection = await prisma.in_collection.findMany({
            include: {
                premium_book: true,    
            },
            where: {
                collection_id: collectionId,
            },
        });
      
        return booksInCollection.map((book) => {
            return {
                collection_id: book.collection_id,
                book_id: book.premium_book.book_id,
                title: book.premium_book?.title,
                author: book.premium_book?.created_by,
            };
        });
    },
    async isBookExistInCollection(collectionId: number, bookId: number): Promise<boolean> { 
        try {
            const found: inCollection | null = await prisma.in_collection.findUnique({
                where: {
                    collection_id_book_id: {
                        collection_id: collectionId,
                        book_id: bookId,
                    },
                },
            });
            return found ? true : false;
        } catch (error) {
            console.error('Error finding book collection:', error);
            return false;
        }
    }
}

export default ModifyCollectionService;