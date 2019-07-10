const jwtDecode = require('jwt-decode');

const categoryModels = require('../../models/admin/blogCategories');

const mInsert = async (req, res) => {
    const data = {
        title: req.body.title,
        contents: req.body.contents,
        categories: req.body.categoryIds,
        author: jwtDecode( req.headers['x-access-token']).id,
        images: req.body.images,
        tags: req.body.tags,
    }


    return await articleModels.create(data, (err) => {
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

const mShowAll = async (req, res) => {
    return await articleModels.find({})
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
        title: req.body.title,
        contents: req.body.contents,
        categories: req.body.categoryIds,
        author: jwtDecode( req.headers['x-access-token']).id,
        images: req.body.images,
        tags: req.body.tags,
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

module.exports = {
    showAll: mShowAll,
    insert: mInsert,
    showId: mShowId,
    update: mUpdate,
    delete: mDelete,
}