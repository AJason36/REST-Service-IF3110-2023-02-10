import { Request, Response } from "express";
import PremiumBookService from "../services/PremiumBookService";
import {
    PremiumBook,
    PremiumBookCreateArgs,
    PremiumBookUpdateArgs,
    PremiumBookFindUniqueArgs,
    PremiumBookFindArgs,
} from "../models/PremiumBook"
import prisma from "../prismaClient";

const PremiumBookController = {
    getAllPremiumBooks: async (req: Request, res: Response) => {
        try {
            const books: PremiumBook[] = await PremiumBookService.findAllBooks();
            if (!books) {
                return res.status(404).json({ message: "No books found" });
            }
            res.status(200).json({ books });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },

    getPremiumBookById: async (req: Request, res: Response) => {
        const bookId = parseInt(req.params.bookId);
        try {
            const args: PremiumBookFindUniqueArgs = { book_id: bookId };
            const book: PremiumBook | null = await PremiumBookService.findBookById(args);

            if (!book) {
                return res.status(404).json({ message: `Book ${bookId} not found` });
            }
            res.status(200).json({ book });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    },

    getPremiumBookByAuthor: async (req: Request, res: Response) => {
        const createdBy = res.locals.user.username;
        try {
            const where = { createdBy: createdBy };
            const args: PremiumBookFindArgs = { 
                ...where
            };
            const books: PremiumBook[] = await PremiumBookService.findBooksByAuthor(args);

            if (!books) {
                return res.status(404).json({ message: `Book not found` });
            }
            res.status(200).json({ books });
        } catch (error) {
            res.status(500).json({ message: "Find Book by Author Failed" });
        }
    },

    createPremiumBook: async (req: Request, res: Response) => {
        const user = await prisma.user.findUnique({
            where: {
                username: res.locals.user.username,
            },
        });

        const { title, genre, year, content, duration, audioPath } = req.body;
        // console.log(req.body);
        try {
            if (!title || !genre || !year || !content || !duration || !audioPath) { 
                return res.status(400).json({ message: "Missing required fields" });
            }

            if (year.toString().length !== 4) { 
                return res.status(400).json({ message: "Invalid year" });
            }

            const args: PremiumBookCreateArgs = {
                title: title,
                genre: genre,
                year: year,
                content: content,
                duration: duration,
                audioPath: audioPath,
                createdBy: user?.username? user.username : ""
            };
            const created: PremiumBook | null = await PremiumBookService.createPremiumBook(args);
            if (!created) {
                return res.status(500).json({ message: "Failed to create book" });
            }
            res.status(200).json({ msg: created });
        } catch (error) {
            res.status(500).json({ message: "Failed to create book" });
        }
    },

    updatePremiumBook: async (req: Request, res: Response) => { 
        const bookId = parseInt(req.params.bookId);
        const {title, genre, year, content, duration, audioPath} = req.body;
        try {
            if (year.toString().length !== 4) { 
                return res.status(400).json({ message: "Invalid year" });
            }

            const args: PremiumBookUpdateArgs = {
                title: title,
                genre: genre,
                year: year,
                content: content,
                duration: duration,
                audioPath: audioPath
            };
            const updated: PremiumBook | null = await PremiumBookService.updatePremiumBook(bookId, args);
            if (!updated) {
                return res.status(500).json({ message: "Failed to update book" });
            }
            res.status(200).json({ msg: updated });
        } catch (error) {
            res.status(500).json({ message: "Failed" });
        }
    }
}

export default PremiumBookController;