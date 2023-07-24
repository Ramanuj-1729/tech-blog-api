import Joi from 'joi';
import CommentsAndRatings from '../models/CommentsAndRatings';
import CustomErrorHandler from '../services/CustomErrorHandler';
import Query from '../models/Query';

const queryController = {
    // create query 
    async createQuery(req, res, next) {

        const querySchema = Joi.object({
            userName: Joi.string().required(),
            email: Joi.string().email().required(),
            message: Joi.string().required(),
        });
        const { error } = querySchema.validate(req.body);
        if (error) {
            return next(error);
        }

        const { userName, email, message } = req.body;
        let queryDocument;

        try {
            queryDocument = await Query.create({
                userName,
                email,
                message
            });

        } catch (err) {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
        }


        res.status(201).json(queryDocument);
    },

    //Get All queries
    async getAllQuery(req, res, next) {
        try {
            const queries = await Query.find();
            res.status(200).json(queries);
        } catch (err) {
            if (err) {
                return next(CustomErrorHandler.serverError(err.message));
            }
        }
    },
}

export default queryController;