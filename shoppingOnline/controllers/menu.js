const CategoryModels = require('../models/categories');
const ProductModels = require('../models/products');
 
const male = async (req, res) => {
     a = await CategoryModels.find({  categories: {$nin: null}})
                                .select('categories')
                                // .populate('categories')
                                .exec( (err, result) => {
                                    if (err) {
                                        return res.json(err);
                                    }
                                    else res.json({
                                        status: 'success',
                                        message: 'show all parent categories for gender',
                                        data: result,
                                    });
                                });
    await console.log();
    return a;
}


async function menuMale (req, res) {
    let conditon = {
        genders: 'male',
    }
    let feild = 'parentCategories';
    try {
        let result = await menu(res, conditon, feild);
        return result
    } catch (err) {
       return err;
    }
}

async function menuFemale (req, res) {
    let conditon = {
        genders: 'female',
    }
    let feild = 'categories';
    try {
        return await menu(res, conditon, feild);
    } catch (error) {
        return(error);
    }
}

async function chilMenuMale (req, res) {
    // let cate = menuMale(req, res);
    // console.log(cate);
    let conditon = {
        genders: 'male',
        //categories: cate[0],
    }
    let feild = 'chilCategories';
    try {
        return await menu(res, conditon, feild);
    } catch (error) {
        return(error);
    }
}


 function menu (res, conditon, feild) {
    return new Promise( (resolve, reject) =>{
        CategoryModel.find({}).distinct(conditon)
                    .select(feild)
                    .exec( (err, result) => {
            if (err) {
                reject(res.jon(err));
            }
            else resolve(res.json({
                data: result,
            }));
            
        });
    });
}



// function chilMenu ( res, conditon) {
//     ProductsModel.distinct("chilCategories", conditon, (err, result) => {
//         if (err){
//             res.json(err);
//         } 
//         res.json(result);
//     });
// }

module.exports = {
    menuMale: male,
    menuFemale: menuFemale,
    chilMenuMale: chilMenuMale,
}