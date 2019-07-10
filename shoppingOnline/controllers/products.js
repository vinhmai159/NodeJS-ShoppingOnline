const ProductsModel = require('../models/products');
const CategoryModel = require('../models/categories');
const mongoose = require('mongoose');
const moment = require('moment');


async function mShowAll (req, res) {
    try {
        let data = await pShowAll();
        res.json(data);
    } catch (err) {
        res.json(err);
    }
}

function pShowAll () {
    return new Promise ( (resolve, reject) => {
        ProductsModel.find({})
                    .populate('categories')
                    .exec( (err, result) => {

            if (err) return reject(err);
            return resolve({
                status: 'success',
                message: 'Show all products is successfully!',
                data: result,
            });
        });
    });
}

async function mShowId (req, res) {
    try {
        var data = await pShowId(req);
        //console.log("data")
        res.json(data);
    } catch (err) {
        res.json(err);
        console.log(err )
    }
    console.log(data)

}

function pShowId (req) {
    return new Promise ( (resolve, reject) => {
        ProductsModel.findById(req.params.productId)
                    .populate('categories')
                    .exec(  (err, result) => {

            if (err) return reject(err);
            return resolve({
                status: 'success',
                message: 'Show a products by id is successfully!',
                data: result,
            });
        });
    });
}

async function mInsert (req, res) {
    
    let cate = new CategoryModel({
        categories: req.body.categories,
        parentCategories: req.body.parentCategories,
    });
    let data = {
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        amounts: req.body.amounts,
        colors: req.body.colors,
        sizes: req.body.sizes,
        genders: req.body.genders, 
        price: req.body.price,
        salePrice: req.body.salePrice,
        hot: req.body.hot,
        sale: req.body.sale,
        categories: [cate],
    }
    try {
        let datas = await pInsert(req, data, cate);
        res.json(datas);
    } catch (err) {
        res.json(err);
    }
}

function pInsert (req, data, cate) {
    
    return new Promise ( (resolve, reject) => {
        ProductsModel.create(data, (err, result) => {
            if (err) return reject(err);

            // let cate = {
            //     // _id: req.body._id,
            //     categories: req.body.categories,
            //     parentCategories: req.body.parentCategories,
            // }
            // let cate = new CategoryModel({
            //     product: data._id,
            //     categories: '645',
            //     parentCategories: '546',
            // })
            CategoryModel.create(cate, (err) => {
                if (err) return reject(err);

                return resolve({
                    status: 'success',
                    message: 'Insert a product is successfully!',
                    data: null,
                });
            })
        });
    });
}

async function mUpdate (req, res) {
    try {
        let data = await pUpdate(req);
        res.json(data);
    } catch (err) {
        res.json(err);
    }
}

function pUpdate (req) {
    let data = {
       // _id: req.body._id,
        name: req.body.name,
        amounts: req.body.amounts,
        colors: req.body.colors,
        sizes: req.body.sizes,
        price: req.body.price,
        salePrice: req.body.salePrice,
        genders: req.body.genders,  
        categories: req.body.categories,
        hot: req.body.hot,
        sale: req.body.sale,
    }
    return new Promise ( (resolve, reject) => {
        ProductsModel.findOneAndUpdate({_id : req.params.productId}, data, (err, result) => {
            if (err) return reject(err);
            return resolve({
                status: 'success',
                message: 'Update a product is successfully!',
                old_Data: result,
            });
        });
    });
}

async function mDelete (req, res) {
    try {
        let data = await pDelete(req);
        res.json(data);
    } catch (err) {
        res.json(err);
    }
}

function pDelete (req) {
    return new Promise ( (resolve, reject) => {
        ProductsModel.findByIdAndDelete({_id: req.params.productId}, (err, result) => {
            if (err) return reject(err);
            return resolve({
                status: 'success',
                message: 'Delete a product is successfully!',
                data: null,
            });
        });
    });
}

