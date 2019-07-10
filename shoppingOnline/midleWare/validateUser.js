const jwt = require('jsonwebtoken');
const node_acl = require('acl');

// function validateUser(req, res, next) {
//     jwt.verify(req.headers['x-access-token'], 
//     req.app.get('secretKey'), (err, decoded) => {
//         if (err) {
//             res.json({
//                 status: 'error',
//                 message: err.message,
//                 data: null,
//             });
//         }
//         req.body.userId = decoded.id;
//         next();
//     });
// }




// const validateToken = async (req, res, next) => {
  
//         const token = req.headers['x-access-token'];
//         jwt.verify(token, 'secretKey', (err, decoded) => {
//             if  (err) {
//                 return res.json(err);
//             }
//             req.decoded = decoded;
//             next();
//         });
    
// }

let checkToken = (req, res, next) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    // if (token.startsWith('Bearer ')) {
    //   // Remove Bearer from string
    //   token = token.slice(7, token.length);
    // }
  
    if (token) {
      jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
          return res.json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          console.log( req.decoded.id)//sao lay ??????
          next();
        }
      });
    } else {
      return res.json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  };


module.exports = {
    checkToken: checkToken,
};