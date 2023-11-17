import { Request, Response } from 'express';
import SoapClient from '../clients/SoapClient';


const SubRequestController = {
    getSubRequestOf: async (req: Request, res: Response) => {
        const requestee = req.params.requestee;
        try {
            const response = await SoapClient.getRequestOf(requestee);
            res.status(200).json({ response });
        } catch (error) {
            res.status(500).json({ message: 'Failed' });
        }
    },

    approveSubRequest: async (req: Request, res: Response) => {
        const requestBy = req.body.requestBy;
        const to = req.body.to;
        try {
            const response = await SoapClient.approveRequest(requestBy, to);
            res.status(200).json({ response });
        } catch (error) {
            res.status(500).json({ message: 'Failed' });
        }
    },

    rejectSubRequest: async (req: Request, res: Response) => {  
        const requestBy = req.body.requestBy;
        const to = req.body.to;
        try {
            const response = await SoapClient.rejectRequest(requestBy, to);
            res.status(200).json({ response });
        } catch (error) {
            res.status(500).json({ message: 'Failed' });
        }
    },
}

export default SubRequestController;