const jwtDecode = require('jwt-decode');
const mongoose = require('mongoose');

const articleModels = require('../../models/admin/articles');
const categoryModels = require('../../models/admin/blogCategories');

const mInsert = async (req, res) => {
    const categories = {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.categoryName,
    }

    const data = {
        title: req.body.title,
        contents: req.body.contents,
        //$or: [{categories: categories._id}, {categories: req.body.categoryId}],
        
        //categories: req.body.categoryId,
        categories: categories._id,

        author: jwtDecode( req.headers['x-access-token']).id,
        images: req.body.images,
        tags: req.body.tags,
    }


    return await articleModels.create(data, (err) => {
        if (err) {
            res.json(err)
        }
        else {

            categoryModels.create(categories, (err) => {
                if (err) {
                    res.json(err)
                }
                else {
                    res.json({
                        status: 'success',
                        message: 'Insert article is successfully!',
                    })
                }
            })
            
        }
    })
}

const mShowAll = async (req, res) => {
    return await articleModels.find({})
                                .populate('categories')
                                .exec( (err, result) => {
                                    if (err) {
                                        res.json(err)
                                    }
                                    else {
                                        res.json({
                                            status: 'success',
                                            message: 'Insert article is successfully!',
                                            data: result,
                                        })
                                    }
                                })
}

const mShowId = async (req, res) => {
    return await articleModels.findOne({_id: req.params.articleId})
                                .populate('categories')
                                .exec( (err, result) => {
                                if (err) {
                                    res.json(err)
                                }
                                else {
                                    res.json({
                                        status: 'success',
                                        message: 'Insert article is successfully!',
                                        data: result,
                                    })
                                }
                            })
}

const mUpdate = async (req, res) => {
    const data = {
        $or: [
            {title: req.body.title},
            {contents: req.body.contents},
            {categories: req.body.categoryIds},
            {author: jwtDecode( req.headers['x-access-token']).id},
            {images: req.body.images},
            { tags: req.body.tags},
        ]
    }

    return await articleModels.findOneAndUpdate({_id: req.params.articleId}, data)
                                .exec( (err, result) => {
                                    if (err) {
                                        res.json(err)
                                    }
                                    else {
                                        res.json({
                                            status: 'success',
                                            message: 'Insert article is successfully!',
                                        })
                                    }
                                })
}

const mDelete = async (req, res) => {
    return await articleModels.findOneAndDelete({_id: req.params.articleId})
                                .exec( (err, result) => {
                                    if (err) {
                                        res.json(err)
                                    }
                                    else {
                                        res.json({
                                            status: 'success',
                                            message: 'Insert article is successfully!',
                                        })
                                    }
                                })
}


const mSearchBykeyWord = async (req, res) => {
    return await articleModels.find({$or: [{title: {$regex: req.body.key}}, {contents: {$regex: req.body.key}}]} )
                                .exec( (err, result) => {
                                    if (err) {
                                        res.json(err)
                                    }
                                    else {
                                        res.json({
                                            status: 'success',
                                            message: 'Find article is successfully!',
                                            data: result,
                                        });
                                    }
                                });
}

const mSortByCategories = async (req, res) => {
    console.log(articleModels.model)
    return await articleModels.find({categories: req.body.categoryName} )
                                .populate('categories')
                                .exec( (err, result) => {
                                    if (err) {
                                        res.json(err)
                                    }
                                    else {
                                        res.json({
                                            status: 'success',
                                            message: 'Sort article by category is successfully!',
                                            data: result,
                                        });
                                    }
                                })
}
module.exports = {
    showAll: mShowAll,
    insert: mInsert,
    showId: mShowId,
    update: mUpdate,
    delete: mDelete,
    searchBykeyWord: mSearchBykeyWord,
    sortByCategories: mSortByCategories,
}