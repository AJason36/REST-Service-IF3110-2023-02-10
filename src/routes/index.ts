import { Router } from "express";
import userRoutes from "./userRoutes";
import requestRoutes from './requestRoutes';
import UserController from "../controllers/UserController"
import PremiumBookController from "../controllers/PremiumBookController";
import BookCollectionController from "../controllers/BookCollectionController";
import { authenticateAuthor,authenticateCurator,authenticateUser } from "../middlewares/auth";

const router : Router = Router();

router.use('/user', userRoutes);
router.post('/login', UserController.authorizeUser);
router.post('/register', UserController.createUser);
router.post('/regis-curator', UserController.createCurator);

router.use('/premium-details/:bookId', authenticateUser);
router.get('/premium-details/:bookId', PremiumBookController.getPremiumBookById);
//author routes
router.use('/premium', authenticateAuthor)
router.use('/premium-book', authenticateAuthor)
router.post('/premium', PremiumBookController.createPremiumBook);
router.put('/premium/:bookId', PremiumBookController.updatePremiumBook);
router.get('/premium-book', PremiumBookController.getPremiumBookByAuthor);

//curator routes
router.use('/collection', authenticateCurator)
// router.get('/collection', BookCollectionController.getAllCollections);
router.get('/collection', BookCollectionController.getBookInCollection);
router.get('/collection/premium', PremiumBookController.getAllPremiumBooks);
router.post('/collection', BookCollectionController.createBookCollection);
router.put('/collection/:collectionId', BookCollectionController.updateBookCollection);
router.delete('/collection/:bookId', BookCollectionController.deleteBookFromCollection);
router.post('/collection/:bookId', BookCollectionController.addBookToCollection);

// request (soap) routes
router.use('/request', requestRoutes);


export default router;