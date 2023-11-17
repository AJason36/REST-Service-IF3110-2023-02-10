import { Request, Response } from "express";
import BookCollectionService from "../services/BookCollectionService";
import ModifyCollectionService from "../services/ModifyCollectionService";
import {
    BookCollection,
    BookCollectionCreateArgs,
    BookCollectionUpdateArgs,
    BookCollectionFindUniqueArgs,
} from "../models/BookCollection"
import prisma from "../prismaClient"

const BookCollectionController = {
    createBookCollection: async (req: Request, res: Response) => {
        const { desc } = req.body;
        const createdBy = res.locals.user.username;

        try {
            const args: BookCollectionCreateArgs = {
                createdBy: createdBy,
                desc: desc ?? null,
            }

            const created: BookCollection | null = await BookCollectionService.createBookCollection(args);
            if (!created) {
                return res.status(500).json({ message: "Failed to create book collection" });
            }
            res.status(200).json({ created });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },

    updateBookCollection: async (req: Request, res: Response) => {
        const collectionId = parseInt(req.params.collectionId);
        const { desc } = req.body;
        const createdBy = res.locals.user.username;

        try {
            const args: BookCollectionUpdateArgs = {
                desc: desc ?? null,
            }

            const updated: BookCollection | null = await BookCollectionService.updateBookCollection(collectionId, args);
            if (!updated) {
                return res.status(500).json({ message: "Failed to update book collection" });
            }
            res.status(200).json({ updated });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },

    getBookInCollection: async (req: Request, res: Response) => { 
        const createdBy = res.locals.user.username;
        try {
            const collection: BookCollection | null = await BookCollectionService.findCollectionById({
                createdBy: createdBy,
            });
            if (!collection) {
                return res.status(404).json({ message: `Book collection by ${createdBy} not found` });
            }
            const books = await ModifyCollectionService.getBooksInCollection(collection.collectionId);
            res.status(200).json({ books });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },
    getBookInCollectionPhp: async (req: Request, res: Response) => { 
        try {
            const collectionId = parseInt(req.params.collectionId);
            const books = await ModifyCollectionService.getBooksInCollection(collectionId);
            if (!books) {
                return res.status(404).json({ message: `Book collection by ${collectionId} not found` });
            }
            res.status(200).json({ books });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },

    getBookCollectionById: async (req: Request, res: Response) => {
        // const collectionId = parseInt(req.params.collectionId);
        const createdBy = res.locals.user.username;

        try {
            const args: BookCollectionFindUniqueArgs = {
                // collectionId: collectionId,
                createdBy: createdBy,
            }

            const found: BookCollection | null = await BookCollectionService.findCollectionById(args);
            if (!found) {
                return res.status(404).json({ message: `Book collection ${createdBy} not found` });
            }
            res.status(200).json({ found });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },

    getAllCollections: async (req: Request, res: Response) => {
        try {
            const found: BookCollection[] | null = await BookCollectionService.findAllCollection();
            if (!found) {
                return res.status(404).json({ message: `No book collections found` });
            }
            res.status(200).json({ found });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },

    deleteBookFromCollection: async(req: Request, res: Response)=> {
        const createdBy = res.locals.user.username;
        try {
            const bookId = req.params.bookId;
            const collection: BookCollection | null = await BookCollectionService.findCollectionById({
                createdBy: createdBy,
            });
            if (!collection) {
                return res.status(404).json({ message: `Book collection by ${createdBy} not found` });
            }
            const success = await ModifyCollectionService.removeBookFromCollection(collection.collectionId, parseInt(bookId));
    
            if (success) {
                res.json({ message: 'Book deleted from collection successfully.' });
            } else {
                res.status(500).json({ error: 'Error deleting book from collection.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },
    
    addBookToCollection: async (req: Request, res: Response) => {
        const createdBy = res.locals.user.username;
        try {
            const bookId = req.params.bookId;
            const collection: BookCollection | null = await BookCollectionService.findCollectionById({
                createdBy: createdBy,
            });
            if (!collection) {
                return res.status(404).json({ message: `Book collection by ${createdBy} not found` });
            }
            const success = await ModifyCollectionService.addBookToCollection(collection.collectionId, parseInt(bookId));

            if (success) {
                res.json({ message: 'Book added to collection successfully.' });
            } else {
                res.status(500).json({ error: 'Error adding book to collection.' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}

export default BookCollectionController;
