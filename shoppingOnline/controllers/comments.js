const CommentModels = require('../models/comments');
const ReportModels = require('../models/reports');
const jwtDecoded = require('jwt-decode');
//const jwt = require('jsonwebtoken'); 


const mInsertComment = async (req, res) => {
    const userId = jwtDecoded(req.headers['x-access-token']).id;
    return await CommentModels.create({contents: req.body.comment, user: userId, Product: req.params.productId}, (err) => {
        if  (err) {
            return res.json(err);
        }
        return res.json({
            status: 'success',
            message: 'Insert comment is successfully!'
        });
    });
                          
}

const mInsertReport = async (req, res) => {
    const userId = jwtDecoded(req.headers['x-access-token']).id;
    return await ReportModels.create({contents: req.body.report, rate: req.body.star , user: userId, Product: req.params.productId}, (err) => {
        if  (err) {
            return res.json(err);
        }
        return res.json({
            status: 'success',
            message: 'Insert report is successfully!'
        });
    });
                          
}

module.exports = {
    comment: mInsertComment,
    report: mInsertReport,
}

