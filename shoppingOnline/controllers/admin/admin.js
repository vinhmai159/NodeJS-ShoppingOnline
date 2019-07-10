const UserControllers = require('../../models/users');

const permissions = async (req, res) => {
    return await UserControllers.findByIdAndUpdate({_id: req.params.userId}, {roles: req.body.roles})
                                .exec( (err, result) => {
                                    if (err) {
                                        res.json(err);
                                    } else {
                                        res.json({
                                            status: 'success',
                                            message: 'Update role is successfully!',
                                        })
                                    }
                                })
}

module.exports = {
    permissions: permissions,
}