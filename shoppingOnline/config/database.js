let mongo = require('mongodb').MongoClient;

let url = 'mongodb://127.0.0.1:27017/shoppingOnline';
mongo.connect(url, (err,client) => {
    if (err) {
        console.error(err);
        return
    }
 
});



// mongo.Promise = global.Promise;

module.exports = mongo;