async function mSale (req,res) {
    let condition = {
        sale: {$gt: 0},
        genders: req.body.genders,
    };
    try {
        let data = await pSaleHot(condition);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
}

async function mHot (req,res) {
    let condition = {
        hot: {$gt: 0},
        genders: req.body.genders,
    };
    try {
        let data = await pSaleHot(condition);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
}

function pSaleHot (condition) {
    return new Promise ( (resolve, reject) => {
        ProductsModel.find(condition, (err, result) => {
            if (err) {
                reject (err);
            }
            else {
                resolve ({
                    status: 'success',
                    message: 'Query sale/hot product is successfully!',
                    data: result,
                })
            }
        })
    })
}

async function mNew (req, res) {
    let condition = {
        timestamp: {$gt: ( moment().subtract(7, 'hours')  )},
    }
    try {
        let data = await pNew(condition);
        res.json(data);
    } catch (error) {
        res.json(error);
    }
}

function pNew (condition) {
   return new Promise ( (resolve, reject) => {
        ProductsModel.find(condition, (err, result) => {
            if (err) return reject(err);
            return resolve({
                status: 'success',
                message: 'Show all new products is successfully!',
                data: result,
            });
        });
    });
}

const mInsertCategories = async (req, res) => {
    const add = await ProductsModel.findOneAndUpdate({_id: req.params.productId}, { $push: { categories: req.body.categoryIds} })
                                .exec( (err, result) => {
                                    if (err) return res.json(err);
                                    return res.json({
                                        status: 'success',
                                        message: 'Insert categories for this product is successfully!',
                                        //data: result,
                                    });
                                });

    return add;
}

const mDeleteCategories = async (req, res) => {
    const add = await ProductsModel.findOneAndUpdate({_id: req.params.productId}, { $pull: { categories: req.body.categoryIds} })
                                .exec( (err, result) => {
                                    if (err) return res.json(err);
                                    return res.json({
                                        status: 'success',
                                        message: 'Remove categories for this product is successfully!',
                                        //data: result,
                                    });
                                });

    return add;
}

//search

const mSearch = async (req, res) => {
    let a = req.body.name;
    return await ProductsModel.find({name: {$regex: req.body.name}})
                                .exec( (err, result) => {
                                    if (err) return res.json(err);
                                    return res.json({
                                        status: 'success',
                                        message: 'Search product is successfully!',
                                        data: result,
                                    });
                                })
}

// sort by size, color, price
const msort = async (req, res) => {
    const condition = {
        sizes: req.body.sizes,
        colors:  req.body.colors,
        // $or: [ {colors: req.body.colors} ],
        $and: [ {price: {$gte: req.body.beforePrice }}, {price: {$lte: req.body.afterPrice } } ] 

        // 
    }
   

    if (condition.sizes == null || condition.sizes == undefined ) {
        condition.sizes = ProductsModel;
    }

    if ( condition.colors == null || condition.colors == undefined) {
        condition.colors = ProductsModel;
    }

    if (condition.$and == null || condition.$and == undefined ) {
        condition.$and = ProductsModel;
    }

    console.log(condition );
    return await ProductsModel.find(condition,  (err, result) => {
                                    
                                    if (err) return res.json(err);
                                    return res.json({
                                        status: 'success',
                                        message: 'Show all product for condition is successfully!',
                                        data: result,
                                    });
                                });
}

 const mSortGenders = async (req, res) => {
     for (el in ProductsModel) {
         console.log(el);
     }
     return await ProductsModel.find({genders: req.body.genders})
                                .exec( (err, result) => {
                                    if (err) return res.json(err);
                                    return res.json({
                                        status: 'success',
                                        message: 'Show all product for genders is successfully!',
                                        data: result,
                                    });
                                });
 }
module.exports = {
    showAll: mShowAll,
    showId: mShowId,
    insert: mInsert,
    update: mUpdate,
    delete: mDelete,
    sale: mSale,
    hot: mHot,
    new: mNew,
    insertCategories: mInsertCategories,
    removeCategories: mDeleteCategories,
    searchName: mSearch,
    sort: msort,
    sortGenders: mSortGenders,
}