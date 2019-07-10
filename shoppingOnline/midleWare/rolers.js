// const node_acl = require('acl');

// const UserModels = require('../models/users');

// let acl = new node_acl(new node_acl.mongodbBackend('shoppingOnline'), {
//     debug: (msg) => {
//       console.log('-DEBUG-', msg);
//     }
//   });

//   acl.allow([
//     {
//       roles: 'admins',
//       allows: [
//         {
//           resources: '/user/userId/permissinon',
//           permissions: '*'
//         }
//       ]
//     },
//       {
//       roles: 'editors',
//       allows: [
//         // {
//         //   resources: '/admin/articles',
//         //   permissions: '*'
//         // },
//         // ke thua authors
//         {
//             resources: '/products',
//             permissions: '*'
//         }
//       ]
//     },
//     {
//       roles: 'authors',
//       allows: [
//         {
//           resources: '/admin/articles',
//           permissions: '*'
//         }
//       ]
//     },
//     {
//         roles: 'users',
//         allows: [
//           {
//             resources: '/user',
//             permissions: '*',
//           },
//           {
//             resources: '/products/:productId/comment',
//             permissions: '*',
//           },
//           {
//             resources: '/products/:productId/report',
//             permissions: '*',
//           }
//         ]
//       }
//   ]);



// // Inherit roles
// //  Every writer is allowed to do what guests do
// //  Every manager is allowed to do what writer do
// acl.addRoleParents('authors', 'users');
// acl.addRoleParents('editors', 'users');
// acl.addRoleParents('editors', 'authors');
// acl.addRoleParents('admins', 'authors');
// acl.addRoleParents('admins', 'editors');
// acl.addRoleParents('admins', 'users');


// // Provide logic for getting the logged-in user
// //  This is a job for your authentication layer
// function getUserId(req, res) {
//     return userId = jwtDecoded(req.headers['x-access-token']).id;

//     // return await UserModel.find({_id: userId})
//     //                 .select('roles')
//     //                 .exec( (err, result) => {
//     //                     if (err) {
//     //                         res.json(err);
//     //                     } else {
//     //                         return result[0].roles;
//     //                     }
//     //                 })
// }

// module.exports =  {
//     acl: acl,
//     getUserId: getUserId,
// };
