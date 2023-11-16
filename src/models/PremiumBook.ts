// premium_book.model.ts
import { Prisma } from '@prisma/client';

export type PremiumBook ={
  book_id: number;
  createdBy?: string | null;
  title: string;
  genre: string;
  year: number;
  content: string;
  duration: number;
  audioPath: string;
}

export type PremiumBookCreateArgs ={
  title: string;
  genre: string;
  year: number;
  content: string;
  duration: number;
  audioPath: string;
  createdBy: string;
}

export type PremiumBookUpdateArgs = {
    title?: string;
    genre?: string;
    year?: number;
    content?: string;
    duration?: number;
    audioPath?: string;
}

export type PremiumBookFindUniqueArgs = {
    book_id?: number;
    title?: string;
}

export type PremiumBookFindArgs = {
    title?: string;
    createdBy?: string;
}

export type PremiumBookExistsArgs = {
    book_id?: number;
    title?: string;
    genre?: string;
    year?: number;
}

export type PremiumBookExistsOutput = {
    exists: boolean;
}

